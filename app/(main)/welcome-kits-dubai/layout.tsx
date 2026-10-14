import type { Metadata } from "next";
import { buildSiteUrl } from "@/lib/config/site";
import { WelcomeKitsBreadcrumbSchema } from "@/components/schema/WelcomeKitsBreadcrumbSchema";
import { WelcomeKitsFaqSchema } from "@/components/schema/WelcomeKitsFaqSchema";
import { WelcomeKitsServiceSchema } from "@/components/schema/WelcomeKitsServiceSchema";

const title = "Welcome Kits in Dubai | Custom Boxes & Fast Delivery";
const description =
  "Need welcome kits in Dubai urgently? Get custom employee onboarding boxes, branded gifts and bulk welcome kits. Ask about 48-hour delivery options.";
const canonical = buildSiteUrl("/welcome-kits-dubai/");

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
  },
};

export default function WelcomeKitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WelcomeKitsBreadcrumbSchema />
      <WelcomeKitsServiceSchema />
      <WelcomeKitsFaqSchema />
      {children}
    </>
  );
}
