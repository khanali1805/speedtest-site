import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
function LogoIcon({ light = false }: { light?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill={light? "white" : "#1e3a8a"} />
      <path d="M12 6v2a4 4 0 0 1 4 4h2a6 6 0 0 0-6-6z" fill={light? "white" : "#1e3a8a"} />
    </svg>
  );
}
export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host");
  const brand = getBrand(host);
  return (
    <main className="min-h-screen bg-white">
      {/* Header - Logo Fixed */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-2 font-bold text- text-gray-900">
          <div className="h-8 w-8 rounded-full bg-[#1e3a8a] flex items-center justify-center">
            <div className="scale-90"><LogoIcon light /></div>
          </div>
          {brand.name} <span className="ml-1 rounded-full bg-[#1e3a8a] px-3 py-1 text-white text- font-bold">{brand.tld}</span>
        </div>
        <nav className="hidden md:flex gap-6 text- text-gray-700">
          <a href="/speed-test" className="hover:text-blue-900">Speed Test</a>
          <a href="/what-is-my-ip" className="hover:text-blue-900">My IP</a>
          <a href="/wifi-map" className="hover:text-blue-900">WiFi Map</a>
          <a href="/ping-test" className="hover:text-blue-900">Ping Test</a>
          <a href="/blog" className="hover:text-blue-900">Blog</a>
        </nav>
        <a href="/speed-test" className="rounded-full bg-[#1e3a8a] px-5 py-2 text-white text- font-medium">Test Now</a>
      </header>
      {/* Hero - Logo Fixed */}
      <section className="mx-auto mt-6 max-w- rounded- bg-[#1e3a8a] p-8 text-white">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
            <LogoIcon light={false} />
          </div>
          <h1 className="text- font-bold tracking-tight">{brand.full}</h1>
        </div>
        <p className="mt-4 max-w- text- leading-6 text-blue-100">
          Fast, accurate and reliable internet tools built for everyone on {brand.full}. Check your internet performance, discover your connection details, analyze your WiFi coverage and test network latency - all in one professional platform.
        </p>
        <div className="mt-5 flex gap-2 flex-wrap">
          <span className="rounded-full bg-white/15 px-3 py-1.5 text- backdrop-blur">Fast & Accurate</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text- backdrop-blur">Real-Time Results</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text- backdrop-blur">Easy to Use</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text- backdrop-blur">Professional Tools</span>
        </div>
      </section>
      {/* Tools Grid */}
      <section className="mx-auto mt-6 grid max-w- grid-cols-1 gap-4 px-6 md:grid-cols-4">
        {[
          { t: "Internet Speed Test", d: "Check real download, upload and ping speed", l: "/speed-test" },
          { t: "What is My IP", d: "Your public IP and location - per-user live", l: "/what-is-my-ip" },
          { t: "WiFi Signal Map", d: "Router direction and signal strength zones", l: "/wifi-map" },
          { t: "Ping Test", d: "Test latency to any website", l: "/ping-test" },
        ].map((c) => (
          <div key={c.t} className="rounded- border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text- text-gray-900">{c.t}</h3>
            <p className="mt-2 text- text-gray-500 leading-5">{c.d}</p>
            <a href={c.l} className="mt-4 inline-block rounded-full bg-gray-900 px-4 py-2 text- text-white hover:bg-black">Open Tool</a>
          </div>
        ))}
      </section>
      {/* SEO Text */}
      <section className="mx-auto mt-8 max-w- rounded- border border-gray-200 bg-white px-6 py-6 mb-8">
        <h2 className="font-bold text- text-gray-900">Why {brand.full} is the Best Speed Test Tool?</h2>
        <p className="mt-3 text- leading-6 text-gray-600">
          {brand.full} is a professional, free and accurate platform to test your internet speed, check your IP address, analyze WiFi signal strength and test ping latency. Our tools use advanced technology to provide real-time results with high accuracy. Whether you want to check if your ISP is delivering promised speeds or troubleshoot your WiFi, {brand.full} is your trusted partner. Also available on {brand.full === "NetCheck.site"? "SpeedCheck.online" : "NetCheck.site"}.
        </p>
      </section>
    </main>
  );
}
