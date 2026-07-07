"use client";

import { useRef, useEffect, useState, useCallback, memo } from "react";
import {
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CupSoda,
  Dumbbell,
  Gem,
  Gift,
  Laptop,
  Leaf,
  NotebookPen,
  Shirt,
  type LucideIcon,
} from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import {
  candyIconButtonClasses,
  candyAccentIconClasses,
  candyNavIconClasses,
} from "@/components/ui/candy-button";

interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  icon: LucideIcon;
}

const productCategories: ProductCategory[] = [
  {
    id: "1",
    title: "Apparel & accessories",
    description:
      "Custom branded t-shirts, polo shirts, caps, and accessories with premium printing and embroidery.",
    image: "/assets/images/Home-page-hero-images/Apparel-&-accessories.webp",
    link: "/product-category/apparel-and-accessories",
    icon: Shirt,
  },
  {
    id: "2",
    title: "Bags & travel",
    description:
      "Personalized laptop bags, backpacks, travel kits, and luggage with custom logo printing.",
    image: "/assets/images/Home-page-hero-images/Bags-&-travel.webp",
    link: "/product-category/bags-and-travel",
    icon: Briefcase,
  },
  {
    id: "3",
    title: "Office & stationary",
    description:
      "Branded pens, notebooks, planners, and desk accessories with laser engraving and custom printing.",
    image: "/assets/images/Home-page-hero-images/Office-&-stationary.webp",
    link: "/product-category/office-and-stationary",
    icon: NotebookPen,
  },
  {
    id: "4",
    title: "Technology & accessories",
    description:
      "Custom power banks, USB drives, wireless chargers, and tech gadgets with logo printing.",
    image: "/assets/images/Home-page-hero-images/Technology-&-accessories.webp",
    link: "/product-category/technology-and-accessories",
    icon: Laptop,
  },
  {
    id: "5",
    title: "Eating & drinking",
    description:
      "Personalized mugs, water bottles, tumblers, and drinkware with premium printing and engraving.",
    image: "/assets/images/Home-page-hero-images/Eating-&-drinking.webp",
    link: "/product-category/eating-and-drinking",
    icon: CupSoda,
  },
  {
    id: "6",
    title: "Premiums gift sets",
    description:
      "Curated luxury gift hampers and premium sets with custom packaging and branding solutions.",
    image: "/assets/images/Home-page-hero-images/Premiums-gift-sets.webp",
    link: "/product-category/premium-gift-sets",
    icon: Gift,
  },
  {
    id: "7",
    title: "Sports & recreation",
    description:
      "Custom sports equipment, fitness accessories, and recreational items with branded printing.",
    image: "/assets/images/Home-page-hero-images/Sports-&-recreation.webp",
    link: "/product-category/sports-and-recreation",
    icon: Dumbbell,
  },
  {
    id: "8",
    title: "Eco friendly",
    description:
      "Sustainable bamboo products, reusable items, and eco-conscious gifts with custom branding.",
    image: "/assets/images/Home-page-hero-images/Eco-friendly.webp",
    link: "/product-category/eco-friendly",
    icon: Leaf,
  },
  {
    id: "9",
    title: "Luxury corporate gifts Dubai",
    description:
      "Premium executive gifts, leather accessories, and high-end corporate presents with elegant customization.",
    image: "/assets/images/Home-page-hero-images/Luxury-corporate-gifts.webp",
    link: "/product-category/luxury-corporate-gifts-dubai",
    icon: Gem,
  },
];

type CategoryCardProps = {
  category: ProductCategory;
  visible: boolean;
  index: number;
};

const CategoryCard = memo(function CategoryCard({
  category,
  visible,
  index,
}: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <div
      className={`h-full transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <NoPrefetchLink
        href={category.link}
        className="group flex h-full min-h-[320px] flex-col overflow-hidden rounded-xl border border-hairline bg-canvas sm:min-h-[240px] sm:flex-row"
      >
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-surface-card sm:h-auto sm:w-[42%]">
          <Image
            src={category.image}
            alt={category.title}
            width={1000}
            height={1000}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent sm:bg-linear-to-r sm:from-transparent sm:via-transparent sm:to-black/5" />
        </div>

        <div className="flex flex-1 flex-col border-t border-hairline p-5 sm:border-t-0 sm:border-l sm:p-6">
          <div className="mb-3 flex items-start gap-3">
            <span className={candyIconButtonClasses("white", "sm")}>
              <Icon className={candyAccentIconClasses} />
            </span>
            <h3 className="pt-1.5 text-lg font-semibold leading-snug tracking-tight text-ink">
              {category.title}
            </h3>
          </div>

          <p className="grow text-body-md text-muted">{category.description}</p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-brand-accent">
            Know more
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </NoPrefetchLink>
    </div>
  );
});

/** Carousel + autoplay + dots — isolated so slide changes do not re-render the heading. */
const ProductGridHomeCarousel = memo(function ProductGridHomeCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });

  const [swiperVisible, setSwiperVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const syncCarouselState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const root = emblaApi.rootNode();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target === root) {
            setSwiperVisible(true);
            break;
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const rafId = requestAnimationFrame(syncCarouselState);

    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);

    return () => {
      cancelAnimationFrame(rafId);
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reInit", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  useEffect(() => {
    if (!emblaApi || !swiperVisible) return;

    const autoplayId = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => window.clearInterval(autoplayId);
  }, [emblaApi, swiperVisible]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const slideLabel = String(selectedIndex + 1).padStart(2, "0");
  const totalLabel = String(productCategories.length).padStart(2, "0");

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-hairline bg-canvas transition-opacity duration-700 ease-out ${
        swiperVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Carousel toolbar */}
      <div className="flex items-center justify-between gap-4 border-b border-hairline px-4 py-3 sm:px-5">
        <p className="text-caption font-medium uppercase tracking-[0.14em] text-muted">
          <span className="text-ink">{slideLabel}</span>
          <span className="mx-1.5 text-muted-soft">/</span>
          {totalLabel}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className={candyIconButtonClasses("white", "sm", "swiper-button-prev-product-grid")}
            aria-label="Previous slide"
          >
            <ChevronLeft className={candyNavIconClasses} strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className={candyIconButtonClasses("white", "sm", "swiper-button-next-product-grid")}
            aria-label="Next slide"
          >
            <ChevronRight className={candyNavIconClasses} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      {/* Slides */}
      <div className="overflow-hidden p-4 sm:p-5" ref={emblaRef}>
        <div className="-mx-2 flex sm:-mx-2.5">
          {productCategories.map((productCategory, index) => (
            <div
              key={productCategory.id}
              className="h-auto flex-[0_0_100%] px-2 sm:flex-[0_0_100%] sm:px-2.5 lg:flex-[0_0_85%]"
            >
              <CategoryCard
                category={productCategory}
                visible={swiperVisible}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 border-t border-hairline px-4 py-4">
        {scrollSnaps.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? "w-5 bg-ink"
                : "w-1.5 bg-surface-strong hover:bg-muted"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

const ProductGridHome = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const headingEl = headingRef.current;
    if (!headingEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target === headingEl) {
            setHeadingVisible(true);
            break;
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(headingEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <div className="mx-auto max-w-7xl border-x border-hairline px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div
          ref={headingRef}
          className={`mb-10 grid grid-cols-1 gap-6 transition-all duration-700 ease-out sm:mb-12 lg:grid-cols-12 lg:gap-10 ${
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
              <Gift className="h-3.5 w-3.5 text-brand-accent" />
              Product Categories
            </span>

            <h2 className="mt-4 text-display-md text-ink">
              Explore Corporate Gift Categories in Dubai for Every Business
              Need.
            </h2>
          </div>

          <div className="flex items-end lg:col-span-7">
            <p className="text-body-md text-muted lg:text-[17px] lg:leading-7">
              Dubai corporate gifts are available in different categories like
              premium, customised, promotional, smart, luxury and affordable gifts
              for client appreciation, employee recognition, trade shows, festive
              campaigns and business events. We have branded apparel, office
              stationery, bags, drinkware, technology gifts, hampers,
              eco-friendly products and bulk giveaways for companies throughout
              Dubai and the UAE.
            </p>
          </div>
        </div>

        <ProductGridHomeCarousel />
      </div>
    </section>
  );
};

export default ProductGridHome;
