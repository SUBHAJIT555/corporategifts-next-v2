import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { getAllProductsForStaticBuild } from "@/lib/api/woocommerce-static";
import {
  buildSecondaryCategoryRedirects,
  formatApacheShopCategoryRedirects,
} from "@/lib/productCategories";

const HTACCESS_PATH = join(process.cwd(), "public", ".htaccess");
const START_MARKER = "# SHOP_MULTI_CATEGORY_REDIRECTS_START";
const END_MARKER = "# SHOP_MULTI_CATEGORY_REDIRECTS_END";

async function main() {
  const products = await getAllProductsForStaticBuild();
  const redirects = buildSecondaryCategoryRedirects(products);
  const rules = formatApacheShopCategoryRedirects(redirects);

  const block = [
    START_MARKER,
    `# Generated ${new Date().toISOString()} — ${redirects.length} redirect(s)`,
    rules,
    END_MARKER,
  ].join("\n");

  let htaccess = readFileSync(HTACCESS_PATH, "utf8");

  const markerBlock = new RegExp(
    `${START_MARKER}[\\s\\S]*?${END_MARKER}\\n?`,
    "m",
  );

  if (markerBlock.test(htaccess)) {
    htaccess = htaccess.replace(markerBlock, `${block}\n`);
  } else {
    throw new Error(
      `Missing ${START_MARKER} / ${END_MARKER} markers in public/.htaccess`,
    );
  }

  writeFileSync(HTACCESS_PATH, htaccess, "utf8");

  console.log(
    `Updated public/.htaccess with ${redirects.length} secondary shop category redirect(s).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
