"use client";

import { memo } from "react";
import { IoChevronBack, IoChevronForward } from "@/components/icons";
import { useShopNavigation } from "@/hooks/useShopRouterSync";
import { useShopStore } from "@/stores/useShopStore";
import { cn } from "@/lib/utilts";

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

  return (
    <div className="mt-6 flex items-center justify-center gap-4 border-t border-hairline pt-5">
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "rounded-lg border border-hairline bg-canvas p-2 text-ink transition-colors hover:bg-surface-card disabled:cursor-not-allowed disabled:opacity-40",
        )}
        aria-label="Previous page"
      >
        <IoChevronBack className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2 text-sm text-body sm:text-base">
        <span className="font-semibold text-ink">{currentPage}</span>
        <span className="text-muted">/</span>
        <span className="text-muted">{totalPages}</span>
      </div>

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "rounded-lg border border-hairline bg-canvas p-2 text-ink transition-colors hover:bg-surface-card disabled:cursor-not-allowed disabled:opacity-40",
        )}
        aria-label="Next page"
      >
        <IoChevronForward className="h-5 w-5" />
      </button>
    </div>
  );
});

export default PaginationControls;
