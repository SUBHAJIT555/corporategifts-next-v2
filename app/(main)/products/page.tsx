import CommonHero from "@/components/ui/CommonHero";
import ProductCategory from "@/components/pages/Product/ProductCatagory";
import FAQ, { type FAQItem } from "@/components/common/FAQ";
import CallToAction from "@/components/ui/CallToAction";

const productFaqData: FAQItem[] = [
  {
    id: 1,
    question: "Do you offer corporate gifting solutions across the UAE?",
    answer:
      "Yes. We serve businesses across Dubai and the wider UAE with tailored corporate gifting solutions for events, client appreciation, and employee recognition.",
  },
  {
    id: 2,
    question: "Can I mix products from different categories in one order?",
    answer:
      "Absolutely. You can combine items from multiple categories—such as apparel, tech, and gift sets—into a single curated order.",
  },
  {
    id: 3,
    question: "Do you provide custom branding on all products?",
    answer:
      "Most of our products support custom branding options including printing, embroidery, engraving, and custom packaging, depending on the item.",
  },
  {
    id: 4,
    question: "What is the typical lead time for corporate orders?",
    answer:
      "Lead times vary by product and quantity, but most standard orders are fulfilled within 7–14 working days after artwork approval.",
  },
  {
    id: 5,
    question: "Is there a minimum order quantity?",
    answer:
      "Minimum order quantities depend on the product type. Many items support low MOQs, while some custom or premium products require higher quantities.",
  },
];

export default function Product() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
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

      <div className="relative z-10">
        {/* Hero */}
        <CommonHero
          title="Explore a Wide Range of Premium Corporate Gifts in Dubai"
          titlesuffix=""
          subtitle="Discover our curated collection of premium corporate gifts across apparel, tech, travel, eco-friendly products, and more—designed to strengthen relationships and elevate your brand."
          buttonLink="#product-varieties"
          buttonText="Explore Our Varieties"
        />

        {/* Product categories grid */}
        <ProductCategory />

        {/* FAQ */}
        <FAQ
          faqData={productFaqData}
          title="Frequently Asked Questions About Our Products"
          subtitle="Find quick answers about our product categories, customization options, and ordering process."
        />

        {/* Call To Action */}
        <CallToAction
          title="Ready to Elevate Your Corporate Gifting?"
          subtitle={
            <>
              Partner with Baharnani Advertising, Dubai&apos;s premier corporate
              gift supplier. From premium gift sets to custom branding solutions,
              we help you create meaningful gifting experiences that strengthen
              business relationships.
            </>
          }
          backgroundImageUrl="/assets/images/Hero-images/Product-hero.webp"
          buttons={[
            {
              text: "Get Quote",
              className:
                " bg-linear-to-r from-neutral-800 to-neutral-500! text-white! border! border-neutral-200! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!",
              link: "/contact-us",
            },
            {
              text: "View Products",
              className:
                " bg-linear-to-r from-neutral-100 to-neutral-300! border! border-neutral-200! text-neutral-700! font-sentient! font-medium! ring-1 ring-neutral-300! ring-offset-3!",
              link: "#product-varieties",
            },
          ]}
        />
      </div>
    </main>
  );
}
