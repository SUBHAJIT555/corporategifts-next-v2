"use client";

import { useEffect, useState } from "react";

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
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-4 sm:right-8 z-50
        p-1 rounded-xl ring ring-neutral-300 ring-offset-2 cursor-pointer
        bg-neutral-100 backdrop-blur-sm
        text-neutral-700 border border-neutral-300
        shadow-lg
        hover:bg-[#080f0f]
        transition-all duration-300 ease-out
        hover:text-[#e1e1e1] hover:border-[#e1e1e1]

        ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="md:size-7 size-5"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5v6m0 3v1.5m0 3v.5" />
        <path d="M18 11l-6 -6" />
        <path d="M6 11l6 -6" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
