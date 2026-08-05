import type { Metadata } from "next";
// Self-hosted Geist (Vercel's default font) — bundled locally, no network fetch.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "react-image-gallery/styles/image-gallery.css";

// Default: indexable. Only block when explicitly marked as non-production
// (preview / staging / development). Avoids accidental sitewide noindex when
// NEXT_PUBLIC_ENV is unset. `yarn build` also sets NEXT_PUBLIC_ENV=production.
const env = (process.env.NEXT_PUBLIC_ENV ?? "").toLowerCase();
const isNonIndexableEnv =
  env === "preview" || env === "staging" || env === "development";

// Prevents a flash of the wrong theme before hydration.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Corporate Gifts",
  description: "Corporate Gifts",
  robots: {
    index: !isNonIndexableEnv,
    follow: !isNonIndexableEnv,
    googleBot: {
      index: !isNonIndexableEnv,
      follow: !isNonIndexableEnv,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistSans.className}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
