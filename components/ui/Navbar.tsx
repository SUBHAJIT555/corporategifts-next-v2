import {
  AlignJustify,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Gift,
  Gem,
  Shirt,
  Briefcase,
  NotebookPen,
  Laptop,
  CupSoda,
  Dumbbell,
  Leaf,
} from "lucide-react";
import logo from "@/public/logo.svg"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, Fragment } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import Image from "next/image";
import CategoriesDropdown, {
  type NavbarProductCategory,
} from "./ProductsDropdown";
import { buildSiteUrl } from "@/lib/config/site";
import SearchModal from "./SearchModal";
import { LuSearch } from "@/components/icons";
import ThemeToggle from "./ThemeToggle";
import {
  candyDarkButtonClasses,
  candyIconButtonClasses,
  candyNavIconClasses,
} from "./candy-button";
import { cn } from "@/lib/utilts";

type MenuItem = {
  key: number;
  name: string;
  href: string;
  hasDropdown?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  { key: 1, name: "Home", href: "/" },
  { key: 2, name: "About", href: "/about-us" },
  { key: 3, name: "Products", href: "/products", hasDropdown: true },
  { key: 4, name: "Shop", href: "/shop" },
  { key: 5, name: "Blog", href: buildSiteUrl("/blog") },
];

const PRODUCT_CATEGORIES: NavbarProductCategory[] = [
  {
    id: "1",
    title: "Premium gift sets",
    link: "/product-category/premium-gift-sets",
    description: "Curated luxury hampers & gift boxes",
    iconColor: "#FFD6F8",
    Icon: Gift,
  },
  {
    id: "2",
    title: "Luxury corporate gifts",
    link: "/product-category/luxury-corporate-gifts-dubai",
    description: "High-end executive gifting",
    iconColor: "#EDE7F6",
    Icon: Gem,
  },
  {
    id: "3",
    title: "Apparel and accessories",
    link: "/product-category/apparel-and-accessories",
    description: "Branded clothing & wearables",
    iconColor: "#FFE5EC",
    Icon: Shirt,
  },
  {
    id: "4",
    title: "Bags and travel",
    link: "/product-category/bags-and-travel",
    description: "Custom bags, backpacks & travel kits",
    iconColor: "#C1D8FD",
    Icon: Briefcase,
  },
  {
    id: "5",
    title: "Office and stationary",
    link: "/product-category/office-and-stationary",
    description: "Notebooks, pens & desk essentials",
    iconColor: "#FFF8E1",
    Icon: NotebookPen,
  },
  {
    id: "6",
    title: "Technology and accessories",
    link: "/product-category/technology-and-accessories",
    description: "Smart gadgets & tech giveaways",
    iconColor: "#E0F7FA",
    Icon: Laptop,
  },
  {
    id: "7",
    title: "Eating and drinking",
    link: "/product-category/eating-and-drinking",
    description: "Drinkware, mugs & kitchen gifts",
    iconColor: "#FFF7BD",
    Icon: CupSoda,
  },

  {
    id: "8",
    title: "Sports and recreation",
    link: "/product-category/sports-and-recreation",
    description: "Fitness & outdoor branded gear",
    iconColor: "#FFECB3",
    Icon: Dumbbell,
  },
  {
    id: "9",
    title: "Eco friendly",
    link: "/product-category/eco-friendly",
    description: "Sustainable & reusable gifts",
    iconColor: "#B6E9C8",
    Icon: Leaf,
  },
];

const SEARCH_TRIGGER_CLASSES =
  "inline-flex h-10 cursor-pointer items-center gap-2.5 rounded-lg border border-hairline bg-surface-soft px-3 text-left text-sm text-muted transition-colors hover:bg-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.classList.remove("mobile-menu-open");
      // Reset mobile dropdown when menu closes
      setTimeout(() => {
        setIsMobileProductsOpen(false);
      }, 100);
    }

    return () => {
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMobileProducts = useCallback(() => {
    setIsMobileProductsOpen((prev) => !prev);
  }, []);

  const handleMobileCategoryClick = useCallback(() => {
    setIsMobileProductsOpen(false);
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      {/* Top navigation — cal.com style: white/translucent canvas, hairline border */}
      <nav className="fixed top-0 inset-x-0 z-30 w-full max-w-full border-b border-hairline bg-canvas/80 backdrop-blur-md supports-backdrop-filter:bg-canvas/70">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-5 sm:px-6">
          <div className="mr-auto">
            <NoPrefetchLink href="/">
              <Image
                width={160}
                height={160}
                src={logo}
                alt="Corporate Gifts Dubai"
                className="w-32 dark:brightness-0 dark:invert"
              />
            </NoPrefetchLink>
          </div>

          <ul className="hidden lg:flex items-center gap-0.5 list-none">
            {MENU_ITEMS.map((item) =>
              item.hasDropdown ? (
                <Fragment key={item.key}>
                  <li className="relative">
                    <NoPrefetchLink
                      href={item.href}
                      onClick={closeMenu}
                      className="inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft"
                    >
                      {item.name}
                    </NoPrefetchLink>
                  </li>
                  <li className="relative">
                    <CategoriesDropdown
                      categories={PRODUCT_CATEGORIES}
                      onCloseMenu={closeMenu}
                    />
                  </li>
                </Fragment>
              ) : item.name === "Blog" ? (
                <li key={item.key} className="relative">
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft"
                  >
                    {item.name}
                  </a>
                </li>
              ) : (
                <li key={item.key} className="relative">
                  <NoPrefetchLink
                    href={item.href}
                    onClick={closeMenu}
                    className="inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft"
                  >
                    {item.name}
                  </NoPrefetchLink>
                </li>
              ),
            )}
          </ul>

          <div className="hidden lg:flex items-center gap-2.5 ml-5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className={cn(SEARCH_TRIGGER_CLASSES, "min-w-[220px]")}
              aria-label="Open search"
            >
              <LuSearch className="size-4 shrink-0 text-muted" />
              <span className="truncate">Search products...</span>
            </button>
            <NoPrefetchLink
              href="/contact-us"
              onClick={closeMenu}
              className={candyDarkButtonClasses("group h-10 gap-2 px-4")}
            >
              Contact
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </NoPrefetchLink>
            <ThemeToggle variant="subtle" />
          </div>

          {/* Mobile: search field + icon-only menu */}
          <div className="flex min-w-0 flex-1 items-center justify-end gap-2 pl-3 lg:hidden">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className={cn(SEARCH_TRIGGER_CLASSES, "min-w-0 flex-1")}
              aria-label="Open search"
            >
              <LuSearch className="size-4 shrink-0 text-muted" />
              <span className="truncate">Search products...</span>
            </button>

            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className={cn(
                candyIconButtonClasses("white", "sm"),
                isMenuOpen && "bg-surface-soft",
              )}
            >
              {isMenuOpen ? (
                <X className={candyNavIconClasses} />
              ) : (
                <AlignJustify className={candyNavIconClasses} />
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile menu panel — cal.com style: full-width sheet, left-aligned list */}
      <motion.div
        initial={{ y: "100vh" }}
        animate={isMenuOpen ? { y: "calc(100dvh - 110%)" } : { y: "100vh" }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="fixed bottom-0 left-0 right-0 z-120 flex max-h-[calc(100dvh-4rem)] flex-col rounded-t-2xl border-t border-hairline bg-canvas shadow-xl lg:hidden"
        style={{ height: "calc(100dvh - 12dvh)" }}
      >
        {/* Grabber */}
        <div className="shrink-0 flex items-center justify-center bg-canvas pt-3 pb-2">
          <span className="h-1.5 w-10 rounded-full bg-surface-strong" aria-hidden="true" />
        </div>

        <div className="cal-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-10 pt-2">
          <ul className="flex flex-col divide-y divide-hairline">
            {MENU_ITEMS.map((item) =>
              item.hasDropdown ? (
                <Fragment key={item.key}>
                  <li key={`${item.key}-link`} className="w-full">
                    <NoPrefetchLink
                      href={item.href}
                      onClick={closeMenu}
                      className="block py-4 text-lg font-medium text-ink transition-colors active:text-muted"
                    >
                      {item.name}
                    </NoPrefetchLink>
                  </li>
                  <li key={`${item.key}-categories`} className="w-full">
                    <button
                      type="button"
                      onClick={toggleMobileProducts}
                      aria-expanded={isMobileProductsOpen}
                      aria-controls="mobile-product-categories"
                      className="flex w-full items-center justify-between gap-3 py-4 text-left transition-colors active:text-muted"
                    >
                      <span className="text-lg font-medium text-ink">
                        Categories
                      </span>
                      {isMobileProductsOpen ? (
                        <ChevronUp className="size-5 shrink-0 text-muted" />
                      ) : (
                        <ChevronDown className="size-5 shrink-0 text-muted" />
                      )}
                    </button>
                    <AnimatePresence>
                      {isMobileProductsOpen && (
                        <motion.ul
                          id="mobile-product-categories"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pb-3"
                        >
                          {PRODUCT_CATEGORIES.map((category) => (
                            <li key={category.id}>
                              <NoPrefetchLink
                                href={category.link}
                                onClick={handleMobileCategoryClick}
                                className="block rounded-lg px-3 py-2.5 text-base font-medium text-body transition-colors hover:bg-surface-card hover:text-ink"
                              >
                                {category.title}
                              </NoPrefetchLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                </Fragment>
              ) : (
                <li key={item.key} className="w-full">
                  {item.name === "Blog" ? (
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="block py-4 text-lg font-medium text-ink transition-colors active:text-muted"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <NoPrefetchLink
                      href={item.href}
                      onClick={closeMenu}
                      className="block py-4 text-lg font-medium text-ink transition-colors active:text-muted"
                    >
                      {item.name}
                    </NoPrefetchLink>
                  )}
                </li>
              ),
            )}
          </ul>

          <NoPrefetchLink
            href="/contact-us"
            onClick={closeMenu}
            className={candyDarkButtonClasses("mt-6 h-12 w-full text-base")}
          >
            Contact
            <ArrowRight className="w-4 h-4" />
          </NoPrefetchLink>

          <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
            <span className="text-xs font-medium text-muted">Appearance</span>
            <ThemeToggle variant="subtle" />
          </div>
        </div>
      </motion.div>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
