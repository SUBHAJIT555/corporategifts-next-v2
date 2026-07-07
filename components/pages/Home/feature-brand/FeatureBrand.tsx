// src/components/home/FeatureBrand.tsx
import FeatureBrandClient from "./FeatureBrandClient";
import { ProductsApi } from "@/lib/api/endpoints";
import type { Product } from "@/lib/api/types";

export default async function FeatureBrand() {
    let brands: Product[] = [];

    try {
        const brandsData = await ProductsApi.all({
            query: { featured: 1, per_page: 48, page: 1 },
        });
        brands = Array.isArray(brandsData?.products) ? brandsData.products : [];
    } catch (error) {
        console.error("Failed to load featured brand products:", error);
    }

    return <FeatureBrandClient brands={brands} />;
}