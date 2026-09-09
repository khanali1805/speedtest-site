import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'netcheck.site';
  const isSpeedCheck = host.toLowerCase().includes('speedcheck.online');
  const domain = isSpeedCheck ? 'https://speedcheck.online' : 'https://netcheck.site';
  
  const robots = `User-agent: *
Allow: /

Disallow: /api/
Disallow: /_next/

Sitemap: ${domain}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600',
    },
  });
}
