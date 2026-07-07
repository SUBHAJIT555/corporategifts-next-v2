import { motion, AnimatePresence } from "framer-motion";


import { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "../icons";

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
  const phoneNumber = "+971556545950";
  const message = "Hello! I'm interested in your services.";

  // const handleWhatsAppClick = () => {
  //   // Replace with your WhatsApp number
  //   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  //     message
  //   )}`;
  //   self.open(whatsappUrl, "_blank");
  // };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 right-4 sm:right-8 z-50 group overflow-visible"
        >
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              message
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block p-1 rounded-xl bg-neutral-100 backdrop-blur-sm text-green-600 border border-[#e1e1e1] shadow-lg hover:bg-green-500 transition-colors duration-300 z-50 hover:text-[#e1e1e1] hover:border-[#e1e1e1] ring ring-neutral-300 ring-offset-2"
            aria-label="Contact on WhatsApp"
          >
            <IoLogoWhatsapp className="md:size-7 size-5" />
            {/* Chat bubble tooltip */}
            <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 -translate-y-2 pointer-events-none z-50">
              <div className="relative bg-white text-gray-800 px-5 py-3 rounded-xl ring ring-neutral-300 ring-offset-2 border border-gray-200 whitespace-nowrap font-switzer font-medium text-sm">
                Connect through WhatsApp for faster response
                {/* Chat bubble tail pointing up */}
                {/* <div className="absolute bottom-full right-4 -mb-1">
                  <div className="w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45 origin-center"></div>
                </div> */}
              </div>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
