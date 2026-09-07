"use client";

import { useMemo, useState } from "react";

function money(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ElectricityCalculator() {
  const [units, setUnits] = useState("350");
  const [rate, setRate] = useState("33.5");
  const [fixed, setFixed] = useState("0");
  const [tax, setTax] = useState("0");
  const [adjustments, setAdjustments] = useState("0");

  const result = useMemo(() => {
    const u = Math.max(0, Number(units) || 0);
    const r = Math.max(0, Number(rate) || 0);
    const f = Math.max(0, Number(fixed) || 0);
    const t = Math.max(0, Number(tax) || 0);
    const a = Number(adjustments) || 0;

    const energy = u * r;
    return {
      units: u,
      energy,
      fixed: f,
      tax: t,
      adjustments: a,
      total: energy + f + t + a,
    };
  }, [units, rate, fixed, tax, adjustments]);

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-500">Manual mode</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Enter your bill details
            </h2>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            Live calculation
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="Units consumed" suffix="kWh">
            <input
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              inputMode="decimal"
              type="number"
              min="0"
              className="field-input"
            />
          </Field>

          <Field label="Energy rate" suffix="Rs / kWh">
            <input
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              inputMode="decimal"
              type="number"
              min="0"
              step="0.01"
              className="field-input"
            />
          </Field>

          <Field label="Fixed charges" suffix="Rs">
            <input
              value={fixed}
              onChange={(e) => setFixed(e.target.value)}
              inputMode="decimal"
              type="number"
              min="0"
              className="field-input"
            />
          </Field>

          <Field label="Taxes" suffix="Rs">
            <input
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              inputMode="decimal"
              type="number"
              min="0"
              className="field-input"
            />
          </Field>

          <Field label="Adjustments" suffix="Rs" full>
            <input
              value={adjustments}
              onChange={(e) => setAdjustments(e.target.value)}
              inputMode="decimal"
              type="number"
              className="field-input"
              placeholder="0 or negative adjustment"
            />
          </Field>
        </div>

        <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          <strong className="text-slate-900">Next step:</strong> the same screen
          will support uploading a bill image and meter image, then reviewing
          the detected readings before this calculation is finalized.
        </div>
      </section>

      <section className="rounded-[28px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
        <div className="text-sm font-medium text-slate-400">Estimated result</div>
        <div className="mt-3 text-5xl font-semibold tracking-[-0.04em]">
          {money(result.total)}
        </div>
        <div className="mt-2 text-sm text-slate-400">Based on the values above</div>

        <div className="mt-9 space-y-4">
          <SummaryRow label={`${result.units} kWh × rate`} value={money(result.energy)} />
          <SummaryRow label="Fixed charges" value={money(result.fixed)} />
          <SummaryRow label="Taxes" value={money(result.tax)} />
          <SummaryRow label="Adjustments" value={money(result.adjustments)} />
        </div>

        <div className="mt-7 border-t border-white/10 pt-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Estimated total</span>
            <span className="text-xl font-semibold">{money(result.total)}</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-xs text-slate-500">Energy charges</div>
            <div className="mt-1 font-semibold">{money(result.energy)}</div>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-xs text-slate-500">Units</div>
            <div className="mt-1 font-semibold">{result.units} kWh</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  suffix,
  children,
  full = false,
}: {
  label: string;
  suffix: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-800">{label}</span>
        <span className="text-xs text-slate-400">{suffix}</span>
      </div>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-semibold text-slate-100">{value}</span>
    </div>
  );
}
