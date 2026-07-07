import type { Metadata } from "next";
import { getAllProductsForStaticBuild } from "@/lib/api/woocommerce-static";

const baseDescription =
  "Shop corporate gifts in Dubai. Personalized & luxury business gifts for employees, clients & partners.";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const products = await getAllProductsForStaticBuild();
    const totalPages = Math.max(1, Math.ceil(products.length / 12));

    if (totalPages <= 1) return [];

    return Array.from({ length: totalPages - 1 }, (_, index) => ({
      page: String(index + 2),
    }));
  } catch (error) {
    console.error("Failed to generate static params for shop page layout:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);
  const safePage = !pageNumber || pageNumber < 1 ? 1 : pageNumber;

  const baseTitle =
    "Shop Corporate Gifts | Premium Corporate Gifts in Dubai | Baharnani";

  const title =
    safePage === 1
      ? baseTitle
      : `Shop Corporate Gifts – Page ${safePage} | Premium Corporate Gifts in Dubai | Baharnani`;

  const description =
    safePage === 1
      ? baseDescription
      : `${baseDescription} Browse page ${safePage} of our complete corporate gifts collection.`;

  const baseUrl = "https://corporategiftsdubaii.ae/shop";
  const url = safePage === 1 ? baseUrl : `${baseUrl}/page/${encodeURIComponent(page)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

export default function ShopPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
