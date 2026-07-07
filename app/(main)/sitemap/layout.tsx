import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Site Map | Baharnani Corporate Gifts",
  description:
    "Browse all pages on Baharnani Corporate Gifts: main navigation, product categories, legal information, and more.",
  alternates: {
    canonical: `${SITE_URL}/sitemap`,
  },
  openGraph: {
    title: "Site Map | Baharnani Corporate Gifts",
    description:
      "Browse all pages on Baharnani Corporate Gifts: main navigation, product categories, legal information, and more.",
    url: `${SITE_URL}/sitemap`,
  },
};

export default function SitemapPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
