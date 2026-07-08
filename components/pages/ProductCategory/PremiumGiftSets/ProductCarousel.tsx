"use client";

import { memo, useCallback, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import Loading from "@/components/ui/Loading";
import { ProductCard } from "@/components/common/ProductCard";
import { useQuote } from "@/contexts/QuoteContext";
import type { Product } from "@/lib/api/types";
import {
  candyCarouselNavClasses,
  candyNavIconClasses,
} from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import "swiper/css";
import "swiper/css/pagination";

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
  640: { slidesPerView: 2, spaceBetween: 16 },
  768: { slidesPerView: 3, spaceBetween: 16 },
  1024: { slidesPerView: 4, spaceBetween: 16 },
  1280: { slidesPerView: 4, spaceBetween: 16 },
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

  const { addToQuote, isInQuote } = useQuote();
  const swiperInstanceRef = useRef<SwiperType | null>(null);

  const autoplayConfig = useMemo(
    () =>
      autoplay
        ? { delay: autoplayDelay, disableOnInteraction: false }
        : false,
    [autoplay, autoplayDelay],
  );

  const paginationConfig = useMemo(
    () => ({ clickable: true, el: `.${paginationId}` }),
    [paginationId],
  );

  const handleAddToQuote = useCallback(
    (product: Product, quantity: number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!isInQuote(Number(product.id))) {
        addToQuote(product, quantity);
      }
    },
    [addToQuote, isInQuote],
  );

  const handleSwiper = useCallback((swiper: SwiperType) => {
    swiperInstanceRef.current = swiper;
  }, []);

  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        <Reveal animationNum={0} className="mb-6 max-w-3xl sm:mb-8">
          <h3 className="text-display-sm text-ink sm:text-display-md">
            {heading}
          </h3>
          <p
            className="mt-3 text-body-md text-muted sm:text-[17px] sm:leading-7"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Reveal>

        <Reveal animationNum={1}>
          {isLoading ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <Loading size="md" message="Loading products..." />
            </div>
          ) : products?.length > 0 ? (
            <>
              <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-4 sm:p-5">
                <Swiper
                  modules={SWIPER_MODULES}
                  spaceBetween={12}
                  slidesPerView={1}
                  breakpoints={SWIPER_BREAKPOINTS}
                  pagination={paginationConfig}
                  autoplay={autoplayConfig}
                  grabCursor
                  className="product-carousel-swiper"
                  onSwiper={handleSwiper}
                >
                  {products.map((product, index) => (
                    <SwiperSlide key={product.id} className="h-auto">
                      <ProductCard
                        product={product}
                        index={index}
                        onAddToQuote={handleAddToQuote}
                        isInQuote={isInQuote(Number(product.id))}
                        currentQuantity={1}
                        variant="home"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="relative mt-6 grid min-h-11 grid-cols-3 items-center sm:mt-8">
                <div className="pointer-events-none col-span-3 col-start-1 row-start-1 flex justify-center">
                  <div
                    className={`${paginationId} gift-set-carousel-pagination pointer-events-auto`}
                  />
                </div>

                <div className="relative z-20 col-start-1 row-start-1 flex items-center justify-start gap-2 sm:col-start-3 sm:justify-end">
                  <button
                    type="button"
                    className={candyCarouselNavClasses("prev")}
                    onClick={() => swiperInstanceRef.current?.slidePrev()}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className={candyNavIconClasses} strokeWidth={2.25} />
                  </button>

                  <button
                    type="button"
                    className={candyCarouselNavClasses("next")}
                    onClick={() => swiperInstanceRef.current?.slideNext()}
                    aria-label="Next slide"
                  >
                    <ChevronRight className={candyNavIconClasses} strokeWidth={2.25} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-body-md text-muted">
              No products found
            </p>
          )}
        </Reveal>
      </RevealSection>
    </section>
  );
});

export default ProductCarousel;
