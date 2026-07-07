import type { Metadata } from "next";
import { OASBreadCrumbStructureSchema } from "@/components/schema/OASBreadCrumbStructureSchema";
import {
  buildCategoryPageOneMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

export const metadata: Metadata = buildCategoryPageOneMetadata(
  CATEGORY_SEO["office-and-stationary"],
);

export default function OfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <OASBreadCrumbStructureSchema />
    {children}
  </>;
}
