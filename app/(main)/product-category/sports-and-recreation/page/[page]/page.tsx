import { notFound, redirect } from "next/navigation";
import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, { type FeatureCard } from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  LuDumbbell,
  LuTrophy,
  LuActivity,
  LuTarget,
  LuHeart,
  LuGift,
} from "@/components/icons";

export const dynamic = "force-static";

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
    icon: <LuDumbbell className="w-8 h-8" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom logo printing, embroidery, and branded packaging to strengthen your brand identity with every activity.",
    icon: <LuTrophy className="w-8 h-8" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of fitness trackers, yoga mats, golf sets, tennis rackets, gym bags, and resistance bands that make perfect corporate gifts.",
    icon: <LuActivity className="w-8 h-8" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Wellness Programs",
    description:
      "Whether it's employee wellness initiatives, corporate sports events, or team building activities, our sports products suit every occasion.",
    icon: <LuHeart className="w-8 h-8" />,
    iconColor: "#8BC34A",
  },
  {
    id: 5,
    number: "05",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <LuTarget className="w-8 h-8" />,
    iconColor: "#3F3F9F",
  },
  {
    id: 6,
    number: "06",
    title: "Trusted Quality",
    description:
      "Sourced from premium suppliers, our sports and recreation products combine quality, durability, and elegant presentation for lasting impressions.",
    icon: <LuGift className="w-8 h-8" />,
    iconColor: "#2196F3",
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

    return {
      categories,
      productData,
    };
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
      "Failed to generate static params for sports & recreation pages:",
      error,
    );
    return [{ page: "1" }];
  }
}

export default async function SportsAndRecreationPage({
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

  const { categories, productData } = await getSportsData(pageNumber);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <CommonHero
        title=" "
        titleLine2Before="Premium "
        titleLine2Highlight="Sports & Recreation "
        titleLine2After=" for Corporate Gifting in Dubai"
        titlesuffix=""
        subtitle="Discover our exclusive collection of high-quality sports equipment and recreational items, perfect for corporate gifts, employee wellness programs, and team building activities."
        // imageUrl={HERO_IMAGE}
        buttonLink="#sports-recreation"
        buttonText="Shop Sports & Recreation"
      />

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

      <ProductGridClient
        title="Explore Our Collection of Sports & Recreation Products"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="sports-recreation"
        categorySlug={CATEGORY_SLUG}
      />

      <WhyChooseUs features={sportsAndRecreationFeatures} />

      <CallToAction
        title="Your Trusted Partner for Corporate Sports & Recreation Gifts in Dubai"
        subtitle={
          <>
            From custom-branded fitness equipment to premium sports accessories,
            we deliver high-quality products that promote wellness, strengthen
            relationships, and elevate your brand presence.
          </>
        }
        backgroundImageUrl={HERO_IMAGE}
        buttons={[
          {
            text: "Contact Our Team",
            className:
              "bg-linear-to-r from-neutral-800 to-neutral-500! text-white! border! border-neutral-200! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!",
            link: "/contact-us",
          },
          {
            text: "Explore Product Categories",
            className:
              "bg-linear-to-r from-neutral-100 to-neutral-300! border! border-neutral-200! text-neutral-700! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!",
            link: "/products",
          },
        ]}
      />
    </main>
  );
}

