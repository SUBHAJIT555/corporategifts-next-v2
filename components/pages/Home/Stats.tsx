"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { candyDarkButtonClasses, candyIconButtonClasses, candyAccentIconClasses, candyWhiteButtonClasses } from "@/components/ui/candy-button";

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

  return <span ref={ref}>0{suffix}</span>;
};

const StatIcon = ({ icon }: { icon: string }) => {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: candyAccentIconClasses,
  };

  if (icon === "award") {
    return (
      <svg {...common}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 9a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
        <path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889" />
        <path d="M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889" />
      </svg>
    );
  }

  if (icon === "target") {
    return (
      <svg {...common}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M12 7a5 5 0 1 0 5 5" />
        <path d="M13 3.055a9 9 0 1 0 7.941 7.945" />
        <path d="M15 6v3h3l3 -3h-3v-3l-3 3" />
        <path d="M15 9l-3 3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
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
      description: "in Corporate Gifting",
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
    <section className="w-full bg-canvas">
      <div
        ref={containerRef}
        className="mx-auto max-w-7xl border-x border-hairline px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
      >
        {/* Desktop / tablet grid */}
        <div className="hidden overflow-hidden rounded-2xl border border-hairline bg-canvas sm:block">
          {/* Numbers row */}
          <div className="grid grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={`top-${stat.label}`}
                className={`flex flex-col items-center justify-center px-4 py-8 text-center transition-all duration-500 md:py-10 ${
                  index > 0 ? "border-l border-hairline" : ""
                } ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Icon + description row */}
          <div className="grid grid-cols-3 border-t border-hairline bg-canvas">
            {stats.map((stat, index) => (
              <div
                key={`bottom-${stat.label}`}
                className={`flex items-center justify-between gap-3 px-4 py-5 transition-all duration-500 ${
                  index > 0 ? "border-l border-hairline" : ""
                } ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 120 + 180}ms` }}
              >
                <span className={candyIconButtonClasses("white", "sm")}>
                  <StatIcon icon={stat.icon} />
                </span>
                <p className="flex-1 text-right text-sm font-medium text-body">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stacked cards */}
        <div className="space-y-4 sm:hidden">
          {stats.map((stat, index) => (
            <div
              key={`mobile-${stat.label}`}
              className={`overflow-hidden rounded-2xl border border-hairline bg-canvas transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="flex flex-col items-center justify-center px-4 py-5 text-center">
                <div className="text-3xl font-semibold tracking-tight text-ink">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  {stat.label}
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-hairline px-4 py-4">
                <span className={candyIconButtonClasses("white", "sm")}>
                  <StatIcon icon={stat.icon} />
                </span>
                <p className="flex-1 text-sm font-medium text-body">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          className={`mx-auto mt-10 max-w-4xl text-center text-2xl font-medium leading-relaxed text-muted transition-all duration-700 sm:mt-12 sm:text-3xl lg:mt-14 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          From startups to corporate teams, Baharnani supports bulk corporate
          gifts in Dubai with practical product choices, customisation options,
          and reliable delivery coordination.
        </p>

        <div
          className={`mt-8 flex flex-col justify-center gap-3 transition-all duration-700 sm:flex-row sm:items-center ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "620ms" }}
        >
          <NoPrefetchLink
            href="/products"
            className={candyDarkButtonClasses("group w-full sm:w-auto")}
          >
            Explore Our Products
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </NoPrefetchLink>
          <NoPrefetchLink
            href="/products"
            className={candyWhiteButtonClasses("w-full sm:w-auto")}
          >
            Shop Now
          </NoPrefetchLink>
        </div>
      </div>
    </section>
  );
};

export default Stats;
