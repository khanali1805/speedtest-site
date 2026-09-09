export function getBrand(host: string | null) {
  if (!host) return { name: 'NetCheck', full: 'NetCheck.site', tld: '.site', domain: 'netcheck.site' };
  if (host.toLowerCase().includes('netcheck')) {
    return { name: 'NetCheck', full: 'NetCheck.site', tld: '.site', domain: 'netcheck.site' };
  }
  return { name: 'SpeedCheck', full: 'SpeedCheck.online', tld: '.online', domain: 'speedcheck.online' };
}
