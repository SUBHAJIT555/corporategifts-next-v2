"use client";

import { FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuote } from "@/contexts/QuoteContext";
import Loading from "@/components/ui/Loading";
import { LuArrowLeft, LuArrowRight, LuTrash } from "@/components/icons";
import { submitQuote } from "@/services/api";
import type { QuoteRequestPayload } from "@/services/api";
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

interface QuoteFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  note: string;
}

const inputClassName = cn(
  "w-full rounded-lg border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink",
  "placeholder:text-muted",
  "transition-colors focus:border-brand-accent/40 focus:outline-none focus:ring-2 focus:ring-brand-accent/20",
);

const labelClassName = "mb-1.5 block text-sm font-medium text-ink";

const EmptyQuoteState = () => (
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
            <FileText className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
            Request quote
          </span>
        </Reveal>

        <Reveal animationNum={1} className="mt-8 flex justify-center sm:mt-10">
          <div className="relative flex size-20 items-center justify-center rounded-full border border-hairline bg-surface-soft sm:size-24">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-accent/10" />
            <FileText className="relative z-10 size-10 text-brand-accent sm:size-12" />
          </div>
        </Reveal>

        <Reveal
          as="h1"
          animationNum={2}
          className="mt-6 text-display-lg text-ink sm:mt-8 md:text-display-xl"
        >
          No items to quote
        </Reveal>

        <Reveal
          as="p"
          animationNum={3}
          className="mx-auto mt-4 max-w-md text-body-md text-muted sm:mt-6 sm:text-[17px] sm:leading-7"
        >
          Add products from the shop first, then return here to request your
          quotation.
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
            href="/cart"
            className={cn(
              candyDarkButtonClasses("w-full sm:w-auto"),
              "inline-flex items-center justify-center gap-2",
            )}
          >
            View cart
          </NoPrefetchLink>
        </Reveal>
      </div>
    </RevealSection>
    <SectionDivider />
  </section>
);

const QuoteHero = ({
  itemCount,
  totalUnits,
}: {
  itemCount: number;
  totalUnits: number;
}) => (
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
            <FileText className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
            Request quote
          </span>
        </Reveal>

        <Reveal
          as="h1"
          animationNum={1}
          className="mt-4 text-display-lg text-ink sm:mt-5 md:text-display-xl"
        >
          Request a{" "}
          <span className="text-brand-accent">quotation</span>
        </Reveal>

        <Reveal
          as="p"
          animationNum={2}
          className="mx-auto mt-4 max-w-2xl text-body-md text-muted sm:mt-6 sm:text-[17px] sm:leading-7"
        >
          Confirm your line items and share your details — we&apos;ll follow up
          with pricing and next steps. {itemCount}{" "}
          {itemCount === 1 ? "product" : "products"} · {totalUnits}{" "}
          {totalUnits === 1 ? "unit" : "units"}.
        </Reveal>
      </div>
    </RevealSection>
  </section>
);

const QuoteClient = () => {
  const { items, removeFromQuote, updateQuantity, clearQuote } = useQuote();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address_1: "",
      city: "",
      note: "",
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    if (items.length === 0) return;

    const payload: QuoteRequestPayload = {
      billing: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        address_1: data.address_1,
        city: data.city,
        country: "AE",
      },
      items: items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      note: data.note || undefined,
    };

    try {
      await submitQuote(payload);
      reset();
      clearQuote();
      router.push("/thank-you");
    } catch (error) {
      console.error("Quote submission error:", error);
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="w-full bg-canvas">
        <EmptyQuoteState />
      </div>
    );
  }

  return (
    <div className="w-full bg-canvas">
      <QuoteHero itemCount={items.length} totalUnits={totalItems} />
      <SectionDivider />

      <section className="w-full bg-canvas">
        <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-6 sm:px-6 sm:py-4 lg:py-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 lg:items-start">
            <aside className="lg:col-span-5 xl:col-span-4">
              <div className="overflow-hidden rounded-2xl border border-hairline bg-canvas lg:sticky lg:top-28">
                <div className="border-b border-hairline px-4 py-4 sm:px-5">
                  <h2 className="text-base font-semibold text-ink sm:text-lg">
                    Quoted items
                  </h2>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    {items.length}{" "}
                    {items.length === 1 ? "product" : "products"} ·{" "}
                    {totalItems} {totalItems === 1 ? "unit" : "units"}
                  </p>
                </div>

                <ol className="divide-y divide-hairline">
                  {items.map((item, index) => (
                    <li key={item.id} className="px-4 py-4 sm:px-5">
                      <div className="mb-3 flex items-start gap-3">
                        <span className="w-7 shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-brand-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <NoPrefetchLink
                          href={getProductUrl(item)}
                          className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-hairline bg-surface-card sm:size-16"
                        >
                          <Image
                            width={128}
                            height={128}
                            src={item.image}
                            alt={item.name}
                            className="size-full object-contain p-1.5"
                          />
                        </NoPrefetchLink>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start gap-2">
                            <NoPrefetchLink
                              href={getProductUrl(item)}
                              className="line-clamp-2 min-w-0 flex-1 text-sm font-medium leading-snug text-ink transition-colors hover:text-brand-accent"
                            >
                              {item.name}
                            </NoPrefetchLink>

                            <button
                              type="button"
                              onClick={() => removeFromQuote(item.id)}
                              className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted transition-colors hover:border-hairline hover:bg-surface-soft hover:text-red-500"
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
              </div>
            </aside>

            <div className="lg:col-span-7 xl:col-span-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-4 sm:p-6"
              >
                <div className="mb-6 border-b border-hairline pb-4">
                  <h2 className="text-base font-semibold text-ink sm:text-lg">
                    Contact &amp; delivery
                  </h2>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    Fields marked{" "}
                    <span className="text-brand-accent">*</span> are required.
                  </p>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <label htmlFor="first_name" className={labelClassName}>
                      First name <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      {...register("first_name", {
                        required: "First name is required",
                      })}
                      className={inputClassName}
                    />
                    {errors.first_name ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.first_name.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="last_name" className={labelClassName}>
                      Last name <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      {...register("last_name", {
                        required: "Last name is required",
                      })}
                      className={inputClassName}
                    />
                    {errors.last_name ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.last_name.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClassName}>
                      Email <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={inputClassName}
                    />
                    {errors.email ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClassName}>
                      Phone <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                      className={inputClassName}
                    />
                    {errors.phone ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.phone.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address_1" className={labelClassName}>
                      Address <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="address_1"
                      {...register("address_1", {
                        required: "Address is required",
                      })}
                      className={inputClassName}
                    />
                    {errors.address_1 ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.address_1.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="city" className={labelClassName}>
                      City <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register("city", {
                        required: "City is required",
                      })}
                      className={inputClassName}
                    />
                    {errors.city ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.city.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="note" className={labelClassName}>
                    Additional notes
                  </label>
                  <textarea
                    id="note"
                    {...register("note")}
                    rows={4}
                    placeholder="Branding, deadlines, packaging, or other requirements…"
                    className={cn(inputClassName, "min-h-[120px] resize-none")}
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-hairline pt-5 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className={cn(
                      candyAccentButtonClasses(
                        "w-full gap-2 text-sm sm:w-auto sm:min-w-[220px]",
                      ),
                      "disabled:cursor-not-allowed disabled:opacity-60",
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loading size="sm" />
                        <span>Submitting…</span>
                      </>
                    ) : (
                      <>
                        <span>Request your quote</span>
                        <LuArrowRight className="size-4 shrink-0" />
                      </>
                    )}
                  </button>
                  <NoPrefetchLink
                    href="/shop"
                    className={cn(
                      candyWhiteButtonClasses(
                        "w-full gap-2 text-sm sm:w-auto",
                      ),
                    )}
                  >
                    <LuArrowLeft className="size-4 shrink-0" />
                    Back to shop
                  </NoPrefetchLink>
                </div>
              </form>
            </div>
          </div>
        </RevealSection>
        <SectionDivider />
      </section>
    </div>
  );
};

export default QuoteClient;
