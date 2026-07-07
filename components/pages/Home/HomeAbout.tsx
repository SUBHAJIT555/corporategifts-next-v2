"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import companyIcon from "@/public/icon.svg";

const aboutImage =
  "/assets/images/Home-page-image/About-image-home.webp";

const HomeAbout = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [headingVisible, setHeadingVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === headingRef.current)
            setHeadingVisible(true);
          if (entry.target === imageRef.current)
            setImageVisible(true);
          if (entry.target === textRef.current)
            setTextVisible(true);
        });
      },
      { rootMargin: "-100px" }
    );

    [headingRef, imageRef, textRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full pt-6 md:pt-8 lg:pt-8 xl:pt-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ">

        {/* Heading */}
        <div
          ref={headingRef}
          className={`
            mb-6 sm:mb-8 md:mb-10 lg:mb-12
            transition-all duration-700 ease-out
            ${headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"}
          `}
        >
          <h2 className="flex items-center gap-3 text-2xl sm:text-4xl md:text-5xl font-sentient font-semibold text-textcolor leading-tight">
            <span className="leading-tight">
            About Baharnani Advertising L.L.C. – Corporate Gifts Company in Dubai.
            </span>
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center lg:items-start">

          {/* Image */}
          <div
            ref={imageRef}
            className={`
              w-full lg:w-1/2 xl:w-2/5 shrink-0
              transition-all duration-700 ease-out
              ${imageVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"}
            `}
          >
            <div
              className={`
                relative group
                transition-all duration-700 ease-out
                ${imageVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"}
              `}
            >
              <div className="relative overflow-hidden rounded-xl border border-neutral-300 ring ring-neutral-300 ring-offset-4 md:ring-offset-8">
                <Image
                  src={aboutImage}
                  alt="About Baharnani Advertising"
                  width={1000}
                  height={1000}
                  loading="lazy"
                  className="
                    w-full h-auto object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-105
                  "
                />
                <div className="absolute inset-0 bg-textcolor/20 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div
            ref={textRef}
            className={`
              w-full lg:w-1/2 xl:w-3/5 flex flex-col gap-4 sm:gap-5 md:gap-6
              transition-all duration-700 ease-out
              ${textVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"}
            `}
          >
            <p
              className={`
                text-base sm:text-lg md:text-xl lg:text-xl 
                font-switzer text-textcolor leading-relaxed
                transition-opacity duration-700 delay-200
                ${textVisible ? "opacity-100" : "opacity-0"}
              `}
            >
             Baharnani Advertising is a corporate gifts company in Dubai providing personalised, promotional, luxury, and cheap gifting solutions for companies all over the UAE. We help companies select the right corporate gifts for employees, clients, trade shows, product launches, festive campaigns, and brand promotions.
             <br /> <br />
             Our selection of premium gift sets, smart corporate gifts, apparel, office stationery, drinkware, bags, travel accessories, eco-friendly gifts, and branded giveaways. Our team will assist you in selecting products, branding with logos, packaging, and bulk order support to help your business create gifts that are functional and presentable, and consistent with your brand image.

            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;