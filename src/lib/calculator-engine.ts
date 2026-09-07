export type CalculatorKind =
  | "electricity"
  | "gas"
  | "water"
  | "percentage"
  | "unit";

export type CalculatorResult = {
  kind: CalculatorKind;
  inputs: Record<string, number>;
  values: Record<string, number>;
  unit: string;
  formula: string;
};

function finite(value: number, fallback = 0): number {
  return Number.isFinite(value) ? value : fallback;
}

export function calculateElectricity(kwh: number, rate: number, fixedCharge = 0): CalculatorResult {
  const usage = Math.max(0, finite(kwh));
  const unitRate = Math.max(0, finite(rate));
  const fixed = Math.max(0, finite(fixedCharge));
  const energyCost = usage * unitRate;
  return {
    kind: "electricity",
    inputs: { kwh: usage, rate: unitRate, fixedCharge: fixed },
    values: { usage, energyCost, fixedCharge: fixed, total: energyCost + fixed },
    unit: "currency",
    formula: "kWh x rate + fixed charge",
  };
}

export function calculateGas(units: number, rate: number, fixedCharge = 0): CalculatorResult {
  const usage = Math.max(0, finite(units));
  const unitRate = Math.max(0, finite(rate));
  const fixed = Math.max(0, finite(fixedCharge));
  const usageCost = usage * unitRate;
  return {
    kind: "gas",
    inputs: { units: usage, rate: unitRate, fixedCharge: fixed },
    values: { usage, usageCost, fixedCharge: fixed, total: usageCost + fixed },
    unit: "currency",
    formula: "gas units x rate + fixed charge",
  };
}

export function calculateWater(units: number, rate: number, fixedCharge = 0): CalculatorResult {
  const usage = Math.max(0, finite(units));
  const unitRate = Math.max(0, finite(rate));
  const fixed = Math.max(0, finite(fixedCharge));
  const usageCost = usage * unitRate;
  return {
    kind: "water",
    inputs: { units: usage, rate: unitRate, fixedCharge: fixed },
    values: { usage, usageCost, fixedCharge: fixed, total: usageCost + fixed },
    unit: "currency",
    formula: "water units x rate + fixed charge",
  };
}

export function calculatePercentageChange(previous: number, current: number): CalculatorResult {
  const from = finite(previous);
  const to = finite(current);
  const delta = to - from;
  const percent = from === 0 ? (to === 0 ? 0 : null) : (delta / Math.abs(from)) * 100;
  return {
    kind: "percentage",
    inputs: { previous: from, current: to },
    values: { previous: from, current: to, delta, percent: percent ?? NaN },
    unit: "%",
    formula: "(current - previous) / |previous| x 100",
  };
}

export function convertUnits(value: number, from: "kwh" | "wh" | "m3" | "liters", to: "kwh" | "wh" | "m3" | "liters"): CalculatorResult {
  const input = finite(value);
  const factors: Record<string, number> = {
    kwh: 1,
    wh: 0.001,
    m3: 1,
    liters: 0.001,
  };
  if (!(from in factors) || !(to in factors)) {
    throw new Error("Unsupported conversion unit.");
  }
  const base = input * factors[from];
  const result = base / factors[to];
  return {
    kind: "unit",
    inputs: { value: input },
    values: { input, result },
    unit: to,
    formula: "value x source factor / target factor",
  };
}