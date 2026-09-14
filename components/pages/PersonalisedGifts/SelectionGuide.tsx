"use client";

import { Compass } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { candyContactButtonClasses } from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utilts";
import { CONTACT_QUOTE_HREF, SELECTION_INTENTS } from "./data";

export default function SelectionGuide() {
  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-8 sm:px-6 sm:py-10 lg:py-12">
        <Reveal
          animationNum={0}
          className="mx-auto mb-6 max-w-4xl text-center sm:mb-8"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <Compass className="h-3.5 w-3.5 text-brand-accent" />
            Quick guide
          </span>
          <h2 className="mt-4 text-display-md text-ink">Quick Selection Guide</h2>
          <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
            Choose by intent. When the brief is clear, customized gifts Dubai
            companies order at scale become much easier to compare and execute.
          </p>
        </Reveal>

        <div className="mb-8 grid grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-2 sm:gap-4">
          {SELECTION_INTENTS.map((intent, index) => (
            <Reveal
              key={intent.title}
              animationNum={1 + index}
              as="article"
              className="rounded-xl border border-hairline bg-canvas p-5 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-ink">{intent.title}</h3>
              <p className="mt-2 text-body-md text-muted">{intent.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal animationNum={5} className="mx-auto max-w-3xl text-center">
          <p className="text-body-md text-muted sm:text-[17px] sm:leading-7">
            Explore related collections:{" "}
            <NoPrefetchLink
              href="/product-category/premium-gift-sets"
              className="font-medium text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:decoration-brand-accent"
            >
              premium gift sets
            </NoPrefetchLink>
            ,{" "}
            <NoPrefetchLink
              href="/product-category/luxury-corporate-gifts-dubai"
              className="font-medium text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:decoration-brand-accent"
            >
              luxury corporate gifts
            </NoPrefetchLink>
            , and{" "}
            <NoPrefetchLink
              href="/products"
              className="font-medium text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:decoration-brand-accent"
            >
              all products
            </NoPrefetchLink>
            .
          </p>
          <NoPrefetchLink
            href={CONTACT_QUOTE_HREF}
            className={cn(
              candyContactButtonClasses("mt-6 w-full sm:w-auto"),
              "inline-flex text-center",
            )}
          >
            Get Help Choosing
          </NoPrefetchLink>
        </Reveal>
      </RevealSection>
    </section>
  );
}
