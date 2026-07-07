"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BsCart4 } from "@/components/icons";
import { getProductUrl } from "@/lib/getProductsUrl";
import { useQuote } from "@/contexts/QuoteContext";
import { Product } from "@/lib/api/types";
import Image from "next/image";
import { TypewriterInfinite as TypewriterEffect } from "@/components/ui/Typewriter";
import {
  Reveal,
  RevealSection,
} from "@/components/ui/timeline-animation";
import {
  candyAccentButtonClasses,
  candyCarouselNavClasses,
  candySquareIconClasses,
  candyWhiteButtonClasses,
} from "@/components/ui/candy-button";
import { cn } from "@/lib/utilts";

interface Props {
  products: Product[];
  videoUrl?: string;
}

export default function TopSaverClient({
  products,
  videoUrl = "/assets/video/GIFMaker_mezeeyand.webm",
}: Props) {
  const safeProducts = useMemo(
    () => (Array.isArray(products) ? products : []),
    [products]
  );
  const { addToQuote, isInQuote } = useQuote();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
    },
    [autoplayRef.current]
  );
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const words = useMemo(
    () => [{ text: "Need 100+ or 500+ pieces?" }],
    []
  );

  const syncCarouselState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!videoContainerRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVideoVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(videoContainerRef.current);

    return () => observer.disconnect();
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

  const slideLabel = String(selectedIndex + 1).padStart(2, "0");
  const totalLabel = String(safeProducts.length).padStart(2, "0");

  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-10 sm:px-6 sm:py-12 lg:py-14">
        {/* Heading */}
        <Reveal
          animationNum={0}
          className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 lg:grid-cols-12 lg:gap-10"
        >
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
              <Tag className="h-3.5 w-3.5 text-brand-accent" />
              Top Saver
            </span>

            <h2 className="mt-4 text-display-md text-ink">
              Affordable Corporate Gifts in Dubai for Bulk Orders.
            </h2>
          </div>

          <div className="flex items-end lg:col-span-7">
            <p className="text-body-md text-muted lg:text-[17px] lg:leading-7">
              Searching for cheap corporate gifts but don&apos;t want to skimp on
              presentation? Find cheap promotional gifts, personalised drinkware,
              stationery, bags and tech accessories perfect for buying in bulk,
              giveaways at events, employee packs and customer campaigns across
              Dubai and the UAE.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          {/* Product carousel */}
          <Reveal animationNum={1} className="flex flex-col lg:col-span-9">
            <div className="flex h-full flex-1 flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas">
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
                    onClick={() => emblaApi?.scrollPrev()}
                    className={candyCarouselNavClasses("prev")}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft
                      className={candySquareIconClasses}
                      strokeWidth={2.25}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollNext()}
                    className={candyCarouselNavClasses("next")}
                    aria-label="Next slide"
                  >
                    <ChevronRight
                      className={candySquareIconClasses}
                      strokeWidth={2.25}
                    />
                  </button>
                </div>
              </div>

              {/* Slides */}
              <div
                className="top-saver-swiper cursor-grab overflow-hidden p-4 active:cursor-grabbing sm:p-5"
                ref={emblaRef}
              >
                <div className="-mx-2 flex items-stretch sm:-mx-2.5">
                  {safeProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex h-auto flex-[0_0_100%] px-2 sm:flex-[0_0_50%] sm:px-2.5 lg:flex-[0_0_33.333%]"
                    >
                      <article className="group relative flex h-full min-h-[360px] w-full flex-col overflow-hidden rounded-xl border border-hairline bg-canvas p-4 sm:min-h-[380px] sm:p-5">
                        <NoPrefetchLink
                          href={getProductUrl(product)}
                          className="block shrink-0"
                        >
                          <div className="relative mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-hairline bg-surface-soft sm:mb-5 sm:h-44">
                            <Image
                              width={500}
                              height={500}
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          </div>
                        </NoPrefetchLink>

                        <div className="flex min-h-0 flex-1 flex-col">
                          {product.categories[0] ? (
                            <span className="mb-2 inline-flex w-fit max-w-full items-center rounded-md border border-dashed border-hairline bg-surface-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-brand-accent">
                              {product.categories[0]}
                            </span>
                          ) : (
                            <span className="mb-2 block h-[22px]" aria-hidden />
                          )}

                          <NoPrefetchLink
                            href={getProductUrl(product)}
                            className="mb-4 block min-h-11 sm:min-h-12"
                          >
                            <h3 className="line-clamp-2 text-base font-semibold leading-snug text-ink sm:text-[17px]">
                              {product.name}
                            </h3>
                          </NoPrefetchLink>

                          <button
                            type="button"
                            disabled={isInQuote(product.id)}
                            className={cn(
                              candyAccentButtonClasses(
                                "group/btn mt-auto w-full text-sm sm:text-base"
                              ),
                              isInQuote(product.id) && "opacity-60"
                            )}
                            onClick={() => addToQuote(product, 1)}
                          >
                            <span
                              className={cn(
                                "inline-block transition-all duration-300 ease-in-out",
                                !isInQuote(product.id) &&
                                  "group-hover/btn:-translate-y-full group-hover/btn:opacity-0"
                              )}
                            >
                              {isInQuote(product.id)
                                ? "Added to Quote"
                                : "Add to Quote"}
                            </span>
                            {!isInQuote(product.id) && (
                              <BsCart4 className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-1/2 group-hover/btn:opacity-100" />
                            )}
                          </button>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Video CTA panel */}
          <Reveal animationNum={2} className="relative flex min-h-[420px] lg:col-span-3 lg:min-h-0">
            <div
              ref={videoContainerRef}
              className="relative flex h-full min-h-[420px] w-full flex-1 flex-col overflow-hidden border border-hairline bg-surface-dark lg:min-h-full"
            >
              <div className="absolute inset-0 overflow-hidden">
                {isVideoVisible ? (
                  <video
                    className="absolute inset-0 h-full w-full scale-110 object-cover object-center"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    width="640"
                    height="360"
                  >
                    <source src={videoUrl} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="absolute inset-0 animate-pulse bg-surface-card" />
                )}
              </div>

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/25" />

              <div className="relative z-10 flex flex-1 flex-col justify-between p-5 text-center sm:p-6">
                <h3 className="pt-1 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  <TypewriterEffect
                    words={words}
                    className="text-inherit font-inherit"
                    cursorClassName="bg-white"
                  />
                </h3>

                <div className="flex w-full flex-col items-center pb-1">
                  <p className="max-w-[220px] text-base font-medium leading-snug text-white/90 sm:text-lg">
                    Request a bulk quote today.
                  </p>

                  <NoPrefetchLink
                    href="/contact-us"
                    className={cn(
                      candyWhiteButtonClasses("mt-4 w-full max-w-[220px]"),
                      "pointer-events-auto"
                    )}
                  >
                    Contact Us Now
                  </NoPrefetchLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </RevealSection>
    </section>
  );
}
