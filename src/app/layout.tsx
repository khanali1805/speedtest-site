import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import WhatsAppButton from "@/components/whatsapp-button";

export const metadata: Metadata = {
  metadataBase: new URL("https://speedcheck.online"),
  title: {
    default: "SpeedCheck - Fast Internet Speed Test, IP Check & WiFi Analyzer",
    template: "%s | SpeedCheck",
  },
  description: "Check your internet speed instantly with SpeedCheck.online. Test download, upload, ping, find your IP address, analyze WiFi signal strength and test latency. Fast, accurate, free.",
  keywords: ["internet speed test", "speed test", "check internet speed", "wifi speed test", "what is my ip", "ping test", "wifi signal map", "speedcheck.online", "speedcheck"],
  authors: [{ name: "SpeedCheck" }],
  creator: "SpeedCheck",
  publisher: "SpeedCheck",
  openGraph: {
    title: "SpeedCheck - Fast Internet Speed Test & Network Tools",
    description: "Test your internet speed, check IP, analyze WiFi and ping - all in one professional platform. Fast, accurate, free.",
    url: "https://speedcheck.online",
    siteName: "SpeedCheck",
    images: [{ url: "/speedtest_icon.png", width: 512, height: 512, alt: "SpeedCheck Logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpeedCheck - Internet Speed Test",
    description: "Fast and accurate internet speed test, IP checker, WiFi analyzer and ping test.",
    images: ["/speedtest_icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: "FAVWjfxKrhtZmI7Uhf3SJDhrBOXv1dSvA6Po-WC90tg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SpeedCheck",
    url: "https://speedcheck.online",
    description: "Fast, accurate internet speed test, IP checker, WiFi signal analyzer and ping test",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "1250" },
    author: { "@type": "Organization", name: "SpeedCheck", url: "https://speedcheck.online" },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/speedtest_icon.png" />
        <meta name="google-site-verification" content="FAVWjfxKrhtZmI7Uhf3SJDhrBOXv1dSvA6Po-WC90tg" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-[#fcfcfd] text-slate-900 antialiased">
        <Header />
        <main className="pb-20">{children}</main>
        <WhatsAppButton />
        <footer className="border-t border-slate-200 bg-white py-8">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-2">
                <img src="/speedtest_icon.png" alt="logo" className="h-6 w-6" />
                <span className="text-[13px] font-semibold">SpeedCheck.online</span>
              </div>
              <div className="flex flex-wrap gap-4 text-[12px] text-slate-500">
                <a href="/about" className="hover:text-slate-900">About</a>
                <a href="/privacy-policy" className="hover:text-slate-900">Privacy Policy</a>
                <a href="/terms" className="hover:text-slate-900">Terms</a>
                <a href="/contact" className="hover:text-slate-900">Contact</a>
              </div>
            </div>
            <p className="mt-4 text-center text-[11px] text-slate-500">© 2026 SpeedCheck.online - Fast & Accurate Internet Tools | Contact: +923097278546</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
