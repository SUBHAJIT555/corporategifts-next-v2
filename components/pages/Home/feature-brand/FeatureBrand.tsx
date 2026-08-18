import FeatureBrandClient from "./FeatureBrandClient";
import type { Product } from "@/lib/api/types";
import { ProductsApi } from "@/lib/api/endpoints";
import { getAllProducts } from "@/lib/build-cache";

export const dynamic = "force-static";

const FEATURED_COUNT = 48;

function takeProducts(list: Product[] | undefined, count: number) {
  return (Array.isArray(list) ? list : []).slice(0, count);
}

export default async function FeatureBrand() {
  let brands: Product[] = [];

  try {
    const brandsData = await ProductsApi.all({
      query: { featured: 1, per_page: FEATURED_COUNT, page: 1 },
    });
    brands = takeProducts(brandsData?.products, FEATURED_COUNT);
  } catch (error) {
    console.error("Failed to load featured brand products:", error);
  }

  if (brands.length === 0) {
    try {
      brands = takeProducts(await getAllProducts(), FEATURED_COUNT);
    } catch (error) {
      console.error("Failed to load featured brands from build cache:", error);
    }
  }

  return <FeatureBrandClient brands={brands} />;
}
