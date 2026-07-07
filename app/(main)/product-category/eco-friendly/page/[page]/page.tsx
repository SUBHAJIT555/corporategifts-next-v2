import { notFound, redirect } from "next/navigation";
import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, { type FeatureCard } from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  LuLeaf,
  LuAward,
  LuPackage,
  LuUsers,
  BiWorld,
} from "@/components/icons";

export const dynamic = "force-static";

const CATEGORY_SLUG = "eco-friendly";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Products-hero-image/Eco-friendly.webp";

const ecoFriendlyFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Sustainable Materials",
    description:
      "From bamboo desk organizers to recycled paper notebooks, we offer eco-friendly products made from sustainable and renewable materials.",
    icon: <LuLeaf className="w-8 h-8" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your eco-friendly corporate gifts with custom printing, logo engraving, and sustainable packaging to strengthen your brand identity.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of bamboo products, reusable items, solar-powered accessories, and organic materials that make perfect sustainable corporate gifts.",
    icon: <LuPackage className="w-8 h-8" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Environmentally Conscious",
    description:
      "Demonstrate your commitment to sustainability with gifts that align with your corporate values and green initiatives.",
    icon: <LuLeaf className="w-8 h-8" />,
    iconColor: "#8BC34A",
  },
  {
    id: 5,
    number: "05",
    title: "Perfect for Every Occasion",
    description:
      "Whether it's client appreciation, employee recognition, or corporate events, our eco-friendly products suit every gifting occasion.",
    icon: <LuUsers className="w-8 h-8" />,
    iconColor: "#3F3F9F",
  },
  {
    id: 6,
    number: "06",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <BiWorld className="w-8 h-8" />,
    iconColor: "#2196F3",
  },
];

const fullIntroText = (
  <>
    Looking for eco friendly corporate gifts Dubai businesses rely on to reflect
    their sustainability values? Our premium collection of{" "}
    <span className="font-semibold text-textcolor">
      eco-friendly corporate gifts in Dubai
    </span>{" "}
    features everything from bamboo desk organizers and recycled paper notebooks
    to solar-powered chargers, plantable pencils, and reusable tote bags. Each
    item is carefully selected to showcase your commitment to environmental
    responsibility while creating a lasting impression on clients, partners, and
    employees. All products can be personalized with your company logo or
    message, ensuring your brand is noticed for the right reasons across Dubai
    and the UAE.
  </>
);

async function getEcoFriendlyData(page: number) {
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
    console.error("Failed to load eco-friendly products:", error);
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
      "Failed to generate static params for eco-friendly pages:",
      error,
    );
    return [{ page: "1" }];
  }
}

export default async function EcoFriendlyPage({
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

  const { categories, productData } = await getEcoFriendlyData(pageNumber);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <CommonHero
        title=" "
        titleLine2Before=" "
        titleLine2Highlight="Eco-Friendly Corporate Gifts "
        titleLine2After=" for Sustainable Branding in Dubai"
        subtitle="Discover our exclusive collection of sustainable and environmentally conscious corporate gifts, perfect for showcasing your commitment to green values while strengthening client and employee relationships."
        buttonLink="#eco-friendly"
        buttonText="Shop Eco-Friendly Gifts"
      />

      <CategoryIntro
        imageUrl={HERO_IMAGE}
        imageAlt="Eco-friendly products collection preview"
        content={fullIntroText}
      />

      <ProductGridClient
        title="Explore Our Collection of Eco-Friendly Corporate Gifts"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="eco-friendly"
        categorySlug={CATEGORY_SLUG}
      />

      <WhyChooseUs features={ecoFriendlyFeatures} />

      <CallToAction
        title="Your Trusted Partner for Eco-Friendly Corporate Gifts in Dubai"
        subtitle={
          <>
            From sustainable bamboo products to reusable accessories, we deliver
            premium quality eco-friendly corporate gifts that strengthen
            relationships, elevate your brand presence, and demonstrate your
            commitment to environmental responsibility.
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

