"use client";

import CallToAction from "@/components/ui/CallToAction";

export default function AboutCallToAction() {
  return (
    <CallToAction
      title="Partner With a Corporate Gift Supplier That Delivers Excellence."
      headlineBottomText="Creative designs, premium quality, and timely delivery across Dubai and the UAE."
      subtitle={
        <>
          Whether you need customized promotional items, luxury corporate
          gifts, eco-friendly solutions, or festive hampers, Baharnani
          Advertising helps you create meaningful connections through thoughtful
          corporate gifting.
        </>
      }
      infoBoxBullets={[
        "Premium corporate gifts with full logo branding and customization.",
        "Luxury, eco-friendly, and promotional options for every budget.",
        "Reliable delivery and dedicated support across Dubai, Abu Dhabi, and the UAE.",
      ]}
      buttons={[
        {
          text: "Contact Us Now",
          link: "/contact-us",
          variant: "dark",
        },
        {
          text: "Explore Products",
          link: "/products",
          variant: "light",
        },
      ]}
    />
  );
}
