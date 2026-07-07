import type { Metadata } from "next";
import { buildSiteUrl } from "@/lib/config/site";

const title =
  "Products | Premium Corporate Gifts in Dubai | Baharnani";

const description =
  "Browse corporate gift categories including tech, travel, apparel, drinkware, and eco-friendly products designed to strengthen brands across Dubai and UAE.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: buildSiteUrl("/products/"),
  },
  openGraph: {
    title,
    description,
    url: buildSiteUrl("/products/"),
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
