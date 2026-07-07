import { createHash } from "crypto";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { FINDINGS_DIR } from "./constants";
import type { PageFinding } from "./types";

export function resetFindingsDir() {
  if (existsSync(FINDINGS_DIR)) {
    rmSync(FINDINGS_DIR, { recursive: true, force: true });
  }
  mkdirSync(FINDINGS_DIR, { recursive: true });
}

export function findingFilePath(route: string): string {
  const hash = createHash("sha1").update(route).digest("hex");
  return join(FINDINGS_DIR, `${hash}.json`);
}

export function writePageFinding(finding: PageFinding) {
  mkdirSync(FINDINGS_DIR, { recursive: true });
  writeFileSync(findingFilePath(finding.route), JSON.stringify(finding, null, 2), "utf8");
}

export function isSameOriginUrl(candidate: string, baseURL: string): boolean {
  try {
    const base = new URL(baseURL);
    const url = new URL(candidate, baseURL);
    return url.origin === base.origin;
  } catch {
    return false;
  }
}

export function shouldAuditExternalAssets(): boolean {
  return process.env.AUDIT_CHECK_EXTERNAL === "true";
}
