"use client";

import { ReactNode, } from "react";
import Navbar from "@/components/ui/Navbar";
import WhatsAppButton from "@/components/ui/WhatAppButton";
import FloatingCartButton from "@/components/ui/FloatingCartButton";
import MobileStickyActions from "@/components/ui/MobileStickyActions";
import Footer from "@/components/ui/Footer";
// import Loading from "@/components/ui/Loading";
import LenisProvider from "../providers/LenisProvider";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";



export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <LenisProvider>
        <Navbar />
        <div className="flex flex-col grow pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
          <main className="relative grow w-full overflow-x-hidden md:pb-0">
            <div
              id="page-scroll-threshold"
              className="pointer-events-none absolute left-0 top-[320px] h-px w-px"
              aria-hidden="true"
            />
            {/* <Suspense fallback={<Loading fullScreen message="Loading..." size="lg" />}> */}
            {children}
            {/* </Suspense> */}
          </main>
          <Footer />
        </div>
      </LenisProvider>

      <ScrollToTopButton />
      {/* Next.js handles scroll restoration; react-router's ScrollRestoration is removed */}
      <FloatingCartButton />
      <WhatsAppButton />
      <MobileStickyActions />
    </div>
  );
}
