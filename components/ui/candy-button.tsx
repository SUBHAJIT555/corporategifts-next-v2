import React from "react";
import { cn } from "@/lib/utilts";

export type CandyButtonVariant = "dark" | "white";

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
  "dark:text-white dark:border-white/10",
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

export const candyButtonClasses = (
  variant: CandyButtonVariant = "dark",
  className?: string
) =>
  cn(
    // base
    "relative inline-flex items-center justify-center gap-1.5 cursor-pointer select-none",
    "font-semibold text-sm leading-none tracking-[0.01em]",
    "rounded-xl px-6 py-3 transition-all duration-200 ease-out",
    "active:scale-95",
    // top micro-shine (opacity toggled per dome above)
    "after:absolute after:top-px after:right-[10%] after:h-px after:w-[60%]",
    "after:bg-gradient-to-r after:from-transparent after:via-white/60 after:to-transparent",
    // variant: dark = dark dome in light theme, light dome in dark theme
    variant === "dark"
      ? cn(DARK_DOME_LIGHT_THEME, LIGHT_DOME_DARK_THEME)
      : cn(LIGHT_DOME_LIGHT_THEME, DARK_DOME_DARK_THEME),
    className
  );

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
