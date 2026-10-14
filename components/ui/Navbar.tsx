import {
  AlignJustify,
  X,
  ChevronDown,
  ChevronUp,
  Gift,
  Gem,
  Shirt,
  Briefcase,
  NotebookPen,
  Laptop,
  CupSoda,
  Dumbbell,
  Leaf,
  House,
  Package,
  Building2,
  Newspaper,
  Mail,
  Phone,
} from "lucide-react";
import logo from "@/public/logo.svg"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, type SVGProps } from "react";
import { usePathname } from "next/navigation";
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
  candyContactButtonClasses,
} from "./candy-button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utilts";

/** Tabler-style message/chat icon for Contact CTAs */
const MessageIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
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
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 9h8" />
    <path d="M8 13h6" />
    <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12" />
  </svg>
);

type MenuItem = {
  key: number;
  name: string;
  href: string;
};

/** Strip trailing slash except for root. */
const normalizePath = (pathname: string) => {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
};

const pathMatchesPrefix = (path: string, prefix: string) =>
  path === prefix || path.startsWith(`${prefix}/`);

/**
 * Active matching for the top-level links:
 * - Shop: `/shop` + nested
 * - Products: `/products` + nested
 */
const isMenuItemActive = (name: string, pathname: string) => {
  const path = normalizePath(pathname);

  switch (name) {
    case "Shop":
      return pathMatchesPrefix(path, "/shop");
    case "Products":
      return pathMatchesPrefix(path, "/products");
    default:
      return false;
  }
};

/** Categories dropdown: `/product-category` + nested */
const isCategoriesActive = (pathname: string) =>
  pathMatchesPrefix(normalizePath(pathname), "/product-category");

/** Company dropdown is current on any page listed inside it. */
const isCompanyActive = (pathname: string) => {
  const path = normalizePath(pathname);

  return (
    path === "/" ||
    pathMatchesPrefix(path, "/personalised-corporate-gifts-boxes-dubai") ||
    pathMatchesPrefix(path, "/welcome-kits-dubai") ||
    pathMatchesPrefix(path, "/about-us") ||
    pathMatchesPrefix(path, "/blog") ||
    pathMatchesPrefix(path, "/contact-us")
  );
};

const DESKTOP_NAV_LINK_CLASSES =
  "inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft";

const ACTIVE_UNDERLINE_CLASSES =
  "underline decoration-2 decoration-brand-accent underline-offset-[6px]";

const MOBILE_NAV_LINK_CLASSES =
  "block py-4 text-lg font-medium text-ink transition-colors active:text-muted";

const MENU_ITEMS: MenuItem[] = [
  { key: 1, name: "Shop", href: "/shop" },
  { key: 2, name: "Products", href: "/products" },
];

const COMPANY_LINKS: NavbarProductCategory[] = [
  {
    id: "home",
    title: "Home",
    link: "/",
    description: "Corporate gifts in Dubai",
    iconColor: "#C1D8FD",
    Icon: House,
  },
  {
    id: "gift-sets",
    title: "Gift sets",
    link: "/personalised-corporate-gifts-boxes-dubai",
    description: "Personalised boxes and sets",
    iconColor: "#FFD6F8",
    Icon: Gift,
  },
  {
    id: "welcome-kits",
    title: "Welcome Kits",
    link: "/welcome-kits-dubai",
    description: "Custom onboarding kits",
    iconColor: "#FFF8E1",
    Icon: Package,
  },
  {
    id: "about",
    title: "About",
    link: "/about-us",
    description: "About Baharnani",
    iconColor: "#EDE7F6",
    Icon: Building2,
  },
  {
    id: "blog",
    title: "Blog",
    link: buildSiteUrl("/blog"),
    description: "Guides and updates",
    iconColor: "#FFE5EC",
    Icon: Newspaper,
    external: true,
  },
  {
    id: "contact",
    title: "Contact",
    link: "/contact-us",
    description: "Send an enquiry",
    iconColor: "#E0F7FA",
    Icon: Mail,
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    link: getWhatsAppUrl(),
    description: "Message the team",
    iconColor: "#B6E9C8",
    Icon: Phone,
    external: true,
    newTab: true,
  },
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
  const pathname = usePathname() ?? "/";
  const categoriesActive = isCategoriesActive(pathname);
  const companyActive = isCompanyActive(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
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
        setIsMobileCompanyOpen(false);
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

  const toggleMobileCompany = useCallback(() => {
    setIsMobileCompanyOpen((prev) => !prev);
  }, []);

  const handleMobileCategoryClick = useCallback(() => {
    setIsMobileProductsOpen(false);
    setIsMobileCompanyOpen(false);
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      {/* Top navigation — cal.com style: white/translucent canvas, hairline border */}
      <nav className="fixed top-0 inset-x-0 z-30 w-full max-w-full border-b border-hairline bg-canvas/80 backdrop-blur-md supports-backdrop-filter:bg-canvas/70">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-5 sm:px-6">
          <div className="mr-auto shrink-0">
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

          <ul className="hidden shrink-0 list-none items-center gap-0.5 lg:flex">
            {MENU_ITEMS.map((item) => {
              const itemActive = isMenuItemActive(item.name, pathname);

              return (
                <li
                  key={item.key}
                  className={cn(
                    "relative",
                    item.name === "Products" && "flex items-center gap-0.5",
                  )}
                >
                  {item.name === "Products" ? (
                    <CategoriesDropdown
                      categories={PRODUCT_CATEGORIES}
                      onCloseMenu={closeMenu}
                      isActive={categoriesActive}
                    />
                  ) : null}
                  <NoPrefetchLink
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={itemActive ? "page" : undefined}
                    className={cn(
                      DESKTOP_NAV_LINK_CLASSES,
                      itemActive && ACTIVE_UNDERLINE_CLASSES,
                    )}
                  >
                    {item.name}
                  </NoPrefetchLink>
                </li>
              );
            })}
            <li className="relative">
              <CategoriesDropdown
                label="Company"
                categories={COMPANY_LINKS}
                onCloseMenu={closeMenu}
                isActive={companyActive}
              />
            </li>
          </ul>

          <div className="ml-3 hidden items-center gap-2 lg:flex xl:ml-5 xl:gap-2.5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                SEARCH_TRIGGER_CLASSES,
                "size-10 justify-center px-0 xl:h-10 xl:w-auto xl:min-w-55 xl:justify-start xl:px-3",
              )}
              aria-label="Open search"
            >
              <LuSearch className="size-4 shrink-0 text-muted" />
              <span className="hidden truncate xl:inline">Search products...</span>
            </button>
            <NoPrefetchLink
              href="/contact-us"
              onClick={closeMenu}
              className={candyContactButtonClasses("group h-10 gap-2 px-4")}
            >
              Contact
              <MessageIcon className="w-3.5 h-3.5" />
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
              className="inline-flex size-10 shrink-0 items-center justify-center text-ink"
            >
              {isMenuOpen ? (
                <X className="size-5" strokeWidth={2} />
              ) : (
                <AlignJustify className="size-5" strokeWidth={2} />
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
            <li className="w-full">
              <NoPrefetchLink
                href="/shop"
                onClick={closeMenu}
                aria-current={isMenuItemActive("Shop", pathname) ? "page" : undefined}
                className={cn(
                  MOBILE_NAV_LINK_CLASSES,
                  isMenuItemActive("Shop", pathname) && ACTIVE_UNDERLINE_CLASSES,
                )}
              >
                Shop
              </NoPrefetchLink>
            </li>
            <li className="w-full">
              <button
                type="button"
                onClick={toggleMobileProducts}
                aria-expanded={isMobileProductsOpen}
                aria-controls="mobile-product-categories"
                aria-current={categoriesActive ? "page" : undefined}
                className="flex w-full items-center justify-between gap-3 py-4 text-left transition-colors active:text-muted"
              >
                <span
                  className={cn(
                    "text-lg font-medium text-ink",
                    categoriesActive && ACTIVE_UNDERLINE_CLASSES,
                  )}
                >
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
            <li className="w-full">
              <NoPrefetchLink
                href="/products"
                onClick={closeMenu}
                aria-current={
                  isMenuItemActive("Products", pathname) ? "page" : undefined
                }
                className={cn(
                  MOBILE_NAV_LINK_CLASSES,
                  isMenuItemActive("Products", pathname) &&
                    ACTIVE_UNDERLINE_CLASSES,
                )}
              >
                Products
              </NoPrefetchLink>
            </li>
            <li className="w-full">
              <button
                type="button"
                onClick={toggleMobileCompany}
                aria-expanded={isMobileCompanyOpen}
                aria-controls="mobile-company-links"
                aria-current={companyActive ? "page" : undefined}
                className="flex w-full items-center justify-between gap-3 py-4 text-left transition-colors active:text-muted"
              >
                <span
                  className={cn(
                    "text-lg font-medium text-ink",
                    companyActive && ACTIVE_UNDERLINE_CLASSES,
                  )}
                >
                  Company
                </span>
                {isMobileCompanyOpen ? (
                  <ChevronUp className="size-5 shrink-0 text-muted" />
                ) : (
                  <ChevronDown className="size-5 shrink-0 text-muted" />
                )}
              </button>
              <AnimatePresence>
                {isMobileCompanyOpen && (
                  <motion.ul
                    id="mobile-company-links"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pb-3"
                  >
                    {COMPANY_LINKS.map((item) => (
                      <li key={item.id}>
                        {item.external ? (
                          <a
                            href={item.link}
                            onClick={handleMobileCategoryClick}
                            {...(item.newTab
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="block rounded-lg px-3 py-2.5 text-base font-medium text-body transition-colors hover:bg-surface-card hover:text-ink"
                          >
                            {item.title}
                          </a>
                        ) : (
                          <NoPrefetchLink
                            href={item.link}
                            onClick={handleMobileCategoryClick}
                            className="block rounded-lg px-3 py-2.5 text-base font-medium text-body transition-colors hover:bg-surface-card hover:text-ink"
                          >
                            {item.title}
                          </NoPrefetchLink>
                        )}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <NoPrefetchLink
            href="/contact-us"
            onClick={closeMenu}
            className={candyContactButtonClasses("mt-6 h-12 w-full text-base")}
          >
            Contact
            <MessageIcon className="w-4 h-4" />
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
