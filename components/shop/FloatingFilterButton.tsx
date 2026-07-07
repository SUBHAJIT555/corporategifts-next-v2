"use client";

import { memo, useEffect, useRef, useState, type RefObject } from "react";
import { FiFilter } from "@/components/icons";
import { cn } from "@/lib/utilts";
import { useShopStore } from "@/stores/useShopStore";

type FloatingFilterButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
};

const FloatingFilterButton = memo(function FloatingFilterButton({
  targetRef,
}: FloatingFilterButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const setIsCategoryModalOpen = useShopStore(
    (state) => state.setIsCategoryModalOpen,
  );

  useEffect(() => {
    const updateVisibility = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        const section = targetRef.current;
        if (!section) {
          rafRef.current = null;
          return;
        }

        const scrollY = window.scrollY || window.pageYOffset;
        const rect = section.getBoundingClientRect();
        const shouldShow = rect.top < 0 && rect.bottom > 0 && scrollY > 200;

        setIsVisible((previousValue) => {
          return previousValue !== shouldShow ? shouldShow : previousValue;
        });

        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });

    const timeoutId = window.setTimeout(updateVisibility, 100);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      window.clearTimeout(timeoutId);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [targetRef]);

  return (
    <button
      onClick={() => setIsCategoryModalOpen(true)}
      className={cn(
        "lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-100 bg-highlight hover:bg-highlight/90 text-white px-6 py-3 rounded-xl shadow-lg font-sentient font-medium flex items-center gap-2 transition-all duration-200 ring-1 ring-offset-2 ring-neutral-200 ring-offset-white",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none",
      )}
    >
      <FiFilter className="w-5 h-5" />
      Filter
    </button>
  );
});

export default FloatingFilterButton;
