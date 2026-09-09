import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
  const h = await headers();
  const brand = getBrand(h.get('host'));
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-white/95 backdrop-blur px-6 py-3 shadow-sm">
      <Link href="/" className="flex items-center gap-2 font-bold text-[18px] text-gray-900">
        <Image src="/logo.png" alt={`${brand.full} logo`} width={32} height={32} className="rounded-full object-cover" priority />
        {brand.name}
        <span className="ml-1 rounded-full bg-[#1e3a8a] px-3 py-1 text-[13px] font-semibold text-white">{brand.tld}</span>
      </Link>
      <nav className="hidden gap-6 text-[14px] font-medium text-gray-700 md:flex">
        <Link href="/speed-test" className="hover:text-black">Speed Test</Link>
        <Link href="/what-is-my-ip" className="hover:text-black">My IP</Link>
        <Link href="/wifi-map" className="hover:text-black">WiFi Map</Link>
        <Link href="/ping-test" className="hover:text-black">Ping Test</Link>
        <Link href="/blog" className="hover:text-black">Blog</Link>
      </nav>
      <Link href="/speed-test" className="rounded-full bg-[#1e3a8a] px-5 py-2 text-white text-[14px] font-semibold hover:bg-blue-900">Test Now</Link>
    </header>
  );
}

export async function Footer() {
  const h = await headers();
  const brand = getBrand(h.get('host'));
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-[1100px] px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <div className="flex items-center gap-2 font-bold text-[16px]">
              <Image src="/logo.png" alt="logo" width={24} height={24} className="rounded-full" />
              {brand.full}
            </div>
            <p className="mt-3 text-[13px] leading-6 text-gray-600">
              Speed Check - The fastest internet speed test. Check your net speed, WiFi speed, IP & ping instantly. Best Fast.com alternative.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[13px] uppercase tracking-wider text-gray-900">Tools</h4>
            <ul className="mt-3 space-y-2 text-[13px] text-gray-600">
              <li><Link href="/speed-test" className="hover:text-black">Speed Test - Speed Check</Link></li>
              <li><Link href="/what-is-my-ip" className="hover:text-black">What is My IP</Link></li>
              <li><Link href="/wifi-map" className="hover:text-black">WiFi Signal Map</Link></li>
              <li><Link href="/ping-test" className="hover:text-black">Ping Test</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[13px] uppercase tracking-wider text-gray-900">Company</h4>
            <ul className="mt-3 space-y-2 text-[13px] text-gray-600">
              <li><Link href="/about" className="hover:text-black">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-black">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-black">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-black">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-[12px] text-gray-500">
          <span>© {new Date().getFullYear()} {brand.full} - All rights reserved. Best Speed Check tool.</span>
          <span className="font-medium">Fast & Accurate • Real-Time Results • Professional Tools</span>
        </div>
      </div>
    </footer>
  );
}
