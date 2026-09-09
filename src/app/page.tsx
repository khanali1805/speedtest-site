import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
import Link from "next/link";

export default async function Home() {
  const h = await headers();
  const brand = getBrand(h.get('host'));

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Speed Check?",
                "acceptedAnswer": { "@type": "Answer", "text": "Speed Check is a fast tool to test your internet speed, check download, upload and ping instantly. Best alternative to Fast.com." }
              },
              {
                "@type": "Question",
                "name": "How to check internet speed?",
                "acceptedAnswer": { "@type": "Answer", "text": "Just click Test Now on SpeedCheck.online or NetCheck.site to start your speed test. Results in 5 seconds." }
              },
              {
                "@type": "Question",
                "name": "Is Speed Check free?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, Speed Check, Speed Test, WiFi Map, My IP and Ping Test are 100% free and accurate." }
              }
            ]
          })
        }}
      />

      {/* Hero - STRONG SEO H1 */}
      <section className="mx-auto mt-6 max-w-[1100px] rounded-[24px] bg-[#1e3a8a] px-8 py-10 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1e3a8a] font-bold text-[20px]">⚡</div>
          <div>
            <h1 className="text-[32px] font-bold tracking-tight leading-tight">
              {brand.h1} - <span className="text-blue-200">{brand.h1Highlight}</span>
            </h1>
            <p className="text-[13px] text-blue-200 mt-1">Speed Test • Speed Check • Internet Speed Test • Net Check</p>
          </div>
        </div>
        <p className="mt-4 max-w-[780px] text-[15px] leading-7 text-blue-100">
          <strong>Speed Check</strong> - Test your internet speed instantly with {brand.full}. The most accurate <strong>Speed Test</strong>, <strong>Internet Speed Test</strong>, <strong>Net Check</strong> and <strong>WiFi Speed Test</strong>. Fast, free and reliable - Best alternative to Fast.com, Speedtest.net. Check your download, upload and ping in 5 seconds!
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-[12px] backdrop-blur">Speed Check</span>
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-[12px] backdrop-blur">Speed Test</span>
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-[12px] backdrop-blur">Internet Speed Test</span>
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-[12px] backdrop-blur">Fast & Accurate</span>
        </div>
        <Link href="/speed-test" className="mt-6 inline-block rounded-full bg-white px-7 py-3 text-[14px] font-bold text-[#1e3a8a] hover:bg-gray-100">Start Speed Check - Test Now →</Link>
      </section>

      {/* Tools Grid - Keyword Rich */}
      <section className="mx-auto mt-8 grid max-w-[1100px] grid-cols-1 gap-5 px-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Speed Test", sub: "Speed Check", desc: "Fast internet speed check - download, upload & ping", href: "/speed-test", icon: "🚀" },
          { title: "What is My IP", sub: "My IP Check", desc: "Check your IP address and location instantly", href: "/what-is-my-ip", icon: "🌐" },
          { title: "WiFi Map", sub: "WiFi Speed Test", desc: "WiFi signal strength and speed analysis", href: "/wifi-map", icon: "📶" },
          { title: "Ping Test", sub: "Latency Check", desc: "Ping test for gaming and streaming", href: "/ping-test", icon: "📡" },
        ].map((c) => (
          <div key={c.title} className="rounded-[16px] border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="text-[24px]">{c.icon}</div>
            <h3 className="mt-3 font-bold text-[15px] text-gray-900">{c.title} <span className="text-[11px] font-normal text-gray-500">- {c.sub}</span></h3>
            <p className="mt-2 text-[13px] leading-5 text-gray-500">{c.desc}</p>
            <Link href={c.href} className="mt-5 inline-block rounded-full bg-gray-900 px-5 py-2 text-[13px] font-medium text-white hover:bg-black">Open {c.sub}</Link>
          </div>
        ))}
      </section>

      {/* SEO Content - STRONG SHORT KEYWORDS */}
      <section className="mx-auto mt-10 max-w-[1100px] rounded-[16px] border bg-white px-8 py-8">
        <h2 className="text-[20px] font-bold text-gray-900">Speed Check - Best Internet Speed Test & Speed Test Online</h2>
        <div className="mt-4 space-y-4 text-[14px] leading-7 text-gray-600">
          <p>
            <strong>Speed Check</strong> is the fastest way to test your internet speed. With <strong>{brand.full}</strong>, you can do a complete <strong>speed test</strong>, <strong>internet speed test</strong>, <strong>net check</strong> and <strong>WiFi speed test</strong> in just 5 seconds. Our <strong>speed check online</strong> tool is trusted by millions as the best <strong>Fast.com</strong> and <strong>Speedtest.net</strong> alternative.
          </p>
          <p>
            Want to know <strong>how fast is my internet</strong>? Use our <strong>speed check</strong> to check <strong>download speed</strong>, <strong>upload speed</strong> and <strong>ping</strong>. Whether you search <strong>speed check</strong>, <strong>speed test</strong>, <strong>internet speed test</strong>, <strong>speed check online</strong>, <strong>fast speed test</strong> or <strong>net check</strong> - {brand.full} is the #1 result for accurate and free testing.
          </p>
          <h3 className="text-[16px] font-bold text-gray-900 pt-2">Why Choose {brand.full} for Speed Check?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Speed Check & Speed Test</strong> - Instant results, no ads</li>
            <li><strong>Internet Speed Test</strong> - Accurate download / upload / ping</li>
            <li><strong>WiFi Speed Test</strong> & <strong>WiFi Map</strong> - Check signal strength</li>
            <li><strong>What is My IP</strong> & <strong>Ping Test</strong> - Free extra tools</li>
            <li>100% Free, Fast, No registration - Best Speed Test by {brand.short}</li>
          </ul>
          <p className="text-[12px] text-gray-500 pt-2">
            Keywords: speed check, speed test, internet speed test, speed check online, net check, fast speed test, check my internet speed, wifi speed test, speed test online, speedtest, fast.com, speed check by {brand.short}
          </p>
        </div>
      </section>

      {/* FAQ for SEO */}
      <section className="mx-auto mt-8 max-w-[1100px] px-8 py-6">
        <h2 className="text-[16px] font-bold">Frequently Asked - Speed Check</h2>
        <div className="mt-3 grid gap-3 text-[13px] text-gray-600">
          <div className="rounded-xl border bg-white p-4"><strong>What is Speed Check?</strong> Speed Check is a tool to test internet speed instantly.</div>
          <div className="rounded-xl border bg-white p-4"><strong>Is Speed Test free?</strong> Yes, our speed check and speed test are 100% free.</div>
          <div className="rounded-xl border bg-white p-4"><strong>How to do Speed Check Online?</strong> Just click Test Now - your speed check starts automatically.</div>
        </div>
      </section>
    </main>
  );
}
