"use client";

import { memo, useEffect, useState } from "react";
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
import { AnimatePresence, motion } from "motion/react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  candyDarkButtonClasses,
  candyWhiteButtonClasses,
} from "@/components/ui/candy-button";
import GoogleRatingStatic from "@/components/ui/GoogleRatingStatic";

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

const SLIDE_DURATION_MS = 4500;
const CROSSFADE_DURATION = 1;

export const GradientBars: React.FC = memo(() => {
  const numBars = 11;
  const gradientFrom = "rgb(15, 92, 133)";
  const gradientTo = "transparent";

  const bars = Array.from({ length: numBars }).map((_, index) => {
    const position = index / (numBars - 1);
    const maxHeight = 100;
    const minHeight = 30;
    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
    const scale = (minHeight + (maxHeight - minHeight) * heightPercentage) / 100;

    return { index, scale };
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="flex h-full w-full">
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
            }}
          />
        ))}
      </div>
    </div>
  );
});

GradientBars.displayName = "GradientBars";

function HeroCarousel({ activeIndex }: { activeIndex: number }) {
  const slide = SLIDES[activeIndex];
  const CategoryIcon = slide.icon;

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={slide.image}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04, x: "0%" }}
          animate={{
            opacity: 1,
            scale: 1.06,
            x: "-1%",
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: CROSSFADE_DURATION,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          transition={{
            opacity: {
              duration: CROSSFADE_DURATION,
              ease: [0.4, 0, 0.2, 1],
            },
            scale: {
              duration: SLIDE_DURATION_MS / 1000,
              ease: "linear",
            },
            x: {
              duration: SLIDE_DURATION_MS / 1000,
              ease: "linear",
            },
          }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="(max-width: 768px) 100vw, (min-width: 1024px) 1024px, 100vw"
            priority={activeIndex === 0}
            className="object-cover object-center"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-black/45 via-black/15 to-transparent" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-10 left-3 z-20 sm:bottom-11 sm:left-4"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/40 bg-white/25 px-3 py-1.5 text-caption font-medium text-warning shadow-[0_2px_10px_rgba(0,0,0,0.12)] ring-1 ring-white/20 backdrop-blur-md dark:border-white/15 dark:bg-white/10">
            <CategoryIcon className="h-3.5 w-3.5 shrink-0 text-warning" />|
            {slide.title}
          </span>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-1.5 sm:bottom-4">
        {SLIDES.map((item, i) => (
          <motion.span
            key={item.title}
            layout
            className="h-1.5 rounded-full bg-white/90"
            animate={{
              width: i === activeIndex ? 20 : 6,
              opacity: i === activeIndex ? 1 : 0.45,
            }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="w-full bg-canvas">
      <div className="mx-auto max-w-7xl border-x border-hairline">
        <ContainerScroll
          className="px-3 pt-20 pb-6 sm:px-4 sm:pt-24 sm:pb-8 md:px-6 md:pt-32 md:pb-0 lg:pt-36"
          titleComponent={
            <>
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-2.5 py-1 text-[11px] font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] sm:px-3 sm:text-caption dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
                <Sparkles className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
                <span className="text-left sm:text-center">
                  Corporate Gifts in Dubai &amp; UAE
                </span>
              </span>

              <h1 className="mt-4 text-display-lg text-ink sm:mt-5 md:text-display-xl">
                Corporate Gifts Supplier in Dubai for Custom, Luxury &amp;
                Promotional Gifts
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-body-md text-muted sm:mt-6 sm:text-[17px] sm:leading-7">
                Baharnani Advertising helps UAE businesses choose custom corporate
                gifts in Dubai for clients, employees, events, and brand awareness.
                We provide a wide range of smart corporate gifts, premium hampers,
                affordable corporate gifts, branded stationery, bags, drinkware,
                and apparel. Practical gifts with logo printing, packaging and bulk
                delivery support in Dubai and the UAE.
              </p>

              <div className="mt-5 flex justify-center sm:mt-6">
                <GoogleRatingStatic />
              </div>

              <div className="mt-5 flex w-full flex-col gap-2.5 sm:mt-7 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
                <NoPrefetchLink
                  href="/products"
                  className={candyDarkButtonClasses("w-full sm:w-auto")}
                >
                  Explore Corporate Gifts
                </NoPrefetchLink>
                <NoPrefetchLink
                  href="/contact-us"
                  className={candyWhiteButtonClasses("w-full sm:w-auto")}
                >
                  Get Bulk Quote
                </NoPrefetchLink>
              </div>
            </>
          }
        >
          <HeroCarousel activeIndex={activeIndex} />
        </ContainerScroll>
      </div>
    </section>
  );
}
