"use client"
import { useState, useEffect, useRef, useMemo, memo, useCallback, type RefObject } from "react";
import { FiFilter, IoChevronBack, IoChevronForward } from "@/components/icons";
import { PaginatedProductsResponse, Product, ProductCategory } from "@/lib/api/types";
import Loading from "../ui/Loading";
import { useQuote } from "@/contexts/QuoteContext";
import { cn } from "@/lib/utilts";
import { ProductCard as RawProductCard } from "./ProductCard";
import {
  candyCarouselNavClasses,
  candyDarkButtonClasses,
  candyNavIconClasses,
} from "@/components/ui/candy-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";


interface ProductGridProps {
  productData: PaginatedProductsResponse;
  categories: ProductCategory[] | [];
  title?: string;
  isLoading: boolean;
  error: Error | null;
  subtitle?: string;
  onPageChange?: (page: number) => void;
  selectedCategory: string | null;
  setSelectedCategory?: (category: string | null) => void;
  productType?:
  | "construction"
  | "foodstuff"
  | "building"
  | "contracting"
  | "importandexport"
  | "electronicsandit"
  | "chemicalsandadditives"
  | "bestsellingitems"
  | "oilproducts"
  | "custom";

  id?: string;
  variant?: "default" | "home" | "category";
}

// ─────────────────────────────────────
// MEMOIZED CARD
// ─────────────────────────────────────
const ProductCard = memo(RawProductCard);

// ─────────────────────────────────────
// MEMOIZED FILTER BUTTON
// ─────────────────────────────────────
const FilterButton = memo(function FilterButton({
  category,
  isAll,
  selectedCategory,
  onSelect,
  variant = "default",
}: {
  category: ProductCategory | null;
  isAll?: boolean;
  selectedCategory: string | null;
  onSelect: (slug: string | null) => void;
  variant?: "default" | "home" | "category";
}) {
  const slug = category?.slug ?? null;
  const active = isAll ? selectedCategory === null : selectedCategory === slug;
  const filterVariant = variant === "category" ? "home" : variant;

  if (filterVariant === "home") {
    return (
      <button
        type="button"
        onClick={() => onSelect(slug)}
        className={cn(
          "cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors sm:px-4 sm:py-2",
          active
            ? "border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-on-primary"
            : "border-hairline bg-surface-soft text-body hover:bg-surface-card"
        )}
      >
        {isAll ? "All" : category?.name}
      </button>
    );
  }

  return (
    <button
      onClick={() => onSelect(slug)}
      className={cn(
        "px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-xl font-switzer font-medium text-sm sm:text-base transition-all whitespace-nowrap cursor-pointer",
        active
          ? "bg-[#0f5c85] text-white ring ring-neutral-300 ring-offset-2 "
          : "bg-neutral-100 border border-neutral-300 ring ring-neutral-300 ring-offset-2 text-textcolor hover:bg-gray-300"
      )}
    >
      {isAll ? "All" : category?.name}
    </button>
  );
});

// ─────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────
const ProductGrid = ({
  productData,
  categories,
  isLoading,
  error,
  title,
  subtitle,
  onPageChange,
  selectedCategory,
  setSelectedCategory,
  id,
  variant = "default",
}: ProductGridProps) => {
  const { addToQuote, isInQuote, updateQuantity } = useQuote();

  // const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  const safeCategories = useMemo(
    () => (Array.isArray(categories) ? categories : []),
    [categories],
  );
  const products = useMemo(
    () => (Array.isArray(productData?.products) ? productData.products : []),
    [productData],
  );
  const currentPage =
    typeof productData?.page === "number" && Number.isFinite(productData.page)
      ? productData.page
      : 1;
  const totalPages =
    typeof productData?.total_pages === "number" &&
    Number.isFinite(productData.total_pages)
      ? productData.total_pages
      : 1;
  const total =
    typeof productData?.total === "number" && Number.isFinite(productData.total)
      ? productData.total
      : products.length;


  const paginationInfo = useMemo(
    () =>
      productData && {
        currentPage,
        totalPages,
        total,
      },
    [productData, currentPage, totalPages, total]
  );

  // ─────────────────────────────────────
  // SCROLL HANDLER (high-performance)
  // ─────────────────────────────────────
  // ─────────────────────────────────────
  // CALLBACKS
  // ─────────────────────────────────────
  const handleAddToQuote = useCallback(
    (product: Product, quantity: number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (isInQuote(product.id)) {
        updateQuantity(product.id, quantity);
      } else {
        addToQuote(product, quantity);
      }
    },
    [addToQuote, updateQuantity, isInQuote]
  );

  const handleSelectCategory = useCallback(
    (slug: string | null) => {
      setSelectedCategory?.(slug);

      if (self.innerWidth < 1024) {
        // setIsBottomSheetOpen(false);
        setTimeout(() => {
          const el = sectionRef.current;
          if (el) {
            self.scrollTo({
              top: el.offsetTop - 20,
              behavior: "smooth",
            });
          }
        }, 300);
      }
    },
    [setSelectedCategory]
  );

  // ─────────────────────────────────────
  // MEMOIZED CATEGORY BUTTONS
  // ─────────────────────────────────────
  const isHome = variant === "home";
  const isCategory = variant === "category";

  const categoryButtons = useMemo(() => {
    if (!safeCategories.length) return null;

    return (
      <>
        <FilterButton
          key="all"
          category={null}
          isAll
          selectedCategory={selectedCategory}
          onSelect={handleSelectCategory}
          variant={variant}
        />
        {safeCategories.map((category: ProductCategory) => (
          <FilterButton
            key={category.id}
            category={category}
            selectedCategory={selectedCategory}
            onSelect={handleSelectCategory}
            variant={variant}
          />
        ))}
      </>
    );
  }, [safeCategories, selectedCategory, handleSelectCategory, variant]);

  // ─────────────────────────────────────
  // MEMOIZED PRODUCT LIST
  // ─────────────────────────────────────
  const cardVariant = variant === "category" ? "home" : variant;

  const productList = useMemo(
    () =>
      products.map((p: Product, i: number) => (
        <div
          key={p.id}
          style={{ animationDelay: `${i * 0.03}s` }}
          className="flex flex-col overflow-hidden rounded-xl"
        >
          <ProductCard
            product={p}
            index={i}
            onAddToQuote={handleAddToQuote}
            isInQuote={isInQuote(p.id)}
            currentQuantity={1}
            variant={cardVariant}
          />
        </div>
      )),
    [products, handleAddToQuote, isInQuote, cardVariant]
  );

  const pageLabel = String(paginationInfo?.currentPage ?? 1).padStart(2, "0");
  const totalPagesLabel = String(paginationInfo?.totalPages ?? 1).padStart(2, "0");

  if (isCategory) {
    return (
      <section ref={sectionRef} id={id} className="w-full bg-canvas">
        <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
          <Reveal animationNum={0}>
            <h2 className="text-display-md text-ink">{title}</h2>
          </Reveal>

          {subtitle && (
            <Reveal animationNum={1}>
              <p className="mt-3 max-w-3xl text-body-md text-muted sm:text-[17px] sm:leading-7">
                {subtitle}
              </p>
            </Reveal>
          )}

          {safeCategories.length > 0 && (
            <Reveal animationNum={2} className="mt-6 mb-5 hidden lg:block sm:mb-6">
              <div className="flex flex-wrap gap-2">{categoryButtons}</div>
            </Reveal>
          )}

          {safeCategories.length > 0 && (
            <div className="sticky top-0 z-50 -mx-5 mb-5 w-[calc(100%+2.5rem)] py-3 sm:-mx-6 sm:mb-6 sm:w-[calc(100%+3rem)] lg:hidden">
              <div className="overflow-x-auto px-5 sm:px-6">
                <div className="flex min-w-max gap-2 py-1">{categoryButtons}</div>
              </div>
            </div>
          )}

          <Reveal animationNum={3}>
            {isLoading ? (
              <div className="flex min-h-[420px] items-center justify-center">
                <Loading size="md" message="Loading products..." />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {productList}
              </div>
            )}

            {paginationInfo && paginationInfo.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-caption font-medium uppercase tracking-[0.14em] text-muted">
                  <span className="text-ink">{pageLabel}</span>
                  <span className="mx-1.5 text-muted-soft">/</span>
                  {totalPagesLabel}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onPageChange?.(paginationInfo.currentPage - 1)}
                    disabled={paginationInfo.currentPage === 1 || !onPageChange}
                    className={candyCarouselNavClasses("prev")}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className={candyNavIconClasses} strokeWidth={2.25} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onPageChange?.(paginationInfo.currentPage + 1)}
                    disabled={
                      paginationInfo.currentPage === paginationInfo.totalPages ||
                      !onPageChange
                    }
                    className={candyCarouselNavClasses("next")}
                    aria-label="Next page"
                  >
                    <ChevronRight className={candyNavIconClasses} strokeWidth={2.25} />
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="mt-4 text-sm text-error">Error: {error.message}</p>
            )}
          </Reveal>
        </RevealSection>
      </section>
    );
  }

  if (isHome) {
    return (
      <div ref={sectionRef as React.RefObject<HTMLDivElement>} id={id}>
        <div className="overflow-hidden rounded-2xl border border-hairline bg-canvas">
          {isLoading ? (
            <div className="flex min-h-[420px] items-center justify-center p-6">
              <Loading size="md" message="Loading products..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 bg-surface-soft p-4 sm:gap-4 sm:p-5 md:grid-cols-3 lg:grid-cols-4">
              {productList}
            </div>
          )}

          {paginationInfo && paginationInfo.totalPages > 1 && (
            <div className="flex items-center justify-between gap-4 border-t border-hairline px-4 py-3 sm:px-5">
              <p className="text-caption font-medium uppercase tracking-[0.14em] text-muted">
                <span className="text-ink">{pageLabel}</span>
                <span className="mx-1.5 text-muted-soft">/</span>
                {totalPagesLabel}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onPageChange?.(paginationInfo.currentPage - 1)}
                  disabled={paginationInfo.currentPage === 1 || !onPageChange}
                  className={candyCarouselNavClasses("prev")}
                  aria-label="Previous page"
                >
                  <ChevronLeft className={candyNavIconClasses} strokeWidth={2.25} />
                </button>
                <button
                  type="button"
                  onClick={() => onPageChange?.(paginationInfo.currentPage + 1)}
                  disabled={
                    paginationInfo.currentPage === paginationInfo.totalPages ||
                    !onPageChange
                  }
                  className={candyCarouselNavClasses("next")}
                  aria-label="Next page"
                >
                  <ChevronRight className={candyNavIconClasses} strokeWidth={2.25} />
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="border-t border-hairline px-4 py-3 text-sm text-error sm:px-5">
              Error: {error.message}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────
  return (
    <section ref={sectionRef} id={id} className="relative w-full py-6 sm:py-8 md:py-12 lg:py-16">
      <RevealSection className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1920px] mx-auto">

        <Reveal animationNum={0}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient text-textcolor font-semibold mb-4">
          {title}
        </h2>
        </Reveal>

        {subtitle && (
          <Reveal animationNum={1}>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-switzer tracking-widest text-textcolor mb-6">
            {subtitle}
          </p>
          </Reveal>
        )}

        {/* DESKTOP FILTERS */}
        {safeCategories.length > 0 && (
          <Reveal animationNum={2} className="hidden lg:block mb-8">
            <div className="flex flex-wrap gap-3">{categoryButtons}</div>
          </Reveal>
        )}

        {/* MOBILE STICKY FILTER */}
        {safeCategories.length > 0 && (
          <div className="lg:hidden sticky top-0 z-50 py-3 mb-4 w-screen -ml-3 sm:-ml-4 md:-ml-6 lg:-ml-8 xl:-ml-12">
            <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 min-w-max px-3 py-2 sm:px-4 sm:py-2">
                  {categoryButtons}
                </div>
              </div>
            </div>
          </div>
        )}

        {safeCategories.length > 1 && (
          <FloatingFilterButton targetRef={sectionRef} />
        )}

        {/* PRODUCT LIST OR LOADING */}
        <Reveal animationNum={3}>
        {isLoading ? (
          <div className="min-h-[550px] flex items-center justify-center">
            <Loading size="md" message="Loading products..." />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
            {productList}
          </div>
        )}
        </Reveal>

        {/* PAGINATION */}
        {paginationInfo && paginationInfo.totalPages > 1 && (
          <Reveal animationNum={4}>
          <div className="flex items-center justify-center gap-4 mt-8 py-4">
            <button
              onClick={() => onPageChange?.(paginationInfo.currentPage - 1)}
              disabled={paginationInfo.currentPage === 1 || !onPageChange}
              className="p-2 rounded-xl border border-neutral-300 ring ring-neutral-200 ring-offset-2 bg-white text-textcolor disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <IoChevronBack className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 font-switzer text-textcolor text-sm sm:text-base">
              <span className="text-neutral-700 rounded-md font-medium">
                {paginationInfo.currentPage}
              </span>
              <span>/</span>
              <span>{paginationInfo.totalPages}</span>
            </div>

            <button
              onClick={() => onPageChange?.(paginationInfo.currentPage + 1)}
              disabled={paginationInfo.currentPage === paginationInfo.totalPages || !onPageChange}
              className="p-2 rounded-xl border border-neutral-300 ring ring-neutral-200 ring-offset-2 bg-white text-textcolor disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <IoChevronForward className="w-5 h-5" />
            </button>
          </div>
          </Reveal>
        )}

        {error && <div>Error: {error.message}</div>}
      </RevealSection>
    </section>
  );
};

type FloatingFilterButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  variant?: "default" | "home";
};

const FloatingFilterButton = memo(({ targetRef, variant = "default" }: FloatingFilterButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = targetRef.current;
    if (!section) return;

    const topSentinel = document.createElement("div");
    topSentinel.style.position = "absolute";
    topSentinel.style.top = "220px";
    topSentinel.style.left = "0";
    topSentinel.style.width = "1px";
    topSentinel.style.height = "1px";
    topSentinel.style.pointerEvents = "none";
    section.prepend(topSentinel);
    topSentinelRef.current = topSentinel;

    const bottomSentinel = document.createElement("div");
    bottomSentinel.style.position = "absolute";
    bottomSentinel.style.bottom = "0";
    bottomSentinel.style.left = "0";
    bottomSentinel.style.width = "1px";
    bottomSentinel.style.height = "1px";
    bottomSentinel.style.pointerEvents = "none";
    section.append(bottomSentinel);
    bottomSentinelRef.current = bottomSentinel;

    let topPassed = false;
    let bottomPassed = false;
    const syncVisibility = () => {
      const nextVisible = topPassed && !bottomPassed;
      setIsVisible((prev) => (prev !== nextVisible ? nextVisible : prev));
    };

    const topObserver = new IntersectionObserver(
      ([entry]) => {
        topPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        syncVisibility();
      },
      { threshold: 0 },
    );

    const bottomObserver = new IntersectionObserver(
      ([entry]) => {
        bottomPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        syncVisibility();
      },
      { threshold: 0 },
    );

    topObserver.observe(topSentinel);
    bottomObserver.observe(bottomSentinel);

    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();

      if (topSentinelRef.current && topSentinelRef.current.parentNode) {
        topSentinelRef.current.parentNode.removeChild(topSentinelRef.current);
        topSentinelRef.current = null;
      }

      if (bottomSentinelRef.current && bottomSentinelRef.current.parentNode) {
        bottomSentinelRef.current.parentNode.removeChild(bottomSentinelRef.current);
        bottomSentinelRef.current = null;
      }
    };
  }, [targetRef]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const section = targetRef.current;
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 20,
            behavior: "smooth",
          });
        }
      }}
      className={cn(
        "fixed bottom-4 sm:bottom-6 left-1/2 z-100 flex -translate-x-1/2 items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all duration-200 sm:px-6 sm:py-3 text-sm sm:text-base cursor-pointer",
        variant === "home"
          ? cn(
              candyDarkButtonClasses("pointer-events-auto gap-2 h-auto! py-2.5 px-4 sm:px-5"),
              "flex items-center"
            )
          : "bg-[#0f5c85] hover:bg-[#0f5c85]/90 backdrop-blur-sm text-white ring ring-neutral-300 ring-offset-2 md:ring-offset-4 font-switzer font-bold",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none",
      )}
    >
      <FiFilter className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="hidden xs:inline sm:inline">FILTER</span>
      <span className="inline xs:hidden sm:hidden">Filter</span>
    </button>
  );
});

FloatingFilterButton.displayName = "FloatingFilterButton";
export default ProductGrid;
