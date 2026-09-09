import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://netcheck.site";
  
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
    changeFrequency: route === "" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/blog") ? 0.6 : 0.8,
  }));
}

