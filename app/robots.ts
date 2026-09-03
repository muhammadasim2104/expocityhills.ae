import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";
import { discoveryFiles } from "@/lib/site-discovery";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.domain}${discoveryFiles.sitemap}`,
  };
}
