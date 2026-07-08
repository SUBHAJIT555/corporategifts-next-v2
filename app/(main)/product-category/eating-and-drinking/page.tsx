import CategoryCallToAction from "@/components/pages/ProductCategory/CategoryCallToAction";
import CategoryHero from "@/components/pages/ProductCategory/CategoryHero";
import CategoryWhyChooseUs from "@/components/pages/ProductCategory/CategoryWhyChooseUs";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import SectionDivider from "@/components/ui/SectionDivider";
import type { FeatureCard } from "@/components/ui/WhyChooseUs";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  LuAward,
  LuCoffee,
  LuGift,
  LuPackage,
  LuSparkles,
  LuUsers,
} from "@/components/icons";
import { CupSoda } from "lucide-react";

const CATEGORY_SLUG = "eating-and-drinking";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Home-page-hero-images/Eating-&-drinking.webp";

const eatingAndDrinkingFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Premium Quality Food & Beverage Gifts",
    description:
      "From gourmet coffee sets to luxury tea collections, we offer high-quality eating and drinking products perfect for corporate gifting and client appreciation.",
    icon: <LuCoffee className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom packaging, logo printing, and branded gift boxes to strengthen your brand identity with every sip.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of premium coffee sets, gourmet teas, luxury chocolates, wine accessories, and insulated drinkware that make perfect corporate gifts.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Every Occasion",
    description:
      "Whether it's client appreciation, employee recognition, corporate events, or holiday gifting, our food and beverage products suit every occasion.",
    icon: <LuGift className="h-5 w-5" />,
    iconColor: "#8BC34A",
  },
  {
    id: 5,
    number: "05",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <LuUsers className="h-5 w-5" />,
    iconColor: "#3F3F9F",
  },
  {
    id: 6,
    number: "06",
    title: "Trusted Quality",
    description:
      "Sourced from premium suppliers, our eating and drinking products combine quality, taste, and elegant presentation for lasting impressions.",
    icon: <LuSparkles className="h-5 w-5" />,
    iconColor: "#B6E9C8",
  },
];

const fullIntroText = (
  <>
    Looking for the perfect corporate gift that combines taste, quality, and
    elegance? Our premium collection of eating and drinking products features
    everything from gourmet coffee gift sets and luxury tea collections to
    artisan chocolate boxes and executive wine accessories. Each item is
    carefully selected to make a lasting impression on your clients, partners,
    and employees. Whether you need branded coffee sets for client appreciation
    or sophisticated beverage accessories for corporate events, we&apos;ve got
    you covered with the finest selection across Dubai and the UAE.
  </>
);

async function getEatingAndDrinkingData(page: number) {
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
    console.error("Failed to load eating & drinking products:", error);
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

export default async function EatingAndDrinking() {
  const page = 1;
  const { categories, productData } = await getEatingAndDrinkingData(page);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <CategoryHero
        eyebrow="Eating & drinking"
        eyebrowIcon={
          <CupSoda className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
        }
        title={
          <>
            Premium{" "}
            <span className="text-brand-accent">Eating &amp; Drinking</span>{" "}
            Products for Corporate Gifting in Dubai
          </>
        }
        subtitle="Discover our exclusive collection of high-quality food and beverage products, perfect for corporate gifts, client appreciation, and employee recognition programs."
        ctaHref="#eating-drinking"
        ctaLabel="Shop Eating & Drinking"
      />
      <SectionDivider />
      <CategoryIntro
        imageUrl={HERO_IMAGE}
        imageAlt="Eating and drinking products collection preview"
        content={fullIntroText}
        preview={
          <>
            Looking for the perfect corporate gift that combines taste, quality,
            and elegance?
          </>
        }
        heading="About Eating & Drinking Gifts"
      />
      <SectionDivider />
      <ProductGridClient
        title="Explore Our Collection of Eating & Drinking Products"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="eating-drinking"
        categorySlug={CATEGORY_SLUG}
        variant="category"
      />
      <SectionDivider />
      <CategoryWhyChooseUs
        title={
          <>
            Why Choose Baharnani for{" "}
            <span className="whitespace-nowrap">Eating &amp; Drinking?</span>
          </>
        }
        subtitle="Specialized in premium corporate food and beverage gifts, drinkware, and gourmet collections tailored for businesses across Dubai and the UAE."
        features={eatingAndDrinkingFeatures}
      />
      <SectionDivider />
      <CategoryCallToAction
        title="Your Trusted Partner for Corporate Food & Beverage Gifts in Dubai"
        subtitle={
          <>
            From custom-branded coffee sets to luxury tea collections, we
            deliver premium quality eating and drinking products that strengthen
            relationships and elevate your brand presence.
          </>
        }
      />
      <SectionDivider />
    </main>
  );
}
