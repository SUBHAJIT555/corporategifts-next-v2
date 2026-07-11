import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import PastelIconBox from "./PastelIconBox";

export type NavbarProductCategory = {
  id: string;
  title: string;
  link: string;
  description?: string;
  iconColor: string;
  Icon: LucideIcon;
};

type CategoriesDropdownProps = {
  categories: NavbarProductCategory[];
  onCloseMenu: () => void;
  label?: string;
};

const HOVER_DELAY_MS = 100;

const CategoriesDropdown = memo(function CategoriesDropdown({
  categories,
  onCloseMenu,
  label = "Categories",
}: CategoriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const openDropdown = useCallback(() => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, HOVER_DELAY_MS);
  }, [clearHoverTimeout]);

  const closeDropdown = useCallback(() => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, HOVER_DELAY_MS);
  }, [clearHoverTimeout]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleCategoryClick = useCallback(() => {
    setIsOpen(false);
    onCloseMenu();
  }, [onCloseMenu]);

  useEffect(() => {
    return () => clearHoverTimeout();
  }, [clearHoverTimeout]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft"
      >
        {label}
        <span className="pointer-events-none text-muted">
          {isOpen ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="absolute top-full left-1/2 z-50 mt-2 w-[640px] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
          >
            <ul className="grid grid-cols-1 gap-1 p-2.5 sm:grid-cols-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <NoPrefetchLink
                    href={category.link}
                    className="group/item flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-card"
                    onClick={handleCategoryClick}
                  >
                    <PastelIconBox color={category.iconColor} size="sm">
                      <category.Icon className="h-4 w-4" strokeWidth={2} />
                    </PastelIconBox>
                    <span className="min-w-0 py-0.5">
                      <span className="block text-sm font-semibold leading-6 text-ink">
                        {category.title}
                      </span>
                      {category.description ? (
                        <span className="mt-px block text-[13px] leading-snug text-muted">
                          {category.description}
                        </span>
                      ) : null}
                    </span>
                  </NoPrefetchLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default CategoriesDropdown;

/** @deprecated Use default export CategoriesDropdown */
export const ProductsDropdown = CategoriesDropdown;
