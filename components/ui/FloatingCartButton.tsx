"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuShoppingCart, LuTrash } from "@/components/icons";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import {
  candyAccentButtonClasses,
  candyIconButtonClasses,
  candyWhiteButtonClasses,
} from "@/components/ui/candy-button";
import { useQuote } from "@/contexts/QuoteContext";
import { cn } from "@/lib/utilts";
import Image from "next/image";

const FloatingCartButton = () => {
  const { getTotalItems, items, removeFromQuote } = useQuote();
  const totalItems = getTotalItems();
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {totalItems > 0 ? (
        <motion.div
          ref={cartRef}
          initial={{ opacity: 0, scale: 0.85, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-20 right-3 z-220 sm:right-6 lg:right-8"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <NoPrefetchLink
            href="/cart"
            className={cn(
              candyIconButtonClasses(
                "dark",
                "md",
                "relative size-12! rounded-full sm:size-14!",
              ),
            )}
            aria-label="View quote cart"
            aria-expanded={isOpen}
          >
            <LuShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 320 }}
              className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full border-2 border-canvas bg-brand-accent text-[10px] font-semibold tabular-nums text-white sm:-top-1 sm:-right-1 sm:size-6 sm:text-[11px]"
            >
              {totalItems > 9 ? "9+" : totalItems}
            </motion.span>
          </NoPrefetchLink>

          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[calc(100%+0.75rem)] right-0 z-221 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-hairline bg-canvas shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              >
                <span
                  aria-hidden
                  className="absolute -top-1.5 right-5 size-3 rotate-45 border-l border-t border-hairline bg-canvas"
                />

                <div className="border-b border-hairline px-4 py-3">
                  <p className="text-sm font-semibold text-ink">Quote cart</p>
                  <p className="text-xs text-muted">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </p>
                </div>

                {items.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-muted">No products in the cart.</p>
                  </div>
                ) : (
                  <>
                    <div className="cal-scrollbar max-h-72 overflow-y-auto overscroll-contain px-2 py-1 sm:max-h-80 [scrollbar-gutter:stable]">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 border-b border-hairline px-2 py-3 last:border-b-0"
                        >
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-hairline bg-surface-card sm:size-16">
                            <Image
                              width={128}
                              height={128}
                              src={item.image}
                              alt={item.name}
                              className="size-full object-contain p-1.5"
                            />
                          </div>

                          <div className="min-w-0 flex-1 pt-0.5">
                            <p className="line-clamp-2 text-sm font-medium leading-snug text-ink">
                              {item.name}
                            </p>
                            <p className="mt-1 text-xs tabular-nums text-muted">
                              Qty {item.quantity}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeFromQuote(item.id);
                            }}
                            className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted transition-colors hover:border-hairline hover:bg-surface-soft hover:text-red-500"
                            aria-label={`Remove ${item.name}`}
                          >
                            <LuTrash className="size-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 border-t border-hairline p-3">
                      <NoPrefetchLink
                        href="/cart"
                        className={cn(
                          candyWhiteButtonClasses(
                            "h-10 flex-1 px-3! text-xs sm:text-sm",
                          ),
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        View cart
                      </NoPrefetchLink>
                      <NoPrefetchLink
                        href="/request-quotation"
                        className={cn(
                          candyAccentButtonClasses(
                            "h-10 flex-1 px-3! text-xs sm:text-sm",
                          ),
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        Checkout
                      </NoPrefetchLink>
                    </div>
                  </>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default FloatingCartButton;
