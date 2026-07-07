"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { FluentFormApi } from "@/lib/api/endpoints";
import { FluentFormPayload } from "@/lib/api/types";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FcGoogle,
  TbBrandWhatsapp,
} from "@/components/icons";
import Loading from "@/components/ui/Loading";
import {
  candyAccentIconClasses,
  candyDarkButtonClasses,
  candyIconButtonClasses,
} from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utilts";


type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
  website: string;
};

const inputClassName = cn(
  "w-full rounded-lg border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink",
  "placeholder:text-muted",
  "transition-colors focus:border-brand-accent/40 focus:outline-none focus:ring-2 focus:ring-brand-accent/20",
);

const labelClassName = "mb-1.5 block text-sm font-medium text-ink";

const contactLinks = [
  {
    icon: Mail,
    title: "Email",
    items: [
      { href: "mailto:hemant@baharnani.com", label: "hemant@baharnani.com" },
      { href: "mailto:info@baharnani.com", label: "info@baharnani.com" },
    ],
  },
  {
    icon: Phone,
    title: "Phone",
    items: [
      {
        href: "tel:+971556545950",
        label: "(+971) 55 654 5950",
      },
      { href: "tel:+97143805587", label: "(+971) 4 380 5587 — Landline" },
    ],
  },
  {
    icon: TbBrandWhatsapp,
    title: "WhatsApp",
    items: [
      {
        href: "https://wa.me/971556545950",
        label: "(+971) 55 654 5950",
      },
    ],
  },
  {
    icon: MapPin,
    title: "Address",
    items: [
      {
        href: "https://www.google.com/maps/place/Baharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai/@25.1626598,55.2318626,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!8m2!3d25.1626598!4d55.2344375!16s%2Fg%2F11c6vx_dg7?entry=ttu",
        label:
          "Baharnani Advertising L.L.C, Al Quoz – Al Quoz 3 – Dubai, Dubai, إمارة دبيّ 49757, UAE",
      },
    ],
  },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/BAHARNANIADV",
    icon: FaFacebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/baharnaniadv/",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/baharnaniadvertisingdubai/",
    icon: FaLinkedinIn,
    label: "LinkedIn",
  },
  {
    href: "https://www.google.com/maps/place/Baharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai/@25.1625624,55.2303193,16z/data=!4m16!1m7!3m6!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!2sBaharnani+Advertising+LLC+-+Corporate+gifts+Company+Dubai+%7C+Exhibition+stand+Contractors+Dubai!8m2!3d25.1625188!4d55.2343055!16s%2Fg%2F11f66tl53w!3m7!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!8m2!3d25.1625188!4d55.2343055!9m1!1b1!16s%2Fg%2F11f66tl53w?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D",
    icon: FcGoogle,
    label: "Google Maps",
  },
];

const ContactDetails = () => {
  const router = useRouter();
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

  const [submitStatus, setSubmitStatus] = useState<null | "error">(null);
  const [message, setMessage] = useState("");
  const [isSubmittingApi, setIsSubmittingApi] = useState(false);

  const onSubmit = async (data: FormData) => {
    setSubmitStatus(null);

    if (data.website) {
      reset();
      return;
    }

    const payload = {
      data: {
        names: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
        email: data.email,
        phone: data.phone,
        subject: "Contact Form Submission",
        message: data.message,
      },
    };

    try {
      setIsSubmittingApi(true);
      const response = await FluentFormApi.submitForm3(
        payload as FluentFormPayload,
      );
      setMessage(response.message);
      reset();
      router.push("/thank-you");
    } catch (error) {
      setSubmitStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmittingApi(false);
    }
  };

  const isBusy = isSubmittingApi || isSubmitting;

  return (
    <section className="w-full bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-6 sm:px-6 sm:py-4 lg:py-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <Reveal animationNum={0} className="h-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="get-free-quote"
              noValidate
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-4 sm:p-6"
            >
              <div className="mb-6 border-b border-hairline pb-4">
                <h2 className="text-base font-semibold text-ink sm:text-lg">
                  Send us a message
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Have a question or something to share? We&apos;ll get back to
                  you shortly.
                </p>
              </div>

              {submitStatus === "error" ? (
                <div className="mb-5 rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
                  {message}
                </div>
              ) : null}

              <div className="flex flex-1 flex-col space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelClassName}>
                      First name <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Enter your first name"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className={cn(
                        inputClassName,
                        errors.firstName && "border-error/50",
                      )}
                    />
                    {errors.firstName ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.firstName.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="lastName" className={labelClassName}>
                      Last name <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Enter your last name"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className={cn(
                        inputClassName,
                        errors.lastName && "border-error/50",
                      )}
                    />
                    {errors.lastName ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.lastName.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={labelClassName}>
                      Email <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={cn(
                        inputClassName,
                        errors.email && "border-error/50",
                      )}
                    />
                    {errors.email ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClassName}>
                      Phone <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number"
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                      className={cn(
                        inputClassName,
                        errors.phone && "border-error/50",
                      )}
                    />
                    {errors.phone ? (
                      <p className="mt-1.5 text-xs text-error">
                        {errors.phone.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClassName}>
                    Message <span className="text-brand-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your gifting needs…"
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className={cn(
                      inputClassName,
                      "min-h-[120px] resize-none",
                      errors.message && "border-error/50",
                    )}
                  />
                  {errors.message ? (
                    <p className="mt-1.5 text-xs text-error">
                      {errors.message.message}
                    </p>
                  ) : null}
                </div>

                <div className="hidden">
                  <input type="text" {...register("website")} tabIndex={-1} />
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    {...register("privacy", { required: true })}
                    className={cn(
                      "mt-0.5 size-4 shrink-0 rounded border-hairline accent-brand-accent",
                      errors.privacy && "border-error",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm leading-relaxed",
                      errors.privacy ? "text-error" : "text-body",
                    )}
                  >
                    I agree with the{" "}
                    <a
                      href="/privacy-policy"
                      className="font-medium text-brand-accent underline underline-offset-2"
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to being contacted about my inquiry.
                  </span>
                </label>
                {errors.privacy ? (
                  <p className="text-xs text-error">
                    You must accept the privacy policy
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isBusy}
                  className={cn(
                    candyDarkButtonClasses("mt-auto w-full gap-2 sm:w-auto"),
                    "disabled:cursor-not-allowed disabled:opacity-60",
                  )}
                >
                  {isBusy ? (
                    <>
                      <Loading size="sm" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal animationNum={1} className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas">
              <div className="border-b border-hairline px-4 py-4 sm:px-6 sm:py-5">
                <h2 className="text-base font-semibold text-ink sm:text-lg">
                  We&apos;re here to help
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Reach our team for creative concepts and premium corporate
                  gifts tailored to your business.
                </p>
              </div>

              <div className="flex-1 space-y-5 px-4 py-5 sm:px-6">
                {contactLinks.map(({ icon: Icon, title, items }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span
                      className={candyIconButtonClasses(
                        "white",
                        "sm",
                        "pointer-events-none shrink-0",
                      )}
                    >
                      <Icon className={candyAccentIconClasses} strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{title}</p>
                      <div className="mt-1.5 space-y-1">
                        {items.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            target={
                              item.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              item.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="block text-sm text-body transition-colors hover:text-brand-accent"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-hairline px-4 py-5 sm:px-6">
                <p className="mb-3 text-sm font-semibold text-ink">
                  Connect with us
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={cn(
                        candyIconButtonClasses("white", "sm"),
                        "text-ink transition-colors hover:text-brand-accent",
                      )}
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>


      </RevealSection>
    </section>
  );
};

export default ContactDetails;
