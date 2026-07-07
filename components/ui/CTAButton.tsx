import { cn } from "@/lib/utilts";
import { LuArrowUpRight } from "../icons";
import { memo } from "react";

type CTAButtonProps = {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "default" | "light" | "dark";
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  animateLabel?: boolean;
};

function CTAButton({
  label,
  onClick,
  href,
  className,
  variant = "default",
  target,
  rel,
  type = "button",
  disabled = false,
  animateLabel = false,
}: CTAButtonProps) {
  const Comp = href ? "a" : "button";

  const variantStyles = {
    default: {
      container: "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 ",
      socket: "bg-white/20 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.35),inset_0_-4px_8px_rgba(0,0,0,0.25)]",
      arrow: "bg-[#0F5C85] text-white",
      shadow: "shadow-[0_10px_30px_rgba(0,0,0,0.18)]",
    },
    light: {
      container: "bg-neutral-100 border border-neutral-200 text-neutral-900 hover:bg-neutral-200",
      socket: "bg-neutral-200 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.1)]",
      arrow: "bg-[#0F5C85] text-white",
      shadow: "shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
    },
    dark: {
      container: "bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700",
      socket: "bg-black shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-4px_8px_rgba(0,0,0,0.3)]",
      arrow: "bg-black text-white ring-1 ring-neutral-500",
      shadow: "shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
    },
  };

  const styles = variantStyles[variant];

  return (
    <Comp
      href={href}
      onClick={onClick}
      {...(href && { target, rel })}
      {...(Comp === "button" && { type, disabled })}
      className={cn(
        "group relative flex items-center justify-between",
        "rounded-full",
        "font-medium",
        "transition-all duration-700 ease-out",
        "active:scale-[0.98]",
        "overflow-visible",
        disabled && "pointer-events-none opacity-60",
        styles.container,
        styles.shadow,
        className
      )}
    >
      {/* Text - moves to right side on hover with letter swap effect */}
      <span
        className={cn(
          "whitespace-nowrap px-2 py-1.5 sm:px-3 sm:py-2 relative z-10 text-xs sm:text-sm shrink-0"
        )}
      >
        {animateLabel ? (
          <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5">
            {label}
          </span>
        ) : (
          <span className="inline-block">{label}</span>
        )}
      </span>

      {/* Socket - moves to left side on hover */}
      <span
        className={cn(
          "relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center shrink-0",
          "rounded-full z-10",
          "transition-all duration-700 ease-out",
          styles.socket
        )}
      >
        {/* Arrow Button */}
        <span
          className={cn(
            "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center",
            "rounded-full",
            "outline-1 outline-transparent",
            "transition-transform duration-700 ease-out",
            "group-hover:-rotate-45",
            styles.arrow
          )}
        >
          <LuArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      </span>
    </Comp>
  );
}

export default memo(CTAButton);
