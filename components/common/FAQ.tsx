"use client";
import { memo, useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import useInView from "@/hooks/useInView";
import Image from "next/image";

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
    index: number;
    isOpen: boolean;
    isLast: boolean;
    contentInView: boolean;
    onToggle: (index: number) => void;
}

const FAQAccordionItem = memo(function FAQAccordionItem({
    faq,
    index,
    isOpen,
    isLast,
    contentInView,
    onToggle,
}: FAQAccordionItemProps) {
    return (
        <div
            className={`transition-all duration-500 ${!isLast ? "border-b border-neutral-300" : ""} ${
                contentInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: `${400 + index * 100}ms` }}
        >
            <button
                type="button"
                onClick={() => onToggle(index)}
                className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors duration-300 hover:text-[#0F5C85]"
            >
                <span className="text-base sm:text-lg md:text-xl font-sentient font-medium text-textcolor flex-1">
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
                    <p className="text-sm sm:text-base md:text-lg font-switzer text-textcolor/90 leading-relaxed">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.faq === nextProps.faq &&
        prevProps.index === nextProps.index &&
        prevProps.isOpen === nextProps.isOpen &&
        prevProps.isLast === nextProps.isLast &&
        prevProps.contentInView === nextProps.contentInView &&
        prevProps.onToggle === nextProps.onToggle
    );
});

interface FAQAccordionListProps {
    faqData: FAQItem[];
    contentInView: boolean;
}

const FAQAccordionList = memo(function FAQAccordionList({
    faqData,
    contentInView,
}: FAQAccordionListProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = useCallback((index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    }, []);

    return (
        <div
            className={`w-full lg:w-1/2 xl:w-3/5 flex flex-col transition-all duration-700 ${
                contentInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
            }`}
        >
            {faqData.map((faq, index) => (
                <FAQAccordionItem
                    key={faq.id}
                    faq={faq}
                    index={index}
                    isOpen={openIndex === index}
                    isLast={index === faqData.length - 1}
                    contentInView={contentInView}
                    onToggle={toggleAccordion}
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
    const { ref: headingRef, inView: headingInView } =
        useInView<HTMLDivElement>({ rootMargin: "-50px" });

    const { ref: contentRef, inView: contentInView } =
        useInView<HTMLDivElement>({ rootMargin: "-100px" });

    return (
        <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-12 overflow-x-hidden">
            <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">

                {/* Heading */}
                <div
                    ref={headingRef}
                    className={`mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center transition-all duration-700 ${headingInView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                        }`}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                        {title}
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-switzer tracking-widest sm:tracking-[0.2em] md:tracking-[0.3em] text-textcolor font-medium">
                        {subtitle}
                    </p>
                </div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className={`transition-opacity duration-700 ${contentInView ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-start">

                        {/* Image */}
                        <div
                            className={`w-full lg:w-1/2 xl:w-2/5 shrink-0 transition-all duration-700 ${contentInView
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                                }`}
                        >
                            <div className="relative overflow-hidden rounded-xl group border border-neutral-300 ring ring-neutral-300 ring-offset-4 md:ring-offset-6">
                                <Image
                                    width={150}
                                    height={150}
                                    src={imageUrl}
                                    alt="FAQ"
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-textcolor/10 pointer-events-none" />
                            </div>
                        </div>

                        <FAQAccordionList
                            faqData={faqData}
                            contentInView={contentInView}
                        />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
