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
  LuPenTool,
  LuUsers,
} from "@/components/icons";
import { NotebookPen } from "lucide-react";

export const dynamic = "force-static";

const CATEGORY_SLUG = "office-and-stationary";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Products-hero-image/Office-&-stationary.webp";

const officeAndStationaryFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Premium Quality Office & Stationery Supplies",
    description:
      "From luxury pen sets to elegant desk organizers, we offer high-quality office and stationery supplies perfect for corporate gifting and professional workspaces.",
    icon: <LuPenTool className="h-5 w-5" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom logo engraving, embossing, and branded packaging to strengthen your brand identity with every use.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of premium pens, custom notebooks, desk organizers, business card holders, and stationery accessories that make perfect corporate gifts.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Professional Workspaces",
    description:
      "Our office supplies are designed for professionals, featuring elegant designs, durable materials, and sophisticated finishes that enhance any workspace.",
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
      "Sourced from leading manufacturers, our office and stationery products combine style, durability, and functionality for lasting impressions.",
    icon: <LuLeaf className="h-5 w-5" />,
    iconColor: "#B6E9C8",
  },
];

const fullIntroText = (
  <>
    Looking for the perfect corporate gift that combines elegance,
    functionality, and professionalism? Our premium collection of office and
    stationery supplies features everything from luxury fountain pen sets and
    custom leather-bound notebooks to executive desk organizers and
    professional business card holders. Each item is carefully selected to
    make a lasting impression on your clients, partners, and employees.
    Whether you need branded stationery for client appreciation or
    sophisticated office accessories for employee recognition, we&apos;ve got
    you covered with the finest selection across Dubai and the UAE.
  </>
);

async function getOfficeData(page: number) {
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
    console.error("Failed to load office & stationary products:", error);
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
      "Failed to generate static params for office & stationary pages:",
      error,
    );
    return [{ page: "1" }];
  }
}

export default async function OfficeAndStationaryPage({
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

  const { categories, productData } = await getOfficeData(pageNumber);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <CategoryHero
        eyebrow="Office & stationery"
        eyebrowIcon={
          <NotebookPen className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
        }
        title={
          <>
            Premium{" "}
            <span className="text-brand-accent">Office &amp; Stationery</span>{" "}
            for Corporate Gifting in Dubai
          </>
        }
        subtitle="Discover our exclusive collection of high-quality office supplies and luxury stationery, perfect for corporate gifts, client appreciation, and employee recognition programs."
        ctaHref="#office-and-stationary"
        ctaLabel="Shop Office & Stationery"
      />
      <SectionDivider />
      <CategoryIntro
        imageUrl={HERO_IMAGE}
        imageAlt="Office and stationery collection preview"
        content={fullIntroText}
        preview={
          <>
            Looking for the perfect corporate gift that combines elegance,
            functionality, and professionalism?
          </>
        }
        heading="About Office & Stationery Gifts"
      />
      <SectionDivider />
      <ProductGridClient
        title="Explore Our Collection of Office & Stationery"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="office-and-stationary"
        categorySlug={CATEGORY_SLUG}
        variant="category"
      />
      <SectionDivider />
      <CategoryWhyChooseUs
        title={
          <>
            Why Choose Baharnani for{" "}
            <span className="whitespace-nowrap">Office &amp; Stationery?</span>
          </>
        }
        subtitle="Specialized in premium corporate office supplies, luxury stationery, and desk accessories tailored for businesses across Dubai and the UAE."
        features={officeAndStationaryFeatures}
      />
      <SectionDivider />
      <CategoryCallToAction
        title="Your Trusted Partner for Corporate Office & Stationery in Dubai"
        subtitle={
          <>
            From custom-branded pen sets to luxury desk accessories, we deliver
            premium quality corporate gifts that strengthen relationships and
            elevate your brand presence.
          </>
        }
      />
      <SectionDivider />
    </main>
  );
}
