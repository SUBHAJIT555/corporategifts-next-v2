import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, {
  type FeatureCard,
} from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";

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
        
        <path d="M5.636 5.636a9 9 0 1 1 12.728 12.728a9 9 0 0 1 -12.728 -12.728" />
        <path d="M15.236 11l5.264 4h-6.5l-2 6l-2 -6h-6.5l5.276 -4l-2.056 -6.28l5.28 3.78l5.28 -3.78l-2.044 6.28" />
      </svg>
    ),
    iconColor: "#A5D6A7", // highlight (light) green
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Personalize your corporate gifts with custom logo engraving, embossing, and branded packaging to strengthen your brand identity with every use.",
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
    iconColor: "#FFB3BA", // highlight (light) red
  },
  {
    id: 3,
    number: "03",
    title: "Wide Range of Products",
    description:
      "Explore our collection of premium pens, custom notebooks, desk organizers, business card holders, and stationery accessories that make perfect corporate gifts.",
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
    iconColor: "#FFE0B2", // highlight (light) orange
  },
  {
    id: 4,
    number: "04",
    title: "Perfect for Professional Workspaces",
    description:
      "Our office supplies are designed for professionals, featuring elegant designs, durable materials, and sophisticated finishes that enhance any workspace.",
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
    iconColor: "#DCE775", // highlight (light) green-yellow
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
    iconColor: "#B2B7FF", // highlight (light) indigo/blue
  },
  {
    id: 6,
    number: "06",
    title: "Trusted Quality",
    description:
      "Sourced from leading manufacturers, our office and stationery products combine style, durability, and functionality for lasting impressions.",
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
    iconColor: "#A5D6A7", // highlight (light) green, matches #1
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

    return {
      categories,
      productData,
    };
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

export default async function OfficeAndStationary() {
  const page = 1;
  const { categories, productData } = await getOfficeData(page);
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
          titleLine2Highlight="Office & Stationery "
          titleLine2After=" for Corporate Gifting in Dubai"
          subtitle="Discover our exclusive collection of high-quality office supplies and luxury stationery, perfect for corporate gifts, client appreciation, and employee recognition programs."
          buttonLink="#office-and-stationary"
          buttonText="Shop Office & Stationery"
        />

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

        <ProductGridClient
          title="Explore Our Collection of Office & Stationery"
          productData={productData}
          categories={filteredCategories}
          selectedCategory={CATEGORY_SLUG}
          id="office-and-stationary"
          categorySlug={CATEGORY_SLUG}
        />

        <WhyChooseUs features={officeAndStationaryFeatures} />

        <CallToAction
          title="Your Trusted Partner for Corporate Office & Stationery in Dubai"
          subtitle={
            <>
              From custom-branded pen sets to luxury desk accessories, we
              deliver premium quality corporate gifts that strengthen
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
      </div>
    </main>
  );
}
