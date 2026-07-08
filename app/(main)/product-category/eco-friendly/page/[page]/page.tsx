import { notFound, redirect } from "next/navigation";
import CategoryCallToAction from "@/components/pages/ProductCategory/CategoryCallToAction";
import CategoryHero from "@/components/pages/ProductCategory/CategoryHero";
import CategoryWhyChooseUs from "@/components/pages/ProductCategory/CategoryWhyChooseUs";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import SectionDivider from "@/components/ui/SectionDivider";
import type { FeatureCard } from "@/components/ui/WhyChooseUs";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  BiWorld,
  LuAward,
  LuLeaf,
  LuPackage,
  LuUsers,
} from "@/components/icons";
import { Leaf } from "lucide-react";

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
    icon: <LuLeaf className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your eco-friendly corporate gifts with custom printing, logo engraving, and sustainable packaging to strengthen your brand identity.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of bamboo products, reusable items, solar-powered accessories, and organic materials that make perfect sustainable corporate gifts.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Environmentally Conscious",
    description:
      "Demonstrate your commitment to sustainability with gifts that align with your corporate values and green initiatives.",
    icon: <LuLeaf className="h-5 w-5" />,
    iconColor: "#8BC34A",
  },
  {
    id: 5,
    number: "05",
    title: "Perfect for Every Occasion",
    description:
      "Whether it's client appreciation, employee recognition, or corporate events, our eco-friendly products suit every gifting occasion.",
    icon: <LuUsers className="h-5 w-5" />,
    iconColor: "#3F3F9F",
  },
  {
    id: 6,
    number: "06",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <BiWorld className="h-5 w-5" />,
    iconColor: "#B6E9C8",
  },
];

const fullIntroText = (
  <>
    Looking for eco friendly corporate gifts Dubai businesses rely on to reflect
    their sustainability values? Our premium collection of{" "}
    <span className="font-semibold text-ink">
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

    return { categories, productData };
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
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <CategoryHero
        eyebrow="Eco friendly"
        eyebrowIcon={
          <Leaf className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
        }
        title={
          <>
            <span className="text-brand-accent">Eco-Friendly Corporate Gifts</span>{" "}
            for Sustainable Branding in Dubai
          </>
        }
        subtitle="Discover our exclusive collection of sustainable and environmentally conscious corporate gifts, perfect for showcasing your commitment to green values while strengthening client and employee relationships."
        ctaHref="#eco-friendly"
        ctaLabel="Shop Eco-Friendly Gifts"
      />
      <SectionDivider />
      <CategoryIntro
        imageUrl={HERO_IMAGE}
        imageAlt="Eco-friendly products collection preview"
        content={fullIntroText}
        preview={
          <>
            Looking for eco friendly corporate gifts Dubai businesses rely on to
            reflect their sustainability values?
          </>
        }
        heading="About Eco-Friendly Corporate Gifts"
      />
      <SectionDivider />
      <ProductGridClient
        title="Explore Our Collection of Eco-Friendly Corporate Gifts"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="eco-friendly"
        categorySlug={CATEGORY_SLUG}
        variant="category"
      />
      <SectionDivider />
      <CategoryWhyChooseUs
        title={
          <>
            Why Choose Baharnani for{" "}
            <span className="whitespace-nowrap">Eco-Friendly Gifts?</span>
          </>
        }
        subtitle="Specialized in sustainable corporate gifts, reusable products, and environmentally conscious branding solutions for businesses across Dubai and the UAE."
        features={ecoFriendlyFeatures}
      />
      <SectionDivider />
      <CategoryCallToAction
        title="Your Trusted Partner for Eco-Friendly Corporate Gifts in Dubai"
        subtitle={
          <>
            From sustainable bamboo products to reusable accessories, we deliver
            premium quality eco-friendly corporate gifts that strengthen
            relationships, elevate your brand presence, and demonstrate your
            commitment to environmental responsibility.
          </>
        }
      />
      <SectionDivider />
    </main>
  );
}
