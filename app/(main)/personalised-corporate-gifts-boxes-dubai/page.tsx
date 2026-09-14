import CallToAction from "@/components/ui/CallToAction";
import SectionDivider from "@/components/ui/SectionDivider";
import PremiumGiftSetsFAQ from "@/components/pages/ProductCategory/PremiumGiftSets/PremiumGiftSetsFAQ";
import PersonalisedGiftsHero from "@/components/pages/PersonalisedGifts/Hero";
import GiftTypeGrid from "@/components/pages/PersonalisedGifts/GiftTypeGrid";
import TrustStrip from "@/components/pages/PersonalisedGifts/TrustStrip";
import SeoContent from "@/components/pages/PersonalisedGifts/SeoContent";
import BudgetTable from "@/components/pages/PersonalisedGifts/BudgetTable";
import AffordableGiftsCopy from "@/components/pages/PersonalisedGifts/AffordableGiftsCopy";
import BuildAndProcess from "@/components/pages/PersonalisedGifts/BuildAndProcess";
import WhyBaharnani from "@/components/pages/PersonalisedGifts/WhyBaharnani";
import SelectionGuide from "@/components/pages/PersonalisedGifts/SelectionGuide";
import {
  CONTACT_QUOTE_HREF,
  FAQ_DATA,
  WHATSAPP_PAGE_MESSAGE,
} from "@/components/pages/PersonalisedGifts/data";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function PersonalisedCorporateGiftsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <PersonalisedGiftsHero />
      <SectionDivider />
      <GiftTypeGrid />
      <SectionDivider />
      <TrustStrip />
      <SectionDivider />
      <WhyBaharnani />
      <SectionDivider />
      <BudgetTable />
      <SectionDivider />
      <AffordableGiftsCopy />
      <SectionDivider />
      <BuildAndProcess />
      <SectionDivider />
      <SeoContent />
      <SectionDivider />
      <SelectionGuide />
      <SectionDivider />
      <PremiumGiftSetsFAQ
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about personalised business gifting, branding and bulk quotes in Dubai."
        faqData={FAQ_DATA}
      />
      <SectionDivider />
      <CallToAction
        title="Create a Gift People Will Actually Want to Keep"
        headlineBottomText="Good business gifting is not about adding more items. It is about choosing the right items and presenting them well."
        subtitle={
          <>
            Tell us the audience, budget, quantity and occasion, and we can help
            you shape a practical gifting direction that is easy to approve and
            execute.
          </>
        }
        infoBoxBullets={[
          "Logo branding, name personalisation and premium packaging options.",
          "Curated sets for clients, employees, executives and events.",
          "Bulk-order support with Dubai & UAE delivery coordination.",
        ]}
        buttons={[
          {
            text: "Request Bulk Quote",
            link: CONTACT_QUOTE_HREF,
            variant: "contact",
          },
          {
            text: "Get Gift Suggestions",
            link: getWhatsAppUrl(WHATSAPP_PAGE_MESSAGE),
            target: "_blank",
            rel: "noopener noreferrer",
            variant: "whatsapp",
          },
        ]}
      />
      <SectionDivider />
    </main>
  );
}
