import { TAABreadCrumbStructureSchema } from "@/components/schema/TAABreadCrumbStructureSchema";
import type { Metadata } from "next";
import {
  buildCategoryPageOneMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

export const metadata: Metadata = buildCategoryPageOneMetadata(
  CATEGORY_SEO["technology-and-accessories"],
);

export default function TechnologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TAABreadCrumbStructureSchema />
      {children}
    </>
  );
}
