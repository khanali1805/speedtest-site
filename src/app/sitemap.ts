import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://netcheck.site';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/speed-test`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/what-is-my-ip`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/wifi-map`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/ping-test`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/wifi-controller`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];
}
