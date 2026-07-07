import type { Metadata } from "next";
import {
  buildCategoryPageOneMetadata,
  CATEGORY_SEO,
} from "@/lib/categorySeo";

export const metadata: Metadata = buildCategoryPageOneMetadata(
  CATEGORY_SEO["eco-friendly"],
);

export default function EcoFriendlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
