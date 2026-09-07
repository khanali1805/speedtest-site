"use client";
import { useEffect, useState } from "react";

export default function WifiRuntimeDiagnostics() {
  const [secure, setSecure] = useState(false);
  const [geo, setGeo] = useState(false);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    setSecure(window.isSecureContext);
    setGeo("geolocation" in navigator);
    setOnline(navigator.onLine);
  }, []);

  return (
    <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] font-black uppercase tracking-wider text-slate-500">
      <span className="rounded-lg bg-slate-50 px-2 py-2 text-center">Online {online ? "OK" : "NO"}</span>
      <span className="rounded-lg bg-slate-50 px-2 py-2 text-center">GPS {geo ? "OK" : "NO"}</span>
      <span className="rounded-lg bg-slate-50 px-2 py-2 text-center">Secure {secure ? "YES" : "HTTP"}</span>
    </div>
  );
}