import CartClient from "@/components/cart/CartClient";

export const dynamic = "force-static";

export default function Cart() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <CartClient />
    </main>
  );
}
