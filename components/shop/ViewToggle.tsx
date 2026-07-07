"use client";

import { memo } from "react";
import { FiGrid, FiList } from "@/components/icons";
import { cn } from "@/lib/utilts";
import { useShopStore } from "@/stores/useShopStore";

type ViewToggleProps = {
  className?: string;
};

const ViewToggle = memo(function ViewToggle({ className }: ViewToggleProps) {
  const viewMode = useShopStore((state) => state.viewMode);
  const setViewMode = useShopStore((state) => state.setViewMode);

  return (
    <div
      className={cn(
        "flex items-center gap-0 border border-neutral-200 rounded-lg overflow-hidden ring-1 ring-neutral-200/80",
        className,
      )}
    >
      <button
        onClick={() => setViewMode("grid")}
        className={cn(
          "p-2.5 transition-colors duration-200",
          viewMode === "grid"
            ? "bg-highlight text-white"
            : "bg-white text-textcolor hover:bg-neutral-100",
        )}
        aria-label="Grid view"
      >
        <FiGrid className="w-5 h-5" />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={cn(
          "p-2.5 transition-colors duration-200",
          viewMode === "list"
            ? "bg-highlight text-white"
            : "bg-white text-textcolor hover:bg-neutral-100",
        )}
        aria-label="List view"
      >
        <FiList className="w-5 h-5" />
      </button>
    </div>
  );
});

export default ViewToggle;
