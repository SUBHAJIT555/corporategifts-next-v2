"use client";

import { memo, useCallback, useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utilts";
import type { FAQItem } from "@/components/common/FAQ";

type PremiumGiftSetsFAQProps = {
  title: string;
  subtitle: string;
  faqData: FAQItem[];
};

const FAQAccordionItem = memo(function FAQAccordionItem({
  faq,
  isOpen,
  isLast,
  onToggle,
}: {
  faq: FAQItem;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(!isLast && "border-b border-hairline")}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left transition-colors hover:text-brand-accent sm:py-5"
        aria-expanded={isOpen}
      >
        <span className="flex-1 text-base font-semibold leading-snug text-ink sm:text-[17px]">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted transition-transform duration-300",
            isOpen && "rotate-180 text-brand-accent",
          )}
          strokeWidth={2.25}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-body-md text-muted sm:pb-5">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
});

export default function PremiumGiftSetsFAQ({
  title,
  subtitle,
  faqData,
}: PremiumGiftSetsFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        <Reveal
          animationNum={0}
          className="mx-auto mb-2 max-w-4xl text-center sm:mb-3"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <MessageCircleQuestion className="h-3.5 w-3.5 text-brand-accent" />
            FAQ
          </span>

          <h2 className="mt-4 text-display-md text-ink">{title}</h2>

          <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
            {subtitle}
          </p>
        </Reveal>

        <Reveal animationNum={1} className="mx-auto max-w-4xl">
          <div>
            {faqData.map((faq, index) => (
              <FAQAccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openIndex === index}
                isLast={index === faqData.length - 1}
                onToggle={() => toggleAccordion(index)}
              />
            ))}
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
}
