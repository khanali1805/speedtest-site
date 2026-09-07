export type WifiGrade = "strong" | "fair" | "weak";

export function classifyWifiQuality(downloadMbps: number | null, latencyMs: number | null): WifiGrade {
  const speed = downloadMbps ?? 0;
  const latency = latencyMs ?? 999;

  if (speed >= 25 && latency <= 100) return "strong";
  if (speed >= 8 && latency <= 220) return "fair";
  return "weak";
}

export function formatMbps(value: number | null) {
  return value == null ? "--" : `${value.toFixed(value >= 10 ? 1 : 2)} Mbps`;
}

export function formatLatency(value: number | null) {
  return value == null ? "--" : `${Math.round(value)} ms`;
}
