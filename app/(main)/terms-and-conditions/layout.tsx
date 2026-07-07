import type { Metadata } from "next";
import { buildSiteUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions - Corporate Gifts",
  alternates: {
    canonical: buildSiteUrl("/terms-and-conditions/"),
  },
  openGraph: {
    title: "Terms and Conditions",
    description: "Terms and conditions - Corporate Gifts",
    url: buildSiteUrl("/terms-and-conditions/"),
    type: "website",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
