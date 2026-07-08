"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Sparkles } from "lucide-react";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { candyWhiteButtonClasses } from "@/components/ui/candy-button";
import { cn } from "@/lib/utilts";

interface CategoryIntroProps {
  imageUrl: string;
  imageAlt: string;
  content: React.ReactNode;
  preview?: React.ReactNode;
  heading?: string;
}

const CategoryIntro = ({
  imageUrl,
  imageAlt,
  content,
  preview,
  heading = "About Apparel & Accessories",
}: CategoryIntroProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section aria-labelledby="category-intro" className="w-full bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-4">
        <Reveal animationNum={0}>
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft">
            <div className="border-b border-hairline bg-canvas px-5 py-4 sm:px-6 sm:py-5">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body">
                <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
                About this category
              </span>
            </div>

            <div className="grid lg:grid-cols-2">
              <div className="group relative min-h-[240px] sm:min-h-[300px] lg:min-h-[380px]">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                  quality={100}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
              </div>

              <div className="relative flex flex-col justify-center border-t border-hairline bg-canvas p-6 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  aria-hidden
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, var(--primary) 3px, var(--primary) 4px)",
                  }}
                />

                <div className="relative z-10">
                  <h2
                    id="category-intro"
                    className="text-display-sm leading-tight text-ink sm:text-display-md"
                  >
                    {heading}
                  </h2>

                  <div className="my-5 border-t border-dashed border-hairline sm:my-6" />

                  <div className="hidden lg:block">
                    <p className="max-w-none text-body-md text-body sm:text-[17px] sm:leading-8">
                      {content}
                    </p>
                  </div>

                  <div className="lg:hidden">
                    <p className="text-body-md text-body sm:text-[17px] sm:leading-8">
                      {isExpanded ? content : preview}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsExpanded((prev) => !prev)}
                      aria-expanded={isExpanded}
                      className={cn(
                        candyWhiteButtonClasses(
                          "mt-5 inline-flex items-center gap-2",
                        ),
                      )}
                    >
                      {isExpanded ? "Read less" : "Read more"}
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform",
                          isExpanded && "rotate-180",
                        )}
                      />
                    </button>
                    <p className="sr-only">{content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
};

export default CategoryIntro;
