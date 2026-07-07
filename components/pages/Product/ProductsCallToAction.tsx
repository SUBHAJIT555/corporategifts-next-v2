"use client";

import CallToAction from "@/components/ui/CallToAction";

export default function ProductsCallToAction() {
  return (
    <CallToAction
      title="Ready to Elevate Your Corporate Gifting?"
      headlineBottomText=""
      subtitle={
        <>
          Partner with Baharnani Advertising, Dubai&apos;s premier corporate
          gift supplier. From premium gift sets to custom branding solutions,
          we help you create meaningful gifting experiences that strengthen
          business relationships.
        </>
      }
      buttons={[
        {
          text: "Get Quote",
          link: "/contact-us",
          variant: "dark",
        },
        {
          text: "View Products",
          link: "#product-varieties",
          variant: "light",
        },
      ]}
    />
  );
}
