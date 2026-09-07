import { NextResponse } from "next/server";
import {
  calculateElectricity,
  calculateGas,
  calculateWater,
  calculatePercentageChange,
  convertUnits,
} from "@/lib/calculator-engine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const kind = String(body?.kind || "");

    let result;
    if (kind === "electricity") {
      result = calculateElectricity(Number(body.kwh), Number(body.rate), Number(body.fixedCharge || 0));
    } else if (kind === "gas") {
      result = calculateGas(Number(body.units), Number(body.rate), Number(body.fixedCharge || 0));
    } else if (kind === "water") {
      result = calculateWater(Number(body.units), Number(body.rate), Number(body.fixedCharge || 0));
    } else if (kind === "percentage") {
      result = calculatePercentageChange(Number(body.previous), Number(body.current));
    } else if (kind === "unit") {
      result = convertUnits(Number(body.value), body.from, body.to);
    } else {
      return NextResponse.json({ error: "Unsupported calculator." }, { status: 400 });
    }

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Calculation failed." },
      { status: 400 },
    );
  }
}