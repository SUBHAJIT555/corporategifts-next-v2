import type {
  PaginatedProductsResponse,
  Product,
  ProductCategory,
  ProductDetails,
} from "@/lib/api/types";
import { slugForFetch } from "@/lib/exportSlug";
import { getProductCategorySlugs } from "@/lib/productCategories";
import {
  fetchAllCategories,
  fetchAllProductsPaginated,
  fetchProductDetailsBySlug,
} from "@/lib/woo-build-fetch";

const DEFAULT_PAGE_SIZE = 12;

let productsPromise: Promise<Product[]> | null = null;
let categoriesPromise: Promise<ProductCategory[]> | null = null;
let groupedProductsPromise: Promise<Map<string, Product[]>> | null = null;
let productBySlugPromise: Promise<Map<string, Product>> | null = null;
const productDetailsPromiseBySlug = new Map<string, Promise<ProductDetails | null>>();

function emptyPaginatedResponse(
  page: number,
  perPage: number,
): PaginatedProductsResponse {
  return {
    products: [],
    total: 0,
    total_pages: 1,
    page,
    per_page: perPage,
  };
}


function mergeListCategoryFields(
  details: ProductDetails,
  fromList?: Product,
): ProductDetails {
  if (!fromList) return details;

  return {
    ...details,
    categories: fromList.categories?.length ? fromList.categories : details.categories,
    category_slug: fromList.category_slug?.length
      ? fromList.category_slug
      : details.category_slug,
    primary_category: fromList.primary_category ?? details.primary_category,
    primary_category_slug:
      fromList.primary_category_slug ?? details.primary_category_slug,
  };
}

function findListProduct(
  productsBySlug: Map<string, Product>,
  slug: string,
): Product | undefined {
  if (productsBySlug.has(slug)) {
    return productsBySlug.get(slug);
  }

  for (const [key, product] of productsBySlug) {
    if (key === slug || decodeURIComponent(key) === slug) {
      return product;
    }
  }

  return undefined;
}

function hasUsableProductDetails(
  product: Product | ProductDetails | null | undefined,
): product is ProductDetails {
  if (!product) return false;
  return (
    typeof (product as ProductDetails).description === "string" &&
    Array.isArray((product as ProductDetails).gallery) &&
    typeof (product as ProductDetails).main_image === "string"
  );
}

function hasSeoShape(value: unknown): value is ProductDetails["seo"] {
  if (!value || typeof value !== "object") return false;
  const seo = value as Record<string, unknown>;
  return typeof seo.title === "string" && typeof seo.description === "string";
}

function createLimiter(maxConcurrent: number) {
  let active = 0;
  const queue: Array<() => void> = [];

  const next = () => {
    if (active >= maxConcurrent) return;
    const run = queue.shift();
    if (!run) return;
    active += 1;
    run();
  };

  return function runLimited<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      queue.push(async () => {
        try {
          resolve(await fn());
        } catch (error) {
          reject(error);
        } finally {
          active -= 1;
          next();
        }
      });
      next();
    });
  };
}

const runDetailsRequestLimited = createLimiter(4);

/**
 * Build-time singleton dataset to keep WordPress load low.
 * Every static route/helper reads from this in-memory cache.
 */
export async function getAllProducts(): Promise<Product[]> {
  if (!productsPromise) {
    productsPromise = (async () => {
      try {
        return await fetchAllProductsPaginated("build-cache:getAllProducts");
      } catch (error) {
        console.warn(`[build-cache] products fetch failed; using empty list. ${String(error)}`);
        return [];
      }
    })();
  }
  return productsPromise;
}

export async function getAllCategories(): Promise<ProductCategory[]> {
  if (!categoriesPromise) {
    categoriesPromise = (async () => {
      try {
        return await fetchAllCategories("build-cache:getAllCategories");
      } catch (error) {
        console.warn(
          `[build-cache] categories fetch failed; using empty list. ${String(error)}`,
        );
        return [];
      }
    })();
  }
  return categoriesPromise;
}

async function getGroupedProductsByCategory(): Promise<Map<string, Product[]>> {
  if (!groupedProductsPromise) {
    groupedProductsPromise = (async () => {
      const grouped = new Map<string, Product[]>();
      const products = await getAllProducts();

      for (const product of products) {
        for (const categorySlug of getProductCategorySlugs(product)) {
          const existing = grouped.get(categorySlug) ?? [];
          existing.push(product);
          grouped.set(categorySlug, existing);
        }
      }

      return grouped;
    })();
  }
  return groupedProductsPromise;
}

async function getProductsBySlugMap(): Promise<Map<string, Product>> {
  if (!productBySlugPromise) {
    productBySlugPromise = (async () => {
      const map = new Map<string, Product>();
      const products = await getAllProducts();
      for (const product of products) {
        map.set(product.slug, product);
      }
      return map;
    })();
  }
  return productBySlugPromise;
}

export async function getProductBySlug(slug: string): Promise<ProductDetails | null> {
  if (productDetailsPromiseBySlug.has(slug)) {
    return productDetailsPromiseBySlug.get(slug)!;
  }

  const promise = runDetailsRequestLimited(async () => {
    const productsBySlug = await getProductsBySlugMap();
    const fromBulk = findListProduct(productsBySlug, slug);

    // Reuse bulk object if it already contains full details + SEO.
    if (hasUsableProductDetails(fromBulk) && hasSeoShape((fromBulk as ProductDetails).seo)) {
      return mergeListCategoryFields(fromBulk as ProductDetails, fromBulk);
    }

    const details = await fetchProductDetailsBySlug(
      slugForFetch(slug),
      "build-cache:getProductBySlug",
    );
    if (!details) return null;

    // /product/{slug} omits category_slug + primary_category_slug — merge from /products list.
    return mergeListCategoryFields(details, fromBulk);
  });

  productDetailsPromiseBySlug.set(slug, promise);
  return promise;
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  const grouped = await getGroupedProductsByCategory();
  return grouped.get(slug) ?? [];
}

export async function getCategoryPageCount(
  slug: string,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<number> {
  const products = await getProductsByCategorySlug(slug);
  return Math.max(1, Math.ceil(products.length / pageSize));
}

export async function getCategoryPage(
  slug: string,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<PaginatedProductsResponse> {
  try {
    const categoryProducts = await getProductsByCategorySlug(slug);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      products: categoryProducts.slice(start, end),
      total: categoryProducts.length,
      total_pages: Math.max(1, Math.ceil(categoryProducts.length / pageSize)),
      page,
      per_page: pageSize,
    };
  } catch (error) {
    console.warn(
      `[build-cache] failed to build paginated category "${slug}"; using empty page. ${String(
        error,
      )}`,
    );
    return emptyPaginatedResponse(page, pageSize);
  }
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await getAllCategories();
  return categories.map((category) => category.slug).filter(Boolean);
}
