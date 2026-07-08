import CategoryCallToAction from "@/components/pages/ProductCategory/CategoryCallToAction";
import CategoryHero from "@/components/pages/ProductCategory/CategoryHero";
import CategoryWhyChooseUs from "@/components/pages/ProductCategory/CategoryWhyChooseUs";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import SectionDivider from "@/components/ui/SectionDivider";
import type { FeatureCard } from "@/components/ui/WhyChooseUs";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  LuActivity,
  LuDumbbell,
  LuGift,
  LuHeart,
  LuTarget,
  LuTrophy,
} from "@/components/icons";

const CATEGORY_SLUG = "sports-and-recreation";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Products-hero-image/Sports-&-recreation.webp";

const sportsAndRecreationFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Premium Quality Sports Equipment",
    description:
      "From fitness trackers to yoga mats, we offer high-quality sports and recreation products perfect for corporate wellness programs and employee recognition.",
    icon: <LuDumbbell className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom logo printing, embroidery, and branded packaging to strengthen your brand identity with every activity.",
    icon: <LuTrophy className="h-5 w-5" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of fitness trackers, yoga mats, golf sets, tennis rackets, gym bags, and resistance bands that make perfect corporate gifts.",
    icon: <LuActivity className="h-5 w-5" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Wellness Programs",
    description:
      "Whether it's employee wellness initiatives, corporate sports events, or team building activities, our sports products suit every occasion.",
    icon: <LuHeart className="h-5 w-5" />,
    iconColor: "#8BC34A",
  },
  {
    id: 5,
    number: "05",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <LuTarget className="h-5 w-5" />,
    iconColor: "#3F3F9F",
  },
  {
    id: 6,
    number: "06",
    title: "Trusted Quality",
    description:
      "Sourced from premium suppliers, our sports and recreation products combine quality, durability, and elegant presentation for lasting impressions.",
    icon: <LuGift className="h-5 w-5" />,
    iconColor: "#C1D8FD",
  },
];

const fullIntroText = (
  <>
    Looking for the perfect corporate gift that promotes health, wellness, and
    active living? Our premium collection of sports and recreation products
    features everything from fitness trackers and yoga mats to golf sets and
    tennis rackets. Each item is carefully selected to encourage an active
    lifestyle while making a lasting impression on your clients, partners, and
    employees. Whether you need branded fitness equipment for wellness
    programs or sophisticated sports accessories for corporate events, we&apos;ve
    got you covered with the finest selection across Dubai and the UAE.
  </>
);

async function getSportsData(page: number) {
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
    console.error("Failed to load sports & recreation products:", error);
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

export default async function SportsAndRecreation() {
  const page = 1;
  const { categories, productData } = await getSportsData(page);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <CategoryHero
        eyebrow="Sports & recreation"
        eyebrowIcon={
          <LuDumbbell className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
        }
        title={
          <>
            Premium{" "}
            <span className="text-brand-accent">Sports &amp; Recreation</span>{" "}
            Products for Corporate Gifting in Dubai
          </>
        }
        subtitle="Discover our exclusive collection of high-quality sports equipment and recreational items, perfect for corporate gifts, employee wellness programs, and team building activities."
        ctaHref="#sports-recreation"
        ctaLabel="Shop Sports & Recreation"
      />
      <SectionDivider />
      <CategoryIntro
        imageUrl={HERO_IMAGE}
        imageAlt="Sports and recreation products collection preview"
        content={fullIntroText}
        preview={
          <>
            Looking for the perfect corporate gift that promotes health,
            wellness, and active living?
          </>
        }
        heading="About Sports & Recreation Gifts"
      />
      <SectionDivider />
      <ProductGridClient
        title="Explore Our Collection of Sports & Recreation Products"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="sports-recreation"
        categorySlug={CATEGORY_SLUG}
        variant="category"
      />
      <SectionDivider />
      <CategoryWhyChooseUs
        title={
          <>
            Why Choose Baharnani for{" "}
            <span className="whitespace-nowrap">Sports &amp; Recreation?</span>
          </>
        }
        subtitle="Specialized in premium sports equipment, wellness gifts, and recreational products for corporate gifting across Dubai and the UAE."
        features={sportsAndRecreationFeatures}
      />
      <SectionDivider />
      <CategoryCallToAction
        title="Your Trusted Partner for Corporate Sports & Recreation Gifts in Dubai"
        subtitle={
          <>
            From custom-branded fitness equipment to premium sports accessories,
            we deliver high-quality products that promote wellness, strengthen
            relationships, and elevate your brand presence.
          </>
        }
      />
      <SectionDivider />
    </main>
  );
}
