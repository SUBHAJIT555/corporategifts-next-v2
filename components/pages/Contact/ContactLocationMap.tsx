"use client";

import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.2573929!2d55.2318626!3d25.1626598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!2sBaharnani%20Advertising%20LLC%20-%20Corporate%20gifts%20Company%20Dubai%20%7C%20Exhibition%20stand%20Contractors%20Dubai!5e0!3m2!1sen!2som!4v1703837058988!5m2!1sen!2som";

export default function ContactLocationMap() {
  return (
    <section className="w-full bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-6 sm:px-6 sm:py-4 lg:py-4 ">
        <Reveal animationNum={0}>
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft">
            <div className="border-b border-hairline px-4 py-4 sm:px-6">
              <h2 className="text-base font-semibold text-ink sm:text-lg">
                Our location
              </h2>
              <p className="mt-1 text-sm text-muted">
                Baharnani Advertising L.L.C · Al Quoz 3 · Dubai · UAE
              </p>
            </div>
            <div className="p-3 sm:p-4">
              <iframe
                title="Baharnani Advertising location map"
                className="h-[320px] w-full rounded-xl border border-hairline sm:h-[400px]"
                src={MAP_EMBED_SRC}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
}
