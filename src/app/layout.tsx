import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/BrandHeader";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://netcheck.site"),
  title: "NetCheck.site - Speed Test, My IP, WiFi Map & Ping Tools | SpeedCheck Network",
  description: "NetCheck.site - Pakistan's #1 Internet Tools: PTCL, Nayatel, Zong Speed Test, My IP, WiFi Mapper, Ping Test. Also on SpeedCheck.online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

