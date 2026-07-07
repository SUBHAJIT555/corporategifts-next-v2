import { EADBreadCrumbStructureSchema } from "@/components/schema/EADBreadCrumbStructureSchema";
import type { Metadata } from "next";
import {
  buildCategoryPageOneMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

export const metadata: Metadata = buildCategoryPageOneMetadata(
  CATEGORY_SEO["eating-and-drinking"],
);

export default function EatingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EADBreadCrumbStructureSchema />
      {children}
    </>
  );
}
