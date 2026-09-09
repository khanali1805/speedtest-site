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
  
  return {
    title: `${brand.full} - Speed Test, My IP, WiFi Map & Ping Tools`,
    description: `${brand.full} - Fast, accurate internet tools. Test speed, check IP, map WiFi signal, and ping any server. Professional tools for everyone.`,
    manifest: "/manifest.webmanifest",
    icons: { icon: "/logo.png", apple: "/logo.png" },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

