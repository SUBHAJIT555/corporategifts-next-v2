"use client";
import React, { memo } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import CTAButton from "./CTAButton";
import useInView from "@/hooks/useInView";

interface CommonHeroProps {
  /** First line of the heading */
  title: string;
  /** Second line - entire line with gradient (used when titleLine2Highlight is not set) */
  titlesuffix?: string;
  subtitle: string;
  badgeText?: string;
  /**
   * Second line with one gradient word: render as "titleLine2Before + [gradient]titleLine2Highlight[/] + titleLine2After".
   * When set, titlesuffix is ignored for line 2.
   */
  titleLine2Before?: string;
  titleLine2Highlight?: string;
  titleLine2After?: string;
  /** Optional animated gradient colors for the highlighted word / suffix */
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  buttonLink?: string;
  buttonText?: string;
  secondaryButtonLink?: string;
  secondaryButtonText?: string;
}

type RevealOnViewProps = {
  as: "div" | "h1" | "p";
  className: string;
  hiddenClassName: string;
  visibleClassName: string;
  children: React.ReactNode;
};

const RevealOnView = memo(function RevealOnView({
  as,
  className,
  hiddenClassName,
  visibleClassName,
  children,
}: RevealOnViewProps) {
  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0.1,
    once: true,
  });

  const Component = as;

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${className} ${inView ? visibleClassName : hiddenClassName}`}
    >
      {children}
    </Component>
  );
});

const CommonHero: React.FC<CommonHeroProps> = ({
  title,
  titlesuffix,
  subtitle,
  badgeText = "Dubai's Trusted Corporate Gifts Partner",
  titleLine2Before,
  titleLine2Highlight,
  titleLine2After,
  buttonLink,
  buttonText,
  gradientFrom = "#A8DDF0",
  gradientVia = "#0F5C85",
  gradientTo = "#A8DDF0",
  secondaryButtonLink,
  secondaryButtonText,
}) => {
  const primaryHref = buttonLink || "#our-services";
  const primaryLabel = buttonText || "Explore Our Products";

  return (
    <section className="w-full relative min-h-screen bg-white flex items-center justify-center overflow-hidden border-b border-neutral-200">
      {/* Grid-style dashed background, no hero image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #A8DDF0 1px, transparent 1px),
            linear-gradient(to bottom, #A8DDF0 1px, transparent 1px)
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
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 80%)
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
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Bottom glow background based on #A8DDF0 */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(168, 221, 240, 0.35) 0%, transparent 45%),
            radial-gradient(circle at 50% 100%, rgba(168, 221, 240, 0.25) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center justify-center text-center">
        {/* Badge / update banner */}
        {badgeText && (
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 bg-white/80 backdrop-blur-sm mb-8 ring ring-neutral-300 ring-offset-2 md:ring-offset-4 opacity-0 translate-y-6 animate-fade-up3"
            style={{ animationDelay: "200ms" }}
          >
            <div className="size-3 rounded bg-emerald-400 animate-pulse border border-neutral-300" />
            <span className="text-sm md:text-base font-switzer font-medium text-textcolor">
              {badgeText}
            </span>
          </div>
        )}

        {/* Main heading: line 1 + line 2 (optional one gradient word or full gradient suffix) */}
        <RevealOnView
          as="h1"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sentient font-light text-textcolor mb-4 sm:mb-6 leading-tight transition-all duration-700 ease-out"
          visibleClassName="opacity-100 translate-y-0"
          hiddenClassName="opacity-0 translate-y-10"
        >
          <span className="block">{title}</span>
          {titleLine2Highlight != null ? (
            <span className="block mt-1 font-sentient text-textcolor">
              {titleLine2Before}
              <span
                className="inline-block bg-clip-text text-transparent animate-hero-gradient-shift"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
                  backgroundSize: "200% auto",
                }}
              >
                {titleLine2Highlight}
              </span>
              {titleLine2After}
            </span>
          ) : titlesuffix ? (
            <span
              className="block mt-1 bg-clip-text text-transparent font-sentient animate-hero-gradient-shift"
              style={{
                backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
                backgroundSize: "200% auto",
              }}
            >
              {titlesuffix}
            </span>
          ) : null}
        </RevealOnView>

        {/* Subtitle */}
        <RevealOnView
          as="p"
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-textcolor font-switzer mb-8 sm:mb-10 md:mb-12 max-w-4xl leading-relaxed transition-all duration-700 ease-out"
          visibleClassName="opacity-100 translate-y-0"
          hiddenClassName="opacity-0 translate-y-8"
        >
          {subtitle}
        </RevealOnView>

        {/* CTA buttons */}
        <RevealOnView
          as="div"
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center transition-all duration-700 ease-out"
          visibleClassName="opacity-100 translate-y-0"
          hiddenClassName="opacity-0 translate-y-8"
        >
          <NoPrefetchLink href={primaryHref}>
            <CTAButton
              label={primaryLabel}
              variant="dark"
              className="font-sentient bg-linear-to-l from-neutral-500 to-neutral-800 cursor-pointer text-sm sm:text-base ring-1 ring-neutral-300 ring-offset-2 md:ring-offset-4"
            />
          </NoPrefetchLink>

          {secondaryButtonLink && secondaryButtonText && (
            <NoPrefetchLink href={secondaryButtonLink}>
              <CTAButton
                label={secondaryButtonText}
                variant="light"
                className="font-sentient bg-linear-to-r from-neutral-100 to-neutral-300 cursor-pointer text-sm sm:text-base"
              />
            </NoPrefetchLink>
          )}
        </RevealOnView>
      </div>

      {/* Local keyframes for animated gradient text */}
      {/* <style>{`
        @keyframes hero-gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-hero-gradient {
          animation: hero-gradient-shift 3s ease-in-out infinite;
        }
      `}</style> */}
    </section>
  );
};

export default CommonHero;
