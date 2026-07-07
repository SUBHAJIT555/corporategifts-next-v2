
import CallToAction from "@/components/ui/CallToAction";
import HeroSection from "@/components/pages/Home/Hero";
import HomeAbout from "@/components/pages/Home/HomeAbout";
import Stats from "@/components/pages/Home/Stats";
import ProductGridHome from "@/components/pages/Home/ProductGridHome";
import FeatureBrand from "@/components/pages/Home/feature-brand/FeatureBrand";
import TopSaver from "@/components/pages/Home/top-saver/TopSaver";
import BestSelling from "@/components/pages/Home/best-selling/BestSelling";
import HomeWhyChooseUs from "@/components/pages/Home/WhyChooseUs";
import HomeFAQ from "@/components/pages/Home/HomeFAQ";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <div className="relative z-10">
        <HeroSection />
        <SectionDivider />
        <HomeAbout />
        <SectionDivider />
        <Stats />
        <SectionDivider />
        <ProductGridHome />
        <SectionDivider />
        <FeatureBrand />
        <SectionDivider />
        <TopSaver />
        <SectionDivider />
        <BestSelling />
        <SectionDivider />
        <HomeWhyChooseUs />
        <SectionDivider />
        <HomeFAQ />
        <SectionDivider />
        <CallToAction />
        <SectionDivider />
      </div>
    </main>
  );
}
