import { resetFindingsDir } from "../scripts/export-audit/utils";
import { writeAuditInputs } from "../scripts/export-audit/collect-routes";

export default async function globalSetup() {
  resetFindingsDir();
  writeAuditInputs();
}
