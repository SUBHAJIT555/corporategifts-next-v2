import { BATBreadCrumbStructureSchema } from "@/components/schema/BATBreadCrumbStructureSchema";
import type { Metadata } from "next";
import {
  buildCategoryPageOneMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

export const metadata: Metadata = buildCategoryPageOneMetadata(
  CATEGORY_SEO["bags-and-travel"],
);

export default function BagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<>
    <BATBreadCrumbStructureSchema />
    {children}
  </>);
}
