"use client";

import { useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuote } from "@/contexts/QuoteContext";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { useRouter } from "next/navigation";
import { LuArrowLeft, LuTrash } from "@/components/icons";
import Image from "next/image";
import { cn } from "@/lib/utilts";
import { getProductUrl } from "@/lib/getProductsUrl";
import { QuantitySelector } from "@/lib/quantitySelector";
import {
  candyAccentButtonClasses,
  candyDarkButtonClasses,
  candyWhiteButtonClasses,
} from "@/components/ui/candy-button";
import SectionDivider from "@/components/ui/SectionDivider";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

const EmptyCartHero = () => {
  return (
    <section className="w-full bg-canvas">
      <RevealSection className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center border-x border-hairline px-5 py-20 text-center sm:px-6 sm:py-24 md:py-28">
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

        <div className="relative z-10 mx-auto w-full max-w-2xl">
          <Reveal animationNum={0} className="flex justify-center">
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-2.5 py-1 text-[11px] font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] sm:px-3 sm:text-caption dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
              <ShoppingBag className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
              Quote cart
            </span>
          </Reveal>

          <Reveal animationNum={1} className="mt-8 flex justify-center sm:mt-10">
            <div className="relative flex size-20 items-center justify-center rounded-full border border-hairline bg-surface-soft sm:size-24">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-accent/10" />
              <ShoppingBag className="relative z-10 size-10 text-brand-accent sm:size-12" />
            </div>
          </Reveal>

          <Reveal
            as="h1"
            animationNum={2}
            className="mt-6 text-display-lg text-ink sm:mt-8 md:text-display-xl"
          >
            Your cart is empty
          </Reveal>

          <Reveal
            as="p"
            animationNum={3}
            className="mx-auto mt-4 max-w-md text-body-md text-muted sm:mt-6 sm:text-[17px] sm:leading-7"
          >
            Browse the shop and add products. Your selections sync here for a
            single quotation request.
          </Reveal>

          <Reveal
            animationNum={4}
            className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <NoPrefetchLink
              href="/shop"
              className={cn(
                candyWhiteButtonClasses("w-full sm:w-auto"),
                "inline-flex items-center justify-center gap-2",
              )}
            >
              Browse shop
            </NoPrefetchLink>
            <NoPrefetchLink
              href="/products"
              className={cn(
                candyDarkButtonClasses("w-full sm:w-auto"),
                "inline-flex items-center justify-center gap-2",
              )}
            >
              View categories
            </NoPrefetchLink>
          </Reveal>
        </div>
      </RevealSection>
      <SectionDivider />
    </section>
  );
};

const CartHero = ({ itemCount, totalUnits }: { itemCount: number; totalUnits: number }) => {
  return (
    <section className="w-full bg-canvas">
      <RevealSection className="relative mx-auto max-w-7xl overflow-hidden border-x border-hairline px-3 pt-20 pb-8 sm:px-4 sm:pt-24 sm:pb-10 md:px-6 md:pt-32 md:pb-12 lg:pt-36">
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
              <ShoppingBag className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
              Quote cart
            </span>
          </Reveal>

          <Reveal
            as="h1"
            animationNum={1}
            className="mt-4 text-display-lg text-ink sm:mt-5 md:text-display-xl"
          >
            Review your{" "}
            <span className="text-brand-accent">cart</span>
          </Reveal>

          <Reveal
            as="p"
            animationNum={2}
            className="mx-auto mt-4 max-w-2xl text-body-md text-muted sm:mt-6 sm:text-[17px] sm:leading-7"
          >
            {itemCount} {itemCount === 1 ? "product" : "products"} · {totalUnits}{" "}
            {totalUnits === 1 ? "unit" : "units"} ready for quotation
          </Reveal>
        </div>
      </RevealSection>
      
    </section>
    
  );
};

const CartClient = () => {
  const { items, removeFromQuote, updateQuantity } = useQuote();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) {
    return (
      <div className="w-full bg-canvas">
        <EmptyCartHero />
      </div>
    );
  }

  const handleCheckout = () => {
    router.push("/request-quotation");
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="w-full bg-canvas">
      <CartHero itemCount={items.length} totalUnits={totalItems} />
      <SectionDivider />

      <section ref={contentRef} className="w-full bg-canvas">
        <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-6 sm:px-6 sm:py-4 lg:py-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 lg:items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-hairline pb-4">
                  <h2 className="text-base font-semibold text-ink sm:text-lg">
                    Cart items
                  </h2>
                  <span className="text-xs tabular-nums text-muted sm:text-sm">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </span>
                </div>

                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.article
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden rounded-xl border border-hairline bg-canvas"
                      >
                        <div className="flex items-start gap-3 p-4 sm:gap-4">
                          <span className="mt-1 shrink-0 text-xs font-medium tabular-nums text-muted">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <NoPrefetchLink
                            href={getProductUrl(item)}
                            className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-hairline bg-surface-card sm:size-24"
                          >
                            <Image
                              width={200}
                              height={200}
                              src={item.image}
                              alt={item.name}
                              className="size-full object-contain p-2"
                            />
                          </NoPrefetchLink>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start gap-2">
                              <NoPrefetchLink
                                href={getProductUrl(item)}
                                className="line-clamp-2 min-w-0 flex-1 text-sm font-semibold leading-snug text-ink transition-colors hover:text-brand-accent sm:text-[15px]"
                              >
                                {item.name}
                              </NoPrefetchLink>

                              <button
                                type="button"
                                onClick={() => removeFromQuote(item.id)}
                                className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted transition-colors hover:border-hairline hover:bg-surface-soft hover:text-red-500 sm:size-9"
                                aria-label={`Remove ${item.name}`}
                              >
                                <LuTrash className="size-4" />
                              </button>
                            </div>

                            <div className="mt-3 max-w-44">
                              <QuantitySelector
                                quantity={item.quantity}
                                onQuantityChange={(qty) =>
                                  updateQuantity(item.id, qty)
                                }
                                variant="cal"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-5 xl:col-span-4">
              <div className="overflow-hidden rounded-2xl border border-hairline bg-canvas lg:sticky lg:top-28">
                <div className="border-b border-hairline px-4 py-4 sm:px-5">
                  <h2 className="text-base font-semibold text-ink sm:text-lg">
                    Order summary
                  </h2>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    Serial list of products and quantities
                  </p>
                </div>

                <ol className="divide-y divide-hairline">
                  {items.map((item, index) => (
                    <li
                      key={item.id}
                      className="flex items-start gap-3 px-4 py-3 sm:px-5"
                    >
                      <span className="w-7 shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-brand-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm leading-snug text-ink">
                          {item.name}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md border border-hairline bg-surface-soft px-2 py-0.5 text-xs font-medium tabular-nums text-ink">
                        Qty {item.quantity}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="space-y-2 border-t border-hairline px-4 py-4 sm:px-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Unique products</span>
                    <span className="font-medium tabular-nums text-ink">
                      {items.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Total units</span>
                    <span className="font-semibold tabular-nums text-ink">
                      {totalItems}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-hairline p-4 sm:p-5">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className={candyAccentButtonClasses("w-full text-sm")}
                  >
                    Proceed to checkout
                  </button>
                  <NoPrefetchLink
                    href="/shop"
                    className={cn(
                      candyWhiteButtonClasses(
                        "w-full gap-2 text-sm px-4!",
                      ),
                    )}
                  >
                    <LuArrowLeft className="size-4 shrink-0" />
                    Continue shopping
                  </NoPrefetchLink>
                </div>
              </div>
            </aside>
          </div>
        </RevealSection>
        <SectionDivider />
      </section>
    </div>
  );
};

export default CartClient;
