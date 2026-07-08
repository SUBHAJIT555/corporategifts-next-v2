"use client";

import CallToAction from "@/components/ui/CallToAction";

type CategoryCallToActionProps = {
  title: string;
  subtitle: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CategoryCallToAction({
  title,
  subtitle,
  primaryLabel = "Contact Our Team",
  primaryHref = "/contact-us",
  secondaryLabel = "Explore Product Categories",
  secondaryHref = "/products",
}: CategoryCallToActionProps) {
  return (
    <CallToAction
      title={title}
      headlineBottomText=""
      subtitle={subtitle}
      buttons={[
        {
          text: primaryLabel,
          link: primaryHref,
          variant: "dark",
        },
        {
          text: secondaryLabel,
          link: secondaryHref,
          variant: "light",
        },
      ]}
    />
  );
}
