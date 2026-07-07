"use client";

import { Compass, Target, Telescope } from "lucide-react";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

const pillars = [
  {
    number: "01",
    label: "Our Vision",
    icon: <Telescope className="h-5 w-5" />,
    iconBgClass: "bg-[#A8DDF0] dark:bg-[#A8DDF0]/15",
    iconClass: "text-ink dark:text-[#A8DDF0]",
    content: (
      <>
        To be recognized as the{" "}
        <strong className="font-semibold text-ink">
          leading corporate gift supplier in Dubai and the UAE
        </strong>
        , setting new standards in creativity, quality, and personalized gifting
        solutions that strengthen business relationships.
      </>
    ),
  },
  {
    number: "02",
    label: "Our Mission",
    icon: <Target className="h-5 w-5" />,
    iconBgClass: "bg-[#F9C46B] dark:bg-[#F9C46B]/15",
    iconClass: "text-ink dark:text-[#F9C46B]",
    content: (
      <>
        To deliver{" "}
        <strong className="font-semibold text-ink">
          exceptional corporate gifts and customized solutions
        </strong>{" "}
        that enhance brand visibility, strengthen client relationships, and
        create lasting impressions through premium quality, creative designs,
        and personalized branding services across Dubai, Abu Dhabi, and the
        UAE.
      </>
    ),
  },
] as const;

const VisionMission = () => {
  return (
    <section className="w-full bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        <Reveal animationNum={0} className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <Compass className="h-3.5 w-3.5 text-brand-accent" />
            Vision & Mission
          </span>
          <h2 className="mt-4 text-display-md text-ink">
            Our Purpose and Direction.
          </h2>
          <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
            The principles that guide every gift we design, source, and deliver
            across the UAE.
          </p>
        </Reveal>

        <Reveal animationNum={1} className="mt-3 sm:mt-4">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
              {pillars.map((pillar, index) => (
                <Reveal
                  key={pillar.label}
                  animationNum={index + 2}
                  as="article"
                  className="flex h-full flex-col rounded-xl border border-hairline bg-canvas p-5 sm:p-6"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-hairline ${pillar.iconBgClass}`}
                    >
                      <div className={pillar.iconClass}>{pillar.icon}</div>
                    </div>
                    <span
                      className="text-3xl font-semibold tracking-tight text-muted-soft sm:text-4xl"
                      style={{
                        WebkitTextStroke: "1px var(--cal-hairline)",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-semibold leading-snug text-ink sm:text-xl">
                    {pillar.label}
                  </h3>

                  <p className="text-body-md text-muted sm:text-[17px] sm:leading-7">
                    {pillar.content}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal animationNum={4} className="mt-3 sm:mt-4">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-card">
            <div className="screen-line-top screen-line-bottom px-5 py-6 sm:px-8 sm:py-8">
              <p className="mx-auto max-w-3xl text-center text-body-md text-muted sm:text-[17px] sm:leading-7">
                We are committed to expanding our diverse collection of luxury,
                eco-friendly, and promotional gifts while maintaining the highest
                standards of quality, timely delivery, and exceptional customer
                service that defines Baharnani Advertising as a trusted partner in
                corporate gifting.
              </p>
            </div>
          </div>
        </Reveal>
      </RevealSection>

    </section>
  );
};

export default VisionMission;
