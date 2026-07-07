"use client";

import { useCallback, useMemo, useState } from "react";
import { ProductsApi } from "@/lib/api/endpoints";
import type { PaginatedProductsResponse, ProductCategory } from "@/lib/api/types";
import ProductGrid from "@/components/common/ProductGrid";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import useInView from "@/hooks/useInView";

const PER_PAGE = 12;

function BestSellingHelpCta() {
    const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

    return (
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1920px] mx-auto pb-8 sm:pb-10 md:pb-12 lg:pb-16">
            <div
                ref={ref}
                className={`relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-lg ring ring-neutral-300 ring-offset-2 md:ring-offset-4 transition-all duration-700 ease-out  ${
                    inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                }`}
            >
                <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                        backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
                        backgroundSize: "5px 5px",
                    }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col items-center gap-4 px-5 py-8 text-center sm:gap-5 sm:px-8 sm:py-10 md:gap-6 md:px-10 md:py-12">
                    <p className="inline-flex w-fit items-center rounded-xl border border-neutral-300 bg-neutral-100 px-3 py-1 font-switzer text-xs font-semibold uppercase tracking-[0.14em] text-[#0F5C85] ring ring-neutral-300 ring-offset-2">
                        Gift guidance
                    </p>
                    <h3 className="font-sentient text-xl font-bold text-textcolor sm:text-2xl md:text-3xl leading-tight">
                        Not sure what to choose?
                    </h3>
                    <p className="max-w-2xl font-switzer text-sm font-medium leading-relaxed text-textcolor/90 sm:text-base md:text-lg">
                        Our team can recommend smart corporate gifts, luxury gift sets,
                        affordable promotional gifts, or customized corporate gifts based on
                        your budget, audience, quantity, and delivery timeline.
                    </p>
                    <NoPrefetchLink href="/contact-us" className="mt-1 sm:mt-2">
                        <button
                            type="button"
                            className="cursor-pointer rounded-xl bg-[#0f5c85] px-8 py-3 font-switzer text-sm font-medium tracking-wider text-white shadow-lg transition-colors hover:bg-[#0f5c85]/90 sm:px-10 sm:py-3.5 sm:text-base ring ring-neutral-300 ring-offset-2 md:ring-offset-4"
                        >
                            Contact Us Now
                        </button>
                    </NoPrefetchLink>
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

export default function BestSellingClient({ initial, categories, byCategory }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [overrideProductData, setOverrideProductData] = useState<PaginatedProductsResponse | null>(null);
    const [isLoadingPage, setIsLoadingPage] = useState(false);

    const setCategory = useCallback((slug: string | null) => {
        setSelectedCategory(slug);
        setOverrideProductData(null);
    }, []);

    const productData = useMemo(() => {
        if (overrideProductData) return overrideProductData;
        if (!selectedCategory) return initial;
        return byCategory[selectedCategory] ?? { products: [], total: 0, total_pages: 0, page: 1, per_page: PER_PAGE };
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
        <>
            <ProductGrid
                productData={productData}
                categories={categories}
                isLoading={isLoadingPage}
                error={null}
                selectedCategory={selectedCategory}
                setSelectedCategory={setCategory}
                onPageChange={onPageChange}
                title="Best-Selling Customized Corporate Gifts in Dubai."
                subtitle="Browse our most requested customized corporate gifts in Dubai, including branded pens, notebooks, smart gadgets, drinkware, bags, gift sets, and promotional giveaways. These products are suitable for client gifting, employee welcome kits, trade shows, conferences, festive campaigns, and corporate events."
                productType="custom"
                id="best-selling"
            />
            <BestSellingHelpCta />
        </>
    );
}