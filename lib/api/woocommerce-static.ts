import type {
  PaginatedProductsResponse,
  Product,
  ProductCategory,
  ProductDetails,
} from "@/lib/api/types";
import {
  getAllCategories,
  getAllCategorySlugs,
  getAllProducts,
  getCategoryPage,
  getCategoryPageCount,
  getProductBySlug,
} from "@/lib/build-cache";

export async function getAllProductsForStaticBuild(): Promise<Product[]> {
  return getAllProducts();
}

export async function getAllCategorySlugsForStaticBuild(): Promise<string[]> {
  return getAllCategorySlugs();
}

export async function getCategoriesForStaticBuild(): Promise<
  ProductCategory[]
> {
  return getAllCategories();
}

export async function getCategoryPageForStaticBuild(
  slug: string,
  page = 1,
  perPage = 12,
): Promise<PaginatedProductsResponse> {
  return getCategoryPage(slug, page, perPage);
}

export async function getProductBySlugForStaticBuild(
  slug: string,
): Promise<ProductDetails | null> {
  return getProductBySlug(slug);
}

export async function getCategoryPaginationStaticParamsForBuild(
  slug: string,
  perPage = 12,
): Promise<Array<{ page: string }>> {
  try {
    const totalPages = await getCategoryPageCount(slug, perPage);

    return Array.from({ length: Math.max(1, totalPages) }, (_, index) => ({
      page: String(index + 1),
    }));
  } catch (error) {
    console.error(
      `Failed to generate static params for category "${slug}" paginated pages:`,
      error,
    );
    return [{ page: "1" }];
  }
}
