"use client";

import { useForm, type FieldValues } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import FooterLink from "./FooterLink";
import footerLogo from "@/public/logo.svg";
import { cn } from "@/lib/utilts";
import {
  Reveal,
  RevealSection,
} from "@/components/ui/timeline-animation";
import { candyDarkButtonClasses } from "@/components/ui/candy-button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { saveToSheetNonBlocking } from "@/lib/api/save-to-sheet";

const NEWSLETTER_URL = "https://corporategiftsdubaii.ae/api/v1/contact/create";

function FooterSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
      <span className="size-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
      {children}
    </h3>
  );
}

const Footer = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      saveToSheetNonBlocking({
        formType: "contact",
        email: data.email,
      });

      const res = await fetch(NEWSLETTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          formType: "NEWSLETTER",
        }),
      });

      const raw = await res.text();
      let json: { status?: boolean; message?: string } = {};
      try {
        json = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error("Newsletter service is unavailable. Please try again later.");
      }
      if (!res.ok || !json.status) {
        throw new Error(json.message || "Could not subscribe. Please try again.");
      }

      setIsError(false);
      setMessage(json.message || "You are subscribed.");
      setTimeout(() => setMessage(""), 3000);
      reset();
    } catch (err) {
      setIsError(true);
      setMessage(
        err instanceof Error ? err.message : "Could not subscribe. Please try again."
      );
    }
  };

  return (
    <footer className="relative w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <Reveal animationNum={0}>
            <NoPrefetchLink
              href="/"
              className="inline-block transition-opacity duration-200 hover:opacity-80"
            >
              <Image
                src={footerLogo}
                width={160}
                height={64}
                alt="baharnani advertising logo"
                className="h-8 w-auto dark:brightness-0 dark:invert"
              />
            </NoPrefetchLink>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              One place brings you the best corporate gift ideas, by just
              clicking a button you can get the gift you want at a competitive
              price!
            </p>

            <div className="mt-8 max-w-xs">
              <FooterSectionHeading>Newsletter</FooterSectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Stay updated with our latest news, industry insights, and
                exclusive offers.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
                <input
                  type="email"
                  required
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full rounded-lg bg-surface-soft px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink/10"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={candyDarkButtonClasses("w-full")}
                >
                  {isSubmitting ? "Submitting..." : "Subscribe"}
                </button>
              </form>
              {message && (
                <p className={cn("mt-2 text-sm", isError ? "text-error" : "text-success")}>
                  {message}
                </p>
              )}
              {errors.email && (
                <p className="mt-2 text-sm text-error">{errors.email.message}</p>
              )}
            </div>
          </Reveal>

          <Reveal animationNum={1}>
            <FooterSectionHeading>Product Categories</FooterSectionHeading>
            <ul className="mt-4 flex flex-col gap-2">
              <FooterLink href="/product-category/premium-gift-sets">
                Premium Gift Sets
              </FooterLink>
              <FooterLink href="/product-category/luxury-corporate-gifts-dubai">
                Luxury Corporate Gifts
              </FooterLink>
              <FooterLink href="/product-category/apparel-and-accessories">
                Apparel and Accessories
              </FooterLink>
              <FooterLink href="/product-category/bags-and-travel">
                Bags and Travel
              </FooterLink>
              <FooterLink href="/product-category/office-and-stationary">
                Office and Stationary
              </FooterLink>
              <FooterLink href="/product-category/technology-and-accessories">
                Technology and Accessories
              </FooterLink>
              <FooterLink href="/product-category/eating-and-drinking">
                Eating and Drinking
              </FooterLink>
              <FooterLink href="/product-category/sports-and-recreation">
                Sports and Recreation
              </FooterLink>
              <FooterLink href="/product-category/eco-friendly">
                Eco Friendly
              </FooterLink>
            </ul>
          </Reveal>

          <Reveal animationNum={2} className="flex flex-col gap-10">
            <div>
              <FooterSectionHeading>Company</FooterSectionHeading>
              <ul className="mt-4 flex flex-col gap-2">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/about-us">About</FooterLink>
                <FooterLink href="/products">Products</FooterLink>
                <FooterLink href="/personalised-corporate-gifts-boxes-dubai">
                  Gift sets
                </FooterLink>
                <FooterLink href="/welcome-kits-dubai">
                  Welcome Kits
                </FooterLink>
                <FooterLink href="https://corporategiftsdubaii.ae/blog" external>
                  Blog
                </FooterLink>
                <FooterLink href="/contact-us">Contact</FooterLink>
              </ul>
            </div>
            <div>
              <FooterSectionHeading>Legal</FooterSectionHeading>
              <ul className="mt-4 flex flex-col gap-2">
                <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
                <FooterLink href="/terms-and-conditions">
                  Terms & Conditions
                </FooterLink>
                <FooterLink href="mailto:hemant@baharnani.com">Support</FooterLink>
              </ul>
            </div>
          </Reveal>

          <Reveal animationNum={3} className="flex flex-col gap-10">
            <div>
              <FooterSectionHeading>Contact</FooterSectionHeading>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Baharnani Advertising L.L.C,
                <br />
                Al Quoz 3, Dubai, UAE.
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                <FooterLink href="mailto:info@baharnani.com">
                  info@baharnani.com
                </FooterLink>
                <FooterLink href={getWhatsAppUrl()} external>
                  WhatsApp
                </FooterLink>
                <FooterLink href="tel:+971556545950">(+971) 55 654 5950</FooterLink>
              </ul>
            </div>
            <div>
              <FooterSectionHeading>Social</FooterSectionHeading>
              <ul className="mt-4 flex flex-col gap-2">
                <FooterLink
                  href="https://www.instagram.com/baharnaniadv/"
                  external
                >
                  Instagram
                </FooterLink>
                <FooterLink
                  href="https://www.facebook.com/BAHARNANIADV"
                  external
                >
                  Facebook
                </FooterLink>
                <FooterLink
                  href="https://www.linkedin.com/company/baharnaniadvertisingdubai/"
                  external
                >
                  LinkedIn
                </FooterLink>
                <FooterLink
                  href="https://www.google.com/maps/place/Baharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai/@25.1625624,55.2303193,16z/data=!4m16!1m7!3m6!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!2sBaharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai!8m2!3d25.1625188!4d55.2343055!16s%2Fg%2F11f66tl53w!3m7!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!8m2!3d25.1625188!4d55.2343055!9m1!1b1!16s%2Fg%2F11f66tl53w?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D"
                  external
                >
                  Google Reviews
                </FooterLink>
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-hairline" />

        <Reveal animationNum={4}>
          <p className="px-4 py-6 text-center text-sm leading-relaxed text-muted">
            &copy; {new Date().getFullYear()}{" "}
            <NoPrefetchLink href="/" className="text-ink hover:underline">
              Baharnani Advertising L.L.C.
            </NoPrefetchLink>{" "}
            All rights reserved. Developed with{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline align-text-bottom text-brand-accent"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
            </svg>{" "}
            by{" "}
            <a
              href="https://codecobble.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:underline"
            >
              CodeCobble
            </a>
            {" · "}
            <NoPrefetchLink href="/sitemap" className="text-ink hover:underline">
              Site Map
            </NoPrefetchLink>
          </p>
        </Reveal>
      </RevealSection>
    </footer>
  );
};

export default Footer;
