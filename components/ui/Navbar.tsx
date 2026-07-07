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
import { useState, useEffect, useCallback } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import Image from "next/image";
import ProductsDropdown, { type NavbarProductCategory } from "./ProductsDropdown";
import { buildSiteUrl } from "@/lib/config/site";
import SearchModal from "./SearchModal";
import { LuSearch } from "@/components/icons";
import ThemeToggle from "./ThemeToggle";
import { candyButtonClasses } from "./candy-button";

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
    icon: <Gift className="w-4.5 h-4.5" />,
  },
  {
    id: "2",
    title: "Luxury corporate gifts",
    link: "/product-category/luxury-corporate-gifts-dubai",
    description: "High-end executive gifting",
    icon: <Gem className="w-4.5 h-4.5" />,
  },
  {
    id: "3",
    title: "Apparel and accessories",
    link: "/product-category/apparel-and-accessories",
    description: "Branded clothing & wearables",
    icon: <Shirt className="w-4.5 h-4.5" />,
  },
  {
    id: "4",
    title: "Bags and travel",
    link: "/product-category/bags-and-travel",
    description: "Custom bags, backpacks & travel kits",
    icon: <Briefcase className="w-4.5 h-4.5" />,
  },
  {
    id: "5",
    title: "Office and stationary",
    link: "/product-category/office-and-stationary",
    description: "Notebooks, pens & desk essentials",
    icon: <NotebookPen className="w-4.5 h-4.5" />,
  },
  {
    id: "6",
    title: "Technology and accessories",
    link: "/product-category/technology-and-accessories",
    description: "Smart gadgets & tech giveaways",
    icon: <Laptop className="w-4.5 h-4.5" />,
  },
  {
    id: "7",
    title: "Eating and drinking",
    link: "/product-category/eating-and-drinking",
    description: "Drinkware, mugs & kitchen gifts",
    icon: <CupSoda className="w-4.5 h-4.5" />,
  },

  {
    id: "8",
    title: "Sports and recreation",
    link: "/product-category/sports-and-recreation",
    description: "Fitness & outdoor branded gear",
    icon: <Dumbbell className="w-4.5 h-4.5" />,
  },
  {
    id: "9",
    title: "Eco friendly",
    link: "/product-category/eco-friendly",
    description: "Sustainable & reusable gifts",
    icon: <Leaf className="w-4.5 h-4.5" />,
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // Reset mobile dropdown when menu closes
      setTimeout(() => {
        setIsMobileProductsOpen(false);
      }, 100);
    }
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

          <ul className="hidden lg:flex items-center gap-1 list-none">
            {MENU_ITEMS.map((item) => (
              <li key={item.key} className="relative">
                {item.hasDropdown ? (
                  <ProductsDropdown
                    href={item.href}
                    name={item.name}
                    categories={PRODUCT_CATEGORIES}
                    onCloseMenu={closeMenu}
                  />
                ) : item.name === "Blog" ? (
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-soft hover:text-ink"
                  >
                    {item.name}
                  </a>
                ) : (
                  <NoPrefetchLink
                    href={item.href}
                    onClick={closeMenu}
                    className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-soft hover:text-ink"
                  >
                    {item.name}
                  </NoPrefetchLink>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2 ml-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-canvas text-ink transition-colors hover:bg-surface-card cursor-pointer"
              aria-label="Open search"
            >
              <LuSearch className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <NoPrefetchLink
              href="/contact-us"
              onClick={closeMenu}
              className={candyButtonClasses("dark", "group h-9 px-4 py-0")}
            >
              Contact
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </NoPrefetchLink>
          </div>

          {/* Hamburger icon for mobile view */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-hairline bg-canvas text-ink transition-colors hover:bg-surface-card"
              aria-label="Open search"
            >
              <LuSearch className="h-4 w-4" />
            </button>

            <ThemeToggle className="rounded-md" />

            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-hairline bg-canvas text-ink transition-colors hover:bg-surface-card"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <AlignJustify className="w-4 h-4" />
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
        className="fixed bottom-0 left-0 right-0 z-100 bg-canvas shadow-xl rounded-t-2xl border-t border-hairline overflow-y-auto lg:hidden"
        style={{ height: "calc(100dvh - 12dvh)" }}
      >
        {/* Grabber */}
        <div className="sticky top-0 z-10 flex items-center justify-center bg-canvas pt-3 pb-2">
          <span className="h-1.5 w-10 rounded-full bg-surface-strong" aria-hidden="true" />
        </div>

        <div className="relative z-0 flex flex-col px-5 pb-8 pt-2">
          <ul className="flex flex-col divide-y divide-hairline">
            {MENU_ITEMS.map((item) => (
              <li key={item.key} className="w-full">
                {item.hasDropdown ? (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <NoPrefetchLink
                        href={item.href}
                        onClick={closeMenu}
                        className="flex-1 py-4 text-lg font-medium text-ink transition-colors active:text-muted"
                      >
                        {item.name}
                      </NoPrefetchLink>
                      <button
                        onClick={toggleMobileProducts}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-card hover:text-ink"
                        aria-label="Toggle products menu"
                      >
                        {isMobileProductsOpen ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <AnimatePresence>
                      {isMobileProductsOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pb-2"
                        >
                          {PRODUCT_CATEGORIES.map((category) => (
                            <li key={category.id}>
                              <NoPrefetchLink
                                href={category.link}
                                onClick={handleMobileCategoryClick}
                                className="block rounded-md px-3 py-2.5 text-base font-medium text-body transition-colors hover:bg-surface-card hover:text-ink"
                              >
                                {category.title}
                              </NoPrefetchLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
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
            ))}
          </ul>

          <NoPrefetchLink
            href="/contact-us"
            onClick={closeMenu}
            className={candyButtonClasses("dark", "mt-6 h-12 w-full text-base")}
          >
            Contact
            <ArrowRight className="w-4 h-4" />
          </NoPrefetchLink>
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
