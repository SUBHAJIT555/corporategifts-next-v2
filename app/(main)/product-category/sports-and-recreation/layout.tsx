import type { Metadata } from "next";
import { SARBreadCrumbStructureSchema } from "@/components/schema/SARBreadCrumbStructureSchema";
import {
  buildCategoryPageOneMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

export const metadata: Metadata = buildCategoryPageOneMetadata(
  CATEGORY_SEO["sports-and-recreation"],
);
export default function SportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SARBreadCrumbStructureSchema />
      {children}
    </>
  );
}
