import Link from "next/link";
import { ElectricityCalculator } from "./electricity-calculator";

export default function ElectricityPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-sm font-semibold text-slate-700">
            ← SmartCalc
          </Link>
          <span className="text-sm text-slate-500">Electricity Bill Analyzer</span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Step 1 · Manual calculation
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Estimate your electricity bill
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Start with a manual calculation. We&apos;ll add bill scanning,
            meter-image reading and monthly comparison on top of this same
            calculation engine.
          </p>
        </div>

        <ElectricityCalculator />
      </section>
    </main>
  );
}
