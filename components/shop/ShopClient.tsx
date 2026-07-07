"use client";

import { memo } from "react";
import ShopHero, { pageDashedGridStyle } from "./ShopHero";
import ShopContent from "./ShopContent";

type ShopClientProps = {
  initialPage?: number;
};

const ShopClient = memo(function ShopClient({ initialPage = 1 }: ShopClientProps) {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-bg">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={pageDashedGridStyle}
        aria-hidden
      />

      <div className="relative z-10">
        <ShopHero />
        <ShopContent initialPage={initialPage} />
      </div>
    </div>
  );
});

export default ShopClient;
