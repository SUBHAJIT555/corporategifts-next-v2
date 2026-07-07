import { notFound, redirect } from "next/navigation";
import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import WhyChooseUs, { type FeatureCard } from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  LuAward,
  LuPackage,
  LuShirt,
  LuSparkles,
  LuUsers,
} from "@/components/icons";
import ProductGridClient from "@/components/common/ProductGridClient";


export const dynamic = "force-static";

const CATEGORY_SLUG = "apparel-and-accessories";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Home-page-hero-images/Apparel-&-accessories.webp";


const apparelAndAccessoriesFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Premium Quality Apparel",
    description:
      "From corporate polo shirts to elegant uniforms, we source high‑quality apparel that keeps your team looking professional and on‑brand.",
    icon: <LuShirt className="w-8 h-8" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Embroidery, screen printing, and full‑color logo applications help your brand stand out at events, exhibitions, and in the office.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#4CAF50",
  },
  {
    id: 3,
    number: "03",
    title: "Accessories That Impress",
    description:
      "Pair apparel with accessories like caps, bags, and lanyards to create cohesive gift sets for clients and employees.",
    icon: <LuSparkles className="w-8 h-8" />,
    iconColor: "#3F3F9F",
  },
  {
    id: 4,
    number: "04",
    title: "Flexible Order Quantities",
    description:
      "From small teams to large enterprises, we handle both low‑volume and bulk orders with consistent quality control.",
    icon: <LuPackage className="w-8 h-8" />,
    iconColor: "#FF9800",
  },
  {
    id: 5,
    number: "05",
    title: "Dubai‑Focused Service",
    description:
      "Fast turnarounds and reliable delivery across Dubai and the wider UAE make corporate gifting projects smooth and stress‑free.",
    icon: <LuUsers className="w-8 h-8" />,
    iconColor: "#8BC34A",
  },
];

const fullIntroText = (
  <>
    Looking for the perfect corporate gift that combines style, quality, and
    professionalism? Our premium collection of apparel and accessories features
    everything from custom‑embroidered polo shirts and elegant uniforms to
    branded caps, jackets, and more. Each piece is selected to keep your team
    comfortable while reinforcing your brand at events, offices, and corporate
    gatherings. Whether you need branded apparel for staff, giveaways for trade
    shows, or thoughtful gifts for clients, we help you create a polished,
    memorable impression across Dubai and the UAE.
  </>
);

async function getApparelData(page: number) {
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
    console.error("Failed to load apparel & accessories products:", error);
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
      "Failed to generate static params for apparel & accessories pages:",
      error,
    );
    // Fallback: only generate page 2 if something goes wrong
    return [{ page: "1" }];
  }
}

export default async function ApparelAndAccessoriesPage({
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

  const { categories, productData } = await getApparelData(pageNumber);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <CommonHero
        title=" "
        titleLine2Before="Premium "
        titleLine2Highlight="Apparel & Accessories "
        titleLine2After="for Corporate Gifting in Dubai"
        subtitle="Discover our exclusive collection of high-quality apparel and accessories, perfect for corporate gifts, client appreciation, and team uniforms across Dubai and the UAE."
        buttonLink="#apparel-accessories"
        buttonText="Shop Apparel & Accessories"
      />

      <CategoryIntro
        imageUrl={HERO_IMAGE}
        imageAlt="Corporate apparel and accessories collection"
        content={fullIntroText}
        preview={
          <>
            Looking for the perfect corporate gift that combines style, quality,
            and professionalism?
          </>
        }
      />

      <ProductGridClient
        title="Explore Our Collection of Apparel & Accessories"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="apparel-accessories"
        categorySlug={CATEGORY_SLUG}
      />

      <WhyChooseUs
        features={apparelAndAccessoriesFeatures}
        title={
          <>
            Why Choose Baharnani for{" "}
            <span className="whitespace-nowrap">
              Apparel &amp; Accessories?
            </span>
          </>
        }
        subtitle="Specialized in premium corporate apparel, uniforms, and accessories tailored for businesses across Dubai and the UAE."
      />

      <CallToAction
        title="Your Trusted Partner for Corporate Apparel & Accessories"
        subtitle={
          <>
            From branded uniforms to premium accessories, Baharnani Advertising
            helps you create a cohesive, professional brand presence across
            every touchpoint.
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

