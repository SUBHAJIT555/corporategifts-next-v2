"use client";

import {
  LuLeaf,
  LuPackageSearch,
  LuTicketCheck,
  LuUsers,
} from "@/components/icons";
import { Award } from "lucide-react";
import {
  Reveal,
  RevealSection,
} from "@/components/ui/timeline-animation";

const homeFeatures = [
  {
    id: 1,
    number: "01",
    title: "Customized Corporate Gifts With Logo Branding",
    description:
      "We help businesses design custom corporate gifts in Dubai, featuring logo printing, engraving, embossing, packaging, and product personalization for clients, employees, and special events.",
    icon: <LuPackageSearch className="h-5 w-5" />,
    iconColor: "#A8DDF0",
  },
  {
    id: 2,
    number: "02",
    title: "Luxury, Smart & Promotional Gift Options",
    description:
      "Explore luxury corporate gifts, smart corporate gifts, branded giveaways, stationery, bags, drinkware, apparel, and premium gift sets for different budgets and occasions.",
    icon: <LuTicketCheck className="h-5 w-5" />,
    iconColor: "#F9C46B",
  },
  {
    id: 3,
    number: "03",
    title: "Affordable Bulk Gifting Support",
    description:
      "Whether you want inexpensive corporate gifts or high-end executive hampers, our team will help you choose practical options according to your quantity, audience, branding style, and delivery requirements.",
    icon: <LuLeaf className="h-5 w-5" />,
    iconColor: "#94EBC5",
  },
  {
    id: 4,
    number: "04",
    title: "UAE-Focused Corporate Gifting Experience",
    description:
      "We know the business gifting needs in Dubai for corporate events, exhibitions, festive campaigns, employee rewards, client appreciation and promotional marketing.",
    icon: <LuUsers className="h-5 w-5" />,
    iconColor: "#F7B6F7",
  },
];

const title = (
  <>
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
          className="h-4 w-4 text-brand-accent sm:h-5 sm:w-5 md:h-6 md:w-6"
          aria-hidden="true"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
          <path d="M12 19l0 .01" />
        </svg>
      </span>
      <span>choose Baharnani Advertising </span>
      <span
        className="inline-flex -rotate-6 rounded-lg border border-dashed border-hairline bg-surface-card p-0.5 sm:p-1"
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
          className="h-4 w-4 text-brand-accent sm:h-5 sm:w-5 md:h-6 md:w-6"
          aria-hidden="true"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 9a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
          <path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889" />
          <path d="M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889" />
        </svg>
      </span>
      <span>as Your Most Trusted Corporate Gifts Supplier in Dubai?</span>
    </span>
  </>
);

const subtitle =
  "Delivering quality, reliability, and consistency in every shipment.";

export default function HomeWhyChooseUs() {
  return (
    <section className="w-full overflow-x-hidden bg-canvas">
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
            {subtitle}
          </p>
        </Reveal>

        <Reveal animationNum={1}>
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {homeFeatures.map((feature, index) => (
                <Reveal
                  key={feature.id}
                  animationNum={2 + index}
                  as="article"
                  className="flex h-full flex-col rounded-xl border border-hairline bg-canvas p-5 sm:p-6"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-hairline text-ink"
                      style={{ backgroundColor: feature.iconColor }}
                    >
                      {feature.icon}
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
