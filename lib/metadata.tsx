import { type Metadata, type Viewport } from "next";
import { ogImage, ogImageVersion, project, siteConfig } from "./data";

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
  const url = `${siteConfig.domain}${path || "/"}`;
  const og = image ?? `${siteConfig.domain}${ogImage}?v=${ogImageVersion}`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.domain),
    alternates: { canonical: url },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      title: siteConfig.name,
      statusBarStyle: "default",
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_AE",
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
};

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
    provider: {
      "@type": "Organization",
      name: project.developer,
    },
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
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
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

export function createImageObjectJsonLd({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `${siteConfig.domain}${src}`,
    name: alt,
    description: alt,
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
