import type { Metadata } from "next";
import { buildSiteUrl } from "@/lib/config/site";
import { PersonalisedGiftsBreadcrumbSchema } from "@/components/schema/PersonalisedGiftsBreadcrumbSchema";
import { PersonalisedGiftsServiceSchema } from "@/components/schema/PersonalisedGiftsServiceSchema";

const title =
  "Personalized Corporate Gifts Set in Custom Gift Boxes - Dubai and UAE";
const description =
  "Create personalised corporate gifts and custom gift boxes in Dubai for clients, employees and events. Logo branding, premium packaging and bulk support.";
const canonical = buildSiteUrl("/personalised-corporate-gifts-boxes-dubai/");

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
  },
};

export default function PersonalisedGiftsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PersonalisedGiftsBreadcrumbSchema />
      <PersonalisedGiftsServiceSchema />
      {children}
    </>
  );
}
