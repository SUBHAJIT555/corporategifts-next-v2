import type { Metadata } from "next";
import { getCategoryPaginationStaticParamsForBuild } from "@/lib/api/woocommerce-static";
import {
  buildCategoryPaginatedMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

const CATEGORY_SLUG = "eating-and-drinking";
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
  const metadata = buildCategoryPaginatedMetadata(
    CATEGORY_SEO["eating-and-drinking"],
    page,
  );

  const pageNumber = Number.parseInt(page, 10);
  const actualPage = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
  const requestedTitle =
    actualPage === 1
      ? CATEGORY_SEO["eating-and-drinking"].titleName
      : `${CATEGORY_SEO["eating-and-drinking"].titleName} – Page ${actualPage}`;

  return {
    ...metadata,
    title: requestedTitle,
    openGraph: {
      ...metadata.openGraph,
      title: requestedTitle,
    },
  };
}

export default function EatingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
