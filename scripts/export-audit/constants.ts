import { join } from "path";

export const OUT_DIR = join(process.cwd(), "out");
export const REPORTS_DIR = join(process.cwd(), "reports");
export const ROUTES_FILE = join(REPORTS_DIR, "routes.json");
export const LINKS_FILE = join(REPORTS_DIR, "internal-links.json");
export const FINDINGS_DIR = join(REPORTS_DIR, "findings");
export const AUDIT_REPORT_JSON = join(REPORTS_DIR, "export-audit.json");
export const AUDIT_REPORT_MD = join(REPORTS_DIR, "export-audit.md");

/** Default local static server port (must match playwright.config.ts). */
export const AUDIT_SERVER_PORT = 4173;

/** Markers baked into Next.js static export 404 pages and app/not-found.tsx. */
export const SOFT_404_MARKERS = {
  nextErrorHtmlId: "__next_error__",
  nextErrorDigest: "NEXT_HTTP_ERROR_FALLBACK;404",
  heading: "Page Not Found",
  label: "ERROR 404",
  forbiddenHeadings: ["Product Not Found", "Not Found", "Page Not Found"] as const,
  notFoundSelectors: [
    "#__next_error__",
    "[data-nextjs-error]",
    "[data-nextjs-not-found]",
  ] as const,
} as const;

/** Paths under out/ that are not public site routes. */
export const EXPORT_PATH_EXCLUDE_SEGMENTS = [
  "__next",
  "_next",
  "_not-found",
] as const;

/** Exported utility pages we still validate but label separately in reports. */
export const UTILITY_ROUTES = new Set(["/404/"]);

/** Route pattern for product detail pages under /shop/{category}/{slug}/ */
export const PRODUCT_ROUTE_PATTERN = /^\/shop\/[^/]+\/[^/]+\/$/;
