"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { useRouter } from "next/navigation";
import ImageGallery from "react-image-gallery";

// import { HiMinus, HiPlus } from "react-icons/hi";
import { BsCart4, LuArrowLeft, HiMinus, HiPlus } from "@/components/icons";
import { useQuote } from "@/contexts/QuoteContext";
import Loading from "@/components/ui/Loading";
import { cn } from "@/lib/utilts";
import type { ProductDetails } from "@/lib/api/types";

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
      <div className="min-h-screen flex items-center justify-center bg-bg pt-24">
        <Loading fullScreen message="Loading..." size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-tanker text-textcolor mb-4">
            Product Not Found
          </h2>
          <p className="text-textcolor mb-6">
            {errorMessage || "Product not found"}
          </p>
          <NoPrefetchLink
            href="/shop"
            className="inline-flex items-center gap-2 bg-textcolor hover:bg-textcolor/70 text-white font-tanker font-medium py-3 px-6 rounded-md transition-colors"
          >
            <LuArrowLeft className="w-5 h-5" />
            Back to Shop
          </NoPrefetchLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section with Dashed Bottom Fade Grid */}
      <section className="relative w-full overflow-hidden bg-white">
        {/* Dashed Bottom Fade Grid covers entire section, including top */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
            backgroundSize: "1px 1px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
         repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
      `,
            WebkitMaskImage: `
  repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        {/* Hero Content with top padding */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 border-b border-neutral-300 border-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sentient font-bold text-textcolor leading-tight">
            {product.name}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm font-switzer text-textcolor/70">
            <NoPrefetchLink href="/" className="hover:text-textcolor transition-colors">
              Home
            </NoPrefetchLink>
            <span>/</span>
            <NoPrefetchLink
              href="/shop"
              className="hover:text-textcolor transition-colors"
            >
              Shop
            </NoPrefetchLink>
            {category && (
              <>
                <span>/</span>
                <NoPrefetchLink
                  href={`/product-category/${category}`}
                  className="hover:text-textcolor  transition-colors capitalize"
                >
                  {category.replace(/-/g, " ")}
                </NoPrefetchLink>
              </>
            )}
            <span>/</span>
            <span className="text-[#0f5c85]">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="w-full">
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

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              {product.categories.length > 0 && (
                <div className="mb-6 border border-neutral-300 w-fit px-3 rounded-xl py-0.5 ring ring-offset-2 ring-neutral-200 bg-linear-to-r from-neutral-100 to-white">
                  <span className="text-sm font-switzer text-textcolor/70">
                    Category:{" "}
                  </span>
                  <span className="text-sm font-switzer text-textcolor">
                    {product.categories.join(", ")}
                  </span>
                </div>
              )}
            </div>

            {product.description && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-sentient text-neutral-700 font-semibold mb-3">
                  Description
                </h3>
                <div
                  className="text-base font-switzer text-textcolor leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-base font-sentient  font-semibold">
                Quantity:
              </label>
              <div className="flex items-center rounded-xl bg-white overflow-hidden border border-gray-300">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors",
                    quantity <= 1 && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <HiMinus className="w-4 h-4 text-textcolor" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  min={1}
                  className="w-16 px-2 py-2 text-center font-switzer text-textcolor border-x border-gray-300 no-spinner outline-none focus:outline-none focus:ring-0"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <HiPlus className="w-4 h-4 text-textcolor" />
                </button>
              </div>
            </div>

            {/* Add to Quote Button */}
            <button
              onClick={handleAddToQuote}
              disabled={isInQuote(product.id)}
              className={cn(
                "group relative w-full font-switzer font-medium py-4 px-6 rounded-xl ring ring-offset-2 ring-[#0f5c85] transition-colors duration-200 text-lg overflow-hidden cursor-pointer",
                isInQuote(product.id)
                  ? "bg-gray-400 text-white cursor-not-allowed opacity-60"
                  : "bg-[#0f5c85] hover:bg-[#0f5c85]/70 text-white ",
              )}
            >
              <span
                className={`inline-block transition-all duration-300 ease-in-out ${isInQuote(product.id)
                  ? ""
                  : "group-hover:-translate-y-full group-hover:opacity-0"
                  }`}
              >
                {isInQuote(product.id) ? "Added To your Cart" : "Add to Quote"}
              </span>
              {!isInQuote(product.id) && (
                <BsCart4 className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-100" />
              )}
            </button>

            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#0f5c85] hover:text-[#0f5c85]/70 font-switzer transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >

                <path d="M5 12h6m3 0h1.5m3 0h.5" />
                <path d="M5 12l4 4" />
                <path d="M5 12l4 -4" />
              </svg>
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;

