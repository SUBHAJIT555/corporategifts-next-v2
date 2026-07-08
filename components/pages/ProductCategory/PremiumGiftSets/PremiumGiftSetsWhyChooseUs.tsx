"use client";

import { Award, ArrowUpRight } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import {
  candyDarkButtonClasses,
  candyWhiteButtonClasses,
} from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import type { FeatureCard } from "@/components/ui/WhyChooseUs";
import { cn } from "@/lib/utilts";

type PremiumGiftSetsWhyChooseUsProps = {
  title: string;
  features: FeatureCard[];
  subtitle?: string;
  showCtaCard?: boolean;
  ctaShopHref?: string;
};

const ICON_STYLE_MAP: Record<
  string,
  { bgClass: string; iconClass: string }
> = {
  "#B6E9C8": {
    bgClass: "bg-[#B6E9C8] dark:bg-[#B6E9C8]/15",
    iconClass: "text-ink dark:text-[#B6E9C8]",
  },
  "#FFF7BD": {
    bgClass: "bg-[#FFF7BD] dark:bg-[#FFF7BD]/15",
    iconClass: "text-ink dark:text-[#FFF7BD]",
  },
  "#C1D8FD": {
    bgClass: "bg-[#C1D8FD] dark:bg-[#C1D8FD]/15",
    iconClass: "text-ink dark:text-[#C1D8FD]",
  },
  "#FFD6F8": {
    bgClass: "bg-[#FFD6F8] dark:bg-[#FFD6F8]/15",
    iconClass: "text-ink dark:text-[#FFD6F8]",
  },
  "#FFECB3": {
    bgClass: "bg-[#FFECB3] dark:bg-[#FFECB3]/15",
    iconClass: "text-ink dark:text-[#FFECB3]",
  },
  "#4CAF50": {
    bgClass: "bg-[#B6E9C8] dark:bg-[#4CAF50]/15",
    iconClass: "text-ink dark:text-[#94EBC5]",
  },
};

function getIconStyles(iconColor: string) {
  const key = iconColor.trim().toUpperCase();

  return (
    ICON_STYLE_MAP[key] ?? {
      bgClass: "bg-surface-soft dark:bg-white/10",
      iconClass: "text-ink dark:text-brand-accent",
    }
  );
}

export default function PremiumGiftSetsWhyChooseUs({
  title,
  features,
  subtitle = "Delivering quality, reliability, and consistency in every shipment.",
  showCtaCard = false,
  ctaShopHref = "#gift-set",
}: PremiumGiftSetsWhyChooseUsProps) {
  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        <Reveal
          animationNum={0}
          className="mx-auto mb-2 max-w-4xl text-center sm:mb-3"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <Award className="h-3.5 w-3.5 text-brand-accent" />
            Why choose us
          </span>

          <h2 className="mt-4 text-display-md text-ink">{title}</h2>

          <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
            {subtitle}
          </p>
        </Reveal>

        <Reveal animationNum={1}>
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {features.map((feature, index) => {
                const iconStyles = getIconStyles(feature.iconColor);

                return (
                <Reveal
                  key={feature.id}
                  animationNum={2 + index}
                  as="article"
                  className="flex h-full flex-col rounded-xl border border-hairline bg-canvas p-5 sm:p-6"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-hairline",
                        iconStyles.bgClass,
                      )}
                    >
                      <div className={iconStyles.iconClass}>{feature.icon}</div>
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
                );
              })}

              {showCtaCard ? (
                <Reveal
                  animationNum={2 + features.length}
                  as="article"
                  className="flex h-full flex-col justify-between rounded-xl border border-dashed border-hairline bg-canvas p-5 sm:p-6"
                >
                  <div>
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-hairline bg-brand-accent/10">
                        <ArrowUpRight className="h-5 w-5 text-brand-accent" />
                      </div>
                      <span
                        className="text-3xl font-semibold tracking-tight text-muted-soft sm:text-4xl"
                        style={{
                          WebkitTextStroke: "1px var(--cal-hairline)",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        06
                      </span>
                    </div>

                    <h3 className="mb-3 text-lg font-semibold leading-snug text-ink sm:text-xl">
                      Ready to order premium gift sets?
                    </h3>

                    <p className="text-body-md text-muted">
                      Speak with our team for bulk quotes, or browse the
                      collection and add items to your quotation cart.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <NoPrefetchLink
                      href="/contact-us"
                      className={cn(
                        candyDarkButtonClasses("w-full sm:w-auto"),
                        "text-center",
                      )}
                    >
                      Contact Us
                    </NoPrefetchLink>
                    <NoPrefetchLink
                      href={ctaShopHref}
                      className={cn(
                        candyWhiteButtonClasses("w-full sm:w-auto"),
                        "text-center",
                      )}
                    >
                      Shop Now
                    </NoPrefetchLink>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
}
