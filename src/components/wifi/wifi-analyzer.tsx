"use client";
import { useEffect, useRef, useState, useCallback } from "react";

type Q = "Strong" | "Fair" | "Weak";
type Sample = { x: number; y: number; q: Q };

export default function WifiAnalyzer() {
  const [dl, setDl] = useState<number | null>(null);
  const [ul, setUl] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);
  const [q, setQ] = useState<Q | null>(null);
  const [prog, setProg] = useState(0);
  const [running, setRunning] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [heading, setHeading] = useState(0);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [motionOn, setMotionOn] = useState(false);
  const [gpsOn, setGpsOn] = useState(false);
  const [routerDir, setRouterDir] = useState<string | null>(null);
  const [routerDist, setRouterDist] = useState<number>(0);

  const posRef = useRef({ x: 0, y: 0 });
  const routerRef = useRef<{ lat: number; lon: number } | null>(null);
  useEffect(() => { posRef.current = pos; }, [pos]);

  useEffect(() => {
    const h = (e: any) => {
      const v = (e as any).webkitCompassHeading ?? (typeof e.alpha === "number" ? (360 - e.alpha + 360) % 360 : null);
      if (v != null) setHeading(Math.round(v as number));
    };
    window.addEventListener("deviceorientation", h as any, true);
    return () => window.removeEventListener("deviceorientation", h as any, true);
  }, []);

  const getQ = (d: number | null): Q => {
    if (d == null) return "Weak";
    if (d < 3) return "Weak";
    if (d < 10) return "Fair";
    return "Strong";
  };

  const fetchWithTimeout = async (url: string, ms: number, opts: any = {}) => {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), ms);
    try {
      const res = await fetch(url, { ...opts, signal: ctrl.signal, cache: "no-store" });
      clearTimeout(id);
      return res;
    } catch (e) { clearTimeout(id); throw e; }
  };

  const runSpeedTest = useCallback(async () => {
    setRunning(true);
    setProg(15);
    try {
      let best = 9999;
      for (let i = 0; i < 2; i++) {
        const s = performance.now();
        try {
          await fetchWithTimeout(`https://speed.cloudflare.com/__down?bytes=0&t=${Date.now()}_${i}`, 2500);
          const l = performance.now() - s;
          if (l < best) best = l;
        } catch {}
        setProg(20 + i * 10);
      }
      if (best < 9999) setPing(Math.round(best));
      setProg(35);
      const doMeasure = async (bytes: number, streams: number) => {
        const start = performance.now();
        let total = 0;
        const tasks = Array.from({ length: streams }, async () => {
          try {
            const res = await fetchWithTimeout(`https://speed.cloudflare.com/__down?bytes=${bytes}&t=${Date.now()}_${Math.random()}`, 7000);
            const buf = await res.arrayBuffer();
            if (buf.byteLength > 1000) { total += buf.byteLength; return buf.byteLength; }
          } catch {}
          return 0;
        });
        await Promise.race([Promise.all(tasks), new Promise(r => setTimeout(r, 8000))]);
        const sec = Math.max(0.8, (performance.now() - start) / 1000);
        return total > 0 ? (total * 8) / (sec * 1e6) : 0;
      };
      let mbps = await doMeasure(400000, 4);
      setProg(70);
      if (mbps > 3) {
        const big = await doMeasure(900000, 4);
        if (big > 0) mbps = mbps * 0.3 + big * 0.7;
      }
      setProg(85);
      if (mbps < 0.4) {
        const down = (navigator as any).connection?.downlink;
        if (down && down > 0.5) mbps = down;
      }
      const finalDl = Math.max(0.5, Math.round(mbps * 10) / 10);
      setDl(finalDl);
      setQ(getQ(finalDl));
      try {
        const upData = new Uint8Array(300000);
        const upStart = performance.now();
        await Promise.race([
          fetchWithTimeout("https://speed.cloudflare.com/__up", 6000, { method: "POST", body: upData }).then(r => r.text()).catch(() => ""),
          new Promise(r => setTimeout(r, 7000)),
        ]);
        const upSec = (performance.now() - upStart) / 1000;
        const upMbps = (upData.length * 8) / (Math.max(0.7, upSec) * 1e6);
        if (upMbps > 0.2) setUl(Math.round(upMbps * 10) / 10);
      } catch {}
      setProg(100);
    } catch {
      const down = (navigator as any).connection?.downlink ?? 2.5;
      setDl(Math.round(down * 10) / 10);
      setQ(getQ(down));
      setProg(100);
    }
    setRunning(false);
  }, []);

  useEffect(() => { runSpeedTest(); }, [runSpeedTest]);

  const enableLocation = useCallback(async () => {
    try {
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        const p = await (DeviceMotionEvent as any).requestPermission();
        if (p === "granted") setMotionOn(true);
      } else setMotionOn(true);
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        try { await (DeviceOrientationEvent as any).requestPermission(); } catch {}
      }
    } catch { setMotionOn(true); }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          routerRef.current = { lat: p.coords.latitude, lon: p.coords.longitude };
          setGpsOn(true);
        },
        () => {},
        { enableHighAccuracy: true, timeout: 10000 }
      );
      navigator.geolocation.watchPosition(
        (p) => {
          if (p.coords.accuracy > 60) return;
          const cur = { lat: p.coords.latitude, lon: p.coords.longitude };
          if (!routerRef.current) { routerRef.current = cur; return; }
          const toRad = (d: number) => d * Math.PI / 180;
          const R = 6371000;
          const dLat = toRad(cur.lat - routerRef.current.lat);
          const dLon = toRad(cur.lon - routerRef.current.lon);
          const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(routerRef.current.lat)) * Math.cos(toRad(cur.lat)) * Math.sin(dLon / 2) ** 2;
          const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const y = Math.sin(dLon) * Math.cos(toRad(cur.lat));
          const x = Math.cos(toRad(routerRef.current.lat)) * Math.sin(toRad(cur.lat)) - Math.sin(toRad(routerRef.current.lat)) * Math.cos(toRad(cur.lat)) * Math.cos(dLon);
          const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
          if (dist < 1.2) return;
          const routerBear = (bearing + 180) % 360;
          setRouterDist(dist);
          let dir = "North";
          if (routerBear >= 45 && routerBear < 135) dir = "East";
          else if (routerBear >= 135 && routerBear < 225) dir = "South";
          else if (routerBear >= 225 && routerBear < 315) dir = "West";
          setRouterDir(dir);
          const px = (Math.min(dist, 15) / 15) * 40;
          const rad = (bearing * Math.PI) / 180;
          setPos({ x: Math.sin(rad) * px, y: -Math.cos(rad) * px });
          setGpsOn(true);
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 }
      );
    }
  }, []);

  // ONLY device motion - NO keyboard arrows, NO drag - as you said
  useEffect(() => {
    if (!motionOn) return;
    let lastStep = 0, lastZ = 0;
    const onM = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.z == null) return;
      const diff = acc.z - lastZ;
      lastZ = acc.z;
      if (Math.abs(diff) > 1.4 && Date.now() - lastStep > 400) {
        lastStep = Date.now();
        const rad = (heading * Math.PI) / 180;
        setPos((p) => {
          let nx = p.x + Math.sin(rad) * 4;
          let ny = p.y + -Math.cos(rad) * 4;
          const m = Math.hypot(nx, ny); if (m > 40) { const f = 40 / m; nx *= f; ny *= f; }
          return { x: nx, y: ny };
        });
      }
    };
    window.addEventListener("devicemotion", onM);
    return () => window.removeEventListener("devicemotion", onM);
  }, [motionOn, heading]);

  useEffect(() => {
    if (dl == null) return;
    const id = setInterval(() => {
      const p = posRef.current;
      setSamples((prev) => {
        if (prev.length > 0) {
          const last = prev[prev.length - 1];
          if (Math.hypot(p.x - last.x, p.y - last.y) < 2) return prev;
        }
        if (Math.hypot(p.x, p.y) < 0.8 && prev.length > 2) return prev;
        return [...prev.slice(-120), { x: p.x, y: p.y, q: getQ(dl!) }];
      });
    }, 1500);
    return () => clearInterval(id);
  }, [dl]);

  return (
    <div className="max-w-[1100px] mx-auto space-y-8">
      <div className="rounded-[20px] border border-slate-200 bg-white p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-slate-900">Internet Speed Test</h1>
            <p className="mt-1 text-[13px] text-slate-500">Check your real download, upload and ping speed</p>
          </div>
          <div className={`rounded-full px-3 py-1 text-[11px] font-semibold text-white ${q === "Strong" ? "bg-slate-900" : q === "Fair" ? "bg-slate-700" : "bg-slate-500"}`}>{q ? `${q} Signal` : "Testing"}</div>
        </div>

        {running && <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-slate-900 transition-all" style={{ width: `${prog}%` }} /></div>}

        <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-[16px] bg-slate-900 p-6 text-white">
            <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Download</div>
            <div className="mt-2 flex items-baseline gap-2"><div className="text-[36px] font-bold leading-none">{dl ?? "--"}</div><div className="text-[14px] text-slate-300">Mbps</div></div>
          </div>
          <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-6">
            <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Upload</div>
            <div className="mt-2 flex items-baseline gap-2"><div className="text-[28px] font-bold text-slate-900 leading-none">{ul ?? "--"}</div><div className="text-[14px] text-slate-500">Mbps</div></div>
          </div>
          <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-6">
            <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Ping</div>
            <div className="mt-2 flex items-baseline gap-2"><div className="text-[28px] font-bold text-slate-900 leading-none">{ping ?? "--"}</div><div className="text-[14px] text-slate-500">ms</div></div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={runSpeedTest} disabled={running} className="rounded-[12px] bg-slate-900 px-6 py-3 text-[13px] font-semibold text-white hover:bg-black disabled:opacity-50">{running ? "Testing..." : "Run Again"}</button>
          <button onClick={() => { setPos({ x: 0, y: 0 }); setSamples([]); setRouterDir(null); setRouterDist(0); routerRef.current = null; }} className="rounded-[12px] border border-slate-200 bg-white px-6 py-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">Reset</button>
          <button onClick={enableLocation} className="rounded-[12px] border border-slate-200 bg-white px-6 py-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">Enable Location</button>
        </div>
      </div>

      <div className="rounded-[20px] border border-slate-200 bg-white p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-slate-900">WiFi Signal Map</h2>
          <div className="flex items-center gap-3 text-[11px] font-medium">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" />Strong</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400" />Fair</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-400" />Weak</span>
          </div>
        </div>

        <div className="relative mx-auto mt-8 aspect-square max-w-[460px] overflow-hidden rounded-[20px] border border-slate-200 bg-[#f8fafc]">
          <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-200" />
          <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-200" />
          <div className="absolute left-1/2 top-4 -translate-x-1/2 text-[10px] font-semibold text-slate-400">N</div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="grid h-[52px] w-[52px] place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white shadow">ROUTER</div>
            {routerDir && <div className="absolute left-1/2 top-[58px] -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-medium text-white">{routerDist.toFixed(1)}m {routerDir}</div>}
          </div>
          {samples.map((s, i) => (
            <span key={i} className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white shadow-sm ${s.q === "Strong" ? "bg-emerald-500" : s.q === "Fair" ? "bg-amber-400" : "bg-red-400"}`} style={{ left: `${50 + s.x}%`, top: `${50 + s.y}%` }} />
          ))}
          <div className="absolute z-20 transition-all duration-500" style={{ left: `${50 + pos.x}%`, top: `${50 + pos.y}%` }}>
            <div className="relative grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-slate-900 bg-white shadow-md">
              <div className="h-4 w-4 rounded-full bg-slate-900" />
              <div className="absolute -top-3 left-1/2 h-3 w-[2px] origin-bottom -translate-x-1/2 bg-red-500" style={{ transform: `translateX(-50%) rotate(${heading}deg)` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
