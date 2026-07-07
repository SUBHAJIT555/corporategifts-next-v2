import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { expect, test } from "@playwright/test";
import { LINKS_FILE, REPORTS_DIR } from "../scripts/export-audit/constants";
import type { InternalLinkSources, LinkFinding } from "../scripts/export-audit/types";

function loadInternalLinks(): InternalLinkSources {
  if (!existsSync(LINKS_FILE)) {
    return { links: [], assets: [] };
  }
  return JSON.parse(readFileSync(LINKS_FILE, "utf8")) as InternalLinkSources;
}

test.describe("internal links and assets", () => {
  test("validate crawled internal links and assets", async ({ request }) => {
    const productOnly = process.env.PRODUCT_ONLY === "1";
    const internal = loadInternalLinks();
    const filteredInternal = productOnly
      ? {
          links: internal.links.filter((entry) => entry.sourceRoute.startsWith("/shop/")),
          assets: internal.assets.filter((entry) => entry.sourceRoute.startsWith("/shop/")),
        }
      : internal;
    const findings: LinkFinding[] = [];

    const uniqueTargets = new Map<string, { kind: "link" | "asset"; sourceRoute: string }>();
    for (const link of filteredInternal.links) {
      uniqueTargets.set(link.url, { kind: "link", sourceRoute: link.sourceRoute });
    }
    for (const asset of filteredInternal.assets) {
      if (!uniqueTargets.has(asset.url)) {
        uniqueTargets.set(asset.url, { kind: "asset", sourceRoute: asset.sourceRoute });
      }
    }

    const concurrency = Number(process.env.AUDIT_LINK_CONCURRENCY ?? 20);
    const entries = [...uniqueTargets.entries()];

    for (let index = 0; index < entries.length; index += concurrency) {
      const batch = entries.slice(index, index + concurrency);
      const results = await Promise.all(
        batch.map(async ([url, meta]) => {
          try {
            const response = await request.get(url, { maxRedirects: 5, timeout: 20_000 });
            return {
              url,
              kind: meta.kind,
              sourceRoute: meta.sourceRoute,
              httpStatus: response.status(),
            } satisfies LinkFinding;
          } catch (caught) {
            return {
              url,
              kind: meta.kind,
              sourceRoute: meta.sourceRoute,
              httpStatus: null,
              error: caught instanceof Error ? caught.message : String(caught),
            } satisfies LinkFinding;
          }
        }),
      );

      findings.push(...results);
    }

    writeFileSync(join(REPORTS_DIR, "link-findings.json"), JSON.stringify(findings, null, 2), "utf8");

    const broken = findings.filter((finding) => finding.httpStatus !== 200);
    expect(
      broken,
      `Broken internal resources:\n${broken
        .slice(0, 25)
        .map((item) => `- ${item.url} (${item.kind}) from ${item.sourceRoute}`)
        .join("\n")}`,
    ).toEqual([]);
  });
});
