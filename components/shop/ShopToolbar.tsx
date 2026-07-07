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
    <>
      <div className="lg:hidden flex items-center justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <SelectedCategoryLabel categories={categories} />
        </div>

        <ViewToggle />
      </div>

      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <ViewToggle />
        </div>
      </div>
    </>
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
    <div className="text-base font-sentient font-light text-textcolor truncate">
      {selectedCategoryLabel}
    </div>
  );
});

export default ShopToolbar;
