import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, {
  type FeatureCard,
} from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  LuDumbbell,
  LuTrophy,
  LuActivity,
  LuTarget,
  LuHeart,
  LuGift,
} from "@/components/icons";

const CATEGORY_SLUG = "sports-and-recreation";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Products-hero-image/Sports-&-recreation.webp";

const sportsAndRecreationFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Premium Quality Sports Equipment",
    description:
      "From fitness trackers to yoga mats, we offer high-quality sports and recreation products perfect for corporate wellness programs and employee recognition.",
    icon: <LuDumbbell className="w-8 h-8" />,
    iconColor: "#C8F7C5", // light green
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom logo printing, embroidery, and branded packaging to strengthen your brand identity with every activity.",
    icon: <LuTrophy className="w-8 h-8" />,
    iconColor: "#FFCDD2", // light red/pink
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of fitness trackers, yoga mats, golf sets, tennis rackets, gym bags, and resistance bands that make perfect corporate gifts.",
    icon: <LuActivity className="w-8 h-8" />,
    iconColor: "#FFE082", // light orange/yellow
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Wellness Programs",
    description:
      "Whether it's employee wellness initiatives, corporate sports events, or team building activities, our sports products suit every occasion.",
    icon: <LuHeart className="w-8 h-8" />,
    iconColor: "#E6EE9C", // light green/yellow
  },
  {
    id: 5,
    number: "05",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: <LuTarget className="w-8 h-8" />,
    iconColor: "#B3B8F9", // light indigo/violet
  },
  {
    id: 6,
    number: "06",
    title: "Trusted Quality",
    description:
      "Sourced from premium suppliers, our sports and recreation products combine quality, durability, and elegant presentation for lasting impressions.",
    icon: <LuGift className="w-8 h-8" />,
    iconColor: "#BBDEFB", // light blue
  },
];

const fullIntroText = (
  <>
    Looking for the perfect corporate gift that promotes health, wellness, and
    active living? Our premium collection of sports and recreation products
    features everything from fitness trackers and yoga mats to golf sets and
    tennis rackets. Each item is carefully selected to encourage an active
    lifestyle while making a lasting impression on your clients, partners, and
    employees. Whether you need branded fitness equipment for wellness
    programs or sophisticated sports accessories for corporate events, we&apos;ve
    got you covered with the finest selection across Dubai and the UAE.
  </>
);

async function getSportsData(page: number) {
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
    console.error("Failed to load sports & recreation products:", error);
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

export default async function SportsAndRecreation() {
  const page = 1;
  const { categories, productData } = await getSportsData(page);
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
          titleLine2Highlight="Sports & Recreation "
          titleLine2After="Products for Corporate Gifting in Dubai"
          titlesuffix=""
          subtitle="Discover our exclusive collection of high-quality sports equipment and recreational items, perfect for corporate gifts, employee wellness programs, and team building activities."
          // imageUrl={HERO_IMAGE}
          buttonLink="#sports-recreation"
          buttonText="Shop Sports & Recreation"
        />

        <CategoryIntro
          imageUrl={HERO_IMAGE}
          imageAlt="Sports and recreation products collection preview"
          content={fullIntroText}
          preview={
            <>
              Looking for the perfect corporate gift that promotes health,
              wellness, and active living?
            </>
          }
          heading="About Sports & Recreation Gifts"
        />

        <ProductGridClient
          title="Explore Our Collection of Sports & Recreation Products"
          productData={productData}
          categories={filteredCategories}
          selectedCategory={CATEGORY_SLUG}
          id="sports-recreation"
          categorySlug={CATEGORY_SLUG}
        />

        <WhyChooseUs features={sportsAndRecreationFeatures} />

        <CallToAction
          title="Your Trusted Partner for Corporate Sports & Recreation Gifts in Dubai"
          subtitle={
            <>
              From custom-branded fitness equipment to premium sports accessories,
              we deliver high-quality products that promote wellness, strengthen
              relationships, and elevate your brand presence.
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

