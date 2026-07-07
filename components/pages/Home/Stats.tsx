"use client";

import { useEffect, useRef, useState } from "react";

const AnimatedNumber = ({
    value,
    suffix = "",
    duration = 2000,
}: {
    value: number;
    suffix?: string;
    duration?: number;
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;

        const element = ref.current;
        if (!element) return;

        let frameId = 0;
        let start = 0;
        const increment = value / (duration / 16);

        const animate = () => {
            start += increment;
            if (start < value) {
                element.textContent = `${Math.floor(start)}${suffix}`;
                frameId = requestAnimationFrame(animate);
            } else {
                element.textContent = `${value}${suffix}`;
            }
        };

        element.textContent = `0${suffix}`;
        frameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [started, value, duration, suffix]);

    return (
        <span ref={ref}>0{suffix}</span>
    );
};

const Stats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 10,
      suffix: "+",
      label: "YEARS",
      description: " in Corporate Gifting",
      icon: "award",
    },
    {
      value: 12,
      suffix: "+",
      label: "PRODUCTS CATEGORIES",
      description: "in Our Range",
      icon: "target",
    },
    {
      value: 98,
      suffix: "%",
      label: "CLIENT SATISFACTION",
      description: "of Our Products",
      icon: "discount",
    },
  ];

  return (
    <section className="w-full py-10 sm:py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={containerRef}>
          {/* Desktop / tablet grid layout */}
          <div className="relative hidden sm:grid grid-cols-3 border-x border-neutral-300 bg-white/60">
            {/* Top border line */}
            <div className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 w-screen border-t border-neutral-300" />

            {/* Top row: stat numbers + labels */}
            {stats.map((stat, index) => (
              <div
                key={`top-${stat.label}`}
                className={`flex flex-col items-center justify-center px-4 py-6 md:p-8 border-b border-neutral-300 border-r last:border-r-0 bg-white transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor text-center leading-tight">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs sm:text-sm md:text-base font-switzer tracking-[0.18em] text-textcolor/80 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}

            {/* Bottom row: icon + description */}
          {stats.map((stat, index) => (
            <div
              key={`bottom-${stat.label}`}
              className={`relative flex items-center justify-between gap-2 px-3 py-4 md:px-4 md:py-5 border-b border-neutral-300 border-r last:border-r-0 bg-neutral-50 transition-all duration-500 md:border-b-0 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 120 + 180}ms` }}
              >
              <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl ring ring-neutral-200 ring-offset-2 border border-neutral-300 bg-white">
                  {stat.icon === "award" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-6 text-[#0F5C85]"
                      aria-hidden="true"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6 9a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
                      <path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889" />
                      <path d="M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889" />
                    </svg>
                  )}
                  {stat.icon === "target" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-6 text-[#0F5C85]"
                      aria-hidden="true"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                      <path d="M12 7a5 5 0 1 0 5 5" />
                      <path d="M13 3.055a9 9 0 1 0 7.941 7.945" />
                      <path d="M15 6v3h3l3 -3h-3v-3l-3 3" />
                      <path d="M15 9l-3 3" />
                    </svg>
                  )}
                  {stat.icon === "discount" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-6 text-[#0F5C85]"
                      aria-hidden="true"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                      <path d="M9 12l2 2l4 -4" />
                    </svg>
                  )}
                </div>
                <p className="flex-1 text-xs sm:text-sm md:text-base font-switzer font-medium text-textcolor text-right">
                  {stat.description}
                </p>
              </div>
            ))}

            {/* Bottom border line */}
            <div className="pointer-events-none absolute -bottom-px left-1/2 -translate-x-1/2 w-screen border-b border-neutral-300" />
          </div>

          {/* Mobile stacked cards layout */}
          <div className="sm:hidden space-y-4">
            {stats.map((stat, index) => (
              <div
                key={`mobile-${stat.label}`}
                className={`overflow-hidden rounded-xl border border-neutral-200 bg-white ring ring-neutral-200 ring-offset-4 transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="flex flex-col items-center justify-center px-4 py-4 border-b border-neutral-200 bg-white">
                  <div className="text-2xl font-sentient font-semibold text-textcolor text-center leading-tight">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-[11px] font-switzer tracking-[0.18em] text-textcolor/80 uppercase">
                    {stat.label}
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-4 bg-neutral-50">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg ring ring-neutral-200 ring-offset-2 border border-neutral-300 bg-white">
                    {stat.icon === "award" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-5 text-[#0F5C85]"
                        aria-hidden="true"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 9a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
                        <path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889" />
                        <path d="M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889" />
                      </svg>
                    )}
                    {stat.icon === "target" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-5 text-[#0F5C85]"
                        aria-hidden="true"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M12 7a5 5 0 1 0 5 5" />
                        <path d="M13 3.055a9 9 0 1 0 7.941 7.945" />
                        <path d="M15 6v3h3l3 -3h-3v-3l-3 3" />
                        <path d="M15 9l-3 3" />
                      </svg>
                    )}
                    {stat.icon === "discount" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-5 text-[#0F5C85]"
                        aria-hidden="true"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                        <path d="M9 12l2 2l4 -4" />
                      </svg>
                    )}
                  </div>
                  <p className="flex-1 text-xs font-switzer font-medium text-textcolor">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p
            className={`mt-8 sm:mt-10 md:mt-12 max-w-4xl mx-auto text-center text-base sm:text-lg md:text-xl font-switzer font-bold text-textcolor leading-relaxed px-2 transition-all duration-700 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            From startups to corporate teams, Baharnani supports bulk corporate
            gifts in Dubai with practical product choices, customisation options,
            and reliable delivery coordination.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
