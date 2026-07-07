const DEFAULT_SITE_URL = "https://corporategiftsdubaii.ae";
const DEFAULT_WP_ORIGIN = "https://corporategiftsdubaii.ae/blog";

export const SITE_URL =
  process.env.PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  DEFAULT_SITE_URL;

export const WP_ORIGIN =
  process.env.NEXT_PUBLIC_WP_ORIGIN?.replace(/\/+$/, "") ?? DEFAULT_WP_ORIGIN;

export const WP_CUSTOM_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? `${WP_ORIGIN}/wp-json/custom/v1`;

export const WP_FLUENTFORM_FORM3_URL =
  process.env.NEXT_PUBLIC_FLUENTFORM_FORM3_URL ??
  `${WP_ORIGIN}/wp-json/fluentform/v1/form3`;

export const IMAGE_REMOTE_HOSTNAME = new URL(WP_ORIGIN).hostname;

export const buildSiteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};
