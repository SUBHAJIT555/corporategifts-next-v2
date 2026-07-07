"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import { PiSealQuestionDuotone } from "@/components/icons";
// import { motion, useInView } from "framer-motion";
import useInView from "@/hooks/useInView";
import { PiHandshakeDuotone } from "@/components/icons/PiHandshakeDuotone";

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

const WhyChooseUs = ({
  features,
  title = (
    <>
      Why{" "}
      <PiSealQuestionDuotone className="inline-block align-middle rotate-45 w-24 h-24" />
      choose Baharnani Advertising as your trusted
      <PiHandshakeDuotone className="inline-block align-middle rotate-45 w-24 h-24" />{" "}
      corporate gifts supplier?
    </>
  ),
  subtitle = "With years of expertise, we have become one of the most reliable names among corporate gift suppliers in UAE, especially in Dubai, offering creative concepts and superior-quality products that represent your brand’s identity.",
}: WhyChooseUsProps) => {

  const swiperInstanceRef = useRef<SwiperType | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const heading = useInView<HTMLDivElement>({
    rootMargin: "-50px",
  });

  const swiperSection = useInView<HTMLDivElement>({
    rootMargin: "-100px",
  });

  const [isMobile, setIsMobile] = useState(false);
  const hasFewItems = features.length <= 3;
  const shouldUseFlexbox = hasFewItems && !isMobile;

  /* ---------------- Height Equalization (Optimized) ---------------- */

  const equalizeHeights = () => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    // Reset heights
    for (const card of cards) {
      card.style.height = "auto";
    }

    let maxHeight = 0;

    for (const card of cards) {
      const height = card.offsetHeight;
      if (height > maxHeight) maxHeight = height;
    }

    if (maxHeight > 0) {
      for (const card of cards) {
        card.style.height = `${maxHeight}px`;
      }
    }
  };

  /* ---------------- Mobile Detection (Throttled) ---------------- */

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    let timeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ---------------- ResizeObserver Instead of Timeouts ---------------- */

  useEffect(() => {
    if (!swiperSection.inView) return;

    // Run once when section becomes visible
    requestAnimationFrame(equalizeHeights);
  }, [swiperSection.inView, features]);

  return (
    <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 overflow-x-hidden">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
        {/* Heading */}
        <div
          ref={heading.ref}
          className={`mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center transition-all duration-700 ease-out ${heading.inView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
            }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            {title}
          </h2>

          <div className="mb-3 sm:mb-4 md:mb-5">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-switzer tracking-widest sm:tracking-[0.2em] md:tracking-[0.3em] text-textcolor font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Swiper Section */}
        <div
          ref={swiperSection.ref}
          className={`w-full relative transition-opacity duration-700 ease-out ${swiperSection.inView ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="relative">
            {shouldUseFlexbox ? (
              <div className="flex flex-wrap justify-center items-stretch gap-4 sm:gap-6 md:gap-8">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`h-full w-full transition-all duration-700 ease-out ${swiperSection.inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                      }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div
                      ref={(el) => {
                        if (el) cardRefs.current[index] = el;
                      }}
                      className="bg-[#e1e1e1] rounded-lg p-6 sm:p-7 md:p-8 lg:p-10 flex flex-col border border-textcolor hover:shadow-lg transition-shadow duration-300 h-full"
                    >
                      <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5 md:mb-6">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: feature.iconColor }}
                        >
                          <div className="text-textcolor">
                            {feature.icon}
                          </div>
                        </div>

                        <span
                          className="text-3xl sm:text-4xl md:text-5xl font-tanker text-textcolor "
                          style={{
                            WebkitTextStroke: "1px #10100e",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {feature.number}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-tanker text-textcolor  mb-3 sm:mb-4 md:mb-5">
                        {feature.title}
                      </h3>

                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-switzer text-textcolor leading-relaxed grow">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 24 },
                    768: { slidesPerView: 2, spaceBetween: 28 },
                    1024: { slidesPerView: 3, spaceBetween: 32 },
                  }}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-why-choose-us",
                    dynamicBullets: false,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  grabCursor
                  className="why-choose-us-swiper"
                  onSwiper={(swiper) => {
                    swiperInstanceRef.current = swiper;
                    requestAnimationFrame(equalizeHeights);
                  }}
                  onResize={equalizeHeights}
                  onSlideChange={equalizeHeights}
                >
                  {features.map((feature, index) => (
                    <SwiperSlide key={feature.id}>
                      <div
                        className={`h-full w-full transition-all duration-700 m-4 ease-out ${swiperSection.inView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                          }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div
                          ref={(el) => {
                            if (el) cardRefs.current[index] = el;
                          }}
                          className="bg-neutral-100 rounded-xl p-6 sm:p-7 md:p-8 lg:p-10 flex flex-col border border-neutral-300 ring ring-neutral-300 ring-offset-4 md:ring-offset-6 transition-shadow duration-300"
                        >
                          <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5 md:mb-6">
                            <div
                              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl ring ring-neutral-300 ring-offset-3 flex items-center justify-center shrink-0"
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

                          <h3 className="text-xl sm:text-2xl md:text-3xl font-sentient font-semibold text-textcolor  mb-3 sm:mb-4 md:mb-5">
                            {feature.title}
                          </h3>

                          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-switzer text-textcolor leading-relaxed grow">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10">
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

                  <div className="swiper-pagination-why-choose-us"></div>

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

export default WhyChooseUs;