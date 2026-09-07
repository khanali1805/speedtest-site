export function calculateConsumption(previousReading: number, currentReading: number): number {
  if (currentReading < previousReading) {
    throw new Error("Current meter reading cannot be lower than previous reading.");
  }

  return currentReading - previousReading;
}

export function calculatePercentageChange(previous: number, current: number): number | null {
  if (previous === 0) {
    return null;
  }

  return ((current - previous) / previous) * 100;
}

export function calculateElectricityBill(
  units: number,
  ratePerUnit: number,
  fixedCharges = 0,
  taxes = 0,
  adjustments = 0,
) {
  const energyCharges = units * ratePerUnit;
  const total = energyCharges + fixedCharges + taxes + adjustments;

  return {
    units,
    energyCharges,
    fixedCharges,
    taxes,
    adjustments,
    total,
  };
}
