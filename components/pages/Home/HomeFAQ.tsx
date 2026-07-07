"use client";

import { memo, useCallback, useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import {
  Reveal,
  RevealSection,
} from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utilts";

const homeFaqData = [
  {
    id: 1,
    question: "What are corporate gifts?",
    answer:
      "Corporate gifts are branded items or tokens given by companies to clients, employees, or partners to express appreciation, build loyalty, and enhance business relationships.",
  },
  {
    id: 2,
    question: "Why are corporate gifts important?",
    answer:
      "Corporate gifts help strengthen partnerships, improve brand visibility, and create a lasting emotional connection with clients and employees.",
  },
  {
    id: 3,
    question:
      "What types of corporate gifts does Baharnani Advertising offer in Dubai?",
    answer:
      "We offer a diverse collection of customized, luxury, promotional, and eco-friendly corporate gifts, including mugs, pens, hampers, gadgets, chocolates, and branded accessories.",
  },
  {
    id: 4,
    question:
      "Can Baharnani Advertising customize corporate gifts with our logo?",
    answer:
      "Yes, we provide full branding and personalization options such as logo engraving, embossing, printing, and packaging customization for all types of gifts.",
  },
  {
    id: 5,
    question:
      "How do I choose the right corporate gift from Baharnani Advertising?",
    answer:
      "Our team will help you select gifts based on your budget, audience, and purpose, ensuring your gift aligns perfectly with your brand image.",
  },
  {
    id: 6,
    question:
      "Are eco-friendly corporate gifts available at Baharnani Advertising?",
    answer:
      "Absolutely. We have a dedicated collection of sustainable gifts like reusable bottles, bamboo kits, jute bags, and organic hampers to promote green gifting.",
  },
  {
    id: 7,
    question:
      "Why should I choose Baharnani Advertising for corporate gifts in Dubai?",
    answer:
      "We combine creativity, premium quality, fast delivery, and customization expertise, making us one of the most trusted corporate gift suppliers in Dubai and UAE.",
  },
  {
    id: 8,
    question: "Do you offer corporate chocolate gifts and festive hampers?",
    answer:
      "Yes, we design corporate chocolate gifts, Festive gift boxes, and festive hampers that can be customized with your logo and brand colors.",
  },
  {
    id: 9,
    question: "Which is the best promotional corporate gifts supplier in Dubai?",
    answer:
      "A good corporate gifts supplier in Dubai should offer product variety, customization options, bulk order support, quality branding, and reliable delivery. Baharnani Advertising helps businesses choose customized, promotional, luxury, smart, and affordable corporate gifts based on budget, audience, and occasion.",
  },
  {
    id: 10,
    question: "Do you offer customized corporate gifts in Dubai with logo printing?",
    answer:
      "Yes, Baharnani provides customized corporate gifts in Dubai with branding options such as logo printing, engraving, embossing, and packaging customization, depending on the selected product.",
  },
  {
    id: 11,
    question: "What are the best smart corporate gifts for employees?",
    answer:
      "Popular smart corporate gifts include wireless chargers, Bluetooth speakers, USB drives, power banks, smart bottles, tech organizers, and laptop accessories. These gifts are practical for employees, clients, and event attendees.",
  },
  {
    id: 12,
    question: "Do you supply promotional gifts for events and exhibitions in Dubai?",
    answer:
      "Yes, we supply promotional gifts in Dubai for corporate events, exhibitions, trade shows, product launches, conferences, and marketing campaigns. Options include pens, notebooks, bags, drinkware, tech accessories, apparel, and branded giveaways.",
  },
  {
    id: 13,
    question: "Can I order affordable corporate gifts in bulk?",
    answer:
      "Yes, businesses can request affordable corporate gifts for bulk orders, including branded stationery, drinkware, bags, apparel, and promotional giveaways. The best option depends on quantity, budget, branding method, and delivery timeline.",
  },
  {
    id: 14,
    question: "Do you offer luxury corporate gifts in Dubai?",
    answer:
      "Yes, Baharnani offers luxury corporate gifts in Dubai, such as premium gift sets, executive hampers, leather accessories, branded drinkware, watches, and high-end business gifts for clients, partners, and senior teams.",
  },
  {
    id: 15,
    question: "What are the most popular corporate gifts in Dubai?",
    answer:
      "Popular corporate gifts in Dubai include branded pens, notebooks, drinkware, laptop bags, power banks, wireless chargers, apparel, eco-friendly gifts, gift hampers, and customized corporate gift sets.",
  },
  {
    id: 16,
    question: "How do I choose the right corporate gift for my company?",
    answer:
      "Choose corporate gifts based on your audience, budget, purpose, quantity, branding style, and occasion. For example, smart corporate gifts work well for employees, luxury gifts work well for premium clients, and affordable promotional gifts work well for events and campaigns.",
  },
];

const title = (
  <>
    <span className="inline-flex flex-wrap items-center justify-center gap-2">
      <span>Frequently</span>
      <span
        className="inline-flex rotate-6 rounded-lg border border-dashed border-hairline bg-surface-card p-0.5 sm:p-1"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-brand-accent sm:h-5 sm:w-5 md:h-6 md:w-6"
          aria-hidden="true"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
          <path d="M12 19l0 .01" />
        </svg>
      </span>
      <span>Asked Questions About</span>
      <span
        className="inline-flex -rotate-6 rounded-lg border border-dashed border-hairline bg-surface-card p-0.5 sm:p-1"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-brand-accent sm:h-5 sm:w-5 md:h-6 md:w-6"
          aria-hidden="true"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 9a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -2" />
          <path d="M12 8l0 13" />
          <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
          <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" />
        </svg>
      </span>
      <span>Corporate Gifts in Dubai & UAE</span>
    </span>
  </>
);

const subtitle =
  "Get answers to common questions about our products and services";

const FAQAccordionItem = memo(function FAQAccordionItem({
  faq,
  isOpen,
  isLast,
  onToggle,
}: {
  faq: (typeof homeFaqData)[number];
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
            isOpen && "rotate-180 text-brand-accent"
          )}
          strokeWidth={2.25}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-body-md text-muted sm:pb-5">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
});

export default function HomeFAQ() {
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
            {homeFaqData.map((faq, index) => (
              <FAQAccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openIndex === index}
                isLast={index === homeFaqData.length - 1}
                onToggle={() => toggleAccordion(index)}
              />
            ))}
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
}
