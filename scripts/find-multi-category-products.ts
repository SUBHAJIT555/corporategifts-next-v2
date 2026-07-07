import { getAllProductsForStaticBuild } from "@/lib/api/woocommerce-static";
import {
  getPrimaryCategorySlug,
  getProductCategorySlugs,
} from "@/lib/productCategories";

async function main() {
  const products = await getAllProductsForStaticBuild();

  const multiCategoryProducts = products.filter(
    (product) => getProductCategorySlugs(product).length > 1,
  );

  console.log(
    `Found ${multiCategoryProducts.length} products with multiple categories\n`,
  );

  for (const product of multiCategoryProducts.slice(0, 5)) {
    const slugs = getProductCategorySlugs(product);
    const primary = getPrimaryCategorySlug(product);

    console.log({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category_slug: product.category_slug,
      categories: product.categories,
      apiPrimarySlug: product.primary_category_slug,
      apiPrimaryName: product.primary_category,
      resolvedSlugs: slugs,
      primaryCategory: primary,
      redirectsTo: slugs
        .filter((s) => s !== primary)
        .map((s) => `/shop/${s}/${product.slug}`),
    });
  }
}

main().catch(console.error);
