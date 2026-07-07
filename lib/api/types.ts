export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  short_desc: string;
  image: string;
  categories: string[];
  category_slug?: string[];
  /** When exposed by custom WP API (WooCommerce / Yoast / Rank Math). */
  primary_category?: string;
  primary_category_slug?: string;
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
  primary_category?: string;
  primary_category_slug?: string;
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
