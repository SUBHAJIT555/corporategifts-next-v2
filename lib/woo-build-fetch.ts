import { API_BASE_URL } from "@/lib/api/config";
import type {
  PaginatedProductsResponse,
  Product,
  ProductCategory,
  ProductDetails,
} from "@/lib/api/types";

type FetchWooBuildJsonOptions = {
  url: string;
  source: string;
  timeoutMs?: number;
  retries?: number;
  backoffBaseMs?: number;
};

const DEFAULT_TIMEOUT_MS = 20_000;
const DEFAULT_RETRIES = 3;
const DEFAULT_BACKOFF_BASE_MS = 500;
const WOO_PER_PAGE_MAX = 100;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function safeJsonParse<T>(value: string): T {
  return JSON.parse(value) as T;
}

function joinUrl(base: string, path: string) {
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");
  return `${normalizedBase}/${normalizedPath}`;
}

function buildUrl(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
) {
  const url = new URL(joinUrl(API_BASE_URL, path));
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

function describePayloadType(contentType: string, body: string) {
  if (contentType.includes("application/json")) return "json";
  const trimmed = body.trim().toLowerCase();
  if (trimmed.startsWith("<!doctype html") || trimmed.startsWith("<html"))
    return "html";
  if (!trimmed) return "empty";
  return "text";
}

export async function fetchWooBuildJson<T>({
  url,
  source,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  retries = DEFAULT_RETRIES,
  backoffBaseMs = DEFAULT_BACKOFF_BASE_MS,
}: FetchWooBuildJsonOptions): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      console.info(
        `[woo-build] ${source} request attempt=${attempt} url=${url}`,
      );

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      });

      const bodyText = await response.text();
      const contentType =
        response.headers.get("content-type")?.toLowerCase() ?? "";
      const payloadType = describePayloadType(contentType, bodyText);

      console.info(
        `[woo-build] ${source} response attempt=${attempt} status=${response.status} payload=${payloadType} url=${url}`,
      );

      if (!response.ok) {
        throw new Error(
          `[woo-build] ${source} non-2xx status=${response.status} payload=${payloadType} url=${url}`,
        );
      }

      if (payloadType !== "json") {
        throw new Error(
          `[woo-build] ${source} expected JSON but got ${payloadType} url=${url}`,
        );
      }

      try {
        return safeJsonParse<T>(bodyText);
      } catch (error) {
        throw new Error(
          `[woo-build] ${source} invalid JSON url=${url} error=${String(error)}`,
        );
      }
    } catch (error) {
      const isAbortError =
        error instanceof DOMException && error.name === "AbortError";
      const reason = isAbortError ? "timeout" : "error";
      console.warn(
        `[woo-build] ${source} ${reason} attempt=${attempt}/${retries} url=${url} message=${String(
          error,
        )}`,
      );

      if (attempt >= retries) {
        throw new Error(
          `[woo-build] ${source} failed after ${retries} attempts url=${url} message=${String(
            error,
          )}`,
        );
      }

      const delay = backoffBaseMs * 2 ** (attempt - 1);
      await sleep(delay);
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(`[woo-build] ${source} exhausted retries url=${url}`);
}

export async function fetchAllProductsPaginated(
  source: string,
): Promise<Product[]> {
  const products: Product[] = [];
  let page = 1;

  // Keep fetching until the API returns an empty page.
  while (true) {
    const url = buildUrl("/products", { page, per_page: WOO_PER_PAGE_MAX });
    const data = await fetchWooBuildJson<PaginatedProductsResponse>({
      url,
      source: `${source}:products:page:${page}`,
    });

    const pageProducts = Array.isArray(data?.products) ? data.products : [];
    if (pageProducts.length === 0) {
      break;
    }

    products.push(...pageProducts);
    page += 1;
  }

  return products;
}

export async function fetchAllCategories(
  source: string,
): Promise<ProductCategory[]> {
  const url = buildUrl("/product-categories");
  const data = await fetchWooBuildJson<ProductCategory[]>({
    url,
    source: `${source}:categories`,
  });
  return Array.isArray(data) ? data : [];
}

export async function fetchProductDetailsBySlug(
  slug: string,
  source: string,
): Promise<ProductDetails | null> {
  const url = buildUrl(`/product/${encodeURIComponent(slug)}`);
  try {
    const data = await fetchWooBuildJson<ProductDetails>({
      url,
      source: `${source}:product:${slug}`,
    });
    return data ?? null;
  } catch (error) {
    console.warn(
      `[woo-build] ${source}:product:${slug} failed; returning null message=${String(error)}`,
    );
    return null;
  }
}
