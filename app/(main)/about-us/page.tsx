import AboutHero from "@/components/pages/ABoutUs/AboutHero";
import WhoWeAre from "@/components/pages/ABoutUs/WhoWeAre";
import BrandsSocialProof from "@/components/pages/ABoutUs/BrandsSocialProof";
import VisionMission from "@/components/pages/ABoutUs/VisionMission";
import AboutWhyChooseUs from "@/components/pages/ABoutUs/AboutWhyChooseUs";
import AboutCallToAction from "@/components/pages/ABoutUs/AboutCallToAction";
import { AnimatedTestimonials } from "@/components/ui/AnimatedTestimonial";
import SectionDivider from "@/components/ui/SectionDivider";
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

export default function About() {


  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <AboutHero />
      <SectionDivider />
      <WhoWeAre />
      <BrandsSocialProof />
      <VisionMission />
      <SectionDivider />
      <AboutWhyChooseUs />
      <SectionDivider />
      <AnimatedTestimonials testimonials={testimonials} />
      <AboutCallToAction />
      <SectionDivider />
    </main>
  );
}
