import type { Product } from "@/lib/api/types";
import { CATEGORY_SEO } from "@/lib/categorySeo";
import { SITE_URL } from "@/lib/config/site";
import { sanitizeCanonicalUrl, slugFromApi } from "@/lib/exportSlug";

/** Fallback when WooCommerce returns no categories. */
export const DEFAULT_PRODUCT_CATEGORY_SLUG = "products";

/** Known shop category segments (excludes slugified display names like "luxury-corporate-gifts"). */
export const VALID_SHOP_CATEGORY_SLUGS = new Set(Object.keys(CATEGORY_SEO));

/**
 * Product fields used for category routing and SEO.
 * WooCommerce may send slugs in `category_slug`, `categories`, or both.
 */
export type ProductCategorySource = Pick<
  Product,
  | "slug"
  | "category_slug"
  | "categories"
  | "primary_category"
  | "primary_category_slug"
  | "permalink"
> & {
  seo?: {
    canonical?: string;
  };
};

export type ShopProductRouteParam = {
  category: string;
  slug: string;
};

function normalizeCategorySlug(raw: string): string | null {
  const slug = raw.trim().toLowerCase();
  if (!slug) return null;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return slug;
}

/** Accept slug strings or human-readable names from WooCommerce. */
function toCategorySlug(value: string): string | null {
  const asSlug = normalizeCategorySlug(value);
  if (asSlug) return asSlug;

  const fromName = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return normalizeCategorySlug(fromName);
}

/**
 * All category slugs for a product (deduplicated, stable API order).
 * Order: `category_slug[]` first, then extra entries from `categories[]`.
 */
export function getProductCategorySlugs(
  product: ProductCategorySource,
): string[] {
  const slugs: string[] = [];
  const seen = new Set<string>();

  const add = (raw: string) => {
    const normalized = toCategorySlug(raw);
    if (!normalized || seen.has(normalized)) return;
    if (!VALID_SHOP_CATEGORY_SLUGS.has(normalized)) return;
    seen.add(normalized);
    slugs.push(normalized);
  };

  for (const raw of product.category_slug ?? []) {
    add(raw);
  }

  for (const raw of product.categories ?? []) {
    add(raw);
  }

  if (slugs.length === 0) {
    slugs.push(DEFAULT_PRODUCT_CATEGORY_SLUG);
  }

  return slugs;
}

/**
 * Primary category from the WP API (Yoast primary, else first assigned term).
 * Falls back to the first valid slug on this product when the API omits primary fields.
 */
export function getPrimaryCategorySlug(product: ProductCategorySource): string {
  const assigned = getProductCategorySlugs(product);

  const apiCandidates = [
    product.primary_category_slug,
    product.primary_category,
  ];

  for (const candidate of apiCandidates) {
    if (!candidate?.trim()) continue;
    const normalized = toCategorySlug(candidate);
    if (!normalized || !VALID_SHOP_CATEGORY_SLUGS.has(normalized)) continue;
    if (assigned.includes(normalized)) return normalized;
  }

  return assigned[0] ?? DEFAULT_PRODUCT_CATEGORY_SLUG;
}

/** ASCII-safe shop path for a product in a given category segment. */
export function getProductShopPath(
  product: ProductCategorySource,
  categorySlug?: string,
): string {
  const category = categorySlug ?? getPrimaryCategorySlug(product);
  const slug = slugFromApi(product.slug);
  return `/shop/${category}/${slug}`;
}

/**
 * Build unique { category, slug } pairs for generateStaticParams.
 * One static page per category when a product is in multiple categories.
 */
export function buildShopProductStaticParams(
  products: ProductCategorySource[],
): ShopProductRouteParam[] {
  const seen = new Set<string>();
  const params: ShopProductRouteParam[] = [];

  for (const product of products) {
    const slug = slugFromApi(product.slug);
    if (!slug) continue;

    for (const category of getProductCategorySlugs(product)) {
      const key = `${category}\0${slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      params.push({ category, slug });
    }
  }

  return params;
}

export function isPrimaryCategoryRoute(
  product: ProductCategorySource,
  categoryFromRoute: string,
): boolean {
  const routeCategory = toCategorySlug(categoryFromRoute);
  if (!routeCategory) return false;
  return routeCategory === getPrimaryCategorySlug(product);
}

/** Redirect only when a product belongs to multiple categories and the URL is not the primary one. */
export function shouldRedirectToPrimaryCategory(
  product: ProductCategorySource,
  categoryFromRoute: string,
): boolean {
  if (getProductCategorySlugs(product).length <= 1) return false;
  return !isPrimaryCategoryRoute(product, categoryFromRoute);
}

/**
 * Canonical URL always uses the primary (first) category path.
 */
export function getProductCanonicalUrl(product: ProductCategorySource): string {
  const primaryCategory = getPrimaryCategorySlug(product);
  const preferredPath = getProductShopPath(product, primaryCategory);
  const preferredAbsolute = `${SITE_URL.replace(/\/+$/, "")}${preferredPath}`;

  const fromWp =
    product.seo?.canonical?.trim() || product.permalink?.trim() || "";

  if (!fromWp) {
    return preferredAbsolute;
  }

  const sanitized = sanitizeCanonicalUrl(fromWp);

  try {
    const parsed = new URL(sanitized, SITE_URL);
    const shopMatch = parsed.pathname.match(/^\/shop\/([^/]+)\/([^/]+)\/?$/);

    if (shopMatch) {
      parsed.pathname = preferredPath;
      return parsed.toString();
    }
  } catch {
    // Fall through to preferred URL.
  }

  return preferredAbsolute;
}

export type ProductCategoryRedirect = {
  fromPath: string;
  toPath: string;
};

/** Secondary category URLs → primary (first category) URL for Apache 301 rules. */
export function buildSecondaryCategoryRedirects(
  products: ProductCategorySource[],
): ProductCategoryRedirect[] {
  const redirects: ProductCategoryRedirect[] = [];
  const seen = new Set<string>();

  for (const product of products) {
    const categories = getProductCategorySlugs(product);
    if (categories.length <= 1) continue;

    const primary = getPrimaryCategorySlug(product);
    const slug = slugFromApi(product.slug);
    if (!slug) continue;

    const toPath = getProductShopPath(product, primary);

    for (const category of categories) {
      if (category === primary) continue;

      const fromPath = getProductShopPath(product, category);
      if (seen.has(fromPath)) continue;
      seen.add(fromPath);

      redirects.push({ fromPath, toPath });
    }
  }

  return redirects;
}

/** Apache RewriteRule lines for static hosting (append to public/.htaccess). */
export function formatApacheShopCategoryRedirects(
  redirects: ProductCategoryRedirect[],
): string {
  return redirects
    .map(({ fromPath, toPath }) => {
      const from = fromPath.replace(/^\//, "").replace(/\/+$/, "");
      const to = toPath.endsWith("/") ? toPath : `${toPath}/`;
      return `RewriteRule ^${from}/?$ ${to} [R=301,L]`;
    })
    .join("\n");
}
