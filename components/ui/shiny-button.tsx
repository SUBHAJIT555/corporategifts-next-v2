"use client";

import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utilts";

interface ShinyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ShinyButton = memo(function ShinyButton({
  children,
  onClick,
  className = "",
}: ShinyButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "relative overflow-hidden md:rounded-2xl rounded-xl border border-[#0f5c85]/20 cursor-pointer",
        "bg-linear-to-r from-[#0f5c85] via-[#166b96] to-[#0f5c85]",
        "px-10 py-5 text-lg font-medium text-white shadow-[0_12px_28px_rgba(15,92,133,0.22)]",
        "transition-all duration-300 ease-out",
        "before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:rotate-12 before:bg-white/18 before:blur-xl before:transition-transform before:duration-500",
        "hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(15,92,133,0.28)] hover:before:translate-x-[240%]",
        "active:translate-y-0 active:shadow-[0_10px_22px_rgba(15,92,133,0.2)]",
        className,
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
});
