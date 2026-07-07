"use client";

import { memo, useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { useProducts, useProductCategories } from "@/hooks/useProducts";
import { useShopRouterSync } from "@/hooks/useShopRouterSync";
import { useShopStore } from "@/stores/useShopStore";
import CategoryFilter from "./CategoryFilter";
import CategoryModal from "./CategoryModal";
import FloatingFilterButton from "./FloatingFilterButton";
import PaginationControls from "./PaginationControls";
import ProductGrid from "./ProductGrid";
import ShopToolbar from "./ShopToolbar";

type ShopContentProps = {
  initialPage: number;
};

const ShopContent = memo(function ShopContent({ initialPage }: ShopContentProps) {
  // console.log("ShopContent");
  // console.log("initialPage", initialPage);
  const mainContentRef = useRef<HTMLElement | null>(null);
  const { selectedCategory, currentPage } = useShopStore(
    useShallow((state) => ({
      selectedCategory: state.selectedCategory,
      currentPage: state.currentPage,
    })),
  );

  const categoriesQuery = useProductCategories();
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

  const shouldShowFloatingFilter = useMemo(() => {
    return Boolean(categories && categories.length > 1);
  }, [categories]);

  return (
    <>
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <CategoryFilter categories={categories} />

          <main ref={mainContentRef} className="flex-1">
            <ShopToolbar categories={categories} />
            <ProductGrid
              products={products}
              isLoading={productsQuery.isLoading}
              error={productsQuery.error}
            />
            <PaginationControls totalPages={totalPages} />
          </main>
        </div>
      </div>

      {shouldShowFloatingFilter && <FloatingFilterButton targetRef={mainContentRef} />}

      <CategoryModal categories={categories} />
    </>
  );
});

export default ShopContent;
