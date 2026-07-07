'use client';
import Image from "next/image";
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
  // Normalize to array
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

  const renderBadgeIcon = (section: SeoSection) => {
    const heading = section.heading.toLowerCase();
    const isDeliveryBadge =
      heading.includes("delivery") || heading.includes("shipping") || heading.includes("uae");

    if (isDeliveryBadge) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 sm:size-5 text-[#0F5C85]"
          aria-hidden="true"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
          <path d="M3 9l4 0" />
        </svg>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 sm:size-5 text-[#0F5C85]"
        aria-hidden="true"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4l4 -6" />
      </svg>
    );
  };

  return (
    <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 overflow-x-hidden">
      <RevealSection className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
        {sectionsArray.map((section, index) => {
          const imagePosition = section.imagePosition || "right";
          const hasImage = !!section.image;
          const isLast = index === sectionsArray.length - 1;

          return (
            <Reveal
              key={index}
              animationNum={index}
              className={`${isLast
                  ? "mb-8 sm:mb-10 md:mb-12 lg:mb-16"
                  : "mb-10 sm:mb-12 md:mb-14 lg:mb-16"
                } relative overflow-hidden border border-neutral-300 ring ring-neutral-200 ring-offset-4 md:ring-offset-8 rounded-2xl bg-white backdrop-blur-sm p-5 sm:p-6 md:p-8 lg:p-10`}
            >
              <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(231,229,228,0.38) 1px, transparent 1px), linear-gradient(to bottom, rgba(231,229,228,0.38) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 0",
                  opacity: 0.7,
                }}
              />

              <div className="relative z-10">
              {/* Image at top if position is top */}
              {hasImage && imagePosition === "top" && (
                <div className="mb-6 sm:mb-8 md:mb-10">
                  <Image
                    width={1200}
                    height={700}
                    src={section.image!}
                    alt={section.imageAlt || section.heading}
                    className="w-full h-auto rounded-xl object-cover max-h-[260px] sm:max-h-[340px] md:max-h-[420px] border border-neutral-300 ring ring-neutral-200 ring-offset-2"
                  />
                </div>
              )}

              <div
                className={`flex flex-col ${hasImage &&
                  (imagePosition === "left" || imagePosition === "right")
                  ? "lg:flex-row lg:items-start lg:gap-8 xl:gap-12"
                  : ""
                  }`}
              >
                {/* Image on left */}
                {hasImage && imagePosition === "left" && (
                  <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <Image
                      width={1200}
                      height={800}
                      src={section.image!}
                      alt={section.imageAlt || section.heading}
                      className="w-full h-auto rounded-xl object-cover border border-neutral-300 ring ring-neutral-200 ring-offset-2"
                    />
                  </div>
                )}

                {/* Content Section */}
                <div
                  className={`flex-1 ${hasImage && imagePosition === "left" ? "lg:pl-0" : ""
                    }`}
                >
                  <span className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 ring ring-neutral-200 ring-offset-2 bg-neutral-100 px-3 py-1 text-xs sm:text-sm font-switzer font-medium text-textcolor mb-4">
                    {renderBadgeIcon(section)}
                    {getBadgeText(section, index)}
                  </span>

                  {/* H2 Heading */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor leading-tight mb-4 sm:mb-5 md:mb-6">
                    {section.heading}
                  </h2>

                  <div className="h-1.5 w-20  bg-[#0F5C85] mb-5 sm:mb-6 md:mb-7" />

                  {/* Content Paragraph */}
                  <div className="mb-5 sm:mb-6 md:mb-8">
                    <p className="text-base sm:text-lg md:text-xl font-switzer text-textcolor leading-relaxed">
                      {section.content}
                    </p>
                  </div>

                  {/* Highlight Line */}
                  {section.highlightLine && (
                    <div>
                      <p className="rounded-2xl border border-neutral-300 bg-neutral-100 px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 text-lg sm:text-xl md:text-2xl font-sentient font-semibold text-textcolor italic leading-relaxed">
                        &quot;{section.highlightLine}&quot;
                      </p>
                    </div>
                  )}
                </div>

                {/* Image on right */}
                {hasImage && imagePosition === "right" && (
                  <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                    <Image
                      width={1200}
                      height={800}
                      src={section.image!}
                      alt={section.imageAlt || section.heading}
                      className="w-full h-auto rounded-xl object-cover border border-neutral-300 ring ring-neutral-200 ring-offset-2"
                    />
                  </div>
                )}
              </div>

              {/* Image at bottom if position is bottom */}
              {hasImage && imagePosition === "bottom" && (
                <div className="mt-6 sm:mt-8 md:mt-10">
                  <Image
                    width={1200}
                    height={700}
                    src={section.image!}
                    alt={section.imageAlt || section.heading}
                    className="w-full h-auto rounded-xl object-cover max-h-[260px] sm:max-h-[340px] md:max-h-[420px] border border-neutral-300 ring ring-neutral-200 ring-offset-2"
                  />
                </div>
              )}
              </div>
            </Reveal>
          );
        })}
      </RevealSection>
    </section>
  );
};

export default AdditionalForSeo;
