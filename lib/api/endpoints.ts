import { API_BASE_URL, FLUENTFORM_FORM3_URL } from "./config";
import { apiFetch } from "./http";
import { saveToSheetNonBlocking } from "./save-to-sheet";
import type {
  ContactFormData,
  ContactFormResponse,
  FluentFormPayload,
  FluentFormResponse,
  PaginatedProductsResponse,
  Product,
  ProductCategory,
  ProductDetails,
  QuoteRequestPayload,
  QuoteResponse,
} from "./types";

/**
 * Products
 */
export const ProductsApi = {
  all: (args?: {
    page?: number;
    per_page?: number;
    query?: Record<string, string | number | boolean>;
    revalidate?: number;
  }) => {
    const page = args?.page ?? 1;
    const per_page = args?.per_page ?? 48;

    return apiFetch<PaginatedProductsResponse>(`${API_BASE_URL}/products`, {
      query: { page, per_page, ...(args?.query ?? {}) },
      next: args?.revalidate ? { revalidate: args.revalidate } : undefined,
      cache: "force-cache",
    });
  },

  random: () => {
    return apiFetch<Product[]>(`${API_BASE_URL}/random-products`, {
      // cache: "force-cache",
    });
  },

  categories: () => {
    return apiFetch<ProductCategory[]>(`${API_BASE_URL}/product-categories`, {
      // cache: "force-cache",
    });
  },

  byCategory: (args: { categorySlug: string; page?: number; per_page?: number }) => {
    const page = args.page ?? 1;
    const per_page = args.per_page ?? 48;

    return apiFetch<PaginatedProductsResponse>(`${API_BASE_URL}/products-by-category`, {
      query: {
        category_slug: args.categorySlug,
        page,
        per_page,
      },
    });
  },

  bySlug: (slug: string, options?: { revalidate?: number }) => {
    // endpoint is /product/{slug}
    return apiFetch<ProductDetails>(
      `${API_BASE_URL}/product/${encodeURIComponent(slug)}`,
      {
        next: options?.revalidate
          ? { revalidate: options.revalidate }
          : undefined,
        cache: "force-cache",
      },
    );
  },

  quote: (payload: QuoteRequestPayload) => {
    const billing = payload.billing;
    saveToSheetNonBlocking({
      formType: "order",
      name: [billing.first_name, billing.last_name].filter(Boolean).join(" ").trim(),
      email: billing.email,
      phone: billing.phone,
      note: payload.note ?? "",
    });

    return apiFetch<QuoteResponse>(`${API_BASE_URL}/quote`, {
      method: "POST",
      body: payload,
    });
  },
};

/**
 * Contact (your newsletter/contact create)
 * You currently POST to: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/create`
 * Keep it separate from WP custom/v1 base.
 */
export const ContactApi = {
  submit: (payload: ContactFormData) => {
    const name = [payload.firstName, payload.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    const rawType = (payload.formType || "contact").toLowerCase();

    saveToSheetNonBlocking({
      formType: rawType === "newsletter" ? "contact" : rawType,
      name,
      email: payload.email,
      phone: payload.phone ?? "",
      message: payload.message ?? "",
    });

    return apiFetch<ContactFormResponse>(
      "https://corporategiftsdubaii.ae/api/v1/contact/create",
      {
        method: "POST",
        body: payload,
      }
    );
  },
};

/**
 * FluentForm
 */
export const FluentFormApi = {
  submitForm3: (payload: FluentFormPayload) => {
    const data = payload.data;
    const name = [data.names?.first_name, data.names?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim();

    saveToSheetNonBlocking({
      formType: "contact",
      name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    return apiFetch<FluentFormResponse>(FLUENTFORM_FORM3_URL, {
      method: "POST",
      body: payload,
    });
  },
};