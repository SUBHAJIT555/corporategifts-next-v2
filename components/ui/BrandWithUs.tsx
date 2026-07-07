"use client";

import React from "react";
import { cn } from "@/lib/utilts";
import Image from "next/image";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x border-neutral-300 md:grid-cols-4",
        "bg-neutral-100 md:bg-white",
        className
      )}
      {...props}
    >
      {/* Top border line spanning full width */}
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-neutral-300" />

      <LogoCard
        className="relative border-r border-b border-neutral-300 bg-neutral-100"
        logo={{
          src: "/assets/images/Brand_logos/Careem-logo.svg",
          alt: "Brand 1 Logo",
        }}
      >
        
      </LogoCard>

      <LogoCard
        className="border-b border-neutral-300 md:border-r bg-white"
        logo={{
          src: "/assets/images/Brand_logos/EtihadArena-logo.svg",
          alt: "Brand 2 Logo",
        }}
      />

      <LogoCard
        className="relative border-r border-b border-neutral-300 bg-white md:bg-neutral-100"
        logo={{
          src: "/assets/images/Brand_logos/FAB-logo.svg",
          alt: "Brand 3 Logo",
        }}
      >
        
        
      </LogoCard>

      <LogoCard
        className="relative border-b border-neutral-300 bg-neutral-100 md:bg-white"
        logo={{
          src: "/assets/images/Brand_logos/Himalaya-logo.svg",
          alt: "Brand 4 Logo",
        }}
      />

      <LogoCard
        className="relative border-r border-b border-neutral-300 md:border-b-0 bg-neutral-100 md:bg-white"
        logo={{
          src: "/assets/images/Brand_logos/Keeta-logo.svg",
          alt: "Brand 5 Logo",
        }}
      >
        
      </LogoCard>

      <LogoCard
        className="border-b border-neutral-300 bg-white md:border-r md:border-b-0 md:bg-neutral-100"
        logo={{
          src: "/assets/images/Brand_logos/Noon-logo.svg",
          alt: "Brand 6 Logo",
        }}
      />

      <LogoCard
        className="border-r border-neutral-300 bg-white"
          logo={{
            src: "/assets/images/Brand_logos/RIT-logo.svg",
          alt: "Brand 7 Logo",
        }}
      />

      <LogoCard
        className="bg-neutral-100 "
        logo={{
          src: "/assets/images/Brand_logos/Talabat-logo.svg",
          alt: "Brand 8 Logo",
        }}
      />

      {/* Bottom border line spanning full width */}
      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-neutral-300" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center px-4 py-8 md:p-8",
        className
      )}
      {...props}
    >
      <Image
        alt={logo.alt}
        className="pointer-events-none h-14 select-none md:h-20 w-auto object-contain "
        height={logo.height || 80}
        width={logo.width || 160}
        src={logo.src}
      />
      {children}
    </div>
  );
}





// Backwards-compatible alias so existing imports still work
export const BrandWithUs = LogoCloud;

