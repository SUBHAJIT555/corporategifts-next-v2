"use client";

import { memo } from "react";
import SectionDivider from "@/components/ui/SectionDivider";
import ShopHero from "./ShopHero";
import ShopContent from "./ShopContent";

type ShopClientProps = {
  initialPage?: number;
};

const ShopClient = memo(function ShopClient({ initialPage = 1 }: ShopClientProps) {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <ShopHero />
      <SectionDivider />
      <ShopContent initialPage={initialPage} />
      <SectionDivider />
    </main>
  );
});

export default ShopClient;
