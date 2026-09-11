
import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
import Link from "next/link";
import Image from "next/image";

export async function Header() {
  const h = await headers();
  const brand = getBrand(h.get('host'));
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur px-6 py-3">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#0f172a]">
          <Image src="/logo.png" alt={`${brand.full} logo`} width={28} height={28} className="h-7 w-7 object-contain" priority sizes="28px" />
        </div>
        <span className="font-bold text-[17px] text-gray-900">{brand.name}</span>
        <span className="rounded-full bg-[#1e3a8a] px-2.5 py-1 text-[11px] font-semibold text-white">{brand.tld}</span>
      </Link>
      <nav className="hidden gap-6 text-[14px] font-medium text-gray-600 md:flex">
        <Link href="/speed-test" className="hover:text-gray-900">Speed Test</Link>
        <Link href="/what-is-my-ip" className="hover:text-gray-900">My IP</Link>
        <Link href="/wifi-map" className="hover:text-gray-900">WiFi Map</Link>
        <Link href="/ping-test" className="hover:text-gray-900">Ping Test</Link>
        <Link href="/blog" className="hover:text-gray-900">Blog</Link>
      </nav>
      <Link href="/speed-test" className="rounded-full bg-[#1e3a8a] px-5 py-2 text-[14px] font-medium text-white hover:bg-blue-900">Test Now</Link>
    </header>
  );
}

export async function Footer() {
  const h = await headers();
  const brand = getBrand(h.get('host'));
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-[1100px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[#0f172a]">
                <Image src="/logo.png" alt="logo" width={24} height={24} className="h-6 w-6 object-contain" sizes="24px" />
              </div>
              <span className="font-bold text-[15px] text-gray-900">{brand.full}</span>
            </div>
            <p className="mt-4 max-w-[300px] text-[13px] leading-6 text-gray-500">
              Fast, accurate and reliable internet tools for everyone. Test speed, check IP, map WiFi and ping any server.
            </p>
          </div>
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-900">Tools</h4>
            <ul className="mt-4 space-y-2.5 text-[13px] text-gray-600">
              <li><Link href="/speed-test" className="hover:text-gray-900" aria-label="Internet Speed Test">Internet Speed Test</Link></li>
              <li><Link href="/what-is-my-ip" className="hover:text-gray-900" aria-label="What is My IP">What is My IP</Link></li>
              <li><Link href="/wifi-map" className="hover:text-gray-900" aria-label="WiFi Signal Map">WiFi Signal Map</Link></li>
              <li><Link href="/ping-test" className="hover:text-gray-900" aria-label="Ping Test">Ping Test</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-900">Company</h4>
            <ul className="mt-4 space-y-2.5 text-[13px] text-gray-600">
              <li><Link href="/about" className="hover:text-gray-900">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-gray-100 pt-6 text-[12px] text-gray-500 md:flex-row">
          <span>© {year} {brand.full} - All rights reserved.</span>
          <span>Fast • Accurate • Professional Tools</span>
        </div>
      </div>
    </footer>
  );
}
