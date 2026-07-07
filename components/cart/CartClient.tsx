"use client";

import { useRef } from "react";
import { useQuote } from "@/contexts/QuoteContext";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { LuArrowLeft, LuTrash, HiPlus, HiMinus, BsCart4 } from "@/components/icons";
import Image from "next/image";
import { cn } from "@/lib/utilts";
import { getProductUrl } from "@/lib/getProductsUrl";
import { GradientBars } from "@/components/pages/Home/Hero";
import CTAButton from "@/components/ui/CTAButton";

const EmptyCartHero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-20 sm:py-24 pt-28 sm:pt-32 md:pt-36"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 mix-blend-multiply pointer-events-none"
        aria-hidden
      >
        <GradientBars />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-20 w-full max-w-lg text-center"
      >
        <div className="inline-flex items-center gap-2 text-textcolor text-xs sm:text-sm font-sentient mb-5 sm:mb-6 border border-neutral-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-white/85 backdrop-blur-sm ring-1 ring-neutral-300 ring-offset-2 md:ring-offset-4 shadow-sm">
          <BsCart4 className="shrink-0 w-5 h-5 text-[#0F5C85]" aria-hidden />
          <span>Your quote cart is ready for great picks</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient font-semibold text-textcolor mb-2 sm:mb-3 tracking-tight hero-3d-heading px-1">
          Your cart is empty
        </h2>
        <p
          className="text-lg sm:text-xl md:text-2xl font-sentient font-medium mb-2 bg-clip-text text-transparent animate-hero-gradient-shift px-2"
          style={{
            backgroundImage:
              "linear-gradient(to right, #A8DDF0, #0F5C85, #A8DDF0)",
            backgroundSize: "200% auto",
          }}
        >
          Let&apos;s fill it with corporate gifts
        </p>
        <p className="text-sm sm:text-base font-switzer text-neutral-700 max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
          Browse the shop and add products - your selections sync here for a
          single quotation request.
        </p>

        <div className="flex justify-center">
          <NoPrefetchLink href="/shop">
            <CTAButton
              label="Back To Shop"
              variant="light"
              className="w-full sm:w-auto max-w-xs mx-auto text-xs sm:text-sm md:text-base font-sentient font-medium cursor-pointer bg-linear-to-r! from-neutral-100! to-neutral-300! ring-1! ring-neutral-300! ring-offset-2! md:ring-offset-4!"
            />
          </NoPrefetchLink>
        </div>
      </motion.div>
    </section>
  );
};

const CartClient = () => {
  const { items, removeFromQuote, updateQuantity } = useQuote();
  const router = useRouter();

  if (items.length === 0) {
    return <EmptyCartHero />;
  }

  const handleCheckout = () => {
    router.push("/request-quotation");
  };

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen">
      <section className="border-b border-neutral-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sentient font-light text-textcolor leading-tight mb-2">
            <span className="block">Shopping</span>
            <span
              className="block mt-0.5 bg-clip-text text-transparent font-sentient animate-hero-gradient-shift"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #A8DDF0, #0F5C85, #A8DDF0)",
                backgroundSize: "200% auto",
              }}
            >
              Cart
            </span>
          </h1>
          <p className="text-base sm:text-lg font-switzer text-textcolor/80 max-w-xl">
            Review your items and proceed to request a quotation.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 lg:items-start">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-sm ring-1 ring-neutral-200/70 ring-offset-4 ">
              <h2 className="text-xl sm:text-2xl font-sentient font-semibold text-textcolor mb-5">
                Cart items ({items.length})
              </h2>
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-sm hover:border-neutral-300/90 transition-colors"
                    >
                      <div className="flex gap-4">
                        <NoPrefetchLink
                          href={getProductUrl(item)}
                          className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-neutral-100 ring-1 ring-neutral-200"
                        >
                          <Image
                            width={200}
                            height={200}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </NoPrefetchLink>
                        <div className="flex-1 min-w-0">
                          <NoPrefetchLink
                            href={getProductUrl(item)}
                            className="font-switzer font-semibold text-textcolor text-base sm:text-lg line-clamp-2 hover:text-highlight transition-colors"
                          >
                            {item.name}
                          </NoPrefetchLink>
                          {/* {item.short_desc && (
                            <p className="text-sm font-switzer text-textcolor/65 mt-1 line-clamp-2 leading-snug">
                              {item.short_desc}
                            </p>
                          )} */}
                          <div className="mt-3 inline-flex items-center rounded-lg border border-neutral-200 bg-white overflow-hidden ring-1 ring-neutral-200/60 select-none">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-9 h-9 flex items-center justify-center text-textcolor hover:bg-neutral-100 transition-colors disabled:opacity-40"
                              aria-label="Decrease quantity"
                            >
                              <HiMinus className="w-4 h-4" />
                            </button>
                            <span className="min-w-9 px-2 text-center font-switzer text-sm font-medium text-textcolor border-x border-neutral-200">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-9 h-9 flex items-center justify-center text-textcolor hover:bg-neutral-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <HiPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromQuote(item.id)}
                          className="self-start p-2 rounded-lg text-textcolor/50 hover:text-white hover:bg-red-600 transition-colors shrink-0 ring-1 ring-neutral-200/60 ring-offset-2 bg-red-50 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <LuTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-sm ring-1 ring-neutral-200/70 ring-offset-4 lg:sticky lg:top-28">
              <h2 className="text-xl sm:text-2xl font-sentient font-semibold text-textcolor mb-5">
                Order summary
              </h2>
              <div className="space-y-3 mb-6 font-switzer text-textcolor">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-textcolor/75">Unique products</span>
                  <span className="font-medium">{items.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-textcolor/75">Total units</span>
                  <span className="font-medium">{totalItems}</span>
                </div>
              </div>
              <div className="border-t border-neutral-200 pt-5 space-y-4">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-highlight hover:bg-highlight/90 text-white font-switzer font-semibold py-3.5 px-6 rounded-xl transition-colors shadow-sm"
                >
                  Proceed to checkout
                </button>
                <NoPrefetchLink
                  href="/shop"
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-switzer font-semibold transition-colors",
                    "border border-neutral-300 bg-white text-textcolor hover:bg-neutral-50",
                    "ring-1 ring-neutral-200 ring-offset-2 ring-offset-bg",
                  )}
                >
                  <LuArrowLeft className="w-5 h-5 shrink-0" />
                  Continue shopping
                </NoPrefetchLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
