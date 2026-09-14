"use client";

import {
  Package,
  PenLine,
  Gift,
  Boxes,
  MapPin,
} from "lucide-react";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utilts";

const TRUST_ITEMS = [
  {
    label: "Custom branding",
    icon: PenLine,
    iconBg: "bg-[#C1D8FD] dark:bg-[#C1D8FD]/15",
  },
  {
    label: "Individual names",
    icon: Gift,
    iconBg: "bg-[#FFF7BD] dark:bg-[#FFF7BD]/15",
  },
  {
    label: "Gift packaging",
    icon: Package,
    iconBg: "bg-[#B6E9C8] dark:bg-[#B6E9C8]/15",
  },
  {
    label: "Bulk orders",
    icon: Boxes,
    iconBg: "bg-[#FFD6F8] dark:bg-[#FFD6F8]/15",
  },
  {
    label: "Dubai & UAE delivery",
    icon: MapPin,
    iconBg: "bg-[#E0F7FA] dark:bg-[#E0F7FA]/15",
  },
] as const;

export default function TrustStrip() {
  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-8 sm:px-6 sm:py-10 lg:py-12">
        <Reveal animationNum={0}>
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft">
            <ul className="grid grid-cols-1 divide-y divide-hairline sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">
              {TRUST_ITEMS.map(({ label, icon: Icon, iconBg }, index) => (
                <li
                  key={label}
                  className={cn(
                    "flex items-center gap-3 bg-canvas px-4 py-4 sm:px-5 sm:py-5",
                    index > 0 && "sm:border-l sm:border-hairline",
                    index === 2 && "sm:border-t sm:border-hairline lg:border-t-0",
                    index === 3 && "sm:border-t sm:border-hairline lg:border-t-0",
                    index === 4 &&
                      "sm:col-span-2 sm:border-t sm:border-hairline lg:col-span-1 lg:border-t-0",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline",
                      iconBg,
                    )}
                  >
                    <Icon className="h-4 w-4 text-ink" aria-hidden />
                  </span>
                  <span className="text-sm font-medium leading-snug text-ink">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
}
