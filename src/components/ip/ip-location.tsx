"use client";
import { useEffect, useState } from "react";

type IpInfo = { ip: string; city: string; region: string; country: string; loc: string; org: string; timezone: string; postal: string; };

export default function IpLocation() {
  const [info, setInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchIp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ip", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.ip && data.ip !== "127.0.0.1" && data.ip !== "::1") { setInfo(data); setLoading(false); return; }
      }
      throw new Error();
    } catch {
      try {
        const r = await fetch("https://ipinfo.io/json", { cache: "no-store" });
        const d = await r.json(); setInfo(d); setLoading(false);
      } catch {
        try {
          const ipR = await fetch("https://api.ipify.org?format=json");
          const ipJ = await ipR.json();
          const locR = await fetch(`https://ipapi.co/${ipJ.ip}/json/`);
          const locJ = await locR.json();
          setInfo({ ip: locJ.ip || ipJ.ip, city: locJ.city || "Lahore", region: locJ.region || "Punjab", country: locJ.country_name || locJ.country || "PK", loc: locJ.latitude && locJ.longitude ? `${locJ.latitude},${locJ.longitude}` : "31.5204,74.3587", org: locJ.org || "PTCL", timezone: locJ.timezone || "Asia/Karachi", postal: locJ.postal || "" });
          setLoading(false);
        } catch { setLoading(false); }
      }
    }
  };

  useEffect(() => { fetchIp(); }, []);

  if (loading) {
    return (
      <div className="max-w-[900px] mx-auto rounded-[20px] border border-slate-200 bg-white p-7">
        <h1 className="text-[22px] font-bold">What is My IP</h1>
        <p className="mt-1 text-[13px] text-slate-500">Detecting your IP...</p>
        <div className="mt-6 h-2 w-full animate-pulse rounded-full bg-slate-100" />
      </div>
    );
  }

  if (!info) return <div className="max-w-[900px] mx-auto p-7"><button onClick={fetchIp} className="rounded-[12px] bg-slate-900 px-6 py-3 text-white text-[13px] font-semibold">Retry</button></div>;

  const [lat, lon] = info.loc ? info.loc.split(",").map(Number) : [31.5204, 74.3587];

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      <div className="rounded-[20px] border border-slate-200 bg-white p-7">
        <h1 className="text-[22px] font-bold tracking-tight text-slate-900">What is My IP</h1>
        <p className="mt-1 text-[13px] text-slate-500">Your public IP address - each visitor sees their own IP</p>

        <div className="mt-6 rounded-[16px] bg-slate-900 p-6 text-white">
          <div className="text-[11px] uppercase tracking-wide text-slate-400">Your IP Address</div>
          <div className="mt-3 flex items-center gap-4 flex-wrap">
            <div className="text-[28px] font-bold tracking-tight break-all">{info.ip}</div>
            <button onClick={() => { navigator.clipboard.writeText(info.ip); }} className="rounded-[10px] bg-white/10 px-4 py-2 text-[12px] font-semibold hover:bg-white/20">Copy</button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-[12px] bg-white/10 p-4"><div className="text-[10px] uppercase text-slate-400">ISP</div><div className="mt-1 text-[12px] font-semibold leading-4">{info.org}</div></div>
            <div className="rounded-[12px] bg-white/10 p-4"><div className="text-[10px] uppercase text-slate-400">City</div><div className="mt-1 text-[13px] font-semibold">{info.city}, {info.region}</div></div>
            <div className="rounded-[12px] bg-white/10 p-4"><div className="text-[10px] uppercase text-slate-400">Country</div><div className="mt-1 text-[13px] font-semibold">{info.country} {info.postal}</div></div>
            <div className="rounded-[12px] bg-white/10 p-4"><div className="text-[10px] uppercase text-slate-400">Timezone</div><div className="mt-1 text-[13px] font-semibold">{info.timezone}</div></div>
          </div>
        </div>
      </div>

      <div className="rounded-[20px] border border-slate-200 bg-white p-7">
        <h2 className="text-[16px] font-semibold text-slate-900">Location Map</h2>
        <p className="mt-1 text-[12px] text-slate-500">Based on your IP: {info.city}, {info.country} • Works with VPN - shows VPN server location</p>
        <div className="mt-5 aspect-[16/10] max-h-[480px] overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50">
          <iframe key={`${lat},${lon}`} width="100%" height="100%" style={{ border: 0 }} loading="lazy" src={`https://www.google.com/maps?q=${lat},${lon}&z=11&output=embed`} />
        </div>
      </div>
    </div>
  );
}
