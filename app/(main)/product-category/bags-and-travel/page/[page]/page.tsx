import { notFound, redirect } from "next/navigation";
import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, { type FeatureCard } from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  LuAward,
  LuPackage,
  LuPackageSearch,
  LuSparkles,
  LuUsers,
  BiWorld,
} from "@/components/icons";

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
    icon: <LuPackage className="w-8 h-8" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom logo printing, embroidery, and branded packaging to strengthen your brand identity with every journey.",
    icon: <LuSparkles className="w-8 h-8" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of briefcases, backpacks, travel bags, luggage sets, and document holders that make perfect corporate gifts for clients and employees.",
    icon: <LuPackageSearch className="w-8 h-8" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Business Travelers",
    description:
      "Our travel accessories are designed for professionals on the go, featuring durable materials, smart compartments, and modern designs.",
    icon: <LuUsers className="w-8 h-8" />,
    iconColor: "#8BC34A",
  },
  {
    id: 5,
    number: "05",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <BiWorld className="w-8 h-8" />,
    iconColor: "#3F3F9F",
  },
  {
    id: 6,
    number: "06",
    title: "Trusted Quality",
    description:
      "Sourced from leading manufacturers, our bags and travel accessories combine style, durability, and functionality for lasting impressions.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#4CAF50",
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

    return {
      categories,
      productData,
    };
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
    <main className="relative min-h-screen w-full overflow-hidden">
      <CommonHero
        title=" "
        titleLine2Before="Premium "
        titleLine2Highlight="Bags & Travel "
        titleLine2After="Accessories for Corporate Gifting in Dubai"
        subtitle="Discover our exclusive collection of high-quality bags and luxury travel accessories, perfect for corporate gifts, client appreciation, and employee recognition programs."
        buttonLink="#bags-travel"
        buttonText="Shop Bags & Travel"
      />

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

      <ProductGridClient
        title="Explore Our Collection of Bags & Travel Accessories"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="bags-travel"
        categorySlug={CATEGORY_SLUG}
      />

      <WhyChooseUs
        features={bagsAndTravelsFeatures}
        title={
          <>
            Why Choose Baharnani for{" "}
            <span className="whitespace-nowrap">
              Bags &amp; Travel?
            </span>
          </>
        }
        subtitle="Specialized in premium bags, luggage, and travel accessories for corporate gifting across Dubai and the UAE."
      />

      <CallToAction
        title="Your Trusted Partner for Corporate Bags & Travel Accessories in Dubai"
        subtitle={
          <>
            From custom-branded briefcases to luxury luggage sets, we deliver
            premium quality corporate gifts that strengthen relationships and
            elevate your brand presence.
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
