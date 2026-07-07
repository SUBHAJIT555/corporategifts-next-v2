import { AlignJustify, X, ChevronDown, ChevronUp, } from "lucide-react";
import logo from "@/public/logo.svg"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import Image from "next/image";
import ProductsDropdown, { type NavbarProductCategory } from "./ProductsDropdown";
import { buildSiteUrl } from "@/lib/config/site";
import SearchModal from "./SearchModal";
import { LuSearch } from "@/components/icons";

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
  { key: 6, name: "Contact", href: "/contact-us" },
];

const PRODUCT_CATEGORIES: NavbarProductCategory[] = [
  {
    id: "1",
    title: "Premium gift sets",
    link: "/product-category/premium-gift-sets",
  },
  {
    id: "2",
    title: "Luxury corporate gifts",
    link: "/product-category/luxury-corporate-gifts-dubai",
  },
  {
    id: "3",
    title: "Apparel and accessories",
    link: "/product-category/apparel-and-accessories",
  },
  {
    id: "4",
    title: "Bags and travel",
    link: "/product-category/bags-and-travel",
  },
  {
    id: "5",
    title: "Office and stationary",
    link: "/product-category/office-and-stationary",
  },
  {
    id: "6",
    title: "Technology and accessories",
    link: "/product-category/technology-and-accessories",
  },
  {
    id: "7",
    title: "Eating and drinking",
    link: "/product-category/eating-and-drinking",
  },

  {
    id: "8",
    title: "Sports and recreation",
    link: "/product-category/sports-and-recreation",
  },
  {
    id: "9",
    title: "Eco friendly",
    link: "/product-category/eco-friendly",
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
      <div className="flex justify-center w-full overflow-x-hidden">
        {/* Navbar */}
        <nav
          className="fixed top-0 w-11/12 mx-auto xl:w-full z-30 max-w-full"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4 rounded-xl mt-4 bg-white/10 backdrop-blur-sm">
            <div className="mr-auto">

              <NoPrefetchLink href="/">
                <Image
                  width={160}
                  height={160}
                  src={logo}
                  alt="Corporate Gifts Dubai"
                  className="w-40 "
                />
              </NoPrefetchLink>
            </div>

            <ul className="hidden lg:flex space-x-8 list-none">
              {MENU_ITEMS.map((item) => (
                <li
                  key={item.key}
                  className="relative text-xl font-sentient text-[#0F5C85]  font-semibold hover:text-[#A8DDF0]! transition-colors group"
                >
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
                      className="inline-block transition-transform duration-150 active:scale-95"
                    >
                      {item.name}
                      {/* Top border animation */}
                      <span className="absolute top-0 left-0 w-0 h-px bg-[#0F5C85] transition-all duration-300 group-hover:w-full"></span>
                      {/* Bottom border animation */}
                      <span className="absolute bottom-0 right-0 w-0 h-px bg-[#0F5C85] transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <NoPrefetchLink
                      href={item.href}
                      onClick={closeMenu}
                      className="inline-block transition-transform duration-150 active:scale-95"
                    >
                      {item.name}
                      {/* Top border animation */}
                      <span className="absolute top-0 left-0 w-0 h-px bg-[#0F5C85] transition-all duration-300 group-hover:w-full"></span>
                      {/* Bottom border animation */}
                      <span className="absolute bottom-0 right-0 w-0 h-px bg-[#0F5C85] transition-all duration-300 group-hover:w-full"></span>
                    </NoPrefetchLink>
                  )}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white/20 backdrop-blur-sm p-2 text-[#0F5C85] transition hover:bg-neutral-100 ml-4 font-sentient text-base px-4 cursor-pointer"
              aria-label="Open search"
            >
              <LuSearch className="w-5 h-5 text-[#0F5C85]" /> <span>&nbsp; | &nbsp; Search... </span>
            </button>

            {/* Hamburger icon for mobile view */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex h-6 w-6 md:h-10 md:w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-neutral-300 bg-white p-1 text-[#0F5C85] ring ring-neutral-300 ring-offset-2"
                aria-label="Open search"
              >
                <LuSearch className="h-3.5 w-3.5 md:h-6 md:w-6" />
              </button>

              {isMenuOpen ? (
                <X
                  onClick={toggleMenu}
                  className="w-6 h-6 md:w-10 md:h-10 cursor-pointer text-[#0F5C85] border border-neutral-300 rounded-lg p-1 ring ring-neutral-300 ring-offset-2 bg-white"
                />
              ) : (
                <AlignJustify
                  onClick={toggleMenu}
                  className="w-6 h-6 md:w-10 md:h-10 cursor-pointer text-[#0F5C85] border border-neutral-300 rounded-lg p-1 ring ring-neutral-300 ring-offset-2 bg-white"
                />
              )}
            </div>
          </div>
        </nav>
      </div>
      {/* Menu panel that slides up from below */}
      <motion.div
        initial={{ y: "100vh" }}
        animate={isMenuOpen ? { y: "calc(100dvh - 110%)" } : { y: "100vh" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 right-0 z-100 bg-white shadow-xl rounded-t-3xl border border-neutral-300 overflow-y-auto"
        style={{ height: "calc(100dvh - 15dvh)" }}
      >
        {/* Dashed Top Fade Grid */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
            backgroundSize: "5px 5px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
            WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        {/* Scrollable menu items */}
        <div className="relative z-10 min-h-full flex flex-col justify-center items-center py-8 px-4">
          <ul className="space-y-8 text-center w-full">
            {MENU_ITEMS.map((item) => (
              <li
                key={item.key}
                className="w-full flex justify-center transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                {item.hasDropdown ? (
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2">
                      <NoPrefetchLink
                        href={item.href}
                        onClick={closeMenu}
                        className="text-2xl text-[#0F5C85] font-sentient font-medium hover:text-[#0F5C85] transition-colors"
                      >
                        {item.name}
                      </NoPrefetchLink>
                      <button
                        onClick={toggleMobileProducts}
                        className="text-[#0F5C85] font-sentient! hover:text-[#0F5C85] transition-colors"
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
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-4 overflow-hidden border-t border-b border-neutral-300  p-4 w-full max-w-xs"
                        >
                          {PRODUCT_CATEGORIES.map((category) => (
                            <li
                              key={category.id}
                              className="text-center transition-transform duration-200 hover:scale-105 active:scale-95"
                            >
                              <NoPrefetchLink
                                href={category.link}
                                onClick={handleMobileCategoryClick}
                                className="text-lg text-[#0F5C85] font-sentient font-medium hover:text-[#0F5C85] transition-colors"
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
                    className="text-2xl text-[#0F5C85] font-sentient font-medium hover:text-[#0F5C85] transition-colors"
                  >
                    {item.name}
                  </NoPrefetchLink>
                )}
              </li>
            ))}
          </ul>
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
