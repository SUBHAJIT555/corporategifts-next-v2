"use client"
import { memo, useCallback, useEffect, useState } from "react";
import { BsCart4 } from "@/components/icons";
import { Product } from "@/lib/api/types";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { getProductUrl } from "@/lib/getProductsUrl";
import Image from "next/image";
import { QuantitySelector } from "@/lib/quantitySelector";
import { cn } from "@/lib/utilts";

// Product Card Component (Grid View)
export interface ProductCardProps {
  product: Product;
  index: number;
  onAddToQuote: (
    product: Product,
    quantity: number,
    e?: React.MouseEvent
  ) => void;
  isInQuote: boolean;
  currentQuantity: number;
}

export const ProductCard = memo(function ProductCard({
  product,
  index,
  onAddToQuote,
  isInQuote,
  currentQuantity,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(currentQuantity);

  useEffect(() => {
    setQuantity(currentQuantity);
  }, [currentQuantity]);

  const handleAddToQuote = useCallback((e: React.MouseEvent) => {
    onAddToQuote(product, quantity, e);
  }, [onAddToQuote, product, quantity]);

  return (
    <div
      className={cn(
        "bg-white rounded-xl md:rounded-2xl overflow-hidden border border-neutral-300 flex flex-col transform transition-all duration-500 ease-out",
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Product Image */}
      <NoPrefetchLink
        href={getProductUrl(product)}
        className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden bg-white cursor-pointer block border-b border-neutral-300"
      >
        <Image
          width={500}
          height={500}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </NoPrefetchLink>

      {/* Product Content */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col grow">
        {/* Product Title */}
        <NoPrefetchLink
          href={getProductUrl(product)}
          className="text-sm font-switzer font-semibold text-textcolor mb-4 sm:mb-5 grow line-clamp-1 cursor-pointer"
        >
          {product.name}
        </NoPrefetchLink>

        {/* Quantity Selector and Add to Quote Button */}
        <div className="space-y-3">
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
          />
          <button
            type="button"
            onClick={handleAddToQuote}
            disabled={isInQuote}
            className={cn(
              "group relative w-full font-switzer font-normal py-2.5 sm:py-3 px-4 rounded-xl transition-colors duration-200 text-sm sm:text-base overflow-hidden",
              isInQuote
                ? "bg-neutral-200 text-textcolor/80 cursor-not-allowed"
                : "bg-[#0f5c85] hover:bg-[#0f5c85]/70 text-white",
            )}
          >
            <span
              className={cn(
                "inline-block transition-all duration-300 ease-in-out",
                !isInQuote &&
                "group-hover:-translate-y-full group-hover:opacity-0",
              )}
            >
              {isInQuote ? "Added To Quote" : "Add to Quote"}
            </span>
            {!isInQuote && (
              <BsCart4 className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-100" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}, (prev, next) =>
  prev.product.id === next.product.id &&
  prev.product.name === next.product.name &&
  prev.product.image === next.product.image &&
  prev.index === next.index &&
  prev.isInQuote === next.isInQuote &&
  prev.currentQuantity === next.currentQuantity &&
  prev.onAddToQuote === next.onAddToQuote
);

ProductCard.displayName = "ProductCard";