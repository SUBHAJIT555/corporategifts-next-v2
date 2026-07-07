import { ProductsApi } from "@/lib/api/endpoints";
import TopSaverClient from "./TopSaverSClient";
import type { Product } from "@/lib/api/types";


export const dynamic = "force-static"; // ensures static generation

export default async function TopSaver() {
    let products: Product[] = [];

    try {
        const randomProducts = await ProductsApi.random();
        products = Array.isArray(randomProducts) ? randomProducts : [];
    } catch (error) {
        console.error("Failed to load top saver products for homepage:", error);
    }

    return <TopSaverClient products={products} />;
}