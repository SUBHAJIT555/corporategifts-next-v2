import TermsAndConditionClient from "@/components/pages/TNC/TNC";
import SectionDivider from "@/components/ui/SectionDivider";

export default function TermsAndConditions() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <TermsAndConditionClient />
      <SectionDivider />
    </main>
  );
}
