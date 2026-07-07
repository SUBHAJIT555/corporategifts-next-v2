"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
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
import { getProductUrl } from "@/lib/getProductsUrl";
import { useShopStore } from "@/stores/useShopStore";
import { HiMinus, HiPlus } from "@/components/icons";

type ProductGridProps = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
};

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 999,
}: QuantitySelectorProps) => {
  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = Number(e.target.value);

    if (!value) {
      onQuantityChange(min);
      return;
    }

    onQuantityChange(Math.min(max, Math.max(min, value)));
  };

  return (
    <div className="flex items-center rounded-lg bg-white overflow-hidden border border-neutral-200 select-none ring-1 ring-neutral-200/60">
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className={cn(
          "w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors",
          quantity <= min && "opacity-50 cursor-not-allowed",
        )}
      >
        <HiMinus className="w-4 h-4 text-textcolor" />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="flex-1 text-center font-switzer text-textcolor border-x border-neutral-200 no-spinner outline-none focus:outline-none focus:ring-0"
      />

      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className={cn(
          "w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors",
          quantity >= max && "opacity-50 cursor-not-allowed",
        )}
      >
        <HiPlus className="w-4 h-4 text-textcolor" />
      </button>
    </div>
  );
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
    <div
      style={{ animationDelay: `${index * 0.05}s` }}
      className="animate-product-list-in bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-neutral-300/80 transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 ring-1 ring-neutral-200/50"
    >
      <NoPrefetchLink
        href={getProductUrl(product)}
        className="relative w-full sm:w-32 md:w-40 h-auto sm:h-32 md:h-40 overflow-hidden bg-neutral-100 rounded-lg shrink-0 cursor-pointer block"
      >
        <Image
          width={500}
          height={500}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </NoPrefetchLink>

      <div className="flex flex-col flex-1 justify-center">
        <NoPrefetchLink
          href={getProductUrl(product)}
          className="text-base font-switzer font-semibold text-textcolor mb-2 line-clamp-2 cursor-pointer hover:text-highlight transition-colors"
        >
          {product.name}
        </NoPrefetchLink>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shrink-0">
        <div className="w-full sm:w-auto">
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
          />
        </div>

        <button
          type="button"
          onClick={handleAddToQuote}
          disabled={isInQuote}
          className={cn(
            "w-full sm:w-auto px-6 py-2.5 sm:py-3 font-switzer font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base whitespace-nowrap",
            isInQuote
              ? "bg-neutral-200 text-textcolor/80 cursor-not-allowed shadow-none"
              : "bg-highlight hover:bg-highlight/90 text-white shadow-sm",
          )}
        >
          {isInQuote ? "Added To your Cart" : "Add to Quote"}
        </button>
      </div>
    </div>
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
      <div className="min-h-screen flex items-center justify-center bg-bg px-4">
        <p className="text-lg font-switzer text-textcolor">
          <span className="text-secondary">Error:</span> {error.message}
        </p>
      </div>
    );
  }

  if (products.length === 0 && isLoading) {
    return (
      <div className="min-h-[400px] rounded-xl flex items-center justify-center">
        <Loading size="md" message="Loading products..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50">
        <p className="text-lg font-switzer text-textcolor">No products found</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center min-h-[400px] rounded-xl">
          <Loading size="md" message="Loading products..." />
        </div>
      )}

      {viewMode === "grid" ? (
        <div
          className={cn(
            "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8",
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
            />
          ))}
        </div>
      ) : (
        <div className={cn("space-y-4 mb-8", isLoading && "opacity-50")}>
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
