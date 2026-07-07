"use client";

import { AlignJustify, X, ChevronDown, ChevronUp } from "lucide-react";
import logo from "@/public/logo.svg";
import { useState, useEffect, useRef } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    if (!isMenuOpen) {
      setTimeout(() => setIsMobileProductsOpen(false), 100);
    }
  }, [isMenuOpen]);

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

  const menuItems = [
    { key: 1, name: "Home", href: "/" },
    { key: 2, name: "About", href: "/about-us" },
    { key: 3, name: "Products", href: "/products", hasDropdown: true },
    { key: 4, name: "Shop", href: "/shop" },
    { key: 5, name: "Blog", href: "https://corporategiftsdubaii.ae/blog" },
    { key: 6, name: "Contact", href: "/contact-us" },
  ];

  const productCategories = [
    { id: "1", title: "Premium gift sets", link: "/product-category/premium-gift-sets" },
    { id: "2", title: "Luxury corporate gifts", link: "/product-category/luxury-corporate-gifts-dubai" },
    { id: "3", title: "Apparel and accessories", link: "/product-category/apparel-and-accessories" },
    { id: "4", title: "Bags and travel", link: "/product-category/bags-and-travel" },
    { id: "5", title: "Office and stationary", link: "/product-category/office-and-stationary" },
    { id: "6", title: "Technology and accessories", link: "/product-category/technology-and-accessories" },
    { id: "7", title: "Eating and drinking", link: "/product-category/eating-and-drinking" },
    { id: "8", title: "Sports and recreation", link: "/product-category/sports-and-recreation" },
    { id: "9", title: "Eco friendly", link: "/product-category/eco-friendly" },
  ];

  return (
    <>
      <div className="flex justify-center w-full overflow-x-hidden">
        <nav className="fixed top-0 w-11/12 mx-auto xl:w-full z-30 max-w-full">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4 rounded-xl mt-4 bg-white/10 backdrop-blur-sm">

            <NoPrefetchLink href="/">
              <Image width={160} height={160} src={logo} alt="Corporate Gifts Dubai" className="w-40" />
            </NoPrefetchLink>

            {/* Desktop */}
            <ul className="hidden lg:flex space-x-8 list-none">
              {menuItems.map((item) => (
                <li
                  key={item.key}
                  className="relative text-xl font-sentient text-[#0F5C85] font-semibold hover:text-[#A8DDF0] transition-all duration-200 group"
                >
                  {item.hasDropdown ? (
                    <div
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => setIsProductsDropdownOpen(true)}
                      onMouseLeave={() => setIsProductsDropdownOpen(false)}
                    >
                      <div className="flex items-center gap-1 cursor-pointer">
                        <NoPrefetchLink href={item.href}>{item.name}</NoPrefetchLink>
                        {isProductsDropdownOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>

                      {/* borders */}
                      <span className="absolute top-0 left-0 w-0 h-px bg-[#0F5C85] transition-all duration-300 group-hover:w-full"></span>
                      <span className="absolute bottom-0 right-0 w-0 h-px bg-[#0F5C85] transition-all duration-300 group-hover:w-full"></span>

                      {/* Dropdown */}
                      <div
                        className={`
                          absolute top-full left-0 mt-2 w-64
                          bg-white rounded-2xl shadow-xl border border-neutral-300
                          ring ring-neutral-300 ring-offset-2 overflow-hidden z-50
                          transition-all duration-200 ease-out
                          ${isProductsDropdownOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-2 pointer-events-none"}
                        `}
                      >
                        <ul className="py-2">
                          {productCategories.map((category) => (
                            <li key={category.id}>
                              <NoPrefetchLink
                                href={category.link}
                                className="block px-4 py-2 text-neutral-800 hover:bg-neutral-100 border-y border-neutral-100 hover:text-[#0F5C85] transition-colors text-base"
                              >
                                {category.title}
                              </NoPrefetchLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : item.name === "Blog" ? (
                    <a href={item.href}>{item.name}</a>
                  ) : (
                    <NoPrefetchLink href={item.href}>{item.name}</NoPrefetchLink>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile toggle */}
            {isMenuOpen ? (
              <X onClick={() => setIsMenuOpen(false)} className="w-6 h-6 cursor-pointer lg:hidden" />
            ) : (
              <AlignJustify onClick={() => setIsMenuOpen(true)} className="w-6 h-6 cursor-pointer lg:hidden" />
            )}
          </div>
        </nav>
      </div>

      {/* Mobile panel */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-white shadow-xl rounded-t-3xl border border-neutral-300
          overflow-y-auto transition-transform duration-500 ease-in-out
          ${isMenuOpen ? "translate-y-0" : "translate-y-full"}
        `}
        style={{ height: "calc(100dvh - 15dvh)" }}
      >
        <div className="flex flex-col items-center py-8 px-4">
          <ul className="space-y-8 text-center w-full">
            {menuItems.map((item) => (
              <li key={item.key} className="transition-transform duration-200 hover:scale-110 active:scale-95">
                {item.hasDropdown ? (
                  <>
                    <div className="flex justify-center items-center gap-2">
                      <NoPrefetchLink href={item.href}>{item.name}</NoPrefetchLink>
                      <button onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}>
                        {isMobileProductsOpen ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>

                    <ul
                      className={`
                        mt-4 space-y-4 overflow-hidden border-y border-neutral-300 p-4
                        transition-all duration-300
                        ${isMobileProductsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                      `}
                    >
                      {productCategories.map((category) => (
                        <li key={category.id}>
                          <NoPrefetchLink href={category.link}>{category.title}</NoPrefetchLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NoPrefetchLink href={item.href}>{item.name}</NoPrefetchLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;