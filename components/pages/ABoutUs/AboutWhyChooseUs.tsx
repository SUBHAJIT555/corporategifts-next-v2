"use client";

import {
  Award,
  Leaf,
  PackageSearch,
  TicketCheck,
  TruckElectric,
  Users,
  Waypoints,
} from "lucide-react";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

const features = [
  {
    id: 1,
    number: "01",
    title: "Comprehensive Gift Collection",
    description:
      "Wide range of corporate gifts from luxury items to eco-friendly solutions.",
    icon: <PackageSearch className="h-5 w-5" />,
    iconBgClass: "bg-[#F7B6F7] dark:bg-[#F7B6F7]/15",
    iconClass: "text-ink dark:text-[#F7B6F7]",
  },
  {
    id: 2,
    number: "02",
    title: "Premium Quality Assurance",
    description:
      "Certified products and quality control ensuring excellence in every gift.",
    icon: <TicketCheck className="h-5 w-5" />,
    iconBgClass: "bg-[#FAF491] dark:bg-[#FAF491]/15",
    iconClass: "text-ink dark:text-[#FAF491]",
  },
  {
    id: 3,
    number: "03",
    title: "Full Customization",
    description:
      "Logo engraving, embossing, printing, and packaging tailored to your brand.",
    icon: <Users className="h-5 w-5" />,
    iconBgClass: "bg-[#A8DDF0] dark:bg-[#A8DDF0]/15",
    iconClass: "text-ink dark:text-[#A8DDF0]",
  },
  {
    id: 4,
    number: "04",
    title: "Fast Delivery",
    description:
      "Efficient logistics ensuring timely delivery across Dubai, UAE, and beyond.",
    icon: <TruckElectric className="h-5 w-5" />,
    iconBgClass: "bg-[#FBBEC6] dark:bg-[#FBBEC6]/15",
    iconClass: "text-ink dark:text-[#FBBEC6]",
  },
  {
    id: 5,
    number: "05",
    title: "Dubai-Based Excellence",
    description:
      "Strategically located in Dubai for quick access and reliable service.",
    icon: <Waypoints className="h-5 w-5" />,
    iconBgClass: "bg-[#83E3F6] dark:bg-[#83E3F6]/15",
    iconClass: "text-ink dark:text-[#83E3F6]",
  },
  {
    id: 6,
    number: "06",
    title: "Eco-Friendly Options",
    description:
      "Sustainable gift choices promoting environmental responsibility.",
    icon: <Leaf className="h-5 w-5" />,
    iconBgClass: "bg-[#94EBC5] dark:bg-[#94EBC5]/15",
    iconClass: "text-ink dark:text-[#94EBC5]",
  },
] as const;

const title = (
  <span className="inline-flex flex-wrap items-center justify-center gap-2">
    <span>Why </span>
    <span
      className="inline-flex rotate-6 rounded-lg border border-dashed border-hairline bg-surface-card p-0.5 sm:p-1"
      aria-hidden="true"
    >
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
        className="h-4 w-4 text-brand-accent sm:h-5 sm:w-5"
        aria-hidden="true"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
        <path d="M12 19l0 .01" />
      </svg>
    </span>
    <span>Choose Baharnani?</span>
  </span>
);

export default function AboutWhyChooseUs() {
  return (
    <section className="w-full bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        <Reveal
          animationNum={0}
          className="mx-auto mb-2 max-w-4xl text-center sm:mb-3"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <Award className="h-3.5 w-3.5 text-brand-accent" />
            Why Choose Us
          </span>

          <h2 className="mt-4 text-display-md text-ink">{title}</h2>

          <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
            We don&apos;t just supply gifts — we create meaningful connections
            that strengthen relationships and elevate your brand presence.
          </p>
        </Reveal>

        <Reveal animationNum={1}>
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Reveal
                  key={feature.id}
                  animationNum={2 + index}
                  as="article"
                  className="flex h-full flex-col rounded-xl border border-hairline bg-canvas p-5 sm:p-6"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-hairline ${feature.iconBgClass}`}
                    >
                      <div className={feature.iconClass}>{feature.icon}</div>
                    </div>
                    <span
                      className="text-3xl font-semibold tracking-tight text-muted-soft sm:text-4xl"
                      style={{
                        WebkitTextStroke: "1px var(--cal-hairline)",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-semibold leading-snug text-ink sm:text-xl">
                    {feature.title}
                  </h3>

                  <p className="text-body-md text-muted">{feature.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </RevealSection>


    </section>
  );
}
