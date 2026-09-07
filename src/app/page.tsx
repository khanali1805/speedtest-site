import Link from "next/link";

const tools = [
  { title: "Internet Speed Test", desc: "Check real download, upload and ping speed", href: "/speed-test" },
  { title: "What is My IP", desc: "Your public IP and location - per-user live", href: "/what-is-my-ip" },
  { title: "WiFi Signal Map", desc: "Router direction and signal strength zones", href: "/wifi-map" },
  { title: "Ping Test", desc: "Test latency to any website", href: "/ping-test" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[1100px] p-6 md:p-8">
      <div className="rounded-[20px] bg-[#1e3a8a] p-8 md:p-10 text-white">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-white">
            <img src="/speedtest_icon.png" alt="SpeedTest Logo" className="h-10 w-10 rounded-full" />
          </div>
          <div>
            <h1 className="text-[28px] font-bold tracking-tight">SpeedTest</h1>
            <p className="mt-2 max-w-2xl text-[13px] leading-5 text-blue-100">Fast, accurate and reliable internet tools built for everyone. Check your internet performance, discover your connection details, analyze your WiFi coverage and test network latency - all in one professional platform designed for accuracy and simplicity.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium">Fast & Accurate</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium">Real-Time Results</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium">Easy to Use</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium">Professional Tools</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((t) => (
          <Link key={t.href} href={t.href} className="group rounded-[16px] border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm">
            <h3 className="text-[14px] font-semibold text-slate-900">{t.title}</h3>
            <p className="mt-1.5 text-[12px] leading-4 text-slate-500">{t.desc}</p>
            <div className="mt-4 inline-flex rounded-[10px] bg-slate-900 px-4 py-2 text-[12px] font-semibold text-white group-hover:bg-black">Open Tool</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
