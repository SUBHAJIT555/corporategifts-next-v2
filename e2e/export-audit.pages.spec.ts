import { appendFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import { expect, test, type Page } from "@playwright/test";
import { join } from "path";
import {
  PRODUCT_ROUTE_PATTERN,
  REPORTS_DIR,
  ROUTES_FILE,
  SOFT_404_MARKERS,
} from "../scripts/export-audit/constants";
import { detectSoft404Page } from "../scripts/export-audit/soft-404";
import type { PageFinding, RouteSources } from "../scripts/export-audit/types";
import {
  isSameOriginUrl,
  shouldAuditExternalAssets,
  writePageFinding,
} from "../scripts/export-audit/utils";

function loadRoutes(): RouteSources {
  if (!existsSync(ROUTES_FILE)) {
    throw new Error(`Missing ${ROUTES_FILE}. globalSetup should create it before tests run.`);
  }
  return JSON.parse(readFileSync(ROUTES_FILE, "utf8")) as RouteSources;
}

function routeTitle(route: string): string {
  return route === "/" ? "home" : route.replace(/^\/|\/$/g, "");
}

const routes = loadRoutes();
const maxPages = process.env.AUDIT_MAX_PAGES
  ? Number(process.env.AUDIT_MAX_PAGES)
  : undefined;
const productOnly = process.env.PRODUCT_ONLY === "1";
const onlyRoute = process.env.AUDIT_ONLY_ROUTE?.trim();
const preFilteredRoutesByMode = productOnly
  ? routes.validate.filter((route) => PRODUCT_ROUTE_PATTERN.test(route))
  : routes.validate;
const preFilteredRoutesByExplicitRoute =
  onlyRoute && onlyRoute.length > 0
    ? preFilteredRoutesByMode.filter((route) => route === onlyRoute)
    : preFilteredRoutesByMode;
const routesToValidate =
  maxPages && maxPages > 0
    ? preFilteredRoutesByExplicitRoute.slice(0, maxPages)
    : preFilteredRoutesByExplicitRoute;
const debugReportPath = join(REPORTS_DIR, "soft404-debug.jsonl");
writeFileSync(debugReportPath, "", "utf8");

test.describe.configure({ mode: "parallel" });

async function hasProductSignals(page: Page) {
  const h1 = page.locator("h1").first();
  const h1Exists = (await h1.count()) > 0;
  const h1Text = (await h1.textContent())?.trim() ?? "";
  const forbiddenTitles = new Set(
    SOFT_404_MARKERS.forbiddenHeadings.map((value) => value.toLowerCase()),
  );
  const hasValidH1 = h1Exists && h1Text.length > 0 && !forbiddenTitles.has(h1Text.toLowerCase());

  const hasImage = (await page.locator("img[src]").count()) > 0;
  const hasEnquiryButton =
    (await page
      .getByRole("button", { name: /enquiry|inquire|request/i })
      .count()) > 0;
  const hasAddToQuoteButton =
    (await page
      .getByRole("button", { name: /quote|add to quote/i })
      .count()) > 0;
  const hasDescription =
    (await page.locator("article p, [class*='description'], [data-testid*='description']").count()) >
    0;
  const hasGallery =
    (await page.locator("[class*='gallery'], [data-testid*='gallery'], .image-gallery").count()) > 0;

  const hasMinimumProductContent =
    hasImage || hasEnquiryButton || hasAddToQuoteButton || hasDescription || hasGallery;

  return {
    h1Exists,
    h1Text,
    hasValidH1,
    hasImage,
    hasEnquiryButton,
    hasAddToQuoteButton,
    hasDescription,
    hasGallery,
    hasMinimumProductContent,
  };
}

test.describe("exported pages", () => {
  for (const route of routesToValidate) {
    test(`page ${routeTitle(route)}`, async ({ page, baseURL }) => {
      const missingAssets = new Set<string>();
      const auditExternal = shouldAuditExternalAssets();

      page.on("response", (response) => {
        const url = response.url();
        const isInternal = isSameOriginUrl(url, baseURL!);
        if (!isInternal && !auditExternal) return;

        if (response.status() >= 400) {
          try {
            const parsed = new URL(url);
            missingAssets.add(parsed.pathname + parsed.search);
          } catch {
            missingAssets.add(url);
          }
        }
      });

      let httpStatus: number | null = null;
      let soft404 = false;
      let soft404Rule: string | null = null;
      let bodyRendered = false;
      let title = "";
      const isProductRoute = PRODUCT_ROUTE_PATTERN.test(route);
      const pageType: PageFinding["pageType"] =
        route === "/"
          ? "homepage"
          : isProductRoute
            ? "product"
            : route === "/shop/" || route.startsWith("/shop/page/")
              ? "shop-listing"
              : "generic";
      let productSignals: PageFinding["productSignals"] = {
        h1Exists: false,
        h1Text: "",
        hasValidH1: false,
        hasImage: false,
        hasEnquiryButton: false,
        hasAddToQuoteButton: false,
        hasDescription: false,
        hasGallery: false,
        hasMinimumProductContent: false,
      };
      let error: string | undefined;

      try {
        const response = await page.goto(route, {
          waitUntil: "domcontentloaded",
          timeout: 45_000,
        });

        httpStatus = response?.status() ?? null;
        expect(httpStatus, `Expected HTTP 200 for ${route}`).toBe(200);
        await expect(page.locator("body")).toBeVisible();
        bodyRendered = true;
        title = await page.title();
        expect(title.trim().length, `Expected non-empty title for ${route}`).toBeGreaterThan(0);

        if (isProductRoute) {
          productSignals = await hasProductSignals(page);
          expect(productSignals.h1Exists, `Expected h1 on product route ${route}`).toBe(true);
          expect(productSignals.hasValidH1, `Unexpected product title on ${route}`).toBe(true);
          expect(
            productSignals.hasMinimumProductContent,
            `Missing product content signals on ${route}`,
          ).toBe(true);
        }

        const soft404Match = await detectSoft404Page(
          () => page.content(),
          async () => page.locator("h1").first().textContent(),
          async () =>
            (await page
              .locator(
                "#__next_error__, [data-nextjs-error], [data-nextjs-dialog-overlay], [data-nextjs-not-found]",
              )
              .count()) > 0,
          async () =>
            (await page
              .locator(
                SOFT_404_MARKERS.notFoundSelectors.join(", "),
              )
              .count()) > 0,
          isProductRoute && !productSignals.hasMinimumProductContent,
        );
        soft404 = soft404Match.matched;
        soft404Rule = soft404Match.rule;
        const debugPayload = {
          route,
          statusCode: httpStatus,
          matchedRule: soft404Rule,
          title,
          detectedPageType: pageType,
        };
        appendFileSync(debugReportPath, `${JSON.stringify(debugPayload)}\n`, "utf8");
        if (soft404) {
          console.error(`[export-audit][soft404] ${JSON.stringify(debugPayload)}`);
        }
        expect(soft404, `Soft 404 detected for ${route}`).toBe(false);
      } catch (caught) {
        error = caught instanceof Error ? caught.message : String(caught);
      } finally {
        writePageFinding({
          route,
          kind: "page",
          httpStatus,
          soft404,
          soft404Rule,
          bodyRendered,
          title,
          isProductRoute,
          pageType,
          productSignals,
          missingAssets: [...missingAssets],
          error,
        });
        if (error) {
          console.error(
            `[export-audit][debug-before-fail] ${JSON.stringify({
              route,
              statusCode: httpStatus,
              matchedRule: soft404Rule,
              title,
              detectedPageType: pageType,
            })}`,
          );
        }
      }

      if (error) {
        throw new Error(error);
      }
    });
  }
});
