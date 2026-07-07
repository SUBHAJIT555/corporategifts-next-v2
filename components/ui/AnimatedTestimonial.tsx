"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};
export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = useCallback(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const handlePrev = useCallback(() => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay, handleNext]);
    return (
        <RevealSection>
            <Reveal animationNum={0}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor text-center">
                    What  {" "}
                    Our Clients Say
                </h2>
            </Reveal>
            <Reveal animationNum={1}>
            <div className="mx-auto max-w-sm px-4 py-10 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
                <div className="relative grid grid-cols-1 md:gap-20 md:grid-cols-2">
                    <div>
                        <div className="relative h-80 w-full overflow-hidden sm:overflow-visible">
                            <AnimatePresence>
                                {testimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            scale: 0.9,
                                            z: -100,
                                            rotate: 0,
                                        }}
                                        animate={{
                                            opacity: isActive(index) ? 1 : 0.7,
                                            scale: isActive(index) ? 1 : 0.95,
                                            z: isActive(index) ? 0 : -100,
                                            rotate: 0,
                                            zIndex: isActive(index)
                                                ? 30
                                                : testimonials.length + 2 - index,
                                            y: isActive(index) ? [0, -80, 0] : 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.9,
                                            z: 50,
                                            rotate: 0,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeInOut",
                                        }}
                                        className="absolute inset-0 origin-bottom m-3"
                                    >
                                        <Image
                                            src={testimonial.src}
                                            alt={testimonial.name}
                                            width={500}
                                            height={500}
                                            draggable={false}
                                            className="h-full w-full rounded-3xl border border-neutral-200 ring ring-neutral-300 ring-offset-3 md:ring-offset-6 object-cover object-center"
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between py-4">
                        <motion.div
                            key={active}
                            initial={{
                                y: 20,
                                opacity: 0,
                            }}
                            animate={{
                                y: 0,
                                opacity: 1,
                            }}
                            exit={{
                                y: -20,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }}
                        >
                            <h3 className="text-2xl  text-textcolor font-sentient font-semibold">
                                {testimonials[active].name}
                            </h3>
                            <p className="text-sm text-dark font-switzer">
                                {testimonials[active].designation}
                            </p>
                            <motion.p className="mt-8 text-sm sm:text-base md:text-lg text-textcolor font-switzer font-normal">
                                {testimonials[active].quote.split(" ").map((word, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{
                                            filter: "blur(10px)",
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeInOut",
                                            delay: 0.02 * index,
                                        }}
                                        className="inline-block"
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.p>
                        </motion.div>
                        <div className="flex gap-4 pt-12 md:pt-0 justify-center md:justify-start">
                            <button
                                onClick={handlePrev}
                                className="group/button inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-textcolor font-switzer text-xs sm:text-sm border border-neutral-200 rounded-xl bg-neutral-100 hover:bg-white transition-opacity"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 sm:h-5 sm:w-5 text-[#0F5C85] transition-transform duration-300 group-hover/button:rotate-12"
                                    aria-hidden="true"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12h6m3 0h1.5m3 0h.5" />
                                    <path d="M5 12l6 6" />
                                    <path d="M5 12l6 -6" />
                                </svg>
                                <span className="hidden sm:inline text-textcolor font-switzer font-semibold">
                                    Previous
                                </span>
                            </button>
                            <button
                                onClick={handleNext}
                                className="group/button inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-textcolor font-switzer text-xs sm:text-sm border border-neutral-200 rounded-xl bg-neutral-100 hover:bg-white transition-opacity"
                            >
                                <span className="hidden sm:inline text-textcolor font-switzer font-semibold">Next</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 sm:h-5 sm:w-5 text-[#0F5C85] transition-transform duration-300 group-hover/button:-rotate-12"
                                    aria-hidden="true"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12h.5m3 0h1.5m3 0h6" />
                                    <path d="M13 18l6 -6" />
                                    <path d="M13 6l6 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </Reveal>
        </RevealSection>
    );
};
