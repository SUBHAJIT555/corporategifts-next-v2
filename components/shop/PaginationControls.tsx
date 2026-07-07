"use client";

import { memo } from "react";
import { IoChevronBack, IoChevronForward } from "@/components/icons";
import { useShopNavigation } from "@/hooks/useShopRouterSync";
import { useShopStore } from "@/stores/useShopStore";

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
    <div className="flex items-center justify-center gap-4 mt-8 py-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-neutral-300 ring ring-neutral-200 ring-offset-2 bg-white text-textcolor disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors cursor-pointer"
        aria-label="Previous page"
      >
        <IoChevronBack className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 font-switzer text-textcolor text-sm sm:text-base">
        <span className="text-neutral-700 rounded-md font-medium">
          {currentPage}
        </span>
        <span>/</span>
        <span>{totalPages}</span>
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-neutral-300 ring ring-neutral-200 ring-offset-2 bg-white text-textcolor disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors cursor-pointer"
        aria-label="Next page"
      >
        <IoChevronForward className="w-5 h-5" />
      </button>
    </div>
  );
});

export default PaginationControls;
