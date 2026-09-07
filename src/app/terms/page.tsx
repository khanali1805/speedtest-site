import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - SpeedCheck",
  description: "Terms of Service of SpeedCheck.online",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[900px] p-6 md:p-8">
      <div className="rounded-[20px] bg-white p-8 md:p-10 border border-slate-200">
        <h1 className="text-[28px] font-bold text-slate-900">Terms of Service</h1>
        <p className="mt-2 text-[12px] text-slate-500">Last Updated: September 7, 2026</p>

        <div className="mt-6 space-y-6 text-[14px] leading-6 text-slate-600">
          <p>By accessing and using SpeedCheck.online, you agree to these Terms of Service.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">1. Acceptance of Terms</h2>
          <p>By using our website, you agree to comply with and be bound by these terms.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">2. Use of Service</h2>
          <p>Our tools are provided for free and for informational purposes. You agree to use them responsibly and not to abuse our services.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">3. Accuracy</h2>
          <p>While we strive for accuracy, speed test results may vary based on network conditions, device, and other factors. Results are estimates for informational purposes.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">4. Intellectual Property</h2>
          <p>All content on SpeedCheck.online is owned by us. You may not copy, reproduce, or distribute our content without permission.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">5. Disclaimer</h2>
          <p>Our services are provided "as is" without warranties. We are not liable for any damages resulting from use of our website.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">6. Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use after changes means you accept the new terms.</p>

          <h2 className="text-[18px] font-semibold text-slate-900">7. Contact</h2>
          <p>Questions about Terms? Contact us at support@speedcheck.online or WhatsApp +923097278546</p>
        </div>
      </div>
    </div>
  );
}
