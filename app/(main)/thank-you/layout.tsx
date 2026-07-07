import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you - Corporate Gifts",
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
