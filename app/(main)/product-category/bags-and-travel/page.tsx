import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, {
  type FeatureCard,
} from "@/components/ui/WhyChooseUs";
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
    iconColor: "#E8F5E9", // light green
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom logo printing, embroidery, and branded packaging to strengthen your brand identity with every journey.",
    icon: <LuSparkles className="w-8 h-8" />,
    iconColor: "#FFEBEE", // light red/pink
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of briefcases, backpacks, travel bags, luggage sets, and document holders that make perfect corporate gifts for clients and employees.",
    icon: <LuPackageSearch className="w-8 h-8" />,
    iconColor: "#FFF3E0", // light orange
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Business Travelers",
    description:
      "Our travel accessories are designed for professionals on the go, featuring durable materials, smart compartments, and modern designs.",
    icon: <LuUsers className="w-8 h-8" />,
    iconColor: "#E3F2FD", // light blue
  },
  {
    id: 5,
    number: "05",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <BiWorld className="w-8 h-8" />,
    iconColor: "#F3E5F5", // light purple
  },
  {
    id: 6,
    number: "06",
    title: "Trusted Quality",
    description:
      "Sourced from leading manufacturers, our bags and travel accessories combine style, durability, and functionality for lasting impressions.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#E8F5E9", // light green
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

export default async function BagsAndTravel() {
  const page = 1;
  const { categories, productData } = await getBagsData(page);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Dashed Center Fade Grid (sticky background) */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
          backgroundSize: "5px 5px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
       repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
          WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Page content */}
      <div className="relative z-10">
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
      </div>
    </main>
  );
}
