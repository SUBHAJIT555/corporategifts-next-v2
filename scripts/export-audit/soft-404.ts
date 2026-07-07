import { SOFT_404_MARKERS } from "./constants";

export type Soft404Match = {
  matched: boolean;
  rule: string | null;
};

/** Detect Next.js static-export soft 404 HTML (HTTP 200 with not-found UI). */
export function detectSoft404Html(html: string): Soft404Match {
  if (html.includes(`id="${SOFT_404_MARKERS.nextErrorHtmlId}"`)) {
    return { matched: true, rule: "html:id:__next_error__" };
  }

  if (html.includes(SOFT_404_MARKERS.nextErrorDigest)) {
    return { matched: true, rule: "html:digest:NEXT_HTTP_ERROR_FALLBACK;404" };
  }

  return { matched: false, rule: null };
}

/** Playwright-friendly check on a live DOM. */
export async function detectSoft404Page(
  getContent: () => Promise<string>,
  getHeadingText: () => Promise<string | null>,
  hasNotFoundBoundary?: () => Promise<boolean>,
  knownNotFoundComponent?: () => Promise<boolean>,
  productContentMissing?: boolean,
): Promise<Soft404Match> {
  const [html, heading] = await Promise.all([getContent(), getHeadingText()]);

  const htmlMatch = detectSoft404Html(html);
  if (htmlMatch.matched) {
    return htmlMatch;
  }

  if (heading && SOFT_404_MARKERS.forbiddenHeadings.includes(heading.trim() as never)) {
    return { matched: true, rule: "dom:h1:forbidden-not-found-title" };
  }

  if (hasNotFoundBoundary && (await hasNotFoundBoundary())) {
    return { matched: true, rule: "dom:next-notfound-boundary" };
  }

  if (knownNotFoundComponent && (await knownNotFoundComponent())) {
    return { matched: true, rule: "dom:known-notfound-component-selector" };
  }

  if (productContentMissing) {
    return { matched: true, rule: "product:missing-core-content-signals" };
  }

  return { matched: false, rule: null };
}
