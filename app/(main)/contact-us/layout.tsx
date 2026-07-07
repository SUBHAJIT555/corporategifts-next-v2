import { ContactSchema } from "@/components/schema/ContactSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch for Corporate Gifts in Dubai",
  description:
    "One place brings you the best corporate gift ideas, by just clicking a button you can get the gift you want at a competitive price!",
  alternates: {
    canonical: "https://corporategiftsdubaii.ae/contact-us",
  },
  openGraph: {
    title: "Contact Us | Get in Touch for Corporate Gifts in Dubai",
    description:
      "One place brings you the best corporate gift ideas, by just clicking a button you can get the gift you want at a competitive price!",
    url: "https://corporategiftsdubaii.ae/contact-us",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ContactSchema />
      {children}
    </>);
}
