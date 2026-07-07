
import {
  LuLeaf,
  LuPackageSearch,
  LuTicketCheck,
  LuUsers,
} from "@/components/icons";
import FAQ from "@/components/common/FAQ";
import CallToAction from "@/components/ui/CallToAction";
import HeroSection from "@/components/pages/Home/Hero";
import HomeAbout from "@/components/pages/Home/HomeAbout";
import Stats from "@/components/pages/Home/Stats";
import ProductGridHome from "@/components/pages/Home/ProductGridHome";
import FeatureBrand from "@/components/pages/Home/feature-brand/FeatureBrand";
import TopSaver from "@/components/pages/Home/top-saver/TopSaver";
import BestSelling from "@/components/pages/Home/best-selling/BestSelling";
import WhyChooseUs, { type FeatureCard } from "@/components/ui/WhyChooseUs";
import SectionDivider from "@/components/ui/SectionDivider";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const homeFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Customized Corporate Gifts With Logo Branding",
    description:
      "We help businesses design custom corporate gifts in Dubai, featuring logo printing, engraving, embossing, packaging, and product personalization for clients, employees, and special events.",
    icon: <LuPackageSearch className="w-8 h-8" />,
    iconColor: "#A8DDF0",
  },
  {
    id: 2,
    number: "02",
    title: "Luxury, Smart & Promotional Gift Options",
    description:
      "Explore luxury corporate gifts, smart corporate gifts, branded giveaways, stationery, bags, drinkware, apparel, and premium gift sets for different budgets and occasions.",
    icon: <LuTicketCheck className="w-8 h-8" />,
    iconColor: "#F9C46B",
  },
  {
    id: 3,
    number: "03",
    title: "Affordable Bulk Gifting Support",
    description:
      "Whether you want inexpensive corporate gifts or high-end executive hampers, our team will help you choose practical options according to your quantity, audience, branding style, and delivery requirements.",
    icon: <LuLeaf className="w-8 h-8" />,
    iconColor: "#94EBC5",
  },
  {
    id: 4,
    number: "04",
    title: "UAE-Focused Corporate Gifting Experience",
    description:
      "We know the business gifting needs in Dubai for corporate events, exhibitions, festive campaigns, employee rewards, client appreciation and promotional marketing.",
    icon: <LuUsers className="w-8 h-8" />,
    iconColor: "#F7B6F7",
  },
];

const homeFaqData: FAQItem[] = [
  {
    id: 1,
    question: "What are corporate gifts?",
    answer:
      "Corporate gifts are branded items or tokens given by companies to clients, employees, or partners to express appreciation, build loyalty, and enhance business relationships.",
  },
  {
    id: 2,
    question: "Why are corporate gifts important?",
    answer:
      "Corporate gifts help strengthen partnerships, improve brand visibility, and create a lasting emotional connection with clients and employees.",
  },
  {
    id: 3,
    question:
      "What types of corporate gifts does Baharnani Advertising offer in Dubai?",
    answer:
      "We offer a diverse collection of customized, luxury, promotional, and eco-friendly corporate gifts, including mugs, pens, hampers, gadgets, chocolates, and branded accessories.",
  },
  {
    id: 4,
    question:
      "Can Baharnani Advertising customize corporate gifts with our logo?",
    answer:
      "Yes, we provide full branding and personalization options such as logo engraving, embossing, printing, and packaging customization for all types of gifts.",
  },
  {
    id: 5,
    question:
      "How do I choose the right corporate gift from Baharnani Advertising?",
    answer:
      "Our team will help you select gifts based on your budget, audience, and purpose, ensuring your gift aligns perfectly with your brand image.",
  },
  {
    id: 6,
    question:
      "Are eco-friendly corporate gifts available at Baharnani Advertising?",
    answer:
      "Absolutely. We have a dedicated collection of sustainable gifts like reusable bottles, bamboo kits, jute bags, and organic hampers to promote green gifting.",
  },
  {
    id: 7,
    question:
      "Why should I choose Baharnani Advertising for corporate gifts in Dubai?",
    answer:
      "We combine creativity, premium quality, fast delivery, and customization expertise, making us one of the most trusted corporate gift suppliers in Dubai and UAE.",
  },
  {
    id: 8,
    question: "Do you offer corporate chocolate gifts and festive hampers?",
    answer:
      "Yes, we design corporate chocolate gifts, Festive gift boxes, and festive hampers that can be customized with your logo and brand colors.",
  },
  {
    id: 9,
    question: "Which is the best promotional corporate gifts supplier in Dubai?",
    answer:
      "A good corporate gifts supplier in Dubai should offer product variety, customization options, bulk order support, quality branding, and reliable delivery. Baharnani Advertising helps businesses choose customized, promotional, luxury, smart, and affordable corporate gifts based on budget, audience, and occasion.",
  },
  {
    id: 10,
    question: "Do you offer customized corporate gifts in Dubai with logo printing?",
    answer:
      "Yes, Baharnani provides customized corporate gifts in Dubai with branding options such as logo printing, engraving, embossing, and packaging customization, depending on the selected product.",
  },
  {
    id: 11,
    question: "What are the best smart corporate gifts for employees?",
    answer:
      "Popular smart corporate gifts include wireless chargers, Bluetooth speakers, USB drives, power banks, smart bottles, tech organizers, and laptop accessories. These gifts are practical for employees, clients, and event attendees.",
  },
  {
    id: 12,
    question: "Do you supply promotional gifts for events and exhibitions in Dubai?",
    answer:
      "Yes, we supply promotional gifts in Dubai for corporate events, exhibitions, trade shows, product launches, conferences, and marketing campaigns. Options include pens, notebooks, bags, drinkware, tech accessories, apparel, and branded giveaways.",
  },
  {
    id: 13,
    question: "Can I order affordable corporate gifts in bulk?",
    answer:
      "Yes, businesses can request affordable corporate gifts for bulk orders, including branded stationery, drinkware, bags, apparel, and promotional giveaways. The best option depends on quantity, budget, branding method, and delivery timeline.",
  },
  {
    id: 14,
    question: "Do you offer luxury corporate gifts in Dubai?",
    answer:
      "Yes, Baharnani offers luxury corporate gifts in Dubai, such as premium gift sets, executive hampers, leather accessories, branded drinkware, watches, and high-end business gifts for clients, partners, and senior teams.",
  },
  {
    id: 15,
    question: "What are the most popular corporate gifts in Dubai?",
    answer:
      "Popular corporate gifts in Dubai include branded pens, notebooks, drinkware, laptop bags, power banks, wireless chargers, apparel, eco-friendly gifts, gift hampers, and customized corporate gift sets.",
  },
  {
    id: 16,
    question: "How do I choose the right corporate gift for my company?",
    answer:
      "Choose corporate gifts based on your audience, budget, purpose, quantity, branding style, and occasion. For example, smart corporate gifts work well for employees, luxury gifts work well for premium clients, and affordable promotional gifts work well for events and campaigns.",
  },
];


export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      

      {/* Page content - above fixed grid */}
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
        <WhyChooseUs
          features={homeFeatures}
          title={
            <>
              <span className="inline-flex items-center gap-2 flex-wrap justify-center">
                <span>Why  
                </span>
                <span className="inline-flex border border-neutral-300 rounded-lg p-0.5 sm:p-1 ring ring-neutral-300 ring-offset-2 rotate-6 bg-neutral-100" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#0F5C85]" aria-hidden="true">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
                    <path d="M12 19l0 .01" />
                  </svg>
                </span>
                <span>choose Baharnani Advertising </span>
                <span className="inline-flex border border-neutral-300 rounded-lg p-0.5 sm:p-1 ring ring-neutral-300 ring-offset-2 -rotate-6 bg-neutral-100" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#0F5C85]" aria-hidden="true">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 9a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
                    <path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889" />
                    <path d="M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889" />
                  </svg>
                </span>
                <span>as Your Most Trusted Corporate Gifts Supplier in Dubai?</span>
              </span>
            </>
          }
        />
        <FAQ
          faqData={homeFaqData}
          title={
            <>
              <span className="inline-flex items-center gap-2 flex-wrap justify-center">
                <span>Frequently</span>
                <span className="inline-flex border border-neutral-300 rounded-lg p-0.5 sm:p-1 ring ring-neutral-300 ring-offset-2 rotate-6 bg-neutral-100" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#0F5C85]" aria-hidden="true">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
                    <path d="M12 19l0 .01" />
                  </svg>
                </span>
                <span>Asked Questions About</span>
                <span className="inline-flex border border-neutral-300 rounded-lg p-0.5 sm:p-1 ring ring-neutral-300 ring-offset-2 -rotate-6 bg-neutral-100" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#0F5C85]" aria-hidden="true">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 9a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -2" />
                    <path d="M12 8l0 13" />
                    <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
                    <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" />
                  </svg>
                </span>
                <span>Corporate Gifts in Dubai & UAE</span>
              </span>
            </>
          }
          subtitle="Get answers to common questions about our products and services"
        />
        <CallToAction />
      </div>
    </main>
  );
}
