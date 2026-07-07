import { cn } from "@/lib/utilts";

export const legalLastUpdatedClass = cn(
  "mb-8 w-fit rounded-lg border border-dashed border-hairline bg-surface-card px-4 py-2 text-sm text-muted",
);

export const legalDocumentClass = cn("divide-y divide-hairline");

export const legalSectionClass = cn("py-10 md:py-12");

export const legalH2Class = cn(
  "mb-4 text-xl font-semibold text-ink sm:mb-6 sm:text-2xl md:text-3xl",
);

export const legalH3Class = cn(
  "mb-4 text-lg font-semibold text-ink sm:text-xl md:text-2xl",
);

export const legalParagraphClass = cn(
  "mb-4 text-sm leading-relaxed text-body sm:text-base md:text-[15px] md:leading-7",
);

export const legalListClass = cn(
  "mb-4 ml-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-body sm:text-base md:text-[15px] md:leading-7",
);

export const legalOrderedListClass = cn(
  "ml-4 list-inside list-decimal space-y-2 text-sm leading-relaxed text-body sm:text-base md:text-[15px] md:leading-7",
);

export const legalLinkClass = cn(
  "font-medium text-brand-accent underline-offset-2 hover:underline",
);

export const legalContactBoxClass = cn("space-y-0");

export const legalContactTitleClass = cn(
  "mb-4 text-lg font-semibold text-ink md:text-xl",
);

export const legalContactLineClass = cn(
  "mb-2 text-sm text-body sm:text-base",
);

export const legalIconBoxClass = cn(
  "inline-flex size-8 items-center justify-center rounded-lg border border-hairline bg-surface-soft p-1 text-ink",
);
