import { buildSiteUrl } from "@/lib/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Baharnani Corporate Gifts",
  description: "Learn how we protect your data and privacy. Read our privacy policy for details on data collection, usage, and security.",
  alternates: {
    canonical: buildSiteUrl("/privacy-policy/"),
  },
  openGraph: {
    title: "Privacy Policy | Baharnani Corporate Gifts",
    description: "Learn how we protect your data and privacy. Read our privacy policy for details on data collection, usage, and security.",
    url: buildSiteUrl("/privacy-policy/"),
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
