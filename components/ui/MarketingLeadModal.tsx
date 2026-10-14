"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, X } from "lucide-react";
import Loading from "@/components/ui/Loading";
import { candyContactButtonClasses } from "@/components/ui/candy-button";
import { FluentFormApi } from "@/lib/api/endpoints";
import type { FluentLeadFormPayload } from "@/lib/api/types";
import { cn } from "@/lib/utilts";

const SESSION_KEY = "marketing-lead-modal-dismissed";
const SHOW_DELAY_MS = 5500;

type FormValues = {
  name: string;
  email: string;
  company: string;
  mobile: string;
  requirement: string;
  website: string;
};

const inputClassName = cn(
  "w-full rounded-xl border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink",
  "placeholder:text-muted",
  "transition-colors focus:border-brand-accent/40 focus:outline-none focus:ring-2 focus:ring-brand-accent/20",
);

const labelClassName = "mb-1.5 block text-sm font-medium text-ink";

function wasDismissedThisSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissedThisSession(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Ignore storage errors (private mode, etc.)
  }
}

export default function MarketingLeadModal() {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "error" | "success">(
    null,
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmittingApi, setIsSubmittingApi] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      mobile: "",
      requirement: "",
      website: "",
    },
  });

  const closeModal = () => {
    markDismissedThisSession();
    setIsOpen(false);
  };

  useEffect(() => {
    if (wasDismissedThisSession()) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setSubmitStatus(null);
    setStatusMessage("");
    reset({
      name: "",
      email: "",
      company: "",
      mobile: "",
      requirement: "",
      website: "",
    });

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
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, reset]);

  const onSubmit = async (data: FormValues) => {
    setSubmitStatus(null);

    if (data.website) {
      markDismissedThisSession();
      setIsOpen(false);
      return;
    }

    const payload: FluentLeadFormPayload = {
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.mobile,
        requirement: data.requirement,
      },
    };

    try {
      setIsSubmittingApi(true);

      // Sheets sync fires first inside submitLeadForm (non-blocking), then Fluent Form 7.
      const response = await FluentFormApi.submitLeadForm(payload);

      setSubmitStatus("success");
      setStatusMessage(
        response.message ||
          "Thanks — we've received your enquiry and will be in touch shortly.",
      );
      markDismissedThisSession();
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
  const nameRegister = register("name", { required: "Name is required" });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-120 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className={cn(
          "relative flex w-full max-w-lg flex-col overflow-hidden",
          "max-h-[min(92vh,760px)] rounded-2xl border border-hairline bg-canvas",
          "shadow-[0_16px_48px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55)]",
        )}
      >
        <div className="sticky top-0 z-20 flex shrink-0 items-start justify-between gap-3 border-b border-hairline bg-canvas px-5 py-4 sm:px-6">
          <div className="min-w-0 pr-2">
            <h2
              id={titleId}
              className="text-base font-semibold leading-snug text-ink sm:text-lg"
            >
              Get Bulk Custom-Personalized Corporate Gifts. Orders Fulfilled in
              48 Hours. Connect Now!
            </h2>
          </div>
          <button
            type="button"
            onClick={closeModal}
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
            <button
              type="button"
              onClick={closeModal}
              className={candyContactButtonClasses("w-full sm:w-auto")}
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              {submitStatus === "error" ? (
                <div className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
                  {statusMessage}
                </div>
              ) : null}

              <div>
                <label htmlFor="lead-name" className={labelClassName}>
                  Name <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  id="lead-name"
                  placeholder="Enter your name"
                  autoComplete="name"
                  {...nameRegister}
                  ref={(el) => {
                    nameRegister.ref(el);
                    firstFieldRef.current = el;
                  }}
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
                <label htmlFor="lead-email" className={labelClassName}>
                  Email Address <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="email"
                  id="lead-email"
                  placeholder="Enter your email"
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

              <div>
                <label htmlFor="lead-company" className={labelClassName}>
                  Company Name <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  id="lead-company"
                  placeholder="Enter your company name"
                  autoComplete="organization"
                  {...register("company", {
                    required: "Company name is required",
                  })}
                  className={cn(
                    inputClassName,
                    errors.company && "border-error/50",
                  )}
                />
                {errors.company ? (
                  <p className="mt-1.5 text-xs text-error">
                    {errors.company.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="lead-mobile" className={labelClassName}>
                  Mobile Number <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="tel"
                  id="lead-mobile"
                  placeholder="Enter your mobile number"
                  autoComplete="tel"
                  {...register("mobile", {
                    required: "Mobile number is required",
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
                <label htmlFor="lead-requirement" className={labelClassName}>
                  Requirement <span className="text-brand-accent">*</span>
                </label>
                <textarea
                  id="lead-requirement"
                  rows={4}
                  placeholder="Tell us about your gifting requirement…"
                  {...register("requirement", {
                    required: "Requirement is required",
                  })}
                  className={cn(
                    inputClassName,
                    "min-h-[100px] resize-none",
                    errors.requirement && "border-error/50",
                  )}
                />
                {errors.requirement ? (
                  <p className="mt-1.5 text-xs text-error">
                    {errors.requirement.message}
                  </p>
                ) : null}
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

            <div className="shrink-0 border-t border-hairline bg-canvas px-5 py-4 sm:px-6">
              <button
                type="submit"
                disabled={isBusy}
                className={candyContactButtonClasses(
                  "w-full disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {isBusy ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loading size="sm" />
                    Sending…
                  </span>
                ) : (
                  "Connect Now"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
