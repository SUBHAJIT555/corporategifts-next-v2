"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Award, ChevronLeft, ChevronRight } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import type { Product } from "@/lib/api/types";
import { getProductUrl } from "@/lib/getProductsUrl";
import Image from "next/image";
import {
  Reveal,
  RevealSection,
} from "@/components/ui/timeline-animation";
import {
  candyIconButtonClasses,
  candyNavIconClasses,
} from "@/components/ui/candy-button";

const FeatureBrandCard = memo(function FeatureBrandCard({
  brand,
}: {
  brand: Product;
}) {
  return (
    <NoPrefetchLink href={getProductUrl(brand)} className="block h-full">
      <article className="group relative flex h-full min-h-[320px] w-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface-card p-4 transition-colors duration-200 hover:bg-canvas sm:min-h-[340px] sm:p-5">
        <div className="relative mb-4 flex aspect-4/3 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-hairline bg-surface-soft sm:mb-5">
          <Image
            src={brand.image}
            alt={brand.name}
            width={500}
            height={500}
            className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:p-5"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {brand.categories?.[0] ? (
            <span className="mb-2 inline-flex w-fit max-w-full items-center rounded-md border border-dashed border-hairline bg-canvas px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-brand-accent">
              {brand.categories[0]}
            </span>
          ) : (
            <span className="mb-2 block h-[22px]" aria-hidden />
          )}

          <h3 className="mb-4 line-clamp-2 min-h-11 text-base font-semibold leading-snug text-ink sm:min-h-12 sm:text-[17px]">
            {brand.name}
          </h3>

          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-brand-accent">
            View product
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </NoPrefetchLink>
  );
});

export default function FeatureBrandClient({ brands }: { brands: Product[] }) {
  const safeBrands = useMemo(
    () => (Array.isArray(brands) ? brands : []),
    [brands]
  );
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      playOnInit: false,
    })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: false,
      containScroll: "trimSnaps",
    },
    [autoplayRef.current]
  );

  const syncCarouselState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    const updateAutoplay = () => {
      setShouldAutoplay(window.innerWidth >= 1280);
    };

    updateAutoplay();
    window.addEventListener("resize", updateAutoplay);

    return () => {
      window.removeEventListener("resize", updateAutoplay);
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const rafId = requestAnimationFrame(syncCarouselState);
    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);

    return () => {
      cancelAnimationFrame(rafId);
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reInit", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  useEffect(() => {
    if (!emblaApi) return;
    if (safeBrands.length < 2) return;

    const autoplay = emblaApi.plugins()?.autoplay as
      | { play?: () => void; stop?: () => void }
      | undefined;
    if (
      !autoplay ||
      typeof autoplay.play !== "function" ||
      typeof autoplay.stop !== "function"
    ) {
      return;
    }
    const playAutoplay = autoplay.play;
    const stopAutoplay = autoplay.stop;

    const rafId = window.requestAnimationFrame(() => {
      try {
        if (shouldAutoplay && window.innerWidth >= 1280) {
          playAutoplay();
        } else {
          stopAutoplay();
        }
      } catch (error) {
        console.error("Failed to control feature brand autoplay:", error);
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      try {
        stopAutoplay();
      } catch {
        // ignore cleanup errors from stale plugin state
      }
    };
  }, [emblaApi, shouldAutoplay, safeBrands.length]);

  const handlePrev = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev();
      return;
    }

    const lastIndex = emblaApi.scrollSnapList().length - 1;
    emblaApi.scrollTo(lastIndex);
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
      return;
    }

    emblaApi.scrollTo(0);
  }, [emblaApi]);

  const slideLabel = String(selectedIndex + 1).padStart(2, "0");
  const totalLabel = String(safeBrands.length).padStart(2, "0");

  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Heading */}
        <Reveal
          animationNum={0}
          className="mb-10 grid grid-cols-1 gap-6 sm:mb-12 lg:grid-cols-12 lg:gap-10"
        >
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
              <Award className="h-3.5 w-3.5 text-brand-accent" />
              Featured Products
            </span>

            <h2 className="mt-4 text-display-md text-ink">
              Premium Corporate Gift Brands with Branded Merchandise in Dubai.
            </h2>
          </div>

          <div className="flex items-end lg:col-span-7">
            <p className="text-body-md text-muted lg:text-[17px] lg:leading-7">
              Baharnani Advertising provides you with sustainable, high quality,
              premium corporate gift products for executive gifting, employee
              rewards, event giveaways and client appreciation. If you are looking
              for luxury corporate gifts in Dubai, or branded merchandise for
              everyday use, our team will help you select products that fit your
              budget, audience, and branding needs.
            </p>
          </div>
        </Reveal>

        {/* Carousel */}
        <Reveal animationNum={1}>
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 border-b border-hairline bg-canvas px-4 py-3 sm:px-5">
              <p className="text-caption font-medium uppercase tracking-[0.14em] text-muted">
                <span className="text-ink">{slideLabel}</span>
                <span className="mx-1.5 text-muted-soft">/</span>
                {totalLabel}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className={candyIconButtonClasses(
                    "white",
                    "sm",
                    "swiper-button-prev-product-grid"
                  )}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className={candyNavIconClasses} strokeWidth={2.25} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className={candyIconButtonClasses(
                    "white",
                    "sm",
                    "swiper-button-next-product-grid"
                  )}
                  aria-label="Next slide"
                >
                  <ChevronRight className={candyNavIconClasses} strokeWidth={2.25} />
                </button>
              </div>
            </div>

            {/* Slides */}
            <div
              className="feature-brand-swiper cursor-grab overflow-hidden p-4 active:cursor-grabbing sm:p-5"
              ref={emblaRef}
            >
              <div className="-mx-2 flex items-stretch sm:-mx-2.5">
                {safeBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="flex h-auto flex-[0_0_100%] px-2 sm:flex-[0_0_50%] sm:px-2.5 lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                  >
                    <FeatureBrandCard brand={brand} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
}
