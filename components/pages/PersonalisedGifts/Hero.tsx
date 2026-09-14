"use client";

import { Gift } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import {
  candyContactButtonClasses,
  candyWhatsAppButtonClasses,
} from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { CONTACT_QUOTE_HREF, WHATSAPP_PAGE_MESSAGE } from "./data";

const HERO_TRUST = [
  "Logo branding",
  "Name personalisation",
  "Premium packaging",
  "Bulk-order support",
] as const;

export default function PersonalisedGiftsHero() {
  const whatsappHref = getWhatsAppUrl(WHATSAPP_PAGE_MESSAGE);

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
              <Gift className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
              Personalised gifting across Dubai &amp; the UAE
            </span>
          </Reveal>

          <Reveal
            as="h1"
            animationNum={1}
            className="mt-4 text-display-lg text-ink sm:mt-5 md:text-display-xl"
          >
            Personalised Corporate Gifts &amp;{" "}
            <span className="text-brand-accent">Custom Gift Boxes</span> in Dubai
          </Reveal>

          <Reveal
            as="p"
            animationNum={2}
            className="mx-auto mt-4 max-w-3xl text-body-md text-muted sm:mt-6 sm:text-[17px] sm:leading-7"
          >
            Make business gifting feel intentional, useful and unmistakably
            yours. Baharnani Advertising helps companies create personalised
            corporate gifts for clients, employees, executives, events and brand
            campaigns — with product selection, logo branding, name
            personalisation, packaging and bulk-order support.
          </Reveal>

          <Reveal
            animationNum={3}
            className="mt-5 flex w-full flex-col gap-2.5 sm:mt-7 sm:flex-row sm:items-center sm:justify-center sm:gap-3"
          >
            <NoPrefetchLink
              href={CONTACT_QUOTE_HREF}
              className={candyContactButtonClasses("w-full sm:w-auto")}
            >
              Request a Custom Gift Quote
            </NoPrefetchLink>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={candyWhatsAppButtonClasses("w-full sm:w-auto")}
            >
              WhatsApp Gift Ideas
            </a>
          </Reveal>

          <Reveal animationNum={4} className="mt-8 sm:mt-10">
            <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3">
              {HERO_TRUST.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-dashed border-hairline bg-surface-card px-2.5 py-1 text-[11px] font-medium text-body sm:text-caption"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </RevealSection>
    </section>
  );
}
