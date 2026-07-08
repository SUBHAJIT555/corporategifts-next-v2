import CategoryCallToAction from "@/components/pages/ProductCategory/CategoryCallToAction";
import CategoryHero from "@/components/pages/ProductCategory/CategoryHero";
import CategoryWhyChooseUs from "@/components/pages/ProductCategory/CategoryWhyChooseUs";
import PremiumGiftSetsFAQ from "@/components/pages/ProductCategory/PremiumGiftSets/PremiumGiftSetsFAQ";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import { AnimatedTestimonials } from "@/components/ui/AnimatedTestimonial";
import SectionDivider from "@/components/ui/SectionDivider";
import type { FAQItem } from "@/components/common/FAQ";
import type { FeatureCard } from "@/components/ui/WhyChooseUs";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  BiWorld,
  LuAward,
  LuGift,
  LuPackage,
  LuSparkles,
  LuUsers,
} from "@/components/icons";
import { Gem } from "lucide-react";

const CATEGORY_SLUG = "luxury-corporate-gifts-dubai";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Products-hero-image/Luxury-corporate-gifts.webp";

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

const luxuryCorporateGiftsFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Explore Our Luxury Corporate Gift Categories",
    description:
      "Discover our extensive collection of luxury corporate gifts across multiple categories, from premium tech accessories to elegant executive gifts, all designed to make a lasting impression on your clients and employees.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#C1D8FD",
  },
  {
    id: 2,
    number: "02",
    title: "Best Luxury Corporate Gifts Dubai Online",
    description:
      "Shop the finest selection of luxury corporate gifts available online in Dubai. Our curated collection features premium brands and exclusive items that reflect your company's commitment to excellence and quality.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#FFE5EC",
  },
  {
    id: 3,
    number: "03",
    title: "Corporate Gift Ideas for Every Occasion",
    description:
      "From milestone celebrations to client appreciation events, we provide tailored corporate gift solutions for every business occasion. Our diverse range ensures you'll find the perfect gift to strengthen professional relationships.",
    icon: <LuGift className="h-5 w-5" />,
    iconColor: "#FFF7BD",
  },
  {
    id: 4,
    number: "04",
    title: "Luxury Brands that Are Cheaper in Dubai",
    description:
      "Take advantage of Dubai's competitive luxury market with our selection of premium international brands offered at exceptional value. Get authentic luxury corporate gifts at prices that maximize your gifting budget.",
    icon: <LuSparkles className="h-5 w-5" />,
    iconColor: "#B6E9C8",
  },
];

const luxuryCorporateGiftsWhy: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Build Stronger Client Relationships",
    description:
      "Show your clients that you value their business with high-end gifts that demonstrate your commitment to excellence and strengthen professional partnerships for long-term success.",
    icon: <LuUsers className="h-5 w-5" />,
    iconColor: "#B6E9C8",
  },
  {
    id: 2,
    number: "02",
    title: "Memorable & Customized",
    description:
      "Stand out by offering unique customized corporate gifts that speak to your company's values and create lasting impressions that recipients will remember and appreciate.",
    icon: <LuSparkles className="h-5 w-5" />,
    iconColor: "#FFECB3",
  },
  {
    id: 3,
    number: "03",
    title: "Corporate Gifting Solutions Tailored to Your Needs",
    description:
      "Choose from a variety of gifts, from luxury gift hampers to branded items that reflect your business identity and meet your specific corporate gifting requirements.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#C1D8FD",
  },
  {
    id: 4,
    number: "04",
    title: "Reliable Delivery Across Dubai",
    description:
      "Fast and efficient delivery of all your luxury corporate gifts across Dubai, ensuring your gifts arrive on time and in perfect condition for every important occasion.",
    icon: <BiWorld className="h-5 w-5" />,
    iconColor: "#3F3F9F",
  },
  {
    id: 5,
    number: "05",
    title: "Customization Options",
    description:
      "We offer a wide range of customized corporate gifts that fit your brand and message perfectly, allowing you to create personalized experiences that align with your corporate identity.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#FFD6F8",
  },
  {
    id: 6,
    number: "06",
    title: "Competitive Prices for Luxury Gifts in Dubai",
    description:
      "We offer top-quality products at reasonable rates, including luxury gifts that are often better value in Dubai compared to other markets, maximizing your gifting budget without compromising on quality.",
    icon: <LuGift className="h-5 w-5" />,
    iconColor: "#FFE5EC",
  },
];

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What are the best luxury corporate gifts for clients in Dubai?",
    answer:
      "We offer a wide range of luxury corporate gifts that include everything from customized hampers, exclusive tech gifts, to branded leather items.",
  },
  {
    id: 2,
    question: "How can I get customized corporate gifts in Dubai?",
    answer:
      "We offer personalization options for all gifts. Add your company's logo, message, or choose from a variety of premium branding services.",
  },
  {
    id: 3,
    question: "What is the best time to order corporate gifts in Dubai?",
    answer:
      "To ensure timely delivery, we recommend placing orders at least 2 weeks in advance, especially for customized luxury corporate gifts.",
  },
  {
    id: 4,
    question: "Do you offer luxury gift hampers in Dubai?",
    answer:
      "Yes, we specialize in luxury gift hampers, beautifully curated to make a lasting impression.",
  },
  {
    id: 5,
    question: "Are your corporate gifting services in Dubai reliable?",
    answer:
      "Absolutely! We have years of experience and a reputation for providing high-quality gifts and on-time delivery for businesses across Dubai.",
  },
];

const fullIntroText = (
  <>
    <span className="font-semibold text-ink">Luxury Corporate Gifts Dubai</span>{" "}
    for every occasion: Whether you&apos;re celebrating a company milestone or
    rewarding your top clients, our selection of luxury corporate gifts ensures
    your brand stands out with sophistication and quality. We offer customized
    corporate gifts, luxury gift hampers, and more, delivered across Dubai.
  </>
);

async function getLuxuryData(page: number) {
  try {
    const [categories, productData] = await Promise.all([
      ProductsApi.categories(),
      ProductsApi.byCategory({
        categorySlug: CATEGORY_SLUG,
        page,
        per_page: PER_PAGE,
      }),
    ]);

    return { categories, productData };
  } catch (error) {
    console.error("Failed to load luxury corporate gifts products:", error);
    return {
      categories: [],
      productData: {
        products: [],
        total: 0,
        total_pages: 1,
        page,
        per_page: PER_PAGE,
      },
    };
  }
}

export default async function LuxuryCorporateGifts() {
  const page = 1;
  const { categories, productData } = await getLuxuryData(page);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <CategoryHero
        eyebrow="Luxury corporate gifts"
        eyebrowIcon={
          <Gem className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
        }
        title={
          <>
            <span className="text-brand-accent">Luxury Corporate Gifts</span> in
            Dubai — Make Your Business Relationships Stronger
          </>
        }
        subtitle="Explore the best selection of customized corporate gifts for clients and employees in Dubai."
        ctaHref="#luxury-corporate-gifts"
        ctaLabel="Shop Luxury Corporate Gifts"
      />
      <SectionDivider />
      <CategoryIntro
        imageUrl={HERO_IMAGE}
        imageAlt="Luxury corporate gifts collection preview"
        content={fullIntroText}
        preview={
          <>
            <span className="font-semibold text-ink">Luxury Corporate Gifts Dubai</span>{" "}
            for every occasion: celebrate milestones, reward top clients, and
            elevate your brand presence.
          </>
        }
        heading="About Luxury Corporate Gifts Dubai"
      />
      <SectionDivider />
      <ProductGridClient
        title="Explore Our Luxury Corporate Gifts Collection"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="luxury-corporate-gifts"
        categorySlug={CATEGORY_SLUG}
        variant="category"
      />
      <SectionDivider />
      <CategoryWhyChooseUs
        title="Featured Corporate Gift Categories"
        subtitle="Explore curated luxury gifting categories designed for executive appreciation, client retention, and premium brand experiences across Dubai."
        features={luxuryCorporateGiftsFeatures}
      />
      <SectionDivider />
      <AnimatedTestimonials
        testimonials={testimonials}
        showDivider={false}
      />
      <SectionDivider />
      <CategoryWhyChooseUs
        title="Why Choose Our Luxury Corporate Gifts in Dubai?"
        subtitle="Partner with a trusted Dubai supplier for high-end corporate gifts, personalized branding, and reliable delivery that strengthens every business relationship."
        features={luxuryCorporateGiftsWhy}
      />
      <SectionDivider />
      <PremiumGiftSetsFAQ
        title="Frequently Asked Questions About Corporate Gifts"
        subtitle="Get answers to common questions about our corporate gifts"
        faqData={faqItems}
      />
      <SectionDivider />
      <CategoryCallToAction
        title="Your Trusted Partner for Luxury Corporate Gifts in Dubai"
        subtitle={
          <>
            From luxury gift sets to premium executive hampers, we deliver
            high-quality corporate gifts that strengthen relationships, elevate
            your brand presence, and demonstrate your commitment to thoughtful
            gifting.
          </>
        }
      />
      <SectionDivider />
    </main>
  );
}
