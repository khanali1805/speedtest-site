import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Body = {
  currentMeter?: unknown;
  previousMeter?: unknown;
  billedUsage?: unknown;
};

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;

    const currentMeter = numberValue(body.currentMeter);
    const previousMeter = numberValue(body.previousMeter);
    const billedUsage = numberValue(body.billedUsage);

    if (currentMeter == null || previousMeter == null || billedUsage == null) {
      return NextResponse.json(
        { ok: false, error: "currentMeter, previousMeter and billedUsage are required numbers." },
        { status: 400 }
      );
    }

    if (currentMeter < previousMeter || billedUsage < 0) {
      return NextResponse.json(
        { ok: false, error: "Meter readings and billed usage are invalid." },
        { status: 400 }
      );
    }

    const meterUsage = currentMeter - previousMeter;
    const difference = meterUsage - billedUsage;
    const percentDifference =
      billedUsage === 0
        ? null
        : (difference / Math.abs(billedUsage)) * 100;

    return NextResponse.json(
      {
        ok: true,
        meterUsage,
        billedUsage,
        difference,
        percentDifference,
        status:
          percentDifference == null
            ? "unknown"
            : Math.abs(percentDifference) <= 2
              ? "match"
              : "review",
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON request." },
      { status: 400 }
    );
  }
}