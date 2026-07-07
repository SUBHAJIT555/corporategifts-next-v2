"use client";

import { memo, useEffect } from "react";
import { LuX } from "@/components/icons";
import type { ProductCategory } from "@/lib/api/types";
import { cn } from "@/lib/utilts";
import { useShopNavigation } from "@/hooks/useShopRouterSync";
import { useShopStore } from "@/stores/useShopStore";

type CategoryModalProps = {
  categories?: ProductCategory[];
};

const CategoryModal = memo(function CategoryModal({
  categories,
}: CategoryModalProps) {
  const isCategoryModalOpen = useShopStore(
    (state) => state.isCategoryModalOpen,
  );
  const selectedCategory = useShopStore((state) => state.selectedCategory);
  const setIsCategoryModalOpen = useShopStore(
    (state) => state.setIsCategoryModalOpen,
  );
  const { selectCategory } = useShopNavigation();

  useEffect(() => {
    document.body.style.overflow = isCategoryModalOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCategoryModalOpen]);

  const closeModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleSelect = (category: string | null) => {
    selectCategory(category);
    closeModal();
  };

  return (
    <>
      <div
        onClick={closeModal}
        className={cn(
          "lg:hidden fixed inset-0 bg-black/50 z-200 transition-opacity duration-200",
          isCategoryModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      <div
        className={cn(
          "lg:hidden fixed top-0 left-0 right-0 z-201 bg-white shadow-xl max-h-[80vh] overflow-y-auto rounded-b-2xl border-x border-b border-neutral-200 transition-transform duration-300 ease-in-out",
          isCategoryModalOpen
            ? "translate-y-0 pointer-events-auto"
            : "-translate-y-full pointer-events-none",
        )}
      >
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-4 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-sentient font-light text-textcolor">
            All Categories
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <LuX className="w-5 h-5 text-textcolor" />
          </button>
        </div>

        <div className="px-4 py-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleSelect(null)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-switzer",
                  !selectedCategory
                    ? "bg-highlight text-white font-semibold"
                    : "text-textcolor hover:bg-neutral-100",
                )}
              >
                All Products
              </button>
            </li>
            {categories?.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleSelect(category.slug)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-switzer flex items-center justify-between",
                    selectedCategory === category.slug
                      ? "bg-highlight text-white font-semibold"
                      : "text-textcolor hover:bg-neutral-100",
                  )}
                >
                  <span>{category.name}</span>
                  <span className="text-sm opacity-75">
                    ({category.product_count})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
});

export default CategoryModal;
