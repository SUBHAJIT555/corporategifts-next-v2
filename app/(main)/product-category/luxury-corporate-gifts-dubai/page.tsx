import CommonHero from "@/components/ui/CommonHero";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductGridClient from "@/components/common/ProductGridClient";
import WhyChooseUs, {
  type FeatureCard,
} from "@/components/ui/WhyChooseUs";
import { AnimatedTestimonials } from "@/components/ui/AnimatedTestimonial";
import FAQ, { type FAQItem } from "@/components/common/FAQ";
import CallToAction from "@/components/ui/CallToAction";
import { ProductsApi } from "@/lib/api/endpoints";

const CATEGORY_SLUG = "luxury-corporate-gifts-dubai";
const PER_PAGE = 12;
const HERO_IMAGE =
  "/assets/images/Products-hero-image/Luxury-corporate-gifts.webp";

const testimonials = [
  {
    quote:
      "Baharnani Advertising has been our trusted corporate gift supplier for over 4 years. Their team, especially Amit, always ensures we get the perfect gifts for our Dubai and Abu Dhabi offices. Exceptional service and quality every time.",
    name: "Sarah Ahmed",
    designation: "Marketing Director",
    src: "/assets/images/Testimonials/Sarah-Ahmed.webp",
  },
  {
    quote:
      "Working with Vivek from Baharnani Advertising has been a game-changer for our corporate gifting needs across Sharjah and Dubai. His attention to detail and understanding of our requirements is outstanding.",
    name: "Mohammed Al Rashid",
    designation: "Business Development Manager",
    src: "/assets/images/Testimonials/Mohammed-Al-Rashid.webp",
  },
  {
    quote:
      "The team at Baharnani Advertising, particularly Amit, goes above and beyond to deliver premium corporate gifts. From Dubai to Abu Dhabi, they've helped us maintain excellent client relationships through thoughtful gifting.",
    name: "Fatima Hassan",
    designation: "HR Director",
    src: "/assets/images/Testimonials/Fatima-Hassan.webp",
  },
];

const luxuryCorporateGiftsFeatures: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Explore Our Luxury Corporate Gift Categories",
    description:
      "Discover our extensive collection of luxury corporate gifts across multiple categories, from premium tech accessories to elegant executive gifts, all designed to make a lasting impression on your clients and employees.",
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 4h6v6h-6l0 -6" />
        <path d="M4 14h6v6h-6l0 -6" />
        <path d="M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M4 7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      </svg>
    ),
    iconColor: "#A8DDF0",
  },
  {
    id: 2,
    number: "02",
    title: "Best Luxury Corporate Gifts Dubai Online",
    description:
      "Shop the finest selection of luxury corporate gifts available online in Dubai. Our curated collection features premium brands and exclusive items that reflect your company's commitment to excellence and quality.",
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4l4 -6" />
      </svg>
    ),
    iconColor: "#FBBEC6",
  },
  {
    id: 3,
    number: "03",
    title: "Corporate Gift Ideas for Every Occasion",
    description:
      "From milestone celebrations to client appreciation events, we provide tailored corporate gift solutions for every business occasion. Our diverse range ensures you'll find the perfect gift to strengthen professional relationships.",
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
        <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
        <path d="M9.7 17l4.6 0" />
      </svg>
    ),
    iconColor: "#FAF491",
  },
  {
    id: 4,
    number: "04",
    title: "Luxury Brands that Are Cheaper in Dubai",
    description:
      "Take advantage of Dubai's competitive luxury market with our selection of premium international brands offered at exceptional value. Get authentic luxury corporate gifts at prices that maximize your gifting budget.",
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3" />
      </svg>
    ),
    iconColor: "#DDF3E4",
  },
];

const luxuryCorporateGiftsWhy: FeatureCard[] = [
  {
    id: 1,
    number: "01",
    title: "Build Stronger Client Relationships",
    description:
      "Show your clients that you value their business with high-end gifts that demonstrate your commitment to excellence and strengthen professional partnerships for long-term success.",
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
        <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M17 10h2a2 2 0 0 1 2 2v1" />
        <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
      </svg>
    ),
    iconColor: "#DDF3E4",
  },
  {
    id: 2,
    number: "02",
    title: "Memorable & Customized",
    description:
      "Stand out by offering unique customized corporate gifts that speak to your company's values and create lasting impressions that recipients will remember and appreciate.",
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" />
      </svg>
    ),
    iconColor: "#FDECC8",
  },
  {
    id: 3,
    number: "03",
    title: "Corporate Gifting Solutions Tailored to Your Needs",
    description:
      "Choose from a variety of gifts, from luxury gift hampers to branded items that reflect your business identity and meet your specific corporate gifting requirements.",
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M4 6l8 0" />
        <path d="M16 6l4 0" />
        <path d="M6 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M4 12l2 0" />
        <path d="M10 12l10 0" />
        <path d="M15 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M4 18l11 0" />
        <path d="M19 18l1 0" />
      </svg>
    ),
    iconColor: "#CFE8FF",
  },
  {
    id: 4,
    number: "04",
    title: "Reliable Delivery Across Dubai",
    description:
      "Fast and efficient delivery of all your luxury corporate gifts across Dubai, ensuring your gifts arrive on time and in perfect condition for every important occasion.",
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
        <path d="M3 9l4 0" />
      </svg>
    ),
    iconColor: "#D8ECFF",
  },
  {
    id: 5,
    number: "05",
    title: "Customization Options",
    description:
      "We offer a wide range of customized corporate gifts that fit your brand and message perfectly, allowing you to create personalized experiences that align with your corporate identity.",
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
        <path d="M13.5 6.5l4 4" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
      </svg>
    ),
    iconColor: "#F7DDF1",
  },
  {
    id: 6,
    number: "06",
    title: "Competitive Prices for Luxury Gifts in Dubai",
    description:
      "We offer top-quality products at reasonable rates, including luxury gifts that are often better value in Dubai compared to other markets, maximizing your gifting budget without compromising on quality.",
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3" />
      </svg>
    ),
    iconColor: "#FFE5D6",
  },
];

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What are the best luxury corporate gifts for clients in Dubai?",
    answer:
      "We offer a wide range of luxury corporate gifts that include everything from customized hampers, exclusive tech gifts, to branded leather items.",
  },
  {
    id: 2,
    question: "How can I get customized corporate gifts in Dubai?",
    answer:
      "We offer personalization options for all gifts. Add your company's logo, message, or choose from a variety of premium branding services.",
  },
  {
    id: 3,
    question: "What is the best time to order corporate gifts in Dubai?",
    answer:
      "To ensure timely delivery, we recommend placing orders at least 2 weeks in advance, especially for customized luxury corporate gifts.",
  },
  {
    id: 4,
    question: "Do you offer luxury gift hampers in Dubai?",
    answer:
      "Yes, we specialize in luxury gift hampers, beautifully curated to make a lasting impression.",
  },
  {
    id: 5,
    question: "Are your corporate gifting services in Dubai reliable?",
    answer:
      "Absolutely! We have years of experience and a reputation for providing high-quality gifts and on-time delivery for businesses across Dubai.",
  },
];

const fullIntroText = (
  <>
    <span className="font-semibold">Luxury Corporate Gifts Dubai</span> for
    every occasion: Whether you&apos;re celebrating a company milestone or rewarding
    your top clients, our selection of luxury corporate gifts ensures your
    brand stands out with sophistication and quality. We offer customized
    corporate gifts, luxury gift hampers, and more, delivered across Dubai.
  </>
);

async function getLuxuryData(page: number) {
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
    console.error("Failed to load luxury corporate gifts products:", error);
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

export default async function LuxuryCorporateGifts() {
  const page = 1;
  const { categories, productData } = await getLuxuryData(page);
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
          // title="Luxury Corporate Gifts in Dubai - Make Your Business Relationships Stronger"
          // titlesuffix="Luxury Corporate Gifts"

          title=" "
          titleLine2Before=""
          titleLine2Highlight="Luxury Corporate Gifts "
          titleLine2After=" in Dubai - Make Your Business Relationships Stronger"
          subtitle="Explore the best selection of customized corporate gifts for clients and employees in Dubai."
          buttonLink="#luxury-corporate-gifts"
          buttonText="Shop Luxury Corporate Gifts"
        />

        <CategoryIntro
          imageUrl={HERO_IMAGE}
          imageAlt="Luxury corporate gifts collection preview"
          content={fullIntroText}
          preview={
            <>
              <span className="font-semibold">Luxury Corporate Gifts Dubai</span>{" "}
              for every occasion: celebrate milestones, reward top clients, and
              elevate your brand presence.
            </>
          }
          heading="About Luxury Corporate Gifts Dubai"
        />

        <ProductGridClient
          title="Explore Our Luxury Corporate Gifts Collection"
          productData={productData}
          categories={filteredCategories}
          selectedCategory={CATEGORY_SLUG}
          id="luxury-corporate-gifts"
          categorySlug={CATEGORY_SLUG}
        />

        <WhyChooseUs
          title="Featured Corporate Gift Categories"
          features={luxuryCorporateGiftsFeatures}
        />

        <AnimatedTestimonials testimonials={testimonials} />

        <WhyChooseUs
          title="Why Choose Our Luxury Corporate Gifts in Dubai?"
          features={luxuryCorporateGiftsWhy}
        />

        <FAQ
          title="Frequently Asked Questions About Corporate Gifts"
          subtitle="Get answers to common questions about our corporate gifts"
          faqData={faqItems}
        />

        <CallToAction
          title="Your Trusted Partner for Luxury Corporate Gifts in Dubai"
          subtitle={
            <>
              From luxury gift sets to premium executive hampers, we deliver
              high-quality corporate gifts that strengthen relationships, elevate
              your brand presence, and demonstrate your commitment to thoughtful
              gifting.
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
