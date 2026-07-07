"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  CupSoda,
  Dumbbell,
  Gem,
  Gift,
  Laptop,
  Leaf,
  NotebookPen,
  Shirt,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { candyDarkButtonClasses, candyWhiteButtonClasses } from "@/components/ui/candy-button";
import {
  Reveal,
  RevealSection,
} from "@/components/ui/timeline-animation";

const SLIDES: {
  image: string;
  title: string;
  icon: LucideIcon;
}[] = [
  {
    image: "/assets/images/Home-page-hero-images/Apparel-&-accessories.webp",
    title: "Apparel & Accessories",
    icon: Shirt,
  },
  {
    image: "/assets/images/Home-page-hero-images/Bags-&-travel.webp",
    title: "Bags & Travel",
    icon: Briefcase,
  },
  {
    image: "/assets/images/Home-page-hero-images/Office-&-stationary.webp",
    title: "Office & Stationary",
    icon: NotebookPen,
  },
  {
    image: "/assets/images/Home-page-hero-images/Technology-&-accessories.webp",
    title: "Technology & Accessories",
    icon: Laptop,
  },
  {
    image: "/assets/images/Home-page-hero-images/Eating-&-drinking.webp",
    title: "Eating & Drinking",
    icon: CupSoda,
  },
  {
    image: "/assets/images/Home-page-hero-images/Premiums-gift-sets.webp",
    title: "Premium Gift Sets",
    icon: Gift,
  },
  {
    image: "/assets/images/Home-page-hero-images/Sports-&-recreation.webp",
    title: "Sports & Recreation",
    icon: Dumbbell,
  },
  {
    image: "/assets/images/Home-page-hero-images/Eco-friendly.webp",
    title: "Eco Friendly",
    icon: Leaf,
  },
  {
    image: "/assets/images/Home-page-hero-images/Luxury-corporate-gifts.webp",
    title: "Luxury Corporate Gifts",
    icon: Gem,
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

type HeroShowcaseCardProps = {
  index: number;
};

// Product showcase card — cross-fades through the category images.
const HeroShowcaseCard = memo(({ index }: HeroShowcaseCardProps) => {
  const activeSlide = SLIDES[index];
  const CategoryIcon = activeSlide.icon;

  return (
    <div className="relative mx-auto w-full max-w-md rounded-2xl border border-hairline bg-canvas p-2.5 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.28)] sm:p-3 lg:max-w-none">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-surface-card">
        {SLIDES.map((slide, i) => (
          <Image
            key={slide.title}
            src={slide.image}
            alt={slide.title}
            fill
            sizes="(min-width: 1024px) 44vw, (min-width: 640px) 28rem, 92vw"
            priority={i === 0}
            className={`object-cover transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Category label chip */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/40 bg-white/25 px-3 py-1.5 text-caption font-medium text-warning shadow-[0_2px_10px_rgba(0,0,0,0.12)] ring-1 ring-white/20 backdrop-blur-md dark:border-white/15 dark:bg-white/10">
            <CategoryIcon className="h-3.5 w-3.5 shrink-0 text-warning" />
            | {activeSlide.title}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {SLIDES.map((slide, i) => (
          <span
            key={slide.title}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-ink" : "w-1.5 bg-surface-strong"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
});

HeroShowcaseCard.displayName = "HeroShowcaseCard";

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_ADVANCE);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return (
    <section className="relative w-full bg-canvas">
      <RevealSection className="relative mx-auto max-w-7xl border-x border-hairline px-5 pt-24 pb-14 sm:px-6 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28">
        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="text-center lg:col-span-6 lg:text-left">
            <Reveal
              animationNum={0}
              className="mb-5 flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-hairline border-dashed bg-surface-card px-3 py-1 text-caption font-medium text-body">
                <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
                Corporate Gifts in Dubai &amp; UAE
              </span>
            </Reveal>

            <Reveal as="h1" animationNum={1} className="text-display-lg text-ink">
              Corporate Gifts Supplier in Dubai for Custom, Luxury &amp;
              Promotional Gifts
            </Reveal>

            <Reveal
              animationNum={2}
              className="mx-auto mt-5 max-w-xl text-body-md text-muted sm:mt-6 lg:mx-0"
            >
              Baharnani Advertising helps UAE businesses choose custom corporate
              gifts in Dubai for clients, employees, events, and brand awareness.
              We provide a wide range of smart corporate gifts, premium hampers,
              affordable corporate gifts, branded stationery, bags, drinkware,
              and apparel. Practical gifts with logo printing, packaging and bulk
              delivery support in Dubai and the UAE.
            </Reveal>

            <Reveal
              animationNum={3}
              className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
            >
              <NoPrefetchLink
                href="/products"
                className={candyDarkButtonClasses("group w-full sm:w-auto")}
              >
                Explore Corporate Gifts
              </NoPrefetchLink>
              <NoPrefetchLink
                href="/contact-us"
                className={candyWhiteButtonClasses("w-full sm:w-auto")}
              >
                Get Bulk Quote
              </NoPrefetchLink>
            </Reveal>
          </div>

          <Reveal animationNum={4} className="lg:col-span-6">
            <HeroShowcaseCard index={index} />
          </Reveal>
        </div>
      </RevealSection>
    </section>
  );
}
