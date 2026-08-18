import TopSaverClient from "./TopSaverSClient";
import type { Product } from "@/lib/api/types";
import { ProductsApi } from "@/lib/api/endpoints";
import { getAllProducts } from "@/lib/build-cache";

export const dynamic = "force-static";

const TOP_SAVER_COUNT = 18;

function takeProducts(list: Product[] | undefined, count: number) {
  return (Array.isArray(list) ? list : []).slice(0, count);
}

export default async function TopSaver() {
  let products: Product[] = [];

  try {
    products = takeProducts(await ProductsApi.random(), TOP_SAVER_COUNT);
  } catch (error) {
    console.error("Failed to load top saver random products:", error);
  }

  if (products.length === 0) {
    try {
      products = takeProducts(await getAllProducts(), TOP_SAVER_COUNT);
    } catch (error) {
      console.error("Failed to load top saver products from build cache:", error);
    }
  }

  return <TopSaverClient products={products} />;
}
