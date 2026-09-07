import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - SpeedCheck",
  description: "Learn about SpeedCheck.online - Professional internet speed testing platform providing fast and accurate network tools.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[900px] p-6 md:p-8">
      <div className="rounded-[20px] bg-white p-8 md:p-10 border border-slate-200">
        <h1 className="text-[28px] font-bold text-slate-900">About SpeedCheck</h1>
        <p className="mt-4 text-[14px] leading-6 text-slate-600">
          Welcome to <strong>SpeedCheck.online</strong> - Your professional destination for internet performance testing and network analysis.
        </p>
        
        <h2 className="mt-8 text-[18px] font-semibold text-slate-900">What We Do</h2>
        <p className="mt-3 text-[14px] leading-6 text-slate-600">
          SpeedCheck provides free, fast and accurate tools to help you understand your internet connection:
        </p>
        <ul className="mt-3 list-disc pl-6 text-[14px] leading-6 text-slate-600">
          <li><strong>Internet Speed Test:</strong> Measure download, upload and ping with high accuracy</li>
          <li><strong>What is My IP:</strong> Discover your public IP address and location instantly</li>
          <li><strong>WiFi Signal Map:</strong> Analyze your WiFi coverage and find optimal router placement</li>
          <li><strong>Ping Test:</strong> Test latency to any website or server</li>
        </ul>

        <h2 className="mt-8 text-[18px] font-semibold text-slate-900">Why Choose SpeedCheck?</h2>
        <ul className="mt-3 list-disc pl-6 text-[14px] leading-6 text-slate-600">
          <li>✓ 100% Free - No hidden charges</li>
          <li>✓ Fast & Accurate - Professional grade results</li>
          <li>✓ No Ads Clutter - Clean and simple interface</li>
          <li>✓ Privacy Focused - We don't store your data</li>
          <li>✓ Mobile Friendly - Works on all devices</li>
        </ul>

        <h2 className="mt-8 text-[18px] font-semibold text-slate-900">Our Mission</h2>
        <p className="mt-3 text-[14px] leading-6 text-slate-600">
          Our mission is to provide everyone with easy-to-use, accurate internet testing tools. Whether you are checking if your ISP is delivering promised speeds, troubleshooting WiFi issues, or just curious about your connection - SpeedCheck is here to help.
        </p>

        <p className="mt-8 text-[12px] text-slate-500">
          Contact us: support@speedcheck.online | WhatsApp: +923097278546
        </p>
      </div>
    </div>
  );
}
