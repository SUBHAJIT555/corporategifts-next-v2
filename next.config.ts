import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
import { IMAGE_REMOTE_HOSTNAME } from "./lib/config/site";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // A lockfile in C:\PROJECT makes Next treat that folder as the app root,
  // so Tailwind resolves outside this project and localhost fails to compile.
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
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
