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
  LuSparkles,
  LuUsers,
} from "@/components/icons";
import { Laptop } from "lucide-react";

export const dynamic = "force-static";

const CATEGORY_SLUG = "technology-and-accessories";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Products-hero-image/Technology-&-accessories.webp";

const technologyAndAccessoriesFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Premium Technology & Accessories",
    description:
      "From wireless chargers to smart desk lamps, we offer high-quality technology products and accessories perfect for corporate gifting and modern workspaces.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom logo engraving, laser etching, and branded packaging to strengthen your brand identity with every use.",
    icon: <LuSparkles className="h-5 w-5" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of wireless speakers, USB-C hubs, laptop stands, power banks, and smart accessories that make perfect corporate gifts for clients and employees.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Modern Workspaces",
    description:
      "Our technology accessories are designed for professionals, featuring sleek designs, advanced functionality, and modern aesthetics that enhance any workspace.",
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
      "Sourced from leading manufacturers, our technology and accessories combine innovation, durability, and style for lasting impressions.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#C1D8FD",
  },
];

const fullIntroText = (
  <>
    Looking for the perfect corporate gift that combines innovation,
    functionality, and style? Our premium collection of technology and
    accessories features everything from wireless charging pads and smart desk
    lamps to USB-C hubs and portable power banks. Each item is carefully
    selected to make a lasting impression on your clients, partners, and
    employees. Whether you need branded tech accessories for client
    appreciation or sophisticated gadgets for employee recognition, we&apos;ve
    got you covered with the finest selection across Dubai and the UAE.
  </>
);

async function getTechnologyData(page: number) {
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
    console.error("Failed to load technology & accessories products:", error);
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
      "Failed to generate static params for technology & accessories pages:",
      error,
    );
    return [{ page: "1" }];
  }
}

export default async function TechnologyAndAccessoriesPage({
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

  const { categories, productData } = await getTechnologyData(pageNumber);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <CategoryHero
        eyebrow="Technology & accessories"
        eyebrowIcon={
          <Laptop className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
        }
        title={
          <>
            Premium{" "}
            <span className="text-brand-accent">Technology &amp; Accessories</span>{" "}
            for Corporate Gifting in Dubai
          </>
        }
        subtitle="Discover our exclusive collection of high-quality technology products and smart accessories, perfect for corporate gifts, client appreciation, and employee recognition programs."
        ctaHref="#technology-and-accessories"
        ctaLabel="Shop Technology & Accessories"
      />
      <SectionDivider />
      <CategoryIntro
        imageUrl={HERO_IMAGE}
        imageAlt="Technology and accessories collection preview"
        content={fullIntroText}
        preview={
          <>
            Looking for the perfect corporate gift that combines innovation,
            functionality, and style?
          </>
        }
        heading="About Technology & Accessories Gifts"
      />
      <SectionDivider />
      <ProductGridClient
        title="Explore Our Collection of Technology & Accessories"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="technology-and-accessories"
        categorySlug={CATEGORY_SLUG}
        variant="category"
      />
      <SectionDivider />
      <CategoryWhyChooseUs
        title={
          <>
            Why Choose Baharnani for{" "}
            <span className="whitespace-nowrap">Technology &amp; Accessories?</span>
          </>
        }
        subtitle="Specialized in premium tech gifts, smart office accessories, and branded gadgets for corporate gifting across Dubai and the UAE."
        features={technologyAndAccessoriesFeatures}
      />
      <SectionDivider />
      <CategoryCallToAction
        title="Your Trusted Partner for Corporate Technology & Accessories in Dubai"
        subtitle={
          <>
            From custom-branded wireless chargers to smart office accessories, we
            deliver premium quality corporate gifts that strengthen relationships
            and elevate your brand presence.
          </>
        }
      />
      <SectionDivider />
    </main>
  );
}
