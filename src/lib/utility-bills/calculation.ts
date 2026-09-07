import type { VerificationResult } from "@/types/utility-bills";

export function toNumber(value: string | number | null | undefined): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const parsed = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

export function calculateConsumption(
  previousReading: number,
  currentReading: number,
): number {
  if (!Number.isFinite(previousReading) || !Number.isFinite(currentReading)) {
    throw new Error("Meter readings must be valid numbers.");
  }

  if (currentReading < previousReading) {
    throw new Error(
      "Current meter reading cannot be lower than the previous reading.",
    );
  }

  return currentReading - previousReading;
}

export function calculatePercentageChange(
  previous: number,
  current: number,
): number | null {
  if (!Number.isFinite(previous) || !Number.isFinite(current) || previous === 0) {
    return null;
  }

  return ((current - previous) / previous) * 100;
}

export function calculateLinearBill(
  units: number,
  ratePerUnit: number,
  fixedCharges = 0,
  taxes = 0,
  adjustments = 0,
) {
  const energyCharges = Math.max(units, 0) * Math.max(ratePerUnit, 0);
  const total = energyCharges + fixedCharges + taxes + adjustments;

  return {
    energyCharges,
    fixedCharges,
    taxes,
    adjustments,
    total,
  };
}

export function verifyBillAgainstMeter(
  billUnits: number | null,
  previousReading: number | null,
  currentReading: number | null,
): VerificationResult {
  if (
    billUnits == null ||
    previousReading == null ||
    currentReading == null ||
    !Number.isFinite(billUnits) ||
    !Number.isFinite(previousReading) ||
    !Number.isFinite(currentReading)
  ) {
    return {
      status: "insufficient-data",
      billUnits,
      meterUnits: null,
      difference: null,
      message: "Add bill units and both meter readings to verify the result.",
    };
  }

  if (currentReading < previousReading) {
    return {
      status: "needs-review",
      billUnits,
      meterUnits: null,
      difference: null,
      message:
        "The current meter reading is lower than the previous reading. Review the readings before continuing.",
    };
  }

  const meterUnits = currentReading - previousReading;
  const difference = meterUnits - billUnits;

  if (Math.abs(difference) < 0.01) {
    return {
      status: "match",
      billUnits,
      meterUnits,
      difference,
      message: "Bill consumption and meter-derived consumption match.",
    };
  }

  return {
    status: "mismatch",
    billUnits,
    meterUnits,
    difference,
    message:
      "Bill consumption and meter-derived consumption do not match. Review the extracted values and the source images.",
  };
}