import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import WhatsAppButton from "@/components/whatsapp-button";
import Script from "next/script";
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
  };
  return (
    <html lang="en">
      <head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossOrigin="anonymous" strategy="afterInteractive" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-[#fcfcfd] text-slate-900 antialiased">
        <Header />
        <main>{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  );
}
