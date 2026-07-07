"use client";

import { Handshake } from "lucide-react";
import { LogosCarousel } from "@/components/ui/logos-carousel";
import { MonochromeBrandLogo } from "@/components/ui/monochrome-brand-logo";
import SectionDivider from "@/components/ui/SectionDivider";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

const BRAND_LOGOS = [
  {
    src: "/assets/images/Brand_logos/Careem-logo.svg",
    alt: "Careem logo",
    name: "Careem",
  },
  {
    src: "/assets/images/Brand_logos/EtihadArena-logo-mono.svg",
    alt: "Etihad Arena logo",
    name: "Etihad Arena",
  },
  {
    src: "/assets/images/Brand_logos/FAB-logo.svg",
    alt: "First Abu Dhabi Bank logo",
    name: "FAB",
  },
  {
    src: "/assets/images/Brand_logos/Himalaya-logo.svg",
    alt: "Himalaya logo",
    name: "Himalaya",
  },
  {
    src: "/assets/images/Brand_logos/Keeta-logo.svg",
    alt: "Keeta logo",
    name: "Keeta",
  },
  {
    src: "/assets/images/Brand_logos/Noon-logo-mono.svg",
    alt: "Noon logo",
    name: "Noon",
  },
  {
    src: "/assets/images/Brand_logos/RIT-logo.svg",
    alt: "RIT Dubai logo",
    name: "RIT Dubai",
  },
  {
    src: "/assets/images/Brand_logos/Talabat-logo-mono.svg",
    alt: "Talabat logo",
    name: "Talabat",
  },
] as const;

export default function BrandsSocialProof() {
  return (
    <section className="w-full bg-canvas">
      <div className="max-w-screen overflow-x-clip">
        <RevealSection className="@container mx-auto max-w-7xl border-x border-hairline px-4 sm:px-6">
          <Reveal animationNum={0} className="max-w-3xl pt-3 sm:pt-4 lg:pt-6">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
              <Handshake className="h-3.5 w-3.5 text-brand-accent" />
              Partners
            </span>
            <h2 className="mt-4 text-display-md text-ink">Brands We Work With.</h2>
          </Reveal>

          <Reveal animationNum={1} className="pb-3 sm:pb-4 lg:pb-6">
            <div className="py-8">
              <div className="screen-line-top screen-line-bottom">
                <h3 className="ml-4 py-4 text-sm font-medium tracking-wide text-muted @2xl:text-base/none">
                  Trusted by leading brands across the UAE
                </h3>

                <div className="screen-line-top relative">
                  <div
                    className="pointer-events-none absolute inset-0 grid grid-cols-2 @2xl:grid-cols-4"
                    aria-hidden
                  >
                    <div className="border-r border-dashed border-hairline" />
                    <div className="border-r border-dashed border-hairline @max-2xl:hidden" />
                    <div className="border-r border-dashed border-hairline @max-2xl:hidden" />
                  </div>

                  <LogosCarousel
                    columnCount={4}
                    className="py-4 text-ink [--column-count:2] @2xl:[--column-count:4]"
                  >
                    {BRAND_LOGOS.map((brand) => (
                      <MonochromeBrandLogo
                        key={brand.name}
                        src={brand.src}
                        alt={brand.alt}
                      />
                    ))}
                  </LogosCarousel>
                </div>
              </div>
            </div>
          </Reveal>
        </RevealSection>
      </div>

      <SectionDivider />
    </section>
  );
}
