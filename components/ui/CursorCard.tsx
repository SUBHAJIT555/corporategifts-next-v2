"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utilts";

export type CursorCardProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  description: string;
  className?: string;
};

function SunburstBackdrop() {
  return (
    <>
      {/* Light sunburst */}
      <div
        className="absolute inset-0 z-0 block dark:hidden"
        style={{
          background: `
            repeating-conic-gradient(
              from -8deg at 50% 42%,
              #c45c58 0deg 11deg,
              #f3ead7 11deg 22deg,
              #8fa8c4 22deg 33deg,
              #f3ead7 33deg 44deg,
              #d4a06a 44deg 55deg,
              #f3ead7 55deg 66deg
            )
          `,
        }}
        aria-hidden
      />

      {/* Dark sunburst */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: `
            repeating-conic-gradient(
              from -8deg at 50% 42%,
              #7a3532 0deg 11deg,
              #2a241c 11deg 22deg,
              #3d4f63 22deg 33deg,
              #2a241c 33deg 44deg,
              #6b4a2e 44deg 55deg,
              #2a241c 55deg 66deg
            )
          `,
        }}
        aria-hidden
      />

      {/* Soft radial wash so rays feel printed / paper-like */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-soft-light dark:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 35%, rgba(255,255,255,0.45), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Grain / grunge texture */}
      <svg
        className="pointer-events-none absolute inset-0 z-1 h-full w-full opacity-[0.35] mix-blend-multiply dark:opacity-25 dark:mix-blend-soft-light"
        aria-hidden
      >
        <filter id="cursor-card-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cursor-card-grain)" />
      </svg>
    </>
  );
}

export function CursorCard({
  children,
  icon,
  description,
  className,
}: CursorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canHover, setCanHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX - 120);
    y.set(e.clientY + 20);
  };

  return (
    <>
      <span
        className={cn(
          "relative inline cursor-default rounded px-0.5 -mx-0.5 font-medium text-ink underline decoration-dotted decoration-brand-accent underline-offset-3",
          "transition-colors duration-200",
          "hover:bg-brand-accent/10 hover:decoration-solid",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </span>

      {mounted &&
        canHover &&
        createPortal(
          <AnimatePresence>
            {isHovered ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{ x: springX, y: springY }}
                className={cn(
                  "pointer-events-none fixed top-0 left-0 z-200 w-60 overflow-hidden",
                  "rounded-xl border border-hairline bg-canvas p-3",
                  "shadow-[0_16px_40px_-12px_rgba(0,0,0,0.2)]",
                  "dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)]",
                )}
              >
                <div className="relative mb-3 flex h-36 w-full items-center justify-center overflow-hidden rounded-lg border border-hairline">
                  <SunburstBackdrop />

                  <span
                    className={cn(
                      "relative z-10 flex size-17 items-center justify-center rounded-2xl text-brand-accent",
                      "border border-white/80 bg-white/90",
                      "shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,1)]",
                      "backdrop-blur-sm",
                      "dark:border-white/15 dark:bg-white/12",
                      "dark:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
                    )}
                  >
                    {icon}
                  </span>
                </div>
                <p className="m-0 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

export default CursorCard;
