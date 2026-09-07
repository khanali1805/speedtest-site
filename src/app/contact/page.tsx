import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - SpeedCheck",
  description: "Contact SpeedCheck.online - Get help, report issues or send feedback.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[900px] p-6 md:p-8">
      <div className="rounded-[20px] bg-white p-8 md:p-10 border border-slate-200">
        <h1 className="text-[28px] font-bold text-slate-900">Contact Us</h1>
        <p className="mt-4 text-[14px] leading-6 text-slate-600">
          Have questions, feedback or need help? We are here to assist you.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[16px] bg-slate-50 p-6 border border-slate-200">
            <h3 className="text-[14px] font-semibold text-slate-900">WhatsApp Support</h3>
            <p className="mt-2 text-[13px] text-slate-600">Fastest way to reach us</p>
            <a href="https://wa.me/923097278546" target="_blank" className="mt-3 inline-block rounded-[10px] bg-[#25D366] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#128C7E]">
              Chat on WhatsApp: +923097278546
            </a>
          </div>

          <div className="rounded-[16px] bg-slate-50 p-6 border border-slate-200">
            <h3 className="text-[14px] font-semibold text-slate-900">Email Support</h3>
            <p className="mt-2 text-[13px] text-slate-600">For detailed queries</p>
            <p className="mt-3 text-[13px] font-semibold text-slate-900">support@speedcheck.online</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-[16px] font-semibold text-slate-900">Send Message</h3>
          <form className="mt-4 space-y-4">
            <div>
              <label className="text-[13px] font-medium text-slate-700">Name</label>
              <input type="text" className="mt-1 w-full rounded-[10px] border border-slate-200 px-4 py-2 text-[14px] outline-none focus:border-slate-400" placeholder="Your name" />
            </div>
            <div>
              <label className="text-[13px] font-medium text-slate-700">Email</label>
              <input type="email" className="mt-1 w-full rounded-[10px] border border-slate-200 px-4 py-2 text-[14px] outline-none focus:border-slate-400" placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-[13px] font-medium text-slate-700">Message</label>
              <textarea rows={4} className="mt-1 w-full rounded-[10px] border border-slate-200 px-4 py-2 text-[14px] outline-none focus:border-slate-400" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="rounded-[10px] bg-slate-900 px-6 py-2.5 text-[14px] font-semibold text-white hover:bg-black">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
