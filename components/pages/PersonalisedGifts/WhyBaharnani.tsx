"use client";

import {
  LuLeaf,
  LuPackageSearch,
  LuTicketCheck,
  LuUsers,
} from "@/components/icons";
import CategoryWhyChooseUs from "@/components/pages/ProductCategory/CategoryWhyChooseUs";
import type { FeatureCard } from "@/components/ui/WhyChooseUs";
import { WHY_POINTS } from "./data";

const ICONS = [
  <LuPackageSearch key="1" className="h-5 w-5" />,
  <LuTicketCheck key="2" className="h-5 w-5" />,
  <LuLeaf key="3" className="h-5 w-5" />,
  <LuUsers key="4" className="h-5 w-5" />,
];

const features: FeatureCard[] = WHY_POINTS.map((point, index) => ({
  id: point.id,
  number: point.number,
  title: point.title,
  description: point.description,
  icon: ICONS[index],
  iconColor: point.iconColor,
}));

export default function WhyBaharnani() {
  return (
    <CategoryWhyChooseUs
      title="Why Businesses Choose Baharnani Advertising"
      subtitle="Product range, custom branding, packaging, bulk-order support and delivery coordination — under one campaign brief."
      features={features}
      showCtaCard
      ctaShopHref="/products"
      ctaTitle="Ready to plan your gift campaign?"
      ctaDescription="Share your audience, budget and quantity — we will help you shortlist a practical direction."
    />
  );
}
