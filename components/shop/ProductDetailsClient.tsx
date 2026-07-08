"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { Package } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { useRouter } from "next/navigation";
import ImageGallery from "react-image-gallery";

import { BsCart4, LuArrowLeft } from "@/components/icons";
import { useQuote } from "@/contexts/QuoteContext";
import Loading from "@/components/ui/Loading";
import { cn } from "@/lib/utilts";
import type { ProductDetails } from "@/lib/api/types";
import { QuantitySelector } from "@/lib/quantitySelector";
import {
  candyAccentButtonClasses,
  candyDarkButtonClasses,
  candyWhiteButtonClasses,
} from "@/components/ui/candy-button";
import SectionDivider from "@/components/ui/SectionDivider";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

type ProductDetailsClientProps = {
  product: ProductDetails | null;
  category?: string;
  isLoading?: boolean;
  errorMessage?: string | null;
};

const GALLERY_FULLSCREEN_HTML_CLASS = "image-gallery-fullscreen";

function setGalleryFullscreenChrome(active: boolean) {
  const root = document.documentElement;
  if (active) {
    root.classList.add(GALLERY_FULLSCREEN_HTML_CLASS);
    document.body.setAttribute("data-lenis-prevent", "");
  } else {
    root.classList.remove(GALLERY_FULLSCREEN_HTML_CLASS);
    document.body.removeAttribute("data-lenis-prevent");
  }
}

const ProductDetailsClient = ({
  product,
  category,
  isLoading,
  errorMessage,
}: ProductDetailsClientProps) => {
  const router = useRouter();
  const { addToQuote, isInQuote } = useQuote();
  const [quantity, setQuantity] = useState(1);

  const galleryImages = useMemo(() => {
    if (!product) return [];

    const allImages = [product.main_image, ...(product.gallery ?? [])].filter(
      Boolean,
    );

    return allImages.map((url, index) => ({
      original: url,
      thumbnail: url,
      originalAlt: `${product.name} - Image ${index + 1}`,
      thumbnailAlt: `${product.name} - Thumbnail ${index + 1}`,
    }));
  }, [product]);

  const handleAddToQuote = () => {
    if (!product) return;

    const productForQuote = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      permalink: product.permalink,
      short_desc: product.short_desc,
      image: product.main_image,
      categories: product.categories,
      category_slug: product.category_slug,
    };

    addToQuote(productForQuote, quantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleGalleryScreenChange = useCallback((fullscreen: boolean) => {
    setGalleryFullscreenChrome(fullscreen);
  }, []);

  useEffect(() => {
    return () => setGalleryFullscreenChrome(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas pt-24">
        <Loading fullScreen message="Loading..." size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full bg-canvas">
        <section className="w-full bg-canvas">
          <RevealSection className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center border-x border-hairline px-5 py-20 text-center sm:px-6 sm:py-24">
            <div className="relative z-10 mx-auto w-full max-w-2xl">
              <Reveal as="h2" animationNum={0} className="text-display-md text-ink">
                Product Not Found
              </Reveal>
              <Reveal
                as="p"
                animationNum={1}
                className="mx-auto mt-4 max-w-md text-body-md text-muted"
              >
                {errorMessage || "Product not found"}
              </Reveal>
              <Reveal animationNum={2} className="mt-8 flex justify-center">
                <NoPrefetchLink
                  href="/shop"
                  className={cn(
                    candyDarkButtonClasses("inline-flex items-center gap-2"),
                  )}
                >
                  <LuArrowLeft className="size-4 shrink-0" />
                  Back to Shop
                </NoPrefetchLink>
              </Reveal>
            </div>
          </RevealSection>
        </section>
        <SectionDivider />
      </div>
    );
  }

  return (
    <div className="w-full bg-canvas">
      <section className="w-full bg-canvas">
        <RevealSection className="relative mx-auto max-w-7xl overflow-hidden border-x border-hairline px-5 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-10 md:pt-28 md:pb-12 lg:pt-32">
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.14,
                pointerEvents: "none",
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, var(--primary) 3px, var(--primary) 4px)",
                maskImage: "linear-gradient(to bottom, #000 0%, transparent 75%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 0%, transparent 75%)",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <Reveal animationNum={0} className="flex justify-center sm:justify-start">
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-2.5 py-1 text-[11px] font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] sm:px-3 sm:text-caption dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
                <Package className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
                Product details
              </span>
            </Reveal>

            <Reveal
              as="h1"
              animationNum={1}
              className="mt-4 text-center text-display-lg text-ink sm:mt-5 sm:text-left md:text-display-xl"
            >
              {product.name}
            </Reveal>
          </div>
        </RevealSection>
      </section>

      <SectionDivider />

      <section className="w-full bg-canvas">
        <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-6 sm:px-6 sm:py-8 lg:py-10">
          <Reveal animationNum={0}>
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                <NoPrefetchLink
                  href="/"
                  className="transition-colors hover:text-ink"
                >
                  Home
                </NoPrefetchLink>
                <span aria-hidden>/</span>
                <NoPrefetchLink
                  href="/shop"
                  className="transition-colors hover:text-ink"
                >
                  Shop
                </NoPrefetchLink>
                {category && (
                  <>
                    <span aria-hidden>/</span>
                    <NoPrefetchLink
                      href={`/product-category/${category}`}
                      className="capitalize transition-colors hover:text-ink"
                    >
                      {category.replace(/-/g, " ")}
                    </NoPrefetchLink>
                  </>
                )}
                <span aria-hidden>/</span>
                <span className="text-brand-accent">{product.name}</span>
              </div>
            </nav>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            <div>
              <div className="rounded-2xl border border-hairline bg-surface-soft p-4 sm:p-5">
                <div className="custom-image-gallery">
                  <ImageGallery
                    items={galleryImages}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    showBullets={false}
                    showThumbnails={galleryImages.length > 1}
                    thumbnailPosition="bottom"
                    slideInterval={0}
                    slideDuration={450}
                    lazyLoad={true}
                    useBrowserFullscreen={false}
                    onScreenChange={handleGalleryScreenChange}
                  />
                </div>
              </div>
            </div>

            <Reveal animationNum={2} className="space-y-6">
              {product.categories.length > 0 && (
                <div className="w-fit rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1.5">
                  <span className="text-sm text-muted">Category: </span>
                  <span className="text-sm font-medium text-ink">
                    {product.categories.join(", ")}
                  </span>
                </div>
              )}

              {product.description && (
                <div className="rounded-xl border border-hairline bg-surface-soft p-5 sm:p-6">
                  <h3 className="mb-3 text-lg font-semibold text-ink sm:text-xl">
                    Description
                  </h3>
                  <div
                    className="prose prose-sm max-w-none text-body-md text-body sm:prose-base [&_a]:text-brand-accent [&_a]:underline [&_li]:text-body [&_p]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <label className="text-base font-semibold text-ink">
                  Quantity:
                </label>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={handleQuantityChange}
                  variant="cal"
                  className="max-w-40"
                />
              </div>

              <button
                type="button"
                onClick={handleAddToQuote}
                disabled={isInQuote(product.id)}
                className={cn(
                  "group relative w-full overflow-hidden text-lg",
                  isInQuote(product.id)
                    ? "cursor-not-allowed rounded-xl bg-surface-strong px-6 py-4 font-medium text-muted opacity-60"
                    : candyAccentButtonClasses("w-full py-4 text-base sm:text-lg"),
                )}
              >
                <span
                  className={cn(
                    "inline-block transition-all duration-300 ease-in-out",
                    !isInQuote(product.id) &&
                      "group-hover:-translate-y-full group-hover:opacity-0",
                  )}
                >
                  {isInQuote(product.id) ? "Added To your Cart" : "Add to Quote"}
                </span>
                {!isInQuote(product.id) && (
                  <BsCart4 className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-100" />
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className={cn(
                  candyWhiteButtonClasses("w-full sm:w-auto"),
                  "inline-flex items-center justify-center gap-2",
                )}
              >
                <LuArrowLeft className="size-4 shrink-0" />
                Back to Products
              </button>
            </Reveal>
          </div>
        </RevealSection>
      </section>

      <SectionDivider />
    </div>
  );
};

export default ProductDetailsClient;
