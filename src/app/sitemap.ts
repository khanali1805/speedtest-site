import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://netcheck.site';
  const oldBase = 'https://speedcheck.online';
  const now = new Date();
  const pages = ['', '/speed-test', '/what-is-my-ip', '/wifi-map', '/ping-test', '/wifi-controller', '/pk', '/pk/speed-test', '/blog'];
  const sitemaps: MetadataRoute.Sitemap = [];
  // New domain - primary
  pages.forEach(p => sitemaps.push({ url: `${base}${p}`, lastModified: now, changeFrequency: 'daily', priority: p === '' ? 1 : 0.8 }));
  // Old domain - secondary (Google ko batane ke liye dono live hain)
  pages.forEach(p => sitemaps.push({ url: `${oldBase}${p}`, lastModified: now, changeFrequency: 'daily', priority: 0.7 }));
  return sitemaps;
}
