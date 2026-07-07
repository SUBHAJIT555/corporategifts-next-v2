import type { Metadata } from "next";
import { getCategoryPaginationStaticParamsForBuild } from "@/lib/api/woocommerce-static";
import {
  buildCategoryPaginatedMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

const CATEGORY_SLUG = "bags-and-travel";
const PER_PAGE = 12;

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getCategoryPaginationStaticParamsForBuild(CATEGORY_SLUG, PER_PAGE);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return buildCategoryPaginatedMetadata(CATEGORY_SEO["bags-and-travel"], page);
}

export default function BagsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
