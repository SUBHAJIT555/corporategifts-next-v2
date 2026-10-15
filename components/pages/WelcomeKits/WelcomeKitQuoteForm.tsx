"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Loading from "@/components/ui/Loading";
import { candyContactButtonClasses } from "@/components/ui/candy-button";
import { FluentFormApi } from "@/lib/api/endpoints";
import type { FluentWelcomeKitFormPayload } from "@/lib/api/types";
import { cn } from "@/lib/utilts";
import { CLOSING, DELIVERY_LOCATIONS, PRODUCT_OPTIONS } from "./data";

type FormValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  quantity: string;
  deliveryDate: string;
  budget: string;
  products: string[];
  productsNote: string;
  comments: string;
  consent: boolean;
  website: string;
};

const inputClassName = cn(
  "w-full rounded-lg bg-canvas px-3.5 py-2.5 text-base text-ink sm:text-sm",
  "placeholder:text-muted",
  "transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/25",
);

const labelClassName = "mb-1.5 block text-sm font-medium text-ink";

export default function WelcomeKitQuoteForm() {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<null | "error">(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmittingApi, setIsSubmittingApi] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      location: "",
      quantity: "",
      deliveryDate: "",
      budget: "",
      products: [],
      productsNote: "",
      comments: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitStatus(null);

    if (data.website) {
      return;
    }

    if (!data.consent) {
      setSubmitStatus("error");
      setStatusMessage("Please acknowledge the privacy notice.");
      return;
    }

    const selectedProducts = data.products ?? [];
    // Fluent Form uses a single dropdown for products; extra selections go to other products.
    const primaryProduct = selectedProducts[0] ?? "";
    const productsNote = [
      ...selectedProducts.slice(1),
      data.productsNote.trim(),
    ]
      .filter(Boolean)
      .join(", ");

    const payload: FluentWelcomeKitFormPayload = {
      data: {
        name: data.name,
        company: data.company,
        phone: data.phone,
        email: data.email,
        location: data.location,
        quantity: String(data.quantity),
        delivery_date: data.deliveryDate,
        budget: data.budget.trim() || undefined,
        products: primaryProduct || undefined,
        products_note: productsNote || undefined,
        comments: data.comments.trim() || undefined,
        consent: "yes",
      },
    };

    try {
      setIsSubmittingApi(true);
      // Sheets sync fires first inside submitWelcomeKitForm (non-blocking), then Fluent Form 8.
      await FluentFormApi.submitWelcomeKitForm(payload);
      router.push("/thank-you");
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmittingApi(false);
    }
  };

  const isBusy = isSubmittingApi || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {submitStatus === "error" ? (
        <div className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
          {statusMessage}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="wk-name" className={labelClassName}>
            Name <span className="text-brand-accent">*</span>
          </label>
          <input
            id="wk-name"
            type="text"
            autoComplete="name"
            {...register("name", { required: "Name is required" })}
            className={cn(inputClassName, errors.name && "ring-2 ring-error/40")}
          />
          {errors.name ? (
            <p className="mt-1.5 text-xs text-error">{errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="wk-company" className={labelClassName}>
            Company name <span className="text-brand-accent">*</span>
          </label>
          <input
            id="wk-company"
            type="text"
            autoComplete="organization"
            {...register("company", { required: "Company name is required" })}
            className={cn(inputClassName, errors.company && "ring-2 ring-error/40")}
          />
          {errors.company ? (
            <p className="mt-1.5 text-xs text-error">
              {errors.company.message}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="wk-phone" className={labelClassName}>
            WhatsApp / phone <span className="text-brand-accent">*</span>
          </label>
          <input
            id="wk-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            {...register("phone", { required: "WhatsApp / phone is required" })}
            className={cn(inputClassName, errors.phone && "ring-2 ring-error/40")}
          />
          {errors.phone ? (
            <p className="mt-1.5 text-xs text-error">{errors.phone.message}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="wk-email" className={labelClassName}>
            Email <span className="text-brand-accent">*</span>
          </label>
          <input
            id="wk-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className={cn(inputClassName, errors.email && "ring-2 ring-error/40")}
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-error">{errors.email.message}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="wk-location" className={labelClassName}>
            Delivery location <span className="text-brand-accent">*</span>
          </label>
          <select
            id="wk-location"
            {...register("location", {
              required: "Delivery location is required",
            })}
            className={cn(inputClassName, errors.location && "ring-2 ring-error/40")}
            defaultValue=""
          >
            <option value="" disabled>
              Select a location
            </option>
            {DELIVERY_LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          {errors.location ? (
            <p className="mt-1.5 text-xs text-error">
              {errors.location.message}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="wk-quantity" className={labelClassName}>
            Quantity <span className="text-brand-accent">*</span>
          </label>
          <input
            id="wk-quantity"
            type="number"
            inputMode="numeric"
            min={1}
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Enter a quantity of at least 1" },
            })}
            className={cn(inputClassName, errors.quantity && "ring-2 ring-error/40")}
          />
          {errors.quantity ? (
            <p className="mt-1.5 text-xs text-error">
              {errors.quantity.message}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="wk-date" className={labelClassName}>
            Required delivery date <span className="text-brand-accent">*</span>
          </label>
          <input
            id="wk-date"
            type="date"
            {...register("deliveryDate", {
              required: "Required delivery date is required",
            })}
            className={cn(
              inputClassName,
              errors.deliveryDate && "ring-2 ring-error/40",
            )}
          />
          {errors.deliveryDate ? (
            <p className="mt-1.5 text-xs text-error">
              {errors.deliveryDate.message}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="wk-budget" className={labelClassName}>
            Budget per kit
          </label>
          <input
            id="wk-budget"
            type="text"
            {...register("budget")}
            className={inputClassName}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelClassName}>Interested products</legend>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {PRODUCT_OPTIONS.map((product) => (
            <label
              key={product}
              className="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-ink"
            >
              <input
                type="checkbox"
                value={product}
                {...register("products")}
                className="size-4 shrink-0 accent-[#2563eb]"
              />
              {product}
            </label>
          ))}
        </div>
        <input
          type="text"
          aria-label="Interested products"
          placeholder="Other products"
          {...register("productsNote")}
          className={cn(inputClassName, "mt-3")}
        />
      </fieldset>

      <div>
        <label htmlFor="wk-comments" className={labelClassName}>
          Comments
        </label>
        <textarea
          id="wk-comments"
          rows={4}
          {...register("comments")}
          className={cn(inputClassName, "min-h-[96px] resize-none")}
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-ink">
        <input
          type="checkbox"
          {...register("consent", {
            required: "Please acknowledge the privacy notice",
          })}
          className="mt-0.5 size-4 accent-[#2563eb]"
        />
        <span>
          I acknowledge the{" "}
          <a
            href="/privacy-policy/"
            className="font-medium text-brand-accent underline-offset-2 hover:underline"
          >
            privacy notice
          </a>
          .
        </span>
      </label>
      {errors.consent ? (
        <p className="text-xs text-error">{errors.consent.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={isBusy}
        className={candyContactButtonClasses(
          "w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto",
        )}
      >
        {isBusy ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loading size="sm" />
            Sending…
          </span>
        ) : (
          CLOSING.quoteCta
        )}
      </button>
    </form>
  );
}
