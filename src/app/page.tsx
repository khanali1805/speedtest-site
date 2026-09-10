import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
import Link from "next/link";

export default async function Home() {
  const h = await headers();
  const brand = getBrand(h.get('host'));

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* BACKEND SEO - FAQ for Google, professional look */}
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
                "acceptedAnswer": { "@type": "Answer", "text": `Speed Check is a fast tool to test your internet speed with ${brand.full}. Check download, upload and ping instantly.` }
              },
              {
                "@type": "Question",
                "name": "How to check internet speed?",
                "acceptedAnswer": { "@type": "Answer", "text": `Just click Test Now on ${brand.full} to start your speed test. Results in 5 seconds.` }
              },
              {
                "@type": "Question",
                "name": "Is Speed Test free?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, our speed test, WiFi Map, My IP and Ping Test are 100% free and accurate." }
              }
            ]
          })
        }}
      />

      {/* HERO - CLEAN PROFESSIONAL - NO CHILD LOGOS */}
      <section className="mx-auto mt-6 max-w-[1100px] rounded-[24px] bg-[#1e3a8a] px-8 py-12 text-white">
        <h1 className="text-[34px] font-bold tracking-tight">
          {brand.full}
        </h1>
        <p className="mt-4 max-w-[760px] text-[15px] leading-7 text-blue-100">
          Fast, accurate and reliable internet tools built for everyone. Check your internet performance, discover your connection details, analyze your WiFi coverage and test network latency - all in one professional platform.
        </p>
        <Link href="/speed-test" className="mt-7 inline-block rounded-full bg-white px-7 py-3 text-[14px] font-bold text-[#1e3a8a] hover:bg-gray-100">
          Test Now →
        </Link>
      </section>

      {/* TOOLS - CLEAN - NO CHILD LOGOS */}
      <section className="mx-auto mt-8 grid max-w-[1100px] grid-cols-1 gap-5 px-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Internet Speed Test", desc: "Check real download, upload and ping speed", href: "/speed-test" },
          { title: "What is My IP", desc: "Your public IP and location - per-user live", href: "/what-is-my-ip" },
          { title: "WiFi Signal Map", desc: "Router direction and signal strength zones", href: "/wifi-map" },
          { title: "Ping Test", desc: "Test latency to any website", href: "/ping-test" },
        ].map((c) => (
          <div key={c.title} className="rounded-[16px] border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h3 className="font-bold text-[15px] text-gray-900">{c.title}</h3>
            <p className="mt-2 text-[13px] leading-5 text-gray-500">{c.desc}</p>
            <Link href={c.href} className="mt-5 inline-block rounded-full bg-gray-900 px-5 py-2 text-[13px] font-medium text-white hover:bg-black">Open Tool</Link>
          </div>
        ))}
      </section>

      {/* SEO SECTION - PROFESSIONAL - KEYWORDS IN PARAGRAPH, NOT AS BADGES */}
      <section className="mx-auto mt-10 max-w-[1100px] rounded-[16px] border border-gray-200 bg-white px-8 py-8">
        <h2 className="text-[18px] font-bold text-gray-900">Why {brand.full} is the Best Speed Test Tool?</h2>
        <div className="mt-4 space-y-4 text-[14px] leading-7 text-gray-600">
          <p>
            {brand.full} is a professional, free and accurate platform to test your internet speed, check your IP address, analyze WiFi signal strength and test ping latency. Our tools use advanced technology to provide real-time results with high accuracy. Whether you want to check if your ISP is delivering promised speeds or troubleshoot your WiFi, {brand.full} is your trusted partner.
          </p>
          <p>
            With {brand.full}, you can perform a complete internet speed check in seconds. Our service helps you understand your connection quality for streaming, gaming and browsing. The platform is designed to be simple, fast and accessible from any device, making it the go-to choice for users who need reliable network diagnostics.
          </p>
        </div>
      </section>

      {/* FAQ - CLEAN */}
      <section className="mx-auto mt-8 max-w-[1100px] px-8 pb-4">
        <h2 className="text-[16px] font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-4 grid gap-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-[14px] text-gray-900">What is {brand.full}?</h3>
            <p className="mt-2 text-[13px] leading-6 text-gray-600">{brand.full} is a free platform to test internet speed, check IP, map WiFi and test ping.</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-[14px] text-gray-900">How to test my internet speed?</h3>
            <p className="mt-2 text-[13px] leading-6 text-gray-600">Click on Test Now button to start your speed test. You will get results within 5 seconds.</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-[14px] text-gray-900">Is {brand.full} free to use?</h3>
            <p className="mt-2 text-[13px] leading-6 text-gray-600">Yes, all tools on {brand.full} are 100% free and require no registration.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
