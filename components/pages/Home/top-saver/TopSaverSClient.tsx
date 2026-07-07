"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
// import { motion, useInView } from "framer-motion";
import useInView from "@/hooks/useInView";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BsCart4 } from "@/components/icons";
import { getProductUrl } from "@/lib/getProductsUrl";
import { useQuote } from "@/contexts/QuoteContext";
import { Product } from "@/lib/api/types";
import Image from "next/image";
import { TypewriterInfinite as TypewriterEffect } from "@/components/ui/Typewriter";

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
        [products],
    );
    const { addToQuote, isInQuote } = useQuote();
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const autoplayRef = useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
        }),
    );
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            loop: true,
        },
        [autoplayRef.current],
    );
    const { ref: carouselRef, inView: swiperInView } =
        useInView<HTMLDivElement>();

    const { ref: headingRef, inView: headingInView } =
        useInView<HTMLDivElement>();
    const videoContainerRef = useRef<HTMLDivElement>(null);

    // const [displayedText, setDisplayedText] = useState("");
    const [isVideoVisible, setIsVideoVisible] = useState(false);

    // Equalize card heights
    const equalizeHeights = useCallback(() => {
        if (cardRefs.current.length === 0) return;

        // Reset heights to auto to get natural heights
        cardRefs.current.forEach((card) => {
            if (card) {
                card.style.height = "auto";
                card.style.minHeight = "auto";
            }
        });

        // Wait for layout recalculation - use double RAF for accuracy
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Calculate max height from all cards
                let maxHeight = 0;
                cardRefs.current.forEach((card) => {
                    if (card) {
                        // Get the actual rendered height - getBoundingClientRect includes padding and border
                        const height = card.getBoundingClientRect().height;

                        if (height > maxHeight) {
                            maxHeight = height;
                        }
                    }
                });

                // Apply max height to all cards
                if (maxHeight > 0) {
                    cardRefs.current.forEach((card) => {
                        if (card) {
                            card.style.height = `${maxHeight}px`;
                        }
                    });
                }
            });
        });
    }, []);


    const words = useMemo(
        () => [{ text: "Need 100+ or 500+ pieces?" }],
        [],
    );

    /*
     |--------------------------------------------------------------------------
     | Lazy video load
     |--------------------------------------------------------------------------
     */

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

        const runEqualize = () => {
            requestAnimationFrame(equalizeHeights);
        };

        runEqualize();
        emblaApi.on("select", runEqualize);
        emblaApi.on("reInit", runEqualize);
        emblaApi.on("resize", runEqualize);

        return () => {
            emblaApi.off("select", runEqualize);
            emblaApi.off("reInit", runEqualize);
            emblaApi.off("resize", runEqualize);
        };
    }, [emblaApi, equalizeHeights, safeProducts]);

    return (
        <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 overflow-x-hidden">
            <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
                {/* Heading */}
                <div
                    ref={headingRef}
                    className={`mb-8 sm:mb-10 md:mb-12 lg:mb-16 transition-all duration-700 ease-out ${headingInView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                        }`}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                        <span className="inline-flex items-center gap-2">
                            <span>Affordable Corporate Gifts 
                            </span>
                            <span className="inline-flex border border-neutral-300 rounded-lg p-0.5 sm:p-1 ring ring-neutral-300 ring-offset-2 rotate-6 bg-neutral-100">
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
                                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#0F5C85]"
                                    aria-hidden="true"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 15l6 -6" />
                                    <path d="M9 9.5a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0" fill="currentColor" />
                                    <path d="M14 14.5a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0" fill="currentColor" />
                                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                                </svg>
                            </span>
                        </span>

                        <span>{" "}in Dubai for Bulk Orders.</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-switzer tracking-widest sm:tracking-wider md:tracking-widest text-textcolor font-medium">
                    Searching for cheap corporate gifts but don’t want to skimp on presentation? Find cheap promotional gifts, personalised drinkware, stationery, bags and tech accessories perfect for buying in bulk, giveaways at events, employee packs and customer campaigns across Dubai and the UAE.

                    </p>
                </div>

                <div
                    ref={carouselRef}
                    className={`w-full transition-opacity duration-700 ease-out ${swiperInView ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10">
                        {/* Left: Swiper */}
                        <div className="w-full lg:w-9/12 relative">
                            <div className="flex justify-end items-center gap-4 sm:gap-8 mb-6 sm:mb-8 md:mb-10">
                                {/* Previous Button */}
                                <button
                                    onClick={() => emblaApi?.scrollPrev()}
                                    className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-textcolor font-switzer text-xs sm:text-sm border! border-neutral-200! rounded-xl bg-neutral-100! hover:bg-white!"
                                    aria-label="Previous slide"
                                >
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
                                        className="size-4 sm:size-5"
                                        aria-hidden="true"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 12h6m3 0h1.5m3 0h.5" />
                                        <path d="M5 12l6 6" />
                                        <path d="M5 12l6 -6" />
                                    </svg>
                                    <span className="hidden sm:inline text-textcolor font-switzer font-semibold">
                                        Previous
                                    </span>
                                </button>

                                {/* Next Button */}
                                <button
                                    onClick={() => emblaApi?.scrollNext()}
                                    className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-textcolor font-switzer text-xs sm:text-sm border! border-neutral-200! rounded-xl bg-neutral-100! hover:bg-white!"
                                    aria-label="Next slide"
                                >
                                    <span className="hidden sm:inline text-textcolor font-switzer font-semibold">
                                        Next
                                    </span>
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
                                        className="size-4 sm:size-5"
                                        aria-hidden="true"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 12h.5m3 0h1.5m3 0h6" />
                                        <path d="M13 18l6 -6" />
                                        <path d="M13 6l6 6" />
                                    </svg>
                                </button>
                            </div>

                            {/* Embla */}
                            <div className="top-saver-swiper overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                                <div className="flex -mx-1.5 sm:-mx-2.5 md:-mx-2.5 lg:-mx-3 xl:-mx-3.5 2xl:-mx-4">
                                    {safeProducts.map((product, index) => (
                                        <div
                                            key={product.id}
                                            className="px-1.5 sm:px-2.5 md:px-2.5 lg:px-3 xl:px-3.5 2xl:px-4 flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] 2xl:flex-[0_0_25%]"
                                        >
                                            <div
                                                ref={(el) => {
                                                    cardRefs.current[index] = el;
                                                }}
                                                className={`h-full w-full transition-all duration-700 ease-out ${swiperInView
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-8"
                                                    }`}
                                                style={{ transitionDelay: `${index * 100}ms` }}
                                            >
                                                <div className="bg-bg border border-neutral-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                                                    <NoPrefetchLink
                                                        href={getProductUrl(product)}
                                                        className="block cursor-pointer"
                                                    >
                                                        {/* Product Image */}
                                                        <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden bg-gray-200">
                                                            <Image
                                                                width={500}
                                                                height={500}
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </NoPrefetchLink>
                                                    {/* Product Content */}
                                                    <div className="p-4 sm:p-5 md:p-6 flex flex-col grow">
                                                        {/* Category Badge */}
                                                        <span className="text-xs font-switzer text-[#0f5c85] mb-2 uppercase tracking-wide line-clamp-1 overflow-hidden text-ellipsis">
                                                            {product.categories[0]}
                                                        </span>

                                                        <NoPrefetchLink href={getProductUrl(product)}>
                                                            {/* Product Title */}
                                                            <h3 className="text-base font-switzer font-bold text-textcolor mb-4 grow line-clamp-1 overflow-hidden text-ellipsis">
                                                                {product.name}
                                                            </h3>
                                                        </NoPrefetchLink>

                                                        {/* Add to Quote Button */}
                                                        <button
                                                            disabled={isInQuote(product.id)}
                                                            className={`group relative cursor-pointer w-full font-switzer  py-2.5 sm:py-3 px-4 rounded-xl transition-colors duration-200 text-sm sm:text-base overflow-hidden ${isInQuote(product.id)
                                                                ? "bg-[#0f5c85] text-white cursor-not-allowed opacity-60"
                                                                : "bg-[#0f5c85] hover:bg-[#0f5c85]/70 text-white"
                                                                }`}
                                                            onClick={() => addToQuote(product, 1)}
                                                        >
                                                            <span
                                                                className={`inline-block transition-all duration-300 ease-in-out ${isInQuote(product.id)
                                                                    ? ""
                                                                    : "group-hover:-translate-y-full group-hover:opacity-0"
                                                                    }`}
                                                            >
                                                                {isInQuote(product.id)
                                                                    ? "Added to Quote"
                                                                    : "Add to Quote"}
                                                            </span>
                                                            {!isInQuote(product.id) && (
                                                                <BsCart4
                                                                    className={`absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-100`}
                                                                />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Video */}
                        <div className="w-full lg:w-3/12 shrink-0 h-[400px] sm:h-[480px]">
                            <div
                                ref={videoContainerRef}
                                className={`relative w-full h-full rounded-xl overflow-hidden transition-all duration-700 ease-out border border-neutral-300 ring ring-neutral-300 ring-offset-4 md:ring-offset-6 shadow-lg ${swiperInView
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-8"
                                    }`}
                                style={{ transitionDelay: "400ms" }}
                            >
                                {isVideoVisible ? (
                                    <video
                                        className="w-full h-full object-cover"
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
                                    <div className="w-full h-full animate-pulse" />
                                )}
                                {/* Overlay for better text readability */}
                                <div className="absolute inset-0 bg-linear-to-t from-transparent via-black/80 to-transparent pointer-events-none" />

                                {/* Text Content Overlay */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 lg:p-4 xl:p-5 2xl:p-6 z-10">
                                    {/* Heading with blue band background */}
                                    <div className="w-full flex justify-center mb-4 sm:mb-5 md:mb-6">
                                        <div className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg">
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sentient font-bold text-bg text-center">
                                                <TypewriterEffect
                                                    words={words}
                                                    className="text-inherit font-inherit"
                                                    cursorClassName="bg-bg"
                                                />
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Paragraph text */}
                                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sentient font-bold text-bg text-center mb-6 sm:mb-8 md:mb-10 max-w-md tracking-wide">
                                    Request a bulk quote today.

                                    </p>

                                    {/* Contact Us Button */}
                                    <NoPrefetchLink href="/contact-us" className="inline-block">
                                        <button className="font-switzer py-2 sm:py-2 md:py-2 px-8 sm:px-10 md:px-12 rounded-xl transition-colors duration-200 text-base sm:text-sm md:text-xl bg-[#0f5c85] hover:bg-[#0f5c85]/90 text-white shadow-lg ring ring-neutral-300 ring-offset-3 cursor-pointer">
                                            Contact Us Now
                                        </button>
                                    </NoPrefetchLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}