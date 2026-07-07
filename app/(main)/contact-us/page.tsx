
import ContactDetails from "@/components/pages/Contact/ContactDetails";
import CommonHero from "@/components/ui/CommonHero";

export default function ContactUs() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Dashed Center Fade Grid (sticky background) - same as about-us */}
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
          title=" "
          titleLine2Before="Connect With Dubai's"
          titleLine2Highlight="Premier Corporate Gift "
          titleLine2After=" Supplier"
          titlesuffix=""
          subtitle="Ready to elevate your corporate gifting? Our team is here to help with custom gift solutions, bulk orders, branding inquiries, and partnership opportunities. Get in touch today and let's create memorable gifts that strengthen your business relationships."
          buttonLink="#get-free-quote"
          buttonText="Get in Touch With Us"
        />
        <ContactDetails />
      </div>
    </main>
  );
}
