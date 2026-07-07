import { motion, AnimatePresence } from "framer-motion";
import { LuShoppingCart, LuTrash } from "@/components/icons";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { useQuote } from "../../contexts/QuoteContext";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const FloatingCartButton = () => {
  const { getTotalItems, items, removeFromQuote } = useQuote();
  const totalItems = getTotalItems();
  const [isHovered, setIsHovered] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        setIsHovered(false);
      }
    };

    if (isHovered) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHovered]);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0, x: 100 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="fixed top-20 right-3 sm:right-8 z-220"
          ref={cartRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <NoPrefetchLink
            href="/cart"
            className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0077b6] hover:bg-[#005a8b] text-white shadow-lg hover:shadow-xl transition-all duration-300 ring ring-neutral-300 ring-offset-2 md:ring-offset-4"
            aria-label="View cart"
          >
            <LuShoppingCart className="w-5 h-5 sm:w-8 sm:h-8" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-switzer font-bold rounded-full w-5 h-5 sm:w-7 sm:h-7 sm:text-xs flex items-center justify-center border-2 border-white shadow-md"
              >
                {totalItems > 9 ? "9+" : totalItems}
              </motion.span>
            )}
          </NoPrefetchLink>

          {/* Cart Hover Popup */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-3 w-72 sm:w-80 bg-white border border-neutral-300 rounded-xl shadow-xl z-221"
              >
                {/* Arrow pointer */}
                <div className="absolute -top-2 right-6 w-4 h-4 bg-bg border-l border-t border-textcolor/30 transform rotate-45"></div>

                {items.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-textcolor font-tanker text-base mb-2">
                      No products in the cart.
                    </p>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="max-h-72 sm:max-h-80 overflow-y-auto overscroll-contain space-y-0 mb-4 pr-1 -mr-1 [scrollbar-gutter:stable]">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 p-3 border-b border-neutral-200 last:border-0 relative"
                        >
                          <Image
                            width={1000}
                            height={1000}
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-switzer text-textcolor text-sm font-medium mb-1">
                              {item.name}
                            </p>
                            <p className="font-switzer text-neutral-700 text-xs">
                              (x{item.quantity})
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeFromQuote(item.id);
                            }}
                            className="absolute top-3 right-3 p-1.5 hover:bg-red-500/10 rounded transition-colors"
                            aria-label="Remove item"
                          >
                            <LuTrash className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-textcolor/20">
                      <NoPrefetchLink
                        href="/cart"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#0f5c85]/20 hover:bg-[#0f5c85]/50 text-neutral-700 font-switzer text-sm py-2.5 px-4 rounded-xl transition-colors"
                        onClick={() => setIsHovered(false)}
                      >
                        View cart
                      </NoPrefetchLink>
                      <NoPrefetchLink
                        href="/request-quotation"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#0f5c85] hover:bg-[#0f5c85]/80 text-white font-switzer text-sm font-medium py-2.5 px-4 rounded-xl transition-colors"
                        onClick={() => setIsHovered(false)}
                      >
                        Checkout
                      </NoPrefetchLink>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCartButton;
