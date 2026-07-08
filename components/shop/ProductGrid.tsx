"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { BsCart4 } from "@/components/icons";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import Image from "next/image";
import { useQuote } from "@/contexts/QuoteContext";
import type { Product } from "@/lib/api/types";
import { cn } from "@/lib/utilts";
import Loading from "@/components/ui/Loading";
import {
  ProductCard,
  type ProductCardProps,
} from "@/components/common/ProductCard";
import { candyAccentButtonClasses } from "@/components/ui/candy-button";
import { getProductUrl } from "@/lib/getProductsUrl";
import { QuantitySelector } from "@/lib/quantitySelector";
import { useShopStore } from "@/stores/useShopStore";

type ProductGridProps = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
};

const ProductCardList = ({
  product,
  index,
  onAddToQuote,
  isInQuote,
  currentQuantity,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(currentQuantity);

  useEffect(() => {
    setQuantity(currentQuantity);
  }, [currentQuantity]);

  const handleAddToQuote = (e: React.MouseEvent) => {
    onAddToQuote(product, quantity, e);
  };

  return (
    <article
      style={{ animationDelay: `${index * 0.05}s` }}
      className="animate-product-list-in group flex flex-col overflow-hidden rounded-xl border border-hairline bg-canvas transition-colors duration-300 sm:flex-row"
    >
      <NoPrefetchLink
        href={getProductUrl(product)}
        className="block shrink-0 sm:w-36 md:w-40"
      >
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border-b border-hairline bg-surface-card sm:border-b-0 sm:border-r">
          <Image
            width={500}
            height={500}
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:p-5"
          />
        </div>
      </NoPrefetchLink>

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        <div className="min-w-0 flex-1">
          {product.categories?.[0] ? (
            <p className="mb-2 line-clamp-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              {product.categories[0]}
            </p>
          ) : (
            <span className="mb-2 block h-[15px]" aria-hidden />
          )}

          <NoPrefetchLink
            href={getProductUrl(product)}
            className="block cursor-pointer"
          >
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink transition-colors hover:text-brand-accent sm:text-[15px]">
              {product.name}
            </h3>
          </NoPrefetchLink>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:min-w-[220px]">
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
            variant="cal"
          />

          <button
            type="button"
            onClick={handleAddToQuote}
            disabled={isInQuote}
            className={cn(
              candyAccentButtonClasses(
                "group/btn w-full text-xs sm:text-sm",
              ),
              isInQuote && "opacity-60",
            )}
          >
            <span
              className={cn(
                "inline-block transition-all duration-300 ease-in-out",
                !isInQuote &&
                  "group-hover/btn:-translate-y-full group-hover/btn:opacity-0",
              )}
            >
              {isInQuote ? "Added to Quote" : "Add to Quote"}
            </span>
            {!isInQuote && (
              <BsCart4 className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-1/2 group-hover/btn:opacity-100 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

const ProductGrid = memo(function ProductGrid({
  products,
  isLoading,
  error,
}: ProductGridProps) {
  const viewMode = useShopStore((state) => state.viewMode);
  const { addToQuote, items, updateQuantity } = useQuote();

  const quantityMap = useMemo(() => {
    return new Map(items.map((item) => [item.id, item.quantity]));
  }, [items]);

  const handleAddToQuote = useCallback(
    (product: Product, quantity: number, e?: React.MouseEvent) => {
      e?.stopPropagation();

      if (quantityMap.has(product.id)) {
        updateQuantity(product.id, quantity);
        return;
      }

      addToQuote(product, quantity);
    },
    [addToQuote, quantityMap, updateQuantity],
  );

  if (error && products.length === 0) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-hairline bg-canvas px-4">
        <p className="text-body-md text-body">
          <span className="font-semibold text-ink">Error:</span> {error.message}
        </p>
      </div>
    );
  }

  if (products.length === 0 && isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-hairline bg-canvas">
        <Loading size="md" message="Loading products..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-hairline bg-canvas py-16 text-center">
        <p className="text-body-md text-muted">No products found</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading ? (
        <div className="absolute inset-0 z-10 flex min-h-[320px] items-center justify-center rounded-xl bg-canvas/80">
          <Loading size="md" message="Loading products..." />
        </div>
      ) : null}

      {viewMode === "grid" ? (
        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
            isLoading && "opacity-50",
          )}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToQuote={handleAddToQuote}
              isInQuote={quantityMap.has(product.id)}
              currentQuantity={quantityMap.get(product.id) ?? 1}
              variant="home"
            />
          ))}
        </div>
      ) : (
        <div className={cn("space-y-4", isLoading && "opacity-50")}>
          {products.map((product, index) => (
            <ProductCardList
              key={product.id}
              product={product}
              index={index}
              onAddToQuote={handleAddToQuote}
              isInQuote={quantityMap.has(product.id)}
              currentQuantity={quantityMap.get(product.id) ?? 1}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ProductGrid;
