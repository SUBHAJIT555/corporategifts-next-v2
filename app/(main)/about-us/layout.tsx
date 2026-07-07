import { AboutSchema } from "@/components/schema/AboutSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Leading Corporate Gift Suppliers in Dubai",
  description:
    "Discover trusted corporate gift suppliers in Dubai. Premium corporate gifts, fast delivery, and custom branding across the UAE.",
  alternates: {
    canonical: "https://corporategiftsdubaii.ae/about-us",
  },
  openGraph: {
    title: "About Us | Leading Corporate Gift Suppliers in Dubai",
    description:
      "Discover trusted corporate gift suppliers in Dubai. Premium corporate gifts, fast delivery, and custom branding across the UAE.",
    url: "https://corporategiftsdubaii.ae/about-us",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <AboutSchema />
    {children}
  </>;
}
