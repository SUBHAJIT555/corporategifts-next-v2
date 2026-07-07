"use client";

import { memo, useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  faqData: FAQItem[];
  title: React.ReactNode;
  subtitle: string;
  imageUrl?: string;
}

interface FAQAccordionItemProps {
  faq: FAQItem;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
}

const FAQAccordionItem = memo(function FAQAccordionItem({
  faq,
  isOpen,
  isLast,
  onToggle,
}: FAQAccordionItemProps) {
  return (
    <div className={!isLast ? "border-b border-neutral-300" : ""}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-300 hover:text-[#0F5C85] sm:py-5"
      >
        <span className="flex-1 text-base font-sentient font-medium text-textcolor sm:text-lg md:text-xl">
          {faq.question}
        </span>

        <ChevronDown
          size={22}
          strokeWidth={2.5}
          className={`shrink-0 text-[#0F5C85] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-4 sm:pb-5">
          <p className="text-sm font-switzer leading-relaxed text-textcolor/90 sm:text-base md:text-lg">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
});

interface FAQAccordionListProps {
  faqData: FAQItem[];
}

const FAQAccordionList = memo(function FAQAccordionList({
  faqData,
}: FAQAccordionListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="flex w-full flex-col lg:w-1/2 xl:w-3/5">
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
  );
});

const FAQ = ({
  faqData,
  title,
  subtitle,
  imageUrl = "/assets/images/Home-page-image/FAQ-home.webp",
}: FAQProps) => {
  return (
    <section className="w-full overflow-x-hidden py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-12">
      <RevealSection className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <Reveal
          animationNum={0}
          className="mb-8 text-center sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="mb-3 text-2xl font-sentient font-semibold leading-tight text-textcolor sm:mb-4 sm:text-3xl md:mb-5 md:text-4xl lg:mb-6">
            {title}
          </h2>

          <p className="text-xs font-switzer font-medium tracking-widest text-textcolor sm:text-sm md:text-base lg:text-lg xl:text-xl sm:tracking-[0.2em] md:tracking-[0.3em]">
            {subtitle}
          </p>
        </Reveal>

        <div className="flex flex-col items-start gap-6 sm:gap-8 md:gap-10 lg:flex-row lg:gap-12 xl:gap-16">
          <Reveal animationNum={1} className="w-full shrink-0 lg:w-1/2 xl:w-2/5">
            <div className="group relative overflow-hidden rounded-xl border border-neutral-300 ring ring-neutral-300 ring-offset-4 md:ring-offset-6">
              <Image
                width={150}
                height={150}
                src={imageUrl}
                alt="FAQ"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-textcolor/10" />
            </div>
          </Reveal>

          <Reveal animationNum={2} className="w-full lg:w-1/2 xl:w-3/5">
            <FAQAccordionList faqData={faqData} />
          </Reveal>
        </div>
      </RevealSection>
    </section>
  );
};

export default FAQ;
