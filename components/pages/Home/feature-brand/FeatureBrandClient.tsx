"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import type { Product } from "@/lib/api/types";
import useInView from "@/hooks/useInView";
import { getProductUrl } from "@/lib/getProductsUrl";
import Image from "next/image";
import {
  candyIconButtonClasses,
  candyNavIconClasses,
} from "@/components/ui/candy-button";

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

  const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>({
    root: null,
    rootMargin: "-50px 0px -50px 0px",
    threshold: 0.01,
  });

  const { ref: swiperWrapRef, inView: swiperWrapInView } =
    useInView<HTMLDivElement>({
      root: null,
      rootMargin: "-100px 0px -100px 0px",
      threshold: 0.01,
    });

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
      <div className="mx-auto max-w-7xl border-x border-hairline px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`mb-10 grid grid-cols-1 gap-6 transition-all duration-700 ease-out sm:mb-12 lg:grid-cols-12 lg:gap-10 ${
            headingInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
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
        </div>

        {/* Carousel */}
        <div
          ref={swiperWrapRef}
          className={`overflow-hidden rounded-2xl border border-hairline bg-canvas transition-opacity duration-700 ease-out ${
            swiperWrapInView ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 border-b border-hairline px-4 py-3 sm:px-5">
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
            <div className="-mx-2 flex sm:-mx-2.5">
              {safeBrands.map((brand, index) => (
                <div
                  key={brand.id}
                  className={`h-auto flex-[0_0_100%] px-2 sm:flex-[0_0_50%] sm:px-2.5 lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] ${
                    swiperWrapInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: swiperWrapInView
                      ? `${index * 80}ms`
                      : undefined,
                  }}
                >
                  <NoPrefetchLink href={getProductUrl(brand as Product)}>
                    <div className="group flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-hairline bg-canvas p-5 transition-all duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.15)] sm:min-h-[320px] sm:p-6 lg:min-h-[360px]">
                      <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-hairline bg-surface-card sm:mb-5 sm:h-44 lg:h-48">
                        <Image
                          src={brand.image}
                          alt={brand.name}
                          width={1000}
                          height={1000}
                          className="h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>

                      {brand.categories?.[0] ? (
                        <p className="mb-2 line-clamp-1 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                          {brand.categories[0]}
                        </p>
                      ) : null}

                      <p className="line-clamp-2 text-center text-base font-semibold text-ink sm:text-lg">
                        {brand.name}
                      </p>
                    </div>
                  </NoPrefetchLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
