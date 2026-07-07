type Primitive = string | number | boolean;

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export function buildQuery(params?: Record<string, Primitive | null | undefined>) {
  if (!params) return "";
  const sp = new URLSearchParams();

  for (const [k, v] of Object.entries(params)) {
    if (v === null || v === undefined) continue;
    sp.set(k, String(v));
  }

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

type FetchOpts = {
  method?: "GET" | "POST";
  query?: Record<string, Primitive | null | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
  /**
   * For Next:
   * - build/export: mostly irrelevant but safe
   * - server: can set next: { revalidate }
   */
  next?: { revalidate?: number };
  cache?: RequestCache;
};

export async function apiFetch<T>(
  url: string,
  {
    method = "GET",
    query,
    body,
    headers,
    timeoutMs = 15_000,
    next,
    cache,
  }: FetchOpts = {}
): Promise<T> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${url}${buildQuery(query)}`, {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      // Next.js server hints (ignored in browser)
      ...(next ? { next } : {}),
      ...(cache ? { cache } : {}),
    });

    const text = await res.text();
    const data = text ? safeJson(text) : null;

    if (!res.ok) {
      const msg =
        (data as unknown as { message?: string })?.message ||
        (data as unknown as { error?: string })?.error ||
        res.statusText ||
        "Request failed";
      throw new ApiError(msg, res.status, data);
    }

    return data as T;
  } finally {
    clearTimeout(t);
  }
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}