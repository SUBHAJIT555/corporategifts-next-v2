import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import LazyMountOnView from "@/components/common/LazyMountOnView";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import type { FeatureCard } from "@/components/ui/WhyChooseUs";
import FAQ, { type FAQItem } from "@/components/common/FAQ";

import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";
import { LuPackage, LuAward } from "@/components/icons";
import AdditionalForSeo, { SeoSection } from "@/components/pages/ProductCategory/PremiumGiftSets/AdditionalForSeo";
import ProductCarousel from "@/components/pages/ProductCategory/PremiumGiftSets/ProductCarousel";

// import ProductCarousel from "@/components/ui/ProductCarousel";

const CATEGORY_SLUG = "premium-gift-sets";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Products-hero-image/Premiums-gift-sets.webp";

const giftSetFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Perfect Blend of Luxury and Affordability",
    description:
      "Our gift sets in Dubai combine elegance with value. From budget-friendly options that don't compromise on quality to luxury gift sets Dubai customers adore, each piece is designed to impress and delight.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#B6E9C8", // light green highlight
  },
  {
    id: 2,
    number: "02",
    title: "Curated for Every Occasion",
    description:
      "Whether it's a birthday, corporate event, or festive celebration, our best gift sets in Dubai include everything from skincare and chocolates to signature perfumes and candles -ideal for personal and professional gifting alike.",
    icon: <LuPackage className="w-8 h-8" />,
    iconColor: "#FFF7BD", // light yellow highlight
  },
];
const giftSetWhy: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Wide Range of Luxury Gift Sets Dubai",
    description:
      "Discover our extensive collection of luxury gift sets in Dubai, featuring premium perfumes, skincare essentials, gourmet treats, and elegant accessories. Each set is carefully curated to offer the perfect blend of sophistication and quality.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#B6E9C8", // light green highlight
  },
  {
    id: 2,
    number: "02",
    title: "Personalized Options for Every Recipient",
    description:
      "Make your gift truly special with our personalization services. Add custom messages, names, or corporate branding to create unique gift sets that reflect your thoughtfulness and attention to detail.",
    icon: <LuPackage className="w-8 h-8" />,
    iconColor: "#FFF7BD", // light yellow highlight
  },
  {
    id: 3,
    number: "03",
    title: "Same-Day & Scheduled Delivery Across UAE",
    description:
      "Enjoy flexible delivery options with same-day delivery in Dubai and scheduled delivery across all UAE cities. Our reliable logistics ensure your gift sets arrive perfectly packaged and on time.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#C1D8FD", // light blue highlight
  },
  {
    id: 4,
    number: "04",
    title: "Corporate Bulk Orders Available",
    description:
      "Perfect for corporate gifting, we offer bulk order solutions with special pricing for businesses. Ideal for employee appreciation, client gifts, and corporate events with professional packaging and branding options.",
    icon: <LuPackage className="w-8 h-8" />,
    iconColor: "#FFD6F8", // light pink highlight
  },
  {
    id: 5,
    number: "05",
    title: "Affordable & Premium Options",
    description:
      "Choose from our range of budget-friendly to luxury gift sets in Dubai. We offer premium quality at every price point, ensuring you find the perfect gift set that matches your budget without compromising on elegance.",
    icon: <LuAward className="w-8 h-8" />,
    iconColor: "#FFECB3", // light golden highlight
  },
];

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What types of gift sets are available in Dubai?",
    answer:
      "We offer a range of gift sets in Dubai, including perfume gift sets, luxury hampers, birthday gift sets, and corporate gift sets for every occasion.",
  },
  {
    id: 2,
    question: "Can I customize my gift set?",
    answer:
      "Yes, all our luxury gift sets and corporate gift boxes can be personalized with names, messages, or your brand logo.",
  },
  {
    id: 3,
    question: "Do you deliver across UAE?",
    answer:
      "Absolutely! We offer gift set delivery across Dubai, Abu Dhabi, Sharjah, and other UAE cities.",
  },
  {
    id: 4,
    question: "What are the most popular gift sets in Dubai?",
    answer:
      "Our most popular collections include perfume gift sets, luxury gift hampers, and gift sets for her featuring premium skincare and fragrances.",
  },
  {
    id: 5,
    question: "Do you have budget-friendly gift sets?",
    answer:
      "Yes, our more affordable gift set options start from budget-friendly prices while maintaining a premium look and feel.",
  },
];

const seoSections: SeoSection[] = [
  {
    heading: "Affordable Yet Luxurious Gifting Options",
    content:
      "You don't have to spend a fortune to make a grand impression. We offer premium gift sets in Dubai that look luxurious but come at an accessible price. Each box is carefully packed with style and sophistication, making it perfect for gifting at scale.",
    highlightLine:
      "Luxury doesn't have to be expensive – our gift sets in Dubai prove that elegance is always within reach.",
  },
  {
    heading: "Gift Set Delivery Across Dubai & UAE",
    content:
      "Enjoy fast and reliable gift delivery across Dubai and other UAE cities. Whether it's for corporate clients, birthdays, or festive occasions, our team ensures your luxury gift sets arrive beautifully packaged and right on time.",
  },
];

const fullIntroText = (
  <>
    Looking for the best gift sets in Dubai to surprise someone special or
    delight your clients? Our exclusive collection features luxury gift sets,
    perfume gift sets, and birthday gift sets, thoughtfully curated for every
    taste and occasion. Whether you need a gift set for her, an elegant
    corporate gift set, or a budget-friendly option, we&apos;ve got you covered with
    the finest selection across the UAE.
  </>
);

async function getGiftSetData(page: number) {
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
    console.error("Failed to load premium gift sets products:", error);
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

export default async function PremiumGiftSets() {
  const page = 1;
  const { categories, productData } = await getGiftSetData(page);
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.slug === CATEGORY_SLUG,
  );

  const products = productData.products ?? [];
  const carouselProducts = products.slice(0, 8);

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
          title="Buy Premium Gift Sets in Dubai"
          titlesuffix="Luxury Gift Boxes & Hampers"
          subtitle="Find the Perfect Gift Set in Dubai – From Luxury Perfume Collections to Elegant Corporate Gift Boxes."
          buttonLink="#gift-set"
          buttonText="Shop Gift Sets"
        />

        <CategoryIntro
          imageUrl={HERO_IMAGE}
          imageAlt="Premium gift sets collection preview"
          content={fullIntroText}
          preview={
            <>
              Looking for the best gift sets in Dubai to surprise someone special
              or delight your clients?
            </>
          }
          heading="About Premium Gift Sets"
        />

        <ProductGridClient
          title="Explore Our Collection of Gift Sets"
          productData={productData}
          categories={filteredCategories}
          selectedCategory={CATEGORY_SLUG}
          id="gift-set"
          categorySlug={CATEGORY_SLUG}
        />

        {/* TODO: bring back ProductCarousel once refactored for App Router */}
        {/* Luxury Gift Sets Dubai */}
        <ProductCarousel
          products={carouselProducts}
          isLoading={false}
          heading="Luxury Gift Sets Dubai"
          description="Indulge in sophistication with premium packaging, high-end brands, and exclusive fragrances. Perfect for anniversaries, festive occasions, or VIP clients who deserve only the best."
          paginationId="gift-set-carousel-pagination-1"
          autoplay={false}
          autoplayDelay={4000}
        />
        {/* Perfume Gift Sets Dubai & UAE */}
        <LazyMountOnView placeholderMinHeight="420px">
          <ProductCarousel
            isLoading={false}
            products={carouselProducts}
            heading="Perfume Gift Sets Dubai & UAE"
            description="Our perfume gift sets feature world-class scents from renowned brands, beautifully presented in elegant boxes. They make a timeless and unforgettable gift for him or her."
            paginationId="gift-set-carousel-pagination-2"
            autoplay={false}
            autoplayDelay={4000}
          />
        </LazyMountOnView>
        {/* Birthday Gift Sets Dubai */}
        <LazyMountOnView placeholderMinHeight="420px">
          <ProductCarousel
            isLoading={false}
            products={carouselProducts}
            heading="Birthday Gift Sets Dubai"
            description="Celebrate birthdays in style with curated birthday gift sets packed with thoughtful goodies, personal care products, or luxury chocolates."
            paginationId="gift-set-carousel-pagination-3"
            autoplay={false}
            autoplayDelay={4000}
          />
        </LazyMountOnView>
        {/* Gift Sets for Her UAE */}
        <LazyMountOnView placeholderMinHeight="420px">
          <ProductCarousel
            isLoading={false}
            products={carouselProducts}
            heading="Gift Sets for Her UAE"
            description="Delight the special woman in your life with our handpicked gift sets for her, featuring perfumes, wellness hampers, and accessories that define elegance."
            paginationId="gift-set-carousel-pagination-4"
            autoplay={false}
            autoplayDelay={4000}
          />
        </LazyMountOnView>
        {/* Corporate Gift Sets Dubai */}
        <LazyMountOnView placeholderMinHeight="420px">
          <ProductCarousel
            isLoading={false}
            products={carouselProducts}
            heading="Corporate Gift Sets Dubai"
            description="Show appreciation to clients and employees with professional yet stylish corporate gift sets -personalized and delivered across Dubai and the UAE."
            paginationId="gift-set-carousel-pagination-5"
            autoplay={false}
            autoplayDelay={4000}
          />
        </LazyMountOnView>

        <WhyChooseUs
          title="Why Choose Our Gift Sets in Dubai?"
          features={giftSetFeatures}
        />

        <AdditionalForSeo sections={seoSections} />

        <WhyChooseUs
          title="Why We’re the Best Choice for Gift Sets in Dubai"
          features={giftSetWhy}
        />

        <FAQ
          title="FAQs – Everything About Gift Sets in Dubai"
          subtitle="Get answers to common questions about our products and services"
          faqData={faqItems}
        />

        <CallToAction
          title="Your Trusted Partner for Premium Gift Sets in Dubai"
          subtitle={
            <>
              From luxury gift sets to perfume gift sets, we deliver premium
              quality gift sets that strengthen relationships, elevate your brand
              presence, and demonstrate your commitment to gifting.
            </>
          }
          backgroundImageUrl={HERO_IMAGE}
          buttons={[
            {
              text: "Contact Our Team",
              className:
                "bg-linear-to-r from-neutral-800 to-neutral-500! text-white! border! border-neutral-200! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!",
              link: "/contact-us",
            },
            {
              text: "Explore Product Categories",
              className:
                "bg-linear-to-r from-neutral-100 to-neutral-300! border! border-neutral-200! text-neutral-700! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!",
              link: "/products",
            },
          ]}
        />
      </div>
    </main>
  );
}
