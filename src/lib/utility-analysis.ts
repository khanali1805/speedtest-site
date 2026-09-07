export type UtilityKind = "electricity" | "gas" | "water";

export type UtilityReading = {
  usage: number;
  amount: number | null;
  previousUsage?: number | null;
  previousAmount?: number | null;
};

export type UtilityAnalysis = {
  usage: number;
  amount: number | null;
  previousUsage: number | null;
  previousAmount: number | null;
  usageDelta: number | null;
  usagePercent: number | null;
  amountDelta: number | null;
  amountPercent: number | null;
  direction: "up" | "down" | "flat" | "unknown";
};

function finite(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function percentChange(current: number, previous: number | null) {
  if (previous == null || previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function analyzeUtilityReading(
  reading: UtilityReading
): UtilityAnalysis {
  const usage = finite(reading.usage);
  if (usage == null || usage < 0) {
    throw new Error("Usage must be a finite non-negative number.");
  }

  const amount = finite(reading.amount);
  const previousUsage = finite(reading.previousUsage);
  const previousAmount = finite(reading.previousAmount);

  const usageDelta =
    previousUsage == null ? null : usage - previousUsage;
  const amountDelta =
    amount == null || previousAmount == null
      ? null
      : amount - previousAmount;

  const usagePercent = percentChange(usage, previousUsage);
  const amountPercent =
    amount == null ? null : percentChange(amount, previousAmount);

  const basis = usagePercent ?? amountPercent;

  return {
    usage,
    amount,
    previousUsage,
    previousAmount,
    usageDelta,
    usagePercent,
    amountDelta,
    amountPercent,
    direction:
      basis == null
        ? "unknown"
        : Math.abs(basis) < 0.01
          ? "flat"
          : basis > 0
            ? "up"
            : "down",
  };
}

export function verifyMeterUsage(
  currentMeter: number,
  previousMeter: number,
  billedUsage: number
) {
  if (
    !Number.isFinite(currentMeter) ||
    !Number.isFinite(previousMeter) ||
    !Number.isFinite(billedUsage)
  ) {
    throw new Error("Meter and billed usage values must be finite numbers.");
  }

  const meterUsage = currentMeter - previousMeter;
  if (meterUsage < 0) {
    throw new Error("Current meter reading cannot be below previous reading.");
  }

  const difference = meterUsage - billedUsage;
  const percentDifference =
    billedUsage === 0
      ? null
      : (difference / Math.abs(billedUsage)) * 100;

  return {
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
  } as const;
}

export function compareUtilityPeriods(
  current: UtilityReading,
  previous: UtilityReading
) {
  return analyzeUtilityReading({
    usage: current.usage,
    amount: current.amount,
    previousUsage: previous.usage,
    previousAmount: previous.amount,
  });
}

export function estimateAmountFromRate(
  usage: number,
  rate: number,
  fixedCharge = 0
) {
  if (
    !Number.isFinite(usage) ||
    usage < 0 ||
    !Number.isFinite(rate) ||
    rate < 0 ||
    !Number.isFinite(fixedCharge) ||
    fixedCharge < 0
  ) {
    throw new Error("Usage, rate and fixed charge must be valid non-negative numbers.");
  }

  return usage * rate + fixedCharge;
}