import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers();
  const brand = getBrand(h.get("host"));
  const baseUrl = `https://${brand.domain}`;

  const routes = [
    "",
    "/speed-test",
    "/what-is-my-ip",
    "/wifi-map",
    "/ping-test",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/blog",
    "/blog/what-is-my-ip",
    "/blog/wifi-signal-slow",
    "/blog/ptcl-speed-test-pakistan",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/blog") ? 0.6 : 0.8,
  } as const));
}

