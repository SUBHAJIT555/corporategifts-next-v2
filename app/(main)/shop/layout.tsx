import type { Metadata } from "next";

const baseDescription =
  "Shop corporate gifts in Dubai. Personalized & luxury business gifts for employees, clients & partners.";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Corporate Gifts Shop in Dubai | Premium Gift Collection";

  return {
    title,
    description: baseDescription,
    alternates: {
      canonical: "https://corporategiftsdubaii.ae/shop",
    },
    openGraph: {
      title,
      description: baseDescription,
      url: "https://corporategiftsdubaii.ae/shop",
      type: "website",
    },
  };
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
