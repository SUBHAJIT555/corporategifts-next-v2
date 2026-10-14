import { buildSiteUrl } from "@/lib/config/site";

export const welcomeKitsBreadcrumbSchema = {
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
      name: "Welcome Kits in Dubai",
      item: buildSiteUrl("/welcome-kits-dubai/"),
    },
  ],
};
