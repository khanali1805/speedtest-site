import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
import Link from "next/link";

export default async function Home() {
  const h = await headers();
  const brand = getBrand(h.get('host'));
  const isNetCheck = brand.domain === 'netcheck.site';

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* ULTIMATE FAQ - Covers all variations: net check, netcheck, net check site etc */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": isNetCheck ? [
              {
                "@type": "Question",
                "name": "What is Net Check?",
                "acceptedAnswer": { "@type": "Answer", "text": "Net Check (NetCheck) is NetCheck.site - the fastest tool to check your internet speed, IP, WiFi and ping. Search net check or netcheck to find us." }
              },
              {
                "@type": "Question",
                "name": "What is NetCheck.site?",
                "acceptedAnswer": { "@type": "Answer", "text": "NetCheck.site is Net Check - also searched as netcheck site, netcheck dot site, net check site. It offers speed check, speed test, internet speed test and more." }
              },
              {
                "@type": "Question",
                "name": "How to do Net Check?",
                "acceptedAnswer": { "@type": "Answer", "text": "Go to NetCheck.site and click Test Now. Whether you search net check, netcheck, or net check site, you will find us at the top." }
              },
              {
                "@type": "Question",
                "name": "Is Net Check free?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, Net Check (NetCheck) on NetCheck.site is 100% free for speed test, IP check, WiFi map and ping test." }
              }
            ] : [
              {
                "@type": "Question",
                "name": "What is Speed Check?",
                "acceptedAnswer": { "@type": "Answer", "text": "Speed Check (SpeedCheck) is SpeedCheck.online - fastest speed check online. Search speed check or speedcheck to find us." }
              },
              {
                "@type": "Question",
                "name": "What is SpeedCheck.online?",
                "acceptedAnswer": { "@type": "Answer", "text": "SpeedCheck.online is Speed Check Online - also searched as speedcheck online, speedcheck dot online, speed check online. Best speed test and net check tool." }
              },
              {
                "@type": "Question",
                "name": "How to do Speed Check?",
                "acceptedAnswer": { "@type": "Answer", "text": "Visit SpeedCheck.online and click Test Now. Search speed check, speedcheck, or speed check online - you will always find us top." }
              }
            ]
          })
        }}
      />

      {/* HERO - BRAND FIRST - CLEAN */}
      <section className="mx-auto mt-6 max-w-[1100px] rounded-[24px] bg-[#1e3a8a] px-8 py-12 text-white">
        <h1 className="text-[34px] font-bold tracking-tight">
          {brand.full}
        </h1>
        <p className="mt-4 max-w-[760px] text-[15px] leading-7 text-blue-100">
          {isNetCheck 
            ? "Net Check - The fastest, most accurate NetCheck tool built for everyone. Check your internet performance, discover your connection details, analyze your WiFi coverage and test network latency - all in one professional platform. Whether you search net check or netcheck, you found the right place."
            : "Speed Check - The fastest SpeedCheck Online tool for everyone. Check your internet speed, discover your IP, analyze WiFi and test ping - all in one place. Search speed check or speedcheck online, you are at the right destination."
          }
        </p>
        <Link href="/speed-test" className="mt-7 inline-block rounded-full bg-white px-7 py-3 text-[14px] font-bold text-[#1e3a8a] hover:bg-gray-100">
          Test Now →
        </Link>
      </section>

      {/* TOOLS - CLEAN */}
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

      {/* SEO CONTENT - Covers all variations naturally, not as badges */}
      <section className="mx-auto mt-10 max-w-[1100px] rounded-[16px] border border-gray-200 bg-white px-8 py-8">
        <h2 className="text-[18px] font-bold text-gray-900">
          {isNetCheck ? "Why NetCheck.site is the Best Net Check Tool?" : "Why SpeedCheck.online is the Best Speed Check Tool?"}
        </h2>
        <div className="mt-4 space-y-4 text-[14px] leading-7 text-gray-600">
          <p>
            {isNetCheck ? (
              <>
                <strong>Net Check</strong> (also searched as <strong>netcheck</strong>, <strong>net check site</strong>, <strong>netcheck site</strong>, <strong>netcheck.site</strong>, <strong>netcheck dot site</strong>) is the most trusted platform to check your internet speed, IP address, WiFi signal and ping. At <strong>NetCheck.site</strong>, we understand that users search for us in many ways - whether you type net check with space or netcheck without space, net check site or netcheck dot site - you will always find NetCheck.site at the top because we are optimized for all variations.
              </>
            ) : (
              <>
                <strong>Speed Check</strong> (also searched as <strong>speedcheck</strong>, <strong>speed check online</strong>, <strong>speedcheck online</strong>, <strong>speedcheck.online</strong>, <strong>speedcheck dot online</strong>) is the fastest way to test your internet. At <strong>SpeedCheck.online</strong>, we know you might search speed check with space or speedcheck without space, speed check online or speedcheck dot online - no matter how you search, you will find SpeedCheck.online.
              </>
            )}
          </p>
          <p>
            {isNetCheck
              ? "Our Net Check tool provides accurate speed check, speed test, internet speed test and net speed check results in 5 seconds. Whether you searched net check, netcheck, or net check site - NetCheck.site is your one-stop solution for all internet diagnostics. We also offer My IP, WiFi Map and Ping Test for complete network analysis."
              : "Our Speed Check Online tool gives you instant speed test, internet speed test, net check and WiFi speed test. Whether you typed speed check, speedcheck, speed check online or speedcheck dot online - SpeedCheck.online delivers the most accurate results. Includes IP checker, WiFi analyzer and ping test too."
            }
          </p>
        </div>
      </section>

      {/* FAQ - Covers all search variations */}
      <section className="mx-auto mt-8 max-w-[1100px] px-8 pb-4">
        <h2 className="text-[16px] font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-4 grid gap-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-[14px] text-gray-900">
              {isNetCheck ? "What is Net Check? Is it same as NetCheck?" : "What is Speed Check? Is it same as SpeedCheck?"}
            </h3>
            <p className="mt-2 text-[13px] leading-6 text-gray-600">
              {isNetCheck
                ? "Yes! Net Check and NetCheck are the same. Whether you search net check with space or netcheck without space, net check site or netcheck.site, you mean NetCheck.site - the best net check tool."
                : "Yes! Speed Check and SpeedCheck are same. Search speed check with space or speedcheck without, speed check online or speedcheck.online - all lead to SpeedCheck.online."}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-[14px] text-gray-900">
              {isNetCheck ? "How to do Net Check on NetCheck.site?" : "How to do Speed Check on SpeedCheck.online?"}
            </h3>
            <p className="mt-2 text-[13px] leading-6 text-gray-600">
              {isNetCheck
                ? "Just visit NetCheck.site and click Test Now. Search net check, netcheck, net check site, netcheck dot site - you will always find us top."
                : "Go to SpeedCheck.online and click Test Now. Search speed check, speedcheck, speed check online, speedcheck dot online - we are always top."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
