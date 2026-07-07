import ContactDetails from "@/components/pages/Contact/ContactDetails";
import ContactHero from "@/components/pages/Contact/ContactHero";
import ContactLocationMap from "@/components/pages/Contact/ContactLocationMap";
import SectionDivider from "@/components/ui/SectionDivider";

export default function ContactUs() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <ContactHero />
      <SectionDivider />
      <ContactDetails />
      <SectionDivider />
      <ContactLocationMap />
      <SectionDivider />
    </main>
  );
}
