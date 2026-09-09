import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'netcheck.site';
  const isSpeedCheck = host.toLowerCase().includes('speedcheck.online');
  const domain = isSpeedCheck ? 'https://speedcheck.online' : 'https://netcheck.site';
  const brandName = isSpeedCheck ? 'SpeedCheck.online' : 'NetCheck.site';
  
  const pages = [
    { path: '/', changeFreq: 'daily', priority: '1.0' },
    { path: '/speed-test', changeFreq: 'weekly', priority: '0.9' },
    { path: '/what-is-my-ip', changeFreq: 'weekly', priority: '0.8' },
    { path: '/wifi-map', changeFreq: 'weekly', priority: '0.8' },
    { path: '/ping-test', changeFreq: 'weekly', priority: '0.8' },
    { path: '/about', changeFreq: 'monthly', priority: '0.5' },
    { path: '/contact', changeFreq: 'monthly', priority: '0.5' },
    { path: '/privacy-policy', changeFreq: 'yearly', priority: '0.3' },
    { path: '/terms', changeFreq: 'yearly', priority: '0.3' },
    { path: '/blog', changeFreq: 'weekly', priority: '0.6' },
    { path: '/blog/what-is-my-ip', changeFreq: 'monthly', priority: '0.6' },
    { path: '/blog/wifi-signal-slow', changeFreq: 'monthly', priority: '0.6' },
    { path: '/blog/ptcl-speed-test-pakistan', changeFreq: 'monthly', priority: '0.6' },
  ];

  const today = new Date().toISOString().split('T')[0];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${domain}${p.path}</loc><lastmod>${today}</lastmod><changefreq>${p.changeFreq}</changefreq><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
