import { LCGBreadCrumbStructureSchema } from "@/components/schema/LCGBreadCrumbStructureSchema";
import type { Metadata } from "next";
import {
  buildCategoryPageOneMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

export const metadata: Metadata = buildCategoryPageOneMetadata(
  CATEGORY_SEO["luxury-corporate-gifts-dubai"],
);

export default function LuxuryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LCGBreadCrumbStructureSchema />
      {children}
    </>
  );
}
