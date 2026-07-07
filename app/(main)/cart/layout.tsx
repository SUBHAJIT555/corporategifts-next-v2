import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your cart - Corporate Gifts",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
