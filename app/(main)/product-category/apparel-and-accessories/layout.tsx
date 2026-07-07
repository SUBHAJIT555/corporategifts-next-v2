import type { Metadata } from "next";
import { AAABreadCrumbStructureSchema } from "@/components/schema/AAABreadCrumbStructureSchema";
import {
  buildCategoryPageOneMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

export const metadata: Metadata = buildCategoryPageOneMetadata(
  CATEGORY_SEO["apparel-and-accessories"],
);

export default function ApparelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AAABreadCrumbStructureSchema />
      {children}
    </>
  );
}
