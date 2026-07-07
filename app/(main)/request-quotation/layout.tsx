import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Quotation",
  description: "Request a quotation - Corporate Gifts",
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
