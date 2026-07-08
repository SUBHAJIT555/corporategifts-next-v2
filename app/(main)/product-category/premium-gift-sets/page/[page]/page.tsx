import { notFound, redirect } from "next/navigation";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import AdditionalForSeo, {
  type SeoSection,
} from "@/components/pages/ProductCategory/PremiumGiftSets/AdditionalForSeo";
import PremiumGiftSetsCallToAction from "@/components/pages/ProductCategory/PremiumGiftSets/PremiumGiftSetsCallToAction";
import PremiumGiftSetsFAQ from "@/components/pages/ProductCategory/PremiumGiftSets/PremiumGiftSetsFAQ";
import PremiumGiftSetsHero from "@/components/pages/ProductCategory/PremiumGiftSets/PremiumGiftSetsHero";
import PremiumGiftSetsWhyChooseUs from "@/components/pages/ProductCategory/PremiumGiftSets/PremiumGiftSetsWhyChooseUs";
import SectionDivider from "@/components/ui/SectionDivider";
import type { FeatureCard } from "@/components/ui/WhyChooseUs";
import type { FAQItem } from "@/components/common/FAQ";
import { ProductsApi } from "@/lib/api/endpoints";
import { LuPackage, LuAward } from "@/components/icons";

export const dynamic = "force-static";

const CATEGORY_SLUG = "premium-gift-sets";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Products-hero-image/Premiums-gift-sets.webp";

const giftSetFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Perfect Blend of Luxury and Affordability",
    description:
      "Our gift sets in Dubai combine elegance with value. From budget-friendly options that don't compromise on quality to luxury gift sets Dubai customers adore, each piece is designed to impress and delight.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Curated for Every Occasion",
    description:
      "Whether it's a birthday, corporate event, or festive celebration, our best gift sets in Dubai include everything from skincare and chocolates to signature perfumes and candles -ideal for personal and professional gifting alike.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
];

const giftSetWhy: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Wide Range of Luxury Gift Sets Dubai",
    description:
      "Discover our extensive collection of luxury gift sets in Dubai, featuring premium perfumes, skincare essentials, gourmet treats, and elegant accessories. Each set is carefully curated to offer the perfect blend of sophistication and quality.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Personalized Options for Every Recipient",
    description:
      "Make your gift truly special with our personalization services. Add custom messages, names, or corporate branding to create unique gift sets that reflect your thoughtfulness and attention to detail.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 3,
    number: "03",
    title: "Same-Day & Scheduled Delivery Across UAE",
    description:
      "Enjoy flexible delivery options with same-day delivery in Dubai and scheduled delivery across all UAE cities. Our reliable logistics ensure your gift sets arrive perfectly packaged and on time.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 4,
    number: "04",
    title: "Corporate Bulk Orders Available",
    description:
      "Perfect for corporate gifting, we offer bulk order solutions with special pricing for businesses. Ideal for employee appreciation, client gifts, and corporate events with professional packaging and branding options.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 5,
    number: "05",
    title: "Affordable & Premium Options",
    description:
      "Choose from our range of budget-friendly to luxury gift sets in Dubai. We offer premium quality at every price point, ensuring you find the perfect gift set that matches your budget without compromising on elegance.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
];

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What types of gift sets are available in Dubai?",
    answer:
      "We offer a range of gift sets in Dubai, including perfume gift sets, luxury hampers, birthday gift sets, and corporate gift sets for every occasion.",
  },
  {
    id: 2,
    question: "Can I customize my gift set?",
    answer:
      "Yes, all our luxury gift sets and corporate gift boxes can be personalized with names, messages, or your brand logo.",
  },
  {
    id: 3,
    question: "Do you deliver across UAE?",
    answer:
      "Absolutely! We offer gift set delivery across Dubai, Abu Dhabi, Sharjah, and other UAE cities.",
  },
  {
    id: 4,
    question: "What are the most popular gift sets in Dubai?",
    answer:
      "Our most popular collections include perfume gift sets, luxury gift hampers, and gift sets for her featuring premium skincare and fragrances.",
  },
  {
    id: 5,
    question: "Do you have budget-friendly gift sets?",
    answer:
      "Yes, our more affordable gift set options start from budget-friendly prices while maintaining a premium look and feel.",
  },
];

const seoSections: SeoSection[] = [
  {
    heading: "Affordable Yet Luxurious Gifting Options",
    content:
      "You don't have to spend a fortune to make a grand impression. We offer premium gift sets in Dubai that look luxurious but come at an accessible price. Each box is carefully packed with style and sophistication, making it perfect for gifting at scale.",
    highlightLine:
      "Luxury doesn't have to be expensive – our gift sets in Dubai prove that elegance is always within reach.",
  },
  {
    heading: "Gift Set Delivery Across Dubai & UAE",
    content:
      "Enjoy fast and reliable gift delivery across Dubai and other UAE cities. Whether it's for corporate clients, birthdays, or festive occasions, our team ensures your luxury gift sets arrive beautifully packaged and right on time.",
  },
];

const fullIntroText = (
  <>
    Looking for the best gift sets in Dubai to surprise someone special or
    delight your clients? Our exclusive collection features luxury gift sets,
    perfume gift sets, and birthday gift sets, thoughtfully curated for every
    taste and occasion. Whether you need a gift set for her, an elegant
    corporate gift set, or a budget-friendly option, we&apos;ve got you covered with
    the finest selection across the UAE.
  </>
);

async function getGiftSetData(page: number) {
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
    console.error("Failed to load premium gift sets products:", error);
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

export async function generateStaticParams() {
  try {
    const firstPage = await ProductsApi.byCategory({
      categorySlug: CATEGORY_SLUG,
      page: 1,
      per_page: PER_PAGE,
    });

    const totalPages = firstPage.total_pages || 1;

    return Array.from({ length: totalPages }, (_, index) => ({
      page: String(index + 1),
    }));
  } catch (error) {
    console.error(
      "Failed to generate static params for premium gift sets pages:",
      error,
    );
    return [{ page: "1" }];
  }
}

export default async function GiftSetPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNumber = Number(page);

  if (pageNumber === 1) {
    redirect(`/product-category/${CATEGORY_SLUG}`);
  }

  if (!pageNumber || pageNumber < 1) {
    notFound();
  }

  const { categories, productData } = await getGiftSetData(pageNumber);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <PremiumGiftSetsHero />
      <SectionDivider />
      <CategoryIntro
        imageUrl={HERO_IMAGE}
        imageAlt="Premium gift sets collection preview"
        content={fullIntroText}
        preview={
          <>
            Looking for the best gift sets in Dubai to surprise someone special
            or delight your clients?
          </>
        }
        heading="About Premium Gift Sets"
      />
      <SectionDivider />
      <ProductGridClient
        title="Explore Our Collection of Gift Sets"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="gift-set"
        categorySlug={CATEGORY_SLUG}
        variant="category"
      />
      <SectionDivider />
      <PremiumGiftSetsWhyChooseUs
        title="Why Choose Our Gift Sets in Dubai?"
        features={giftSetFeatures}
      />
      <SectionDivider />
      <AdditionalForSeo sections={seoSections} />
      <SectionDivider />
      <PremiumGiftSetsWhyChooseUs
        title="Why We’re the Best Choice for Gift Sets in Dubai"
        features={giftSetWhy}
        showCtaCard
      />
      <SectionDivider />
      <PremiumGiftSetsFAQ
        title="FAQs – Everything About Gift Sets in Dubai"
        subtitle="Get answers to common questions about our products and services"
        faqData={faqItems}
      />
      <SectionDivider />
      <PremiumGiftSetsCallToAction />
      <SectionDivider />
    </main>
  );
}
