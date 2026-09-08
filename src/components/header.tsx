import Link from "next/link";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w- items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/speedtest_icon.png" alt="SpeedCheck" className="h-8 w-8 rounded-full bg-white object-contain border border-slate-200" />
          <span className="text- font-bold tracking-tight text-slate-900">SpeedCheck</span>
          <span className="rounded-full bg-[#1e3a8a] px-2 py-0.5 text- font-bold text-white">.online</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/speed-test" className="rounded-full px-3 py-1.5 text- font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">Speed Test</Link>
          <Link href="/what-is-my-ip" className="rounded-full px-3 py-1.5 text- font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">My IP</Link>
          <Link href="/wifi-map" className="rounded-full px-3 py-1.5 text- font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">WiFi Map</Link>
          <Link href="/ping-test" className="rounded-full px-3 py-1.5 text- font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">Ping Test</Link>
          <Link href="/blog" className="rounded-full px-3 py-1.5 text- font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">Blog</Link>
        </nav>
        <Link href="/speed-test" className="rounded-full bg-[#1e3a8a] px-4 py-1.5 text- font-semibold text-white hover:bg-blue-800">
          Test Now
        </Link>
      </div>
    </header>
  );
}
