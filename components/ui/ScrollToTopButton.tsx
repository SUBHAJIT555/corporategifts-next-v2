"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utilts";

const PROGRESS_RADIUS = 46;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const nextVisible = scrollY > 120;
      const nextProgress =
        maxScroll > 0 ? Math.min(100, (scrollY / maxScroll) * 100) : 0;

      setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));
      setProgress((prev) =>
        Math.abs(prev - nextProgress) < 0.25 ? prev : nextProgress,
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const strokeDashoffset =
    PROGRESS_CIRCUMFERENCE - (progress / 100) * PROGRESS_CIRCUMFERENCE;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-4 z-51 hidden sm:right-6 md:block md:bottom-8 md:right-8",
        "transition-opacity duration-300 ease-out",
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={`Scroll to top — ${Math.round(progress)}% of page`}
        className="group relative flex size-12 cursor-pointer items-center justify-center rounded-full lg:size-14"
      >
        <svg
          aria-hidden
          className="absolute inset-0 size-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={PROGRESS_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-hairline"
          />
          <circle
            cx="50"
            cy="50"
            r={PROGRESS_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={PROGRESS_CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className="text-brand-accent transition-[stroke-dashoffset] duration-150 lg:stroke-6"
          />
        </svg>

        <span
          className={cn(
            "relative flex size-9 items-center justify-center rounded-full lg:size-10",
            "border border-dashed border-hairline bg-canvas text-ink",
            "shadow-[0_4px_16px_-6px_rgba(0,0,0,0.12)]",
            "transition-colors duration-200",
            "group-hover:border-brand-accent/40 group-hover:bg-surface-soft group-hover:text-brand-accent",
            "dark:shadow-[0_4px_16px_-6px_rgba(0,0,0,0.45)]",
          )}
        >
          <ArrowUp className="size-4 lg:size-5" strokeWidth={2.25} />
        </span>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
