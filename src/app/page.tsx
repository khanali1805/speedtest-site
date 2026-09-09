import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host");
  const brand = getBrand(host);
  return (
    <main>
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2 font-bold text-">
          <span className="h-6 w-6 rounded-full bg-blue-900 inline-block"></span>
          {brand.name} <span className="ml-1 rounded-full bg-blue-900 px-3 py-1 text-white text-">{brand.tld}</span>
        </div>
        <nav className="hidden md:flex gap-6 text-">
          <a href="/speed-test">Speed Test</a>
          <a href="/what-is-my-ip">My IP</a>
          <a href="/wifi-map">WiFi Map</a>
          <a href="/ping-test">Ping Test</a>
          <a href="/blog">Blog</a>
        </nav>
        <a href="/speed-test" className="rounded-full bg-blue-900 px-5 py-2 text-white text-">Test Now</a>
      </header>
      <section className="mx-auto mt-6 max-w- rounded- bg-blue-900 p-8 text-white">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-full bg-white inline-block"></span>
          <h1 className="text- font-bold">{brand.full}</h1>
        </div>
        <p className="mt-4 max-w- text- leading-6 text-blue-100">
          Fast, accurate and reliable internet tools built for everyone on {brand.full}. Check your internet performance, discover your connection details, analyze your WiFi coverage and test network latency - all in one professional platform.
        </p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="rounded-full bg-white/15 px-3 py-1 text-">Fast & Accurate</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-">Real-Time Results</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-">Easy to Use</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-">Professional Tools</span>
        </div>
      </section>
      <section className="mx-auto mt-6 grid max-w- grid-cols-1 gap-4 px-6 md:grid-cols-4">
        {[
          { t: "Internet Speed Test", d: "Check real download, upload and ping speed", l: "/speed-test" },
          { t: "What is My IP", d: "Your public IP and location - per-user live", l: "/what-is-my-ip" },
          { t: "WiFi Signal Map", d: "Router direction and signal strength zones", l: "/wifi-map" },
          { t: "Ping Test", d: "Test latency to any website", l: "/ping-test" },
        ].map((c) => (
          <div key={c.t} className="rounded- border p-5">
            <h3 className="font-bold text-">{c.t}</h3>
            <p className="mt-2 text- text-gray-500">{c.d}</p>
            <a href={c.l} className="mt-4 inline-block rounded-full bg-gray-900 px-4 py-2 text- text-white">Open Tool</a>
          </div>
        ))}
      </section>
      <section className="mx-auto mt-8 max-w- rounded- border px-6 py-6 mb-8">
        <h2 className="font-bold text-">Why {brand.full} is the Best Speed Test Tool?</h2>
        <p className="mt-3 text- leading-6 text-gray-600">
          {brand.full} is a professional, free and accurate platform to test your internet speed, check your IP address, analyze WiFi signal strength and test ping latency. Also available on {brand.full === "NetCheck.site"? "SpeedCheck.online" : "NetCheck.site"}.
        </p>
      </section>
    </main>
  );
}
