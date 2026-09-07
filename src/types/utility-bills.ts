export type UtilityType = "electricity" | "gas" | "water";

export type ExtractedBillData = {
  provider?: string;
  billingPeriod?: string;
  previousReading?: number;
  currentReading?: number;
  units?: number;
  totalAmount?: number;
};

export type VerificationStatus =
  | "match"
  | "mismatch"
  | "insufficient-data"
  | "needs-review";

export type VerificationResult = {
  status: VerificationStatus;
  billUnits: number | null;
  meterUnits: number | null;
  difference: number | null;
  message: string;
};