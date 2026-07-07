"use client";

import { cn } from "@/lib/utilts";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import {
  Reveal,
  RevealSection,
} from "@/components/ui/timeline-animation";
import {
  candyAccentButtonClasses,
  candyDarkButtonClasses,
  candyWhiteButtonClasses,
} from "@/components/ui/candy-button";

export interface CallToActionButton {
  text: string;
  className?: string;
  onClick?: () => void;
  link?: string;
  variant?: "default" | "light" | "dark";
  target?: string;
  rel?: React.HTMLAttributes<HTMLAnchorElement>["rel"];
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

function getButtonClasses(variant: CallToActionButton["variant"] = "default") {
  if (variant === "dark") return candyDarkButtonClasses();
  if (variant === "light") return candyWhiteButtonClasses();
  return candyAccentButtonClasses();
}

function CtaActionButton({
  button,
  index,
}: {
  button: CallToActionButton;
  index: number;
}) {
  const classes = cn(
    "w-full sm:w-auto sm:min-w-[200px]",
    getButtonClasses(button.variant),
    button.className
  );

  if (button.link) {
    return (
      <NoPrefetchLink
        key={index}
        href={button.link}
        target={button.target}
        rel={button.rel}
        className={classes}
      >
        {button.text}
      </NoPrefetchLink>
    );
  }

  return (
    <button
      key={index}
      type="button"
      onClick={button.onClick}
      className={classes}
    >
      {button.text}
    </button>
  );
}

const CallToAction = ({
  title = "Need Customized Corporate Gifts in Dubai? Get a Bulk Quote",
  subtitle = (
    <>
      Let us know your budget, quantity, what you need, and branding
      requirements. Our team will help you shortlist the right corporate gifts
      in Dubai, whether affordable promotional giveaways, smart gadgets, luxury
      gift sets or customised corporate gifts for clients, employees and
      events.
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
    {
      text: "Request Bulk Quote",
      link: "/contact-us",
      variant: "dark",
    },
    {
      text: "WhatsApp for Gift Ideas",
      link: "https://wa.me/+971556545950",
      target: "_blank",
      rel: "noopener noreferrer",
      variant: "light",
    },
  ] as CallToActionButton[],
}: CallToActionProps) => {
  return (
    <section className="relative w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Top CTA */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="space-y-4">
            {headlineTopLine && (
              <Reveal animationNum={0}>
                <p className="text-body-md italic text-muted sm:text-lg">
                  {headlineTopLine}
                </p>
              </Reveal>
            )}

            <Reveal animationNum={1}>
              <h2 className="text-display-md text-ink">{title}</h2>
            </Reveal>

            {headlineBottomText && (
              <Reveal animationNum={2}>
                <p className="mx-auto max-w-3xl text-body-md capitalize text-muted sm:text-[17px] sm:leading-7">
                  {headlineBottomText}
                </p>
              </Reveal>
            )}
          </div>

          {buttons.length > 0 && (
            <Reveal animationNum={3}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                {buttons.map((button, index) => (
                  <CtaActionButton key={index} button={button} index={index} />
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* Bottom info panel */}
        <Reveal animationNum={4}>
          <div className="relative mt-12 overflow-hidden border border-hairline sm:mt-14 lg:mt-16">
            <div
              className="pointer-events-none absolute inset-0 z-0"
              aria-hidden
              style={{
                background:
                  "linear-gradient(to bottom, var(--cal-canvas) 0%, var(--cal-canvas) 20%, transparent 100%), radial-gradient(ellipse at 50% -10%, var(--cal-brand-accent) 0%, var(--cal-canvas) 100%)",
                opacity: 0.7,
              }}
            >
              <div
                className="dark:hidden"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)",
                  backgroundImage:
                    "repeating-conic-gradient(from 0deg at 50% 0%, var(--cal-brand-accent) 0deg, var(--cal-brand-accent) 2deg, transparent 2deg, transparent 12deg)",
                  height: "100%",
                  left: "50%",
                  opacity: 0.2,
                  pointerEvents: "none",
                  position: "absolute",
                  top: "0",
                  transform: "translateX(-50%)",
                  width: "200%",
                }}
              />
              <div
                className="hidden dark:block"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)",
                  backgroundImage:
                    "repeating-conic-gradient(from 0deg at 50% 0%, var(--cal-brand-accent) 0deg, var(--cal-brand-accent) 2deg, transparent 2deg, transparent 12deg)",
                  height: "100%",
                  left: "50%",
                  opacity: 0.6,
                  pointerEvents: "none",
                  position: "absolute",
                  top: "0",
                  transform: "translateX(-50%)",
                  width: "200%",
                }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-2 md:gap-10 lg:p-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-block h-3 w-3 shrink-0 rounded-sm bg-brand-accent"
                    aria-hidden="true"
                  />
                  <span className="text-caption font-medium uppercase tracking-wider text-muted">
                    {infoBoxHeading}
                  </span>
                </div>

                <div className="text-body-md text-ink sm:text-[17px] sm:leading-7">
                  {subtitle}
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-5">
                <h4 className="text-display-sm text-ink">
                  Why choose Baharnani?
                </h4>

                <ul className="space-y-3 sm:space-y-4">
                  {infoBoxBullets.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-body-md text-muted sm:text-[17px] sm:leading-7"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
};

export default CallToAction;
