import React from "react";
import { cn } from "@/lib/utilts";

export type CandyButtonVariant = "dark" | "white" | "accent" | "whatsapp";

/**
 * Primary CTA styling — vertical gradient, inset highlight, inset ring + offset.
 * Colors are fixed (not theme `primary`) so dark mode does not wash out to white.
 */
const DARK_SURFACE = cn(
  "bg-linear-to-b from-[#3f3f3f] to-[#111111] text-white",
  "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset]",
  "hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset]",
  "ring ring-white/20 ring-inset ring-offset-2 ring-offset-[#111111]",
  "hover:ring-white/40"
);

/** Secondary / outline-style surface — light dome with matching ring treatment. */
const LIGHT_SURFACE = cn(
  "bg-linear-to-b from-white to-[#e5e5e5] text-[#111111]",
  "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.9)_inset]",
  "hover:shadow-[0px_0px_16px_0px_rgba(255,255,255,1)_inset]",
  "ring ring-black/10 ring-inset ring-offset-2 ring-offset-white",
  "hover:ring-black/20",
  "dark:from-[#f5f5f5] dark:to-[#d4d4d4] dark:text-[#111111]",
  "dark:ring-white/25 dark:ring-offset-[#e5e5e5] dark:hover:ring-white/40"
);

/** Brand accent surface — blue (Contact CTAs). */
const ACCENT_SURFACE = cn(
  "bg-linear-to-b from-[#60a5fa] to-[#2563eb] text-white",
  "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.25)_inset]",
  "hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset]",
  "ring ring-white/25 ring-inset ring-offset-2 ring-offset-[#2563eb]",
  "hover:ring-white/45"
);

/** WhatsApp green surface. */
const WHATSAPP_SURFACE = cn(
  "bg-linear-to-b from-[#4ADE80] to-[#16A34A] text-white",
  "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.25)_inset]",
  "hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset]",
  "ring ring-white/25 ring-inset ring-offset-2 ring-offset-[#16A34A]",
  "hover:ring-white/45"
);

const CANDY_BUTTON_BASE = cn(
  "relative inline-flex cursor-pointer items-center justify-center gap-2 select-none",
  "font-display font-semibold",
  "rounded-md transition-all duration-200",
  "active:scale-[0.98]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/30",
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
);

const SURFACE_BY_VARIANT: Record<CandyButtonVariant, string> = {
  dark: DARK_SURFACE,
  white: LIGHT_SURFACE,
  accent: ACCENT_SURFACE,
  whatsapp: WHATSAPP_SURFACE,
};

export const candyButtonClasses = (
  variant: CandyButtonVariant = "dark",
  className?: string
) => cn(CANDY_BUTTON_BASE, SURFACE_BY_VARIANT[variant], className);

/** Square candy holder for icons — equal width/height, no default padding bleed. */
export const candyIconButtonClasses = (
  variant: CandyButtonVariant = "white",
  size: "sm" | "md" = "sm",
  className?: string
) =>
  candyButtonClasses(
    variant,
    cn(
      "box-border aspect-square shrink-0 gap-0 !p-0",
      size === "sm" ? "size-9 rounded-md" : "size-10 rounded-md",
      className
    )
  );

/** Square white candy — decorative icon holders only (stays light in dark mode). */
export const candySquareClasses = (className?: string) =>
  candyIconButtonClasses(
    "white",
    "sm",
    cn("pointer-events-none cursor-default active:scale-100", className)
  );

/**
 * Theme-aware square control for interactive icon buttons (carousel arrows,
 * pagination, modal close). Readable in light & dark — not white candy.
 */
export const carouselNavButtonClasses = (
  direction?: "prev" | "next",
  className?: string
) =>
  cn(
    "relative inline-flex size-9 shrink-0 cursor-pointer items-center justify-center",
    "rounded-md border border-hairline bg-canvas text-ink",
    "transition-colors duration-200",
    "hover:bg-surface-soft",
    "active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/30",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
    direction === "prev" && "swiper-button-prev-product-grid",
    direction === "next" && "swiper-button-next-product-grid",
    className
  );

/** Carousel / pagination prev/next — theme-aware (not white candy). */
export const candyCarouselNavClasses = (
  direction: "prev" | "next",
  className?: string
) => carouselNavButtonClasses(direction, className);

/** Text candy button — white variant. */
export const candyWhiteButtonClasses = (className?: string) =>
  candyButtonClasses(
    "white",
    cn("h-12 rounded-md px-6 text-sm", className)
  );

/** Text candy button — dark variant (primary CTA). */
export const candyDarkButtonClasses = (className?: string) =>
  candyButtonClasses(
    "dark",
    cn("h-12 rounded-md px-6 text-sm", className)
  );

/** Text candy button — brand accent blue. */
export const candyAccentButtonClasses = (className?: string) =>
  candyButtonClasses(
    "accent",
    cn("h-11 overflow-hidden rounded-md px-5 text-sm", className)
  );

/** Contact CTAs — same blue accent surface, standard text-button sizing. */
export const candyContactButtonClasses = (className?: string) =>
  candyButtonClasses(
    "accent",
    cn("h-12 rounded-md px-6 text-sm", className)
  );

/** WhatsApp CTAs — green. */
export const candyWhatsAppButtonClasses = (className?: string) =>
  candyButtonClasses(
    "whatsapp",
    cn("h-12 rounded-md px-6 text-sm", className)
  );

/** Category / stat icons inside candy holders — brand accent in light & dark. */
export const candyAccentIconClasses = "h-4 w-4 shrink-0 text-brand-accent";

/** Chevron / close icons on theme-aware nav buttons (`text-ink` follows theme). */
export const candyNavIconClasses = "h-4 w-4 shrink-0 text-ink";

/**
 * Icons on white candy decorative squares — always dark so they stay visible
 * on the light candy surface in both themes.
 */
export const candySquareIconClasses = "h-4 w-4 shrink-0 text-[#111111]";

export interface CandyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CandyButtonVariant;
}

export function CandyButton({
  className,
  variant = "dark",
  children = "Candy Button",
  ...props
}: CandyButtonProps) {
  return (
    <button className={candyButtonClasses(variant, className)} {...props}>
      {children}
    </button>
  );
}

export default CandyButton;
