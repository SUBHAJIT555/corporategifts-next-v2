"use client";

import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useQuote } from "@/contexts/QuoteContext";
import Loading from "@/components/ui/Loading";
import { LuArrowLeft, LuArrowRight, LuTrash, HiPlus, HiMinus } from "@/components/icons";
import { submitQuote } from "@/services/api";
import type { QuoteRequestPayload } from "@/services/api";
import { cn } from "@/lib/utilts";
import { getProductUrl } from "@/lib/getProductsUrl";

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
  "w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white ring ring-neutral-200 ring-offset-2 md:ring-offset-3",
  "font-switzer text-textcolor placeholder:text-textcolor/40",
  "focus:outline-none focus:ring-2 focus:ring-highlight/40 focus:border-highlight transition-colors",
);

const labelClassName =
  "block text-sm sm:text-base font-sentient font-semibold text-textcolor mb-2";

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

  // useEffect(() => {
  //   if (items.length === 0) {
  //     router.replace("/cart");
  //   }
  // }, [items.length, router]);

  // if (items.length === 0) {
  //   return null;
  // }

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

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen ">
      <section className="border-b border-neutral-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sentient font-light text-textcolor leading-tight mb-2">
            <span className="block">Request a</span>
            <span
              className="block mt-0.5 bg-clip-text text-transparent font-sentient animate-hero-gradient-shift"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #A8DDF0, #0F5C85, #A8DDF0)",
                backgroundSize: "200% auto",
              }}
            >
              Quote
            </span>
          </h1>
          <p className="text-base sm:text-lg font-switzer text-textcolor/80 max-w-2xl">
            Confirm your line items and share your details - we&apos;ll follow up
            with pricing and next steps.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 lg:items-start">
          {/* Quoted items — sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-sm ring-1 ring-neutral-200/70 ring-offset-4 lg:sticky lg:top-28">
              <h2 className="text-xl sm:text-2xl font-sentient font-semibold text-textcolor mb-1">
                Quoted items ({items.length})
              </h2>
              <p className="text-sm font-switzer text-textcolor/65 mb-5">
                {totalItems} total units
              </p>
              <div className="space-y-4 max-h-[min(600px,70vh)] overflow-y-auto overscroll-contain pr-1 -mr-1">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-300/90 transition-colors"
                    >
                      <div className="flex gap-3">
                        <NoPrefetchLink
                          href={getProductUrl(item)}
                          className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-neutral-100 ring-1 ring-neutral-200"
                        >
                          <Image
                            width={160}
                            height={160}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </NoPrefetchLink>
                        <div className="flex-1 min-w-0">
                          <NoPrefetchLink
                            href={getProductUrl(item)}
                            className="font-switzer font-semibold text-textcolor text-sm sm:text-base line-clamp-2 hover:text-highlight transition-colors"
                          >
                            {item.name}
                          </NoPrefetchLink>
                          {/* {item.short_desc && (
                            <p className="text-xs font-switzer text-textcolor/60 mt-1 line-clamp-2">
                              {item.short_desc}
                            </p>
                          )} */}
                          <div className="mt-2 inline-flex items-center rounded-lg border border-neutral-200 bg-white overflow-hidden ring-1 ring-neutral-200/50 select-none">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-textcolor hover:bg-neutral-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <HiMinus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            <span className="min-w-8 px-1.5 text-center font-switzer text-xs sm:text-sm font-medium text-textcolor border-x border-neutral-200">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-textcolor hover:bg-neutral-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <HiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromQuote(item.id)}
                          className="self-start p-1.5 rounded-lg text-textcolor/50 hover:text-white hover:bg-red-600 transition-colors shrink-0 ring-1 ring-neutral-200/60 ring-offset-2 bg-red-50 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <LuTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-sm p-5 sm:p-8 shadow-sm ring-1 ring-neutral-200/70 ring-offset-4"
            >
              <h2 className="text-xl sm:text-2xl font-sentient font-semibold text-textcolor mb-2">
                Contact &amp; delivery
              </h2>
              <p className="text-sm font-switzer text-textcolor/65 mb-6 sm:mb-8">
                Fields marked <span className="text-secondary">*</span> are
                required.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6">
                <div>
                  <label htmlFor="first_name" className={labelClassName}>
                    First name <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    className={inputClassName}
                  />
                  {errors.first_name && (
                    <p className="text-sm text-secondary mt-1.5 font-switzer">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="last_name" className={labelClassName}>
                    Last name <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    className={inputClassName}
                  />
                  {errors.last_name && (
                    <p className="text-sm text-secondary mt-1.5 font-switzer">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClassName}>
                    Email <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={inputClassName}
                  />
                  {errors.email && (
                    <p className="text-sm text-secondary mt-1.5 font-switzer">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={labelClassName}>
                    Phone <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    className={inputClassName}
                  />
                  {errors.phone && (
                    <p className="text-sm text-secondary mt-1.5 font-switzer">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address_1" className={labelClassName}>
                    Address <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    id="address_1"
                    {...register("address_1", {
                      required: "Address is required",
                    })}
                    className={inputClassName}
                  />
                  {errors.address_1 && (
                    <p className="text-sm text-secondary mt-1.5 font-switzer">
                      {errors.address_1.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className={labelClassName}>
                    City <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register("city", {
                      required: "City is required",
                    })}
                    className={inputClassName}
                  />
                  {errors.city && (
                    <p className="text-sm text-secondary mt-1.5 font-switzer">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="note" className={labelClassName}>
                  Additional notes
                </label>
                <textarea
                  id="note"
                  {...register("note")}
                  rows={4}
                  placeholder="Branding, deadlines, packaging, or other requirements…"
                  className={cn(inputClassName, "resize-none min-h-[120px]")}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className={cn(
                    "flex-1 sm:flex-none inline-flex items-center justify-center gap-2",
                    "bg-highlight hover:bg-highlight/90 text-white font-switzer font-semibold",
                    "py-3.5 px-8 rounded-xl transition-colors shadow-sm",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loading size="sm" />
                      <span>Submitting…</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Request Your Quote
                      </span>
                      <LuArrowRight className="w-5 h-5 shrink-0" />
                    </>
                  )}
                </button>
                <NoPrefetchLink
                  href="/shop"
                  className={cn(
                    "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl font-switzer font-semibold transition-colors",
                    "border border-neutral-300 bg-white text-textcolor hover:bg-neutral-50",
                    "ring-1 ring-neutral-200 ring-offset-2 ring-offset-bg",
                  )}
                >
                  <LuArrowLeft className="w-5 h-5 shrink-0" />
                  Back To Shop
                </NoPrefetchLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteClient;
