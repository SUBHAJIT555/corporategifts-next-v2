"use client";

import { Star } from "lucide-react";
import { motion } from "motion/react";
import { FcGoogle } from "@/components/icons";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJO7SOrsRpXz4RIm-KxaoNZzQ";

const underlineTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 16,
  mass: 0.7,
};

export default function GoogleRatingStatic() {
  return (
    <motion.a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      whileHover="hover"
      className="group inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm sm:text-base"
      aria-label="Rated on Google — view our Google reviews"
    >
      <FcGoogle className="size-4 shrink-0 sm:size-[18px]" />
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="size-3.5 fill-amber-400 text-amber-400 sm:size-4"
            strokeWidth={1.75}
          />
        ))}
      </span>

      <span className="relative inline-flex items-center gap-1.5 font-semibold text-ink">
        <span className="relative inline-block">
          Rated on Google
          <motion.span
            aria-hidden
            className="absolute right-0 bottom-0 left-0 h-px origin-left bg-brand-accent"
            variants={{
              rest: { scaleX: 0 },
              hover: { scaleX: 1 },
            }}
            transition={underlineTransition}
          />
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5 shrink-0 text-muted transition-colors duration-200 group-hover:text-brand-accent sm:size-4"
          aria-hidden
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
          <path d="M11 13l9 -9" />
          <path d="M15 4h5v5" />
        </svg>
      </span>
    </motion.a>
  );
}
