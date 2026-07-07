"use client";

import { Building2 } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

const aboutVideo = "/assets/video/aboutVideo.webm";

const cards = [
  "Based in Dubai, Baharnani Advertising LLC specializes in premium corporate gifts, offering a comprehensive range of customized, luxury, promotional, and eco-friendly solutions for businesses across Dubai, Abu Dhabi, and the UAE.",
  "Our mission is to deliver exceptional corporate gifts that strengthen business relationships, enhance brand visibility, and create lasting impressions through quality craftsmanship, creative designs, and personalized branding solutions.",
  "We operate with creativity, integrity, and a client-first approach, ensuring every gift reflects trust, excellence, and attention to detail - the core values that define Baharnani Advertising as a trusted name in the corporate gifting landscape of Dubai and the UAE.",
];

const WhoWeAre = () => {
  return (
    <section className="w-full bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        <Reveal animationNum={0} className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <Building2 className="h-3.5 w-3.5 text-brand-accent" />
            Who We Are
          </span>
          <h2 className="mt-4 text-display-md text-ink">Who We Are ?</h2>
        </Reveal>

        <div className="mt-3 overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-4 sm:mt-4 sm:p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {cards.map((text, index) => (
              <Reveal
                key={text}
                animationNum={index + 1}
                as="article"
                className="flex h-full flex-col rounded-xl border border-hairline bg-canvas p-5 sm:p-6"
              >
                <span
                  className="mb-4 text-3xl font-semibold tracking-tight text-muted-soft sm:text-4xl"
                  style={{
                    WebkitTextStroke: "1px var(--cal-hairline)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-body-md text-muted sm:text-[17px] sm:leading-7">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal animationNum={4} className="mt-3 sm:mt-4">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-card">
            <div className="relative aspect-video w-full sm:aspect-21/9">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={aboutVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </Reveal>
      </RevealSection>

      <SectionDivider />
    </section>
  );
};

export default WhoWeAre;
