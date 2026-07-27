"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ProductGrid from "@/components/common/ProductGrid";
import { ProductsApi } from "@/lib/api/endpoints";
import type {
  PaginatedProductsResponse,
  ProductCategory,
} from "@/lib/api/types";

interface ProductGridClientProps {
  productData: PaginatedProductsResponse;
  categories: ProductCategory[];
  selectedCategory: string;
  id?: string;
  title: string;
  categorySlug: string;
  variant?: "default" | "home" | "category";
}

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
  const [resolvedData, setResolvedData] =
    useState<PaginatedProductsResponse>(productData);
  const [resolvedCategories, setResolvedCategories] =
    useState<ProductCategory[]>(categories);
  const [isLoading, setIsLoading] = useState(false);

  const targetId = id ?? "apparel-accessories";

  // Keep in sync when navigating between statically generated pages.
  useEffect(() => {
    setResolvedData(productData);
    setResolvedCategories(categories);
  }, [productData, categories]);

  // If build baked empty products (WP failed on Vercel), refetch in the browser.
  useEffect(() => {
    if (productData.products.length > 0) return;

    let cancelled = false;
    const page = productData.page || 1;

    async function loadFallback() {
      setIsLoading(true);
      try {
        const [cats, data] = await Promise.all([
          ProductsApi.categories(),
          ProductsApi.byCategory({
            categorySlug,
            page,
            per_page: productData.per_page || 12,
          }),
        ]);

        if (cancelled) return;

        const matched = (Array.isArray(cats) ? cats : []).filter(
          (category) => category.slug === categorySlug,
        );

        if (data && Array.isArray(data.products) && data.products.length > 0) {
          setResolvedData(data);
        }
        if (matched.length > 0) {
          setResolvedCategories(matched);
        }
      } catch (error) {
        console.error(
          `Category client fallback failed for "${categorySlug}":`,
          error,
        );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadFallback();
    return () => {
      cancelled = true;
    };
  }, [
    productData.products.length,
    productData.page,
    productData.per_page,
    categorySlug,
  ]);

  const handlePageChange = (newPage: number) => {
    const basePath = `/product-category/${categorySlug}`;
    const href = newPage === 1 ? basePath : `${basePath}/page/${newPage}`;
    router.push(href, { scroll: false });
  };

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [pathname, targetId]);

  return (
    <ProductGrid
      title={title}
      productType="custom"
      productData={resolvedData}
      onPageChange={handlePageChange}
      categories={resolvedCategories}
      isLoading={isLoading}
      error={null}
      selectedCategory={selectedCategory}
      id={id}
      variant={variant}
    />
  );
};

export default ProductGridClient;
