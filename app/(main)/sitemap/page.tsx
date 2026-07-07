"use client";

import { Map } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import SectionDivider from "@/components/ui/SectionDivider";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
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
  "text-body-md font-medium text-brand-accent hover:underline underline-offset-2 decoration-brand-accent/40";

function SitemapLink({ item }: { item: NavItem }) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith("mailto:") ? undefined : "_blank"}
        rel={
          item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
        }
        className={linkClassName}
      >
        {item.label}
      </a>
    );
  }

  return (
    <NoPrefetchLink href={item.href} className={linkClassName}>
      {item.label}
    </NoPrefetchLink>
  );
}

function LinkList({ items }: { items: NavItem[] }) {
  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      {items.map((item) => (
        <li key={item.href + item.label}>
          <SitemapLink item={item} />
        </li>
      ))}
    </ul>
  );
}

function MapColumn({
  title,
  items,
  animationNum,
}: {
  title: string;
  items: NavItem[];
  animationNum: number;
}) {
  return (
    <Reveal animationNum={animationNum}>
      <section className="text-left">
        <h2 className="mb-6 text-caption font-medium uppercase tracking-[0.12em] text-ink sm:mb-8">
          {title}
        </h2>
        <LinkList items={items} />
      </section>
    </Reveal>
  );
}

const columns = [
  { title: "Main", items: mainLinks },
  { title: "Products", items: productLinks },
  { title: "Legal", items: legalLinks },
  { title: "Others", items: otherLinks },
] as const;

export default function SitemapPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <section className="w-full bg-canvas">
        <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 pt-24 pb-3 sm:px-6 sm:pt-28 sm:pb-4 lg:pt-32 lg:pb-6">
          <Reveal animationNum={0} className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
              <Map className="h-3.5 w-3.5 text-brand-accent" />
              Navigation
            </span>
            <h1 className="mt-4 text-display-md text-ink">Site Map</h1>
            <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
              Browse all pages on Baharnani Corporate Gifts — main navigation,
              product categories, legal information, and more.
            </p>
          </Reveal>
        </RevealSection>
      </section>

      <SectionDivider />

      <section className="w-full bg-canvas">
        <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
            {columns.map((column, index) => (
              <MapColumn
                key={column.title}
                title={column.title}
                items={[...column.items]}
                animationNum={index + 1}
              />
            ))}
          </div>
        </RevealSection>
      </section>

      <SectionDivider />
    </main>
  );
}
