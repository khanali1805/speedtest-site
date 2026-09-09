import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/BrandHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://netcheck.site"),
  title: "NetCheck.site - Speed Test, My IP, WiFi Map & Ping Tools | SpeedCheck Network",
  description: "NetCheck.site - Pakistan's #1 Internet Tools: PTCL, Nayatel, Zong Speed Test, My IP, WiFi Mapper, Ping Test. Also on SpeedCheck.online",
  verification: {
    google: "b4_gx49L_J7MytjFqFfekbSWUTwy064-i9vTOBx10ek",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

