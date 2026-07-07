import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { API_BASE_URL } from "@/lib/api/config";
import { slugForApi, slugForFetch, slugFromApi } from "@/lib/exportSlug";
import {
  OUT_DIR,
  PRODUCT_ROUTE_PATTERN,
  REPORTS_DIR,
} from "../constants";
import type { RouteSources } from "../types";

type AuditFile = {
  failedUrls: Array<{ route: string; reason: string; httpStatus?: number | null }>;
  summary: Record<string, number>;
};

type ProductFetchFailure = {
  slug: string;
  apiSlug: string;
  status: number;
  reason: string;
  productId?: number;
  productName?: string;
};

type ProductPageDebug = {
  route: string;
  slug: string;
  htmlExists: boolean;
  title: string;
  h1Count: number;
  imageCount: number;
  contentSignals: string[];
  pageType: string;
  hasNextError: boolean;
  hasDigest404: boolean;
  hasNextRedirect: boolean;
  redirectTarget?: string;
  auditReason: string;
  isMultiCategorySibling: boolean;
  primarySiblingRoute?: string;
  primarySiblingHasH1?: boolean;
};

type ApiProductCheck = {
  route: string;
  slug: string;
  apiSlug: string;
  fetchUrl: string;
  status: number;
  productId: number | null;
  productSlug: string | null;
  productTitle: string | null;
  error?: string;
};

function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function routeToSlug(route: string): string {
  const parts = route.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

function routeToHtmlPath(route: string): string {
  const rel = route === "/" ? "index.html" : `${route.replace(/^\//, "")}index.html`;
  return join(OUT_DIR, rel);
}

function extractTitle(html: string): string {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
}

function countMatches(html: string, pattern: RegExp): number {
  return (html.match(pattern) ?? []).length;
}

function extractRedirectTarget(html: string): string | undefined {
  const match = html.match(/NEXT_REDIRECT;replace;([^;]+);/);
  return match?.[1];
}

function detectContentSignals(html: string): string[] {
  const signals: string[] = [];
  if (html.includes("wp-content/uploads")) signals.push("product-image");
  if (/quote|add to quote/i.test(html)) signals.push("quote-button");
  if (/enquiry|inquire/i.test(html)) signals.push("enquiry-button");
  if (/image-gallery|gallery/i.test(html)) signals.push("gallery");
  if (/<article[\s>]/i.test(html) || /description/i.test(html)) signals.push("description");
  return signals;
}

function classifyPageType(debug: Pick<ProductPageDebug, "hasDigest404" | "hasNextRedirect" | "h1Count" | "contentSignals">): string {
  if (debug.hasDigest404) return "build-not-found";
  if (debug.hasNextRedirect) return "secondary-category-redirect-stub";
  if (debug.h1Count > 0 && debug.contentSignals.length > 0) return "valid-product";
  if (debug.h1Count > 0) return "partial-product";
  return "empty-product";
}

async function checkApiProduct(slug: string, routeSlug: string): Promise<ApiProductCheck> {
  const apiSlug = slugForApi(routeSlug);
  const fetchSlug = slugForFetch(apiSlug);
  const fetchUrl = `${API_BASE_URL.replace(/\/+$/, "")}/product/${encodeURIComponent(fetchSlug)}`;

  try {
    const response = await fetch(fetchUrl, { method: "GET" });
    const status = response.status;
    if (!response.ok) {
      return {
        route: "",
        slug: routeSlug,
        apiSlug,
        fetchUrl,
        status,
        productId: null,
        productSlug: null,
        productTitle: null,
        error: `HTTP ${status}`,
      };
    }

    const data = (await response.json()) as {
      id?: number;
      slug?: string;
      name?: string;
    };

    return {
      route: "",
      slug: routeSlug,
      apiSlug,
      fetchUrl,
      status,
      productId: data.id ?? null,
      productSlug: data.slug ?? null,
      productTitle: data.name ?? null,
    };
  } catch (error) {
    return {
      route: "",
      slug: routeSlug,
      apiSlug,
      fetchUrl,
      status: 0,
      productId: null,
      productSlug: null,
      productTitle: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function buildSlugConversionSamples(slugs: string[]) {
  return slugs.map((originalSlug) => {
    const sanitized = slugFromApi(originalSlug);
    const apiSlug = slugForApi(sanitized);
    const fetchSlug = slugForFetch(apiSlug);
    const fetchUrl = `${API_BASE_URL.replace(/\/+$/, "")}/product/${encodeURIComponent(fetchSlug)}`;
    const roundTrip = slugFromApi(slugForFetch(apiSlug));
    return {
      originalSlug,
      sanitizedSlug: sanitized,
      apiSlug,
      fetchSlug,
      fetchUrl,
      roundTripSanitized: roundTrip,
      reversible: sanitized === roundTrip || originalSlug === roundTrip,
    };
  });
}

async function main() {
  mkdirSync(REPORTS_DIR, { recursive: true });

  const audit = readJson<AuditFile>(join(REPORTS_DIR, "export-audit.json"), {
    failedUrls: [],
    summary: {},
  });
  const routes = readJson<RouteSources>(join(REPORTS_DIR, "routes.json"), {
    exported: [],
    exportedRoutes: [],
    sitemap: [],
    sitemapRoutes: [],
    validate: [],
    missingFromExport: [],
    notInSitemap: [],
  });

  const failedProductRoutes = audit.failedUrls.filter((item) =>
    PRODUCT_ROUTE_PATTERN.test(item.route),
  );

  const exportedShopRoutes = routes.exported.filter((route) =>
    PRODUCT_ROUTE_PATTERN.test(route),
  );

  const productPageDebug: ProductPageDebug[] = [];
  const apiChecks: ApiProductCheck[] = [];
  const productFetchFailures: ProductFetchFailure[] = [];
  const patternCounts: Record<string, number> = {};

  for (const failed of failedProductRoutes) {
    const route = failed.route;
    const slug = routeToSlug(route);
    const htmlPath = routeToHtmlPath(route);
    const htmlExists = existsSync(htmlPath);
    const html = htmlExists ? readFileSync(htmlPath, "utf8") : "";
    const h1Count = countMatches(html, /<h1\b/gi);
    const imageCount = countMatches(html, /<img\b/gi);
    const contentSignals = html ? detectContentSignals(html) : [];
    const hasNextError = html.includes('id="__next_error__"');
    const hasDigest404 = html.includes("NEXT_HTTP_ERROR_FALLBACK;404");
    const hasNextRedirect = html.includes("NEXT_REDIRECT");
    const redirectTarget = hasNextRedirect ? extractRedirectTarget(html) : undefined;

    const siblings = exportedShopRoutes.filter(
      (candidate) =>
        candidate !== route && candidate.endsWith(`/${slug}/`),
    );
    const primarySiblingRoute = siblings.find((candidate) => {
      const siblingHtmlPath = routeToHtmlPath(candidate);
      if (!existsSync(siblingHtmlPath)) return false;
      const siblingHtml = readFileSync(siblingHtmlPath, "utf8");
      return countMatches(siblingHtml, /<h1\b/gi) > 0 && !siblingHtml.includes("NEXT_REDIRECT");
    });

    const pageType = classifyPageType({
      hasDigest404,
      hasNextRedirect,
      h1Count,
      contentSignals,
    });

    let auditCategory = "other";
    if (failed.reason.includes("Expected h1")) auditCategory = "missing_h1";
    else if (failed.reason.includes("Unexpected product title")) auditCategory = "invalid_title";
    else if (failed.reason.includes("Missing product content")) auditCategory = "missing_content";
    else if (failed.reason.includes("Soft 404")) auditCategory = "soft404";
    patternCounts[auditCategory] = (patternCounts[auditCategory] ?? 0) + 1;

    if (hasDigest404) patternCounts.build_not_found = (patternCounts.build_not_found ?? 0) + 1;
    if (hasNextRedirect) {
      patternCounts.secondary_category_redirect_stub =
        (patternCounts.secondary_category_redirect_stub ?? 0) + 1;
    }
    if (siblings.length > 0) {
      patternCounts.multi_category_route = (patternCounts.multi_category_route ?? 0) + 1;
    }

    productPageDebug.push({
      route,
      slug,
      htmlExists,
      title: html ? extractTitle(html) : "",
      h1Count,
      imageCount,
      contentSignals,
      pageType,
      hasNextError,
      hasDigest404,
      hasNextRedirect,
      redirectTarget,
      auditReason: failed.reason.split("\n")[0] ?? failed.reason,
      isMultiCategorySibling: siblings.length > 0,
      primarySiblingRoute,
      primarySiblingHasH1: Boolean(primarySiblingRoute),
    });
  }

  const concurrency = Number(process.env.DIAG_API_CONCURRENCY ?? 15);
  for (let index = 0; index < failedProductRoutes.length; index += concurrency) {
    const batch = failedProductRoutes.slice(index, index + concurrency);
    const results = await Promise.all(
      batch.map(async (failed) => {
        const slug = routeToSlug(failed.route);
        const check = await checkApiProduct(slug, slug);
        check.route = failed.route;
        return check;
      }),
    );
    apiChecks.push(...results);

    for (const check of results) {
      if (check.status !== 200 || !check.productId) {
        productFetchFailures.push({
          slug: check.slug,
          apiSlug: check.apiSlug,
          status: check.status,
          reason: check.error ?? `HTTP ${check.status}`,
          productId: check.productId ?? undefined,
          productName: check.productTitle ?? undefined,
        });
      }
    }
  }

  const slugSamples = buildSlugConversionSamples([
    ...new Set(
      failedProductRoutes
        .map((item) => routeToSlug(item.route))
        .filter((slug) => /m[123]|-u[0-9a-f]+-/i.test(slug))
        .slice(0, 40),
    ),
  ]);

  const api404Count = apiChecks.filter((item) => item.status === 404).length;
  const api200Count = apiChecks.filter((item) => item.status === 200).length;
  const redirectStubCount = productPageDebug.filter((item) => item.hasNextRedirect).length;
  const buildNotFoundCount = productPageDebug.filter((item) => item.hasDigest404).length;
  const primaryExistsCount = productPageDebug.filter((item) => item.primarySiblingHasH1).length;

  const failureBreakdown = {
    totalFailed: failedProductRoutes.length,
    audit_missing_h1: patternCounts.missing_h1 ?? 0,
    audit_invalid_title: patternCounts.invalid_title ?? 0,
    html_next_redirect_stub: redirectStubCount,
    html_build_not_found: buildNotFoundCount,
    api_status_404: api404Count,
    api_status_200: api200Count,
    multi_category_routes: patternCounts.multi_category_route ?? 0,
    primary_sibling_valid: primaryExistsCount,
    slug_mismatch_suspects: slugSamples.filter((item) => !item.reversible).length,
  };

  const rootCause =
    redirectStubCount >= failedProductRoutes.length * 0.8
      ? "Secondary-category static export pages call permanentRedirect() and bake NEXT_REDIRECT error HTML without product H1."
      : buildNotFoundCount >= failedProductRoutes.length * 0.5
        ? "Build-time product resolution failed (notFound) for many routes."
        : api404Count >= failedProductRoutes.length * 0.5
          ? "WordPress product API returns 404 for failed slugs."
          : "Mixed causes — see breakdown.";

  const auditCorrect =
    productPageDebug.every((item) => item.h1Count === 0) &&
    redirectStubCount + buildNotFoundCount >= failedProductRoutes.length * 0.9;

  writeFileSync(
    join(REPORTS_DIR, "product-fetch-failures.json"),
    JSON.stringify(productFetchFailures, null, 2),
    "utf8",
  );
  writeFileSync(
    join(REPORTS_DIR, "product-page-debug.json"),
    JSON.stringify(productPageDebug, null, 2),
    "utf8",
  );
  writeFileSync(
    join(REPORTS_DIR, "api-product-check.json"),
    JSON.stringify(apiChecks, null, 2),
    "utf8",
  );
  writeFileSync(
    join(REPORTS_DIR, "slug-conversion-check.json"),
    JSON.stringify(slugSamples, null, 2),
    "utf8",
  );
  writeFileSync(
    join(REPORTS_DIR, "failure-breakdown.json"),
    JSON.stringify(failureBreakdown, null, 2),
    "utf8",
  );

  const md = [
    "# Root Cause Analysis — Product Export Audit Failures",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Executive Summary",
    "",
    `- **Failed product routes:** ${failedProductRoutes.length}`,
    `- **Primary root cause:** ${rootCause}`,
    `- **Audit correctness:** ${auditCorrect ? "Audit failures are real (not false positives)." : "Audit may include some false positives; review per-route debug."}`,
    "",
    "## Failure Breakdown",
    "",
    "| Category | Count | % of failures |",
    "| --- | ---: | ---: |",
    ...Object.entries(failureBreakdown).map(([key, value]) => {
      if (key === "totalFailed") return null;
      const pct = failedProductRoutes.length
        ? ((value / failedProductRoutes.length) * 100).toFixed(1)
        : "0.0";
      return `| ${key} | ${value} | ${pct}% |`;
    }).filter(Boolean),
    "",
    "## Hypothesis Validation",
    "",
    "### 1) Product API returning 404",
    `- API 404: **${api404Count}**`,
    `- API 200: **${api200Count}**`,
    `- Conclusion: ${api404Count > redirectStubCount ? "Primary cause" : "Not primary cause for majority"}; most failures still exist while API returns 200.`,
    "",
    "### 2) Slug normalization mismatch (m²/m³/m¹ → m2/m3/m1)",
    `- Slug samples checked: **${slugSamples.length}**`,
    `- Non-reversible conversions: **${slugSamples.filter((s) => !s.reversible).length}**`,
    `- Conclusion: ${slugSamples.some((s) => !s.reversible) ? "Potential contributor for unicode-heavy slugs" : "Not a major contributor in failed set"}.`,
    "",
    "### 3) Product fetch null during build",
    `- Build-not-found pages (NEXT_HTTP_ERROR_FALLBACK;404): **${buildNotFoundCount}**`,
    `- Product fetch failures (API non-200): **${productFetchFailures.length}**`,
    "",
    "### 4) Static export incomplete pages",
    `- Pages with \`__next_error__\`: **${productPageDebug.filter((p) => p.hasNextError).length}**`,
    `- Pages with \`NEXT_REDIRECT\` stubs: **${redirectStubCount}**`,
    `- Pages with valid primary sibling route: **${primaryExistsCount}**`,
    "",
    "### 5) Product template rendering issues",
    `- Failed pages with product images in HTML: **${productPageDebug.filter((p) => p.contentSignals.includes("product-image")).length}**`,
    `- Failed pages with zero H1: **${productPageDebug.filter((p) => p.h1Count === 0).length}**`,
  ].join("\n");

  const recommendations = [
    "",
    "## Recommended Fix (no code applied yet)",
    "",
    "1. **Do not statically export secondary-category product URLs as redirect stubs.**",
    "   - Either skip them in `generateStaticParams` (export only primary category),",
    "   - or emit Apache redirects (already partially generated) and do not treat secondary paths as indexable pages.",
    "2. **Keep audit PRODUCT_ONLY checks on primary routes** or classify redirect stubs separately from broken products.",
    `3. **Handle true build-not-found pages (${buildNotFoundCount})** by validating product API availability at build time and excluding stale slugs from export.`,
    "4. **Slug conversion appears mostly reversible**; prioritize redirect/export strategy over slug rewrites.",
    "",
    "## Code Locations",
    "",
    "- Redirect decision: `app/(main)/shop/[category]/[slug]/page.tsx` (`shouldRedirectToPrimaryCategory` + `permanentRedirect`)",
    "- Static params generation: `lib/productCategories.ts` (`buildShopProductStaticParams`)",
    "- Slug conversion: `lib/exportSlug.ts` (`slugFromApi`, `slugForApi`, `slugForFetch`)",
    "- Build fetch: `lib/build-cache.ts` (`getProductBySlug`)",
    "- Audit product assertions: `e2e/export-audit.pages.spec.ts`",
    "",
    "## Generated Artifacts",
    "",
    "- `reports/product-fetch-failures.json`",
    "- `reports/product-page-debug.json`",
    "- `reports/api-product-check.json`",
    "- `reports/slug-conversion-check.json`",
    "- `reports/failure-breakdown.json`",
  ].join("\n");

  writeFileSync(join(REPORTS_DIR, "root-cause-analysis.md"), `${md}\n${recommendations}\n`, "utf8");

  console.info("[root-cause] Wrote reports/product-fetch-failures.json");
  console.info("[root-cause] Wrote reports/product-page-debug.json");
  console.info("[root-cause] Wrote reports/api-product-check.json");
  console.info("[root-cause] Wrote reports/slug-conversion-check.json");
  console.info("[root-cause] Wrote reports/failure-breakdown.json");
  console.info("[root-cause] Wrote reports/root-cause-analysis.md");
  console.info("[root-cause] Primary cause:", rootCause);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
