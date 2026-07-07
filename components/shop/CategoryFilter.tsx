"use client";

import { memo, useCallback } from "react";
import type { ProductCategory } from "@/lib/api/types";
import { cn } from "@/lib/utilts";
import { useShopNavigation } from "@/hooks/useShopRouterSync";
import { useShopStore } from "@/stores/useShopStore";

type CategoryFilterProps = {
  categories?: ProductCategory[];
};

type CategoryButtonProps = {
  slug: string | null;
  name: string;
  productCount?: number;
  isSelected: boolean;
  onSelect: (category: string | null) => void;
};

const CategoryButton = memo(function CategoryButton({
  slug,
  name,
  productCount,
  isSelected,
  onSelect,
}: CategoryButtonProps) {
  const handleClick = useCallback(() => {
    onSelect(slug);
  }, [onSelect, slug]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 font-switzer text-sm sm:text-base",
        productCount !== undefined && "flex items-center justify-between gap-2",
        isSelected
          ? "bg-highlight text-white font-semibold shadow-sm"
          : "text-textcolor hover:bg-neutral-100",
      )}
    >
      <span>{name}</span>
      {productCount !== undefined && (
        <span className="text-sm opacity-75">({productCount})</span>
      )}
    </button>
  );
});

const CategoryFilter = memo(function CategoryFilter({
  categories,
}: CategoryFilterProps) {
  const selectedCategory = useShopStore((state) => state.selectedCategory);
  const { selectCategory } = useShopNavigation();

  return (
    <aside className="hidden lg:block w-full lg:w-64 xl:w-80 shrink-0">
      <div className="bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-2xl p-6 sticky top-28 ring-1 ring-neutral-200/80 ring-offset-4">
        <h2 className="text-xl sm:text-2xl font-sentient font-semibold text-textcolor mb-6">
          All Categories
        </h2>
        <ul className="space-y-2">
          <li>
            <CategoryButton
              slug={null}
              name="All Products"
              isSelected={!selectedCategory}
              onSelect={selectCategory}
            />
          </li>
          {categories?.map((category) => (
            <li key={category.id}>
              <CategoryButton
                slug={category.slug}
                name={category.name}
                productCount={category.product_count}
                isSelected={selectedCategory === category.slug}
                onSelect={selectCategory}
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
});

export default CategoryFilter;
