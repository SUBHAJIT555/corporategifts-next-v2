"use client";

import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

export default function LegalPageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-6 sm:px-6 sm:py-8 lg:py-10">
        <Reveal animationNum={0}>
          <div className="max-w-none">{children}</div>
        </Reveal>
      </RevealSection>
    </section>
  );
}
