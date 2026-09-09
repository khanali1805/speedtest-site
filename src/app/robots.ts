import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const h = await headers();
  const brand = getBrand(h.get("host"));
  const baseUrl = `https://${brand.domain}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

