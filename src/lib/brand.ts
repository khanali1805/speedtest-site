export interface BrandInfo {
  full: string;
  name: string;
  tld: string;
  domain: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  h1: string;
  h1Highlight: string;
}

const BRANDS: Record<string, BrandInfo> = {
  'netcheck.site': {
    full: 'NetCheck.site',
    name: 'NetCheck',
    tld: '.site',
    domain: 'netcheck.site',
    short: 'NetCheck',
    seoTitle: 'Speed Check - Fast Internet Speed Test & Net Check | NetCheck.site',
    seoDescription: 'Speed Check - Test your internet speed instantly. Fast, accurate speed test, net check, WiFi speed test, IP checker & ping test. #1 Fast.com alternative. Check your speed now!',
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
      'fast.com',
      'speedcheck',
      'what is my ip',
      'ping test',
      'wifi map'
    ],
    h1: 'Speed Check',
    h1Highlight: 'Fast Internet Speed Test'
  },
  'speedcheck.online': {
    full: 'SpeedCheck.online',
    name: 'SpeedCheck',
    tld: '.online',
    domain: 'speedcheck.online',
    short: 'SpeedCheck',
    seoTitle: 'Speed Check Online - Fast Speed Test & Internet Speed Check',
    seoDescription: 'Speed Check Online - Instant speed test & speed check tool. Check internet speed, net speed, WiFi speed, IP & ping in 5 seconds. Most accurate speed test online - 100% free!',
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
      'fast.com alternative',
      'wifi speed test',
      'my ip',
      'ping test',
      'speed test by speedcheck'
    ],
    h1: 'Speed Check Online',
    h1Highlight: 'Internet Speed Test'
  }
};

export function getBrand(host?: string | null): BrandInfo {
  if (!host) return BRANDS['netcheck.site'];
  const clean = host.toLowerCase().replace(/^www\./, '').split(':')[0];
  if (clean.includes('speedcheck.online')) return BRANDS['speedcheck.online'];
  if (clean.includes('netcheck.site')) return BRANDS['netcheck.site'];
  // default for localhost/dev
  if (clean.includes('localhost') || clean.includes('vercel.app')) return BRANDS['netcheck.site'];
  return BRANDS['netcheck.site'];
}

export function getAllBrands(): BrandInfo[] {
  return Object.values(BRANDS);
}
