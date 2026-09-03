import { type Metadata } from "next";
import { siteConfig, project } from "./data";

type PageSEO = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path = "",
  image,
}: PageSEO): Metadata {
  const url = `${siteConfig.domain}${path}`;
  const ogImage = image ?? `${siteConfig.domain}/og-image.svg`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.domain),
    alternates: { canonical: url },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
    manifest: "/site.webmanifest",
    themeColor: "#0D1C14",
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_AE",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export function createFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function createBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.path}`,
    })),
  };
}

export function createRealEstateListingJsonLd(name?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: name ?? project.name,
    description: siteConfig.description,
    url: siteConfig.domain,
    address: {
      "@type": "PostalAddress",
      streetAddress: project.location,
      addressLocality: "Expo City Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: project.geo.latitude,
      longitude: project.geo.longitude,
    },
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: project.developer,
    description: `Developer of ${project.name} in ${project.district}, ${project.masterPlan}. Informational reference only.`,
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    inLanguage: "en-AE",
  };
}

export function createPlaceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${project.name}, ${project.district}`,
    description: `Low-rise eco-luxury residences in ${project.district}, ${project.masterPlan}.`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: project.geo.latitude,
      longitude: project.geo.longitude,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Expo City Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
