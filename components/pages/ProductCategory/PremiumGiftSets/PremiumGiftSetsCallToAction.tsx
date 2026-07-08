"use client";

import CallToAction from "@/components/ui/CallToAction";

export default function PremiumGiftSetsCallToAction() {
  return (
    <CallToAction
      title="Your Trusted Partner for Premium Gift Sets in Dubai"
      headlineBottomText=""
      subtitle={
        <>
          From luxury gift sets to perfume gift sets, we deliver premium quality
          gift sets that strengthen relationships, elevate your brand presence,
          and demonstrate your commitment to gifting.
        </>
      }
      buttons={[
        {
          text: "Contact Our Team",
          link: "/contact-us",
          variant: "dark",
        },
        {
          text: "Explore Product Categories",
          link: "/products",
          variant: "light",
        },
      ]}
    />
  );
}
