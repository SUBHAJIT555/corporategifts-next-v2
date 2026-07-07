/**
 * SectionDivider — cal.com-style horizontal separation line.
 *
 * Renders a full-width hairline that runs continuously across the page. At the
 * points where it meets the content rails (the edges of the `max-w-7xl`
 * column) it places a small "+" tick. The divider has a little vertical height
 * so the section rails above/below stop short of it — leaving a clean gap in
 * the vertical line around the plus (the horizontal line stays continuous).
 *
 * Drop it between sections:
 *   <SectionA />
 *   <SectionDivider />
 *   <SectionB />
 *
 * The plus marks align to a `max-w-7xl` column by default. Pass `maxWidth` to
 * match a different content width.
 */
type SectionDividerProps = {
  className?: string;
  /** Tailwind max-width class for the content column the rails align to. */
  maxWidth?: string;
};

function PlusMark({ side }: { side: "left" | "right" }) {
  const position =
    side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2";

  return (
    <span
      className={`absolute top-1/2 z-10 block h-6 w-6 -translate-y-1/2 ${position}`}
    >
      {/* Clearance: hide the surrounding lines so the "+" stands distinct */}
      <span className="absolute inset-0 bg-canvas" />
      {/* Horizontal arm */}
      <span className="absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-neutral-300 dark:bg-neutral-600" />
      {/* Vertical arm */}
      <span className="absolute top-1/2 left-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-neutral-300 dark:bg-neutral-600" />
    </span>
  );
}

export default function SectionDivider({
  className = "",
  maxWidth = "max-w-7xl",
}: SectionDividerProps) {
  return (
    <div
      className={`relative flex h-5 w-full items-center bg-canvas ${className}`}
      aria-hidden="true"
    >
      {/* Continuous full-width hairline */}
      <div className="h-px w-full bg-hairline" />

      {/* Rail-aligned plus ticks */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`relative mx-auto h-full ${maxWidth}`}>
          <PlusMark side="left" />
          <PlusMark side="right" />
        </div>
      </div>
    </div>
  );
}
