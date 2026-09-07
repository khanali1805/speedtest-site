import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - SpeedCheck",
  description: "Privacy Policy of SpeedCheck.online - How we protect your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[900px] p-6 md:p-8">
      <div className="rounded-[20px] bg-white p-8 md:p-10 border border-slate-200 shadow-sm">
        <h1 className="text-[28px] font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-[12px] text-slate-500">Effective Date: September 7, 2026</p>

        <div className="mt-6 space-y-6 text-[14px] leading-6 text-slate-600">
          <p>At <strong>SpeedCheck.online</strong>, your privacy is important to us. This policy explains how we handle information when you use our free internet tools.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">Information We Collect</h2>
          <p>We do not collect any personal information. Our speed test, IP checker, WiFi analyzer and ping test tools work directly in your browser without storing your data.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>We do not require registration or login</li>
            <li>We do not store your IP address or test results</li>
            <li>We do not collect names, emails or personal details</li>
          </ul>

          <h2 className="text-[18px] font-semibold text-slate-900">Cookies</h2>
          <p>We use cookies only to improve your experience:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To remember your preferences</li>
            <li>To analyze website traffic and improve our tools</li>
            <li>To show relevant advertisements</li>
          </ul>
          <p>You can disable cookies in your browser settings at any time.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">Advertising</h2>
          <p>We may display advertisements to keep our tools free. These ads may use cookies to show relevant content based on your browsing. You can manage ad preferences through your browser settings.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">Data Security</h2>
          <p>Our website uses secure HTTPS encryption to protect your connection. We do not share, sell or distribute any information because we do not collect personal data in the first place.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">Children's Privacy</h2>
          <p>Our service is suitable for all ages and does not collect information from children.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">Contact Us</h2>
          <p>If you have any questions about our Privacy Policy, please contact us:</p>
          <p className="mt-2">
            Email: support@speedcheck.online<br/>
            WhatsApp: +923097278546
          </p>
        </div>
      </div>
    </div>
  );
}
