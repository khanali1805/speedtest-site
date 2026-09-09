import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/BrandHeader";
import { getBrand } from "@/lib/brand";
import { headers } from "next/headers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: url,
      title: brand.seoTitle,
      description: brand.seoDescription,
      siteName: brand.full,
      images: [{ url: "/logo.png", width: 512, height: 512, alt: `${brand.full} - Speed Check` }],
    },
    twitter: {
      card: "summary_large_image",
      title: brand.seoTitle,
      description: brand.seoDescription,
      images: ["/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    manifest: "/manifest.webmanifest",
    icons: { icon: "/logo.png", apple: "/logo.png" },
    verification: {
      google: "", // add later if needed
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD for Strong SEO - Speed Check */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Speed Check - Fast Internet Speed Test",
              "alternateName": ["Speed Test", "Internet Speed Test", "Net Check", "SpeedCheck Online", "Fast Speed Test"],
              "url": "https://speedcheck.online",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://speedcheck.online/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
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
