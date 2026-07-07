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
      role="group"
      aria-label="View mode"
      className={cn(
        "relative inline-grid h-10 w-20 shrink-0 grid-cols-2 overflow-hidden rounded-xl border border-hairline bg-canvas",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-ink transition-transform duration-200 ease-out",
          viewMode === "list" && "translate-x-full",
        )}
      />

      <button
        type="button"
        onClick={() => setViewMode("grid")}
        aria-pressed={viewMode === "grid"}
        aria-label="Grid view"
        className={cn(
          "relative z-10 flex items-center justify-center transition-colors duration-200",
          viewMode === "grid" ? "text-on-primary" : "text-ink",
        )}
      >
        <FiGrid className="h-[18px] w-[18px]" />
      </button>

      <button
        type="button"
        onClick={() => setViewMode("list")}
        aria-pressed={viewMode === "list"}
        aria-label="List view"
        className={cn(
          "relative z-10 flex items-center justify-center transition-colors duration-200",
          viewMode === "list" ? "text-on-primary" : "text-ink",
        )}
      >
        <FiList className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
});

export default ViewToggle;
