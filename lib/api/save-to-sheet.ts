import { SITE_URL } from "@/lib/config/site";

export type SaveToSheetPayload = {
  formType: string;
  [key: string]: unknown;
};

const SAVE_TO_SHEET_URL = `${SITE_URL}/api/v1/save-to-sheet.php`;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

function getUtmFields(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    const params = new URLSearchParams(window.location.search);
    const fields: Record<string, string> = {};

    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) fields[key] = value;
    }

    return fields;
  } catch {
    return {};
  }
}

/**
 * Fire-and-forget Google Sheets sync.
 * Starts immediately, never awaits, never throws — primary contact APIs must continue.
 */
export function saveToSheetNonBlocking(payload: SaveToSheetPayload): void {
  try {
    void fetch(SAVE_TO_SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...getUtmFields(),
        ...payload,
      }),
      keepalive: true,
    }).catch(() => {
      // Sheets sync must never block or fail the primary contact flow.
    });
  } catch {
    // Ignore sync errors (including environments without fetch).
  }
}
