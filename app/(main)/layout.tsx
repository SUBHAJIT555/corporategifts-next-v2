import { MainLayout } from "@/components/layouts/MainLayout";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { QuoteProvider } from "@/contexts/QuoteContext";
import { SITE_URL } from "@/lib/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Gifts Supplier in Dubai & UAE | Baharnani ",
  description:
    "Baharnani is a trusted corporate gifts supplier in Dubai for customized gifts, promotional items, luxury gift sets, smart gadgets and bulk UAE orders.",
  openGraph: {
    title: "Corporate Gifts Supplier in Dubai & UAE | Baharnani ",
    description:
      "Baharnani is a trusted corporate gifts supplier in Dubai for customized gifts, promotional items, luxury gift sets, smart gadgets and bulk UAE orders..",
    url: `${SITE_URL}/`,
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default function MainRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuoteProvider>
      <LocalBusinessSchema />
      <MainLayout>{children}</MainLayout>
    </QuoteProvider>
  );
}
