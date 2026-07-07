import CommonHero from "@/components/ui/CommonHero";
import WhoWeAre from "@/components/pages/ABoutUs/WhoWeAre";
import VisionMission from "@/components/pages/ABoutUs/VisionMission";
import { AnimatedTestimonials } from "@/components/ui/AnimatedTestimonial";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import type { FeatureCard } from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import {
  PackageSearch,
  Waypoints,
  Users,
  Leaf,
  TruckElectric,
  TicketCheck,
} from "lucide-react";
// import { PiSealQuestionDuotone } from "react-icons/pi";
import ctaImage from "@/public/assets/images/Hero-images/About-hero.webp";
// import Seo from "../../components/Seo";
// import { Helmet } from "react-helmet-async";

const testimonials = [
  {
    quote:
      "Baharnani Advertising has been our trusted corporate gift supplier for over 4 years. Their team, especially Amit, always ensures we get the perfect gifts for our Dubai and Abu Dhabi offices. Exceptional service and quality every time.",
    name: "Sarah Ahmed",
    designation: "Marketing Director",
    src: "/assets/images/Testimonials/Sarah-Ahmed.webp",
  },
  {
    quote:
      "Working with Vivek from Baharnani Advertising has been a game-changer for our corporate gifting needs across Sharjah and Dubai. His attention to detail and understanding of our requirements is outstanding.",
    name: "Mohammed Al Rashid",
    designation: "Business Development Manager",
    src: "/assets/images/Testimonials/Mohammed-Al-Rashid.webp",
  },
  {
    quote:
      "The team at Baharnani Advertising, particularly Amit, goes above and beyond to deliver premium corporate gifts. From Dubai to Abu Dhabi, they've helped us maintain excellent client relationships through thoughtful gifting.",
    name: "Fatima Hassan",
    designation: "HR Director",
    src: "/assets/images/Testimonials/Fatima-Hassan.webp",
  },
];

const aboutFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Comprehensive Gift Collection",
    description:
      "Wide range of corporate gifts from luxury items to eco-friendly solutions.",
    icon: <PackageSearch size={32} />,
    iconColor: "#F7B6F7", // pastel purple-pink (highlighted, light)
  },
  {
    id: 2,
    number: "02",
    title: "Premium Quality Assurance",
    description:
      "Certified products and quality control ensuring excellence in every gift.",
    icon: <TicketCheck size={32} />,
    iconColor: "#FAF491", // highlighted light yellow
  },
  {
    id: 3,
    number: "03",
    title: "Full Customization",
    description:
      "Logo engraving, embossing, printing, and packaging tailored to your brand.",
    icon: <Users size={32} />,
    iconColor: "#A8DDF0", // light sky blue (highlighted and light)
  },
  {
    id: 4,
    number: "04",
    title: "Fast Delivery",
    description:
      "Efficient logistics ensuring timely delivery across Dubai, UAE, and beyond.",
    icon: <TruckElectric size={32} />,
    iconColor: "#FBBEC6", // soft light pink/red highlight
  },
  {
    id: 5,
    number: "05",
    title: "Dubai-Based Excellence",
    description:
      "Strategically located in Dubai for quick access and reliable service.",
    icon: <Waypoints size={32} />,
    iconColor: "#83E3F6", // aqua/cyan (highlighted and light)
  },
  {
    id: 6,
    number: "06",
    title: "Eco-Friendly Options",
    description:
      "Sustainable gift choices promoting environmental responsibility.",
    icon: <Leaf size={32} />,
    iconColor: "#94EBC5", // soft light green
  },
];

export default function About() {
  // const structuredData = {
  //   "@context": "https://schema.org",
  //   "@type": "LocalBusiness",
  //   name: "Baharnani Corporate Gifts Dubai",
  //   image: "https://corporategiftsdubaii.ae/logo.svg",
  //   "@id": "https://corporategiftsdubaii.ae/#localbusiness",
  //   url: "https://corporategiftsdubaii.ae/",
  //   telephone: "+971556545950",
  //   address: {
  //     "@type": "PostalAddress",
  //     streetAddress: "Baharnani Advertising L.L.C, Al Quoz – Al Quoz 3 – Dubai",
  //     addressLocality: "Dubai",
  //     postalCode: "49757",
  //     addressCountry: "AE",
  //   },
  //   geo: {
  //     "@type": "GeoCoordinates",
  //     latitude: 25.162655,
  //     longitude: 55.2344375,
  //   },
  //   openingHoursSpecification: {
  //     "@type": "OpeningHoursSpecification",
  //     dayOfWeek: [
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ],
  //     opens: "09:00",
  //     closes: "18:30",
  //   },
  //   sameAs: [
  //     "https://www.instagram.com/baharnaniadv/",
  //     "https://www.linkedin.com/company/baharnaniadvertisingdubai/",
  //   ],
  // };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Dashed Center Fade Grid (sticky background) */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
          backgroundSize: "5px 5px",
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
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Page content */}
      <div className="relative z-10">
        <CommonHero
          title=" "
          titleLine2Before="Your "
          titleLine2Highlight="Trusted Partner "
          titleLine2After=" for Premium Corporate Gifts"
          subtitle="Baharnani Advertising LLC is a Dubai-based gift supplier specializing in bulk orders, corporate gifts, event gifts, and fully customized solutions. We deliver quality, creativity, and excellence for all your gifting needs."
          badgeText="Dubai's Trusted Corporate Gifts Partner"
          buttonLink="/products"
          buttonText="Explore Our Products"
        />
        <WhoWeAre />
        <VisionMission />
        <WhyChooseUs
          features={aboutFeatures}
          title={
            <>
              Why{" "}
              {/* <PiSealQuestionDuotone className="inline-block align-middle rotate-45" />{" "} */}
              Choose Baharnani?
            </>
          }
          subtitle="We don't just supply gifts - we create meaningful connections that strengthen relationships and elevate your brand presence."
        />
        <AnimatedTestimonials testimonials={testimonials} />
        <CallToAction
          title="Partner With a Corporate Gift Supplier That Delivers Excellence."
          subtitle={
            <>
              Whether you need customized promotional items, luxury corporate
              gifts, eco-friendly solutions, or festive hampers, Baharnani
              Advertising ensures creative designs, premium quality, and timely
              delivery across Dubai and the UAE.
            </>
          }
          backgroundImageUrl={ctaImage.src.toString()}
          buttons={[
            {
              text: "Contact Us Now",
              className:
                "  bg-linear-to-r from-neutral-800 to-neutral-500! text-white! border! border-neutral-200! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!",
              link: "/contact-us",
            },
            {
              text: "Explore Products",
              className:
                " bg-linear-to-r from-neutral-100 to-neutral-300! border! border-neutral-200! text-neutral-700! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!",
              link: "/products",
            },
          ]}
        />
      </div>
    </main>
  );
}
