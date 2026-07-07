"use client";
import { useState } from "react";
import { LuChevronDown } from "../icons";
import Image from "next/image";


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

  // Extract first sentence for mobile preview
  // const introPreview = content.split(/[.!?]/)[0] + (content.match(/[.!?]/) ? "." : "");

  return (
    <section aria-labelledby="category-intro">
      <div className="mx-auto container px-6 py-8 sm:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col items-start gap-4 sm:gap-5">
            <h2
              id="category-intro"
              className="flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold  text-neutral-700"
            >
              
              {heading}
            </h2>
            <div className="hidden w-full max-w-2xl aspect-4/3 lg:aspect-video overflow-hidden rounded-2xl border border-neutral-300 ring ring-neutral-300 ring-offset-3 md:ring-offset-6 shadow-sm sm:block">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
                loading="lazy"
                quality={100}
              />
            </div>
          </div>

          <div className="space-y-4 text-gray-800">
            <p className="hidden text-lg lg:text-xl leading-relaxed lg:block font-switzer">
              {content}
            </p>

            <div className="lg:hidden">
              <p className="text-base leading-relaxed">
                {isExpanded ? content : preview}
              </p>
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-neutral-300 ring ring-neutral-300 ring-offset-2 bg-neutral-100 px-4 py-2 text-sm font-switzer font-medium text-textcolor transition hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textcolor"
              >
                {isExpanded ? "Read less" : "Read more"}
                <LuChevronDown
                  className={`transition-transform size-4 ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>
              <p className="sr-only">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryIntro;

