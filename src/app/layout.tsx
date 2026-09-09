import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://netcheck.site"),
  title: "NetCheck.site - Speed Test, My IP, WiFi Map & Ping Tools | SpeedCheck Network",
  description: "NetCheck.site - Pakistan's #1 Internet Tools: PTCL, Nayatel, Zong Speed Test, My IP, WiFi Mapper, Ping Test. Also on SpeedCheck.online",
  alternates: { canonical: "https://netcheck.site" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>{children}</body></html>
  );
}
