import { FaCheckCircle, LuArrowLeft } from "@/components/icons";
import { LuHouse } from "@/components/icons";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";

export default function ThankYou() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
          backgroundSize: "5px 5px",
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
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
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
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 py-16">
        <div className="w-full max-w-2xl rounded-2xl border border-neutral-300 bg-white ring ring-neutral-200 ring-offset-2 md:ring-offset-4 p-8 sm:p-10 md:p-12 text-center opacity-0 translate-y-8 animate-fade-up3">
          <div
            className="flex justify-center mb-6 opacity-0 scale-75 animate-scale-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#0F5C85]/15 rounded-full animate-ping" />
              <FaCheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-[#0F5C85] relative z-10" />
            </div>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-sentient font-semibold text-textcolor mb-4 opacity-0 translate-y-6 animate-fade-up3"
            style={{ animationDelay: "300ms" }}
          >
            Thank You!
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl font-switzer text-textcolor/90 mb-8 leading-relaxed opacity-0 translate-y-6 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            Your quote request has been submitted successfully. Our team will
            review your request and get back to you shortly.
          </p>

          <div
            className="bg-neutral-100 border border-neutral-300 ring ring-neutral-200 ring-offset-2 rounded-xl p-6 mb-8 opacity-0 translate-y-6 animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            <p className="text-base font-switzer text-textcolor/85">
              <strong className="font-sentient font-semibold">What&apos;s Next?</strong>
              <br />
              <br />
              We&apos;ll send you a confirmation email with your quote details. Our
              sales team will contact you within 24-48 hours to discuss your
              requirements and provide you with a detailed quote.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 translate-y-6 animate-fade-up"
            style={{ animationDelay: "600ms" }}
          >
            <NoPrefetchLink
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-neutral-800 to-neutral-500 hover:opacity-90 text-white font-sentient font-medium py-3 px-8 rounded-xl border border-neutral-200 ring ring-neutral-300 ring-offset-2 transition-opacity"
            >
              <LuArrowLeft className="w-5 h-5" />
              Continue Shopping
            </NoPrefetchLink>
            <NoPrefetchLink
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-textcolor font-sentient font-medium py-3 px-8 rounded-xl ring ring-neutral-200 ring-offset-2 transition-colors"
            >
              <LuHouse className="w-5 h-5" />
              Back to Home
            </NoPrefetchLink>
          </div>
        </div>
      </div>
    </main>
  );
}
