import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img src="/speedtest_icon.png" alt="SpeedTest.Site Logo" className="h-9 w-9 rounded-full" />
          <div className="flex flex-col">
            <span className="text-[16px] font-bold leading-none tracking-tight text-slate-900">speedtest.site</span>
            <span className="text-[10px] font-medium tracking-wide text-slate-500">INTERNET TOOLS</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-[13px] font-medium text-slate-600 md:flex">
          <Link href="/speed-test" className="hover:text-slate-900">Speed Test</Link>
          <Link href="/what-is-my-ip" className="hover:text-slate-900">What is My IP</Link>
          <Link href="/wifi-map" className="hover:text-slate-900">WiFi Map</Link>
          <Link href="/ping-test" className="hover:text-slate-900">Ping Test</Link>
        </nav>
      </div>
    </header>
  );
}
