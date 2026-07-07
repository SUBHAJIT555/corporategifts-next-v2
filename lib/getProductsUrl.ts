import { Product } from "./api/types";
import {
  getPrimaryCategorySlug,
  getProductCanonicalUrl,
  getProductShopPath,
} from "./productCategories";

/**
 * Internal product link using the primary category (consistent SEO target).
 */
export function getProductUrl(product: Product): string {
  return getProductShopPath(product, getPrimaryCategorySlug(product));
}

export { getProductCanonicalUrl };
