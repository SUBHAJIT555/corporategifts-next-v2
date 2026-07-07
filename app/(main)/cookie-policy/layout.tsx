import { buildSiteUrl } from "@/lib/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Everything you need to know - Baharnani",
  description: "Cookie policy - Corporate Gifts",
  alternates: {
    canonical: buildSiteUrl("/cookie-policy/"),
  },
  openGraph: {
    title: "Cookie Policy",
    description: "Cookie policy - Corporate Gifts",
    url: buildSiteUrl("/cookie-policy/"),
    type: "website",
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
