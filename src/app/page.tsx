import { headers } from "next/headers";
import { getBrand } from "@/lib/brand";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const h = await headers();
  const brand = getBrand(h.get('host'));

  const tools = [
    { title: "Internet Speed Test", desc: "Check real download, upload and ping speed with high accuracy.", href: "/speed-test" },
    { title: "What is My IP", desc: "Your public IP, location and ISP details - live per-user.", href: "/what-is-my-ip" },
    { title: "WiFi Signal Map", desc: "Router direction and signal strength zones visualized.", href: "/wifi-map" },
    { title: "Ping Test", desc: "Test latency to any website or game server instantly.", href: "/ping-test" },
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="mx-auto mt-6 max-w-[1100px] rounded-[24px] bg-[#1e3a8a] px-8 py-10 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white p-1.5">
            <Image src="/logo.png" alt="logo" width={48} height={48} className="h-full w-full object-contain" />
          </div>
          <h1 className="text-[30px] font-bold tracking-tight md:text-[32px]">{brand.full}</h1>
        </div>
        <p className="mt-4 max-w-[780px] text-[15px] leading-7 text-blue-100">
          Fast, accurate and reliable internet tools built for everyone on {brand.full}. Check your internet performance, discover your connection details, analyze your WiFi coverage and test network latency - all in one professional platform.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-[12px] backdrop-blur">Fast & Accurate</span>
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-[12px] backdrop-blur">Real-Time Results</span>
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-[12px] backdrop-blur">Easy to Use</span>
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-[12px] backdrop-blur">Professional Tools</span>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-[1100px] grid-cols-1 gap-5 px-6 md:grid-cols-2 lg:grid-cols-4">
        {tools.map((c) => (
          <div key={c.title} className="rounded-[16px] border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-[#0f172a] p-2">
              <Image src="/logo.png" alt="" width={40} height={40} className="h-full w-full object-contain" />
            </div>
            <h3 className="mt-4 font-bold text-[15px] text-gray-900">{c.title}</h3>
            <p className="mt-2 text-[13px] leading-5 text-gray-500">{c.desc}</p>
            <Link href={c.href} className="mt-5 inline-block rounded-full bg-gray-900 px-5 py-2 text-[13px] font-medium text-white hover:bg-black">Open Tool</Link>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-10 max-w-[1100px] rounded-[16px] border border-gray-200 bg-white px-8 py-7">
        <h2 className="text-[17px] font-bold text-gray-900">Why {brand.full} is the Best Speed Test Tool?</h2>
        <p className="mt-3 text-[14px] leading-7 text-gray-600">
          {brand.full} is a professional, free and accurate platform to test your internet speed, check your IP address, analyze WiFi signal strength and test ping latency. Our tools use advanced technology to provide real-time results with high accuracy. Whether you want to check if your ISP is delivering promised speeds or troubleshoot your WiFi, {brand.full} is your trusted partner.
        </p>
      </section>
    </main>
  );
}

