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
  LuSparkles,
  LuUsers,
  BiWorld,
} from "@/components/icons";

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
    icon: <BiWorld className="w-8 h-8" />,
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom logo engraving, laser etching, and branded packaging to strengthen your brand identity with every use.",
    icon: <LuSparkles className="w-8 h-8" />,
    iconColor: "#FF6B6B",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of wireless speakers, USB-C hubs, laptop stands, power banks, and smart accessories that make perfect corporate gifts for clients and employees.",
    icon: <LuPackage className="w-8 h-8" />,
    iconColor: "#FF9800",
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Modern Workspaces",
    description:
      "Our technology accessories are designed for professionals, featuring sleek designs, advanced functionality, and modern aesthetics that enhance any workspace.",
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
      "Sourced from leading manufacturers, our technology and accessories combine innovation, durability, and style for lasting impressions.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#2196F3",
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

    return {
      categories,
      productData,
    };
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
    <main className="relative min-h-screen w-full overflow-hidden">
      <CommonHero
        title=" "
        titleLine2Before="Premium "
        titleLine2Highlight="Technology & Accessories "
        titleLine2After=" for Corporate Gifting in Dubai"
        titlesuffix=""
        subtitle="Discover our exclusive collection of high-quality technology products and smart accessories, perfect for corporate gifts, client appreciation, and employee recognition programs."
        buttonLink="#technology-and-accessories"
        buttonText="Shop Technology & Accessories"
      />

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

      <ProductGridClient
        title="Explore Our Collection of Technology & Accessories"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="technology-and-accessories"
        categorySlug={CATEGORY_SLUG}
      />

      <WhyChooseUs features={technologyAndAccessoriesFeatures} />

      <CallToAction
        title="Your Trusted Partner for Corporate Technology & Accessories in Dubai"
        subtitle={
          <>
            From custom-branded wireless chargers to smart office accessories,
            we deliver premium quality corporate gifts that strengthen
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
