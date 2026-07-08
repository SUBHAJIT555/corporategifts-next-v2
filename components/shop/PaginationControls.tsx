"use client";

import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useShopNavigation } from "@/hooks/useShopRouterSync";
import { useShopStore } from "@/stores/useShopStore";
import {
  candyCarouselNavClasses,
  candyNavIconClasses,
} from "@/components/ui/candy-button";

type PaginationControlsProps = {
  totalPages: number;
};

const PaginationControls = memo(function PaginationControls({
  totalPages,
}: PaginationControlsProps) {
  const currentPage = useShopStore((state) => state.currentPage);
  const { goToPage } = useShopNavigation();

  if (totalPages <= 1) {
    return null;
  }

  const pageLabel = String(currentPage).padStart(2, "0");
  const totalPagesLabel = String(totalPages).padStart(2, "0");

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <p className="text-caption font-medium uppercase tracking-[0.14em] text-muted">
        <span className="text-ink">{pageLabel}</span>
        <span className="mx-1.5 text-muted-soft">/</span>
        {totalPagesLabel}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={candyCarouselNavClasses("prev")}
          aria-label="Previous page"
        >
          <ChevronLeft className={candyNavIconClasses} strokeWidth={2.25} />
        </button>

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={candyCarouselNavClasses("next")}
          aria-label="Next page"
        >
          <ChevronRight className={candyNavIconClasses} strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
});

export default PaginationControls;
