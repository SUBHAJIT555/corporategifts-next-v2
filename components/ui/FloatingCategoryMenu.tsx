"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utilts";

const ease = [0.22, 1, 0.36, 1] as const;

export interface FloatingCategoryMenuItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface FloatingCategoryMenuProps {
  items: FloatingCategoryMenuItem[];
  visible?: boolean;
  triggerLabel?: string;
  className?: string;
}

function CategoryItem({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full cursor-pointer truncate py-2.5 text-left text-sm font-medium transition-colors",
        active ? "text-brand-accent" : "text-body hover:text-ink"
      )}
    >
      <span className="relative z-10 block truncate pr-1">{label}</span>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-1 h-px bg-hairline"
      />
      <span
        aria-hidden
        className={cn(
          "absolute bottom-1 left-0 h-px bg-brand-accent transition-all duration-300 ease-out",
          active ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </button>
  );
}

export default function FloatingCategoryMenu({
  items,
  visible = true,
  triggerLabel = "Filter",
  className,
}: FloatingCategoryMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const openHeight = useMemo(() => {
    const listHeight = Math.min(items.length * 44 + 16, 320);
    return 48 + listHeight + 8;
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (!visible) setIsOpen(false);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && items.length > 0 ? (
        <motion.div
          ref={containerRef}
          className={cn(
            "pointer-events-none fixed bottom-8 left-1/2 z-100 sm:bottom-10",
            className
          )}
          style={{ x: "-50%" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease }}
        >
          <motion.div
            className={cn(
              "pointer-events-auto relative flex flex-col justify-end overflow-hidden border border-hairline bg-canvas",
              isOpen ? "rounded-2xl" : "rounded-full"
            )}
            animate={{
              width: isOpen ? 300 : 152,
              height: isOpen ? openHeight : 48,
            }}
            transition={{ duration: 0.35, ease }}
          >
            <div
              className={cn(
                "relative z-10 overflow-hidden transition-opacity duration-200",
                isOpen ? "flex-1 px-4 pt-3 opacity-100" : "h-0 flex-none p-0 opacity-0"
              )}
            >
              <div className="flex max-h-[320px] flex-col overflow-y-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((item) => (
                  <CategoryItem
                    key={item.label}
                    label={item.label}
                    active={item.active}
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              className="relative z-10 flex h-12 w-full shrink-0 cursor-pointer items-center justify-between px-5 text-ink"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold leading-none sm:text-base">
                {triggerLabel}
              </span>

              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <span
                  className={cn(
                    "absolute block h-0.5 w-[18px] rounded-full bg-ink transition-transform duration-300",
                    isOpen ? "rotate-45" : "-translate-y-1"
                  )}
                />
                <span
                  className={cn(
                    "absolute block h-0.5 w-[18px] rounded-full bg-ink transition-transform duration-300",
                    isOpen ? "-rotate-45" : "translate-y-1"
                  )}
                />
              </span>
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
