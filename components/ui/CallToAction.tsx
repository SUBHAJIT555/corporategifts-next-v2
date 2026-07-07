"use client";

import { cn } from "@/lib/utilts";
import CTAButton from "@/components/ui/CTAButton";
import useInViewOnce from "@/hooks/useInView";

export interface CallToActionButton {
  text: string;
  className?: string;
  onClick?: () => void;
  link?: string;
  variant?: "default" | "light" | "dark";
  target?: string;
  rel?: React.HTMLAttributes<HTMLAnchorElement>['rel'];
}

interface CallToActionProps {
  title?: string;
  subtitle?: React.ReactNode;
  /** Optional background image URL (kept for API compatibility; new layout uses gradient) */
  backgroundImageUrl?: string;
  /** Optional small line above the main headline (e.g. "Get started with the") */
  headlineTopLine?: string;
  /** Optional line below the main headline */
  headlineBottomText?: string;
  /** Left column heading in the bottom info box */
  infoBoxHeading?: string;
  /** Bullet points for the right column (if not provided, subtitle is shown as paragraph) */
  infoBoxBullets?: string[];
  buttons?: CallToActionButton[];
}

const   CallToAction = ({
  title = "Need Customized Corporate Gifts in Dubai? Get a Bulk Quote",
  subtitle = (
    <>
      Let us know your budget, quantity, what you need, and branding requirements. Our team will help you shortlist the right corporate gifts in Dubai, whether affordable promotional giveaways, smart gadgets, luxury gift sets or customised corporate gifts for clients, employees and events.
    </>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- accepted for API compat; unused in this layout
  backgroundImageUrl,
  headlineTopLine,
  headlineBottomText = "We deliver quality, creativity, and excellence for all your gifting needs.",
  infoBoxHeading = "Baharnani Advertising LLC",
  infoBoxBullets = [
    "Premium corporate gifts and custom branding across Dubai & UAE.",
    "Luxury, eco-friendly, and promotional solutions for every occasion.",
    "Timely delivery and exceptional customer service.",
  ],
  buttons = [
    { text: "Request Bulk Quote", link: "/contact-us", variant: "dark", className: "bg-linear-to-r from-neutral-800 to-neutral-500! text-white! border! border-neutral-200! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!" as const },
    { text: "WhatsApp for Gift Ideas", link: "https://wa.me/+971556545950", target: "_blank", rel: "noopener noreferrer", variant: "light", className: "bg-linear-to-r from-neutral-100 to-neutral-300! border! border-neutral-200! text-neutral-700! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!" as const },
  ] as CallToActionButton[],
}: CallToActionProps) => {
  const { ref: topRef, inView: topInView } = useInViewOnce<HTMLDivElement>();
  const { ref: infoRef, inView: infoInView } = useInViewOnce<HTMLDivElement>();
  return (
    <section className="relative w-full overflow-hidden mb-10">
      {/* Top CTA Section with gradient background */}
      <div className="relative flex  items-center justify-center px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-16">


        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div
            ref={topRef}
            className={`space-y-8 transition-all duration-700 ease-out ${topInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="space-y-2">
              {headlineTopLine && (
                <p
                  className={`font-sentient text-xl font-medium italic text-textcolor/80 sm:text-2xl md:text-3xl transition-all duration-700 ${topInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ transitionDelay: "150ms" }}
                >
                  {headlineTopLine}
                </p>
              )}
              <h2
                className={`font-sentient text-3xl font-semibold leading-tight text-textcolor sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-700 ${topInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: "250ms" }}
              >
                {title}
              </h2>
              {headlineBottomText && (
                <p
                  className={`font-switzer pt-2 text-base font-medium capitalize leading-tight text-textcolor sm:text-lg md:text-xl transition-all duration-700 ${topInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ transitionDelay: "350ms" }}
                >
                  {headlineBottomText}
                </p>
              )}
            </div>

            {buttons.length > 0 && (
              <div
                className={`flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row sm:gap-6 transition-all duration-700 ${topInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: "450ms" }}
              >
                {buttons.map((button, index) => (
                  <CTAButton
                    key={index}
                    label={button.text}
                    href={button.link}
                    onClick={button.onClick}
                    variant={button.variant ?? "default"}
                    target={button.target}
                    rel={button.rel}
                    className={cn(
                      "w-full sm:w-auto sm:max-w-xs cursor-pointer font-sentient! font-medium text-xs sm:text-sm md:text-base",
                      button.className
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom info section with dashed grid */}
      <div className="relative p-2 md:p-0">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl border border-neutral-200 bg-white px-4 py-6 shadow-lg ring ring-neutral-200 ring-offset-4 mb-6 sm:mb-8 sm:px-6 sm:py-8 md:mb-10 md:py-10 md:ring-offset-8 lg:px-16">
          {/* Dashed grid background */}
          <div
            className="absolute inset-0 z-0"
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
                radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 80%)
              `,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div
              ref={infoRef}
              className={`space-y-4 transition-all duration-700 ease-out ${infoInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-switzer text-sm font-medium uppercase tracking-wider text-neutral-600 bg-white/10 backdrop-blur-sm">
                  <span className="inline-block h-3 w-3 shrink-0 rounded-sm bg-[#0F5C85] " />{" "}
                  {infoBoxHeading}
                </span>
              </div>
              <div className="font-sentient text-xl leading-tight text-textcolor sm:text-2xl md:text-2xl">
                {subtitle}
              </div>
            </div>

            <div
              className={`flex flex-col justify-center space-y-6 transition-all duration-700 ease-out ${infoInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
            >
              <h4 className="font-sentient mb-2 md:mb-6 text-lg font-semibold text-textcolor sm:text-xl md:text-2xl">
                Why choose Baharnani?
              </h4>
              <ul className="space-y-3 md:space-y-5">
                {infoBoxBullets.map((item, i) => (
                  <li
                    key={i}
                    className="font-switzer flex items-start text-base leading-tight text-textcolor sm:text-lg md:text-xl"
                  >
                    <span className="mr-3 mt-1 text-[#0F5C85]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
