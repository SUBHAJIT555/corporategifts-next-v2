"use client";

import { FaCheckCircle, LuArrowLeft, LuHouse } from "@/components/icons";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

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
        <RevealSection className="w-full max-w-2xl rounded-2xl border border-neutral-300 bg-white ring ring-neutral-200 ring-offset-2 md:ring-offset-4 p-8 sm:p-10 md:p-12 text-center">
          <Reveal animationNum={0}>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#0F5C85]/15 rounded-full animate-ping" />
                <FaCheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-[#0F5C85] relative z-10" />
              </div>
            </div>
          </Reveal>

          <Reveal as="h1" animationNum={1} className="text-3xl sm:text-4xl md:text-5xl font-sentient font-semibold text-textcolor mb-4">
            Thank You!
          </Reveal>

          <Reveal as="p" animationNum={2} className="text-base sm:text-lg md:text-xl font-switzer text-textcolor/90 mb-8 leading-relaxed">
            Your quote request has been submitted successfully. Our team will
            review your request and get back to you shortly.
          </Reveal>

          <Reveal animationNum={3} className="bg-neutral-100 border border-neutral-300 ring ring-neutral-200 ring-offset-2 rounded-xl p-6 mb-8">
            <p className="text-base font-switzer text-textcolor/85">
              <strong className="font-sentient font-semibold">What&apos;s Next?</strong>
              <br />
              <br />
              We&apos;ll send you a confirmation email with your quote details. Our
              sales team will contact you within 24-48 hours to discuss your
              requirements and provide you with a detailed quote.
            </p>
          </Reveal>

          <Reveal animationNum={4} className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </Reveal>
        </RevealSection>
      </div>
    </main>
  );
}
