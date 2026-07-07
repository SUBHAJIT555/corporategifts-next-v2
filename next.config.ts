import type { NextConfig } from "next";
import { IMAGE_REMOTE_HOSTNAME } from "./lib/config/site";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // redirects() does not work with output: "export" — unicode slug redirects live in public/.htaccess
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: IMAGE_REMOTE_HOSTNAME,
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
