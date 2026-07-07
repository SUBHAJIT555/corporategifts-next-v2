import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, {
  type FeatureCard,
} from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";
// import { ProductsApi } from "@/lib/api/endpoints";

const CATEGORY_SLUG = "eating-and-drinking";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Home-page-hero-images/Eating-&-drinking.webp";

const eatingAndDrinkingFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Premium Quality Food & Beverage Gifts",
    description:
      "From gourmet coffee sets to luxury tea collections, we offer high-quality eating and drinking products perfect for corporate gifting and client appreciation.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        
        <path d="M8 21l8 0" />
        <path d="M12 15l0 6" />
        <path d="M17 3l1 7c0 3.012 -2.686 5 -6 5s-6 -1.988 -6 -5l1 -7h10" />
        <path d="M6 10a5 5 0 0 1 6 0a5 5 0 0 0 6 0" />
      </svg>
    ),
    iconColor: "#C8E6C9", // highlight (very light green)
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom packaging, logo printing, and branded gift boxes to strengthen your brand identity with every sip.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        
        <path d="M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" />
        <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2" />
        <path d="M16 7h4" />
      </svg>
    ),
    iconColor: "#FFCDD2", // highlight (very light red)
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of premium coffee sets, gourmet teas, luxury chocolates, wine accessories, and insulated drinkware that make perfect corporate gifts.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        
        <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
        <path d="M12 12l8 -4.5" />
        <path d="M12 12l0 9" />
        <path d="M12 12l-8 -4.5" />
        <path d="M16 5.25l-8 4.5" />
      </svg>
    ),
    iconColor: "#FFE0B2", // highlight (very light orange)
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Every Occasion",
    description:
      "Whether it's client appreciation, employee recognition, corporate events, or holiday gifting, our food and beverage products suit every occasion.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        
        <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
        <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
        <path d="M12 12l0 .01" />
        <path d="M3 13a20 20 0 0 0 18 0" />
      </svg>
    ),
    iconColor: "#F0F4C3", // highlight (very light green-yellow)
  },
  {
    id: 5,
    number: "05",
    title: "Flexible Ordering",
    description:
      "From individual gifts to bulk orders, we accommodate orders of all sizes with reliable delivery across Dubai and the UAE.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        
        <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M12.5 17h-6.5v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
        <path d="M16 22l5 -5" />
        <path d="M21 21.5v-4.5h-4.5" />
      </svg>
    ),
    iconColor: "#BBDEFB", // highlight (very light blue)
  },
  {
    id: 6,
    number: "06",
    title: "Trusted Quality",
    description:
      "Sourced from premium suppliers, our eating and drinking products combine quality, taste, and elegant presentation for lasting impressions.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        
        <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
        <path d="M9 12l2 2l4 -4" />
      </svg>
    ),
    iconColor: "#C8E6C9", // highlight (very light green, matches #1)
  },
];

const fullIntroText = (
  <>
    Looking for the perfect corporate gift that combines taste, quality, and
    elegance? Our premium collection of eating and drinking products features
    everything from gourmet coffee gift sets and luxury tea collections to
    artisan chocolate boxes and executive wine accessories. Each item is
    carefully selected to make a lasting impression on your clients, partners,
    and employees. Whether you need branded coffee sets for client appreciation
    or sophisticated beverage accessories for corporate events, we&apos;ve got
    you covered with the finest selection across Dubai and the UAE.
  </>
);

async function getEatingAndDrinkingData(page: number) {
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
    console.error("Failed to load eating & drinking products:", error);
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

export default async function EatingAndDrinking() {
  const page = 1;
  const { categories, productData } = await getEatingAndDrinkingData(page);
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
          titleLine2Highlight="Eating & Drinking "
          titleLine2After="Products for Corporate Gifting in Dubai"
          subtitle="Discover our exclusive collection of high-quality food and beverage products, perfect for corporate gifts, client appreciation, and employee recognition programs."
          buttonLink="#eating-drinking"
          buttonText="Shop Eating & Drinking"
        />

        <CategoryIntro
          imageUrl={HERO_IMAGE}
          imageAlt="Eating and drinking products collection preview"
          content={fullIntroText}
          preview={
            <>
              Looking for the perfect corporate gift that combines taste,
              quality, and elegance?
            </>
          }
          heading="About Eating & Drinking Gifts"
        />

        <ProductGridClient
          title="Explore Our Collection of Eating & Drinking Products"
          productData={productData}
          categories={filteredCategories}
          selectedCategory={CATEGORY_SLUG}
          id="eating-drinking"
          categorySlug={CATEGORY_SLUG}
        />

        <WhyChooseUs features={eatingAndDrinkingFeatures} />

        <CallToAction
          title="Your Trusted Partner for Corporate Food & Beverage Gifts in Dubai"
          subtitle={
            <>
              From custom-branded coffee sets to luxury tea collections, we
              deliver premium quality eating and drinking products that
              strengthen relationships and elevate your brand presence.
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
