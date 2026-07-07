import { notFound } from "next/navigation";
import ShopClient from "@/components/shop/ShopClient";
import { getAllProductsForStaticBuild } from "@/lib/api/woocommerce-static";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  try {
    const products = await getAllProductsForStaticBuild();
    const totalPages = Math.max(1, Math.ceil(products.length / 12));

    if (totalPages <= 1) return [];

    return Array.from({ length: totalPages - 1 }, (_, index) => ({
      page: String(index + 2),
    }));
  } catch (error) {
    console.error("Failed to generate static params for shop pages:", error);
    return [];
  }
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNumber = Number(page);

  if (!pageNumber || pageNumber <= 1) {
    notFound();
  }

  return <ShopClient initialPage={pageNumber} />;
}
