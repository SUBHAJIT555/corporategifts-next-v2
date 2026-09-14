"use client";

import { Sparkles } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import {
  candyContactButtonClasses,
} from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utilts";
import { CONTACT_QUOTE_HREF } from "./data";

export default function AffordableGiftsCopy() {
  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-8 sm:px-6 sm:py-6 lg:py-6">
        <Reveal animationNum={0} className="mx-auto ">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-5 sm:p-7 md:p-8">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body">
              <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
              Budget-friendly
            </span>
            <h2 className="mb-4 text-display-sm text-ink sm:text-display-md">
              Affordable Personalized Business Gifts Without Looking Cheap
            </h2>
            <div className="space-y-4 text-body-md text-body sm:text-[17px] sm:leading-7">
              <p>
                Affordable personalized business gifts work best when you simplify
                the combination and spend on the parts the recipient notices most:
                product usefulness, clean branding and presentation. A
                notebook-and-pen combination, reusable bottle with a message card,
                compact technology accessory, or simple custom gift set can look
                polished without pushing the campaign into an executive budget.
              </p>
              <p>
                For bulk orders, standardise the base kit and personalise only the
                elements that matter most. For example, keep the same box and core
                products across the campaign, then vary a name card, sleeve,
                engraving or recipient message. This approach can make personalised
                corporate gifts more scalable while retaining a personal touch.
              </p>
            </div>
            <NoPrefetchLink
              href={CONTACT_QUOTE_HREF}
              className={cn(
                candyContactButtonClasses("mt-6 w-full sm:w-auto"),
                "text-center",
              )}
            >
              Request a Budget Quote
            </NoPrefetchLink>
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
}
