"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

export interface SeoSection {
  heading: string;
  content: string;
  badgeText?: string;
  highlightLine?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right" | "top" | "bottom";
}

interface AdditionalForSeoProps {
  sections: SeoSection | SeoSection[];
}

const AdditionalForSeo = ({ sections }: AdditionalForSeoProps) => {
  const sectionsArray = Array.isArray(sections) ? sections : [sections];

  const getBadgeText = (section: SeoSection, index: number) => {
    if (section.badgeText) return section.badgeText;

    const heading = section.heading.toLowerCase();
    if (heading.includes("affordable")) return "Affordable Luxury";
    if (heading.includes("luxur")) return "Luxury Gift Sets";
    if (heading.includes("delivery")) return "Fast UAE Delivery";
    if (heading.includes("dubai")) return "Dubai Gift Sets";
    if (heading.includes("uae")) return "Across UAE";

    return `Gift Set Insight ${index + 1}`;
  };

  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        <div className="divide-y divide-hairline">
          {sectionsArray.map((section, index) => {
            const imagePosition = section.imagePosition || "right";
            const hasImage = !!section.image;
            const isLast = index === sectionsArray.length - 1;

            return (
              <Reveal
                key={index}
                animationNum={index}
                className={`py-10 md:py-12 ${isLast ? "" : ""}`}
              >
                {hasImage && imagePosition === "top" && (
                  <div className="mb-6 sm:mb-8">
                    <Image
                      width={1200}
                      height={700}
                      src={section.image!}
                      alt={section.imageAlt || section.heading}
                      className="max-h-[260px] w-full rounded-2xl border border-hairline object-cover sm:max-h-[340px] md:max-h-[420px]"
                    />
                  </div>
                )}

                <div
                  className={
                    hasImage &&
                    (imagePosition === "left" || imagePosition === "right")
                      ? "flex flex-col lg:flex-row lg:items-start lg:gap-8 xl:gap-12"
                      : ""
                  }
                >
                  {hasImage && imagePosition === "left" && (
                    <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
                      <Image
                        width={1200}
                        height={800}
                        src={section.image!}
                        alt={section.imageAlt || section.heading}
                        className="w-full rounded-2xl border border-hairline object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <span className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body">
                      <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
                      {getBadgeText(section, index)}
                    </span>

                    <h2 className="mb-4 text-display-sm text-ink sm:text-display-md">
                      {section.heading}
                    </h2>

                    <p className="mb-5 text-body-md text-body sm:text-[17px] sm:leading-7">
                      {section.content}
                    </p>

                    {section.highlightLine && (
                      <p className="rounded-xl border border-dashed border-hairline bg-surface-card px-5 py-4 text-base font-semibold italic leading-relaxed text-ink sm:px-6 sm:py-5 sm:text-lg">
                        &quot;{section.highlightLine}&quot;
                      </p>
                    )}
                  </div>

                  {hasImage && imagePosition === "right" && (
                    <div className="mt-6 w-full lg:mt-0 lg:w-1/2">
                      <Image
                        width={1200}
                        height={800}
                        src={section.image!}
                        alt={section.imageAlt || section.heading}
                        className="w-full rounded-2xl border border-hairline object-cover"
                      />
                    </div>
                  )}
                </div>

                {hasImage && imagePosition === "bottom" && (
                  <div className="mt-6 sm:mt-8">
                    <Image
                      width={1200}
                      height={700}
                      src={section.image!}
                      alt={section.imageAlt || section.heading}
                      className="max-h-[260px] w-full rounded-2xl border border-hairline object-cover sm:max-h-[340px] md:max-h-[420px]"
                    />
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </RevealSection>
    </section>
  );
};

export default AdditionalForSeo;
