"use client";

import { useRef } from "react";
import type { ComponentPropsWithoutRef, MouseEventHandler } from "react";

import { cn } from "@/lib/utilts";

export type TestimonialSpotlightProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onMouseMove"
> & {
  children: React.ReactNode;
};

export function TestimonialSpotlight({
  children,
  className,
  ...props
}: TestimonialSpotlightProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!itemRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();

    itemRef.current.style.setProperty(
      "--spotlight-x",
      `${event.clientX - rect.left}px`,
    );
    itemRef.current.style.setProperty(
      "--spotlight-y",
      `${event.clientY - rect.top}px`,
    );
  };

  return (
    <div
      ref={itemRef}
      data-slot="testimonial-spotlight"
      className={cn(
        "group/testimonial-spotlight relative overflow-hidden rounded-xl border border-hairline bg-surface-card/80",
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover/testimonial-spotlight:opacity-50"
        style={{
          background:
            "radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), rgba(59,130,246,0.12), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
