"use client";

import { MessageSquareQuote } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import {
  TestimonialList,
  type TestimonialType,
} from "@/components/ui/testimonial-list";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  url?: string;
};

function toTestimonialType(testimonial: Testimonial): TestimonialType {
  return {
    authorAvatar: testimonial.src,
    authorName: testimonial.name,
    authorTagline: testimonial.designation,
    url: testimonial.url,
    quote: testimonial.quote,
  };
}

function splitTestimonialRows(testimonials: TestimonialType[]) {
  const count = testimonials.length;

  if (count === 0) {
    return { rowOne: [], rowTwo: [] };
  }

  if (count === 1) {
    return { rowOne: testimonials, rowTwo: testimonials };
  }

  if (count === 2) {
    return {
      rowOne: testimonials,
      rowTwo: [...testimonials].reverse(),
    };
  }

  if (count === 3) {
    return {
      rowOne: [testimonials[0], testimonials[2]],
      rowTwo: [testimonials[1], testimonials[0]],
    };
  }

  const midpoint = Math.ceil(count / 2);
  const rowOne = testimonials.slice(0, midpoint);
  let rowTwo = testimonials.slice(midpoint);

  // Keep at least two unique cards per row so autoFill doesn't clone one item.
  if (rowTwo.length < 2) {
    rowTwo = [testimonials[midpoint], testimonials[0]];
  }

  return { rowOne, rowTwo };
}

export const AnimatedTestimonials = ({
  testimonials,
  showDivider = true,
}: {
  testimonials: Testimonial[];
  showDivider?: boolean;
}) => {
  const mappedTestimonials = testimonials.map(toTestimonialType);
  const { rowOne, rowTwo } = splitTestimonialRows(mappedTestimonials);

  return (
    <section className="w-full bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        <Reveal animationNum={0} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <MessageSquareQuote className="h-3.5 w-3.5 text-brand-accent" />
            Testimonials
          </span>
          <h2 className="mt-4 text-display-md text-ink">What Our Clients Say</h2>
          <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
            Real feedback from businesses across Dubai and the UAE who trust us
            with their corporate gifting.
          </p>
        </Reveal>

        <Reveal animationNum={1} className="mt-4 sm:mt-5">
          <div className="screen-line-top screen-line-bottom py-5 sm:py-6">
            <div className="flex flex-col gap-2 [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!">
              <TestimonialList data={rowOne} />
              <TestimonialList data={rowTwo} direction="right" />
            </div>
          </div>
        </Reveal>
      </RevealSection>

      {showDivider ? <SectionDivider /> : null}
    </section>
  );
};
