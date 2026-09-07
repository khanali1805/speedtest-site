import type { WifiSample } from "@/types/wifi";

export function calculateWifiQuality(sample: Pick<WifiSample, "latencyMs" | "downloadMbps" | "accuracyMeters">) {
  const latency = sample.latencyMs;
  const download = sample.downloadMbps;

  let score = 100;

  if (latency > 80) score -= 20;
  if (latency > 150) score -= 20;
  if (latency > 300) score -= 25;

  if (download < 50) score -= 10;
  if (download < 20) score -= 15;
  if (download < 5) score -= 20;

  if (sample.accuracyMeters > 30) score -= 10;

  score = Math.max(0, Math.min(100, score));

  if (score >= 70) return { score, label: "Strong" as const };
  if (score >= 40) return { score, label: "Fair" as const };
  return { score, label: "Weak" as const };
}

export function calculateDownloadMbps(bytes: number, elapsedMs: number) {
  if (elapsedMs <= 0) return 0;
  return (bytes * 8) / (elapsedMs / 1000) / 1_000_000;
}
