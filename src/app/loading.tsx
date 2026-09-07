export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-5 h-10 w-4/5 animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-3 h-5 w-3/5 animate-pulse rounded-lg bg-slate-100" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    </main>
  );
}
