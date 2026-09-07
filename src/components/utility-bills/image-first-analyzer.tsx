"use client";

import { useMemo, useState } from "react";

type Props = { utility: "Electricity" | "Gas" | "Water" };

type UploadState = {
  file?: File;
  preview?: string;
  text?: string;
  scanning?: boolean;
};

type Fields = {
  provider: string;
  accountRef: string;
  billingPeriod: string;
  units: string;
  currentReading: string;
  previousReading: string;
  totalAmount: string;
  tariff: string;
  fixedCharges: string;
  taxes: string;
  adjustments: string;
};

type HistoryRow = {
  id: string;
  dateLabel: string;
  units: string;
  amount: string;
  reading: string;
};

const emptyFields: Fields = {
  provider: "",
  accountRef: "",
  billingPeriod: "",
  units: "",
  currentReading: "",
  previousReading: "",
  totalAmount: "",
  tariff: "",
  fixedCharges: "",
  taxes: "",
  adjustments: "",
};

function parseNumber(value: string) {
  const cleaned = value.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  return cleaned ? Number(cleaned[0]) : null;
}

async function loadImageText(file: File) {
  const mod = await import("tesseract.js");
  const worker = await mod.createWorker("eng");
  try {
    const result = await worker.recognize(file);
    return result.data.text;
  } finally {
    await worker.terminate();
  }
}

function firstMatch(text: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return "";
}

function extractFields(text: string): Fields {
  const normalized = text.replace(/\s+/g, " ");

  return {
    provider: firstMatch(normalized, [
      /(?:electricity|gas|water)?\s*(?:provider|utility company|company)\s*[:#-]?\s*([A-Za-z][A-Za-z0-9 &.'-]{2,60})/i,
    ]),
    accountRef: firstMatch(normalized, [
      /(?:account|customer|reference|ref|consumer)\s*(?:no|number|id|#)\s*[:#-]?\s*([A-Za-z0-9-]{4,40})/i,
    ]),
    billingPeriod: firstMatch(normalized, [
      /(?:billing period|bill period|period)\s*[:#-]?\s*([A-Za-z0-9 /,.-]{4,45})/i,
    ]),
    units: firstMatch(normalized, [
      /(?:units|kwh|consumption|usage)\D{0,24}(\d[\d,]*(?:\.\d+)?)/i,
    ]),
    currentReading: firstMatch(normalized, [
      /(?:current|present)\s+(?:meter\s+)?reading\D{0,24}(\d[\d,]*(?:\.\d+)?)/i,
      /(?:current|present)\D{0,12}meter\D{0,12}(\d[\d,]*(?:\.\d+)?)/i,
    ]),
    previousReading: firstMatch(normalized, [
      /(?:previous|prev)\s+(?:meter\s+)?reading\D{0,24}(\d[\d,]*(?:\.\d+)?)/i,
    ]),
    totalAmount: firstMatch(normalized, [
      /(?:total(?:\s+amount)?|amount\s+payable|net\s+amount|bill\s+amount|grand\s+total)\D{0,24}([\d,]+(?:\.\d+)?)/i,
    ]),
    tariff: firstMatch(normalized, [
      /(?:tariff|rate|unit\s*price|price\s*\/?\s*unit)\D{0,24}([\d,]+(?:\.\d+)?)/i,
    ]),
    fixedCharges: firstMatch(normalized, [
      /(?:fixed|service|standing)\s+(?:charge|charges)\D{0,24}([\d,]+(?:\.\d+)?)/i,
    ]),
    taxes: firstMatch(normalized, [
      /(?:tax|taxes|gst|vat)\D{0,24}([\d,]+(?:\.\d+)?)/i,
    ]),
    adjustments: firstMatch(normalized, [
      /(?:adjustment|adjustments|credit|debit)\D{0,24}(-?[\d,]+(?:\.\d+)?)/i,
    ]),
  };
}

function mergeDetected(base: Fields, detected: Fields): Fields {
  const next = { ...base };
  (Object.keys(detected) as (keyof Fields)[]).forEach((key) => {
    if (detected[key]) next[key] = detected[key];
  });
  return next;
}

function percentChange(current: number | null, previous: number | null) {
  if (current == null || previous == null || previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export default function ImageFirstAnalyzer({ utility }: Props) {
  const [currentBill, setCurrentBill] = useState<UploadState>({});
  const [currentMeter, setCurrentMeter] = useState<UploadState>({});
  const [previousBill, setPreviousBill] = useState<UploadState>({});
  const [previousMeter, setPreviousMeter] = useState<UploadState>({});
  const [current, setCurrent] = useState<Fields>(emptyFields);
  const [previous, setPrevious] = useState<Fields>(emptyFields);
  const [compare, setCompare] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("Upload a bill and meter image to begin.");
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [historyLimit, setHistoryLimit] = useState<3 | 6 | 12>(3);
  const [historyBusy, setHistoryBusy] = useState(false);

  const isMobile = typeof window !== "undefined" && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  async function processUpload(
    file: File,
    target: "currentBill" | "currentMeter" | "previousBill" | "previousMeter",
  ) {
    const preview = URL.createObjectURL(file);
    const setState =
      target === "currentBill"
        ? setCurrentBill
        : target === "currentMeter"
          ? setCurrentMeter
          : target === "previousBill"
            ? setPreviousBill
            : setPreviousMeter;

    setState({ file, preview, scanning: true });
    setBusy(true);
    setMessage("Reading the image. Review the detected values before using the result.");

    try {
      const text = await loadImageText(file);
      const fields = extractFields(text);
      setState({ file, preview, text, scanning: false });

      if (target === "currentBill") setCurrent((v) => mergeDetected(v, fields));
      if (target === "currentMeter" && fields.currentReading) {
        setCurrent((v) => ({ ...v, currentReading: fields.currentReading }));
      }
      if (target === "previousBill") setPrevious((v) => mergeDetected(v, fields));
      if (target === "previousMeter" && fields.currentReading) {
        setPrevious((v) => ({ ...v, currentReading: fields.currentReading }));
      }

      setMessage("Scan complete. Detected values are editable below.");
    } catch {
      setState({ file, preview, scanning: false });
      setMessage("The image could not be read automatically. You can correct the extracted values below.");
    } finally {
      setBusy(false);
    }
  }

  async function processHistory(files: FileList | null) {
    if (!files?.length) return;
    setHistoryBusy(true);
    setMessage("Scanning historical bills. This can take a little time because OCR runs in the browser.");

    const selected = Array.from(files).slice(0, historyLimit);
    const rows: HistoryRow[] = [];

    for (const [index, file] of selected.entries()) {
      try {
        const text = await loadImageText(file);
        const parsed = extractFields(text);
        rows.push({
          id: `${file.name}-${index}-${Date.now()}`,
          dateLabel: parsed.billingPeriod || file.name.replace(/\.[^.]+$/, ""),
          units: parsed.units,
          amount: parsed.totalAmount,
          reading: parsed.currentReading,
        });
      } catch {
        rows.push({
          id: `${file.name}-${index}-${Date.now()}`,
          dateLabel: file.name.replace(/\.[^.]+$/, ""),
          units: "",
          amount: "",
          reading: "",
        });
      }
    }

    setHistory(rows);
    setHistoryBusy(false);
    setMessage(`Historical scan complete. Up to ${historyLimit} bills are shown for review.`);
  }

  const meterConsumption = useMemo(() => {
    const prev = parseNumber(previous.currentReading);
    const cur = parseNumber(current.currentReading);
    return prev != null && cur != null && cur >= prev ? cur - prev : null;
  }, [previous.currentReading, current.currentReading]);

  const billUnits = parseNumber(current.units);
  const previousUnits = parseNumber(previous.units);
  const currentBillAmount = parseNumber(current.totalAmount);
  const previousBillAmount = parseNumber(previous.totalAmount);

  const billVsMeterDifference =
    billUnits != null && meterConsumption != null ? meterConsumption - billUnits : null;

  const billVsMeterPercent =
    billUnits != null && billUnits !== 0 && meterConsumption != null
      ? (billVsMeterDifference! / billUnits) * 100
      : null;

  const unitDifference = billUnits != null && previousUnits != null ? billUnits - previousUnits : null;
  const billDifference =
    currentBillAmount != null && previousBillAmount != null
      ? currentBillAmount - previousBillAmount
      : null;

  const unitChange = percentChange(billUnits, previousUnits);
  const billChange = percentChange(currentBillAmount, previousBillAmount);

  const field = (
    label: string,
    value: string,
    onChange: (value: string) => void,
    hint: string,
  ) => (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-wider text-slate-500">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={hint}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none focus:border-cyan-400"
      />
    </label>
  );

  const uploadCard = (
    title: string,
    state: UploadState,
    target: "currentBill" | "currentMeter" | "previousBill" | "previousMeter",
    subtitle: string,
  ) => (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-black text-slate-950">{title}</div>
          <div className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</div>
        </div>
        {state.preview ? (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">
            Uploaded
          </span>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-900 transition hover:border-slate-300 hover:bg-white">
          {isMobile ? "Capture bill image" : "Upload image"}
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            capture={isMobile ? "environment" : undefined}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void processUpload(file, target);
            }}
          />
        </label>

        {isMobile ? (
          <label className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50">
            Choose from gallery
            <input
              className="sr-only"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void processUpload(file, target);
              }}
            />
          </label>
        ) : null}
      </div>

      {state.scanning ? <div className="mt-4 text-xs font-bold text-cyan-700">Analyzing image...</div> : null}

      {state.preview ? (
        <img
          src={state.preview}
          alt={`${title} preview`}
          className="mt-4 h-36 w-full rounded-2xl object-cover"
        />
      ) : null}
    </div>
  );

  const verdict =
    billUnits != null && meterConsumption != null
      ? Math.abs(billUnits - meterConsumption) <= 1
        ? "MATCH"
        : "REVIEW"
      : "Need bill units + both meter readings";

  const verdictClass =
    verdict === "MATCH"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : verdict === "REVIEW"
        ? "border-rose-200 bg-rose-50 text-rose-900"
        : "border-slate-200 bg-white text-slate-900";

  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-slate-50 shadow-[0_24px_80px_-40px_rgba(15,23,42,.25)]">
      <div className="bg-slate-950 px-6 py-7 text-white sm:px-8">
        <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
          {utility} image-first analyzer
        </div>
        <h2 className="mt-2 text-3xl font-black tracking-tight">
          Upload the bill + meter. SmartCalc does the reading work.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Start from the real document, let OCR detect the important fields, review anything uncertain, and then compare the bill with the meter.
        </p>
      </div>

      <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-2">
        {uploadCard("Current bill", currentBill, "currentBill", "Latest bill used for the result.")}
        {uploadCard("Current meter", currentMeter, "currentMeter", "Current meter display for an independent reading source.")}

        <button
          type="button"
          onClick={() => setCompare((v) => !v)}
          className="rounded-2xl border border-slate-300 bg-white px-5 py-4 text-left text-sm font-black text-slate-950 transition hover:border-slate-400 lg:col-span-2"
        >
          {compare ? "Hide previous comparison" : "Add previous bill + meter for comparison"}{" "}
          <span className="font-normal text-slate-400">(optional)</span>
        </button>

        {compare ? (
          <>
            {uploadCard("Previous bill", previousBill, "previousBill", "Comparison bill from the previous period.")}
            {uploadCard("Previous meter", previousMeter, "previousMeter", "Meter image from the previous period.")}
          </>
        ) : null}
      </div>

      <div className="border-t border-slate-200 bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Review extracted data</div>
            <h3 className="mt-1 text-2xl font-black text-slate-950">Nothing is hidden from you.</h3>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600">
            {busy ? "Processing" : "Editable"}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {field("Provider", current.provider, (v) => setCurrent({ ...current, provider: v }), "provider name")}
          {field("Account / reference", current.accountRef, (v) => setCurrent({ ...current, accountRef: v }), "reference number")}
          {field("Billing period", current.billingPeriod, (v) => setCurrent({ ...current, billingPeriod: v }), "e.g. Aug 2026")}
          {field("Current units", current.units, (v) => setCurrent({ ...current, units: v }), "e.g. 350")}
          {field("Current meter reading", current.currentReading, (v) => setCurrent({ ...current, currentReading: v }), "e.g. 12543")}
          {field("Previous meter reading", current.previousReading, (v) => setCurrent({ ...current, previousReading: v }), "from bill if shown")}
          {field("Current bill amount", current.totalAmount, (v) => setCurrent({ ...current, totalAmount: v }), "e.g. 11900")}
          {field("Tariff / rate", current.tariff, (v) => setCurrent({ ...current, tariff: v }), "detected rate")}
          {field("Fixed charges", current.fixedCharges, (v) => setCurrent({ ...current, fixedCharges: v }), "service/fixed charges")}
          {field("Taxes", current.taxes, (v) => setCurrent({ ...current, taxes: v }), "taxes / VAT / GST")}
          {field("Adjustments", current.adjustments, (v) => setCurrent({ ...current, adjustments: v }), "credits / adjustments")}

          {compare ? (
            <>
              {field("Previous units", previous.units, (v) => setPrevious({ ...previous, units: v }), "previous bill units")}
              {field("Previous bill amount", previous.totalAmount, (v) => setPrevious({ ...previous, totalAmount: v }), "previous bill amount")}
              {field("Previous meter reading", previous.currentReading, (v) => setPrevious({ ...previous, currentReading: v }), "previous meter")}
            </>
          ) : null}
        </div>

        <div className="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm text-cyan-900">
          {message}
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Live result</div>

        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-xs text-slate-500">Billed usage</div>
            <div className="mt-2 text-3xl font-black text-slate-950">{billUnits ?? "--"}</div>
            <div className="mt-1 text-xs text-slate-500">units</div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-xs text-slate-500">Meter-derived usage</div>
            <div className="mt-2 text-3xl font-black text-slate-950">{meterConsumption ?? "--"}</div>
            <div className="mt-1 text-xs text-slate-500">current reading − previous reading</div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-xs text-slate-500">Current bill</div>
            <div className="mt-2 text-3xl font-black text-slate-950">
              {currentBillAmount != null ? currentBillAmount.toLocaleString() : "--"}
            </div>
          </div>

          <div className={`rounded-2xl border p-5 ${verdictClass}`}>
            <div className="text-xs font-black uppercase tracking-wider opacity-70">Bill vs meter</div>
            <div className="mt-2 text-2xl font-black">{verdict}</div>
            {billVsMeterDifference != null ? (
              <div className="mt-1 text-xs">
                Difference: {billVsMeterDifference > 0 ? "+" : ""}
                {billVsMeterDifference.toFixed(1)} units
                {billVsMeterPercent != null ? ` (${billVsMeterPercent.toFixed(1)}%)` : ""}
              </div>
            ) : null}
          </div>
        </div>

        {compare ? (
          <div className="mt-5 rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="text-sm font-black text-slate-950">Previous vs current</div>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div>
                <div className="text-xs text-slate-500">Unit difference</div>
                <div className="mt-1 font-black">{unitDifference != null ? `${unitDifference > 0 ? "+" : ""}${unitDifference}` : "--"}</div>
                <div className="text-xs text-slate-500">{unitChange != null ? `${unitChange > 0 ? "+" : ""}${unitChange.toFixed(1)}%` : "—"}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Bill difference</div>
                <div className="mt-1 font-black">{billDifference != null ? `${billDifference > 0 ? "+" : ""}${billDifference.toLocaleString()}` : "--"}</div>
                <div className="text-xs text-slate-500">{billChange != null ? `${billChange > 0 ? "+" : ""}${billChange.toFixed(1)}%` : "—"}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Previous units</div>
                <div className="mt-1 font-black">{previousUnits ?? "--"}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Previous bill</div>
                <div className="mt-1 font-black">{previousBillAmount != null ? previousBillAmount.toLocaleString() : "--"}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-slate-200 bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Usage history</div>
            <h3 className="mt-1 text-2xl font-black text-slate-950">Scan 3, 6 or 12 previous bills</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Select several previous bill images at once. SmartCalc processes the bills in your browser and builds a reviewable history table.
            </p>
          </div>

          <div className="flex gap-2 rounded-2xl bg-slate-100 p-1">
            {[3, 6, 12].map((value) => (
              <button
                type="button"
                key={value}
                onClick={() => setHistoryLimit(value as 3 | 6 | 12)}
                className={`rounded-xl px-3 py-2 text-xs font-black ${historyLimit === value ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}
              >
                {value} months
              </button>
            ))}
          </div>
        </div>

        <label className="mt-5 inline-flex cursor-pointer rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white transition hover:bg-slate-800">
          {historyBusy ? "Scanning history..." : `Upload up to ${historyLimit} bill images`}
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => void processHistory(e.target.files)}
          />
        </label>

        {history.length ? (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-black">Period / file</th>
                  <th className="px-4 py-3 font-black">Units</th>
                  <th className="px-4 py-3 font-black">Amount</th>
                  <th className="px-4 py-3 font-black">Meter reading</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.dateLabel || "—"}</td>
                    <td className="px-4 py-3 text-slate-700">{row.units || "—"}</td>
                    <td className="px-4 py-3 text-slate-700">{row.amount || "—"}</td>
                    <td className="px-4 py-3 text-slate-700">{row.reading || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
