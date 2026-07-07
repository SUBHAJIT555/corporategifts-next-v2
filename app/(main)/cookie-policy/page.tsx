"use client";

import CommonHero from "@/components/ui/CommonHero";
import useInView from "@/hooks/useInView";

const CookiePolicy = () => {
  const { ref: contentRef, inView: isContentInView } =
    useInView<HTMLDivElement>({
      once: true,
      rootMargin: "-50px",
    });

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Dashed Center Fade Grid (sticky background) */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
          backgroundSize: "5px 5px",
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
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
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
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Page content */}
      <div className="relative z-10">
        <CommonHero
          title="Cookie Policy"
          titlesuffix=""
          subtitle="This Cookie Policy explains how Baharnani Advertising L.L.C uses cookies and similar tracking technologies on our website. By continuing to browse or use our Website, you consent to the use of cookies as described below."
          buttonLink="#"
          buttonText="Get in Touch"
        />
        <div
          ref={contentRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 transition-all duration-700 ease-out transform ${
            isContentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="prose prose-lg max-w-none">
            {/* Last Updated */}
            <p className="text-sm md:text-base text-neutral-700 font-switzer mb-8 border border-neutral-300 bg-neutral-100 w-fit ring ring-neutral-200 ring-offset-2 rounded-xl px-4 py-2">
              <strong>Last Updated:</strong> September 16, 2024
            </p>

            <div className="bg-white border border-neutral-300 ring ring-neutral-200 ring-offset-2 md:ring-offset-4 p-6 md:p-8 rounded-xl">
              {/* Section 1: Introduction */}
              <section className="mb-10 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor mb-4 md:mb-6">
                  1. INTRODUCTION
                </h2>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed mb-4">
                  This <strong>Cookie Policy</strong> explains how{" "}
                  <strong>Baharnani Advertising L.L.C</strong> (&quot;we&quot;, &quot;our&quot;, or
                  &quot;us&quot;) uses cookies and similar tracking technologies on our
                  website{" "}
                  <a
                    href="https://corporategiftsdubaii.ae"
                    className="text-[#0f5c85] hover:underline "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://corporategiftsdubaii.ae
                  </a>{" "}
                  (&quot;Website&quot;).
                </p>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed mb-4">
                  By continuing to browse or use our Website, you consent to the use
                  of cookies as described below.
                </p>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                  You can manage or disable cookies anytime through your browser
                  settings.
                </p>
              </section>

              {/* Section 2: What Are Cookies */}
              <section className="mb-10 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor mb-4 md:mb-6">
                  2. WHAT ARE COOKIES
                </h2>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed mb-4">
                  Cookies are small text files stored on your device (computer,
                  tablet, or smartphone) when you visit a website.
                </p>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                  They help websites function properly, remember preferences, and
                  analyze user activity for performance and improvement.
                </p>
              </section>

              {/* Section 3: Types of Cookies We Use */}
              <section className="mb-10 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor mb-4 md:mb-6">
                  3. TYPES OF COOKIES WE USE
                </h2>

                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-sentient font-semibold text-textcolor mb-4">
                    a. Essential Cookies
                  </h3>
                  <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                    These cookies are required for the basic operation of our
                    Website -such as page navigation, security verification, and
                    form submission.
                  </p>
                  <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                    Disabling them may cause parts of the site to stop functioning
                    correctly.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-sentient font-semibold text-textcolor mb-4">
                    b. Performance & Analytics Cookies
                  </h3>
                  <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                    We use cookies (e.g., Google Analytics) to understand how
                    visitors interact with our Website -pages visited, time spent,
                    and referral sources.
                  </p>
                  <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                    This helps us improve our content and user experience.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-sentient font-semibold text-textcolor mb-4">
                    c. Functional Cookies
                  </h3>
                  <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                    These cookies remember your preferences -such as language
                    choice or form inputs -so that your experience is smoother on
                    return visits.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-sentient font-semibold text-textcolor mb-4">
                    d. Marketing & Third-Party Cookies
                  </h3>
                  <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                    Occasionally, third-party tools (e.g., embedded maps, social
                    media links, or YouTube videos) may set cookies to track
                    engagement or view counts.
                  </p>
                  <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                    We do not control these cookies directly.
                  </p>
                </div>
              </section>

              {/* Section 4: Managing or Disabling Cookies */}
              <section className="mb-10 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor mb-4 md:mb-6">
                  4. MANAGING OR DISABLING COOKIES
                </h2>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed mb-4">
                  You can control cookie behavior through your browser settings:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg font-switzer text-textcolor leading-relaxed ml-4 mb-4">
                  <li>
                    <strong>Google Chrome:</strong> Settings → Privacy & Security →
                    Cookies and Other Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy
                  </li>
                  <li>
                    <strong>Microsoft Edge / Firefox:</strong> Settings → Privacy &
                    Security
                  </li>
                </ul>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed mb-4">
                  You can choose to block, delete, or restrict cookies.
                </p>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                  Please note that disabling certain cookies may affect the
                  Website&apos;s performance or functionality.
                </p>
              </section>

              {/* Section 5: Third-Party Tools and Services */}
              <section className="mb-10 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor mb-4 md:mb-6">
                  5. THIRD-PARTY TOOLS AND SERVICES
                </h2>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed mb-4">
                  We may integrate analytics, advertising, or embedded services that
                  use cookies, such as:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg font-switzer text-textcolor leading-relaxed ml-4 mb-4">
                  <li>
                    <strong>Google Analytics</strong> (traffic measurement)
                  </li>
                  <li>
                    <strong>Google Maps</strong> (location display)
                  </li>
                  <li>
                    <strong>Social Media Widgets</strong> (LinkedIn, Instagram,
                    Facebook links)
                  </li>
                </ul>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed mb-4">
                  Each third-party service follows its own privacy and cookie
                  policy.
                </p>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                  We recommend reviewing their individual policies for more details.
                </p>
              </section>

              {/* Section 6: Updates to This Policy */}
              <section className="mb-10 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor mb-4 md:mb-6">
                  6. UPDATES TO THIS POLICY
                </h2>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed mb-4">
                  We may revise this Cookie Policy periodically to reflect changes
                  in technology, legal requirements, or our operations.
                </p>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed mb-4">
                  Any updates will be posted on this page with a revised &quot;Last
                  Updated&quot; date.
                </p>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed">
                  Your continued use of our Website implies acceptance of the
                  updated version.
                </p>
              </section>

              {/* Section 7: Contact Us */}
              <section className="mb-10 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sentient font-semibold text-textcolor mb-4 md:mb-6">
                  7. CONTACT US
                </h2>
                <p className="text-base md:text-lg font-switzer text-textcolor leading-relaxed mb-6">
                  For any questions regarding our Cookie Policy or data practices,
                  please reach out to:
                </p>
                <div className="border border-neutral-300 rounded-xl bg-neutral-100 ring ring-neutral-200 ring-offset-2 md:ring-offset-4 p-6 md:p-8">
                  <p className="text-lg md:text-xl font-sentient font-semibold text-textcolor mb-4">
                    Baharnani Advertising L.L.C
                  </p>
                  <p className="text-base md:text-lg font-switzer text-textcolor mb-2">
                    Al Quoz – Al Quoz 3 – Dubai
                  </p>
                  <p className="text-base md:text-lg font-switzer text-textcolor mb-2">
                    Dubai, إمارة دبيّ 49757
                  </p>
                  <p className="text-base md:text-lg font-switzer text-textcolor mb-2">
                    United Arab Emirates
                  </p>
                  <p className="text-base md:text-lg font-switzer text-textcolor mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center align-middle w-8 h-8 text-textcolor border border-neutral-300 bg-neutral-100 ring ring-neutral-200 ring-offset-2 rounded-lg p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone-outgoing">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2c-8.072 -.49 -14.51 -6.928 -15 -15a2 2 0 0 1 2 -2" />
                        <path d="M15 5h6" />
                        <path d="M18.5 7.5l2.5 -2.5l-2.5 -2.5" />
                      </svg>
                    </span>
                    <strong>Phone:</strong>{" "}
                    <a
                      href="tel:+97143805587"
                      className="text-[#0F5C85] font-semibold hover:underline"
                    >
                      (+971) 4 380 5587
                    </a>
                  </p>
                  <p className="text-base md:text-lg font-switzer text-textcolor flex items-center gap-2">
                    <span className="inline-flex items-center justify-center align-middle w-8 h-8 text-textcolor border border-neutral-300 bg-neutral-100 ring ring-neutral-200 ring-offset-2 rounded-lg p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail-share">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M13 19h-8a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6" />
                        <path d="M3 7l9 6l9 -6" />
                        <path d="M16 22l5 -5" />
                        <path d="M21 21.5v-4.5h-4.5" />
                      </svg>
                    </span>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:info@baharnani.com"
                      className="text-[#0F5C85] font-semibold hover:underline"
                    >
                      info@baharnani.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CookiePolicy;
