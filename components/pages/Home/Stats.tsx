"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import {
  Reveal,
  RevealSection,
} from "@/components/ui/timeline-animation";
import { Award, ShieldCheck, Target } from "lucide-react";
import {
  candyDarkButtonClasses,
  candyWhiteButtonClasses,
} from "@/components/ui/candy-button";

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

const Stats = () => {
  const stats = [
    {
      value: 10,
      suffix: "+",
      label: "YEARS",
      description: "in Corporate Gifting",
      icon: <Award className="h-5 w-5" aria-hidden />,
      iconBgClass: "bg-[#A8DDF0] dark:bg-[#A8DDF0]/15",
      iconClass: "text-ink dark:text-[#A8DDF0]",
    },
    {
      value: 12,
      suffix: "+",
      label: "PRODUCTS CATEGORIES",
      description: "in Our Range",
      icon: <Target className="h-5 w-5" aria-hidden />,
      iconBgClass: "bg-[#F9C46B] dark:bg-[#F9C46B]/15",
      iconClass: "text-ink dark:text-[#F9C46B]",
    },
    {
      value: 98,
      suffix: "%",
      label: "CLIENT SATISFACTION",
      description: "of Our Products",
      icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
      iconBgClass: "bg-[#94EBC5] dark:bg-[#94EBC5]/15",
      iconClass: "text-ink dark:text-[#94EBC5]",
    },
  ];

  return (
    <section className="w-full bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-3 sm:px-6 sm:py-4 lg:py-6">
        {/* Desktop / tablet grid */}
        <Reveal animationNum={0}>
          <div className="hidden overflow-hidden rounded-2xl border border-hairline bg-canvas sm:block">
            {/* Numbers row */}
            <div className="grid grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={`top-${stat.label}`}
                  className={`flex flex-col items-center justify-center px-3 py-4 text-center md:py-5 ${
                    index > 0 ? "border-l border-hairline" : ""
                  }`}
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
                  className={`flex items-center justify-between gap-3 px-4 py-5 ${
                    index > 0 ? "border-l border-hairline" : ""
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline sm:h-11 sm:w-11 ${stat.iconBgClass}`}
                  >
                    <span className={stat.iconClass}>{stat.icon}</span>
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
            {stats.map((stat) => (
              <div
                key={`mobile-${stat.label}`}
                className="overflow-hidden rounded-2xl border border-hairline bg-canvas"
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
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline sm:h-11 sm:w-11 ${stat.iconBgClass}`}
                  >
                    <span className={stat.iconClass}>{stat.icon}</span>
                  </span>
                  <p className="flex-1 text-sm font-medium text-body">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal animationNum={1}>
          <p className="mx-auto mt-2 max-w-4xl text-center text-xl font-medium leading-relaxed text-muted sm:mt-3 sm:text-3xl lg:mt-5">
            From startups to corporate teams, Baharnani supports bulk corporate
            gifts in Dubai with practical product choices, customisation options,
            and reliable delivery coordination.
          </p>
        </Reveal>

        <Reveal animationNum={2}>
          <div className="mt-3 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
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
        </Reveal>
      </RevealSection>
    </section>
  );
};

export default Stats;
