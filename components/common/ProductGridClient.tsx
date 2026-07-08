"use client";

import { usePathname, useRouter } from "next/navigation";
import ProductGrid from "@/components/common/ProductGrid";
import type {
  PaginatedProductsResponse,
  ProductCategory,
} from "@/lib/api/types";
import { useEffect } from "react";

interface ProductGridClientProps {
  productData: PaginatedProductsResponse;
  categories: ProductCategory[];
  selectedCategory: string;
  id?: string;
  title: string;
  categorySlug: string;
  variant?: "default" | "home" | "category";
}

const ProductGridClient = ({
  productData,
  categories,
  selectedCategory,
  id,
  title,
  categorySlug,
  variant = "default",
}: ProductGridClientProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const targetId = id ?? "apparel-accessories";

  const handlePageChange = (newPage: number) => {
    const basePath = `/product-category/${categorySlug}`;
    const href = newPage === 1 ? basePath : `${basePath}/page/${newPage}`;

    // Prevent default top-of-page scroll; we'll scroll to the grid section instead.
    router.push(href, { scroll: false });
  };

  // Scroll AFTER route changes and component mounts
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [pathname, targetId]);


  return (
    <ProductGrid
      title={title}
      productType="custom"
      productData={productData}
      onPageChange={handlePageChange}
      categories={categories}
      isLoading={false}
      error={null}
      selectedCategory={selectedCategory}
      id={id}
      variant={variant}
    />
  );
};

export default ProductGridClient;

// if (typeof window !== "undefined") {
//   const targetId = id ?? "apparel-accessories";

//   // Wait a tick so the new page content is mounted before scrolling.
//   requestAnimationFrame(() => {
//     const el = document.getElementById(targetId);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   });
// }