"use client";

import { memo, useMemo } from "react";
import type { ProductCategory } from "@/lib/api/types";
import { useShopStore } from "@/stores/useShopStore";
import ViewToggle from "./ViewToggle";

type ShopToolbarProps = {
  categories?: ProductCategory[];
};

const ShopToolbar = memo(function ShopToolbar({
  categories,
}: ShopToolbarProps) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <SelectedCategoryLabel categories={categories} />
      </div>
      <ViewToggle />
    </div>
  );
});

type SelectedCategoryLabelProps = {
  categories?: ProductCategory[];
};

const SelectedCategoryLabel = memo(function SelectedCategoryLabel({
  categories,
}: SelectedCategoryLabelProps) {
  const selectedCategory = useShopStore((state) => state.selectedCategory);

  const selectedCategoryLabel = useMemo(() => {
    if (!selectedCategory) {
      return "All Products";
    }

    return (
      categories?.find((category) => category.slug === selectedCategory)?.name ??
      "Select Category"
    );
  }, [categories, selectedCategory]);

  return (
    <p className="truncate text-sm font-medium text-muted sm:text-base">
      {selectedCategoryLabel}
    </p>
  );
});

export default ShopToolbar;
