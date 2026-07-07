export type RouteSources = {
  /** Paths from exported `index.html` files under `out/` (ground truth). */
  exported: string[];
  /** Alias for compatibility with external tooling. */
  exportedRoutes: string[];
  /** Paths from sitemap.xml <loc> entries. */
  sitemap: string[];
  /** Alias for compatibility with external tooling. */
  sitemapRoutes: string[];
  /** Union used for HTTP validation. */
  validate: string[];
  /** In sitemap but no matching index.html in out/. */
  missingFromExport: string[];
  /** In out/ but not listed in sitemap.xml. */
  notInSitemap: string[];
};

export type LinkedResource = {
  url: string;
  sourceRoute: string;
};

export type InternalLinkSources = {
  /** Same-origin hrefs discovered in exported HTML. */
  links: LinkedResource[];
  /** Same-origin asset URLs (script, link, img, source, etc.). */
  assets: LinkedResource[];
};

export type PageFinding = {
  route: string;
  kind: "page";
  httpStatus: number | null;
  soft404: boolean;
  soft404Rule: string | null;
  bodyRendered: boolean;
  title: string;
  isProductRoute: boolean;
  pageType: "homepage" | "product" | "shop-listing" | "generic";
  productSignals: {
    h1Exists: boolean;
    h1Text: string;
    hasValidH1: boolean;
    hasImage: boolean;
    hasEnquiryButton: boolean;
    hasAddToQuoteButton: boolean;
    hasDescription: boolean;
    hasGallery: boolean;
    hasMinimumProductContent: boolean;
    reason?: string;
  };
  missingAssets: string[];
  error?: string;
};

export type LinkFinding = {
  url: string;
  kind: "link" | "asset";
  sourceRoute: string;
  httpStatus: number | null;
  error?: string;
};

export type ExportAuditReport = {
  generatedAt: string;
  baseURL: string;
  summary: {
    totalRoutes: number;
    passedRoutes: number;
    failedRoutes: number;
    soft404Pages: number;
    httpErrorPages: number;
    productPagesChecked: number;
    totalProductRoutes: number;
    passedProductRoutes: number;
    failedProductRoutes: number;
    missingProductExports: number;
    soft404Products: number;
    brokenProductContent: number;
    brokenProductExports: number;
    totalLinksChecked: number;
    brokenLinks: number;
    totalAssetsChecked: number;
    missingAssets: number;
    missingFromExport: number;
    notInSitemap: number;
  };
  failedUrls: Array<{
    route: string;
    reason: string;
    httpStatus?: number | null;
  }>;
  soft404Pages: string[];
  productFailures: Array<{
    route: string;
    reason: string;
  }>;
  soft404Debug: Array<{
    route: string;
    statusCode: number | null;
    matchedRule: string | null;
    title: string;
    pageType: string;
  }>;
  brokenLinks: LinkFinding[];
  missingAssets: LinkFinding[];
  missingFromExport: string[];
  notInSitemap: string[];
};
