"use client"
import { useState, useEffect, useRef, useMemo, memo, useCallback, type RefObject } from "react";
import { FiFilter, IoChevronBack, IoChevronForward } from "@/components/icons";
import { PaginatedProductsResponse, Product, ProductCategory } from "@/lib/api/types";
import Loading from "../ui/Loading";
import { useQuote } from "@/contexts/QuoteContext";
import { cn } from "@/lib/utilts";
import { ProductCard as RawProductCard } from "./ProductCard";


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
}: {
  category: ProductCategory | null;
  isAll?: boolean;
  selectedCategory: string | null;
  onSelect: (slug: string | null) => void;
}) {
  const slug = category?.slug ?? null;
  const active = isAll ? selectedCategory === null : selectedCategory === slug;

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
}: ProductGridProps) => {
  const { addToQuote, isInQuote, updateQuantity } = useQuote();

  // const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

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
        />
        {safeCategories.map((category: ProductCategory) => (
          <FilterButton
            key={category.id}
            category={category}
            selectedCategory={selectedCategory}
            onSelect={handleSelectCategory}
          />
        ))}
      </>
    );
  }, [safeCategories, selectedCategory, handleSelectCategory]);

  // ─────────────────────────────────────
  // MEMOIZED PRODUCT LIST
  // ─────────────────────────────────────
  const productList = useMemo(
    () =>
      products.map((p: Product, i: number) => (
        <div
          key={p.id}
          style={{ animationDelay: `${i * 0.03}s` }}
          className=" rounded-xl overflow-hidden  transition-shadow flex flex-col"
        >
          <ProductCard
            product={p}
            index={i}
            onAddToQuote={handleAddToQuote}
            isInQuote={isInQuote(p.id)}
            currentQuantity={1}
          />
        </div>
      )),
    [products, handleAddToQuote, isInQuote]
  );

  // ─────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────
  return (
    <section ref={sectionRef} id={id} className="relative w-full py-6 sm:py-8 md:py-12 lg:py-16">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1920px] mx-auto">

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient text-textcolor font-semibold mb-4">
          {title}
        </h2>

        {subtitle && (
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-switzer tracking-widest text-textcolor mb-6">
            {subtitle}
          </p>
        )}

        {/* DESKTOP FILTERS */}
        {safeCategories.length > 0 && (
          <div className="hidden lg:block mb-8">
            <div className="flex flex-wrap gap-3">{categoryButtons}</div>
          </div>
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
        {isLoading ? (
          <div className="min-h-[550px] flex items-center justify-center">
            <Loading size="md" message="Loading products..." />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
            {productList}
          </div>
        )}

        {/* PAGINATION */}
        {paginationInfo && paginationInfo.totalPages > 1 && (
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
        )}

        {error && <div>Error: {error.message}</div>}
      </div>
    </section>
  );
};

type FloatingFilterButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
};

const FloatingFilterButton = memo(({ targetRef }: FloatingFilterButtonProps) => {
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
        "fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-100 bg-[#0f5c85] hover:bg-[#0f5c85]/90 backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-switzer font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer ring ring-neutral-300 ring-offset-2 md:ring-offset-4 text-sm sm:text-base",
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
