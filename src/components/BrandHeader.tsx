import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
import Image from "next/image";

export async function Header() {
  const h = await headers();
  const brand = getBrand(h.get('host'));
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-6 py-3">
      <a href="/" className="flex items-center gap-2 font-bold text-[18px]">
        <Image src="/logo.png" alt="logo" width={32} height={32} className="rounded-full object-cover" />
        {brand.name}
        <span className="ml-1 rounded-full bg-[#1e3a8a] px-3 py-1 text-[13px] text-white">{brand.tld}</span>
      </a>
      <nav className="hidden gap-6 text-[14px] md:flex">
        <a href="/speed-test">Speed Test</a>
        <a href="/what-is-my-ip">My IP</a>
        <a href="/wifi-map">WiFi Map</a>
        <a href="/ping-test">Ping Test</a>
        <a href="/blog">Blog</a>
      </nav>
      <a href="/speed-test" className="rounded-full bg-[#1e3a8a] px-5 py-2 text-white text-[14px]">Test Now</a>
    </header>
  );
}

export async function Footer() {
  const h = await headers();
  const brand = getBrand(h.get('host'));
  return (
    <footer className="mt-10 border-t px-6 py-6 text-center text-[12px] text-gray-500">
      © {new Date().getFullYear()} {brand.full} - Also on {brand.full === 'NetCheck.site' ? 'SpeedCheck.online' : 'NetCheck.site'}
    </footer>
  );
}

