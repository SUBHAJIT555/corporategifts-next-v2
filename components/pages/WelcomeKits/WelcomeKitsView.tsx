"use client";

import { useCallback, useState, type ReactNode } from "react";
import Image from "next/image";
import SectionDivider from "@/components/ui/SectionDivider";
import {
  candyContactButtonClasses,
  candyWhatsAppButtonClasses,
} from "@/components/ui/candy-button";
import { Reveal, RevealSection } from "@/components/ui/timeline-animation";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utilts";
import {
  CLOSING,
  CUSTOM_BOX,
  FAQ_DATA,
  HERO,
  IMPRESSION,
  KIT_OPTIONS,
  QUOTE_FORM_ID,
  TRUST_ITEMS,
  UAE_COVERAGE,
  URGENT,
  WHATSAPP_WELCOME_KIT_MESSAGE,
  WHY,
} from "./data";
import {
  BoltIcon,
  BriefcaseIcon,
  BrushIcon,
  BuildingIcon,
  ChevronIcon,
  ClockIcon,
  GiftIcon,
  HelpIcon,
  LeafIcon,
  MapPinIcon,
  NotebookIcon,
  PackageIcon,
  PackagesIcon,
  StarIcon,
  UsersIcon,
} from "./icons";
import WelcomeKitQuoteForm from "./WelcomeKitQuoteForm";

const sectionClass =
  "mx-auto max-w-7xl border-x border-hairline px-5 py-8 sm:px-6 sm:py-10 lg:py-12";

const badgeClass =
  "inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]";

const KIT_MEDIA = [
  {
    src: "/images/welcome-kits/onboarding.jpg",
    alt: "Open notebook with a fountain pen on a desk",
    icon: UsersIcon,
  },
  {
    src: "/images/welcome-kits/boxes.jpg",
    alt: "Stacked blue and white gift boxes tied with ribbon",
    icon: BriefcaseIcon,
  },
  {
    src: "/images/welcome-kits/journal.jpg",
    alt: "Plain white notebook on a wooden table",
    icon: BrushIcon,
  },
  {
    src: "/images/welcome-kits/eco.jpg",
    alt: "Matte green reusable water bottle",
    icon: LeafIcon,
  },
] as const;

const IMPRESSION_ICONS = [
  UsersIcon,
  BriefcaseIcon,
  GiftIcon,
  BuildingIcon,
  StarIcon,
] as const;

const WHY_ICONS = [
  PackagesIcon,
  BrushIcon,
  PackageIcon,
  GiftIcon,
  ClockIcon,
] as const;

const WHY_COLORS = [
  "bg-[#C1D8FD] dark:bg-[#C1D8FD]/15",
  "bg-[#FFF7BD] dark:bg-[#FFF7BD]/15",
  "bg-[#FFD6F8] dark:bg-[#FFD6F8]/15",
  "bg-[#B6E9C8] dark:bg-[#B6E9C8]/15",
  "bg-[#E0F7FA] dark:bg-[#E0F7FA]/15",
] as const;

const TRUST = [
  { label: TRUST_ITEMS[0], icon: BrushIcon, bg: WHY_COLORS[0] },
  { label: TRUST_ITEMS[1], icon: PackagesIcon, bg: WHY_COLORS[2] },
  { label: TRUST_ITEMS[2], icon: MapPinIcon, bg: WHY_COLORS[4] },
  { label: TRUST_ITEMS[3], icon: ClockIcon, bg: WHY_COLORS[1] },
] as const;

function Badge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className={badgeClass}>
      <span className="text-brand-accent">{icon}</span>
      {label}
    </span>
  );
}

function QuoteLink({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <a
      href={`#${QUOTE_FORM_ID}`}
      onClick={(event) => {
        const target = document.getElementById(QUOTE_FORM_ID);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className={cn(
        candyContactButtonClasses("w-full sm:w-auto"),
        "text-center",
        className,
      )}
    >
      {children}
    </a>
  );
}

function WhatsAppLink({ children }: { children: string }) {
  return (
    <a
      href={getWhatsAppUrl(WHATSAPP_WELCOME_KIT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(candyWhatsAppButtonClasses("w-full sm:w-auto"), "text-center")}
    >
      {children}
    </a>
  );
}

export default function WelcomeKitsView() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((current) => (current === index ? null : index));
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas">
      <section className="w-full bg-canvas">
        <RevealSection className="relative mx-auto max-w-7xl overflow-hidden border-x border-hairline px-3 pt-20 pb-10 sm:px-4 sm:pt-24 sm:pb-12 md:px-6 md:pt-32 md:pb-14 lg:pt-36">
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.14,
                pointerEvents: "none",
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, var(--primary) 3px, var(--primary) 4px)",
                maskImage: "linear-gradient(to bottom, #000 0%, transparent 75%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 0%, transparent 75%)",
              }}
            />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Reveal animationNum={0} className="flex justify-center">
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface-card px-2.5 py-1 text-[11px] font-medium text-body shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.12)] sm:px-3 sm:text-caption dark:shadow-[8px_2px_16px_-2px_rgba(0,0,0,0.35)]">
                <span className="text-brand-accent">
                  <GiftIcon size={14} />
                </span>
                Welcome kits
              </span>
            </Reveal>
            <Reveal
              as="h1"
              animationNum={1}
              className="mt-4 text-display-lg text-ink sm:mt-5 md:text-display-xl"
            >
              {HERO.title.split(" - ")[0]} -{" "}
              <span className="text-brand-accent">{HERO.title.split(" - ")[1]}</span>
            </Reveal>
            <Reveal
              as="p"
              animationNum={2}
              className="mx-auto mt-4 max-w-3xl text-body-md text-muted sm:mt-6 sm:text-[17px] sm:leading-7"
            >
              {HERO.lead}
            </Reveal>
            <Reveal
              as="p"
              animationNum={3}
              className="mx-auto mt-4 max-w-3xl text-body-md text-muted sm:text-[17px] sm:leading-7"
            >
              {HERO.body}
            </Reveal>
            <Reveal
              as="p"
              animationNum={4}
              className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-muted"
            >
              {HERO.note}
            </Reveal>
            <Reveal
              animationNum={5}
              className="mt-5 flex w-full flex-col gap-2.5 sm:mt-7 sm:flex-row sm:items-center sm:justify-center sm:gap-3"
            >
              <QuoteLink>{HERO.quoteCta}</QuoteLink>
              <WhatsAppLink>{HERO.whatsappCta}</WhatsAppLink>
            </Reveal>
            <Reveal animationNum={6} className="mt-8 sm:mt-10">
              <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3">
                {TRUST_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-dashed border-hairline bg-surface-card px-2.5 py-1 text-[11px] font-medium text-body sm:text-caption"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </RevealSection>
      </section>

      <SectionDivider />

      <section className="w-full overflow-x-hidden bg-canvas">
        <RevealSection className={sectionClass}>
          <Reveal animationNum={0}>
            <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-soft">
              <ul className="grid grid-cols-1 divide-y divide-hairline sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
                {TRUST.map(({ label, icon: ItemIcon, bg }, index) => (
                  <li
                    key={label}
                    className={cn(
                      "flex items-center gap-3 bg-canvas px-4 py-4 sm:px-5 sm:py-5",
                      index > 0 && "sm:border-l sm:border-hairline",
                      index >= 2 && "sm:border-t sm:border-hairline lg:border-t-0",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline text-ink",
                        bg,
                      )}
                    >
                      <ItemIcon size={18} />
                    </span>
                    <span className="text-sm font-medium leading-snug text-ink">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </RevealSection>
      </section>

      <SectionDivider />

      <section className="w-full overflow-x-hidden bg-canvas">
        <RevealSection className={sectionClass}>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <Reveal animationNum={0}>
                <Badge icon={<UsersIcon size={14} />} label="First impression" />
              </Reveal>
              <Reveal as="h2" animationNum={1} className="mt-4 text-display-md text-ink">
                {IMPRESSION.title}
              </Reveal>
              <Reveal
                as="p"
                animationNum={2}
                className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7"
              >
                {IMPRESSION.body}
              </Reveal>
              <ul className="mt-5 space-y-2.5">
                {IMPRESSION.points.map((point, index) => {
                  const ItemIcon = IMPRESSION_ICONS[index];
                  return (
                    <li
                      key={point}
                      className="flex items-center gap-3 py-1.5 text-sm text-ink sm:text-[15px]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface-soft text-brand-accent">
                        <ItemIcon size={18} />
                      </span>
                      {point}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6">
                <QuoteLink>{IMPRESSION.cta}</QuoteLink>
              </div>
            </div>
            <Reveal animationNum={3} className="relative">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-hairline bg-surface-card">
                <Image
                  src="/images/welcome-kits/team.jpg"
                  alt="Team seated around a conference table in an office"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </RevealSection>
      </section>

      <SectionDivider />

      <section className="w-full overflow-x-hidden bg-canvas">
        <RevealSection className={sectionClass}>
          <Reveal animationNum={0} className="mx-auto mb-6 max-w-4xl text-center sm:mb-8">
            <Badge icon={<PackageIcon size={14} />} label="Kit options" />
            <h2 className="mt-4 text-display-md text-ink">{KIT_OPTIONS.title}</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {KIT_OPTIONS.cards.map((card, index) => {
              const media = KIT_MEDIA[index];
              return (
                <Reveal
                  key={card.title}
                  animationNum={1 + index}
                  as="article"
                  className="group flex h-full flex-col rounded-xl border border-hairline bg-canvas p-2.5 sm:p-3"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface-card">
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-1 pt-3 pb-1 sm:px-1.5 sm:pt-4">
                    <h3 className="text-sm font-semibold leading-snug text-ink sm:text-[15px]">
                      {card.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
                      {card.body}
                    </p>
                    <QuoteLink className="mt-3 h-auto min-h-11 w-full whitespace-normal px-3 py-2.5 text-xs sm:w-full sm:text-sm">
                      {card.cta}
                    </QuoteLink>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </RevealSection>
      </section>

      <SectionDivider />

      <section className="w-full overflow-x-hidden bg-canvas">
        <RevealSection className={sectionClass}>
          <Reveal animationNum={0} className="mx-auto mb-6 max-w-4xl text-center sm:mb-8">
            <Badge icon={<NotebookIcon size={14} />} label="Custom box" />
            <h2 className="mt-4 text-display-md text-ink">{CUSTOM_BOX.title}</h2>
            <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
              {CUSTOM_BOX.body}
            </p>
          </Reveal>
          <Reveal animationNum={1} className="mx-auto max-w-5xl">
            <ul className="flex flex-col gap-3 md:hidden">
              {CUSTOM_BOX.rows.map(([item, customization]) => (
                <li
                  key={item}
                  className="rounded-2xl border border-hairline bg-canvas p-4"
                >
                  <p className="text-base font-semibold text-ink">{item}</p>
                  <div className="mt-3 border-t border-hairline pt-3">
                    <p className="text-caption text-muted">{CUSTOM_BOX.columns[1]}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-body">
                      {customization}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hidden overflow-hidden rounded-2xl border border-hairline bg-surface-soft md:block">
              <div className="grid grid-cols-2 gap-4 border-b border-hairline bg-canvas px-5 py-3.5 text-sm font-semibold text-ink">
                {CUSTOM_BOX.columns.map((column) => (
                  <span key={column}>{column}</span>
                ))}
              </div>
              <ul>
                {CUSTOM_BOX.rows.map(([item, customization], index) => (
                  <li
                    key={item}
                    className={
                      index < CUSTOM_BOX.rows.length - 1
                        ? "border-b border-hairline bg-canvas"
                        : "bg-canvas"
                    }
                  >
                    <div className="grid grid-cols-2 items-start gap-4 px-5 py-5">
                      <p className="text-base font-semibold text-ink">{item}</p>
                      <p className="text-body-md leading-relaxed text-muted">
                        {customization}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <div className="mt-8 flex justify-center">
            <QuoteLink>{CUSTOM_BOX.cta}</QuoteLink>
          </div>
        </RevealSection>
      </section>

      <SectionDivider />

      <section className="w-full overflow-x-hidden bg-canvas">
        <RevealSection className={sectionClass}>
          <Reveal animationNum={0} className="mx-auto mb-6 max-w-4xl text-center sm:mb-8">
            <Badge icon={<BoltIcon size={14} />} label="48 hours" />
            <h2 className="mt-4 text-display-md text-ink">{URGENT.title}</h2>
            <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
              {URGENT.body}
            </p>
          </Reveal>
          <div className="mx-auto max-w-3xl">
            <ol className="relative space-y-0">
              {URGENT.steps.map((step, index) => (
                <Reveal
                  key={step}
                  animationNum={1 + index}
                  as="li"
                  className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5"
                >
                  {index < URGENT.steps.length - 1 ? (
                    <span
                      className="absolute top-10 bottom-0 left-[17px] w-px bg-hairline sm:left-[19px]"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-brand-accent/10 text-sm font-semibold text-brand-accent sm:h-10 sm:w-10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1 rounded-xl border border-hairline bg-canvas p-4 sm:p-5">
                    <p className="text-lg font-semibold leading-snug text-ink sm:text-xl">
                      {step}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-6 text-muted">{URGENT.note}</p>
          </div>
          <Reveal
            animationNum={1 + URGENT.steps.length}
            className="mt-8 flex flex-col items-center justify-center sm:mt-10"
          >
            <QuoteLink>{URGENT.cta}</QuoteLink>
          </Reveal>
        </RevealSection>
      </section>

      <SectionDivider />

      <section className="w-full overflow-x-hidden bg-canvas">
        <RevealSection className={sectionClass}>
          <Reveal animationNum={0} className="mx-auto mb-6 max-w-4xl text-center sm:mb-8">
            <Badge icon={<MapPinIcon size={14} />} label="UAE delivery" />
            <h2 className="mt-4 text-display-md text-ink">{UAE_COVERAGE.title}</h2>
            <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
              {UAE_COVERAGE.body}
            </p>
          </Reveal>
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {UAE_COVERAGE.points.map((point, index) => (
              <li
                key={point}
                className={cn(
                  "flex items-center gap-3 rounded-2xl bg-surface-soft px-4 py-4 sm:px-5",
                  index < 3 ? "lg:col-span-2" : "lg:col-span-3",
                  index === UAE_COVERAGE.points.length - 1 && "sm:col-span-2",
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline text-ink",
                    WHY_COLORS[index % WHY_COLORS.length],
                  )}
                >
                  <MapPinIcon size={18} />
                </span>
                <span className="text-sm font-medium leading-snug text-ink sm:text-[15px]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <QuoteLink>{UAE_COVERAGE.cta}</QuoteLink>
          </div>
        </RevealSection>
      </section>

      <SectionDivider />

      <section className="w-full overflow-x-hidden bg-canvas">
        <RevealSection className={sectionClass}>
          <Reveal animationNum={0} className="mx-auto mb-6 max-w-4xl text-center sm:mb-8">
            <Badge icon={<StarIcon size={14} />} label="Why Baharnani" />
            <h2 className="mt-4 text-display-md text-ink">{WHY.title}</h2>
          </Reveal>
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {WHY.points.map((point, index) => {
              const ItemIcon = WHY_ICONS[index];
              return (
                <li
                  key={point}
                  className="flex gap-3 rounded-2xl border border-hairline bg-canvas p-4 sm:p-5"
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-hairline text-ink",
                      WHY_COLORS[index],
                    )}
                  >
                    <ItemIcon size={20} />
                  </span>
                  <p className="text-sm leading-6 text-ink sm:text-[15px]">{point}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex justify-center">
            <QuoteLink>{WHY.cta}</QuoteLink>
          </div>
        </RevealSection>
      </section>

      <SectionDivider />

      <section className="w-full overflow-x-hidden bg-canvas">
        <RevealSection className={sectionClass}>
          <Reveal animationNum={0} className="mx-auto mb-2 max-w-4xl text-center sm:mb-3">
            <Badge icon={<HelpIcon size={14} />} label="FAQ" />
            <h2 className="mt-4 text-display-md text-ink">Frequently Asked Questions</h2>
          </Reveal>
          <div className="mx-auto max-w-4xl">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.id}
                  className={cn(index < FAQ_DATA.length - 1 && "border-b border-hairline")}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left transition-colors hover:text-brand-accent sm:py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="flex-1 text-base font-semibold leading-snug text-ink sm:text-[17px]">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "text-muted transition-transform duration-300",
                        isOpen && "rotate-180 text-brand-accent",
                      )}
                    >
                      <ChevronIcon size={20} />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 text-body-md text-muted sm:pb-5">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealSection>
      </section>

      <SectionDivider />

      <section id={QUOTE_FORM_ID} className="w-full scroll-mt-24 bg-canvas">
        <RevealSection className={sectionClass}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-display-md text-ink">{CLOSING.title}</h2>
            <p className="mt-4 text-body-md text-muted sm:text-[17px] sm:leading-7">
              {CLOSING.body}
            </p>
            <div className="mt-6 flex w-full flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3">
              <WhatsAppLink>{CLOSING.whatsappCta}</WhatsAppLink>
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-surface-card p-5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-8">
            <WelcomeKitQuoteForm />
          </div>
        </RevealSection>
      </section>
      <SectionDivider />
    </main>
  );
}
