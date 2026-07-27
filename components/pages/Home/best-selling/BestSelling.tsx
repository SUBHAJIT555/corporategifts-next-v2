import BestSellingClient from "./BestSellingClient";
import type { PaginatedProductsResponse, ProductCategory } from "@/lib/api/types";
import {
  getAllCategories,
  getAllProducts,
  getCategoryPage,
} from "@/lib/build-cache";

export const dynamic = "force-static";

type CategoryPrefetch = Record<string, PaginatedProductsResponse>;

const PER_PAGE = 12;

const EMPTY_PAGINATED: PaginatedProductsResponse = {
  products: [],
  total: 0,
  total_pages: 1,
  page: 1,
  per_page: PER_PAGE,
};

function paginateProducts(
  products: Awaited<ReturnType<typeof getAllProducts>>,
  page = 1,
  perPage = PER_PAGE,
): PaginatedProductsResponse {
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    products: products.slice(start, start + perPage),
    total,
    total_pages: totalPages,
    page: safePage,
    per_page: perPage,
  };
}

/**
 * Uses the shared build-cache (retries + single WP dataset) so Vercel static
 * export doesn't bake an empty Best Selling grid when live ProductsApi fails.
 */
export default async function BestSelling() {
  let categories: ProductCategory[] = [];
  let initial: PaginatedProductsResponse = EMPTY_PAGINATED;
  let byCategory: CategoryPrefetch = {};

  try {
    const [allProducts, allCategories] = await Promise.all([
      getAllProducts(),
      getAllCategories(),
    ]);

    categories = Array.isArray(allCategories) ? allCategories : [];
    initial = paginateProducts(
      Array.isArray(allProducts) ? allProducts : [],
      1,
      PER_PAGE,
    );

    const topCategorySlugs = categories
      .slice(0, 10)
      .map((c) => c.slug)
      .filter(Boolean);

    const categoryEntries = await Promise.all(
      topCategorySlugs.map(async (slug) => {
        try {
          const data = await getCategoryPage(slug, 1, PER_PAGE);
          return [slug, data] as const;
        } catch (error) {
          console.error(
            `Failed to load best-selling category "${slug}":`,
            error,
          );
          return [slug, EMPTY_PAGINATED] as const;
        }
      }),
    );

    byCategory = Object.fromEntries(categoryEntries);
  } catch (error) {
    console.error("Failed to load BestSelling data for homepage:", error);
  }

  return (
    <BestSellingClient
      initial={initial}
      categories={categories}
      byCategory={byCategory}
    />
  );
}
