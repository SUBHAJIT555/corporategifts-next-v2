"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Briefcase } from "lucide-react";

const aboutImage = "/assets/images/Home-page-image/About-image-home.webp";

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

          if (entry.target === headingRef.current) setHeadingVisible(true);
          if (entry.target === imageRef.current) setImageVisible(true);
          if (entry.target === textRef.current) setTextVisible(true);
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
    <section className="w-full bg-canvas">
      <div className="relative mx-auto max-w-7xl border-x border-hairline px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`max-w-3xl transition-all duration-700 ease-out ${
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <Briefcase className="h-3.5 w-3.5 text-brand-accent" />
            | About Us
          </span>
          <h2 className="mt-4 text-display-md text-ink">
            About Baharnani Advertising L.L.C. — Corporate Gifts Company in
            Dubai.
          </h2>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 items-center gap-8 sm:mt-12 lg:grid-cols-12 lg:gap-12">
          {/* Image */}
          <div
            ref={imageRef}
            className={`lg:col-span-5 transition-all duration-700 ease-out ${
              imageVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface-card">
              <Image
                src={aboutImage}
                alt="About Baharnani Advertising"
                width={1000}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Text */}
          <div
            ref={textRef}
            className={`flex flex-col gap-5 lg:col-span-7 transition-all duration-700 ease-out ${
              textVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <p className="text-body-md text-muted sm:text-[17px] sm:leading-7">
              Baharnani Advertising is a corporate gifts company in Dubai
              providing personalised, promotional, luxury, and cheap gifting
              solutions for companies all over the UAE. We help companies select
              the right corporate gifts for employees, clients, trade shows,
              product launches, festive campaigns, and brand promotions.
            </p>
            <p className="text-body-md text-muted sm:text-[17px] sm:leading-7">
              Our selection of premium gift sets, smart corporate gifts,
              apparel, office stationery, drinkware, bags, travel accessories,
              eco-friendly gifts, and branded giveaways. Our team will assist you
              in selecting products, branding with logos, packaging, and bulk
              order support to help your business create gifts that are
              functional and presentable, and consistent with your brand image.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
