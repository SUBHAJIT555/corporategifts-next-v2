import { writeExportAuditReport } from "../scripts/export-audit/merge-report";
import { AUDIT_SERVER_PORT } from "../scripts/export-audit/constants";

export default async function globalTeardown() {
  const baseURL =
    process.env.AUDIT_BASE_URL ?? `http://127.0.0.1:${process.env.AUDIT_SERVER_PORT ?? AUDIT_SERVER_PORT}`;

  // Teardown may run after a partial/failed suite — still write the report.
  process.env.AUDIT_ALLOW_EMPTY_FINDINGS = "true";
  writeExportAuditReport(baseURL);
}
