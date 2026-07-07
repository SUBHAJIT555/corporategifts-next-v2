import ShopClient from "@/components/shop/ShopClient";

export const dynamic = "force-static";

export default function Shop() {
  return <ShopClient initialPage={1} />;
}
