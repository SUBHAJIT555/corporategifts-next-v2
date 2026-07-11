"use client";

import { LuShoppingCart } from "@/components/icons";
import { IoLogoWhatsapp } from "@/components/icons";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import {
  candyDarkButtonClasses,
  candyWhiteButtonClasses,
} from "@/components/ui/candy-button";
import { useQuote } from "@/contexts/QuoteContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utilts";

const stickyButtonClasses = "min-h-12 flex-1 gap-2 px-4! text-sm sm:text-base";

export default function MobileStickyActions() {
  const { getTotalItems } = useQuote();
  const totalItems = getTotalItems();

  return (
    <div
      className="mobile-sticky-actions fixed inset-x-0 bottom-0 z-100 border-t border-hairline bg-canvas/95 backdrop-blur-md md:hidden"
      role="toolbar"
      aria-label="Quick enquiry actions"
    >
      <div className="mx-auto flex max-w-lg gap-3 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <NoPrefetchLink
          href="/cart"
          className={cn(candyDarkButtonClasses(stickyButtonClasses), "relative")}
          aria-label={
            totalItems > 0
              ? `View quote cart, ${totalItems} items`
              : "View quote cart"
          }
        >
          <LuShoppingCart className="size-5 shrink-0" aria-hidden />
          <span>Quote Cart</span>
          {totalItems > 0 ? (
            <span className="absolute -top-1.5 right-3 flex size-5 items-center justify-center rounded-full border-2 border-canvas bg-brand-accent text-[10px] font-semibold tabular-nums text-white">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          ) : null}
        </NoPrefetchLink>

        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={candyWhiteButtonClasses(stickyButtonClasses)}
          aria-label="Contact us on WhatsApp"
        >
          <IoLogoWhatsapp
            className="size-5 shrink-0 text-[#25D366]"
            aria-hidden
          />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
