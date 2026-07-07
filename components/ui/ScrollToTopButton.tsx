"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utilts";
import {
  candyIconButtonClasses,
  candyNavIconClasses,
} from "@/components/ui/candy-button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const thresholdElement = document.getElementById("page-scroll-threshold");
    if (!thresholdElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting);
    });

    observer.observe(thresholdElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        candyIconButtonClasses("white", "md"),
        "fixed bottom-6 right-4 z-50 sm:right-6",
        "transition-all duration-300 ease-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp className={candyNavIconClasses} strokeWidth={2.25} />
    </button>
  );
};

export default ScrollToTopButton;
