import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import {
  AUDIT_REPORT_JSON,
  AUDIT_REPORT_MD,
  FINDINGS_DIR,
  LINKS_FILE,
  PRODUCT_ROUTE_PATTERN,
  REPORTS_DIR,
  ROUTES_FILE,
} from "./constants";
import type { ExportAuditReport, LinkFinding, PageFinding } from "./types";

function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function loadPageFindings(): PageFinding[] {
  if (!existsSync(FINDINGS_DIR)) return [];

  const findings: PageFinding[] = [];
  for (const file of readdirSync(FINDINGS_DIR)) {
    if (!file.endsWith(".json")) continue;
    const parsed = JSON.parse(
      readFileSync(join(FINDINGS_DIR, file), "utf8"),
    ) as PageFinding | PageFinding[];

    if (Array.isArray(parsed)) {
      findings.push(...parsed);
    } else {
      findings.push(parsed);
    }
  }

  return findings;
}

function loadLinkFindings(): LinkFinding[] {
  const path = join(REPORTS_DIR, "link-findings.json");
  return readJson<LinkFinding[]>(path, []);
}

export function buildExportAuditReport(baseURL: string): ExportAuditReport {
  const productOnly = process.env.PRODUCT_ONLY === "1";
  const routes = readJson<{
    validate: string[];
    missingFromExport: string[];
    notInSitemap: string[];
  }>(ROUTES_FILE, { validate: [], missingFromExport: [], notInSitemap: [] });
  const routesToCheck = productOnly
    ? routes.validate.filter((route) => PRODUCT_ROUTE_PATTERN.test(route))
    : routes.validate;

  const pageFindings = loadPageFindings();
  const linkFindings = loadLinkFindings();

  if (routesToCheck.length > 0 && pageFindings.length === 0 && process.env.AUDIT_ALLOW_EMPTY_FINDINGS !== "true") {
    throw new Error(
      [
        "No Playwright page findings found in reports/findings/.",
        "merge-report only combines results — it does not validate pages itself.",
        "",
        "Run the full audit instead:",
        "  npm run audit:export",
        "",
        "Or run Playwright first, then merge:",
        "  npx playwright test",
        "  npm run audit:merge-report",
      ].join("\n"),
    );
  }

  const pageByRoute = new Map(pageFindings.map((finding) => [finding.route, finding]));

  const failedUrls: ExportAuditReport["failedUrls"] = [];
  const soft404Pages: string[] = [];
  const productFailures: ExportAuditReport["productFailures"] = [];
  const soft404Debug: ExportAuditReport["soft404Debug"] = [];

  for (const route of routesToCheck) {
    const finding = pageByRoute.get(route);

    if (!finding) {
      failedUrls.push({ route, reason: "No Playwright result recorded" });
      continue;
    }

    if (finding.error) {
      failedUrls.push({
        route,
        reason: finding.error,
        httpStatus: finding.httpStatus,
      });
      continue;
    }

    if (finding.httpStatus !== 200) {
      failedUrls.push({
        route,
        reason: `HTTP ${finding.httpStatus ?? "unknown"}`,
        httpStatus: finding.httpStatus,
      });
      continue;
    }

    soft404Debug.push({
      route,
      statusCode: finding.httpStatus,
      matchedRule: finding.soft404Rule,
      title: finding.title,
      pageType: finding.pageType,
    });

    if (finding.soft404) {
      soft404Pages.push(route);
      failedUrls.push({
        route,
        reason: "Soft 404 (custom Not Found page rendered)",
        httpStatus: finding.httpStatus,
      });
    }

    if (finding.isProductRoute) {
      if (!finding.productSignals.hasValidH1) {
        productFailures.push({ route, reason: "Invalid or missing product title (H1)" });
      }
      if (!finding.productSignals.hasMinimumProductContent) {
        productFailures.push({
          route,
          reason: "Product content signals missing (image/button/description/gallery)",
        });
      }
    }
  }

  const missingFromExportRoutes = productOnly
    ? routes.missingFromExport.filter((route) => PRODUCT_ROUTE_PATTERN.test(route))
    : routes.missingFromExport;

  for (const route of missingFromExportRoutes) {
    failedUrls.push({
      route,
      reason: "Listed in sitemap.xml but no index.html in out/",
    });
  }

  const brokenLinks = linkFindings.filter(
    (finding) => finding.kind === "link" && finding.httpStatus !== 200,
  );

  const runtimeMissingAssets = pageFindings.flatMap((finding) =>
    finding.missingAssets.map((url) => ({
      url,
      kind: "asset" as const,
      sourceRoute: finding.route,
      httpStatus: null,
      error: "Failed to load during page navigation",
    })),
  );

  const staticMissingAssets = linkFindings.filter(
    (finding) => finding.kind === "asset" && finding.httpStatus !== 200,
  );

  const missingAssets = [...runtimeMissingAssets, ...staticMissingAssets];

  const passedRoutes = routesToCheck.filter((route) => {
    const finding = pageByRoute.get(route);
    return (
      finding &&
      !finding.error &&
      finding.httpStatus === 200 &&
      !finding.soft404 &&
      (!finding.isProductRoute || finding.productSignals.hasMinimumProductContent) &&
      finding.missingAssets.length === 0
    );
  }).length;

  const productPagesChecked = pageFindings.filter((finding) => finding.isProductRoute).length;
  const totalProductRoutes = routesToCheck.filter((route) =>
    PRODUCT_ROUTE_PATTERN.test(route),
  ).length;
  const passedProductRoutes = routesToCheck.filter((route) => {
    if (!PRODUCT_ROUTE_PATTERN.test(route)) return false;
    const finding = pageByRoute.get(route);
    return (
      finding &&
      !finding.error &&
      finding.httpStatus === 200 &&
      !finding.soft404 &&
      finding.productSignals.hasMinimumProductContent
    );
  }).length;
  const failedProductRoutes = Math.max(0, totalProductRoutes - passedProductRoutes);
  const missingProductExports = routes.missingFromExport.filter((route) =>
    route.startsWith("/shop/"),
  ).length;
  const soft404Products = pageFindings.filter(
    (finding) => finding.isProductRoute && finding.soft404,
  ).length;
  const brokenProductContent = pageFindings.filter(
    (finding) => finding.isProductRoute && !finding.productSignals.hasMinimumProductContent,
  ).length;
  const brokenProductExports = pageFindings.filter(
    (finding) =>
      finding.isProductRoute &&
      (finding.error ||
        finding.httpStatus !== 200 ||
        finding.soft404 ||
        !finding.productSignals.hasMinimumProductContent),
  ).length;

  return {
    generatedAt: new Date().toISOString(),
    baseURL,
    summary: {
      totalRoutes: routesToCheck.length,
      passedRoutes,
      failedRoutes: failedUrls.length,
      soft404Pages: soft404Pages.length,
      httpErrorPages: pageFindings.filter((f) => f.httpStatus !== 200).length,
      productPagesChecked,
      totalProductRoutes,
      passedProductRoutes,
      failedProductRoutes,
      missingProductExports,
      soft404Products,
      brokenProductContent,
      brokenProductExports,
      totalLinksChecked: readJson<{ links: { url: string }[] }>(LINKS_FILE, {
        links: [],
      }).links.length,
      brokenLinks: brokenLinks.length,
      totalAssetsChecked: readJson<{ assets: { url: string }[] }>(LINKS_FILE, {
        assets: [],
      }).assets.length,
      missingAssets: missingAssets.length,
      missingFromExport: missingFromExportRoutes.length,
      notInSitemap: routes.notInSitemap.length,
    },
    failedUrls,
    soft404Pages,
    productFailures,
    soft404Debug,
    brokenLinks,
    missingAssets,
    missingFromExport: missingFromExportRoutes,
    notInSitemap: routes.notInSitemap,
  };
}

function formatMarkdown(report: ExportAuditReport): string {
  const lines: string[] = [
    "# Static Export Audit Report",
    "",
    `Generated: ${report.generatedAt}`,
    `Base URL: ${report.baseURL}`,
    "",
    "## Summary",
    "",
    `| Metric | Count |`,
    `| --- | ---: |`,
    `| Total routes | ${report.summary.totalRoutes} |`,
    `| Passed routes | ${report.summary.passedRoutes} |`,
    `| Failed routes | ${report.summary.failedRoutes} |`,
    `| Soft 404 pages | ${report.summary.soft404Pages} |`,
    `| HTTP error pages | ${report.summary.httpErrorPages} |`,
    `| Product pages checked | ${report.summary.productPagesChecked} |`,
    `| Total product routes | ${report.summary.totalProductRoutes} |`,
    `| Passed product routes | ${report.summary.passedProductRoutes} |`,
    `| Failed product routes | ${report.summary.failedProductRoutes} |`,
    `| Missing product exports | ${report.summary.missingProductExports} |`,
    `| Soft 404 products | ${report.summary.soft404Products} |`,
    `| Broken product content | ${report.summary.brokenProductContent} |`,
    `| Broken product exports | ${report.summary.brokenProductExports} |`,
    `| Internal links checked | ${report.summary.totalLinksChecked} |`,
    `| Broken links | ${report.summary.brokenLinks} |`,
    `| Static assets checked | ${report.summary.totalAssetsChecked} |`,
    `| Missing/broken assets | ${report.summary.missingAssets} |`,
    `| Sitemap URLs missing from export | ${report.summary.missingFromExport} |`,
    `| Export URLs not in sitemap | ${report.summary.notInSitemap} |`,
    "",
  ];

  if (report.soft404Pages.length > 0) {
    lines.push("## Soft 404 pages", "");
    for (const route of report.soft404Pages.slice(0, 100)) {
      lines.push(`- ${route}`);
    }
    if (report.soft404Pages.length > 100) {
      lines.push(`- … and ${report.soft404Pages.length - 100} more`);
    }
    lines.push("");
  }

  if (report.soft404Debug.length > 0) {
    lines.push("## Soft 404 debug", "");
    for (const item of report.soft404Debug.slice(0, 100)) {
      lines.push(
        `- \`${item.route}\` — status=${item.statusCode ?? "null"}, rule=${item.matchedRule ?? "none"}, type=${item.pageType}, title=${item.title || "(empty)"}`,
      );
    }
    if (report.soft404Debug.length > 100) {
      lines.push(`- … and ${report.soft404Debug.length - 100} more`);
    }
    lines.push("");
  }

  if (report.failedUrls.length > 0) {
    lines.push("## Failed URLs", "");
    for (const item of report.failedUrls.slice(0, 150)) {
      lines.push(`- \`${item.route}\` — ${item.reason}`);
    }
    if (report.failedUrls.length > 150) {
      lines.push(`- … and ${report.failedUrls.length - 150} more`);
    }
    lines.push("");
  }

  if (report.productFailures.length > 0) {
    lines.push("## Product page failures", "");
    for (const item of report.productFailures.slice(0, 100)) {
      lines.push(`- \`${item.route}\` — ${item.reason}`);
    }
    if (report.productFailures.length > 100) {
      lines.push(`- … and ${report.productFailures.length - 100} more`);
    }
    lines.push("");
  }

  if (report.brokenLinks.length > 0) {
    lines.push("## Broken internal links", "");
    for (const item of report.brokenLinks.slice(0, 100)) {
      lines.push(
        `- \`${item.url}\` (from \`${item.sourceRoute}\`) — HTTP ${item.httpStatus ?? "error"}`,
      );
    }
    if (report.brokenLinks.length > 100) {
      lines.push(`- … and ${report.brokenLinks.length - 100} more`);
    }
    lines.push("");
  }

  if (report.missingAssets.length > 0) {
    lines.push("## Missing / broken assets", "");
    for (const item of report.missingAssets.slice(0, 100)) {
      lines.push(
        `- \`${item.url}\` (from \`${item.sourceRoute}\`) — ${item.error ?? `HTTP ${item.httpStatus}`}`,
      );
    }
    if (report.missingAssets.length > 100) {
      lines.push(`- … and ${report.missingAssets.length - 100} more`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function writeExportAuditReport(baseURL: string) {
  mkdirSync(REPORTS_DIR, { recursive: true });
  const report = buildExportAuditReport(baseURL);

  writeFileSync(AUDIT_REPORT_JSON, JSON.stringify(report, null, 2), "utf8");
  writeFileSync(AUDIT_REPORT_MD, formatMarkdown(report), "utf8");

  return report;
}

function isCliInvocation(): boolean {
  const entry = process.argv[1]?.replace(/\\/g, "/") ?? "";
  return entry.endsWith("scripts/export-audit/merge-report.ts");
}

function main() {
  const baseURL =
    process.env.AUDIT_BASE_URL ?? `http://127.0.0.1:${process.env.AUDIT_SERVER_PORT ?? 4173}`;

  const report = writeExportAuditReport(baseURL);

  console.info(`[export-audit] Report: ${AUDIT_REPORT_JSON}`);
  console.info(`[export-audit] Report: ${AUDIT_REPORT_MD}`);
  console.info(
    `[export-audit] ${report.summary.passedRoutes}/${report.summary.totalRoutes} routes passed`,
  );

  if (report.summary.failedRoutes > 0 || report.summary.brokenLinks > 0) {
    console.error(
      `[export-audit] FAILED — ${report.summary.failedRoutes} route issue(s), ${report.summary.brokenLinks} broken link(s), ${report.summary.missingAssets} asset issue(s)`,
    );
    process.exitCode = 1;
  }
}

if (isCliInvocation()) {
  try {
    main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
