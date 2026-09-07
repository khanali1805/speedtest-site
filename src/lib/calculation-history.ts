"use client";

export type CalculationHistoryItem = {
  id: string;
  createdAt: string;
  calculator: string;
  title: string;
  inputs: Record<string, number>;
  values: Record<string, number>;
  formula: string;
};

const KEY = "smartcalc.calculation-history.v1";
const LIMIT = 100;

function read(): CalculationHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: CalculationHistoryItem[]) {
  window.localStorage.setItem(KEY, JSON.stringify(items.slice(0, LIMIT)));
  window.dispatchEvent(new CustomEvent("smartcalc-history-updated"));
}

export function getCalculationHistory() {
  return read();
}

export function saveCalculationHistory(item: Omit<CalculationHistoryItem, "id" | "createdAt">) {
  const next: CalculationHistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  write([next, ...read()]);
  return next;
}

export function clearCalculationHistory() {
  write([]);
}