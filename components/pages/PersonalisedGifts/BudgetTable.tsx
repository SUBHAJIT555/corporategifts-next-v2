"use client";

import { Wallet } from "lucide-react";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { BUDGET_ROWS } from "./data";

export default function BudgetTable() {
  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-8 sm:px-6 sm:py-10 lg:py-12">
        <Reveal
          animationNum={0}
          className="mx-auto mb-6 max-w-4xl text-center sm:mb-8"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
            <Wallet className="h-3.5 w-3.5 text-brand-accent" />
            Budget guide
          </span>
          <h2 className="mt-4 text-display-md text-ink">
            Corporate Gift Boxes by Budget and Gifting Level
          </h2>
          <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
            Budget should guide the selection, but it should not be the only
            factor. Corporate gift boxes can be designed around value-focused,
            mid-range, premium and executive levels. The key is to protect
            perceived quality: three well-matched products usually create a
            stronger impression than eight unrelated low-value fillers.
          </p>
        </Reveal>

        <Reveal animationNum={1} className="mx-auto max-w-5xl">
          {/* Mobile: card stack */}
          <ul className="flex flex-col gap-3 md:hidden">
            {BUDGET_ROWS.map((row) => (
              <li
                key={row.level}
                className="rounded-2xl border border-hairline bg-canvas p-4"
              >
                <p className="text-base font-semibold text-ink">{row.level}</p>
                <div className="mt-3 space-y-2.5 border-t border-hairline pt-3">
                  <div>
                    <p className="text-caption text-muted">Example</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-body">
                      {row.combination}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-muted">Best suited to</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-body">
                      {row.suitedTo}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop: table */}
          <div className="hidden overflow-hidden rounded-2xl border border-hairline bg-surface-soft md:block">
            <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,1fr)] gap-4 border-b border-hairline bg-canvas px-5 py-3.5 text-sm font-semibold text-ink">
              <span>Gifting level</span>
              <span>Example combination</span>
              <span>Best suited to</span>
            </div>
            <ul>
              {BUDGET_ROWS.map((row, index) => (
                <li
                  key={row.level}
                  className={
                    index < BUDGET_ROWS.length - 1
                      ? "border-b border-hairline bg-canvas"
                      : "bg-canvas"
                  }
                >
                  <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,1fr)] items-start gap-4 px-5 py-5">
                    <p className="text-base font-semibold text-ink">
                      {row.level}
                    </p>
                    <p className="text-body-md leading-relaxed text-muted">
                      {row.combination}
                    </p>
                    <p className="text-body-md leading-relaxed text-muted">
                      {row.suitedTo}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </RevealSection>
    </section>
  );
}
