import { type MetadataRoute } from "next";
import {
  buildings,
  contentImages,
  siteConfig,
  SUBPAGE_SLUGS,
  footerLinks,
} from "./data";

export const discoveryFiles = {
  sitemap: "/sitemap.xml",
  llms: "/llms.txt",
};

const PROJECT_PAGES = footerLinks.map((l) => l.href);

export function getAllSitePaths(): string[] {
  const paths = ["/", ...PROJECT_PAGES];

  for (const building of buildings) {
    paths.push(`/${building.slug}`);
    for (const sub of SUBPAGE_SLUGS) {
      paths.push(`/${building.slug}/${sub}`);
    }
  }

  return paths;
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const imageUrls = contentImages.map((src) => `${siteConfig.domain}${src}`);

  return getAllSitePaths().map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
    ...(path === "/" ? { images: imageUrls } : {}),
  }));
}

export function getLlmsTxt(): string {
  const lines = [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    "",
    siteConfig.disclaimer,
    "",
    "## Canonical URLs",
    `- ${siteConfig.domain}/`,
    "",
    "## Project Resources",
    ...PROJECT_PAGES.map((p) => {
      const link = footerLinks.find((l) => l.href === p);
      return `- ${link?.label ?? p}: ${siteConfig.domain}${p}`;
    }),
    "",
    "## Buildings",
    ...buildings.flatMap((b) => [
      `- ${b.name}: ${siteConfig.domain}/${b.slug}`,
      ...SUBPAGE_SLUGS.map((s) => `  - ${s}: ${siteConfig.domain}/${b.slug}/${s}`),
    ]),
    "",
    "## Discovery Files",
    `- Sitemap: ${siteConfig.domain}/sitemap.xml`,
    `- Robots: ${siteConfig.domain}/robots.txt`,
    "",
    "## Contact",
    "Register your interest at the website for pricing and availability updates.",
  ];

  return lines.join("\n");
}
