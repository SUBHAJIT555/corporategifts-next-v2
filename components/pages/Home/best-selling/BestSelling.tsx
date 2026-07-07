import BestSellingClient from "./BestSellingClient";
import { ProductsApi } from "@/lib/api/endpoints";
import type { PaginatedProductsResponse, ProductCategory } from "@/lib/api/types";

export const dynamic = "force-static";

type CategoryPrefetch = Record<string, Awaited<ReturnType<typeof ProductsApi.byCategory>>>;

const EMPTY_PAGINATED: PaginatedProductsResponse = {
    products: [],
    total: 0,
    total_pages: 1,
    page: 1,
    per_page: 12,
};

export default async function BestSelling() {
    let categories: ProductCategory[] = [];
    let initial: PaginatedProductsResponse = EMPTY_PAGINATED;
    let byCategory: CategoryPrefetch = {};

    try {
        const [categoriesResult, initialResult] = await Promise.all([
            ProductsApi.categories(),
            ProductsApi.all({ page: 1, per_page: 12 }),
        ]);

        categories = Array.isArray(categoriesResult) ? categoriesResult : [];
        initial =
            initialResult && Array.isArray(initialResult.products)
                ? initialResult
                : EMPTY_PAGINATED;

        const topCategorySlugs = categories
            .slice(0, 10)
            .map((c) => c.slug)
            .filter(Boolean);

        const categoryEntries = await Promise.all(
            topCategorySlugs.map(async (slug) => {
                try {
                    const data = await ProductsApi.byCategory({
                        categorySlug: slug,
                        page: 1,
                        per_page: 12,
                    });
                    const safeData =
                        data && Array.isArray(data.products) ? data : EMPTY_PAGINATED;
                    return [slug, safeData] as const;
                } catch (error) {
                    console.error(`Failed to load best-selling category "${slug}":`, error);
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