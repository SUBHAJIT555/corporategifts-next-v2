"use client";

import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

const cardGridBg = {
  backgroundImage: `
    linear-gradient(to right, #e7e5e4 1px, transparent 1px),
    linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
  `,
  backgroundSize: "1px 1px",
  backgroundPosition: "0 0, 0 0",
  maskImage: `
    repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
  `,
  WebkitMaskImage: `
    repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
  `,
  maskComposite: "intersect" as const,
  WebkitMaskComposite: "source-in" as const,
};

const VisionMission = () => {
  return (
    <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 overflow-x-hidden">
      <RevealSection className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
        <Reveal animationNum={0} className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor leading-tight">
            Our Purpose and Direction.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <Reveal
            animationNum={1}
            className="relative rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border border-neutral-200 ring ring-neutral-300 ring-offset-3 md:ring-offset-6 h-full bg-bg overflow-hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={cardGridBg}
            />
            <div className="relative z-10 flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-1 sm:mb-2 border border-neutral-200 ring ring-neutral-300 ring-offset-3 bg-neutral-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F5C85"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-textcolor"
                >
                  <path d="M6 21l6 -5l6 5" />
                  <path d="M12 13v8" />
                  <path d="M3.294 13.678l.166 .281c.52 .88 1.624 1.265 2.605 .91l14.242 -5.165a1.023 1.023 0 0 0 .565 -1.456l-2.62 -4.705a1.087 1.087 0 0 0 -1.447 -.42l-.056 .032l-12.694 7.618c-1.02 .613 -1.357 1.897 -.76 2.905l-.001 0" />
                  <path d="M14 5l3 5.5" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-sentient font-semibold text-textcolor">
                Our Vision:
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-switzer text-textcolor leading-relaxed">
                To be recognized as the{" "}
                <strong className="font-semibold text-textcolor">
                  leading corporate gift supplier in Dubai and the UAE
                </strong>
                , setting new standards in creativity, quality, and personalized
                gifting solutions that strengthen business relationships.
              </p>
            </div>
          </Reveal>

          <Reveal
            animationNum={2}
            className="relative bg-bg rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border border-neutral-200 ring ring-neutral-300 ring-offset-3 md:ring-offset-6 h-full overflow-hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={cardGridBg}
            />
            <div className="relative z-10 flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-1 sm:mb-2 border border-neutral-200 ring ring-neutral-300 ring-offset-3 bg-neutral-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F5C85"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-textcolor"
                >
                  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M12 7a5 5 0 1 0 5 5" />
                  <path d="M13 3.055a9 9 0 1 0 7.941 7.945" />
                  <path d="M15 6v3h3l3 -3h-3v-3l-3 3" />
                  <path d="M15 9l-3 3" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-sentient font-semibold text-textcolor">
                Our Mission:
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-switzer text-textcolor leading-relaxed">
                To deliver{" "}
                <strong className="font-semibold text-textcolor">
                  exceptional corporate gifts and customized solutions
                </strong>{" "}
                that enhance brand visibility, strengthen client relationships,
                and create lasting impressions through premium quality, creative
                designs, and personalized branding services across Dubai, Abu
                Dhabi, and the UAE.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal animationNum={3} className="w-full relative mt-4 sm:mt-6 md:mt-8 lg:mt-10 overflow-hidden">
          <div className="max-w-4xl sm:max-w-5xl mx-auto relative px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-sentient font-medium text-textcolor leading-relaxed text-center pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6 md:px-8">
              We are committed to expanding our diverse collection of luxury,
              eco-friendly, and promotional gifts while maintaining the highest
              standards of quality, timely delivery, and exceptional customer
              service that defines Baharnani Advertising as a trusted partner in
              corporate gifting.
            </p>
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
};

export default VisionMission;
