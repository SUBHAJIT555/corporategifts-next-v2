"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Gift, HelpCircle } from "lucide-react";
import { ProductsApi } from "@/lib/api/endpoints";
import type { PaginatedProductsResponse, ProductCategory } from "@/lib/api/types";
import ProductGrid from "@/components/common/ProductGrid";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import FloatingCategoryMenu from "@/components/ui/FloatingCategoryMenu";
import {
  Reveal,
  RevealSection,
} from "@/components/ui/timeline-animation";
import { candyDarkButtonClasses } from "@/components/ui/candy-button";
import { cn } from "@/lib/utilts";

const PER_PAGE = 12;

function BestSellingHelpCta() {
  return (
    <div className="mt-2 overflow-hidden border border-hairline border-dotted bg-canvas sm:mt-3">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div
            className="absolute bottom-0 left-1/2 h-[60%] w-[150%] opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(var(--cal-hairline) 1px, transparent 1px), linear-gradient(90deg, var(--cal-hairline) 1px, transparent 1px)",
              backgroundSize: "40px 25px",
              transform: "translateX(-50%) perspective(300px) rotateX(45deg)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 30%, #000 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 30%, #000 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body">
              <HelpCircle className="h-3.5 w-3.5 text-brand-accent" />
              Gift guidance
            </span>

            <h3 className="mt-4 text-display-sm text-ink">
              Not sure what to choose?
            </h3>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-7 lg:items-end">
            <p className="text-body-md text-muted lg:text-right lg:text-[17px] lg:leading-7">
              Our team can recommend smart corporate gifts, luxury gift sets,
              affordable promotional gifts, or customized corporate gifts based on
              your budget, audience, quantity, and delivery timeline.
            </p>

            <NoPrefetchLink
              href="/contact-us"
              className={cn(candyDarkButtonClasses("w-full sm:w-auto"), "shrink-0")}
            >
              Contact Us Now
            </NoPrefetchLink>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  initial: PaginatedProductsResponse;
  categories: ProductCategory[];
  byCategory: Record<string, PaginatedProductsResponse>;
};

export default function BestSellingClient({
  initial,
  categories,
  byCategory,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [overrideProductData, setOverrideProductData] =
    useState<PaginatedProductsResponse | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const setCategory = useCallback((slug: string | null) => {
    setSelectedCategory(slug);
    setOverrideProductData(null);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setMenuVisible(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      {
        threshold: [0, 0.2, 0.4],
        rootMargin: "-72px 0px -72px 0px",
      }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const safeCategories = useMemo(
    () => (Array.isArray(categories) ? categories : []),
    [categories]
  );

  const categoryMenuItems = useMemo(
    () => [
      {
        label: "All",
        count: initial.total,
        active: selectedCategory === null,
        onClick: () => setCategory(null),
      },
      ...safeCategories.map((category) => ({
        label: category.name,
        count: category.product_count,
        active: selectedCategory === category.slug,
        onClick: () => setCategory(category.slug),
      })),
    ],
    [initial.total, safeCategories, selectedCategory, setCategory]
  );

  const productData = useMemo(() => {
    if (overrideProductData) return overrideProductData;
    if (!selectedCategory) return initial;
    return (
      byCategory[selectedCategory] ?? {
        products: [],
        total: 0,
        total_pages: 0,
        page: 1,
        per_page: PER_PAGE,
      }
    );
  }, [initial, byCategory, selectedCategory, overrideProductData]);

  const onPageChange = useCallback(
    async (newPage: number) => {
      if (newPage < 1) return;
      if (newPage === 1) {
        setOverrideProductData(null);
        return;
      }
      setIsLoadingPage(true);
      try {
        const data = selectedCategory
          ? await ProductsApi.byCategory({
              categorySlug: selectedCategory,
              page: newPage,
              per_page: PER_PAGE,
            })
          : await ProductsApi.all({ page: newPage, per_page: PER_PAGE });
        setOverrideProductData(data);
      } catch {
        setOverrideProductData(null);
      } finally {
        setIsLoadingPage(false);
      }
    },
    [selectedCategory]
  );

  return (
    <section
      id="best-selling"
      className="relative w-full overflow-x-hidden bg-canvas"
    >
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        {/* Header */}
        <Reveal
          animationNum={0}
          className="mb-2 grid grid-cols-1 gap-3 sm:mb-3 lg:grid-cols-12 lg:gap-5"
        >
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
              <Gift className="h-3.5 w-3.5 text-brand-accent" />
              Best Selling
            </span>

            <h2 className="mt-4 text-display-md text-ink">
              Best-Selling Customized Corporate Gifts in Dubai.
            </h2>
          </div>

          <div className="flex items-end lg:col-span-7">
            <p className="text-body-md text-muted lg:text-[17px] lg:leading-7">
              Browse our most requested customized corporate gifts in Dubai,
              including branded pens, notebooks, smart gadgets, drinkware, bags,
              gift sets, and promotional giveaways. These products are suitable
              for client gifting, employee welcome kits, trade shows,
              conferences, festive campaigns, and corporate events.
            </p>
          </div>
        </Reveal>

        {/* Product grid panel — filter button only visible while this block is in view */}
        <Reveal animationNum={1}>
          <div ref={gridRef} className="relative pb-8 sm:pb-10">
            <ProductGrid
              variant="home"
              productData={productData}
              categories={categories}
              isLoading={isLoadingPage}
              error={null}
              selectedCategory={selectedCategory}
              setSelectedCategory={setCategory}
              onPageChange={onPageChange}
              productType="custom"
            />
          </div>
        </Reveal>

        <Reveal animationNum={2}>
          <BestSellingHelpCta />
        </Reveal>
      </RevealSection>

      <FloatingCategoryMenu
        visible={menuVisible}
        items={categoryMenuItems}
        triggerLabel="Filter"
      />
    </section>
  );
}
