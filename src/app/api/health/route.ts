import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "smartcalc",
    timestamp: new Date().toISOString(),
    capabilities: {
      calculators: true,
      utilityAnalysis: true,
      utilityVerification: true,
      wifiPing: true,
      wifiSpeed: true,
      ads: false,
    },
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}