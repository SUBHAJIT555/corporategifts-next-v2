"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";


// import { Icon } from "@iconify/react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
// import { getProductUrl } from "@/lib/utils"; // adjust path
import type { Product } from "@/lib/api/types"; // adjust path
import useInView from "@/hooks/useInView";
import { getProductUrl } from "@/lib/getProductsUrl";
import Image from "next/image";

// function useInViewOnce<T extends HTMLElement>(options: IntersectionObserverInit = {}) {
//     const ref = useRef<T | null>(null);
//     const [inView, setInView] = useState(false);

//     useEffect(() => {
//         const el = ref.current;
//         if (!el || inView) return;

//         const obs = new IntersectionObserver(([entry]) => {
//             if (entry.isIntersecting) {
//                 setInView(true);
//                 obs.disconnect();
//             }
//         }, options);

//         obs.observe(el);
//         return () => obs.disconnect();
//     }, [inView, options.root, options.rootMargin, options.threshold]);

//     return { ref, inView } as const;
// }

export default function FeatureBrandClient({ brands }: { brands: Product[] }) {
    const safeBrands = useMemo(
        () => (Array.isArray(brands) ? brands : []),
        [brands],
    );
    const [shouldAutoplay, setShouldAutoplay] = useState(false);
    const autoplayRef = useRef(
        Autoplay({
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
            playOnInit: false,
        }),
    );
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            loop: false,
            containScroll: "trimSnaps",
        },
        [autoplayRef.current],
    );

    const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>({
        root: null,
        rootMargin: "-50px 0px -50px 0px",
        threshold: 0.01,
    });

    const { ref: swiperWrapRef, inView: swiperWrapInView } = useInView<HTMLDivElement>({
        root: null,
        rootMargin: "-100px 0px -100px 0px",
        threshold: 0.01,
    });

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
        if (safeBrands.length < 2) return;

        const autoplay = emblaApi.plugins()?.autoplay as
            | { play?: () => void; stop?: () => void }
            | undefined;
        if (!autoplay || typeof autoplay.play !== "function" || typeof autoplay.stop !== "function") {
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

    return (
        <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 overflow-x-hidden">
            <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translate3d(0, 50px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpSmall {
          from { opacity: 0; transform: translate3d(0, 30px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-fadeup,
          .anim-fadein,
          .anim-slideup-small {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

            <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
                {/* Heading */}
                <div
                    ref={headingRef}
                    className={`mb-8 sm:mb-10 md:mb-12 lg:mb-16 ${headingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"
                        }`}
                    style={headingInView ? { animation: "fadeUp 0.6s ease forwards" } : undefined}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl  font-sentient font-semibold text-textcolor leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    Premium Corporate Gift Brands with Branded Merchandise in Dubai.
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-switzer tracking-widest sm:tracking-wider md:tracking-widest text-textcolor font-medium">
                    Baharnani Advertising provides you with sustainable, high quality, premium corporate gift products for executive gifting, employee rewards, event giveaways and client appreciation. If you are looking for luxury corporate gifts in Dubai, or branded merchandise for everyday use, our team will help you select products that fit your budget, audience, and branding needs.

                    </p>
                </div>

                {/* Swiper */}
                <div
                    ref={swiperWrapRef}
                    className={`w-full relative ${swiperWrapInView ? "opacity-100" : "opacity-0"}`}
                    style={swiperWrapInView ? { animation: "fadeIn 0.6s ease 0.2s forwards" } : undefined}
                >
                    <div className="relative">
                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-end gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
                            <button
                                className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-textcolor font-switzer text-xs sm:text-sm border border-neutral-200 rounded-xl bg-neutral-100 hover:bg-white transition-opacity hover:opacity-80 cursor-pointer"
                                onClick={handlePrev}
                                aria-label="Previous slide"
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
                                    className="size-4 sm:size-5 text-[#0F5C85]"
                                    aria-hidden="true"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12h6m3 0h1.5m3 0h.5" />
                                    <path d="M5 12l6 6" />
                                    <path d="M5 12l6 -6" />
                                </svg>
                                <span className="hidden sm:inline text-textcolor font-switzer font-semibold">Previous</span>
                            </button>

                            <button
                                className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-textcolor font-switzer text-xs sm:text-sm border border-neutral-200 rounded-xl bg-neutral-100 hover:bg-white transition-opacity hover:opacity-80 cursor-pointer"
                                onClick={handleNext}
                                aria-label="Next slide"
                            >
                                <span className="hidden sm:inline text-textcolor font-switzer font-semibold">Next</span>
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
                                    className="size-4 sm:size-5 text-[#0F5C85]"
                                    aria-hidden="true"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12h.5m3 0h1.5m3 0h6" />
                                    <path d="M13 18l6 -6" />
                                    <path d="M13 6l6 6" />
                                </svg>
                            </button>
                        </div>

                        <div
                            className="feature-brand-swiper overflow-hidden cursor-grab active:cursor-grabbing"
                            ref={emblaRef}
                        >
                            <div className="flex -mx-2.5 sm:-mx-3 md:-mx-3.5 lg:-mx-4">
                                {safeBrands.map((brand, index) => (
                                    <div
                                        key={brand.id}
                                        className={`px-2.5 sm:px-3 md:px-3.5 lg:px-4 flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] h-full w-full ${swiperWrapInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
                                            }`}
                                        style={
                                            swiperWrapInView
                                                ? {
                                                    animation: "slideUpSmall 0.5s ease forwards",
                                                    animationDelay: `${index * 0.1}s`,
                                                }
                                                : undefined
                                        }
                                    >
                                        <NoPrefetchLink href={getProductUrl(brand as Product)}>
                                            <div className="relative bg-white rounded-xl mt-4 mb-4 mx-2 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[400px] border border-neutral-300 ring ring-neutral-300 ring-offset-2 md:ring-offset-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden">
                                                {/* Cool Blue Glow Top */}
                                                <div
                                                    className="pointer-events-none absolute inset-0 z-0"
                                                    style={{
                                                        background: "#ffffff",
                                                        backgroundImage: `radial-gradient(circle at top center, rgba(70, 130, 180, 0.5), transparent 70%)`,
                                                        filter: "blur(40px)",
                                                        backgroundRepeat: "no-repeat",
                                                    }}
                                                />
                                                <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-52 xl:h-56 mb-4 sm:mb-5 md:mb-6 flex items-center justify-center border border-neutral-200 rounded-xl overflow-hidden bg-white z-10">
                                                    <Image
                                                        src={brand.image}
                                                        alt={brand.name}
                                                        width={1000}
                                                        height={1000}
                                                        className="relative z-10 w-full h-full object-contain"
                                                    />
                                                </div>

                                                <h3 className="relative z-10 text-xs sm:text-sm md:text-base lg:text-lg font-switzer font-bold text-textcolor/70 tracking-widest mb-2 sm:mb-3 text-center uppercase line-clamp-1 overflow-hidden text-ellipsis">
                                                    {brand.categories?.[0] ?? ""}
                                                </h3>

                                                <p className="relative z-10 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-switzer font-bold text-textcolor text-center line-clamp-1 overflow-hidden text-ellipsis">
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
            </div>
        </section>
    );
}
