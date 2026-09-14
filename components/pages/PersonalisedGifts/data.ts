import type { FAQItem } from "@/components/common/FAQ";

export type GiftFilter =
  | "All"
  | "Employees"
  | "Clients"
  | "Executives"
  | "Events"
  | "Budget"
  | "Premium"
  | "Eco"
  | "Tech";

export type GiftTypeCard = {
  id: string;
  title: string;
  benefit: string;
  image: string;
  imageAlt: string;
  href: string;
  filters: GiftFilter[];
};

export const GIFT_FILTERS: GiftFilter[] = [
  "All",
  "Employees",
  "Clients",
  "Executives",
  "Events",
  "Budget",
  "Premium",
  "Eco",
  "Tech",
];

/** Distinct local assets — one unique path per gift-type card. */
const IMG = {
  luxuryProduct:
    "/assets/images/product-page-images/Luxury-Corporate-Gifts.webp",
  premiumProduct:
    "/assets/images/product-page-images/Premium-Gift-Sets.webp",
  premiumHome:
    "/assets/images/Home-page-hero-images/Premiums-gift-sets.webp",
  techProduct:
    "/assets/images/product-page-images/Technology-and-Accessories.webp",
  eatingProduct:
    "/assets/images/product-page-images/Eating-and-Drinking.webp",
  officeProduct:
    "/assets/images/product-page-images/Office-and-Stationary.webp",
  bagsProduct: "/assets/images/product-page-images/Bags-and-Travel.webp",
  luxuryHome:
    "/assets/images/Home-page-hero-images/Luxury-corporate-gifts.webp",
  ecoProduct: "/assets/images/product-page-images/Eco-Friendly.webp",
  bagsHome: "/assets/images/Home-page-hero-images/Bags-&-travel.webp",
  premiumHero:
    "/assets/images/Products-hero-image/Premiums-gift-sets.webp",
  officeHome:
    "/assets/images/Home-page-hero-images/Office-&-stationary.webp",
  sportsHome:
    "/assets/images/Home-page-hero-images/Sports-&-recreation.webp",
  sportsProduct:
    "/assets/images/product-page-images/Sports-and-Recreation.webp",
  eatingHome:
    "/assets/images/Home-page-hero-images/Eating-&-drinking.webp",
  apparelProduct:
    "/assets/images/product-page-images/Apparel-and-Accessories.webp",
  officeHero:
    "/assets/images/Products-hero-image/Office-&-stationary.webp",
  productHero: "/assets/images/Hero and footer image/product-hero.webp",
} as const;

const CAT = {
  luxury: "/product-category/luxury-corporate-gifts-dubai",
  premium: "/product-category/premium-gift-sets",
  tech: "/product-category/technology-and-accessories",
  eating: "/product-category/eating-and-drinking",
  office: "/product-category/office-and-stationary",
  bags: "/product-category/bags-and-travel",
  eco: "/product-category/eco-friendly",
  sports: "/product-category/sports-and-recreation",
  apparel: "/product-category/apparel-and-accessories",
  shop: "/shop",
} as const;

export const GIFT_TYPE_CARDS: GiftTypeCard[] = [
  {
    id: "executive-sets",
    title: "Executive Name-Personalised Sets",
    benefit: "Pen, card holder and notebook for directors and VIP clients.",
    image: IMG.luxuryProduct,
    imageAlt: "Executive name-personalised corporate gift set",
    href: CAT.luxury,
    filters: ["Executives", "Premium", "Clients"],
  },
  {
    id: "employee-welcome",
    title: "Custom Employee Welcome Kits",
    benefit: "Notebook, bottle and desk accessory for onboarding teams.",
    image: IMG.premiumProduct,
    imageAlt: "Custom employee welcome gift kit",
    href: CAT.premium,
    filters: ["Employees"],
  },
  {
    id: "client-appreciation",
    title: "Client Appreciation Boxes",
    benefit: "Premium pen, desk item and thank-you card for renewals.",
    image: IMG.premiumHome,
    imageAlt: "Client appreciation corporate gift box",
    href: CAT.premium,
    filters: ["Clients", "Premium"],
  },
  {
    id: "technology-sets",
    title: "Custom Technology Sets",
    benefit: "Power bank, wireless charger and tech pouch for modern teams.",
    image: IMG.techProduct,
    imageAlt: "Custom technology corporate gift set",
    href: CAT.tech,
    filters: ["Tech", "Executives", "Events"],
  },
  {
    id: "drinkware",
    title: "Personalised Drinkware",
    benefit: "Bottles, tumblers and mugs with logo or individual names.",
    image: IMG.eatingProduct,
    imageAlt: "Personalised corporate drinkware gifts",
    href: CAT.eating,
    filters: ["Employees", "Events", "Budget"],
  },
  {
    id: "office-stationery",
    title: "Custom Office & Stationery Sets",
    benefit: "Notebook, pen, organiser and card holder for B2B audiences.",
    image: IMG.officeProduct,
    imageAlt: "Custom office and stationery gift set",
    href: CAT.office,
    filters: ["Employees", "Clients", "Budget"],
  },
  {
    id: "travel-sets",
    title: "Travel Gift Sets",
    benefit: "Passport cover, luggage tag, bag and power bank for travellers.",
    image: IMG.bagsProduct,
    imageAlt: "Travel-focused corporate gift set",
    href: CAT.bags,
    filters: ["Clients", "Executives", "Events"],
  },
  {
    id: "luxury-vip",
    title: "Luxury VIP Gift Boxes",
    benefit: "Premium accessories with restrained branding for high-value partners.",
    image: IMG.luxuryHome,
    imageAlt: "Luxury VIP corporate gift box",
    href: CAT.luxury,
    filters: ["Premium", "Executives", "Clients"],
  },
  {
    id: "eco-sets",
    title: "Eco-Friendly Gift Sets",
    benefit: "Recycled notebook, bamboo pen, reusable bottle and RPET bag.",
    image: IMG.ecoProduct,
    imageAlt: "Eco-friendly corporate gift set",
    href: CAT.eco,
    filters: ["Eco", "Employees", "Events"],
  },
  {
    id: "bags-backpacks",
    title: "Custom Bags & Backpacks",
    benefit: "Laptop bags, backpacks, totes and pouches for teams and events.",
    image: IMG.bagsHome,
    imageAlt: "Custom branded bags and backpacks",
    href: CAT.bags,
    filters: ["Employees", "Events", "Tech"],
  },
  {
    id: "event-giveaways",
    title: "Event & Conference Giveaway Sets",
    benefit: "Portable notebook, bottle, cable and tote for exhibitions.",
    image: IMG.premiumHero,
    imageAlt: "Event and conference giveaway gift set",
    href: CAT.premium,
    filters: ["Events", "Budget"],
  },
  {
    id: "budget-sets",
    title: "Budget Business Gift Sets",
    benefit: "Notebook and pen or bottle and card for controlled bulk costs.",
    image: IMG.officeHome,
    imageAlt: "Budget business corporate gift set",
    href: CAT.office,
    filters: ["Budget", "Employees", "Events"],
  },
  {
    id: "hygiene-kits",
    title: "Promotional Hygiene / Care Kits",
    benefit: "Approved hygiene essentials with pouch for workplace and travel.",
    image: IMG.sportsHome,
    imageAlt: "Promotional hygiene and care gift kit",
    href: CAT.sports,
    filters: ["Employees", "Events", "Budget"],
  },
  {
    id: "wellness-kits",
    title: "Wellness & Lifestyle Kits",
    benefit: "Bottle, towel, journal and lifestyle accessory for engagement.",
    image: IMG.sportsProduct,
    imageAlt: "Wellness and lifestyle corporate gift kit",
    href: CAT.sports,
    filters: ["Employees", "Eco"],
  },
  {
    id: "festive-boxes",
    title: "Festive Corporate Gift Boxes",
    benefit: "Curated products, message card and themed sleeve for seasons.",
    image: IMG.eatingHome,
    imageAlt: "Festive corporate gift box with themed packaging",
    href: CAT.premium,
    filters: ["Clients", "Employees", "Premium"],
  },
  {
    id: "apparel-packs",
    title: "Custom Apparel Packs",
    benefit: "Polo, T-shirt or cap plus accessory for teams and activations.",
    image: IMG.apparelProduct,
    imageAlt: "Custom corporate apparel gift pack",
    href: CAT.apparel,
    filters: ["Employees", "Events"],
  },
  {
    id: "desk-productivity",
    title: "Desk Productivity Sets",
    benefit: "Mousepad, organiser, notebook and pen for hybrid office teams.",
    image: IMG.officeHero,
    imageAlt: "Desk productivity corporate gift set",
    href: CAT.office,
    filters: ["Employees", "Budget", "Tech"],
  },
  {
    id: "build-your-own",
    title: "Build-Your-Own Box",
    benefit: "Choose 1 hero product plus 2–3 supporting items for your brief.",
    image: IMG.productHero,
    imageAlt: "Build-your-own custom corporate gift box",
    href: CAT.shop,
    filters: ["Premium", "Clients", "Executives", "Employees"],
  },
];

export const BUDGET_ROWS = [
  {
    level: "Value-focused",
    combination: "Notebook + pen / drinkware + message card",
    suitedTo: "Large employee or event quantities",
  },
  {
    level: "Mid-range",
    combination: "Notebook + bottle + tech accessory",
    suitedTo: "Employee recognition / clients",
  },
  {
    level: "Premium",
    combination: "Pen + card holder + smart accessory + box",
    suitedTo: "Important clients / speakers",
  },
  {
    level: "Executive",
    combination:
      "Premium accessories + individual personalisation + elevated packaging",
    suitedTo: "Leadership / VIP relationships",
  },
] as const;

export const BUILD_STEPS = [
  {
    step: "01",
    title: "Define the brief",
    description:
      "Recipient, occasion, quantity, per-person budget and delivery date.",
  },
  {
    step: "02",
    title: "Shortlist products",
    description:
      "Choose one primary gift and two or three supporting products.",
  },
  {
    step: "03",
    title: "Select branding",
    description:
      "Logo treatment, engraving, printing, names or messages.",
  },
  {
    step: "04",
    title: "Approve presentation",
    description:
      "Confirm how items are arranged before bulk production.",
  },
  {
    step: "05",
    title: "Confirm packaging",
    description:
      "Boxes, sleeves, cards or bags — then proceed to production.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Share the Brief",
    description:
      "Tell us who the gifts are for, the occasion, quantity, approximate budget, preferred product type and delivery timeline.",
  },
  {
    step: "02",
    title: "Shortlist the Right Products",
    description:
      "We narrow the options by use case rather than sending an unfocused catalogue. This can include office gifts, drinkware, bags, technology products, premium sets, eco-friendly products or a promotional hygiene gift set when the campaign calls for it.",
  },
  {
    step: "03",
    title: "Select Branding and Personalisation",
    description:
      "Choose the suitable logo treatment, engraving, printing, name personalisation, message or packaging treatment according to the item and audience.",
  },
  {
    step: "04",
    title: "Confirm the Gift Presentation",
    description:
      "Decide whether the campaign needs individual packaging, coordinated gift boxes, reusable bags, sleeves, cards or another presentation format.",
  },
  {
    step: "05",
    title: "Approve and Proceed With the Bulk Order",
    description:
      "Once the selected products, branding details, quantity and delivery requirements are confirmed, the order can move forward with a clear specification for production and delivery coordination.",
  },
] as const;

export const WHY_POINTS = [
  {
    id: 1,
    number: "01",
    title: "Wide product range under one brief",
    description:
      "Compare affordable promotional items, premium accessories and custom gift combinations without sourcing every component from a different vendor.",
    iconColor: "#C1D8FD",
  },
  {
    id: 2,
    number: "02",
    title: "Custom branding that fits the audience",
    description:
      "Logo branding, name personalisation and packaging treatments matched to mass events, employee kits or executive gifts.",
    iconColor: "#FFF7BD",
  },
  {
    id: 3,
    number: "03",
    title: "Gift packaging and presentation",
    description:
      "Coordinated boxes, sleeves, cards and bags so the finished gift looks intentional, not assembled at the last minute.",
    iconColor: "#B6E9C8",
  },
  {
    id: 4,
    number: "04",
    title: "Bulk-order and UAE delivery support",
    description:
      "One plan for audience, quantity, branding, packaging and delivery — from small executive runs to larger employee or event campaigns.",
    iconColor: "#FFD6F8",
  },
] as const;

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "What are the best personalised business gifts for clients?",
    answer:
      "Useful options include premium pens, notebooks, card holders, travel accessories, drinkware, desk products, smart accessories and curated corporate gift boxes. The best choice depends on the client relationship, occasion, budget and how the gift will be used.",
  },
  {
    id: 2,
    question: "Can you add individual names as well as our company logo?",
    answer:
      "Personalisation can include names, initials, messages and company branding where the selected product and decoration method support it. For important recipients, individual names or initials can make the gift feel more personal than logo-only branding.",
  },
  {
    id: 3,
    question: "Can we create branded corporate gift boxes for employees?",
    answer:
      "Yes. Employee boxes can be designed around onboarding, anniversaries, recognition, return-to-office programs, team events or festive campaigns, with products selected according to role, budget and quantity.",
  },
  {
    id: 4,
    question: "What is a good custom gift set for executives?",
    answer:
      "A strong executive combination may include a premium pen, notebook, card holder, travel accessory or selected technology product. Keep the number of products limited and focus on finish, personalisation and presentation.",
  },
  {
    id: 5,
    question: "Do you offer affordable options for bulk gifting?",
    answer:
      "Yes. Affordable personalized business gifts can be built by using practical core products, consistent branding and simplified packaging, then reserving premium personalisation for higher-value recipient groups when required.",
  },
  {
    id: 6,
    question: "What information should we send for a quote?",
    answer:
      "Share the recipient type, quantity, approximate budget per gift, preferred products, branding requirement, packaging preference and required delivery date. A complete brief makes it faster to shortlist the right options.",
  },
];

export const WHATSAPP_PAGE_MESSAGE =
  "Hi! I'm interested in custom gift boxes and personalised business gifts in Dubai. I'd like gift suggestions for my budget, quantity and delivery date.";

/** Contact form anchor used site-wide on the contact page. */
export const CONTACT_QUOTE_HREF = "/contact-us#get-free-quote";

export const SELECTION_INTENTS = [
  {
    title: "Employee onboarding",
    description:
      "Useful day-to-day products for welcome kits and recognition packs.",
  },
  {
    title: "Client appreciation",
    description:
      "Fewer products, stronger presentation for renewals and milestones.",
  },
  {
    title: "Executive gifting",
    description:
      "Premium restraint — finish, personalisation and packaging matter most.",
  },
  {
    title: "Events & conferences",
    description:
      "Portable, useful items that are easy to distribute at volume.",
  },
] as const;
