"use client";

import { SearchX } from "lucide-react";
import { LuHouse, LuShoppingCart } from "@/components/icons";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import {
  candyDarkButtonClasses,
  candyWhiteButtonClasses,
} from "@/components/ui/candy-button";
import SectionDivider from "@/components/ui/SectionDivider";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { MainLayout } from "@/components/layouts/MainLayout";
import { QuoteProvider } from "@/contexts/QuoteContext";
import { cn } from "@/lib/utilts";

export default function NotFound() {
  return (
    <QuoteProvider>
      <MainLayout>
        <div className="w-full bg-canvas">
          <section className="w-full bg-canvas">
            <RevealSection className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center border-x border-hairline px-5 py-20 text-center sm:px-6 sm:py-24 md:py-28">
              <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.14,
                    pointerEvents: "none",
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, var(--primary) 3px, var(--primary) 4px)",
                    maskImage:
                      "linear-gradient(to bottom, #000 0%, transparent 75%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 0%, transparent 75%)",
                  }}
                />
              </div>

              <div className="relative z-10 mx-auto w-full max-w-2xl">
                <Reveal animationNum={0} className="flex justify-center">
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-2.5 py-1 text-[11px] font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] sm:px-3 sm:text-caption dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
                    <SearchX className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5" />
                    Error 404
                  </span>
                </Reveal>

                <Reveal animationNum={1} className="mt-8 flex justify-center sm:mt-10">
                  <div className="relative flex size-20 items-center justify-center rounded-full border border-hairline bg-surface-soft sm:size-24">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand-accent/10" />
                    <SearchX className="relative z-10 size-10 text-brand-accent sm:size-12" />
                  </div>
                </Reveal>

                <Reveal
                  as="h1"
                  animationNum={2}
                  className="mt-6 text-display-lg text-ink sm:mt-8 md:text-display-xl"
                >
                  Page <span className="text-brand-accent">Not Found</span>
                </Reveal>

                <Reveal
                  as="p"
                  animationNum={3}
                  className="mx-auto mt-4 max-w-xl text-body-md text-muted sm:mt-6 sm:text-[17px] sm:leading-7"
                >
                  The page you are looking for does not exist, may have been
                  moved, or the link might be outdated.
                </Reveal>

                <Reveal animationNum={4} className="mx-auto mt-8 max-w-lg sm:mt-10">
                  <div className="rounded-xl border border-dashed border-hairline bg-surface-card px-5 py-5 text-left sm:px-6 sm:py-6">
                    <p className="text-sm leading-relaxed text-body sm:text-base sm:leading-7">
                      <strong className="font-semibold text-ink">
                        What you can do
                      </strong>
                      <br />
                      <br />
                      Double-check the URL for typos, browse our corporate gift
                      catalog, or head back to the homepage to find what you need.
                    </p>
                  </div>
                </Reveal>

                <Reveal
                  animationNum={5}
                  className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
                >
                  <NoPrefetchLink
                    href="/shop"
                    className={cn(
                      candyWhiteButtonClasses("w-full sm:w-auto"),
                      "inline-flex items-center justify-center gap-2",
                    )}
                  >
                    <LuShoppingCart className="size-4 shrink-0" />
                    Browse shop
                  </NoPrefetchLink>
                  <NoPrefetchLink
                    href="/"
                    className={cn(
                      candyDarkButtonClasses("w-full sm:w-auto"),
                      "inline-flex items-center justify-center gap-2",
                    )}
                  >
                    <LuHouse className="size-4 shrink-0" />
                    Back to Home
                  </NoPrefetchLink>
                </Reveal>
              </div>
            </RevealSection>
          </section>
          <SectionDivider />
        </div>
      </MainLayout>
    </QuoteProvider>
  );
}
