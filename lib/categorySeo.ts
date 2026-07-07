import type { Metadata } from "next";
import { buildSiteUrl } from "@/lib/config/site";

export type CategorySeoConfig = {
  slug: string;
  titleName: string;
  baseDescription: string;
  collectionLabel: string;
  /**
   * Page 2+ description suffix. Use `{page}` as the page number placeholder.
   * When omitted, falls back to the default premium collection copy.
   */
  paginatedBrowseSuffix?: string;
};

export const CATEGORY_SEO: Record<string, CategorySeoConfig> = {
  "eco-friendly": {
    slug: "eco-friendly",
    titleName: "Eco Friendly Sustainable Corporate Gifts in Dubai",
    baseDescription:
      "Promote sustainability with eco-friendly corporate gifts in Dubai, including bamboo, cork, and recycled products.",
    collectionLabel: "eco-friendly products",
  },
  "apparel-and-accessories": {
    slug: "apparel-and-accessories",
    titleName: "Corporate Apparel & Accessories in Dubai",
    baseDescription:
      "Shop corporate apparel and accessories in Dubai featuring branded shirts, uniforms, caps, and workwear.",
    collectionLabel: "apparel and accessories",
    paginatedBrowseSuffix:
      "Browse page {page} for premium business branding solutions.",
  },
  "bags-and-travel": {
    slug: "bags-and-travel",
    titleName: "Bags and Travel Corporate Gifts in Dubai",
    baseDescription:
      "Shop travel bags, backpacks, luggage, and travel accessories for corporate gifting in Dubai.",
    collectionLabel: "bags and travel accessories",
    paginatedBrowseSuffix:
      "Browse page {page} for premium branded business travel solutions.",
  },
  "eating-and-drinking": {
    slug: "eating-and-drinking",
    titleName: "Eating and Drinking Corporate Gifts in Dubai",
    baseDescription:
      "Corporate drinkware & lunchware gifts in Dubai. Branded bottles, mugs, & tumblers for business gifting.",
    collectionLabel: "eating and drinking products",
    paginatedBrowseSuffix: "Browse page {page} of our collection today.",
  },
  "office-and-stationary": {
    slug: "office-and-stationary",
    titleName: "Office and Stationary Corporate Gifts in Dubai",
    baseDescription:
      "Custom office stationery & notebooks for corporate gifting. Premium pens, diaries & sets in Dubai.",
    collectionLabel: "office and stationary",
  },
  "technology-and-accessories": {
    slug: "technology-and-accessories",
    titleName: "Technology and Accessories Corporate Gifts in Dubai",
    baseDescription:
      "Shop premium tech gifts in Dubai – power banks, speakers, chargers & more. Ideal for corporate gifting.",
    collectionLabel: "technology and accessories",
  },
  "sports-and-recreation": {
    slug: "sports-and-recreation",
    titleName: "Sports and Recreation Corporate Gifts in Dubai",
    baseDescription:
      "High-quality sports & recreation corporate gifts for wellness programs, team building, and client engagement across Dubai and the UAE.",
    collectionLabel: "sports and recreation",
  },
  "luxury-corporate-gifts-dubai": {
    slug: "luxury-corporate-gifts-dubai",
    titleName: "Luxury Corporate Gifts in Dubai",
    baseDescription:
      "Premium luxury corporate gifts in Dubai including executive gifts, branded hampers, and customized solutions for clients, partners, and corporate events.",
    collectionLabel: "luxury corporate gifts",
  },
  "premium-gift-sets": {
    slug: "premium-gift-sets",
    titleName:
      "Premium Corporate Gifts Dubai | Executive Gift Sets - Baharnani",
    baseDescription:
      "Shop premium corporate gift sets in Dubai featuring executive gifts, luxury hampers, and branded solutions for clients, employees, and business events.",
    collectionLabel: "gift sets",
  },
};

function parsePage(pageParam: string) {
  const page = Number.parseInt(pageParam, 10);
  return Number.isNaN(page) || page < 1 ? 1 : page;
}

/** Page 2+ browse line appended to the category meta description. */
export function buildCategoryPaginatedBrowseSuffix(
  config: CategorySeoConfig,
  actualPage: number,
): string {
  if (config.paginatedBrowseSuffix) {
    return config.paginatedBrowseSuffix.replace(
      /\{page\}/g,
      String(actualPage),
    );
  }

  return `Browse page ${actualPage} of our premium ${config.collectionLabel} products collection.`;
}

export function buildCategoryPaginatedMetadata(
  config: CategorySeoConfig,
  pageParam: string,
): Metadata {
  const actualPage = parsePage(pageParam);

  const title =
    actualPage === 1
      ? `${config.titleName}`
      : `${config.titleName} – Page ${actualPage}`;

  const description =
    actualPage === 1
      ? config.baseDescription
      : `${config.baseDescription} ${buildCategoryPaginatedBrowseSuffix(config, actualPage)}`;

  const canonical =
    actualPage === 1
      ? buildSiteUrl(`/product-category/${config.slug}`)
      : buildSiteUrl(`/product-category/${config.slug}/page/${actualPage}`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
  };
}

export function buildCategoryPageOneMetadata(
  config: CategorySeoConfig,
): Metadata {
  return buildCategoryPaginatedMetadata(config, "1");
}

export function buildDynamicCategoryPaginatedMetadata(
  slug: string,
  categoryName: string,
  pageParam: string,
  productCount?: number,
): Metadata {
  const config: CategorySeoConfig = {
    slug,
    titleName: `${categoryName} Corporate Gifts in Dubai`,
    baseDescription:
      productCount !== undefined
        ? `Browse ${productCount} corporate gifts in ${categoryName}. Premium branded solutions for businesses in Dubai and across the UAE.`
        : `Browse corporate gifts in ${categoryName}. Premium branded solutions for businesses in Dubai and across the UAE.`,
    collectionLabel: categoryName.toLowerCase(),
  };

  return buildCategoryPaginatedMetadata(config, pageParam);
}
