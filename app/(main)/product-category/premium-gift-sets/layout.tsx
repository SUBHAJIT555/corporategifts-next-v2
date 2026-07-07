import type { Metadata } from "next";
import { PGSBreadCrumbStructureSchema } from "@/components/schema/PGSBreadCrumbStructureSchema";
import {
  buildCategoryPageOneMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

export const metadata: Metadata = buildCategoryPageOneMetadata(
  CATEGORY_SEO["premium-gift-sets"],
);

export default function GiftSetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PGSBreadCrumbStructureSchema />
      {children}
    </>);
}
