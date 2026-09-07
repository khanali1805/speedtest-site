import { NextRequest, NextResponse } from "next/server";

function isPrivateIp(ip: string) {
  if (!ip) return true;
  const clean = ip.trim();
  if (clean === "127.0.0.1" || clean === "::1" || clean === "::ffff:127.0.0.1" || clean === "localhost") return true;
  if (clean.startsWith("10.") || clean.startsWith("192.168.") || clean.startsWith("172.16.") || clean.startsWith("172.17.") || clean.startsWith("172.18.") || clean.startsWith("172.19.") || clean.startsWith("172.20.") || clean.startsWith("172.21.") || clean.startsWith("172.22.") || clean.startsWith("172.23.") || clean.startsWith("172.24.") || clean.startsWith("172.25.") || clean.startsWith("172.26.") || clean.startsWith("172.27.") || clean.startsWith("172.28.") || clean.startsWith("172.29.") || clean.startsWith("172.30.") || clean.startsWith("172.31.")) return true;
  if (clean.includes("::ffff:")) return true;
  return false;
}

function getRealIp(req: NextRequest): string {
  const headers = [
    req.headers.get("cf-connecting-ip"),
    req.headers.get("x-real-ip"),
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    req.headers.get("x-client-ip"),
    req.headers.get("true-client-ip"),
    req.headers.get("x-forwarded"),
    req.headers.get("forwarded")?.split("=")?.[1],
  ];
  for (const h of headers) {
    if (h && !isPrivateIp(h) && h.length > 6) return h;
  }
  return "";
}

export async function GET(req: NextRequest) {
  try {
    const userIp = getRealIp(req);
    let data: any = null;

    if (userIp) {
      // Works with VPN IPs too - ipinfo returns VPN server location
      try {
        const r = await fetch(`https://ipinfo.io/${userIp}/json`, { cache: "no-store", headers: { Accept: "application/json" } });
        if (r.ok) {
          data = await r.json();
          if (data.bogon) {
            // Bogon means private, try ipapi
            throw new Error("bogon");
          }
          data.ip = userIp;
        }
      } catch {
        try {
          const r2 = await fetch(`https://ipapi.co/${userIp}/json/`, { cache: "no-store" });
          if (r2.ok) {
            const d2 = await r2.json();
            if (!d2.error) {
              data = {
                ip: userIp,
                city: d2.city || "Unknown",
                region: d2.region || "",
                country: d2.country_name || d2.country || "",
                loc: d2.latitude && d2.longitude ? `${d2.latitude},${d2.longitude}` : "",
                org: d2.org || d2.asn || "Unknown ISP",
                timezone: d2.timezone || "",
                postal: d2.postal || "",
              };
            }
          }
        } catch {}
      }
    }

    if (!data || !data.ip || isPrivateIp(data.ip) || data.bogon) {
      // Localhost dev or private IP - get public IP (works with VPN, shows VPN IP)
      try {
        const r = await fetch("https://ipinfo.io/json", { cache: "no-store" });
        if (r.ok) {
          data = await r.json();
          if (data.bogon) throw new Error("bogon");
        }
      } catch {
        try {
          const ipR = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
          const ipJ = await ipR.json();
          const locR = await fetch(`https://ipinfo.io/${ipJ.ip}/json`, { cache: "no-store" });
          if (locR.ok) data = await locR.json();
        } catch {}
      }
    }

    if (!data || !data.ip || isPrivateIp(data.ip)) {
      return NextResponse.json({
        ip: userIp || "Unknown",
        city: "Lahore",
        region: "Punjab",
        country: "Pakistan",
        loc: "31.5204,74.3587",
        org: "PTCL",
        timezone: "Asia/Karachi",
        postal: "",
      }, { headers: { "Cache-Control": "no-store" } });
    }

    // Ensure loc exists even for VPN IPs
    if (!data.loc || data.loc === "") {
      data.loc = "31.5204,74.3587";
    }

    return NextResponse.json(data, { headers: { "Cache-Control": "no-store, no-cache" } });
  } catch (e: any) {
    return NextResponse.json({
      ip: "Unknown",
      city: "Lahore",
      region: "Punjab",
      country: "Pakistan",
      loc: "31.5204,74.3587",
      org: "PTCL",
      timezone: "Asia/Karachi",
      postal: "",
    }, { status: 200, headers: { "Cache-Control": "no-store" } });
  }
}
