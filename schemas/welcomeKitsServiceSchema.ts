import { SITE_URL, buildSiteUrl } from "@/lib/config/site";

export const welcomeKitsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Welcome Kits in Dubai",
  description:
    "Need welcome kits in Dubai urgently? Get custom employee onboarding boxes, branded gifts and bulk welcome kits. Ask about 48-hour delivery options.",
  url: buildSiteUrl("/welcome-kits-dubai/"),
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
    { "@type": "City", name: "Dubai" },
    { "@type": "City", name: "Sharjah" },
    { "@type": "City", name: "Abu Dhabi" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  serviceType: "Welcome kits and custom onboarding boxes",
};
