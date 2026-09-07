export type WifiQualityLabel = "Strong" | "Fair" | "Weak";

export type WifiSample = {
  id: string;
  timestamp: number;
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  latencyMs: number;
  downloadMbps: number;
  qualityScore: number;
  qualityLabel: WifiQualityLabel;
  effectiveType?: string;
};
