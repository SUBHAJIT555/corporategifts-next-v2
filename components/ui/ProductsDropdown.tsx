import { memo, useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";

export type NavbarProductCategory = {
  id: string;
  title: string;
  link: string;
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
      <div className="flex items-center gap-1">
        <NoPrefetchLink href={href} className="flex items-center gap-1">
          {name}
        </NoPrefetchLink>
        <span className="pointer-events-none">
          {isProductsDropdownOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      </div>
      <span className="absolute top-0 left-0 w-0 h-px bg-[#0F5C85] transition-all duration-300 group-hover:w-full"></span>
      <span className="absolute bottom-0 right-0 w-0 h-px bg-[#0F5C85] transition-all duration-300 group-hover:w-full"></span>

      <AnimatePresence>
        {isProductsDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-300 ring ring-neutral-300 ring-offset-2 overflow-hidden z-50"
          >
            <ul className="py-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <NoPrefetchLink
                    href={category.link}
                    className="block px-4 py-2 text-neutral-800 hover:bg-neutral-100 border-b border-t border-neutral-100 hover:text-[#0F5C85] transition-colors text-base font-sentient"
                    onClick={handleCategoryClick}
                  >
                    {category.title}
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
