import { SITE_URL, buildSiteUrl } from "@/lib/config/site";

export const personalisedGiftsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Personalised Corporate Gifts & Custom Gift Boxes in Dubai",
  description:
    "Create personalised corporate gifts and custom gift boxes in Dubai for clients, employees and events. Logo branding, premium packaging and bulk support.",
  url: buildSiteUrl("/personalised-corporate-gifts-boxes-dubai/"),
  provider: {
    "@type": "LocalBusiness",
    name: "Baharnani Advertising LLC",
    url: `${SITE_URL}/`,
    telephone: "+971556545950",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Baharnani Advertising L.L.C, Al Quoz – Al Quoz 3 – Dubai",
      addressLocality: "Dubai",
      postalCode: "49757",
      addressCountry: "AE",
    },
  },
  areaServed: [
    {
      "@type": "City",
      name: "Dubai",
    },
    {
      "@type": "Country",
      name: "United Arab Emirates",
    },
  ],
  serviceType: "Personalised corporate gifts and custom gift boxes",
};
