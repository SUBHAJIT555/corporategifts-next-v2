import { SITE_URL } from "@/lib/config/site";

/**
 * Sanitize a slug for safe filesystem/URL use.
 * Replaces special unicode chars that cause server issues.
 */
export function sanitizeSlug(slug: string) {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    decoded = slug;
  }

  return decoded
    .replace(/²/g, "2")
    .replace(/³/g, "3")
    .replace(/¹/g, "1")
    .replace(/[^\x00-\x7F]/g, (char) => {
      const codePoint = char.codePointAt(0);
      return codePoint !== undefined ? `-u${codePoint.toString(16)}-` : "";
    });
}

/** Undo ASCII sanitization for WordPress API key lookup. */
function unsanitizeForApi(slug: string) {
  return slug
    .replace(/m2(?=-|$)/gi, "m²")
    .replace(/m3(?=-|$)/gi, "m³")
    .replace(/m1(?=-|$)/gi, "m¹")
    .replace(/-u([0-9a-f]+)-/gi, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    );
}

/** For generateStaticParams — safe ASCII route param for Next.js / filesystem. */
export function slugFromApi(slug: string) {
  return sanitizeSlug(slug);
}

/** For API map lookup — match WordPress encoded slug keys. */
export function slugForApi(slug: string) {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    decoded = slug;
  }

  return encodeURIComponent(unsanitizeForApi(decoded)).toLowerCase();
}

/** For HTTP fetch — decoded unicode slug (encodeURIComponent applied in woo-build-fetch). */
export function slugForFetch(apiSlug: string) {
  try {
    return decodeURIComponent(apiSlug);
  } catch {
    return apiSlug;
  }
}

/** Remove WordPress /blog prefix from paths (WP lives at /blog, Next site does not). */
export function stripWordPressBlogPrefix(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;

  try {
    const isAbsolute = /^https?:\/\//i.test(trimmed);
    const parsed = new URL(trimmed, isAbsolute ? undefined : SITE_URL);

    if (parsed.pathname === "/blog" || parsed.pathname === "/blog/") {
      parsed.pathname = "/";
    } else if (parsed.pathname.startsWith("/blog/")) {
      parsed.pathname = parsed.pathname.slice("/blog".length) || "/";
    }

    if (!isAbsolute) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }

    return parsed.toString();
  } catch {
    return trimmed
      .replace(/^(https?:\/\/[^/]+)\/blog\//i, "$1/")
      .replace(/^\/blog\//i, "/");
  }
}

/** Normalize canonical/sitemap URLs: strip /blog, ASCII-safe slugs (m² → m2). */
export function sanitizeCanonicalUrl(url: string) {
  return stripWordPressBlogPrefix(url)
    .replace(/m%c2%b2/gi, "m2")
    .replace(/m³/g, "m3")
    .replace(/m¹/g, "m1")
    .replace(/²/g, "2")
    .replace(/³/g, "3")
    .replace(/¹/g, "1");
}
