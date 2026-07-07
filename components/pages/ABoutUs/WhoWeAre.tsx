"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BrandWithUs } from "@/components/ui/BrandWithUs";

const aboutVideo = "/assets/video/aboutVideo.webm";

const WhoWeAre = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "-50px",
  });
  const isVideoInView = useInView(videoRef, {
    once: true,
    margin: "-100px",
  });
  const isCardsInView = useInView(cardsRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <div className="w-full">
      {/* Heading Section */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4 md:py-5 lg:py-6"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor leading-tight">
          Who We Are ?
        </h2>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        ref={cardsRef}
        initial={{ opacity: 0 }}
        animate={isCardsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full overflow-hidden py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16"
      >
        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-xl p-6 sm:p-7 md:p-8 lg:p-10 border border-neutral-200 ring ring-neutral-300 ring-offset-3 md:ring-offset-6 bg-bg overflow-hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
                backgroundSize: "1px 1px",
                backgroundPosition: "0 0, 0 0",
                maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
                WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
            <p className="relative z-10 text-center font-switzer font-medium text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              Based in Dubai, Baharnani Advertising LLC specializes in premium
              corporate gifts, offering a comprehensive range of customized,
              luxury, promotional, and eco-friendly solutions for businesses
              across Dubai, Abu Dhabi, and the UAE.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-bg rounded-xl p-6 sm:p-7 md:p-8 lg:p-10 border border-neutral-200 ring ring-neutral-300 ring-offset-3 md:ring-offset-6 overflow-hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
                backgroundSize: "1px 1px",
                backgroundPosition: "0 0, 0 0",
                maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
                WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
            <p className="relative z-10 text-center font-switzer font-medium text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              Our mission is to deliver exceptional corporate gifts that
              strengthen business relationships, enhance brand visibility, and
              create lasting impressions through quality craftsmanship, creative
              designs, and personalized branding solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative bg-bg rounded-xl p-6 sm:p-7 md:p-8 lg:p-10 border border-neutral-200 ring ring-neutral-300 ring-offset-3 md:ring-offset-6 overflow-hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
                backgroundSize: "1px 1px",
                backgroundPosition: "0 0, 0 0",
                maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
                WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
            <p className="relative z-10 text-center font-switzer font-medium text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              We operate with creativity, integrity, and a client-first
              approach, ensuring every gift reflects trust, excellence, and
              attention to detail - the core values that define Baharnani
              Advertising as a trusted name in the corporate gifting landscape
              of Dubai and the UAE.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Section */}
      <motion.div
        ref={videoRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isVideoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.8 }}
        className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 "
      >
        <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[40vh] lg:h-[55vh] xl:h-[70vh] overflow-hidden rounded-2xl border border-neutral-200 ring ring-neutral-300 ring-offset-4 md:ring-offset-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src={aboutVideo}
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      {/* Brand logo grid */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 mt-8 sm:mt-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          Brands We Work With.
        </h2>
        <BrandWithUs />
      </div>
    </div>
  );
};

export default WhoWeAre;
