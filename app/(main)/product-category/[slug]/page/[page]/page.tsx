import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
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
  const params: { slug: string; page: string }[] = [];

  try {
    const slugs = await getAllCategorySlugsForStaticBuild();
    for (const slug of slugs) {
      const firstPage = await getCategoryPageForStaticBuild(slug, 1, PER_PAGE);
      const totalPages = firstPage.total_pages || 1;

      for (let page = 1; page <= totalPages; page += 1) {
        params.push({ slug, page: String(page) });
      }
    }
  } catch (error) {
    console.error("Failed to generate paginated category static params:", error);
    return [];
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}): Promise<Metadata> {
  const { slug, page } = await params;
  const pageNumber = Number(page);

  if (!pageNumber || pageNumber <= 1) {
    return {};
  }

  const [categories, data] = await Promise.all([
    getCategoriesForStaticBuild(),
    getCategoryPageForStaticBuild(slug, pageNumber, PER_PAGE),
  ]);

  const matchedCategory = categories.find((category) => category.slug === slug);
  const categoryName = matchedCategory?.name || toLabel(slug);
  const count = data.total || 0;

  return buildDynamicCategoryPaginatedMetadata(
    slug,
    categoryName,
    String(pageNumber),
    count,
  );
}

export default async function ProductCategoryPaginatedPage({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}) {
  const { slug, page } = await params;
  const pageNumber = Number(page);

  if (pageNumber === 1) {
    redirect(`/product-category/${slug}`);
  }

  if (!pageNumber || pageNumber < 1) {
    notFound();
  }

  const [categories, productData] = await Promise.all([
    getCategoriesForStaticBuild(),
    getCategoryPageForStaticBuild(slug, pageNumber, PER_PAGE),
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
        subtitle={`Page ${pageNumber} of our ${selectedCategory.name.toLowerCase()} collection for corporate gifting and custom branding.`}
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
