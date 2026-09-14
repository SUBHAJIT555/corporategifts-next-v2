"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { LayoutGrid } from "lucide-react";
import { candyContactButtonClasses } from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utilts";
import CustomiseGiftModal from "./CustomiseGiftModal";
import {
  GIFT_FILTERS,
  GIFT_TYPE_CARDS,
  type GiftFilter,
  type GiftTypeCard,
} from "./data";

export default function GiftTypeGrid() {
  const [activeFilter, setActiveFilter] = useState<GiftFilter>("All");
  const [selectedGift, setSelectedGift] = useState<GiftTypeCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleCards = useMemo(() => {
    if (activeFilter === "All") return GIFT_TYPE_CARDS;
    return GIFT_TYPE_CARDS.filter((card) =>
      card.filters.includes(activeFilter),
    );
  }, [activeFilter]);

  const openEnquiry = useCallback((gift: GiftTypeCard) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsModalOpen(false);
    setSelectedGift(null);
  }, []);

  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-8 sm:px-6 sm:py-10 lg:py-12">
        <Reveal
          animationNum={0}
          className="mx-auto mb-6 max-w-4xl text-center sm:mb-8"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <LayoutGrid className="h-3.5 w-3.5 text-brand-accent" />
            Gift types
          </span>
          <h2 className="mt-4 text-display-md text-ink">
            Popular Personalised Gift Types
          </h2>
          <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
            Browse ready starting points for employees, clients, executives and
            events — then get each combination customised to your brand.
          </p>
        </Reveal>

        <Reveal animationNum={1} className="mb-6 sm:mb-8">
          <div
            className="flex flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label="Filter gift types"
          >
            {GIFT_FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-caption font-medium transition-colors sm:text-sm",
                    isActive
                      ? "border-brand-accent bg-brand-accent text-white"
                      : "border-dashed border-hairline bg-surface-card text-body hover:border-brand-accent/40 hover:text-ink",
                  )}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visibleCards.map((card, index) => (
            <Reveal
              key={card.id}
              animationNum={2 + (index % 8)}
              as="article"
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-canvas transition-colors duration-300"
            >
              <div className="relative aspect-square w-full overflow-hidden border-b border-hairline bg-surface-card">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-ink sm:min-h-11 sm:text-[15px]">
                  {card.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
                  {card.benefit}
                </p>
                <button
                  type="button"
                  onClick={() => openEnquiry(card)}
                  className={cn(
                    candyContactButtonClasses(
                      "mt-3 h-10 w-full px-3 text-xs sm:text-sm",
                    ),
                    "text-center",
                  )}
                >
                  <span className="sm:hidden">Get This</span>
                  <span className="hidden sm:inline">Get This Customised</span>
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </RevealSection>

      <CustomiseGiftModal
        gift={selectedGift}
        isOpen={isModalOpen}
        onClose={closeEnquiry}
      />
    </section>
  );
}
