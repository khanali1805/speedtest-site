import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
  const h = await headers();
  const brand = getBrand(h.get('host'));
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="h-9 w-9 overflow-hidden rounded-full bg-[#0f172a] p-1">
          <Image src="/logo.png" alt={`${brand.full} logo`} width={36} height={36} className="h-full w-full object-contain" />
        </div>
        <span className="font-bold text-[18px] text-gray-900">{brand.name}</span>
        <span className="rounded-full bg-[#1e3a8a] px-3 py-1 text-[12px] font-medium text-white">{brand.tld}</span>
      </Link>
      <nav className="hidden items-center gap-6 text-[14px] font-medium text-gray-600 md:flex">
        <Link href="/speed-test" className="hover:text-gray-900">Speed Test</Link>
        <Link href="/what-is-my-ip" className="hover:text-gray-900">My IP</Link>
        <Link href="/wifi-map" className="hover:text-gray-900">WiFi Map</Link>
        <Link href="/ping-test" className="hover:text-gray-900">Ping Test</Link>
        <Link href="/blog" className="hover:text-gray-900">Blog</Link>
      </nav>
      <Link href="/speed-test" className="rounded-full bg-[#1e3a8a] px-5 py-2 text-[14px] font-medium text-white hover:bg-[#1e2f6b]">Test Now</Link>
    </header>
  );
}

export async function Footer() {
  const h = await headers();
  const brand = getBrand(h.get('host'));
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-[#0f172a] p-1">
              <Image src="/logo.png" alt="logo" width={36} height={36} className="h-full w-full object-contain" />
            </div>
            <span className="font-bold text-[16px] text-gray-900">{brand.full}</span>
          </div>
          <p className="mt-4 max-w-[320px] text-[13px] leading-6 text-gray-500">
            Fast, accurate and reliable internet tools for everyone on {brand.full}. Test speed, check IP, map WiFi and ping any server - all in one professional platform. Also available on {brand.full === 'NetCheck.site' ? 'SpeedCheck.online' : 'NetCheck.site'}.
          </p>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wider text-gray-900">Tools</h4>
          <ul className="mt-4 space-y-3 text-[13px] text-gray-600">
            <li><Link href="/speed-test" className="hover:text-gray-900">Internet Speed Test</Link></li>
            <li><Link href="/what-is-my-ip" className="hover:text-gray-900">What is My IP</Link></li>
            <li><Link href="/wifi-map" className="hover:text-gray-900">WiFi Signal Map</Link></li>
            <li><Link href="/ping-test" className="hover:text-gray-900">Ping Test</Link></li>
            <li><Link href="/blog" className="hover:text-gray-900">Blog & Guides</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wider text-gray-900">Company</h4>
          <ul className="mt-4 space-y-3 text-[13px] text-gray-600">
            <li><Link href="/about" className="hover:text-gray-900">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-gray-900">Sitemap</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-2 px-6 py-5 text-[12px] text-gray-500 md:flex-row">
          <span>© {year} {brand.full}. All rights reserved.</span>
          <span>Available on <Link href={brand.domain === 'netcheck.site' ? 'https://speedcheck.online' : 'https://netcheck.site'} className="font-medium text-[#1e3a8a] hover:underline">{brand.full === 'NetCheck.site' ? 'SpeedCheck.online' : 'NetCheck.site'}</Link></span>
        </div>
      </div>
    </footer>
  );
}

