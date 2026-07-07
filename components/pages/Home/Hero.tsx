"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import CTAButton from "@/components/ui/CTAButton";

const SLIDES = [
  {
    image: "/assets/images/Home-page-hero-images/Apparel-&-accessories.webp",
    title: "Apparel & Accessories",
  },
  {
    image: "/assets/images/Home-page-hero-images/Bags-&-travel.webp",
    title: "Bags & Travel",
  },
  {
    image: "/assets/images/Home-page-hero-images/Office-&-stationary.webp",
    title: "Office & Stationary",
  },
  {
    image: "/assets/images/Home-page-hero-images/Technology-&-accessories.webp",
    title: "Technology & Accessories",
  },
  {
    image: "/assets/images/Home-page-hero-images/Eating-&-drinking.webp",
    title: "Eating & Drinking",
  },
  {
    image: "/assets/images/Home-page-hero-images/Premiums-gift-sets.webp",
    title: "Premium Gift Sets",
  },
  {
    image: "/assets/images/Home-page-hero-images/Sports-&-recreation.webp",
    title: "Sports & Recreation",
  },
  {
    image: "/assets/images/Home-page-hero-images/Eco-friendly.webp",
    title: "Eco Friendly",
  },
  {
    image: "/assets/images/Home-page-hero-images/Luxury-corporate-gifts.webp",
    title: "Luxury Corporate Gifts",
  },
];

const AUTO_ADVANCE = 3000;

export const GradientBars: React.FC = memo(() => {
  const numBars = 11;
  const gradientFrom = "rgb(15, 92, 133)";
  const gradientTo = "transparent";

  const bars = useMemo(() => {
    const calculateHeight = (index: number, total: number) => {
      const position = index / (total - 1);
      const maxHeight = 100;
      const minHeight = 30;
      const center = 0.5;
      const distanceFromCenter = Math.abs(position - center);
      const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
      return minHeight + (maxHeight - minHeight) * heightPercentage;
    };

    return Array.from({ length: numBars }).map((_, index) => {
      const height = calculateHeight(index, numBars);
      return {
        index,
        scale: height / 100,
      };
    });
  }, [numBars]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="flex h-full"
        style={{
          width: "100%",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {bars.map(({ index, scale }) => (
          <div
            key={index}
            style={{
              flex: `1 0 calc(100% / ${numBars})`,
              maxWidth: `calc(100% / ${numBars})`,
              height: "100%",
              background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
              transform: `scaleY(${scale})`,
              transformOrigin: "bottom",
              outline: "1px solid rgba(0, 0, 0, 0)",
              boxSizing: "border-box",
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
});

GradientBars.displayName = "GradientBars";

type RotatingHeroTitleProps = {
  slides: typeof SLIDES;
};

const RotatingHeroTitle = memo(({ slides }: RotatingHeroTitleProps) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_ADVANCE);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, slides]);

  return (
    <>
      <div className="relative h-14 sm:h-18 md:h-24 lg:h-28 xl:h-32 mb-3 sm:mb-4 flex items-center justify-center md:justify-start w-full max-w-full overflow-hidden">
        {slides.map((slide, i) => (
          <h2
            key={slide.title}
            className={`absolute inset-0 flex items-center justify-center md:justify-center text-[#A8DDF0] text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold font-sentient tracking-tight transition-all duration-500 ease-out hero-3d-heading ${i === index
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            {slide.title}
          </h2>
        ))}
      </div>

      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-300 ${
              i === index
                ? "w-10 h-3 rounded-full bg-[#0F5C85]"
                : "w-3 h-3 rounded-full bg-[#D9D9D9] hover:bg-[#C0C0C0]"
            }`}
            aria-label={`Go to ${slide.title}`}
          />
        ))}
      </div> */}
    </>
  );
});

RotatingHeroTitle.displayName = "RotatingHeroTitle";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-neutral-100 py-16 sm:py-20 md:py-24"
    >
      {/* Flat background */}
      <div className="absolute inset-0 bg-neutral-100 z-0" />

      {/* Gradient bars background with subtle parallax */}
      <div className="absolute inset-0 z-0 opacity-80" aria-hidden="true">
        <GradientBars />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-6xl animate-fade-up mx-auto">
        <div className="flex flex-col items-center justify-center text-center select-none px-2 sm:px-4 md:px-8 lg:px-12">
          <h1 className="inline-flex items-center gap-2 text-textcolor text-xs sm:text-sm md:text-base font-sentient mb-3 sm:mb-4 border border-neutral-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-white/80 backdrop-blur-sm ring-1 ring-neutral-300 ring-offset-2 md:ring-offset-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F5C85"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 rotate-20"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 9a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -2" />
              <path d="M12 8l0 13" />
              <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" />
            </svg>
            <span>
            Corporate Gifts Supplier in Dubai for Custom, Luxury & Promotional Gifts
            </span>
          </h1>

          <RotatingHeroTitle slides={SLIDES} />

          <p className="text-neutral-800 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-medium font-switzer mb-5 sm:mb-7 max-w-4xl animate-fade-up delay-200">
          Baharnani Advertising helps UAE businesses choose custom corporate gifts in Dubai for clients, employees, events, and brand awareness. We provide a wide range of smart corporate gifts, premium hampers, affordable corporate gifts, branded stationery, bags, drinkware, and apparel. Practical gifts with logo printing, packaging and bulk delivery support in Dubai and the UAE.

          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-fade-up delay-300">
            <NoPrefetchLink href="/products">
              <CTAButton
                label="Explore Corporate Gifts"
                variant="light"
                className="w-full sm:w-auto max-w-xs mx-auto text-xs sm:text-sm md:text-base font-sentient font-medium  cursor-pointer bg-linear-to-r! from-neutral-100! to-neutral-300! ring-1! ring-neutral-300! ring-offset-2! md:ring-offset-4!"
              />
            </NoPrefetchLink>

            <NoPrefetchLink href="/contact-us">
              <CTAButton
                label="Get Bulk Quote"
                variant="default"
                className="w-full sm:w-auto max-w-xs mx-auto text-xs sm:text-sm md:text-base font-sentient font-medium  cursor-pointer bg-linear-to-r! from-neutral-700! to-neutral-300! ring-1! ring-neutral-300! ring-offset-2! md:ring-offset-4!"
              />
            </NoPrefetchLink>
          </div>
        </div>
      </div>
    </section>
  );
}
