"use client";

import { useRef, useEffect, useState, useCallback, memo } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";

interface ProductCategory {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
}

const productCategories: ProductCategory[] = [
    {
        id: "1",
        title: "Apparel & accessories",
        description:
            "Custom branded t-shirts, polo shirts, caps, and accessories with premium printing and embroidery.",
        image: "/assets/images/Home-page-hero-images/Apparel-&-accessories.webp",
        link: "/product-category/apparel-and-accessories",
    },
    {
        id: "2",
        title: "Bags & travel",
        description:
            "Personalized laptop bags, backpacks, travel kits, and luggage with custom logo printing.",
        image: "/assets/images/Home-page-hero-images/Bags-&-travel.webp",
        link: "/product-category/bags-and-travel",
    },
    {
        id: "3",
        title: "Office & stationary",
        description:
            "Branded pens, notebooks, planners, and desk accessories with laser engraving and custom printing.",
        image: "/assets/images/Home-page-hero-images/Office-&-stationary.webp",
        link: "/product-category/office-and-stationary",
    },
    {
        id: "4",
        title: "Technology & accessories",
        description:
            "Custom power banks, USB drives, wireless chargers, and tech gadgets with logo printing.",
        image: "/assets/images/Home-page-hero-images/Technology-&-accessories.webp",
        link: "/product-category/technology-and-accessories",
    },
    {
        id: "5",
        title: "Eating & drinking",
        description:
            "Personalized mugs, water bottles, tumblers, and drinkware with premium printing and engraving.",
        image: "/assets/images/Home-page-hero-images/Eating-&-drinking.webp",
        link: "/product-category/eating-and-drinking",
    },
    {
        id: "6",
        title: "Premiums gift sets",
        description:
            "Curated luxury gift hampers and premium sets with custom packaging and branding solutions.",
        image: "/assets/images/Home-page-hero-images/Premiums-gift-sets.webp",
        link: "/product-category/premium-gift-sets",
    },
    {
        id: "7",
        title: "Sports & recreation",
        description:
            "Custom sports equipment, fitness accessories, and recreational items with branded printing.",
        image: "/assets/images/Home-page-hero-images/Sports-&-recreation.webp",
        link: "/product-category/sports-and-recreation",
    },
    {
        id: "8",
        title: "Eco friendly",
        description:
            "Sustainable bamboo products, reusable items, and eco-conscious gifts with custom branding.",
        image: "/assets/images/Home-page-hero-images/Eco-friendly.webp",
        link: "/product-category/eco-friendly",
    },
    {
        id: "9",
        title: "Luxury corporate gifts Dubai",
        description:
            "Premium executive gifts, leather accessories, and high-end corporate presents with elegant customization.",
        image: "/assets/images/Home-page-hero-images/Luxury-corporate-gifts.webp",
        link: "/product-category/luxury-corporate-gifts-dubai",
    },
];

/** Carousel + autoplay + dots live here so slide changes do not re-render the section heading. */
const ProductGridHomeCarousel = memo(function ProductGridHomeCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: true,
    });

    const [swiperVisible, setSwiperVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const syncCarouselState = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setScrollSnaps(emblaApi.scrollSnapList());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const root = emblaApi.rootNode();
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && entry.target === root) {
                        setSwiperVisible(true);
                        break;
                    }
                }
            },
            { threshold: 0.2 },
        );

        observer.observe(root);
        return () => observer.disconnect();
    }, [emblaApi]);

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
        if (!emblaApi || !swiperVisible) return;

        const autoplayId = window.setInterval(() => {
            emblaApi.scrollNext();
        }, 4000);

        return () => window.clearInterval(autoplayId);
    }, [emblaApi, swiperVisible]);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            emblaApi?.scrollTo(index);
        },
        [emblaApi],
    );

    return (
        <div
            className={`
            transition-opacity duration-700 ease-out
            ${swiperVisible ? "opacity-100" : "opacity-0"}
          `}
        >
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="-mx-2 md:-mx-3 flex">
                    {productCategories.map((productCategory, index) => (
                        <div
                            key={productCategory.id}
                            className="h-auto px-2 md:px-3 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] 2xl:flex-[0_0_25%]"
                        >
                            <div
                                className={`
                    flex flex-col h-full md:h-[380px] lg:h-[400px]
                    bg-neutral-100 mt-4 mb-4 mx-2
                    rounded-lg overflow-hidden
                    border border-neutral-300 ring ring-neutral-300 ring-offset-2 md:ring-offset-4
                    transition-all duration-500
                    ${swiperVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"}
                  `}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <NoPrefetchLink href={productCategory.link} className="flex flex-col h-full">
                                    <div className="relative w-full h-52 overflow-hidden">
                                        <Image
                                            src={productCategory.image}
                                            alt={productCategory.title}
                                            width={1000}
                                            height={1000}
                                            loading="lazy"
                                            className="
                          w-full h-full object-cover
                          transition-transform duration-500 ease-out
                          group-hover:scale-110
                        "
                                        />
                                    </div>

                                    <div className="p-6 flex flex-col grow">
                                        <h3 className="text-2xl font-sentient font-semibold tracking-tight text-textcolor mb-2">
                                            {productCategory.title}
                                        </h3>

                                        <p className="text-base font-switzer text-textcolor/80 grow">
                                            {productCategory.description}
                                        </p>
                                        <div className="mt-auto flex justify-end pt-2">
                                            <CTAButton
                                                label="Know more"
                                                variant="light"
                                                className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-sentient font-semibold bg-linear-to-r from-neutral-300 to-white text-textcolor hover:from-white hover:to-neutral-300 ring ring-neutral-300 ring-offset-2 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </NoPrefetchLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 sm:gap-8 mt-8 sm:mt-10">
                <button
                    type="button"
                    onClick={scrollPrev}
                    className="swiper-button-prev-product-grid inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-textcolor font-switzer text-xs sm:text-sm border! border-neutral-200! rounded-xl bg-neutral-100! hover:bg-white!"
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

                <div className="flex items-center gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            type="button"
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`h-2.5 w-2.5 rounded-full transition-all ${selectedIndex === index
                                ? "bg-[#0F5C85]"
                                : "bg-[#0F5C85]/30 hover:bg-[#0F5C85]/50"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={scrollNext}
                    className="swiper-button-next-product-grid inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-textcolor font-switzer text-xs sm:text-sm border! border-neutral-200! rounded-xl bg-neutral-100! hover:bg-white!"
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
        </div>
    );
});

const ProductGridHome = () => {
    const headingRef = useRef<HTMLDivElement>(null);
    const [headingVisible, setHeadingVisible] = useState(false);

    useEffect(() => {
        const headingEl = headingRef.current;
        if (!headingEl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && entry.target === headingEl) {
                        setHeadingVisible(true);
                        break;
                    }
                }
            },
            { threshold: 0.2 },
        );

        observer.observe(headingEl);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 overflow-x-hidden">
            <div className="w-full px-4 md:px-8 xl:px-12 max-w-[1920px] mx-auto">
                <div
                    ref={headingRef}
                    className={`
            mb-12
            transition-all duration-700 ease-out
            ${headingVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"}
          `}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    Explore Corporate Gift Categories in Dubai {" "}
                        <span className="inline-flex border border-neutral-300 rounded-lg p-0.5 sm:p-1 ring ring-neutral-300 ring-offset-2 rotate-10 bg-neutral-100">
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
                                className="inline-block align-middle h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                                aria-hidden="true"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 9a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -2" />
                                <path d="M12 8l0 13" />
                                <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
                                <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" />
                            </svg>
                        </span>
                        {" "}for Every Business Need.
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-switzer tracking-widest sm:tracking-wider md:tracking-widest text-textcolor font-medium">
                    Dubai corporate gifts are available in different categories like premium, customised, promotional, smart, luxury and affordable gifts for client appreciation, employee recognition, trade shows, festive campaigns and business events. We have branded apparel, office stationery, bags, drinkware, technology gifts, hampers, eco-friendly products and bulk giveaways for companies throughout Dubai and the UAE.

                    </p>
                </div>

                <ProductGridHomeCarousel />
            </div>
        </section>
    );
};

export default ProductGridHome;
