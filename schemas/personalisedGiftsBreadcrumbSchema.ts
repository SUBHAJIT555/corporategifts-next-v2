import { buildSiteUrl } from "@/lib/config/site";

export const personalisedGiftsBreadcrumbSchema = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Homepage",
      item: buildSiteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Personalised Corporate Gifts & Custom Gift Boxes",
      item: buildSiteUrl("/personalised-corporate-gifts-boxes-dubai/"),
    },
  ],
};
