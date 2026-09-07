import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import WhatsAppButton from "@/components/whatsapp-button";

export const metadata: Metadata = {
  title: "SpeedTest.Site - Internet Speed Test",
  description: "Professional internet tools - Check your real download, upload, ping speed, public IP address, WiFi signal map and ping test. Each visitor sees their own real data.",
  keywords: "speed test, internet speed test, what is my ip, wifi signal map, ping test, speedtest.site",
  openGraph: {
    title: "SpeedTest.Site - Internet Speed Test",
    description: "Fast and accurate internet tools",
    type: "website",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/speedtest_icon.png" />
      </head>
      <body className="min-h-screen bg-[#fcfcfd] text-slate-900 antialiased">
        <Header />
        <main className="pb-20">{children}</main>
        <WhatsAppButton />
        <footer className="border-t border-slate-200 bg-white py-8">
          <div className="mx-auto max-w-[1100px] px-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <img src="/speedtest_icon.png" alt="logo" className="h-6 w-6" />
              <span className="text-[13px] font-semibold">speedtest.site</span>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">© 2025 SpeedTest.Site - Professional Internet Tools</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
