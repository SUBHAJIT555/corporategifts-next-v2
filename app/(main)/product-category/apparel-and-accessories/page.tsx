import CategoryCallToAction from "@/components/pages/ProductCategory/CategoryCallToAction";
import CategoryHero from "@/components/pages/ProductCategory/CategoryHero";
import CategoryWhyChooseUs from "@/components/pages/ProductCategory/CategoryWhyChooseUs";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import SectionDivider from "@/components/ui/SectionDivider";
import type { FeatureCard } from "@/components/ui/WhyChooseUs";
import { ProductsApi } from "@/lib/api/endpoints";
import {
  LuAward,
  LuPackage,
  LuShirt,
  LuSparkles,
  LuUsers,
} from "@/components/icons";

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
    icon: <LuShirt className="h-5 w-5" />,
    iconColor: "#FFE5EC",
  },
  {
    id: 2,
    number: "02",
    title: "Custom Branding Options",
    description:
      "Embroidery, screen printing, and full‑color logo applications help your brand stand out at events, exhibitions, and in the office.",
    icon: <LuAward className="h-5 w-5" />,
    iconColor: "#E0F7FA",
  },
  {
    id: 3,
    number: "03",
    title: "Accessories That Impress",
    description:
      "Pair apparel with accessories like caps, bags, and lanyards to create cohesive gift sets for clients and employees.",
    icon: <LuSparkles className="h-5 w-5" />,
    iconColor: "#EDE7F6",
  },
  {
    id: 4,
    number: "04",
    title: "Flexible Order Quantities",
    description:
      "From small teams to large enterprises, we handle both low‑volume and bulk orders with consistent quality control.",
    icon: <LuPackage className="h-5 w-5" />,
    iconColor: "#FFF8E1",
  },
  {
    id: 5,
    number: "05",
    title: "Dubai‑Focused Service",
    description:
      "Fast turnarounds and reliable delivery across Dubai and the wider UAE make corporate gifting projects smooth and stress‑free.",
    icon: <LuUsers className="h-5 w-5" />,
    iconColor: "#F1F8E9",
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

    return { categories, productData };
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
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <CategoryHero
        eyebrow="Apparel & accessories"
        eyebrowIcon={
          <LuShirt className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
        }
        title={
          <>
            Premium{" "}
            <span className="text-brand-accent">Apparel &amp; Accessories</span>{" "}
            for Corporate Gifting in Dubai
          </>
        }
        subtitle="Discover our exclusive collection of high-quality apparel and accessories, perfect for corporate gifts, client appreciation, and team uniforms across Dubai and the UAE."
        ctaHref="#apparel-accessories"
        ctaLabel="Shop Apparel & Accessories"
      />
      <SectionDivider />
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
        heading="About Apparel & Accessories"
      />
      <SectionDivider />
      <ProductGridClient
        title="Explore Our Collection of Apparel & Accessories"
        productData={productData}
        categories={filteredCategories}
        selectedCategory={CATEGORY_SLUG}
        id="apparel-accessories"
        categorySlug={CATEGORY_SLUG}
        variant="category"
      />
      <SectionDivider />
      <CategoryWhyChooseUs
        title={
          <>
            Why Choose Baharnani for{" "}
            <span className="whitespace-nowrap">Apparel &amp; Accessories?</span>
          </>
        }
        subtitle="Specialized in premium corporate apparel, uniforms, and accessories tailored for businesses across Dubai and the UAE."
        features={apparelAndAccessoriesFeatures}
        showCtaCard
        ctaShopHref="#apparel-accessories"
        ctaTitle="Ready to order corporate apparel?"
        ctaDescription="Speak with our team for bulk quotes, or browse the collection and add items to your quotation cart."
      />
      <SectionDivider />
      <CategoryCallToAction
        title="Your Trusted Partner for Corporate Apparel & Accessories"
        subtitle={
          <>
            From branded uniforms to premium accessories, Baharnani Advertising
            helps you create a cohesive, professional brand presence across
            every touchpoint.
          </>
        }
      />
      <SectionDivider />
    </main>
  );
}
