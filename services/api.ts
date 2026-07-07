import {
  WP_CUSTOM_API_BASE_URL,
  WP_FLUENTFORM_FORM3_URL,
} from "@/lib/config/site";

// API Base URL
const API_BASE_URL = WP_CUSTOM_API_BASE_URL;

// Types
export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  short_desc: string;
  image: string;
  categories: string[];
  category_slug?: string[];
}

export interface ProductDetails {
  id: number;
  slug: string;
  name: string;
  type: string;
  permalink: string;
  sku: string;
  price: number;
  regular_price: string;
  sale_price: string;
  description: string;
  short_desc: string;
  main_image: string;
  gallery: string[];
  categories: string[];
  category_slug?: string[];
  seo: {
    title: string;
    description: string;
    og_title: string;
    og_desc: string;
    canonical: string;
    image: string;
  };
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  product_count: number;
}

export interface ContactFormData {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  message?: string;
  formType?: string;
  privacy?: boolean;
}

export interface ContactFormResponse {
  status: boolean;
  message: string;
}

export interface FluentFormPayload {
  data: {
    names: {
      first_name: string;
      last_name: string;
    };
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
}

export interface FluentFormResponse {
  message: string;
  [key: string]: unknown;
}

export interface QuoteRequestPayload {
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    country: string;
  };
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
  note?: string;
}

export interface QuoteResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

export interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  total_pages: number;
  page: number;
  per_page: number;
}

// API Functions

/**
 * Fetch all products with pagination and optional query parameters
 */
export const fetchAllProducts = async (
  page?: number,
  per_page?: number,
  queryParams?: Record<string, string | number | boolean>,
): Promise<PaginatedProductsResponse> => {
  if (!page) {
    page = 1;
  }
  if (!per_page) {
    per_page = 48;
  }
  // Build query string
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
  });

  // Add optional query parameters
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      params.append(key, value.toString());
    });
  }

  const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

/**
 * Fetch random products
 */
export const fetchRandomProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/random-products`);

  if (!response.ok) {
    throw new Error(`Failed to fetch random products: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch all product categories
 */
export const fetchProductCategories = async (): Promise<ProductCategory[]> => {
  const response = await fetch(`${API_BASE_URL}/product-categories`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product categories: ${response.statusText}`,
    );
  }

  return response.json();
};

/**
 * Fetch products by category ID
 */
export const fetchProductsByCategory = async (
  categorySlug: string,
  page?: number,
  per_page?: number,
): Promise<PaginatedProductsResponse> => {
  if (!page) {
    page = 1;
  }
  if (!per_page) {
    per_page = 48;
  }
  const response = await fetch(
    `${API_BASE_URL}/products-by-category?category_slug=${categorySlug}&page=${page}&per_page=${per_page}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products for category ${categorySlug}: ${response.statusText}`,
    );
  }

  return response.json();
};

/**
 * Fetch product details by slug
 */
export const fetchProductBySlug = async (
  slug: string,
): Promise<ProductDetails> => {
  const response = await fetch(`${API_BASE_URL}/product/${slug}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

/**
 * Submit contact form
 *
 * Note: Update the endpoint URL below to match your actual contact form API endpoint.
 * You can also use environment variables: `${import.meta.env.VITE_API_URL}/api/v1/contact/create`
 */
export const submitContactForm = async (
  data: ContactFormData,
): Promise<ContactFormResponse> => {
  // Update this URL to match your actual contact form endpoint
  // Priority: VITE_CONTACT_API_URL > VITE_API_URL > API_BASE_URL
  const contactEndpoint =
    process.env.NEXT_PUBLIC_CONTACT_API_URL ||
    (process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contact/create`
      : `${API_BASE_URL}/contact`);

  const response = await fetch(contactEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: `Failed to submit contact form: ${response.statusText}`,
      status: false,
    }));
    throw new Error(errorData.message || "Failed to submit contact form");
  }

  const responseData = await response.json();

  // Handle response format where status might be false
  if (responseData.status === false) {
    throw new Error(responseData.message || "Failed to submit contact form");
  }

  return responseData;
};

/**
 * Submit contact form via FluentForm
 */
export const submitFluentForm = async (
  data: FluentFormPayload,
): Promise<FluentFormResponse> => {
  const response = await fetch(WP_FLUENTFORM_FORM3_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Submission failed");
  }

  return responseData;
};

/**
 * Submit quote request
 */
export const submitQuote = async (
  data: QuoteRequestPayload,
): Promise<QuoteResponse> => {
  const response = await fetch(`${API_BASE_URL}/quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: `Failed to submit quote: ${response.statusText}`,
      status: false,
    }));
    throw new Error(errorData.message || "Failed to submit quote");
  }

  const responseData = await response.json();

  // Handle response format where status might be false
  if (responseData.status === false) {
    throw new Error(responseData.message || "Failed to submit quote");
  }

  return responseData;
};
