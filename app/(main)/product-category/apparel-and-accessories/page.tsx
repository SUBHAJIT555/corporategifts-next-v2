import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, {
  type FeatureCard,
} from "@/components/ui/WhyChooseUs";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";
import { LuAward, LuPackage, LuShirt, LuSparkles, LuUsers } from "@/components/icons";

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
    iconColor: "#FFE5EC", // light pink
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Embroidery, screen printing, and full‑color logo applications help your brand stand out at events, exhibitions, and in the office.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#E0F7FA", // light cyan
  },
  {
    id: 3,
    number: "03",
    title: "Accessories That Impress",
    description:
      "Pair apparel with accessories like caps, bags, and lanyards to create cohesive gift sets for clients and employees.",
    icon: <LuSparkles className="w-8 h-8" />,
    iconColor: "#EDE7F6", // light purple
  },
  {
    id: 4,
    number: "04",
    title: "Flexible Order Quantities",
    description:
      "From small teams to large enterprises, we handle both low‑volume and bulk orders with consistent quality control.",
    icon: <LuPackage className="w-8 h-8" />,
    iconColor: "#FFF8E1", // light yellow
  },
  {
    id: 5,
    number: "05",
    title: "Dubai‑Focused Service",
    description:
      "Fast turnarounds and reliable delivery across Dubai and the wider UAE make corporate gifting projects smooth and stress‑free.",
    icon: <LuUsers className="w-8 h-8" />,
    iconColor: "#F1F8E9", // light green
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

export default async function ApparelAndAccessories() {
  const page = 1;
  const { categories, productData } = await getApparelData(page);
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
      </div>
    </main>
  );
}

