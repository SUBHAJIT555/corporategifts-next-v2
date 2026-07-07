import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { dirname, join, relative, sep } from "path";
import {
  EXPORT_PATH_EXCLUDE_SEGMENTS,
  LINKS_FILE,
  OUT_DIR,
  REPORTS_DIR,
  ROUTES_FILE,
} from "./constants";
import type { InternalLinkSources, RouteSources } from "./types";

const DEFAULT_SITE_ORIGIN = "https://corporategiftsdubaii.ae";

function normalizeRoute(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const withLeading = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

function shouldSkipExportRelativePath(relativePath: string): boolean {
  const normalized = relativePath.split(sep).join("/");
  const segments = normalized.split("/").filter(Boolean);

  if (segments.length === 0) return false;

  return segments.some((segment) =>
    EXPORT_PATH_EXCLUDE_SEGMENTS.some(
      (excluded) => segment === excluded || segment.startsWith("__next"),
    ),
  );
}

function indexHtmlToRoute(outRoot: string, indexHtmlPath: string): string {
  const dir = dirname(indexHtmlPath);
  const rel = relative(outRoot, dir).split(sep).join("/");
  if (!rel || rel === ".") return "/";
  return normalizeRoute(`/${rel}`);
}

function walkIndexHtmlFiles(dir: string, outRoot: string, results: string[] = []): string[] {
  if (!existsSync(dir)) return results;

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const relFromOut = relative(outRoot, fullPath).split(sep).join("/");

    if (shouldSkipExportRelativePath(relFromOut)) {
      continue;
    }

    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walkIndexHtmlFiles(fullPath, outRoot, results);
      continue;
    }

    if (entry === "index.html") {
      results.push(indexHtmlToRoute(outRoot, fullPath));
    }
  }

  return results;
}

function parseSitemapPaths(sitemapPath: string, siteOrigin: string): string[] {
  if (!existsSync(sitemapPath)) return [];

  const xml = readFileSync(sitemapPath, "utf8");
  const paths = new Set<string>();
  const origin = siteOrigin.replace(/\/+$/, "");

  for (const match of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)) {
    const raw = match[1]?.trim();
    if (!raw) continue;

    try {
      const url = new URL(raw);
      const allowedOrigins = new Set([origin, "http://localhost:4173"]);
      if (!allowedOrigins.has(url.origin) && url.origin !== new URL(origin).origin) {
        continue;
      }
      paths.add(normalizeRoute(url.pathname));
    } catch {
      paths.add(normalizeRoute(raw));
    }
  }

  return [...paths].sort();
}

function collectExportedRoutes(outDir: string): string[] {
  const routes = walkIndexHtmlFiles(outDir, outDir);
  return [...new Set(routes.map(normalizeRoute))].sort();
}

function resolveSitemapFiles(outDir: string): string[] {
  const candidates = [
    join(outDir, "sitemap.xml"),
    join(process.cwd(), "public", "sitemap.xml"),
  ];
  return candidates.filter((path) => existsSync(path));
}

function diffRoutes(exported: string[], sitemap: string[]) {
  const exportedSet = new Set(exported);
  const sitemapSet = new Set(sitemap);

  const missingFromExport = [...sitemapSet]
    .filter((route) => !exportedSet.has(route))
    .sort();

  const notInSitemap = [...exportedSet]
    .filter((route) => !sitemapSet.has(route))
    .sort();

  const validate = [...new Set([...exported, ...sitemap])].sort();

  return { missingFromExport, notInSitemap, validate };
}

function isInternalAssetUrl(value: string): boolean {
  return (
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/blog/") &&
    !value.startsWith("mailto:") &&
    !value.startsWith("tel:") &&
    !value.startsWith("#")
  );
}

function stripQueryHash(value: string): string {
  return value.split("#")[0]?.split("?")[0] ?? value;
}

function extractUrlsFromHtml(html: string): { links: Set<string>; assets: Set<string> } {
  const links = new Set<string>();
  const assets = new Set<string>();

  const attrRegex =
    /\b(?:href|src|content)=["']([^"']+)["']|url\(\s*["']?([^"')]+)["']?\s*\)/gi;

  for (const match of html.matchAll(attrRegex)) {
    const raw = (match[1] ?? match[2] ?? "").trim();
    if (!raw || !isInternalAssetUrl(raw)) continue;

    const cleaned = stripQueryHash(raw);
    if (!cleaned || cleaned === "/") continue;

    const normalized = normalizeRoute(cleaned);

    if (match[0].startsWith("href")) {
      links.add(normalized);
    } else {
      assets.add(normalized);
    }
  }

  return { links, assets };
}

function dedupeLinkedResources(items: InternalLinkSources["links"]): InternalLinkSources["links"] {
  const seen = new Set<string>();
  const result: InternalLinkSources["links"] = [];

  for (const item of items) {
    const key = `${item.url}\0${item.sourceRoute}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result.sort((a, b) => a.url.localeCompare(b.url));
}

function collectInternalUrlsFromExport(outDir: string): InternalLinkSources {
  const links: InternalLinkSources["links"] = [];
  const assets: InternalLinkSources["assets"] = [];

  function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      const relFromOut = relative(outDir, fullPath).split(sep).join("/");

      if (shouldSkipExportRelativePath(relFromOut)) continue;

      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry !== "index.html") continue;

      const sourceRoute = indexHtmlToRoute(outDir, fullPath);
      const html = readFileSync(fullPath, "utf8");
      const extracted = extractUrlsFromHtml(html);

      for (const url of extracted.links) {
        links.push({ url, sourceRoute });
      }
      for (const url of extracted.assets) {
        assets.push({ url, sourceRoute });
      }
    }
  }

  if (existsSync(outDir)) {
    walk(outDir);
  }

  return {
    links: dedupeLinkedResources(links),
    assets: dedupeLinkedResources(assets),
  };
}

export function collectRouteSources(options?: {
  outDir?: string;
  siteOrigin?: string;
}): RouteSources {
  const outDir = options?.outDir ?? OUT_DIR;
  const siteOrigin = options?.siteOrigin ?? DEFAULT_SITE_ORIGIN;

  if (!existsSync(outDir)) {
    throw new Error(
      `Export directory not found at ${outDir}. Run "npm run build" first.`,
    );
  }

  const exported = collectExportedRoutes(outDir);

  const sitemapPaths = new Set<string>();
  for (const sitemapFile of resolveSitemapFiles(outDir)) {
    for (const path of parseSitemapPaths(sitemapFile, siteOrigin)) {
      sitemapPaths.add(path);
    }
  }

  const sitemap = [...sitemapPaths].sort();
  const { missingFromExport, notInSitemap, validate } = diffRoutes(exported, sitemap);

  return {
    exported,
    exportedRoutes: exported,
    sitemap,
    sitemapRoutes: sitemap,
    validate,
    missingFromExport,
    notInSitemap,
  };
}

export function writeAuditInputs(options?: {
  outDir?: string;
  siteOrigin?: string;
}) {
  const outDir = options?.outDir ?? OUT_DIR;
  mkdirSync(REPORTS_DIR, { recursive: true });

  const routes = collectRouteSources({ outDir, siteOrigin: options?.siteOrigin });
  const internalUrls = collectInternalUrlsFromExport(outDir);

  writeFileSync(ROUTES_FILE, JSON.stringify(routes, null, 2), "utf8");
  writeFileSync(LINKS_FILE, JSON.stringify(internalUrls, null, 2), "utf8");

  return { routes, internalUrls };
}

function isCliInvocation(): boolean {
  const entry = process.argv[1]?.replace(/\\/g, "/") ?? "";
  return entry.endsWith("scripts/export-audit/collect-routes.ts");
}

function main() {
  const { routes, internalUrls } = writeAuditInputs();

  console.info(`[export-audit] Exported routes: ${routes.exported.length}`);
  console.info(`[export-audit] Sitemap routes: ${routes.sitemap.length}`);
  console.info(`[export-audit] Routes to validate: ${routes.validate.length}`);
  console.info(
    `[export-audit] Missing from export (sitemap only): ${routes.missingFromExport.length}`,
  );
  console.info(`[export-audit] Not in sitemap: ${routes.notInSitemap.length}`);
  console.info(`[export-audit] Internal links: ${internalUrls.links.length}`);
  console.info(`[export-audit] Internal assets: ${internalUrls.assets.length}`);
  console.info(`[export-audit] Wrote ${ROUTES_FILE}`);
  console.info(`[export-audit] Wrote ${LINKS_FILE}`);
}

if (isCliInvocation()) {
  try {
    main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
