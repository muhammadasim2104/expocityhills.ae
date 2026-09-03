export const siteConfig = {
  name: "expocityhills.ae",
  domain: "https://expocityhills.ae",
  title: "Expo City Hills 1 | Pre-Launch Residences — Expo City Dubai",
  description:
    "Expo City Hills 1 by Dubai South Properties — eco-luxury residences in Expo Hills district, Expo City Dubai. See confirmed facts and get in touch for pricing and updates.",
  disclaimer:
    "This website is an independent marketing portal and is not officially affiliated with Dubai South Properties or Expo City Dubai. All content is sourced from expocitydubai.com and publicly available project information for informational purposes. Project details, prices, and timelines are subject to change.",
};

export const getInTouch = {
  short: "Get in touch for current pricing and availability.",
  long: "Pricing for Expo City Hills 1 is confirmed directly with registered buyers. Get in touch and we'll walk you through current availability for your preferred building and unit type.",
};

export const project = {
  name: "Expo City Hills 1",
  entity: "Expo City Hills",
  developer: "Dubai South Properties",
  district: "Expo Hills",
  masterPlan: "Expo City Dubai",
  location:
    "Intersection of Expo Road (E77) and Sheikh Mohammed Bin Zayed Road (E311), Expo City Dubai",
  status: "Pre-Launch / Planned",
  milestone: "First trace / DLD milestone: February 2026",
  totalUnits: "~864",
  totalUnitsNote:
    "Estimated total across two sub-buildings (1A and 1B), per publicly available pre-construction estimates — no confirmed per-building split.",
  projectValue: "AED 950,000,000",
  projectValueNote:
    "Developer-submitted pre-construction estimate (~USD 258.7M) — not a per-unit price signal.",
  architecture: "Eco-friendly, sustainable, low-rise",
  geo: {
    latitude: 24.9614,
    longitude: 55.1482,
  },
};

export const buildings = [
  {
    slug: "expo-city-hills-1a",
    name: "Expo City Hills 1A",
    shortName: "1A",
    status: "Pre-Launch / Planned",
    description:
      "Expo City Hills 1A is one of two planned low-rise buildings within the Expo City Hills 1 development. Detailed per-building unit counts and specifications have not been published separately.",
  },
  {
    slug: "expo-city-hills-1b",
    name: "Expo City Hills 1B",
    shortName: "1B",
    status: "Pre-Launch / Planned",
    description:
      "Expo City Hills 1B is one of two planned low-rise buildings within the Expo City Hills 1 development. Detailed per-building unit counts and specifications have not been published separately.",
  },
] as const;

export type BuildingSlug = (typeof buildings)[number]["slug"];

export const plannedUnitTypes = [
  {
    type: "1-bedroom",
    label: "1 Bedroom",
    note: "Planned unit type — detailed sizes not yet published.",
  },
  {
    type: "2-bedroom",
    label: "2 Bedroom",
    note: "Planned unit type — detailed sizes not yet published.",
  },
  {
    type: "3-bedroom",
    label: "3 Bedroom",
    note: "Planned unit type — detailed sizes not yet published.",
  },
];

export const stats = [
  { value: "~864", label: "Homes (est.)" },
  { value: "2", label: "Buildings (1A & 1B)" },
  { value: "Pre-Launch", label: "Status" },
];

export const amenities = [
  {
    title: "Leisure Pool",
    description:
      "Resort-style swimming pool surrounded by landscaped terraces.",
  },
  {
    title: "Jogging Tracks",
    description: "Dedicated running and walking paths through green areas.",
  },
  {
    title: "Retail Shops",
    description: "Ground-level retail for daily essentials and services.",
  },
  {
    title: "Green Areas",
    description: "Landscaped gardens and open community spaces.",
  },
  {
    title: "Advanced Security",
    description:
      "24/7 gated access, CCTV surveillance, and controlled entry.",
  },
  {
    title: "Eco Architecture",
    description:
      "Sustainable materials, energy-efficient systems, biophilic design.",
  },
  {
    title: "Children's Play Areas",
    description: "Dedicated play spaces for families within the community.",
  },
  {
    title: "Fitness Center",
    description: "On-site fitness facilities for residents.",
  },
];

export const lifestyleTiles = [
  { title: "Leisure Pool", slug: "leisure-pool" },
  { title: "Green Areas", slug: "green-areas" },
  { title: "Jogging Tracks", slug: "jogging-tracks" },
  { title: "Eco Architecture", slug: "eco-architecture" },
];

export const locationDistancesPrimary = [
  { destination: "Expo City Dubai (core district)", distance: "1.0 km" },
  { destination: "Al Forsan Park", distance: "0.7 km" },
  { destination: "International Schools", distance: "3.3 km" },
  { destination: "Golf Courses", distance: "Nearby" },
  {
    destination: "Sheikh Mohammed Bin Zayed Road (E311)",
    distance: "Direct Access",
  },
];

export const locationDistancesSecondary = [
  {
    destination: "Al Maktoum International Airport",
    distance: "~10 minutes",
    note: "Secondary reference — less precise than primary distance figures.",
  },
];

export const expoDistricts = [
  "Expo Downtown",
  "Expo Business",
  "Expo Hills",
  "Expo Valley",
  "Expo Fields",
];

export const communityColumns = [
  {
    title: "Wellness",
    items: ["Leisure pool", "Jogging tracks", "Fitness center"],
  },
  {
    title: "Family",
    items: ["Children's play areas", "Retail shops"],
  },
  {
    title: "Security & Sustainability",
    items: ["24/7 advanced security", "Eco architecture"],
  },
];

export const aboutDeveloper = {
  paragraphs: [
    "Dubai South Properties is the developer behind Expo City Hills 1, delivering low-rise eco-luxury residences within the Expo Hills district of Expo City Dubai. The project entity is registered as Expo City Hills, with an estimated 864 homes planned across two sub-buildings at the intersection of Expo Road (E77) and Sheikh Mohammed Bin Zayed Road (E311).",
    "Expo City Dubai's master plan comprises five official districts — Expo Downtown, Expo Business, Expo Hills, Expo Valley, and Expo Fields. Expo Hills is positioned as tranquil living with open spaces and skyline views, making it a natural setting for low-rise residential communities like Expo City Hills 1.",
  ],
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

export function getBuildingBySlug(slug: string) {
  return buildings.find((b) => b.slug === slug);
}

export function isValidSubpage(slug: string): slug is SubpageSlug {
  return SUBPAGE_SLUGS.includes(slug as SubpageSlug);
}

export function isValidBuilding(slug: string): slug is BuildingSlug {
  return buildings.some((b) => b.slug === slug);
}
