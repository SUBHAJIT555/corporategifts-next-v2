"use client";

import { useForm, type FieldValues } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import CTAButton from "./CTAButton";
import FooterLink from "./FooterLink";
import footerLogo from "@/public/logo.svg";
import { FcGoogle, FaFacebook, FaInstagram, FaLinkedinIn, FaStar } from "../icons";

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
    <footer className="w-full bg-white relative overflow-hidden">
      {/* Pattern */}


      {/* Dashed Center Fade Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
          backgroundSize: "10px 10px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
       repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
          WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
          // Intersect the radial fade with the dashed grid
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="relative z-10 mx-auto px-6 lg:px-12 pt-4 border-t-4 border-[#0F5C85] ">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-y-16">

          {/* About */}
          <div className="col-span-2">
            <div className="text-neutral-700 md:text-5xl text-3xl font-tanker flex items-center gap-2 tracking-tighter">
              <NoPrefetchLink href="/">
                <Image
                  src={footerLogo}
                  width={200}
                  height={80}
                  alt="baharnani advertising logo"
                  className="w-50 h-25"
                />
              </NoPrefetchLink>
            </div>
            <NoPrefetchLink target="_blank" href="/">
              <h3 className="text-[#0F5C85] text-xl  font-sentient font-semibold  mt-2  px-2 py-1 rounded-lg bg-neutral-100 w-fit border border-neutral-300 ring ring-neutral-300 ring-offset-2">
                Baharnani Advertising L.L.C.
              </h3>
            </NoPrefetchLink>

            <p className="mt-4 text-neutral-700 text-sm sm:text-base md:text-lg font-switzer font-semibold  leading-relaxed max-w-sm">
              One place brings you the best corporate gift ideas, by just
              clicking a button you can get the gift you want at a
              competitive price!
            </p>
            <div className="flex items-center gap-10 mt-6">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/BAHARNANIADV"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-neutral-700 hover:text-[#0F5C85] transition-colors duration-300 rounded-xl border border-neutral-300  p-1 bg-neutral-100 ring ring-neutral-300 ring-offset-2"
              >
                <FaFacebook className="size-6" />
                <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 -translate-y-2 pointer-events-none z-50">
                  <div className="relative bg-bg text-textcolor px-4 py-2 rounded-xl shadow-xl border border-neutral-100 backdrop-blur-sm whitespace-nowrap font-switzer text-sm">
                    Follow us on Facebook
                    {/* Chat bubble tail pointing up */}
                    <div className="absolute -top-2 left-4">
                      <div className="w-4 h-4 bg-bg border-l border-t border-bg/30 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/baharnaniadv/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-neutral-700 hover:text-[#0F5C85] transition-colors duration-300 rounded-xl border border-neutral-300  p-1 bg-neutral-100 ring ring-neutral-300 ring-offset-2"
              >
                <FaInstagram className="size-6" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 -translate-y-2 pointer-events-none z-50">
                  <div className="relative bg-bg text-textcolor px-4 py-2 rounded-xl shadow-xl border border-neutral-100 backdrop-blur-sm whitespace-nowrap font-switzer text-sm">
                    Follow us on Instagram
                    {/* Chat bubble tail pointing up */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                      <div className="w-4 h-4 bg-bg border-l border-t border-bg/30 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/baharnaniadvertisingdubai/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-neutral-700 hover:text-[#0F5C85] transition-colors duration-300 rounded-xl border border-neutral-300  p-1 bg-neutral-100 ring ring-neutral-300 ring-offset-2"
              >
                <FaLinkedinIn className="size-6" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 -translate-y-2 pointer-events-none z-50">
                  <div className="relative bg-bg text-textcolor px-4 py-2 rounded-xl shadow-xl border border-neutral-100 backdrop-blur-sm whitespace-nowrap font-switzer text-sm">
                    Follow us on LinkedIn
                    {/* Chat bubble tail pointing up */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                      <div className="w-4 h-4 bg-bg border-l border-t border-bg/30 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Google */}
              <a
                href="https://www.google.com/maps/place/Baharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai/@25.1625624,55.2303193,16z/data=!4m16!1m7!3m6!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!2sBaharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai!8m2!3d25.1625188!4d55.2343055!16s%2Fg%2F11f66tl53w!3m7!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!8m2!3d25.1625188!4d55.2343055!9m1!1b1!16s%2Fg%2F11f66tl53w?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-neutral-700 hover:text-[#0F5C85] transition-colors duration-300 rounded-xl border border-neutral-300  p-1 bg-neutral-100 ring ring-neutral-300 ring-offset-2"
              >
                <FcGoogle className="size-6" />
                <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 -translate-y-2 pointer-events-none z-50">
                  <div className="relative bg-bg text-textcolor px-4 py-3 rounded-xl shadow-xl border border-neutral-100 backdrop-blur-sm whitespace-nowrap font-switzer text-sm">
                    <div className="flex items-center gap-1 justify-center mb-1">
                      <FaStar className="text-yellow-400 size-4" />
                      <FaStar className="text-yellow-400 size-4" />
                      <FaStar className="text-yellow-400 size-4" />
                      <FaStar className="text-yellow-400 size-4" />
                      <FaStar className="text-yellow-400 size-4" />
                    </div>
                    <div>Give your valuable feedback</div>
                    {/* Chat bubble tail pointing up */}
                    <div className="absolute -top-2 right-4">
                      <div className="w-4 h-4 bg-bg border-l border-t border-bg/30 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-[#0F5C85] text-lg sm:text-xl md:text-2xl font-sentient font-bold flex items-center w-fit border border-neutral-300 ring ring-neutral-300 ring-offset-2 px-2 py-1 rounded-xl bg-neutral-100">

              Useful Links{" "}

            </h3>
            <ul className="text-neutral-700 text-base sm:text-lg md:text-xl font-switzer font-semibold mt-5 flex flex-col gap-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about-us">About</FooterLink>
              <FooterLink href="/products">Products</FooterLink>
              <FooterLink href="https://corporategiftsdubaii.ae/blog" external>
                Blog
              </FooterLink>
              <FooterLink href="/contact-us">Contact</FooterLink>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-[#0F5C85] text-lg sm:text-xl md:text-2xl font-sentient font-bold flex items-center w-fit border border-neutral-300 ring ring-neutral-300 ring-offset-2 px-2 py-1 rounded-xl bg-neutral-100">

              Product Categories{" "}
            </h3>
            <ul className="text-neutral-700 text-base sm:text-lg md:text-xl font-switzer font-semibold mt-5 flex flex-col gap-3">
              <FooterLink href="/product-category/premium-gift-sets">Premium Gift Sets</FooterLink>
              <FooterLink href="/product-category/luxury-corporate-gifts-dubai">Luxury Corporate Gifts</FooterLink>
              <FooterLink href="/product-category/apparel-and-accessories">Apparel and Accessories</FooterLink>
              <FooterLink href="/product-category/bags-and-travel">Bags and Travel</FooterLink>
              <FooterLink href="/product-category/office-and-stationary">Office and Stationary</FooterLink>
              <FooterLink href="/product-category/technology-and-accessories">Technology and Accessories</FooterLink>
              <FooterLink href="/product-category/eating-and-drinking">Eating and Drinking</FooterLink>
              <FooterLink href="/product-category/sports-and-recreation">Sports and Recreation</FooterLink>
              <FooterLink href="/product-category/eco-friendly">Eco Friendly</FooterLink>
            </ul>
          </div>

          {/* Legals */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-[#0F5C85] text-lg sm:text-xl md:text-2xl font-sentient font-bold flex items-center w-fit border border-neutral-300 ring ring-neutral-300 ring-offset-2 px-2 py-1 rounded-xl bg-neutral-100">

              Legals
            </h3>
            <ul className="text-neutral-700 text-base sm:text-lg md:text-xl font-switzer font-semibold mt-5 flex flex-col gap-3">
              <FooterLink href="/terms-and-conditions">Terms & Condition</FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
              <FooterLink href="mailto:hemant@baharnani.com">Support</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-[#0F5C85] text-lg sm:text-xl md:text-2xl font-sentient font-bold flex items-center w-fit border border-neutral-300 ring ring-neutral-300 ring-offset-2 px-2 py-1 rounded-xl bg-neutral-100">

              Newsletter
            </h3>

            <p className="text-neutral-700 mt-4 text-sm sm:text-base md:text-lg font-switzer font-semibold">
              Stay updated with our latest news, industry insights, and
              exclusive offers.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
              <input
                type="email"
                required
                {...register("email")}
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 bg-neutral-100 border border-neutral-200 ring ring-neutral-300 ring-offset-2 rounded-lg text-neutral-700 focus:ring-1 focus:ring-bg"
              />

              <CTAButton
                type="submit"
                label={isSubmitting ? "Submitting..." : "Subscribe"}
                variant="light"
                className="font-sentient font-semibold text-xs sm:text-sm md:text-base bg-linear-to-r from-neutral-100 to-neutral-300 cursor-pointer ring-1 ring-neutral-300 ring-offset-2"
              />
            </form>

            {message && <p className="text-green-500 mt-2">{message}</p>}
            {errors.email && (
              <p className="text-red-500 mt-2">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-bg/50 mt-10" />

        {/* Bottom */}
        <div className="w-full flex justify-center items-center py-5 px-10 font-switzer border-t border-neutral-300">
          <p className="text-neutral-700 text-sm sm:text-base md:text-lg leading-none text-center md:text-center">
            &copy; {new Date().getFullYear()}{" "}
            <NoPrefetchLink href="/" className="text-[#0F5C85]">
              Baharnani Advertising L.L.C.
            </NoPrefetchLink>{" "}
            All Rights Reserved.&nbsp; Made with{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline text-[#e11d48] align-middle"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
            </svg>
            &nbsp;by&nbsp;
            <a
              href="https://www.codecobble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0F5C85]"
            >
              CodeCobble
            </a>{" "}
            |{" "}
            <NoPrefetchLink href="/sitemap" className=" hover:underline">
              Site Map
            </NoPrefetchLink>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
