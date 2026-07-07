"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
// import {
//     FaEnvelope,
//     FaPhone,
//     FaMapMarkerAlt,
//     FaFacebookF,
//     FaInstagram,
//     FaLinkedinIn,
// } from "react-icons/fa";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CTAButton from "@/components/ui/CTAButton";
import { FluentFormApi } from "@/lib/api/endpoints";
import { FluentFormPayload } from "@/lib/api/types";
import { FaFacebook, FaInstagram, FaLinkedinIn, FcGoogle, } from "@/components/icons";



type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    privacy: boolean;
    website: string; // honeypot
};

const ContactDetails = () => {
    const router = useRouter();
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
            privacy: false,
            website: "",
        },
    });

    const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
    const [message, setMessage] = useState<string>("");
    const [isSubmittingApi, setIsSubmittingApi] = useState(false);

    const onSubmit = async (data: FormData) => {
        setSubmitStatus(null);

        // Honeypot check
        if (data.website) {
            reset();
            return;
        }

        const payload = {
            data: {
                names: {
                    first_name: data.firstName,
                    last_name: data.lastName
                },
                email: data.email,
                phone: data.phone,
                subject: "Contact Form Submission",
                message: data.message
            },
        };

        try {
            setIsSubmittingApi(true);
            const response = await FluentFormApi.submitForm3(payload as FluentFormPayload);
            setMessage(response.message);
            setSubmitStatus("success");
            reset();
            router.push("/thank-you");
            setTimeout(() => setSubmitStatus(null), 3000);
        } catch (error) {
            setSubmitStatus("error");
            const errMessage =
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.";
            setMessage(errMessage);
            setTimeout(() => setSubmitStatus(null), 3000);
        } finally {
            setIsSubmittingApi(false);
        }
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 mb-10">
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold  text-textcolor leading-tight"
                >
                    Please reach out to us.
                </motion.h2>
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-textcolor font-switzer font-medium mb-10 max-w-3xl"
                >
                    We&apos;re here to help you with premium corporate gifts, customized
                    promotional items, luxury gift sets, and personalized branding
                    solutions. Reach out to our team for creative concepts and superior
                    quality products tailored to your business needs.
                </motion.p>

                {/* Left-Right Layout: Form & Contact Info (Reversed) */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16 items-start">
                    {/* Left Side: Contact Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="w-full lg:w-1/2 flex flex-col"
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            id="get-free-quote"
                            noValidate
                            className="w-full"

                        >
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor mb-3">
                                Send us a message.
                            </h2>
                            <p className="text-textcolor font-switzer text-base sm:text-lg mb-8">
                                Have a question or something to share? Send us a message. we&apos;ll
                                get back to you shortly!
                            </p>

                            <div className="relative">
                                {/* Success message */}
                                {submitStatus === "success" && (
                                    <div className="text-center py-16 absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-lg z-10">
                                        <div className="text-7xl mb-6">🚀</div>
                                        <p className="text-2xl text-green-700 font-semibold font-switzer">
                                            {message}
                                        </p>
                                    </div>
                                )}

                                {/* Error message */}
                                {submitStatus === "error" && (
                                    <div className="text-center py-16 absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-lg z-10">
                                        <div className="text-7xl mb-6">⚠️</div>
                                        <p className="text-2xl text-red-600 font-semibold mb-4 font-switzer">
                                            Sorry, something went wrong.
                                        </p>
                                        <p className="text-lg font-switzer">{message}</p>
                                    </div>
                                )}

                                {/* Form inputs (shown only when no submit status) */}
                                {submitStatus === null && (
                                    <div className="space-y-6">
                                        {/* Two column grid for first name and last name */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    htmlFor="firstName"
                                                    className="block text-textcolor font-switzer font-semibold mb-2"
                                                >
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    {...register("firstName", {
                                                        required: "First name is required",
                                                    })}
                                                    placeholder="Enter your first name"
                                                    className={`w-full px-4 py-3 border border-neutral-300 ring ring-neutral-200 ring-offset-2 rounded-lg bg-white text-textcolor font-switzer focus:outline-none transition-colors ${errors.firstName
                                                        ? "border-red-500"
                                                        : "border-highlighttext"
                                                        }`}
                                                />
                                                {errors.firstName && (
                                                    <p className="text-red-500 text-sm mt-1 font-switzer">
                                                        {errors.firstName.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="lastName"
                                                    className="block text-textcolor font-switzer font-semibold mb-2"
                                                >
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    {...register("lastName", {
                                                        required: "Last name is required",
                                                    })}
                                                    placeholder="Enter your last name"
                                                    className={`w-full px-4 py-3 border border-neutral-300 ring ring-neutral-200 ring-offset-2 rounded-lg bg-white text-textcolor font-switzer focus:outline-none transition-colors ${errors.lastName
                                                        ? "border-red-500"
                                                        : "border-highlighttext"
                                                        }`}
                                                />
                                                {errors.lastName && (
                                                    <p className="text-red-500 text-sm mt-1 font-switzer">
                                                        {errors.lastName.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Two column grid for email and phone */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-textcolor font-switzer font-semibold mb-2"
                                                >
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^\S+@\S+$/i,
                                                            message: "Invalid email address",
                                                        },
                                                    })}
                                                    placeholder="Enter your email address"
                                                    className={`w-full px-4 py-3 border border-neutral-300 ring ring-neutral-200 ring-offset-2 rounded-lg bg-white text-textcolor font-switzer focus:outline-none transition-colors ${errors.email
                                                        ? "border-red-500"
                                                        : "border-highlighttext"
                                                        }`}
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1 font-switzer">
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="phone"
                                                    className="block text-textcolor font-switzer font-semibold mb-2"
                                                >
                                                    Phone no
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    {...register("phone", {
                                                        required: "Phone is required",
                                                    })}
                                                    placeholder="Enter your phone number"
                                                    className={`w-full px-4 py-3 border border-neutral-300 ring ring-neutral-200 ring-offset-2 rounded-lg bg-white text-textcolor font-switzer focus:outline-none transition-colors ${errors.phone
                                                        ? "border-red-500"
                                                        : "border-highlighttext"
                                                        }`}
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500 text-sm mt-1 font-switzer">
                                                        {errors.phone.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Message field */}
                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="block text-textcolor font-switzer font-semibold mb-2"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                {...register("message", {
                                                    required: "Message is required",
                                                })}
                                                placeholder="Enter your message"
                                                rows={6}
                                                className={`w-full px-4 py-3 border border-neutral-300 ring ring-neutral-200 ring-offset-2 rounded-lg bg-white text-textcolor font-switzer focus:outline-none transition-colors resize-none ${errors.message
                                                    ? "border-red-500"
                                                    : "border-highlighttext"
                                                    }`}
                                            />
                                            {errors.message && (
                                                <p className="text-red-500 text-sm mt-1 font-switzer">
                                                    {errors.message.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Honeypot */}
                                        <div className="hidden">
                                            <input type="text" {...register("website")} />
                                        </div>

                                        {/* Privacy */}
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                {...register("privacy", { required: true })}
                                                className={`w-5 h-5 border-2 transition ${errors.privacy
                                                    ? "border-red-500 accent-red-500"
                                                    : "border-textcolor accent-textcolor"
                                                    }`}
                                            />
                                            <span
                                                className={`text-sm ml-2 font-switzer ${errors.privacy ? "text-red-600" : "text-textcolor"
                                                    }`}
                                            >
                                                I agree with the{" "}
                                                <a
                                                    href="/privacy-policy"
                                                    className="underline text-[#0F5C85] underline-offset-2 decoration-1 decoration-[#0F5C85]"
                                                >
                                                    Privacy Policy
                                                </a>{" "}
                                                and consent to being contacted about my inquiry.
                                            </span>
                                        </div>

                                        {/* Submit */}
                                        <div className="flex justify-start">
                                            <CTAButton
                                                type="submit"
                                                disabled={isSubmittingApi || isSubmitting}
                                                variant="light"
                                                className="font-sentient font-semibold text-xs sm:text-sm md:text-base bg-linear-to-r from-neutral-100 to-neutral-300 ring-1 ring-neutral-200 ring-offset-2 cursor-pointer"
                                                label={isSubmittingApi || isSubmitting ? "Sending..." : "Send Message"}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </motion.div>

                    {/* Right Side: Contact Information & Social Media (Dark Card) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="w-full lg:w-1/2 flex flex-col"
                    >
                        <div className="border border-neutral-300 ring ring-neutral-200 ring-offset-3 md:ring-offset-6 rounded-2xl p-6 sm:p-8 lg:p-10 h-full flex flex-col bg-white">
                            <motion.div variants={fadeInUp} className="mb-8">
                                <h3 className="text-2xl sm:text-3xl font-sentient font-semibold text-textcolor mb-4">
                                    Hi there! We&apos;re always here and happy to help you anytime.
                                </h3>
                            </motion.div>

                            <motion.div
                                variants={staggerContainer}
                                className="space-y-4 mb-8 flex-1"
                            >
                                <motion.div
                                    variants={fadeInUp}
                                    className=" rounded-lg flex items-start gap-4"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-300 ring ring-neutral-200 ring-offset-2 bg-neutral-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F5C85]">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M13 19h-8a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6" />
                                            <path d="M3 7l9 6l9 -6" />
                                            <path d="M16 22l5 -5" />
                                            <path d="M21 21.5v-4.5h-4.5" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-textcolor font-sentient font-semibold mb-1">
                                            Email
                                        </p>
                                        <a
                                            href="mailto:hemant@baharnani.com"
                                            className="text-textcolor font-switzer hover:text-[#0F5C85] transition-colors"
                                        >
                                            hemant@baharnani.com
                                        </a>
                                        <a
                                            href="mailto:info@baharnani.com"
                                            className="text-textcolor font-switzer hover:text-[#0F5C85] transition-colors"
                                        >
                                            info@baharnani.com
                                        </a>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={fadeInUp}
                                    className=" rounded-lg flex items-start gap-4"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-300 ring ring-neutral-200 ring-offset-2 bg-neutral-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F5C85]">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2c-8.072 -.49 -14.51 -6.928 -15 -15a2 2 0 0 1 2 -2" />
                                            <path d="M15 5h6" />
                                            <path d="M18.5 7.5l2.5 -2.5l-2.5 -2.5" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-textcolor font-sentient font-semibold mb-1">
                                            Phone Number
                                        </p>
                                        <a
                                            href="tel:+971556545950"
                                            className="text-textcolor font-switzer hover:text-[#0F5C85] transition-colors"
                                        >
                                            (+971) 55 654 5950 - WhatsApp / Phone Call
                                        </a>
                                        <a
                                            href="tel:+97143805587"
                                            className="text-textcolor font-switzer hover:text-[#0F5C85] transition-colors"
                                        >
                                            (+971) 4 380 5587 - Landline
                                        </a>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={fadeInUp}
                                    className=" rounded-lg flex items-start gap-4"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-300 ring ring-neutral-200 ring-offset-2 bg-neutral-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F5C85]">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 18l-2 -4l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5l-2.901 8.034" />
                                            <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879" />
                                            <path d="M19 18v.01" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-textcolor font-sentient font-semibold mb-1">
                                            Address
                                        </p>
                                        <a
                                            href="https://www.google.com/maps/place/Baharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai/@25.1626598,55.2318626,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!8m2!3d25.1626598!4d55.2344375!16s%2Fg%2F11c6vx_dg7?entry=ttu"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-textcolor font-switzer hover:text-[#0F5C85] transition-colors "
                                        >
                                            Baharnani Advertising L.L.C, Al Quoz – Al Quoz 3 – Dubai,
                                            Dubai, إمارة دبيّ 49757, United Arab Emirates
                                        </a>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <div className="border-t border-neutral-300 pt-6">
                                    <p className="text-textcolor font-sentient font-semibold mb-4">
                                        Connect with us
                                    </p>
                                    <div className="flex gap-4">
                                        <motion.a
                                            href="https://www.facebook.com/BAHARNANIADV"
                                            target="_blank"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group relative text-neutral-700 hover:text-[#0F5C85] transition-colors duration-300 rounded-xl border border-neutral-300 p-1 bg-neutral-100 ring ring-neutral-300 ring-offset-2"
                                        >
                                            <FaFacebook className="size-6" />
                                        </motion.a>
                                        <motion.a
                                            href="https://www.instagram.com/baharnaniadv/"
                                            target="_blank"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group relative text-neutral-700 hover:text-[#0F5C85] transition-colors duration-300 rounded-xl border border-neutral-300 p-1 bg-neutral-100 ring ring-neutral-300 ring-offset-2"
                                        >
                                            <FaInstagram className="size-6" />
                                        </motion.a>
                                        <motion.a
                                            href="https://www.linkedin.com/company/baharnaniadvertisingdubai/"
                                            target="_blank"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group relative text-neutral-700 hover:text-[#0F5C85] transition-colors duration-300 rounded-xl border border-neutral-300 p-1 bg-neutral-100 ring ring-neutral-300 ring-offset-2"
                                        >
                                            <FaLinkedinIn className="size-6" />
                                        </motion.a>
                                        <motion.a
                                            href="https://www.google.com/maps/place/Baharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai/@25.1625624,55.2303193,16z/data=!4m16!1m7!3m6!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!2sBaharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai!8m2!3d25.1625188!4d55.2343055!16s%2Fg%2F11f66tl53w!3m7!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!8m2!3d25.1625188!4d55.2343055!9m1!1b1!16s%2Fg%2F11f66tl53w?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D"
                                            target="_blank"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group relative text-neutral-700 hover:text-[#0F5C85] transition-colors duration-300 rounded-xl border border-neutral-300 p-1 bg-neutral-100 ring ring-neutral-300 ring-offset-2"
                                        >
                                            <FcGoogle className="size-6" />
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Address Section with Google Map */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="w-full"
                >
                    <div className="mb-6">
                        <h3 className="text-2xl font-sentient font-semibold tracking-tight text-textcolor mb-2">
                            Our Address :
                        </h3>
                        <p className="text-lg text-textcolor font-switzer font-medium">
                            Baharnani Advertising L.L.C <br />
                            Al Quoz – Al Quoz 3 – Dubai <br />
                            Dubai, إمارة دبيّ 49757 <br />
                            United Arab Emirates
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full h-[400px] overflow-hidden p-4"
                    >
                        <iframe
                            className="rounded-2xl border border-neutral-300 ring ring-neutral-200 ring-offset-4 shadow-lg"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.2573929!2d55.2318626!3d25.1626598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!2sBaharnani%20Advertising%20LLC%20-%20Corporate%20gifts%20Company%20Dubai%20%7C%20Exhibition%20stand%20Contractors%20Dubai!5e0!3m2!1sen!2som!4v1703837058988!5m2!1sen!2som"
                            style={{
                                height: "100%",
                                width: "100%",
                            }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactDetails;
