import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, {
  type FeatureCard,
} from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  LuLeaf,
  LuAward,
  LuPackage,
  LuUsers,
  BiWorld,
} from "@/components/icons";

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
    iconColor: "#C8E6C9", // highlight (very light green)
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your eco-friendly corporate gifts with custom printing, logo engraving, and sustainable packaging to strengthen your brand identity.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#FFCDD2", // highlight (very light red)
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of bamboo products, reusable items, solar-powered accessories, and organic materials that make perfect sustainable corporate gifts.",
    icon: <LuPackage className="w-8 h-8" />,
    iconColor: "#FFE0B2", // highlight (very light orange)
  },
  {
    id: 4,
    number: "04",
    title: "Environmentally Conscious",
    description:
      "Demonstrate your commitment to sustainability with gifts that align with your corporate values and green initiatives.",
    icon: <LuLeaf className="w-8 h-8" />,
    iconColor: "#F0F4C3", // highlight (very light green-yellow)
  },
  {
    id: 5,
    number: "05",
    title: "Perfect for Every Occasion",
    description:
      "Whether it's client appreciation, employee recognition, or corporate events, our eco-friendly products suit every gifting occasion.",
    icon: <LuUsers className="w-8 h-8" />,
    iconColor: "#BBDEFB", // highlight (very light blue)
  },
  {
    id: 6,
    number: "06",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <BiWorld className="w-8 h-8" />,
    iconColor: "#C8E6C9", // highlight (very light green, matches #1)
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

export default async function EcoFriendly() {
  const page = 1;
  const { categories, productData } = await getEcoFriendlyData(page);
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
              From sustainable bamboo products to reusable accessories, we
              deliver premium quality eco-friendly corporate gifts that
              strengthen relationships, elevate your brand presence, and
              demonstrate your commitment to environmental responsibility.
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
