"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import ProductGrid from "@/components/common/ProductGrid";
import type {
  PaginatedProductsResponse,
  ProductCategory,
} from "@/lib/api/types";
import {
  seedCategoriesCache,
  seedProductsCache,
  useProductCategories,
  useProducts,
} from "@/hooks/useProducts";
import { scrollToProductSection } from "@/lib/scrollToProductSection";

interface ProductGridClientProps {
  productData: PaginatedProductsResponse;
  categories: ProductCategory[];
  selectedCategory: string;
  id?: string;
  title: string;
  categorySlug: string;
  variant?: "default" | "home" | "category";
}

const EMPTY: PaginatedProductsResponse = {
  products: [],
  total: 0,
  total_pages: 1,
  page: 1,
  per_page: 12,
};

/**
 * Category grids use the same browser fetch path as /shop (works on Vercel).
 * SSR/build data is only used to seed cache when present.
 */
const ProductGridClient = ({
  productData,
  categories,
  selectedCategory,
  id,
  title,
  categorySlug,
  variant = "default",
}: ProductGridClientProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const seededRef = useRef(false);
  const targetId = id ?? "apparel-accessories";
  const page =
    typeof productData?.page === "number" && productData.page > 0
      ? productData.page
      : 1;
  const perPage =
    typeof productData?.per_page === "number" && productData.per_page > 0
      ? productData.per_page
      : 12;

  if (!seededRef.current) {
    seededRef.current = true;
    seedCategoriesCache(categories);
    seedProductsCache({
      category: categorySlug,
      page,
      perPage,
      data: productData,
    });
  }

  const categoriesQuery = useProductCategories();
  const productsQuery = useProducts({
    category: categorySlug,
    page,
    perPage,
  });

  const resolvedData = productsQuery.data ?? productData ?? EMPTY;
  const resolvedCategories =
    Array.isArray(categories) && categories.length > 0
      ? categories
      : Array.isArray(categoriesQuery.data)
        ? categoriesQuery.data.filter((c) => c.slug === categorySlug)
        : [];

  const handlePageChange = (newPage: number) => {
    const basePath = `/product-category/${categorySlug}`;
    const href = newPage === 1 ? basePath : `${basePath}/page/${newPage}`;
    router.push(href, { scroll: false });
  };

  useEffect(() => {
    scrollToProductSection(targetId);
  }, [pathname, targetId]);

  const isLoading =
    productsQuery.isLoading ||
    (productsQuery.isPlaceholderData && !productsQuery.data);

  return (
    <ProductGrid
      title={title}
      productType="custom"
      productData={resolvedData}
      onPageChange={handlePageChange}
      categories={resolvedCategories}
      isLoading={isLoading}
      error={productsQuery.error}
      selectedCategory={selectedCategory}
      id={id}
      variant={variant}
    />
  );
};

export default ProductGridClient;
