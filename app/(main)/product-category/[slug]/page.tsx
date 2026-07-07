import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CommonHero from "@/components/ui/CommonHero";
import ProductGridClient from "@/components/common/ProductGridClient";
import { buildDynamicCategoryPaginatedMetadata } from "@/lib/categorySeo";
import {
  getAllCategorySlugsForStaticBuild,
  getCategoriesForStaticBuild,
  getCategoryPageForStaticBuild,
} from "@/lib/api/woocommerce-static";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 86400;

const PER_PAGE = 12;

const toLabel = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");

export async function generateStaticParams() {
  try {
    const slugs = await getAllCategorySlugsForStaticBuild();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Failed to generate category static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [categories, data] = await Promise.all([
    getCategoriesForStaticBuild(),
    getCategoryPageForStaticBuild(slug, 1, PER_PAGE),
  ]);

  const matchedCategory = categories.find((category) => category.slug === slug);
  const categoryName = matchedCategory?.name || toLabel(slug);
  const count = data.total || 0;

  return buildDynamicCategoryPaginatedMetadata(slug, categoryName, "1", count);
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, productData] = await Promise.all([
    getCategoriesForStaticBuild(),
    getCategoryPageForStaticBuild(slug, 1, PER_PAGE),
  ]);

  const selectedCategory = categories.find((category) => category.slug === slug);
  if (!selectedCategory) {
    notFound();
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <CommonHero
        title={`Explore ${selectedCategory.name} Corporate Gifts`}
        titlesuffix=""
        subtitle={`Discover premium ${selectedCategory.name.toLowerCase()} products, ready for bulk corporate gifting and custom branding.`}
        buttonLink={`#${slug}`}
        buttonText={`Shop ${selectedCategory.name}`}
      />
      <ProductGridClient
        title={`Explore Our ${selectedCategory.name} Collection`}
        productData={productData}
        categories={[selectedCategory]}
        selectedCategory={slug}
        id={slug}
        categorySlug={slug}
      />
    </main>
  );
}
