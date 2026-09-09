import type { Metadata } from "next";
import "./globals.css";
<<<<<<< HEAD
=======
import Header from "@/components/header";
import WhatsAppButton from "@/components/whatsapp-button";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
>>>>>>> 4c4ac991b96de017352ba6bcbfbb8a057faa704d
export const metadata: Metadata = {
  metadataBase: new URL("https://netcheck.site"),
  title: {
    default: "NetCheck.site - Speed Test, My IP, WiFi Map & Ping Tools | SpeedCheck Network",
    template: "%s | NetCheck.site & SpeedCheck.online",
  },
  description: "NetCheck.site - Pakistan's #1 Internet Tools: Fast PTCL, Nayatel, Zong, Jazz Speed Test, What is My IP, WiFi Signal Mapper, Ping Test. Also available on SpeedCheck.online - 100% Free & Accurate.",
  keywords: ["netcheck", "netcheck.site", "netcheck speed test", "speedcheck.online", "ptcl speed test", "nayatel speed test", "zong speed test", "my ip check", "wifi analyzer", "ping test pakistan", "internet speed test pakistan"],
  authors: [{ name: "NetCheck.site - SpeedCheck Network" }],
  creator: "NetCheck.site",
  publisher: "NetCheck.site",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://netcheck.site",
    siteName: "NetCheck.site - SpeedCheck Network",
    title: "NetCheck.site - Internet Speed Test, IP Check, WiFi Tools",
    description: "Check your PTCL, Nayatel, Zong speed, My IP, WiFi Map, Ping Test - Pakistan's most accurate tools. Also on SpeedCheck.online",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "NetCheck.site - Speed Test & Internet Tools", description: "Fast Speed Test for PTCL, Nayatel, Zong, Jazz + My IP + WiFi Tools" },
  alternates: { canonical: "https://netcheck.site" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: { google: "YOUR_GOOGLE_VERIFICATION_CODE" }
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NetCheck.site",
    alternateName: ["SpeedCheck.online", "NetCheck", "SpeedCheck"],
    url: "https://netcheck.site",
    sameAs: ["https://speedcheck.online", "https://netcheck.site"],
    description: "Internet Speed Test, My IP, WiFi Map, Ping Test for Pakistan and Global",
    potentialAction: { "@type": "SearchAction", target: "https://netcheck.site/search?q={search_term_string}", "query-input": "required name=search_term_string" }
  };
  return (
<<<<<<< HEAD
    <html lang="en">
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head>
      <body>{children}</body>
=======
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-[#fcfcfd] text-slate-900 antialiased" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <WhatsAppButton />
        <Analytics />
      </body>
>>>>>>> 4c4ac991b96de017352ba6bcbfbb8a057faa704d
    </html>
  );
}
