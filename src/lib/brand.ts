export interface BrandInfo {
  full: string;
  name: string;
  tld: string;
  domain: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  alternateNames: string[];
}

const BRANDS: Record<string, BrandInfo> = {
  'netcheck.site': {
    full: 'NetCheck.site',
    name: 'NetCheck',
    tld: '.site',
    domain: 'netcheck.site',
    short: 'NetCheck',
    seoTitle: 'NetCheck.site - Net Check, NetCheck & Speed Check - Internet Speed Test',
    seoDescription: 'Net Check - NetCheck.site (NetCheck) is the fastest Net Check & Speed Check tool. Search net check, netcheck, net check site, netcheck.site, netcheck dot site - always get NetCheck.site. Fast speed test, internet speed test, WiFi test, IP & ping - 100% free!',
    keywords: [
      'net check',
      'netcheck',
      'net check site',
      'netcheck site',
      'netcheck.site',
      'net check .site',
      'netcheck dot site',
      'net check dot site',
      'netchecksite',
      'net check speed test',
      'netcheck speed test',
      'net check online',
      'netcheck online',
      'speed check',
      'speed test',
      'internet speed test',
      'net speed check',
      'net speed test',
      'check net speed',
      'my ip',
      'what is my ip',
      'wifi map',
      'ping test',
      'internet speed check',
      'fast net check'
    ],
    alternateNames: [
      'Net Check',
      'NetCheck',
      'Net Check Site',
      'NetCheck Site',
      'NetCheck.site',
      'Net Check .site',
      'NetCheck dot site',
      'Net Check dot site',
      'NetCheckSite',
      'Speed Check',
      'Speed Test',
      'Internet Speed Test',
      'Net Speed Check',
      'Fast Net Check'
    ]
  },
  'speedcheck.online': {
    full: 'SpeedCheck.online',
    name: 'SpeedCheck',
    tld: '.online',
    domain: 'speedcheck.online',
    short: 'SpeedCheck',
    seoTitle: 'SpeedCheck.online - Speed Check, SpeedCheck & Net Check - Speed Test Online',
    seoDescription: 'Speed Check - SpeedCheck.online (SpeedCheck) is the #1 Speed Check & Net Check tool. Search speed check, speedcheck, speed check online, speedcheck.online, speedcheck dot online - always get SpeedCheck.online. Fast internet speed test & net check in 5 seconds!',
    keywords: [
      'speed check',
      'speedcheck',
      'speed check online',
      'speedcheck online',
      'speedcheck.online',
      'speed check .online',
      'speedcheck dot online',
      'speed check dot online',
      'speedcheckonline',
      'speed check site',
      'speedcheck site',
      'speed test',
      'speed test online',
      'internet speed test',
      'net check',
      'netcheck',
      'net check online',
      'check speed',
      'check internet speed',
      'internet speed check',
      'my ip',
      'ping test',
      'wifi speed test',
      'fast speed check',
      'speedcheck speed test'
    ],
    alternateNames: [
      'Speed Check',
      'SpeedCheck',
      'Speed Check Online',
      'SpeedCheck Online',
      'SpeedCheck.online',
      'Speed Check .online',
      'SpeedCheck dot online',
      'Speed Check dot online',
      'SpeedCheckOnline',
      'Net Check',
      'NetCheck',
      'Speed Test',
      'Internet Speed Test',
      'Fast Speed Check',
      'Online Speed Check'
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
