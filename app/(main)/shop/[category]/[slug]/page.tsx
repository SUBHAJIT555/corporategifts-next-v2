import { notFound, permanentRedirect } from "next/navigation";
import ProductDetailsClient from "@/components/shop/ProductDetailsClient";
import {
  getAllProductsForStaticBuild,
  getProductBySlugForStaticBuild,
} from "@/lib/api/woocommerce-static";
import { slugForApi } from "@/lib/exportSlug";
import {
  buildShopProductStaticParams,
  getPrimaryCategorySlug,
  getProductShopPath,
  shouldRedirectToPrimaryCategory,
} from "@/lib/productCategories";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 86400;

async function resolveProduct(slug: string) {
  return getProductBySlugForStaticBuild(slugForApi(slug));
}

/**
 * Pre-render /shop/{category}/{slug} for every WooCommerce category on each product.
 * Deduplicates (category, slug) pairs so output: "export" includes all valid URLs.
 */
export async function generateStaticParams() {
  try {
    const products = await getAllProductsForStaticBuild();
    return buildShopProductStaticParams(products);
  } catch (error) {
    console.error(
      "Failed to generate static params for product details:",
      error,
    );
    return [];
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product = await resolveProduct(slug);

  if (!product) {
    notFound();
  }

  /**
   * Option A (301): non-primary category URLs redirect to the primary category URL.
   * Works at build time for static export (Next emits redirect metadata).
   * On pure Apache static hosting, also add rules from buildSecondaryCategoryRedirects()
   * or rely on Option B (canonical) in layout metadata.
   */
  if (shouldRedirectToPrimaryCategory(product, category)) {
    permanentRedirect(getProductShopPath(product, getPrimaryCategorySlug(product)));
  }

  return (
    <ProductDetailsClient
      product={product}
      category={category}
      isLoading={false}
      errorMessage={null}
    />
  );
}
