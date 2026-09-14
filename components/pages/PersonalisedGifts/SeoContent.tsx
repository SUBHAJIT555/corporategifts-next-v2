"use client";

import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";

function ContentLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <NoPrefetchLink
      href={href}
      className="font-medium text-brand-accent underline decoration-brand-accent/30 underline-offset-2 transition-colors hover:decoration-brand-accent"
    >
      {children}
    </NoPrefetchLink>
  );
}

/** Inner categories bento spans on a 6-col grid:
 *  1 → col-span-4 | 2 → col-span-2
 *  3–5 → col-span-2 each
 *  6–7 → col-span-3 each
 */
const CATEGORY_BLOCKS = [
  {
    n: 1,
    title: "Executive and Leadership Gifts",
    body: "Create personalised corporate gifts for directors, senior managers, board members and strategic partners with premium pens, card holders, notebooks, leather-look accessories, travel pieces and selected technology products. Initials, individual names and subtle logo placement work particularly well for senior recipients.",
    span: "md:col-span-4",
  },
  {
    n: 2,
    title: "Employee Welcome and Recognition Kits",
    body: "Build joining kits and employee appreciation packs with notebooks, reusable drinkware, laptop accessories, desk products and welcome cards. These corporate gift boxes can be segmented by team level, location or milestone, helping HR and people teams give a more relevant experience without rebuilding the entire campaign from scratch.",
    span: "md:col-span-2",
  },
  {
    n: 3,
    title: "Client Appreciation Gifts",
    body: "For long-term clients, renewals, project completions or business anniversaries, choose fewer products and improve the quality of each one. A custom gift set with a premium pen, desk accessory, card holder or smart gadget can feel more valuable than a large collection of low-use items.",
    span: "md:col-span-2",
  },
  {
    n: 4,
    title: "Event, Conference and Exhibition Gifts",
    body: "For higher-volume campaigns, focus on compact products that are easy to distribute and genuinely useful. Branded notebooks, drinkware, tote bags, charging accessories and travel products can be packed into lightweight gift boxes or reusable bags, depending on the event format and budget.",
    span: "md:col-span-2",
  },
  {
    n: 5,
    title: "Travel and Mobile-Work Gifts",
    body: "Passport holders, laptop bags, backpacks, luggage accessories, power banks and cable organisers work well for frequent travellers and hybrid teams. Our bags and travel gifts can also be combined with stationery or technology items to create a practical mobility-focused kit.",
    span: "md:col-span-2",
  },
  {
    n: 6,
    title: "Sustainable and Eco-Conscious Gift Sets",
    body: "Use recycled notebooks, reusable drinkware, bamboo accessories, RPET bags and other eco-conscious products when sustainability is relevant to the campaign. The best personalised corporate gifts in this category connect the product material, packaging and message so the sustainability theme feels coherent.",
    span: "md:col-span-3",
  },
  {
    n: 7,
    title: "Hygiene and Wellness Packs",
    body: "A promotional hygiene gift set can be used for workplace wellness campaigns, travel packs, field teams, events or seasonal care initiatives. Depending on your approved product range, a kit may combine hygiene essentials with a pouch, reusable bottle, towel, notebook or wellness accessory. Keep the contents practical, clearly labelled and appropriate for the recipient environment.",
    span: "md:col-span-3",
  },
] as const;

/**
 * Outer SeoContent bento on a 6-col grid (md+):
 *  Brand-first → col-span-3 | Personalisation → col-span-3
 *  Recipient-led → col-span-6
 *  Categories → col-span-6 (inner 7-item mini-bento)
 *  Branding methods → col-span-6
 * Mobile: single column (all col-span-1 / full width).
 */
function SectionBlock({
  badge,
  title,
  children,
  animationNum,
  className = "",
}: {
  badge: string;
  title: string;
  children: ReactNode;
  animationNum: number;
  className?: string;
}) {
  return (
    <Reveal
      animationNum={animationNum}
      className={`flex h-full flex-col rounded-2xl border border-hairline bg-canvas p-5 sm:p-7 md:p-8 ${className}`}
    >
      <span className="mb-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-2 text-caption font-medium text-body">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-accent" />
        {badge}
      </span>
      <h2 className="mb-4 text-display-sm text-ink sm:text-display-md">{title}</h2>
      <div className="space-y-4 text-body-md text-body sm:text-[17px] sm:leading-7">
        {children}
      </div>
    </Reveal>
  );
}

export default function SeoContent() {
  return (
    <section className="w-full overflow-x-hidden bg-canvas">
      <RevealSection className="mx-auto max-w-7xl border-x border-hairline px-5 py-8 sm:px-6 sm:py-6 lg:py-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-6">
          <SectionBlock
            badge="Brand-first gifting"
            title="Custom Gifts That Look Like Your Brand, Not Generic Merchandise"
            animationNum={0}
            className="md:col-span-3"
          >
            <p>
              A memorable business gift should do more than carry a logo. It
              should match the recipient, the occasion and the way your brand
              wants to be remembered. Our approach to personalised corporate
              gifts starts with the purpose of the campaign, then narrows the
              product, personalisation method, packaging and quantity so the
              final gift feels considered rather than mass-produced.
            </p>
            <p>
              If you are comparing{" "}
              <ContentLink href="/">customized gifts Dubai</ContentLink>{" "}
              businesses can use for employee recognition, client appreciation,
              product launches, conferences or festive campaigns, start with
              usefulness. A product that stays on a desk, travels with the
              recipient or becomes part of a daily routine usually delivers
              stronger recall than a novelty item that is used once.
            </p>
          </SectionBlock>

          <SectionBlock
            badge="Personalisation"
            title="What Can You Personalise?"
            animationNum={1}
            className="md:col-span-3"
          >
            <p>
              Choose individual products or combine several items into a
              coordinated gifting experience. Popular options include executive
              pens, notebooks and diaries, engraved drinkware, card holders,
              wallets, passport covers, luggage tags, laptop bags, backpacks,
              wireless chargers, power banks, USB accessories, desk organisers,
              apparel, eco-friendly products and ready-to-present gift boxes.
            </p>
            <p>
              For professional desk-based campaigns, our{" "}
              <ContentLink href="/product-category/office-and-stationary">
                office and stationery gifts
              </ContentLink>{" "}
              include notebooks, pens, organisers and business accessories that
              can be matched with branding and packaging. For sustainability-led
              campaigns,{" "}
              <ContentLink href="/product-category/eco-friendly">
                eco-friendly corporate gifts
              </ContentLink>{" "}
              can support a more responsible gifting theme with reusable and
              recycled-material options.
            </p>
          </SectionBlock>

          <SectionBlock
            badge="Recipient-led boxes"
            title="Corporate Gift Boxes Built Around the Recipient"
            animationNum={2}
            className="md:col-span-6"
          >
            <p>
              The strongest{" "}
              <ContentLink href="/product-category/premium-gift-sets">
                corporate gift boxes
              </ContentLink>{" "}
              are not simply containers filled with unrelated products. They are
              built around a clear recipient and use case. A client appreciation
              box may combine a premium pen, card holder and desk accessory. An
              employee welcome box may include a notebook, bottle and technology
              item. A travel-focused box can bring together a passport holder,
              luggage tag and charging accessory.
            </p>
            <p>
              For executive gifting, you can also move up to{" "}
              <ContentLink href="/product-category/luxury-corporate-gifts-dubai">
                luxury corporate gifts in Dubai
              </ContentLink>{" "}
              when the relationship calls for premium materials, restrained
              branding and a more elevated presentation. The objective is to
              create a gift that looks appropriate for the recipient rather than
              forcing every audience into the same package.
            </p>
          </SectionBlock>

          <Reveal
            animationNum={3}
            className="flex h-full flex-col rounded-2xl border border-hairline bg-canvas p-5 sm:p-7 md:col-span-6 md:p-8"
          >
            <span className="mb-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-2 text-caption font-medium text-body">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-accent" />
              Categories
            </span>
            <h2 className="mb-6 text-display-sm text-ink sm:text-display-md">
              Popular Personalised Gift Categories for Businesses
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-6">
              {CATEGORY_BLOCKS.map((block) => (
                <article
                  key={block.title}
                  className={`flex flex-col rounded-xl border border-hairline bg-surface-soft p-4 sm:p-5 ${block.span}`}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-dashed border-hairline bg-surface-card text-caption font-semibold text-brand-accent"
                    >
                      {block.n}
                    </span>
                    <h3 className="text-lg font-semibold text-ink sm:text-xl">
                      {block.title}
                    </h3>
                  </div>
                  <p className="text-body-md text-muted sm:text-[17px] sm:leading-7">
                    {block.body}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>

          <SectionBlock
            badge="Branding methods"
            title="Personalisation Options: From Logo Branding to Individual Names"
            animationNum={4}
            className="md:col-span-6"
          >
            <p>
              Different products require different branding methods. Depending
              on the item and material, suitable options can include laser
              engraving, UV printing, screen printing, debossing, DTF printing,
              custom messages, individual names and branded packaging. The best
              method is the one that preserves the product finish while keeping
              your identity clear.
            </p>
            <p>
              For personalised corporate gifts, we recommend matching the
              branding level to the audience. A mass-event giveaway can carry
              stronger logo visibility, while an executive item often looks
              better with smaller branding, the recipient&apos;s initials or a
              branded outer box. This keeps the gift useful beyond the campaign
              itself.
            </p>
          </SectionBlock>
        </div>
      </RevealSection>
    </section>
  );
}
