import QuoteClient from "@/components/quote/QuoteClient";

export const dynamic = "force-static";

export default function Quote() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <QuoteClient />
    </main>
  );
}
