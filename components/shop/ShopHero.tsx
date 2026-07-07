"use client";

import type { CSSProperties } from "react";

const heroGridStyle: CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, #A8DDF0 1px, transparent 1px),
    linear-gradient(to bottom, #A8DDF0 1px, transparent 1px)
  `,
  backgroundSize: "1px 1px",
  backgroundPosition: "0 0, 0 0",
  maskImage: `
    repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 80%)
  `,
  WebkitMaskImage: `
    repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 90%)
  `,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

export const pageDashedGridStyle: CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, #e7e5e4 1px, transparent 1px),
    linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
  `,
  backgroundSize: "5px 5px",
  backgroundPosition: "0 0, 0 0",
  maskImage: `
    repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
  `,
  WebkitMaskImage: `
    repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
  `,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

const ShopHero = () => {
  return (
    <section className="relative w-full overflow-hidden border-b border-neutral-200 bg-white">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={heroGridStyle}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(168, 221, 240, 0.35) 0%, transparent 45%),
            radial-gradient(circle at 50% 100%, rgba(168, 221, 240, 0.25) 0%, transparent 70%)
          `,
        }}
      />
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24 pt-24 sm:pt-28 md:pt-32">
        <div className="max-w-4xl mx-auto text-center animate-shop-fade-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sentient font-light text-textcolor mb-4 sm:mb-6 leading-tight">
            <span className="block">Shop</span>
            <span
              className="block mt-1 bg-clip-text text-transparent animate-hero-gradient-shift font-sentient"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #A8DDF0, #0F5C85, #A8DDF0)",
                backgroundSize: "200% auto",
              }}
            >
              Corporate Gifts
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-switzer text-textcolor max-w-3xl mx-auto leading-relaxed">
            Discover our extensive collection of premium corporate gifts in
            Dubai. From eco-friendly essentials to luxury accessories, find the
            perfect gift for every business occasion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShopHero;
