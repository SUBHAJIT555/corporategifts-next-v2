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
  LuPackage,
  LuPackageSearch,
  LuSparkles,
  LuUsers,
} from "@/components/icons";
import { Briefcase } from "lucide-react";

export const dynamic = "force-static";

const CATEGORY_SLUG = "bags-and-travel";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Home-page-hero-images/Bags-&-travel.webp";

const bagsAndTravelsFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Premium Quality Bags & Travel Accessories",
    description:
      "From executive briefcases to luxury luggage sets, we offer high-quality bags and travel accessories perfect for corporate gifting and business professionals.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom logo printing, embroidery, and branded packaging to strengthen your brand identity with every journey.",
    icon: <LuSparkles className="h-5 w-5" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of briefcases, backpacks, travel bags, luggage sets, and document holders that make perfect corporate gifts for clients and employees.",
    icon: <LuPackageSearch className="h-5 w-5" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Business Travelers",
    description:
      "Our travel accessories are designed for professionals on the go, featuring durable materials, smart compartments, and modern designs.",
    icon: <LuUsers className="h-5 w-5" />,
    iconColor: "#8BC34A",
  },
  {
    id: 5,
    number: "05",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <BiWorld className="h-5 w-5" />,
    iconColor: "#3F3F9F",
  },
  {
    id: 6,
    number: "06",
    title: "Trusted Quality",
    description:
      "Sourced from leading manufacturers, our bags and travel accessories combine style, durability, and functionality for lasting impressions.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#B6E9C8",
  },
];

const fullIntroText = (
  <>
    Looking for the perfect corporate gift that combines style, functionality, and
    professionalism? Our premium collection of bags and travel accessories
    features everything from executive leather briefcases and premium travel
    backpacks to luxury luggage sets and document holders. Each item is
    carefully selected to make a lasting impression on your clients, partners,
    and employees. Whether you need branded travel bags for business
    professionals or sophisticated luggage for client appreciation, we&apos;ve
    got you covered with the finest selection across Dubai and the UAE.
  </>
);

async function getBagsData(page: number) {
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
    console.error("Failed to load bags & travel products:", error);
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
      "Failed to generate static params for bags & travel pages:",
      error,
    );
    return [{ page: "1" }];
  }
}

export default async function BagsAndTravelPage({
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

  const { categories, productData } = await getBagsData(pageNumber);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <CategoryHero
        eyebrow="Bags & travel"
        eyebrowIcon={
          <Briefcase className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
        }
        title={
          <>
            Premium{" "}
            <span className="text-brand-accent">Bags &amp; Travel</span>{" "}
            Accessories for Corporate Gifting in Dubai
          </>
        }
        subtitle="Discover our exclusive collection of high-quality bags and luxury travel accessories, perfect for corporate gifts, client appreciation, and employee recognition programs."
        ctaHref="#bags-travel"
        ctaLabel="Shop Bags & Travel"
      />
      <SectionDivider />
      <CategoryIntro
        imageUrl={HERO_IMAGE}
        imageAlt="Bags and travel accessories collection preview"
        content={fullIntroText}
        preview={
          <>
            Looking for the perfect corporate gift that combines style,
            functionality, and professionalism?
          </>
        }
        heading="About Bags & Travel Gifts"
      />
      <SectionDivider />
      <ProductGridClient
        title="Explore Our Collection of Bags & Travel Accessories"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="bags-travel"
        categorySlug={CATEGORY_SLUG}
        variant="category"
      />
      <SectionDivider />
      <CategoryWhyChooseUs
        title={
          <>
            Why Choose Baharnani for{" "}
            <span className="whitespace-nowrap">Bags &amp; Travel?</span>
          </>
        }
        subtitle="Specialized in premium bags, luggage, and travel accessories for corporate gifting across Dubai and the UAE."
        features={bagsAndTravelsFeatures}
      />
      <SectionDivider />
      <CategoryCallToAction
        title="Your Trusted Partner for Corporate Bags & Travel Accessories in Dubai"
        subtitle={
          <>
            From custom-branded briefcases to luxury luggage sets, we deliver
            premium quality corporate gifts that strengthen relationships and
            elevate your brand presence.
          </>
        }
      />
      <SectionDivider />
    </main>
  );
}
