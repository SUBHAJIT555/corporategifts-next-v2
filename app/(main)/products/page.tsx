import ProductsHero from "@/components/pages/Product/ProductsHero";
import ProductCategory from "@/components/pages/Product/ProductCatagory";
import ProductsFAQ from "@/components/pages/Product/ProductsFAQ";
import ProductsCallToAction from "@/components/pages/Product/ProductsCallToAction";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Product() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <ProductsHero />
      <SectionDivider />
      <ProductCategory />
      <SectionDivider />
      <ProductsFAQ />
      <SectionDivider />
      <ProductsCallToAction />
      <SectionDivider />
    </main>
  );
}
