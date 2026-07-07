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
      type="button"
      onClick={handleClick}
      className={cn(
        "w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 sm:text-base",
        productCount !== undefined && "flex items-center justify-between gap-2",
        isSelected
          ? "bg-ink font-semibold text-on-primary"
          : "text-body hover:bg-surface-card hover:text-ink",
      )}
    >
      <span>{name}</span>
      {productCount !== undefined ? (
        <span className={cn("text-xs", isSelected ? "opacity-80" : "text-muted")}>
          ({productCount})
        </span>
      ) : null}
    </button>
  );
});

const CategoryFilter = memo(function CategoryFilter({
  categories,
}: CategoryFilterProps) {
  const selectedCategory = useShopStore((state) => state.selectedCategory);
  const { selectCategory } = useShopNavigation();

  return (
    <aside className="hidden w-full shrink-0 lg:block lg:w-64 xl:w-72">
      <div className="sticky top-28 overflow-hidden rounded-2xl border border-hairline bg-surface-card p-5">
        <h2 className="mb-4 text-lg font-semibold text-ink sm:text-xl">
          All Categories
        </h2>
        <ul className="space-y-1">
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
