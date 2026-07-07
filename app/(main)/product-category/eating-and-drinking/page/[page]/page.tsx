import { notFound, redirect } from "next/navigation";
import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, { type FeatureCard } from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  LuAward,
  LuGift,
  LuPackage,
  LuSparkles,
  LuUsers,
  LuCoffee,
} from "@/components/icons";

export const dynamic = "force-static";

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
    icon: <LuCoffee className="w-8 h-8" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom packaging, logo printing, and branded gift boxes to strengthen your brand identity with every sip.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of premium coffee sets, gourmet teas, luxury chocolates, wine accessories, and insulated drinkware that make perfect corporate gifts.",
    icon: <LuPackage className="w-8 h-8" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Every Occasion",
    description:
      "Whether it's client appreciation, employee recognition, corporate events, or holiday gifting, our food and beverage products suit every occasion.",
    icon: <LuGift className="w-8 h-8" />,
    iconColor: "#8BC34A",
  },
  {
    id: 5,
    number: "05",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <LuUsers className="w-8 h-8" />,
    iconColor: "#3F3F9F",
  },
  {
    id: 6,
    number: "06",
    title: "Trusted Quality",
    description:
      "Sourced from premium suppliers, our eating and drinking products combine quality, taste, and elegant presentation for lasting impressions.",
    icon: <LuSparkles className="w-8 h-8" />,
    iconColor: "#4CAF50",
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

    return {
      categories,
      productData,
    };
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
      "Failed to generate static params for eating & drinking pages:",
      error,
    );
    return [{ page: "1" }];
  }
}

export default async function EatingAndDrinkingPage({
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

  const { categories, productData } = await getEatingAndDrinkingData(
    pageNumber,
  );
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <CommonHero
        title=" "
        titleLine2Before="Premium "
        titleLine2Highlight="Eating & Drinking "
        titleLine2After="Products for Corporate Gifting in Dubai"
        titlesuffix=""
        subtitle="Discover our exclusive collection of high-quality food and beverage products, perfect for corporate gifts, client appreciation, and employee recognition programs."
        buttonLink="#eating-drinking"
        buttonText="Shop Eating & Drinking"
      />

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

      <ProductGridClient
        title="Explore Our Collection of Eating & Drinking Products"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="eating-drinking"
        categorySlug={CATEGORY_SLUG}
      />

      <WhyChooseUs features={eatingAndDrinkingFeatures} />

      <CallToAction
        title="Your Trusted Partner for Corporate Food & Beverage Gifts in Dubai"
        subtitle={
          <>
            From custom-branded coffee sets to luxury tea collections, we
            deliver premium quality eating and drinking products that strengthen
            relationships and elevate your brand presence.
          </>
        }
        backgroundImageUrl={HERO_IMAGE}
        buttons={[
          {
            text: "Contact Our Team",
            className:
              "bg-linear-to-r from-neutral-800 to-neutral-500! text-white! border! border-neutral-200! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!",
            link: "/contact-us",
            variant: "dark",
          },
          {
            text: "Explore Product Categories",
            className:
              "bg-linear-to-r from-neutral-100 to-neutral-300! border! border-neutral-200! text-neutral-700! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!",
            link: "/products",
            variant: "light",
          },
        ]}
      />
    </main>
  );
}

