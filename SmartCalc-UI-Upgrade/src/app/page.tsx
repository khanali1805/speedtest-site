import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";
import { adsConfig } from "@/config/ads";

const featuredTools = [
  {
    eyebrow: "FLAGSHIP",
    title: "Electricity Bill Analyzer",
    description:
      "Upload your bill and meter reading, check the numbers, compare months, and understand what changed.",
    href: "/utilities/electricity",
    icon: "⚡",
    featured: true,
  },
  {
    eyebrow: "UTILITY",
    title: "Gas Bill",
    description:
      "Work out consumption and compare your gas bills with the same simple workflow.",
    href: "/utilities/gas",
    icon: "🔥",
  },
  {
    eyebrow: "UTILITY",
    title: "Water Bill",
    description:
      "Calculate usage and understand monthly water charges without complicated forms.",
    href: "/utilities/water",
    icon: "💧",
  },
  {
    eyebrow: "EVERYDAY",
    title: "Calculators",
    description:
      "Percentage, discount, age, EMI, loan, BMI, salary, savings and more.",
    href: "/calculators",
    icon: "◎",
  },
];

const confidenceItems = [
  "Manual calculation when you want full control",
  "Bill image extraction with editable values",
  "Meter image reading with user confirmation",
  "Previous vs current comparison",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-slate-950 text-lg text-white shadow-sm">
              S
            </span>
            <div>
              <div className="text-base font-semibold tracking-tight">SmartCalc</div>
              <div className="text-xs text-slate-500">Calculate with confidence</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <Link className="transition hover:text-slate-950" href="/utilities/electricity">
              Electricity
            </Link>
            <Link className="transition hover:text-slate-950" href="/utilities/gas">
              Gas
            </Link>
            <Link className="transition hover:text-slate-950" href="/utilities/water">
              Water
            </Link>
            <Link className="transition hover:text-slate-950" href="/calculators">
              Calculators
            </Link>
          </nav>

          <Link
            href="/utilities/electricity"
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Analyze a bill
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:pb-24 lg:pt-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 shadow-sm">
              <span className="size-2 rounded-full bg-emerald-500" />
              Free tools • No login required
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Numbers should be
              <span className="block text-slate-500">easy to understand.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              SmartCalc gives you practical calculators and a smarter way to
              understand utility bills — including bill images, meter readings,
              verification and month-to-month changes.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/utilities/electricity"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Check my electricity bill
                <span className="ml-2">→</span>
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Explore calculators
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 text-sm text-slate-600 sm:grid-cols-4">
              {confidenceItems.map((item, index) => (
                <div key={item} className="flex gap-2">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] sm:p-6">
            <div className="rounded-[22px] bg-slate-950 p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-300">Electricity snapshot</div>
                  <div className="mt-2 text-4xl font-semibold tracking-tight">350 kWh</div>
                  <div className="mt-2 text-sm text-slate-400">Current month usage</div>
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-2 text-right">
                  <div className="text-xs text-slate-400">Change</div>
                  <div className="mt-1 text-sm font-semibold text-emerald-300">+25%</div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/8 p-4">
                  <div className="text-xs text-slate-400">Previous</div>
                  <div className="mt-1 text-lg font-semibold">280 kWh</div>
                </div>
                <div className="rounded-2xl bg-white/8 p-4">
                  <div className="text-xs text-slate-400">Difference</div>
                  <div className="mt-1 text-lg font-semibold">+70 kWh</div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Bill vs meter check</span>
                  <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 font-semibold text-emerald-300">
                    MATCH
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[86%] rounded-full bg-emerald-400" />
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Values reviewed before the final calculation
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-1 pt-5 text-center text-xs text-slate-500">
              <div>
                <div className="font-semibold text-slate-900">01</div>
                Upload
              </div>
              <div>
                <div className="font-semibold text-slate-900">02</div>
                Review
              </div>
              <div>
                <div className="font-semibold text-slate-900">03</div>
                Understand
              </div>
            </div>
          </div>
        </div>
      </section>

      {adsConfig.enabled ? (
        <section className="mx-auto max-w-7xl px-5 pb-2 sm:px-8">
          <AdSlot slot={adsConfig.slots.homepageTop} />
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Start here
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tools people actually need
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            The interface stays simple on purpose. The heavy lifting happens
            inside the calculation and verification engine.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {featuredTools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`group rounded-[24px] border p-6 transition duration-200 hover:-translate-y-1 hover:shadow-xl ${
                tool.featured
                  ? "border-slate-900 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                  : "border-slate-200 bg-white text-slate-950 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`grid size-12 place-items-center rounded-2xl text-xl ${
                  tool.featured ? "bg-white/10" : "bg-slate-100"
                }`}>
                  {tool.icon}
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                  tool.featured ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-500"
                }`}>
                  {tool.eyebrow}
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-semibold tracking-tight">{tool.title}</h3>
              <p className={`mt-3 max-w-xl text-sm leading-7 ${
                tool.featured ? "text-slate-300" : "text-slate-600"
              }`}>
                {tool.description}
              </p>

              <div className={`mt-7 text-sm font-semibold ${
                tool.featured ? "text-white" : "text-slate-900"
              }`}>
                Open tool <span className="ml-1 inline-block transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:py-18">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Why SmartCalc
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Not another form that spits out a number.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Review first", "Detected bill and meter values stay visible so you can correct them."],
              ["Compare clearly", "See units, amounts and percentage changes side by side."],
              ["Designed for phones", "The main workflow works cleanly on small screens."],
              ["Ads stay separate", "Advertising is isolated from calculators and business logic."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-slate-200 p-5">
                <div className="font-semibold">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-white">SmartCalc</div>
            <div className="mt-1 text-slate-500">Useful numbers, clearly explained.</div>
          </div>
          <div className="text-slate-500">© {new Date().getFullYear()} SmartCalc</div>
        </div>
      </footer>
    </main>
  );
}
