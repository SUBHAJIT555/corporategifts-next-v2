"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import FloatingCategoryMenu from "@/components/ui/FloatingCategoryMenu";
import { RevealSection } from "@/components/ui/timeline-animation";
import { useProducts, useProductCategories } from "@/hooks/useProducts";
import { useShopNavigation, useShopRouterSync } from "@/hooks/useShopRouterSync";
import { useShopStore } from "@/stores/useShopStore";
import PaginationControls from "./PaginationControls";
import ProductGrid from "./ProductGrid";
import ShopToolbar from "./ShopToolbar";

type ShopContentProps = {
  initialPage: number;
};

const ShopContent = memo(function ShopContent({ initialPage }: ShopContentProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const { selectedCategory, currentPage } = useShopStore(
    useShallow((state) => ({
      selectedCategory: state.selectedCategory,
      currentPage: state.currentPage,
    })),
  );

  const { selectCategory } = useShopNavigation();
  const categoriesQuery = useProductCategories();
  const allProductsQuery = useProducts({ category: null, page: 1 });
  const productsQuery = useProducts({
    category: selectedCategory,
    page: currentPage,
  });

  useShopRouterSync({
    initialPage,
    totalPages: productsQuery.data?.total_pages,
    hasResolvedProducts:
      productsQuery.isFetched && !productsQuery.isPlaceholderData,
  });

  const categories = categoriesQuery.data;
  const products = productsQuery.data?.products ?? [];
  const totalPages = productsQuery.data?.total_pages ?? 1;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setMenuVisible(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      {
        threshold: [0, 0.2, 0.4],
        rootMargin: "-72px 0px -72px 0px",
      },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const categoryMenuItems = useMemo(
    () => [
      {
        label: "All Products",
        count: allProductsQuery.data?.total,
        active: !selectedCategory,
        onClick: () => selectCategory(null),
      },
      ...(categories ?? []).map((category) => ({
        label: category.name,
        count: category.product_count,
        active: selectedCategory === category.slug,
        onClick: () => selectCategory(category.slug),
      })),
    ],
    [
      allProductsQuery.data?.total,
      categories,
      selectCategory,
      selectedCategory,
    ],
  );

  const showFloatingFilter = Boolean(categories && categories.length > 0);

  return (
    <section className="relative w-full bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-4">
        <div ref={gridRef} className="relative">
          <ShopToolbar categories={categories} />
          <ProductGrid
            products={products}
            isLoading={productsQuery.isLoading}
            error={productsQuery.error}
          />
          <PaginationControls totalPages={totalPages} />
        </div>
      </RevealSection>

      {showFloatingFilter ? (
        <FloatingCategoryMenu
          visible={menuVisible}
          items={categoryMenuItems}
          triggerLabel="Filter"
        />
      ) : null}
    </section>
  );
});

export default ShopContent;
