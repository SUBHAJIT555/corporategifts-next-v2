"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { Check, CheckCircle2, ChevronDown, X } from "lucide-react";
import Loading from "@/components/ui/Loading";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { candyContactButtonClasses } from "@/components/ui/candy-button";
import { FluentFormApi } from "@/lib/api/endpoints";
import type { FluentFormPayload } from "@/lib/api/types";
import { cn } from "@/lib/utilts";
import type { GiftTypeCard } from "./data";

const BUDGET_OPTIONS = [
  "Under AED 50",
  "AED 50–100",
  "AED 100–200",
  "AED 200–400",
  "AED 400+",
  "Not sure",
] as const;

const OCCASION_OPTIONS = [
  "Employee",
  "Client",
  "Event",
  "Executive",
  "Other",
] as const;

type FormValues = {
  quantity: number;
  budget: string;
  name: string;
  email: string;
  mobile: string;
  company: string;
  occasion: string;
  deliveryDate: string;
  notes: string;
  website: string;
};

const inputClassName = cn(
  "w-full rounded-xl border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink",
  "placeholder:text-muted",
  "transition-colors focus:border-brand-accent/40 focus:outline-none focus:ring-2 focus:ring-brand-accent/20",
);

const labelClassName = "mb-1.5 block text-sm font-medium text-ink";

type CustomSelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly string[];
  placeholder: string;
  allowEmpty?: boolean;
  emptyLabel?: string;
  hasError?: boolean;
  disabled?: boolean;
};

function CustomSelect({
  id,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  allowEmpty = false,
  emptyLabel = "Optional",
  hasError = false,
  disabled = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listId = `${id}-listbox`;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [open, onBlur]);

  const selectedLabel =
    value || (allowEmpty ? emptyLabel : null) || placeholder;
  const showPlaceholder = !value;

  const selectOption = (next: string) => {
    onChange(next);
    setOpen(false);
    onBlur?.();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          if (disabled) return;
          setOpen((prev) => !prev);
        }}
        className={cn(
          inputClassName,
          "flex items-center justify-between gap-2 text-left",
          showPlaceholder && "text-muted",
          hasError && "border-error/50",
          open && "border-brand-accent/40 ring-2 ring-brand-accent/20",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <span
          className={cn(
            "truncate",
            showPlaceholder
              ? "font-normal text-muted"
              : "font-medium text-ink",
          )}
        >
          {selectedLabel}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180 text-brand-accent",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className={cn(
            "absolute left-0 right-0 z-30 mt-1.5 max-h-60 overflow-y-auto py-1.5",
            "rounded-xl border border-hairline bg-canvas shadow-[0_12px_32px_-8px_rgba(0,0,0,0.2)]",
            "dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.55)]",
          )}
        >
          {allowEmpty ? (
            <li role="option" aria-selected={!value}>
              <button
                type="button"
                onClick={() => selectOption("")}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                  !value
                    ? "bg-brand-accent/10 font-semibold text-brand-accent"
                    : "font-medium text-ink hover:bg-brand-accent/5",
                )}
              >
                <span>{emptyLabel}</span>
                {!value ? (
                  <Check className="h-4 w-4 shrink-0" aria-hidden />
                ) : null}
              </button>
            </li>
          ) : null}
          {options.map((option) => {
            const selected = value === option;
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => selectOption(option)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                    selected
                      ? "bg-brand-accent/10 font-semibold text-brand-accent"
                      : "font-medium text-ink hover:bg-brand-accent/5",
                  )}
                >
                  <span>{option}</span>
                  {selected ? (
                    <Check className="h-4 w-4 shrink-0" aria-hidden />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0] ?? "";
  const last = parts.slice(1).join(" ") || "-";
  return { first, last };
}

function buildBriefMessage(
  gift: GiftTypeCard,
  data: FormValues,
): string {
  const lines = [
    `Personalised Gift Enquiry: ${gift.title}`,
    "",
    `Gift type: ${gift.title}`,
    `Quantity (boxes/sets): ${data.quantity}`,
    `Budget per gift: ${data.budget}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Mobile: ${data.mobile}`,
  ];

  if (data.company.trim()) {
    lines.push(`Company: ${data.company.trim()}`);
  }
  if (data.occasion) {
    lines.push(`Occasion: ${data.occasion}`);
  }
  if (data.deliveryDate) {
    lines.push(`Delivery date: ${data.deliveryDate}`);
  }
  if (data.notes.trim()) {
    lines.push(`Notes: ${data.notes.trim()}`);
  }

  return lines.join("\n");
}

type CustomiseGiftModalProps = {
  gift: GiftTypeCard | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function CustomiseGiftModal({
  gift,
  isOpen,
  onClose,
}: CustomiseGiftModalProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      quantity: 1,
      budget: "",
      name: "",
      email: "",
      mobile: "",
      company: "",
      occasion: "",
      deliveryDate: "",
      notes: "",
      website: "",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<null | "error" | "success">(
    null,
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmittingApi, setIsSubmittingApi] = useState(false);

  const quantityRegister = register("quantity", {
    required: "Quantity is required",
    valueAsNumber: true,
    min: { value: 1, message: "Minimum quantity is 1" },
  });

  useEffect(() => {
    if (!isOpen) return;

    setSubmitStatus(null);
    setStatusMessage("");
    reset({
      quantity: 1,
      budget: "",
      name: "",
      email: "",
      mobile: "",
      company: "",
      occasion: "",
      deliveryDate: "",
      notes: "",
      website: "",
    });

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 0);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, onClose, reset]);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!gift) return;

    setSubmitStatus(null);

    if (data.website) {
      reset();
      return;
    }

    const { first, last } = splitName(data.name);
    const message = buildBriefMessage(gift, data);

    const payload: FluentFormPayload = {
      data: {
        names: {
          first_name: first,
          last_name: last,
        },
        email: data.email,
        phone: data.mobile,
        subject: `Personalised Gift Enquiry: ${gift.title}`,
        message,
      },
    };

    try {
      setIsSubmittingApi(true);
      const response = await FluentFormApi.submitForm3(payload);
      setSubmitStatus("success");
      setStatusMessage(
        response.message ||
          "Thanks — we've received your enquiry and will be in touch shortly.",
      );
      reset({
        quantity: 1,
        budget: "",
        name: "",
        email: "",
        mobile: "",
        company: "",
        occasion: "",
        deliveryDate: "",
        notes: "",
        website: "",
      });
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

  if (!isOpen || !gift) return null;

  return (
    <div
      className="fixed inset-0 z-120 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm sm:p-6"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        ref={dialogRef}
        className={cn(
          "relative flex w-full max-w-lg flex-col overflow-hidden",
          "max-h-[min(92vh,760px)] rounded-2xl border border-hairline bg-canvas",
          "shadow-[0_16px_48px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55)]",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex shrink-0 items-start justify-between gap-3 border-b border-hairline bg-canvas px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-base font-semibold text-ink sm:text-lg"
            >
              Request a custom quote
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Customise this gift — {gift.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted transition-colors hover:border-hairline hover:bg-surface-soft hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </button>
        </div>

        {submitStatus === "success" ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto px-5 py-10 text-center sm:px-6">
            <CheckCircle2
              className="h-10 w-10 text-brand-accent"
              aria-hidden
            />
            <div>
              <p className="text-base font-semibold text-ink">Enquiry sent</p>
              <p className="mt-2 text-sm text-muted">{statusMessage}</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={onClose}
                className={candyContactButtonClasses("w-full sm:w-auto")}
              >
                Close
              </button>
              <NoPrefetchLink
                href={gift.href}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-hairline bg-surface-card px-6 text-sm font-medium text-ink transition-colors hover:bg-surface-soft sm:w-auto"
                onClick={onClose}
              >
                Browse products
              </NoPrefetchLink>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="flex items-center gap-3.5 border-b border-hairline bg-surface-soft px-5 py-3.5 sm:px-6">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-hairline bg-surface-card">
                  <Image
                    src={gift.image}
                    alt={gift.imageAlt}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {gift.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted">
                    {gift.benefit}
                  </p>
                </div>
              </div>

              <div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
                {submitStatus === "error" ? (
                  <div className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
                    {statusMessage}
                  </div>
                ) : null}

                <div>
                  <label htmlFor="giftType" className={labelClassName}>
                    Selected gift type
                  </label>
                  <input
                    type="text"
                    id="giftType"
                    value={gift.title}
                    readOnly
                    className={cn(
                      inputClassName,
                      "cursor-default bg-surface-soft text-muted",
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="quantity" className={labelClassName}>
                      Quantity (boxes/sets){" "}
                      <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min={1}
                      step={1}
                      inputMode="numeric"
                      placeholder="e.g. 50"
                      {...quantityRegister}
                      ref={(node) => {
                        quantityRegister.ref(node);
                        firstFieldRef.current = node;
                      }}
                      className={cn(
                        inputClassName,
                        errors.quantity && "border-error/50",
                      )}
                    />
                    {errors.quantity ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.quantity.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="budget" className={labelClassName}>
                      Budget per gift{" "}
                      <span className="text-brand-accent">*</span>
                    </label>
                    <Controller
                      name="budget"
                      control={control}
                      rules={{ required: "Please select a budget range" }}
                      render={({ field }) => (
                        <CustomSelect
                          id="budget"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          options={BUDGET_OPTIONS}
                          placeholder="Select budget"
                          hasError={Boolean(errors.budget)}
                          disabled={isBusy}
                        />
                      )}
                    />
                    {errors.budget ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.budget.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClassName}>
                      Name <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your name"
                      autoComplete="name"
                      {...register("name", {
                        required: "Name is required",
                      })}
                      className={cn(
                        inputClassName,
                        errors.name && "border-error/50",
                      )}
                    />
                    {errors.name ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.name.message}
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
                      placeholder="you@company.com"
                      autoComplete="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={cn(
                        inputClassName,
                        errors.email && "border-error/50",
                      )}
                    />
                    {errors.email ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="mobile" className={labelClassName}>
                      Mobile <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      placeholder="+971 …"
                      autoComplete="tel"
                      {...register("mobile", {
                        required: "Mobile is required",
                      })}
                      className={cn(
                        inputClassName,
                        errors.mobile && "border-error/50",
                      )}
                    />
                    {errors.mobile ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.mobile.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClassName}>
                      Company name
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Optional"
                      autoComplete="organization"
                      {...register("company")}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="occasion" className={labelClassName}>
                      Occasion
                    </label>
                    <Controller
                      name="occasion"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          id="occasion"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          options={OCCASION_OPTIONS}
                          placeholder="Optional"
                          allowEmpty
                          emptyLabel="Optional"
                          disabled={isBusy}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="deliveryDate" className={labelClassName}>
                      Delivery date
                    </label>
                    <input
                      type="date"
                      id="deliveryDate"
                      {...register("deliveryDate")}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className={labelClassName}>
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Branding, packaging, or anything else we should know…"
                    {...register("notes")}
                    className={cn(inputClassName, "min-h-22 resize-none")}
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
              </div>
            </div>

            <div className="sticky bottom-0 z-20 shrink-0 border-t border-hairline bg-canvas px-5 py-4 sm:px-6">
              <button
                type="submit"
                disabled={isBusy}
                className={cn(
                  candyContactButtonClasses("w-full"),
                  "disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {isBusy ? (
                  <>
                    <Loading size="sm" />
                    <span>Sending…</span>
                  </>
                ) : (
                  "Request quote"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
