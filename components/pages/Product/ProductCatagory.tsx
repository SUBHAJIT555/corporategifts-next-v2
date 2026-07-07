"use client";

import { memo } from "react";
import Image from "next/image";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { candyDarkButtonClasses } from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utilts";

interface ProductCategory {
  id: number;
  title: string;
  description: string;
  productRange: string[];
  highlights: string[];
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

const categories: ProductCategory[] = [
  {
    id: 1,
    title: "Premium Gift Sets",
    description:
      "Curated premium gift sets that combine multiple products for maximum impact. From executive gift boxes to luxury hampers, we create sophisticated collections that leave a lasting impression on your most valued clients and partners.",
    productRange: [
      "Executive gift boxes and hampers",
      "Luxury skincare and wellness sets",
      "Gourmet food and beverage collections",
      "Premium office accessory bundles",
      "Seasonal and themed gift sets",
      "Custom-curated corporate packages",
    ],
    highlights: [
      "Expertly curated collections",
      "Premium packaging and presentation",
      "Customizable contents and branding",
      "Perfect for special occasions and milestones",
    ],
    imageUrl: "/assets/images/product-page-images/Premium-Gift-Sets.webp",
    buttonText: "Explore Premium Gift Sets",
    buttonLink: "/product-category/premium-gift-sets",
  },
  {
    id: 2,
    title: "Luxury Corporate Gifts",
    description:
      "Make an unforgettable impression with our exclusive collection of luxury corporate gifts. From high-end timepieces and leather goods to premium electronics and artisanal products, we offer sophisticated options for your most distinguished clients and executives.",
    productRange: [
      "Luxury watches and timepieces",
      "Premium leather goods and wallets",
      "High-end electronics and gadgets",
      "Artisanal and handcrafted items",
      "Luxury home and office decor",
      "Exclusive branded merchandise",
    ],
    highlights: [
      "Premium brands and craftsmanship",
      "Exclusive and limited edition items",
      "Personalized engraving and customization",
      "Elegant presentation and packaging",
    ],
    imageUrl: "/assets/images/product-page-images/Luxury-Corporate-Gifts.webp",
    buttonText: "Explore Luxury Corporate Gifts",
    buttonLink: "/product-category/luxury-corporate-gifts-dubai",
  },
  {
    id: 3,
    title: "Apparel and Accessories",
    description:
      "Elevate your corporate brand with premium quality apparel and accessories. From custom-embroidered polo shirts and branded jackets to elegant ties and scarves, we offer a comprehensive range of corporate wear that reflects professionalism and style.",
    productRange: [
      "Custom polo shirts and t-shirts with embroidery",
      "Corporate jackets, blazers, and vests",
      "Business ties, scarves, and pocket squares",
      "Branded caps, beanies, and headwear",
      "Corporate uniforms and workwear",
      "Accessories: belts, wallets, and keychains",
    ],
    highlights: [
      "Premium fabric quality and durability",
      "Custom branding and embroidery services",
      "Wide range of sizes and color options",
      "Bulk order discounts and flexible delivery",
    ],
    imageUrl: "/assets/images/product-page-images/Apparel-and-Accessories.webp",
    buttonText: "Explore Apparel & Accessories",
    buttonLink: "/product-category/apparel-and-accessories",
  },
  {
    id: 4,
    title: "Bags and Travel",
    description:
      "Professional travel solutions and branded bags that combine functionality with corporate identity. From executive laptop bags to travel luggage sets, our collection ensures your brand travels with style and sophistication.",
    productRange: [
      "Laptop bags and briefcases",
      "Backpacks and messenger bags",
      "Travel luggage and suitcases",
      "Tote bags and shopping bags",
      "Duffel bags and gym bags",
      "Travel accessories and organizers",
    ],
    highlights: [
      "Durable materials and quality craftsmanship",
      "Custom logo printing and embroidery",
      "Ergonomic designs for comfort",
      "Variety of styles for different occasions",
    ],
    imageUrl: "/assets/images/product-page-images/Bags-and-Travel.webp",
    buttonText: "Explore Bags & Travel",
    buttonLink: "/product-category/bags-and-travel",
  },
  {
    id: 5,
    title: "Office and Stationary",
    description:
      "Complete your corporate workspace with premium office supplies and branded stationery. From elegant pen sets to custom notebooks and desk accessories, we provide everything needed to create a professional and organized work environment.",
    productRange: [
      "Premium pen sets and writing instruments",
      "Custom notebooks and journals",
      "Desk organizers and accessories",
      "Notepads, sticky notes, and planners",
      "File folders and document holders",
      "Corporate calendars and wall planners",
    ],
    highlights: [
      "High-quality materials and finishes",
      "Custom branding and personalization",
      "Eco-friendly options available",
      "Bulk pricing for corporate orders",
    ],
    imageUrl: "/assets/images/product-page-images/Office-and-Stationary.webp",
    buttonText: "Explore Office & Stationary",
    buttonLink: "/product-category/office-and-stationary",
  },
  {
    id: 6,
    title: "Technology and Accessories",
    description:
      "Stay ahead with cutting-edge technology gifts and accessories. From wireless chargers and power banks to premium headphones and smart devices, we offer the latest tech solutions that make perfect corporate gifts for clients and employees.",
    productRange: [
      "Wireless chargers and power banks",
      "Bluetooth speakers and headphones",
      "USB drives and external storage",
      "Smart watches and fitness trackers",
      "Phone cases and screen protectors",
      "Cable organizers and tech accessories",
    ],
    highlights: [
      "Latest technology and innovations",
      "Branded packaging options",
      "Warranty and support included",
      "Compatible with all major devices",
    ],
    imageUrl: "/assets/images/product-page-images/Technology-and-Accessories.webp",
    buttonText: "Explore Technology & Accessories",
    buttonLink: "/product-category/technology-and-accessories",
  },
  {
    id: 7,
    title: "Eating and Drinking",
    description:
      "Impress clients and employees with elegant dining and beverage solutions. From premium coffee sets and tea collections to branded water bottles and wine accessories, we curate sophisticated options for every corporate occasion.",
    productRange: [
      "Premium coffee and tea gift sets",
      "Branded water bottles and tumblers",
      "Wine glasses and bar accessories",
      "Gourmet gift baskets and hampers",
      "Custom mugs and drinkware",
      "Cutlery sets and serving accessories",
    ],
    highlights: [
      "Premium quality and presentation",
      "Custom engraving and branding",
      "Eco-friendly and sustainable options",
      "Perfect for corporate events and gifting",
    ],
    imageUrl: "/assets/images/product-page-images/Eating-and-Drinking.webp",
    buttonText: "Explore Eating & Drinking",
    buttonLink: "/product-category/eating-and-drinking",
  },
  {
    id: 8,
    title: "Sports and Recreation",
    description:
      "Promote wellness and team spirit with our range of sports and recreation gifts. From branded athletic wear to fitness equipment and outdoor gear, we help you reward active lifestyles and build stronger corporate teams.",
    productRange: [
      "Branded athletic wear and sportswear",
      "Fitness equipment and accessories",
      "Outdoor gear and camping supplies",
      "Sports water bottles and hydration packs",
      "Team building activity kits",
      "Golf accessories and equipment",
    ],
    highlights: [
      "Durable and performance-oriented",
      "Team branding and customization",
      "Suitable for corporate wellness programs",
      "Variety for different sports and activities",
    ],
    imageUrl: "/assets/images/product-page-images/Sports-and-Recreation.webp",
    buttonText: "Explore Sports & Recreation",
    buttonLink: "/product-category/sports-and-recreation",
  },
  {
    id: 9,
    title: "Eco Friendly",
    description:
      "Demonstrate your commitment to sustainability with our eco-friendly corporate gift collection. From reusable products to sustainable materials, we offer environmentally conscious options that align with your corporate values and green initiatives.",
    productRange: [
      "Reusable water bottles and coffee cups",
      "Bamboo and recycled material products",
      "Organic cotton apparel and bags",
      "Solar-powered accessories",
      "Plantable stationery and seed packets",
      "Sustainable packaging solutions",
    ],
    highlights: [
      "Certified sustainable materials",
      "Carbon-neutral shipping options",
      "Eco-friendly packaging",
      "Supports corporate sustainability goals",
    ],
    imageUrl: "/assets/images/product-page-images/Eco-Friendly.webp",
    buttonText: "Explore Eco Friendly",
    buttonLink: "/product-category/eco-friendly",
  },
];

type CategoryCardProps = {
  category: ProductCategory;
  index: number;
};

const CategoryCard = memo(function CategoryCard({
  category,
  index,
}: CategoryCardProps) {
  const isEven = index % 2 === 0;

  return (
    <Reveal
      animationNum={index + 1}
      as="article"
      className={cn(
        "flex flex-col gap-6 sm:gap-8 lg:gap-10",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse",
      )}
    >
      <div className="relative h-[250px] w-full overflow-hidden rounded-2xl border border-hairline bg-surface-soft sm:h-[280px] md:h-[320px] lg:h-[380px] lg:w-[38%] lg:shrink-0">
        <Image
          width={640}
          height={480}
          src={category.imageUrl}
          alt={category.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="flex w-full flex-col justify-center space-y-4 sm:space-y-5 lg:w-[62%]">
        <h2 className="text-display-sm leading-tight text-ink sm:text-display-md lg:text-display-lg">
          {category.title}
        </h2>

        <p className="text-body-md text-body sm:text-[17px] sm:leading-7">
          {category.description}
        </p>

        <div className="space-y-2">
          <h3 className="text-base font-semibold text-ink sm:text-lg">
            Product Range:
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {category.productRange.slice(0, 6).map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-body-md text-muted"
              >
                <span className="mt-1 text-brand-accent">*</span>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold text-ink sm:text-lg">
            Highlights:
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {category.highlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-body-md text-muted"
              >
                <span className="mt-1 text-brand-accent">+</span>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-1 sm:pt-2">
          <NoPrefetchLink
            href={category.buttonLink}
            className={candyDarkButtonClasses("w-full sm:w-auto")}
          >
            {category.buttonText}
          </NoPrefetchLink>
        </div>
      </div>
    </Reveal>
  );
});

const ProductCategory = () => {
  return (
    <section className="w-full bg-canvas" id="product-varieties">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-6 sm:px-6 sm:py-8 lg:py-10">
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
          {categories.map((category, index) => (
            <div key={category.id}>
              {index > 0 ? (
                <div className="screen-line-top mb-10 sm:mb-12 lg:mb-16" />
              ) : null}
              <CategoryCard category={category} index={index} />
            </div>
          ))}
        </div>
      </RevealSection>
    </section>
  );
};

export default ProductCategory;
