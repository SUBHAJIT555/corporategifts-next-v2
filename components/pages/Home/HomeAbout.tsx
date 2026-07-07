"use client";

import Image from "next/image";
import { Briefcase } from "lucide-react";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

const aboutImage = "/assets/images/Home-page-image/About-image-home.webp";

const HomeAbout = () => {
  return (
    <section className="w-full bg-canvas">
      <RevealSection className="relative mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        <Reveal animationNum={0} className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <Briefcase className="h-3.5 w-3.5 text-brand-accent" />
            About Us
          </span>
          <h2 className="mt-4 text-display-md text-ink">
            About Baharnani Advertising L.L.C. — Corporate Gifts Company in
            Dubai.
          </h2>
        </Reveal>

        <div className="mt-2 grid grid-cols-1 items-center gap-4 sm:mt-3 lg:grid-cols-12 lg:gap-6">
          <Reveal animationNum={1} className="lg:col-span-5">
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
          </Reveal>

          <Reveal
            animationNum={2}
            className="flex flex-col gap-5 lg:col-span-7"
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
          </Reveal>
        </div>
      </RevealSection>
    </section>
  );
};

export default HomeAbout;
