import { notFound, permanentRedirect } from "next/navigation";
import {
  getAllProductsForStaticBuild,
  getProductBySlugForStaticBuild,
} from "@/lib/api/woocommerce-static";
import { slugForApi, slugFromApi } from "@/lib/exportSlug";
import {
  getPrimaryCategorySlug,
  getProductShopPath,
} from "@/lib/productCategories";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 86400;

/**
 * Legacy /product/{slug}/ URLs (present in OLD project).
 * 301 to the primary /shop/{category}/{slug}/ URL to avoid 404s and duplicates.
 */
export async function generateStaticParams() {
  try {
    const products = await getAllProductsForStaticBuild();
    return products.map((product) => ({
      slug: slugFromApi(product.slug),
    }));
  } catch (error) {
    console.error("Failed to generate /product/[slug] static params:", error);
    return [];
  }
}

export default async function LegacyProductSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlugForStaticBuild(slugForApi(slug));

  if (!product) {
    notFound();
  }

  permanentRedirect(
    getProductShopPath(product, getPrimaryCategorySlug(product)),
  );
}
