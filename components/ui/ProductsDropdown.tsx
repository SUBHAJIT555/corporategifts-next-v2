import { memo, useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { candyIconButtonClasses, candyAccentIconClasses } from "./candy-button";

export type NavbarProductCategory = {
  id: string;
  title: string;
  link: string;
  description?: string;
  icon?: React.ReactNode;
};

type ProductsDropdownProps = {
  href: string;
  name: string;
  categories: NavbarProductCategory[];
  onCloseMenu: () => void;
};

const HOVER_DELAY_MS = 100;

const ProductsDropdown = memo(function ProductsDropdown({
  href,
  name,
  categories,
  onCloseMenu,
}: ProductsDropdownProps) {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
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
      setIsProductsDropdownOpen(true);
    }, HOVER_DELAY_MS);
  }, [clearHoverTimeout]);

  const closeDropdown = useCallback(() => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, HOVER_DELAY_MS);
  }, [clearHoverTimeout]);

  const handleCategoryClick = useCallback(() => {
    setIsProductsDropdownOpen(false);
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
        setIsProductsDropdownOpen(false);
      }
    };

    if (isProductsDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProductsDropdownOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <NoPrefetchLink
        href={href}
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-soft hover:text-ink"
      >
        {name}
        <span className="pointer-events-none text-muted">
          {isProductsDropdownOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </span>
      </NoPrefetchLink>

      <AnimatePresence>
        {isProductsDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] max-w-[calc(100vw-2rem)] bg-canvas rounded-2xl border border-hairline shadow-[0_4px_24px_rgba(0,0,0,0.1)] overflow-hidden z-50"
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <NoPrefetchLink
                    href={category.link}
                    className="group/item flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-card"
                    onClick={handleCategoryClick}
                  >
                    <span className={candyIconButtonClasses("white", "sm")}>
                      {category.icon}
                    </span>
                    <span className="min-w-0 py-0.5">
                      <span className="block text-sm font-semibold text-ink leading-6">
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

export default ProductsDropdown;
