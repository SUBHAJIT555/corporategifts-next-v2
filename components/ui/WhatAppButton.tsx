"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "../icons";
import { cn } from "@/lib/utilts";
import { candyIconButtonClasses } from "@/components/ui/candy-button";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const thresholdElement = document.getElementById("page-scroll-threshold");
    if (!thresholdElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting);
    });

    observer.observe(thresholdElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="group fixed bottom-6 right-4 z-50 hidden md:block sm:right-6"
        >
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(candyIconButtonClasses("white", "md"), "relative")}
            aria-label="Contact on WhatsApp"
          >
            <IoLogoWhatsapp className="size-5 shrink-0 text-[#25D366] sm:size-6" />

            <div className="pointer-events-none absolute right-full top-1/2 z-50 mr-3 -translate-y-1/2 translate-x-2 opacity-0 invisible transition-all duration-200 ease-out group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
              <div className="relative max-w-[220px] rounded-xl border border-hairline bg-surface-card px-4 py-2.5 text-sm font-medium text-ink shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] sm:max-w-none sm:whitespace-nowrap">
                Connect through WhatsApp for faster response
                <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 rotate-45 border-b border-r border-hairline bg-surface-card" />
                </div>
              </div>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
