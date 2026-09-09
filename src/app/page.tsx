export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-6">
      {/* Hero - CORRECTED NAME SpeedCheck */}
      <div className="rounded-[20px] bg-[#1e3a8a] p-8 md:p-10 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-800/50 to-transparent"></div>
        <div className="relative z-10 max-w-[700px]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <span className="text-[20px]">âš¡</span>
            </div>
            <h1 className="text-[32px] font-bold tracking-tight">SpeedCheck.online</h1>
          </div>
          <p className="mt-4 text-[14px] leading-6 text-blue-100">
            Fast, accurate and reliable internet tools built for everyone. Check your internet performance, discover your connection details, analyze your WiFi coverage and test network latency - all in one professional platform designed for accuracy and simplicity.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium backdrop-blur">Fast & Accurate</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium backdrop-blur">Real-Time Results</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium backdrop-blur">Easy to Use</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium backdrop-blur">Professional Tools</span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[16px] border border-slate-200 bg-white p-5 hover:shadow-lg transition-shadow">
          <h3 className="text-[14px] font-semibold text-slate-900">Internet Speed Test</h3>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">Check real download, upload and ping speed</p>
          <a href="/speed-test" className="mt-4 inline-block rounded-full bg-slate-900 px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-black">Open Tool</a>
        </div>

        <div className="rounded-[16px] border border-slate-200 bg-white p-5 hover:shadow-lg transition-shadow">
          <h3 className="text-[14px] font-semibold text-slate-900">What is My IP</h3>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">Your public IP and location - per-user live</p>
          <a href="/what-is-my-ip" className="mt-4 inline-block rounded-full bg-slate-900 px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-black">Open Tool</a>
        </div>

        <div className="rounded-[16px] border border-slate-200 bg-white p-5 hover:shadow-lg transition-shadow">
          <h3 className="text-[14px] font-semibold text-slate-900">WiFi Signal Map</h3>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">Router direction and signal strength zones</p>
          <a href="/wifi-map" className="mt-4 inline-block rounded-full bg-slate-900 px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-black">Open Tool</a>
        </div>

        <div className="rounded-[16px] border border-slate-200 bg-white p-5 hover:shadow-lg transition-shadow">
          <h3 className="text-[14px] font-semibold text-slate-900">Ping Test</h3>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">Test latency to any website</p>
          <a href="/ping-test" className="mt-4 inline-block rounded-full bg-slate-900 px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-black">Open Tool</a>
        </div>
      </div>

      {/* SEO Content for Ranking */}
      <div className="mt-10 rounded-[16px] border border-slate-200 bg-white p-6">
        <h2 className="text-[18px] font-bold text-slate-900">Why SpeedCheck.online is the Best Speed Test Tool?</h2>
        <p className="mt-3 text-[13px] leading-6 text-slate-600">
          SpeedCheck.online is a professional, free and accurate platform to test your internet speed, check your IP address, analyze WiFi signal strength and test ping latency. Our tools use advanced technology to provide real-time results with high accuracy. Whether you want to check if your ISP is delivering promised speeds or troubleshoot your WiFi, SpeedCheck is your trusted partner.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-[12px] text-slate-600">
          <div>âœ“ Fast download & upload test</div>
          <div>âœ“ Accurate ping measurement</div>
          <div>âœ“ Real-time IP detection</div>
          <div>âœ“ WiFi coverage analysis</div>
        </div>
      </div>
    </div>
  );
}

