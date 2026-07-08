"use client";

import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { candyDarkButtonClasses } from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

type CategoryHeroProps = {
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle: string;
  ctaHref: string;
  ctaLabel: string;
};

export default function CategoryHero({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  ctaHref,
  ctaLabel,
}: CategoryHeroProps) {
  return (
    <section className="w-full bg-canvas">
      <RevealSection className="relative mx-auto max-w-7xl overflow-hidden border-x border-hairline px-3 pt-20 pb-10 sm:px-4 sm:pt-24 sm:pb-12 md:px-6 md:pt-32 md:pb-14 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.14,
              pointerEvents: "none",
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, var(--primary) 3px, var(--primary) 4px)",
              maskImage: "linear-gradient(to bottom, #000 0%, transparent 75%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal animationNum={0} className="flex justify-center">
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-2.5 py-1 text-[11px] font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] sm:px-3 sm:text-caption dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
              {eyebrowIcon}
              {eyebrow}
            </span>
          </Reveal>

          <Reveal
            as="h1"
            animationNum={1}
            className="mt-4 text-display-lg text-ink sm:mt-5 md:text-display-xl"
          >
            {title}
          </Reveal>

          <Reveal
            as="p"
            animationNum={2}
            className="mx-auto mt-4 max-w-3xl text-body-md text-muted sm:mt-6 sm:text-[17px] sm:leading-7"
          >
            {subtitle}
          </Reveal>

          <Reveal animationNum={3} className="mt-5 flex justify-center sm:mt-7">
            <NoPrefetchLink
              href={ctaHref}
              className={candyDarkButtonClasses("w-full sm:w-auto")}
            >
              {ctaLabel}
            </NoPrefetchLink>
          </Reveal>
        </div>
      </RevealSection>
    </section>
  );
}
