
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/BrandHeader";
import { getBrand } from "@/lib/brand";
import { headers } from "next/headers";

const geistSans = Geist({ 
  variable: "--font-geist-sans", 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"]
});
const geistMono = Geist_Mono({ 
  variable: "--font-geist-mono", 
  subsets: ["latin"],
  display: "swap",
  preload: false
});

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get('host') || 'netcheck.site';
  const brand = getBrand(host);
  const url = `https://${brand.domain}`;
  
  return {
    title: {
      default: brand.seoTitle,
      template: `%s | ${brand.full}`,
    },
    description: brand.seoDescription,
    keywords: brand.keywords,
    metadataBase: new URL(url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: url,
      title: brand.seoTitle,
      description: brand.seoDescription,
      siteName: brand.full,
      images: [{ url: "/logo.png", width: 512, height: 512, alt: brand.full }],
    },
    twitter: {
      card: "summary_large_image",
      title: brand.seoTitle,
      description: brand.seoDescription,
      images: ["/logo.png"],
    },
    icons: {
      icon: [
        { url: "/logo.png", sizes: "32x32", type: "image/png" },
        { url: "/logo.png", sizes: "192x192", type: "image/png" },
        { url: "/logo.png", sizes: "512x512", type: "image/png" }
      ],
      apple: "/logo.png",
      shortcut: "/logo.png"
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const host = h.get('host') || 'netcheck.site';
  const brand = getBrand(host);
  const domainUrl = `https://${brand.domain}`;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://speed.cloudflare.com" />
        <link rel="dns-prefetch" href="https://speed.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": brand.full,
              "alternateName": brand.alternateNames,
              "url": domainUrl,
              "description": brand.seoDescription,
              "keywords": brand.keywords.join(", "),
              "potentialAction": {
                "@type": "SearchAction",
                "target": { "@type": "EntryPoint", "urlTemplate": `${domainUrl}/search?q={search_term_string}` },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": brand.full,
              "alternateName": brand.name,
              "url": domainUrl,
              "logo": `${domainUrl}/logo.png`,
              "image": `${domainUrl}/logo.png`,
              "description": brand.seoDescription
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
