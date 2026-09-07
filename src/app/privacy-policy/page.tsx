import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - SpeedCheck",
  description: "Privacy Policy of SpeedCheck.online - How we handle your data and privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[900px] p-6 md:p-8">
      <div className="rounded-[20px] bg-white p-8 md:p-10 border border-slate-200">
        <h1 className="text-[28px] font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-[12px] text-slate-500">Last Updated: September 7, 2026</p>

        <div className="mt-6 space-y-6 text-[14px] leading-6 text-slate-600">
          <p>At SpeedCheck.online, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">1. Information We Collect</h2>
          <p><strong>We do NOT collect personal data.</strong> Our tools work directly in your browser:</p>
          <ul className="list-disc pl-6">
            <li>Speed test results are calculated in real-time and not stored</li>
            <li>IP address is displayed to you only, we don't save it</li>
            <li>We use anonymous analytics (Google Analytics) to improve our service</li>
          </ul>

          <h2 className="text-[18px] font-semibold text-slate-900">2. Cookies</h2>
          <p>We use cookies for:</p>
          <ul className="list-disc pl-6">
            <li>Google Analytics - To understand website usage</li>
            <li>Google AdSense - To show relevant ads (if enabled)</li>
            <li>Essential cookies for website functionality</li>
          </ul>

          <h2 className="text-[18px] font-semibold text-slate-900">3. Google AdSense</h2>
          <p>We may use Google AdSense to display ads. Google uses cookies to show ads based on your previous visits. You can opt out of personalized advertising by visiting Google Ads Settings.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">4. Third-Party Services</h2>
          <p>We use:</p>
          <ul className="list-disc pl-6">
            <li>Vercel for hosting</li>
            <li>Google Analytics for analytics</li>
            <li>Google AdSense for advertising</li>
          </ul>

          <h2 className="text-[18px] font-semibold text-slate-900">5. Data Security</h2>
          <p>We implement security measures to protect your data. Our website uses HTTPS encryption.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">6. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, contact us at: support@speedcheck.online or WhatsApp: +923097278546</p>
        </div>
      </div>
    </div>
  );
}
