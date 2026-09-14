export const PRODUCT_GRID_ID = "product-grid";

/**
 * Scroll to the product results section. Prefer an element with
 * `scroll-mt-*` (navbar offset) so the heading isn't hidden under the sticky nav.
 */
export function scrollToProductSection(
  target: string | HTMLElement | null = PRODUCT_GRID_ID,
  behavior: ScrollBehavior = "smooth",
) {
  const el =
    typeof target === "string"
      ? document.getElementById(target)
      : target;

  if (!el) return;

  el.scrollIntoView({ behavior, block: "start" });
}
