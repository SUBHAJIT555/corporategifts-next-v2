import React from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { WP_ORIGIN } from "@/lib/config/site";

type NavItem = { label: string; href: string; external?: boolean };

const mainLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Products", href: "/products" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact-us" },
];

const productLinks: NavItem[] = [
  { label: "Premium Gift Sets", href: "/product-category/premium-gift-sets" },
  {
    label: "Luxury Corporate Gifts",
    href: "/product-category/luxury-corporate-gifts-dubai",
  },
  {
    label: "Apparel and Accessories",
    href: "/product-category/apparel-and-accessories",
  },
  { label: "Bags and Travel", href: "/product-category/bags-and-travel" },
  {
    label: "Office and Stationary",
    href: "/product-category/office-and-stationary",
  },
  {
    label: "Technology and Accessories",
    href: "/product-category/technology-and-accessories",
  },
  { label: "Eating and Drinking", href: "/product-category/eating-and-drinking" },
  {
    label: "Sports and Recreation",
    href: "/product-category/sports-and-recreation",
  },
  { label: "Eco Friendly", href: "/product-category/eco-friendly" },
];

const legalLinks: NavItem[] = [
  { label: "Terms & Condition", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Support", href: "mailto:hemant@baharnani.com", external: true },
];

const otherLinks: NavItem[] = [
  { label: "Blogs", href: WP_ORIGIN, external: true },
];

const linkClassName =
  "text-[#0F5C85] text-sm sm:text-base font-switzer font-medium hover:underline underline-offset-2 decoration-[#0F5C85]/40";

function LinkList({ items }: { items: NavItem[] }) {
  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      {items.map((item) => (
        <li key={item.href + item.label}>
          {item.external ? (
            <a
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                item.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className={linkClassName}
            >
              {item.label}
            </a>
          ) : (
            <NoPrefetchLink href={item.href} className={linkClassName}>
              {item.label}
            </NoPrefetchLink>
          )}
        </li>
      ))}
    </ul>
  );
}

function MapColumn({
  title,
  items,
}: {
  title: string;
  items: NavItem[];
}) {
  return (
    <section className="text-left">
      <h2 className="text-neutral-900 font-switzer font-bold uppercase tracking-[0.12em] text-xs sm:text-sm mb-6 sm:mb-8 border border-neutral-300 p-2 rounded-lg md:rounded-xl bg-neutral-100 w-fit ring ring-neutral-200 ring-offset-2">
        {title}
      </h2>
      <LinkList items={items} />
    </section>
  );
}

export default function SitemapPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pt-24 pb-20 sm:pt-28 sm:pb-24 md:pt-32 lg:pt-36 md:pb-28">
        <h1 className="text-center font-switzer font-bold text-neutral-900 text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Site Map
        </h1>

        <div
          className="mt-8 sm:mt-10 h-px w-full bg-neutral-200 max-w-4xl mx-auto"
          aria-hidden="true"
        />

        <div className="mt-12 sm:mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-14 lg:gap-10 xl:gap-16">
          <MapColumn title="Main" items={mainLinks} />
          <MapColumn title="Products" items={productLinks} />
          <MapColumn title="Legal" items={legalLinks} />
          <MapColumn title="Others" items={otherLinks} />
        </div>
      </div>
    </main>
  );
}
