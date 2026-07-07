"use client";
import { memo, useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import useInView from "@/hooks/useInView";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface FeatureCard {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
}

interface WhyChooseUsProps {
  features: FeatureCard[];
  title?: React.ReactNode;
  subtitle?: string;
}

const SWIPER_MODULES = [Pagination, Autoplay];
const SWIPER_BREAKPOINTS = {
  640: {
    slidesPerView: 1,
    spaceBetween: 24,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 28,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 32,
  },
} as const;

const WhyChooseUs = ({
  features,
  title = (
    <>
      Why{" "}
      {/* <PiSealQuestionDuotone className="inline-block align-middle rotate-45" /> */}
      Choose Us
    </>
  ),
  subtitle = "Delivering quality, reliability, and consistency in every shipment.",
}: WhyChooseUsProps) => {
  const swiperInstanceRef = useRef<SwiperType | null>(null);
  const { ref: headingRef, inView: isHeadingInView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "-50px 0px -50px 0px",
    threshold: 0.01,
  });
  const { ref: swiperRef, inView: isSwiperInView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "-100px 0px -100px 0px",
    threshold: 0.01,
  });

  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const hasFewItems = features.length <= 3;
  const shouldUseFlexbox = hasFewItems && isDesktop;

  // Detect mobile screen size
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 768);
      setShouldAutoplay(window.innerWidth >= 1280);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });

    return () => {
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  const paginationConfig = useMemo(
    () => ({
      clickable: true,
      el: ".swiper-pagination-why-choose-us",
      dynamicBullets: false,
    }),
    [],
  );

  const autoplayConfig = useMemo(
    () =>
      shouldAutoplay
        ? {
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }
        : false,
    [shouldAutoplay],
  );

  const handleSwiper = useCallback((swiper: SwiperType) => {
    swiperInstanceRef.current = swiper;
  }, []);

  return (
    <section className="w-full py-6 sm:py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-12 overflow-x-hidden">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
        {/* Heading Section */}
        <div
          ref={headingRef}
          className={`mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center transition-all duration-700 ease-out ${
            isHeadingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor leading-tight">
            {title}
          </h2>
          {/* Subtitle with spaced letters */}
          <div className="mb-3 sm:mb-4 md:mb-5">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-switzer tracking-widest sm:tracking-[0.2em] md:tracking-[0.3em] text-textcolor font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Swiper Section */}
        <div
          ref={swiperRef}
          className={`w-full relative transition-opacity duration-700 ease-out ${
            isSwiperInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative">
            {shouldUseFlexbox ? (
              /* Flexbox Layout for 3 or fewer items on desktop */
              <div className="flex flex-wrap justify-center items-stretch gap-4 sm:gap-6 md:gap-8">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`flex-1 min-w-[280px] sm:min-w-[300px] md:min-w-[320px] max-w-[480px] transition-all duration-700 ease-out ${
                      isSwiperInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div
                      className="bg-neutral-100 rounded-xl p-6 sm:p-7 md:p-8 lg:p-10 flex flex-col border border-neutral-300 hover:shadow-lg transition-shadow duration-300 h-full ring ring-neutral-300 ring-offset-4 md:ring-offset-6"
                    >
                      {/* Icon and Number */}
                      <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5 md:mb-6">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center shrink-0 border border-neutral-300 ring ring-neutral-200 ring-offset-2 md:ring-offset-3"
                          style={{ backgroundColor: feature.iconColor }}
                        >
                          <div className="text-textcolor">{feature.icon}</div>
                        </div>
                        <span
                          className="text-3xl sm:text-4xl md:text-5xl font-sentient font-semibold text-textcolor "
                          style={{
                            WebkitTextStroke: "1px #10100e",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {feature.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sentient font-semibold text-textcolor  mb-3 sm:mb-4 md:mb-5">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-switzer text-textcolor leading-relaxed grow overflow-hidden">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Swiper
                  modules={SWIPER_MODULES}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={SWIPER_BREAKPOINTS}
                  pagination={paginationConfig}
                  autoplay={autoplayConfig}
                  grabCursor={true}
                  className="why-choose-us-swiper"
                  onSwiper={handleSwiper}
                >
                  {features.map((feature, index) => (
                    <SwiperSlide key={feature.id} className="h-auto! flex">
                      <div
                        className={`h-full w-full flex py-4 transition-all duration-700 ease-out ${
                          isSwiperInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div
                          className="bg-neutral-100 rounded-xl p-6 sm:p-7 md:p-8 lg:p-10 flex h-full flex-col border border-neutral-300 ring ring-neutral-300 ring-offset-3 md:ring-offset-6 hover:shadow-lg transition-shadow duration-300 min-h-[280px] md:min-h-[320px] mx-3"
                        >
                          {/* Icon and Number */}
                          <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5 md:mb-6">
                            <div
                              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl border border-neutral-300 ring ring-neutral-200 ring-offset-3  flex items-center justify-center shrink-0"
                              style={{ backgroundColor: feature.iconColor }}
                            >
                              <div className="text-textcolor">
                                {feature.icon}
                              </div>
                            </div>
                            <span
                              className="text-3xl sm:text-4xl md:text-5xl font-sentient font-semibold text-textcolor "
                              style={{
                                WebkitTextStroke: "1px #10100e",
                                WebkitTextFillColor: "transparent",
                              }}
                            >
                              {feature.number}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sentient font-semibold text-textcolor  mb-3 sm:mb-4 md:mb-5">
                            {feature.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-switzer text-textcolor leading-relaxed grow overflow-hidden">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation and Pagination */}
                <div className="flex justify-center items-center gap-4 sm:gap-8 mt-8 sm:mt-10">
                  {/* Previous Button */}
                  <button
                    onClick={() => swiperInstanceRef.current?.slidePrev()}
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

                  {/* Pagination Dots */}
                  <div className="swiper-pagination-why-choose-us"></div>

                  {/* Next Button */}
                  <button
                    onClick={() => swiperInstanceRef.current?.slideNext()}
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(WhyChooseUs);
