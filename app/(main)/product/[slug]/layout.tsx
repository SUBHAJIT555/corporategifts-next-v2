import type { Metadata } from "next";
import type { ProductDetails } from "@/lib/api/types";
import { getProductBySlugForStaticBuild } from "@/lib/api/woocommerce-static";
import { slugForApi } from "@/lib/exportSlug";
import { getProductCanonicalUrl } from "@/lib/getProductsUrl";

const cleanMetaDescription = (html: string) => {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const resolveValue = (
  primary: string | undefined,
  fallback: string | undefined,
  defaultValue: string,
) => {
  return primary || fallback || defaultValue;
};

async function resolveProduct(slug: string): Promise<ProductDetails | null> {
  return getProductBySlugForStaticBuild(slugForApi(slug));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await resolveProduct(slug);

  if (!product) {
    return {
      title: "Product Details | Baharnani",
      description: "Explore premium corporate gifts in Dubai by Baharnani.",
    };
  }

  const title = product.seo.title
    ? product.seo.title
    : `${product.name} | Baharnani Gifts`;

  const description = resolveValue(
    product.seo.description,
    cleanMetaDescription(product.short_desc),
    product.short_desc,
  );

  const ogTitle = resolveValue(
    product.seo.og_title,
    product.seo.title,
    `${product.name} | Baharnani Gifts`,
  );

  const ogDescription = resolveValue(
    product.seo.og_desc,
    product.seo.description,
    cleanMetaDescription(product.short_desc),
  );

  const canonical = getProductCanonicalUrl(product);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      type: "website",
      images: product.seo.image ? [product.seo.image] : [product.main_image],
    },
  };
}

export default function ProductSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
