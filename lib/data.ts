export const siteConfig = {
  name: "expocityhills.ae",
  domain: "https://expocityhills.ae",
  title:
    "Expo City Hills 1 by Dubai South | Eco-Luxury Residences — Expo Hills, Expo City Dubai",
  description:
    "Expo City Hills 1 — two low-rise eco-luxury buildings (1A & 1B) in the Expo Hills district of Expo City Dubai, by Dubai South Properties. 1, 2 & 3-bed planned residences. Pre-launch. Register now.",
  disclaimer:
    "This website is an independent marketing portal and is not officially affiliated with Dubai South Properties or Expo City Dubai. All content is sourced from expocitydubai.com and publicly available project information for informational purposes. Project details, prices, and timelines are subject to change.",
};

export const ogImage = "/assets/og-share.webp";
export const ogImageVersion = "20260905a";

export const getInTouch = {
  short: "Get in touch for current pricing and availability.",
  long: "Pricing and floor plans for Expo City Hills 1 are confirmed directly with registered buyers. Register below and we will walk you through current availability for your preferred building (1A or 1B) and unit type.",
};

export const heroImage = "/assets/hero-aerial.webp";
export const heroImageAlt =
  "Expo City Hills 1 aerial view placeholder — eco-luxury low-rise residences in Expo Hills district, Expo City Dubai";

export const locationMap = {
  src: "/assets/location-map.webp",
  alt: "Expo City Hills 1 location map — Expo Road and E311 intersection, Expo Hills district, Expo City Dubai",
};

export const project = {
  name: "Expo City Hills 1",
  entity: "Expo City Hills",
  developer: "Dubai South Properties",
  district: "Expo Hills",
  masterPlan: "Expo City Dubai",
  location:
    "Intersection of Expo Road (E77) and Sheikh Mohammed Bin Zayed Road (E311), Expo Hills district, Expo City Dubai",
  status: "Pre-Launch / Planned",
  milestone: "DLD first trace: February 2026",
  totalUnits: "~864",
  totalUnitsNote:
    "Across 1A and 1B combined — pre-construction estimate, no confirmed per-building split published",
  projectValue: "AED 950,000,000",
  projectValueNote:
    "Developer-submitted pre-construction estimate (~USD 258.7M — not a per-unit price signal)",
  architecture: "Eco-friendly, low-rise, sustainable design",
  geo: {
    latitude: 24.9614,
    longitude: 55.1482,
  },
  h1: "Expo City Hills 1 — Eco-Luxury Residences in Expo Hills, Expo City Dubai",
  subheading: "Dubai South Properties · Expo Hills District · Expo City Dubai",
  tagline:
    "Low-rise eco-luxury residences in Expo Hills — tranquil living with open spaces and skyline views.",
};

export const heroPills = [
  { value: "~864 Homes", label: "Across 1A & 1B" },
  { value: "1, 2 & 3-Bed", label: "Planned unit types" },
  { value: "Pre-Launch", label: "DLD trace Feb 2026" },
  { value: "Eco-Luxury", label: "Low-Rise Design" },
];

export const stats = heroPills;

export const whatWeKnowIntro =
  "Expo City Hills 1 is a pre-launch residential development by Dubai South Properties — two low-rise buildings (1A and 1B) planned for the Expo Hills district of Expo City Dubai, at the intersection of Expo Road (E77) and Sheikh Mohammed Bin Zayed Road (E311). The development is estimated at approximately 864 homes across 1A and 1B, with a submitted project value of AED 950 million. Pricing, payment plan, and handover dates have not been publicly released — they are confirmed directly with registered buyers. The project's DLD first trace was recorded in February 2026.";

export const confirmedFactsRows: [string, string][] = [
  ["Project name", project.name],
  ["Developer", project.developer],
  ["Project entity", project.entity],
  ["Location", project.location],
  ["Sub-buildings", "1A and 1B"],
  ["Estimated total homes", `~864 (${project.totalUnitsNote})`],
  ["Project value (submitted)", `${project.projectValue} (${project.projectValueNote})`],
  ["Architecture", project.architecture],
  ["Unit types planned", "1, 2, and 3-bedroom residences (pre-launch marketing categories — DLD-confirmed unit-type breakdown not yet published)"],
  ["Status", project.status],
  ["DLD first trace", "February 2026"],
  ["Pricing", getInTouch.short],
  ["Payment plan", getInTouch.short],
  ["Handover", getInTouch.short],
];

export const buildings = [
  {
    slug: "expo-city-hills-1a",
    name: "Expo City Hills 1A",
    shortName: "1A",
    status: "Pre-Launch / Planned",
    image: "/assets/building-1a.webp",
    cardImage: "/assets/building-1a.webp",
    cardAlt:
      "Expo City Hills 1A exterior placeholder render, Expo Hills district, Expo City Dubai",
    imageAlt:
      "Expo City Hills 1A exterior placeholder render, Expo Hills district, Expo City Dubai",
    tagline: "Part of Expo City Hills 1 (~864 homes est.)",
    description:
      "Expo City Hills 1A is one of two planned low-rise buildings within the Expo City Hills 1 development. Per-building unit counts have not been published separately.",
    overviewImage: "/assets/building-1a.webp",
  },
  {
    slug: "expo-city-hills-1b",
    name: "Expo City Hills 1B",
    shortName: "1B",
    status: "Pre-Launch / Planned",
    image: "/assets/building-1b.webp",
    cardImage: "/assets/building-1b.webp",
    cardAlt:
      "Expo City Hills 1B exterior placeholder render, Expo Hills district, Expo City Dubai",
    imageAlt:
      "Expo City Hills 1B exterior placeholder render, Expo Hills district, Expo City Dubai",
    tagline: "Part of Expo City Hills 1 (~864 homes est.)",
    description:
      "Expo City Hills 1B is one of two planned low-rise buildings within the Expo City Hills 1 development. Per-building unit counts have not been published separately.",
    overviewImage: "/assets/building-1b.webp",
  },
] as const;

export type BuildingSlug = (typeof buildings)[number]["slug"];

export const plannedUnitTypes = [
  { type: "1-bedroom", label: "1 Bedroom", status: "Planned", size: "Sizes not yet published" },
  { type: "2-bedroom", label: "2 Bedroom", status: "Planned", size: "Sizes not yet published" },
  { type: "3-bedroom", label: "3 Bedroom", status: "Planned", size: "Sizes not yet published" },
];

export const unitTypesCaveat =
  "These are pre-launch marketing categories confirmed by Dubai South Properties — not a DLD-confirmed unit-type breakdown. Detailed sizes, per-building availability, and pricing are released directly to registered buyers. Get in touch to be registered.";

export const amenitiesGrouped = [
  {
    title: "Wellness",
    items: ["Leisure pool", "Jogging tracks", "Fitness center"],
  },
  {
    title: "Family & Community",
    items: ["Children's play areas", "Retail shops", "Green areas"],
  },
  {
    title: "Security & Sustainability",
    items: ["24/7 advanced security", "Eco architecture"],
  },
];

export const lifestyleTiles = [
  {
    label: "Leisure Pool",
    slug: "leisure-pool",
    image: "/assets/lifestyle-pool.webp",
    alt: "Expo City Hills 1 leisure pool amenity, Expo Hills district, Expo City Dubai",
  },
  {
    label: "Green Areas",
    slug: "green-areas",
    image: "/assets/lifestyle-green.webp",
    alt: "Expo City Hills 1 green areas and open spaces, Expo Hills district, Expo City Dubai",
  },
  {
    label: "Jogging Tracks",
    slug: "jogging-tracks",
    image: "/assets/lifestyle-tracks.webp",
    alt: "Expo City Hills 1 jogging tracks through green space, Expo City Dubai",
  },
  {
    label: "Eco Architecture",
    slug: "eco-architecture",
    image: "/assets/lifestyle-eco.webp",
    alt: "Expo City Hills 1 eco-friendly low-rise architecture, Expo Hills district, Expo City Dubai",
  },
];

export const locationDistances = [
  { destination: "Al Forsan Park", distance: "0.7 km" },
  { destination: "Expo City Dubai core", distance: "1.0 km" },
  { destination: "International schools", distance: "3.3 km" },
  { destination: "Al Maktoum International Airport", distance: "~10 minutes" },
  { destination: "Sheikh Mohammed Bin Zayed Road (E311)", distance: "Direct access" },
];

export const expoDistricts = [
  "Expo Downtown",
  "Expo Business",
  "Expo Hills",
  "Expo Valley",
  "Expo Fields",
];

export const aboutDeveloper = {
  title: "Expo City Hills 1 by Dubai South Properties",
  paragraphs: [
    "Dubai South Properties is developing Expo City Hills 1 — low-rise eco-luxury residences within the Expo Hills district of Expo City Dubai. The project entity is registered as Expo City Hills, with an estimated 864 homes planned across two sub-buildings (1A and 1B).",
    "Dubai South is the master developer behind Dubai South, the 145 sq km planned city adjacent to Al Maktoum International Airport — designed for up to one million residents and expected to generate over 25% of Dubai's GDP by 2030. Expo City sits within the Dubai South development zone, making Dubai South Properties the sovereign master developer for this location.",
  ],
  image: "/assets/expo-hills-district.webp",
  imageAlt:
    "Expo Hills district within Expo City Dubai — tranquil living with open spaces and skyline views",
};

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Buildings", href: "/#buildings" },
  { label: "Amenities", href: "/#amenities" },
  { label: "Location", href: "/#location" },
];

export const footerLinks = [
  { label: "Brochure", href: "/brochure" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Price List", href: "/price-list" },
  { label: "Payment Plan", href: "/payment-plan" },
  { label: "Master Plan", href: "/master-plan" },
];

export const SUBPAGE_SLUGS = [
  "brochure",
  "floor-plans",
  "payment-plan",
  "price-list",
] as const;

export type SubpageSlug = (typeof SUBPAGE_SLUGS)[number];

export const SUBPAGE_LABELS: Record<SubpageSlug, string> = {
  brochure: "Brochure",
  "floor-plans": "Floor Plans",
  "payment-plan": "Payment Plan",
  "price-list": "Price List",
};

export const defaultCrumbs = [{ name: "Home", path: "/" }];

export function getBuildingBySlug(slug: string) {
  return buildings.find((b) => b.slug === slug);
}

export function isValidSubpage(slug: string): slug is SubpageSlug {
  return SUBPAGE_SLUGS.includes(slug as SubpageSlug);
}

export function isValidBuilding(slug: string): slug is BuildingSlug {
  return buildings.some((b) => b.slug === slug);
}

export function getBuildingResourceLinks(slug: BuildingSlug) {
  return SUBPAGE_SLUGS.map((sub) => ({
    label: SUBPAGE_LABELS[sub],
    href: `/${slug}/${sub}`,
  }));
}

export function getProjectResourceLinks() {
  return SUBPAGE_SLUGS.map((sub) => ({
    label: SUBPAGE_LABELS[sub],
    href: `/${sub}`,
  }));
}

export const contentImages = [
  heroImage,
  ...buildings.map((b) => b.image),
  ...lifestyleTiles.map((t) => t.image),
  locationMap.src,
  "/assets/gallery-1.webp",
  "/assets/gallery-2.webp",
  "/assets/gallery-3.webp",
  "/assets/gallery-4.webp",
  "/assets/interior-living.webp",
  "/assets/interior-kitchen.webp",
  ogImage,
];
