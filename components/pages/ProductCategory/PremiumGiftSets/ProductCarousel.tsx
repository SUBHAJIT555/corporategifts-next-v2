'use client';
import { memo, useCallback, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { getProductUrl } from "@/lib/getProductsUrl";
import Loading from "@/components/ui/Loading";
import { Product } from "@/lib/api/types";
import Image from "next/image";
import { useQuote } from "@/contexts/QuoteContext";
import { BsCart4 } from "@/components/icons";

interface ProductCarouselProps {
    products: Product[] | [];
    heading: string;
    isLoading: boolean;
    description: string;
    paginationId?: string;
    autoplay?: boolean;
    autoplayDelay?: number;
}

const SWIPER_MODULES = [Pagination, Autoplay];
const SWIPER_BREAKPOINTS = {
    640: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 24,
    },
    1024: {
        slidesPerView: 4,
        spaceBetween: 24,
    },
    1280: {
        slidesPerView: 5,
        spaceBetween: 28,
    },
    1536: {
        slidesPerView: 6,
        spaceBetween: 32,
    },
} as const;

const ProductCarousel = memo(function ProductCarousel(props: ProductCarouselProps) {
    const {
        products,
        isLoading,
        heading,
        description,
        paginationId = "product-carousel-pagination",
        autoplay = true,
        autoplayDelay = 4000,
    } = props;
    const router = useRouter();
    const { addToQuote, isInQuote } = useQuote();
    const swiperInstanceRef = useRef<SwiperType | null>(null);
    const autoplayConfig = useMemo(
        () =>
            autoplay
                ? {
                    delay: autoplayDelay,
                    disableOnInteraction: false,
                }
                : false,
        [autoplay, autoplayDelay],
    );
    const paginationConfig = useMemo(
        () => ({
            clickable: true,
            el: `.${paginationId}`,
        }),
        [paginationId],
    );

    const handleAddToQuote = useCallback((product: Product, e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!isInQuote(Number(product.id))) {
            addToQuote(product, 1);
        }
    }, [addToQuote, isInQuote]);

    const handleProductClick = useCallback((product: Product) => {
        // Navigate to product details page with SEO-friendly URL
        router.push(getProductUrl(product));
    }, [router]);
    const handleSwiper = useCallback((swiper: SwiperType) => {
        swiperInstanceRef.current = swiper;
    }, []);

    return (
        <section className="w-full py-3 sm:py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-12 overflow-x-hidden">
            <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
                {/* Heading Section */}
                <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 opacity-100 translate-y-0 transition-all duration-500 ease-out">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl  font-sentient font-semibold text-textcolor leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                        {heading}
                    </h3>
                    <p
                        className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-switzer tracking-widest sm:tracking-wider md:tracking-widest text-textcolor font-medium"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>

                {/* Carousel Section */}
                <div className="w-full opacity-100 transition-opacity duration-500 ease-out">
                    {isLoading ? (
                        <div className="flex min-h-[450px] justify-center items-center h-full w-full">
                            <Loading size="md" message="Loading products..." />
                        </div>
                    ) : products?.length > 0 ? (
                        <>
                            <Swiper
                                modules={SWIPER_MODULES}
                                spaceBetween={12}
                                slidesPerView={2}
                                breakpoints={SWIPER_BREAKPOINTS}
                                pagination={paginationConfig}
                                autoplay={autoplayConfig}
                                grabCursor={true}
                                className="product-carousel-swiper"
                                onSwiper={handleSwiper}
                            >
                                {products?.map((product, index) => (
                                    <SwiperSlide key={product.id} className="h-auto">
                                        <div
                                            className="h-full w-full opacity-100 translate-y-0 transition-all duration-300 ease-out"
                                            style={{ transitionDelay: `${index * 60}ms` }}
                                        >
                                            <div
                                                onClick={() => handleProductClick(product)}
                                                className="bg-white rounded-xl overflow-hidden flex h-full flex-col cursor-pointer border border-neutral-300"
                                            >
                                                <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden bg-gray-200">
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="p-4 sm:p-5 md:p-6 flex flex-col grow">
                                                    <span className="text-xs sm:text-sm font-switzer text-textcolor/60 mb-2 uppercase tracking-wide">
                                                        {product.categories[0]}
                                                    </span>

                                                    <h3 className="text-lg font-switzer font-bold sm:text-xl md:text-2xl  text-textcolor mb-4 sm:mb-5 grow line-clamp-2">
                                                        {product.name}
                                                    </h3>

                                                    <button
                                                        disabled={isInQuote(Number(product.id))}
                                                        className={`group relative w-full font-switzer py-2.5 sm:py-3 px-4 rounded-xl transition-colors duration-200 text-sm sm:text-base overflow-hidden ${isInQuote(Number(product.id))
                                                            ? "bg-gray-400 text-white cursor-not-allowed opacity-60"
                                                            : "bg-[#0f5c85] hover:bg-[#0f5c85]/70 text-white"
                                                            }`}
                                                        onClick={(e) => handleAddToQuote(product, e)}
                                                    >
                                                        <span
                                                            className={`inline-block transition-all duration-300 ease-in-out ${isInQuote(Number(product.id))
                                                                ? ""
                                                                : "group-hover:-translate-y-full group-hover:opacity-0"
                                                                }`}
                                                        >
                                                            {isInQuote(Number(product.id))
                                                                ? "Added to Quote"
                                                                : "Add to Quote"}
                                                        </span>
                                                        {!isInQuote(Number(product.id)) && (
                                                            <BsCart4 className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-100" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
                                <div
                                    className={paginationId}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%",
                                    }}
                                ></div>
                            </div>

                            <div className="flex justify-end items-center gap-4 sm:gap-8 mb-6 sm:mb-8 md:mb-10">
                                <button
                                    className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-textcolor font-switzer text-xs sm:text-sm border! border-neutral-200! rounded-xl bg-neutral-100! hover:bg-white! cursor-pointer"
                                    onClick={() => swiperInstanceRef.current?.slidePrev()}
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

                                <button
                                    className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-textcolor font-switzer text-xs sm:text-sm border! border-neutral-200! rounded-xl bg-neutral-100! hover:bg-white! cursor-pointer"
                                    onClick={() => swiperInstanceRef.current?.slideNext()}
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
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-full w-full">
                            <p className="text-textcolor text-sm">No products found</p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
});

export default ProductCarousel;
