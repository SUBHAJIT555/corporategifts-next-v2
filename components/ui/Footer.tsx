"use client";

import { useForm, type FieldValues } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import FooterLink from "./FooterLink";
import footerLogo from "@/public/logo.svg";
import {
  FcGoogle,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaStar,
} from "../icons";
import { cn } from "@/lib/utilts";
import {
  Reveal,
  RevealSection,
} from "@/components/ui/timeline-animation";
import {
  candyDarkButtonClasses,
  candyIconButtonClasses,
  candySquareIconClasses,
} from "@/components/ui/candy-button";

function FooterSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="inline-flex items-center rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body">
      {children}
    </h3>
  );
}

function SocialTooltip({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
}) {
  const horizontalPosition =
    align === "left"
      ? "left-0"
      : align === "right"
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  const tailPosition =
    align === "left"
      ? "left-4"
      : align === "right"
        ? "right-4"
        : "left-1/2 -translate-x-1/2";

  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-full z-50 mb-2 translate-y-1 opacity-0 invisible transition-all duration-200 ease-out",
        "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
        horizontalPosition
      )}
    >
      <div className="relative rounded-xl border border-hairline bg-surface-card px-3 py-2 text-sm text-ink shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)]">
        {children}
        <div className={cn("absolute -bottom-2", tailPosition)}>
          <div className="h-4 w-4 rotate-45 border-b border-r border-hairline bg-surface-card" />
        </div>
      </div>
    </div>
  );
}

const socialIconClasses = cn(
  candyIconButtonClasses("white", "sm"),
  "group relative hover:text-brand-accent"
);

const Footer = () => {
  const [message, setMessage] = useState("");

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contact/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            formType: "NEWSLETTER",
          }),
        }
      );

      const json = await res.json();
      if (!json.status) throw new Error(json.message);

      setMessage(json.message);
      setTimeout(() => setMessage(""), 3000);
      reset();
    } catch (err) {
      if (err instanceof Error) setMessage(err.message);
    }
  };

  return (
    <footer className="relative w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-y-12">
          {/* About + Newsletter */}
          <Reveal animationNum={0} className="col-span-2">
            <NoPrefetchLink
              href="/"
              className="inline-block transition-opacity duration-200 hover:opacity-80"
            >
              <Image
                src={footerLogo}
                width={160}
                height={64}
                alt="baharnani advertising logo"
                className="h-7 w-auto sm:h-8"
              />
            </NoPrefetchLink>


            <p className="mt-4 max-w-sm text-body-md leading-relaxed text-muted">
              One place brings you the best corporate gift ideas, by just
              clicking a button you can get the gift you want at a competitive
              price!
            </p>

            <div className="mt-6 max-w-sm">
              <FooterSectionHeading>Newsletter</FooterSectionHeading>

              <p className="mt-4 text-body-md text-muted">
                Stay updated with our latest news, industry insights, and
                exclusive offers.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
                <input
                  type="email"
                  required
                  {...register("email")}
                  placeholder="Enter Your Email"
                  className="w-full rounded-xl border border-hairline bg-surface-card px-4 py-3 text-body-md text-ink placeholder:text-muted focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    candyDarkButtonClasses(
                      "w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                    ),
                    "font-semibold text-sm"
                  )}
                >
                  {isSubmitting ? "Submitting..." : "Subscribe"}
                </button>
              </form>

              {message && (
                <p className="mt-2 text-sm text-success">{message}</p>
              )}
              {errors.email && (
                <p className="mt-2 text-sm text-error">{errors.email.message}</p>
              )}
            </div>

            <div className="relative mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.facebook.com/BAHARNANIADV"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
                aria-label="Follow us on Facebook"
              >
                <FaFacebook
                  className={cn(
                    candySquareIconClasses,
                    "transition-colors group-hover:text-brand-accent"
                  )}
                />
                <SocialTooltip align="left">
                  Follow us on Facebook
                </SocialTooltip>
              </a>

              <a
                href="https://www.instagram.com/baharnaniadv/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
                aria-label="Follow us on Instagram"
              >
                <FaInstagram
                  className={cn(
                    candySquareIconClasses,
                    "transition-colors group-hover:text-brand-accent"
                  )}
                />
                <SocialTooltip>Follow us on Instagram</SocialTooltip>
              </a>

              <a
                href="https://www.linkedin.com/company/baharnaniadvertisingdubai/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
                aria-label="Follow us on LinkedIn"
              >
                <FaLinkedinIn
                  className={cn(
                    candySquareIconClasses,
                    "transition-colors group-hover:text-brand-accent"
                  )}
                />
                <SocialTooltip>Follow us on LinkedIn</SocialTooltip>
              </a>

              <a
                href="https://www.google.com/maps/place/Baharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai/@25.1625624,55.2303193,16z/data=!4m16!1m7!3m6!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!2sBaharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai!8m2!3d25.1625188!4d55.2343055!16s%2Fg%2F11f66tl53w!3m7!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!8m2!3d25.1625188!4d55.2343055!9m1!1b1!16s%2Fg%2F11f66tl53w?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(socialIconClasses, "hover:brightness-[1.03]")}
                aria-label="Give your valuable feedback on Google"
              >
                <FcGoogle className="size-4 shrink-0" />
                <SocialTooltip align="right">
                  <div className="mb-1 flex items-center justify-center gap-1">
                    <FaStar className="size-3.5 text-yellow-400" />
                    <FaStar className="size-3.5 text-yellow-400" />
                    <FaStar className="size-3.5 text-yellow-400" />
                    <FaStar className="size-3.5 text-yellow-400" />
                    <FaStar className="size-3.5 text-yellow-400" />
                  </div>
                  <div className="whitespace-nowrap">Give your valuable feedback</div>
                </SocialTooltip>
              </a>
            </div>
          </Reveal>

          {/* Useful Links */}
          <Reveal animationNum={1} className="col-span-2 sm:col-span-1">
            <FooterSectionHeading>Useful Links</FooterSectionHeading>
            <ul className="mt-5 flex flex-col gap-2.5">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about-us">About</FooterLink>
              <FooterLink href="/products">Products</FooterLink>
              <FooterLink href="https://corporategiftsdubaii.ae/blog" external>
                Blog
              </FooterLink>
              <FooterLink href="/contact-us">Contact</FooterLink>
            </ul>
          </Reveal>

          {/* Product Categories */}
          <Reveal animationNum={2} className="col-span-2 sm:col-span-1">
            <FooterSectionHeading>Product Categories</FooterSectionHeading>
            <ul className="mt-5 flex flex-col gap-2.5">
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

          {/* Legals */}
          <Reveal animationNum={3} className="col-span-2 sm:col-span-1">
            <FooterSectionHeading>Legals</FooterSectionHeading>
            <ul className="mt-5 flex flex-col gap-2.5">
              <FooterLink href="/terms-and-conditions">
                Terms & Condition
              </FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
              <FooterLink href="mailto:hemant@baharnani.com">Support</FooterLink>
            </ul>
          </Reveal>
        </div>

        <div className="mt-10 border-t border-hairline" />

        {/* Bottom */}
        <Reveal animationNum={4}>
          <div className="flex w-full items-center justify-center px-4 py-6">
            <p className="text-center text-body-md leading-relaxed text-muted">
              &copy; {new Date().getFullYear()}{" "}
              <NoPrefetchLink href="/" className="text-ink hover:underline">
                Baharnani Advertising L.L.C.
              </NoPrefetchLink>{" "}
              All Rights Reserved.&nbsp; Design with{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="inline align-middle text-brand-accent"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
              </svg>
              &nbsp;by&nbsp;
              <a
                href="https://subhajit-dhali.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:underline"
              >
                subhajit
              </a>{" "}
              |{" "}
              <NoPrefetchLink href="/sitemap" className="text-ink hover:underline">
                Site Map
              </NoPrefetchLink>
            </p>
          </div>
        </Reveal>
      </RevealSection>
    </footer>
  );
};

export default Footer;
