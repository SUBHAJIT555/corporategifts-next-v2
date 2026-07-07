import React from "react";
import { cn } from "@/lib/utilts";

export type CandyButtonVariant = "dark" | "white" | "accent";

/**
 * Candy-button styling (no shadow), recoloured to the cal.com monochrome
 * palette. Two variants — `dark` (primary) and `white` (secondary) — both of
 * which invert appropriately in dark mode. Exported as a class helper so it can
 * be applied to <button>, <a>, or the project's <NoPrefetchLink>.
 */
/**
 * Glossy "candy" recipes (no outer glow — inset highlights only).
 * - DARK dome: near-black gradient, lit top edge, visible white micro-shine.
 * - LIGHT dome: white gradient with a bright inset top edge + soft bottom
 *   recess, so it still reads as candy on dark backgrounds.
 * Each variant inverts in dark mode so the button always sits on a
 * contrasting surface.
 */
const DARK_DOME_LIGHT_THEME = cn(
  "text-white border border-white/10",
  "bg-[radial-gradient(100%_100%_at_50%_0%,#454545_0%,#1a1a1a_45%,#000000_100%)]",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),inset_0_-2px_4px_0_rgba(0,0,0,0.45)]",
  "after:opacity-100 hover:brightness-115"
);

const LIGHT_DOME_LIGHT_THEME = cn(
  "text-[#111111] border border-black/10",
  "bg-[radial-gradient(100%_100%_at_50%_0%,#ffffff_0%,#ffffff_35%,#d4d4d4_100%)]",
  "shadow-[inset_0_1px_1px_0_#ffffff,inset_0_-2px_4px_0_rgba(0,0,0,0.12)]",
  "after:opacity-0 hover:brightness-[1.03]"
);

const DARK_DOME_DARK_THEME = cn(
  "dark:text-neutral-200 dark:border-white/10",
  "dark:bg-[radial-gradient(100%_100%_at_50%_0%,#454545_0%,#1a1a1a_45%,#000000_100%)]",
  "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),inset_0_-2px_4px_0_rgba(0,0,0,0.45)]",
  "dark:after:opacity-100 dark:hover:brightness-115"
);

const LIGHT_DOME_DARK_THEME = cn(
  "dark:text-[#111111] dark:border-black/10",
  "dark:bg-[radial-gradient(100%_100%_at_50%_0%,#ffffff_0%,#ffffff_35%,#d4d4d4_100%)]",
  "dark:shadow-[inset_0_1px_1px_0_#ffffff,inset_0_-2px_4px_0_rgba(0,0,0,0.12)]",
  "dark:after:opacity-0 dark:hover:brightness-[1.03]"
);

/** Brand accent dome — #3b82f6 (--cal-brand-accent) with glossy candy highlights. */
const ACCENT_DOME = cn(
  "text-white border border-white/20",
  "bg-[radial-gradient(100%_100%_at_50%_0%,#60a5fa_0%,#3b82f6_42%,#2563eb_100%)]",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-2px_4px_0_rgba(29,78,216,0.4)]",
  "after:opacity-100 hover:brightness-110",
  "dark:border-white/15",
  "dark:bg-[radial-gradient(100%_100%_at_50%_0%,#60a5fa_0%,#3b82f6_42%,#1d4ed8_100%)]",
  "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),inset_0_-2px_4px_0_rgba(0,0,0,0.35)]",
  "dark:after:opacity-100 dark:hover:brightness-110"
);

const CANDY_BUTTON_BASE = cn(
  "relative inline-flex items-center justify-center gap-1.5 cursor-pointer select-none",
  "font-semibold text-sm leading-none tracking-[0.01em]",
  "rounded-xl px-6 py-3 transition-all duration-200 ease-out",
  "active:scale-95",
  "after:absolute after:top-px after:right-[10%] after:h-px after:w-[60%]",
  "after:bg-gradient-to-r after:from-transparent after:via-white/60 after:to-transparent"
);

export const candyButtonClasses = (
  variant: CandyButtonVariant = "dark",
  className?: string
) =>
  cn(
    CANDY_BUTTON_BASE,
    variant === "dark"
      ? cn(DARK_DOME_LIGHT_THEME, LIGHT_DOME_DARK_THEME)
      : variant === "white"
        ? cn(LIGHT_DOME_LIGHT_THEME, DARK_DOME_DARK_THEME)
        : ACCENT_DOME,
    className
  );

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
      size === "sm" ? "size-9 rounded-lg" : "size-10 rounded-lg",
      className
    )
  );

/** Square white candy — shared by carousel arrows and category/stat icons. */
export const candySquareClasses = (className?: string) =>
  candyIconButtonClasses(
    "white",
    "sm",
    cn("pointer-events-none cursor-default active:scale-100", className)
  );

/** Carousel prev/next — same white candy square as category icons. */
export const candyCarouselNavClasses = (
  direction: "prev" | "next",
  className?: string
) =>
  candyIconButtonClasses(
    "white",
    "sm",
    cn(
      direction === "prev"
        ? "swiper-button-prev-product-grid"
        : "swiper-button-next-product-grid",
      className
    )
  );

/** Text candy button — white variant, same glossy dome as icon buttons in light mode. */
export const candyWhiteButtonClasses = (className?: string) =>
  candyButtonClasses(
    "white",
    cn("h-12 rounded-xl px-6 !py-0", className)
  );

/** Text candy button — dark variant. */
export const candyDarkButtonClasses = (className?: string) =>
  candyButtonClasses(
    "dark",
    cn("h-12 rounded-xl px-6 !py-0", className)
  );

/** Text candy button — brand accent blue (#3b82f6), glossy dome. */
export const candyAccentButtonClasses = (className?: string) =>
  candyButtonClasses(
    "accent",
    cn(
      "h-11 overflow-hidden rounded-xl px-5 !py-0",
      "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100",
      className
    )
  );

/** Category / stat icons inside candy holders — brand accent in light & dark. */
export const candyAccentIconClasses = "h-4 w-4 shrink-0 text-brand-accent";

/** Chevron / close icons on candy icon buttons. */
export const candyNavIconClasses =
  "h-4 w-4 shrink-0 text-ink dark:text-neutral-200";

/** Alias — icons inside white candy squares (same as nav chevrons). */
export const candySquareIconClasses = candyNavIconClasses;

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
