export interface BrandInfo {
  full: string;
  name: string;
  tld: string;
  domain: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

const BRANDS: Record<string, BrandInfo> = {
  'netcheck.site': {
    full: 'NetCheck.site',
    name: 'NetCheck',
    tld: '.site',
    domain: 'netcheck.site',
    short: 'NetCheck',
    seoTitle: 'Speed Check - Fast Internet Speed Test & Net Check | NetCheck.site',
    seoDescription: 'Speed Check - Test your internet speed instantly with NetCheck.site. Fast, accurate speed test, net check, WiFi speed test, IP checker & ping test. Best speed test online - check your speed now!',
    keywords: [
      'speed check',
      'speed test',
      'internet speed test',
      'net check',
      'internet speed check',
      'fast speed test',
      'speed test online',
      'check my internet speed',
      'wifi speed test',
      'net speed check',
      'my ip',
      'ping test',
      'wifi map',
      'netcheck',
      'speedcheck'
    ]
  },
  'speedcheck.online': {
    full: 'SpeedCheck.online',
    name: 'SpeedCheck',
    tld: '.online',
    domain: 'speedcheck.online',
    short: 'SpeedCheck',
    seoTitle: 'Speed Check Online - Fast Speed Test & Internet Speed Check | SpeedCheck.online',
    seoDescription: 'Speed Check Online - Instant speed test & speed check tool with SpeedCheck.online. Check internet speed, net speed, WiFi speed, IP & ping in 5 seconds. Most accurate speed test online - 100% free!',
    keywords: [
      'speed check',
      'speed check online',
      'speed test',
      'internet speed test',
      'fast speed check',
      'online speed test',
      'speed test online',
      'check internet speed',
      'internet speed check',
      'speedcheck.online',
      'wifi speed test',
      'my ip',
      'ping test',
      'speed test by speedcheck',
      'speedcheck'
    ]
  }
};

export function getBrand(host?: string | null): BrandInfo {
  if (!host) return BRANDS['netcheck.site'];
  const clean = host.toLowerCase().replace(/^www\./, '').split(':')[0];
  if (clean.includes('speedcheck.online')) return BRANDS['speedcheck.online'];
  if (clean.includes('netcheck.site')) return BRANDS['netcheck.site'];
  if (clean.includes('localhost') || clean.includes('vercel.app')) return BRANDS['netcheck.site'];
  return BRANDS['netcheck.site'];
}
