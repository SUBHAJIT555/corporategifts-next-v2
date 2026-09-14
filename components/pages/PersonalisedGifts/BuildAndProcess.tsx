"use client";

import { ListOrdered } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import {
  candyContactButtonClasses,
  candyWhatsAppButtonClasses,
} from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utilts";
import {
  BUILD_STEPS,
  CONTACT_QUOTE_HREF,
  PROCESS_STEPS,
  WHATSAPP_PAGE_MESSAGE,
} from "./data";

export default function BuildAndProcess() {
  const whatsappHref = getWhatsAppUrl(WHATSAPP_PAGE_MESSAGE);

  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-8 sm:px-6 sm:py-10 lg:py-12">
        <Reveal
          animationNum={0}
          className="mx-auto mb-6 max-w-4xl text-center sm:mb-8"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <ListOrdered className="h-3.5 w-3.5 text-brand-accent" />
            How it works
          </span>
          <h2 className="mt-4 text-display-md text-ink">
            How Our Personalised Corporate Gifting Process Works
          </h2>
          <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
            A custom gift set is easiest to execute when the brief is clear.
            Start with the recipient, occasion, quantity, per-person budget and
            required delivery date — then shortlist, brand, present and approve
            before bulk production.
          </p>
        </Reveal>

        {/* <Reveal animationNum={1} className="mb-8 sm:mb-10">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-4 sm:p-5">
            <p className="mb-4 text-caption font-medium uppercase tracking-[0.14em] text-muted">
              Build your set in 5 steps
            </p>
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-2">
              {BUILD_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="rounded-xl border border-hairline bg-canvas px-3 py-3 sm:px-3.5 sm:py-4"
                >
                  <span className="mb-2 block text-caption font-semibold text-brand-accent">
                    {item.step}
                  </span>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal> */}

        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-0">
            {PROCESS_STEPS.map((item, index) => (
              <Reveal
                key={item.step}
                animationNum={2 + index}
                as="li"
                className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5"
              >
                {index < PROCESS_STEPS.length - 1 ? (
                  <span
                    className="absolute top-10 bottom-0 left-[17px] w-px bg-hairline sm:left-[19px]"
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-brand-accent/10 text-sm font-semibold text-brand-accent sm:h-10 sm:w-10">
                  {item.step}
                </span>
                <div className="min-w-0 flex-1 rounded-xl border border-hairline bg-canvas p-4 sm:p-5">
                  <h3 className="text-lg font-semibold leading-snug text-ink sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-body-md text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal
          animationNum={2 + PROCESS_STEPS.length}
          className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:mt-10 sm:flex-row sm:gap-3"
        >
          <NoPrefetchLink
            href={CONTACT_QUOTE_HREF}
            className={cn(
              candyContactButtonClasses("w-full sm:w-auto"),
              "text-center",
            )}
          >
            Start With a Quote Brief
          </NoPrefetchLink>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              candyWhatsAppButtonClasses("w-full sm:w-auto"),
              "text-center",
            )}
          >
            WhatsApp the Brief
          </a>
        </Reveal>
      </RevealSection>
    </section>
  );
}
