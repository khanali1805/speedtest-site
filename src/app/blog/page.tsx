export default function BlogPage() {
  return (
    <div className="mx-auto max-w- px-6 py-6">
      <div className="rounded- bg-[#1e3a8a] p-8 md:p-10 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-800/50 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text- font-bold tracking-tight">SpeedCheck Blog</h1>
          <p className="mt-3 text- leading-6 text-blue-100 max-w-">
            Expert guides on internet speed testing, IP lookup, and WiFi optimization for Pakistan.
          </p>
        </div>
      </div>
      <div className="mt-8 grid gap-5">
        <a href="/blog/ptcl-speed-test-pakistan" className="rounded- border border-gray-200 bg-white p-6 hover:shadow-lg transition-all block">
          <h2 className="text- font-semibold text-gray-900">PTCL Speed Test - How to Check PTCL Internet Speed in Pakistan</h2>
          <p className="mt-2 text- text-gray-500">Learn how to accurately test your PTCL, Nayatel, and StormFiber connection speed with our complete guide for Pakistan.</p>
          <span className="mt-4 inline-flex rounded-full bg-[#0f172a] px-4 py-1.5 text- font-medium text-white">Read Full Guide →</span>
        </a>
        <a href="/blog/what-is-my-ip" className="rounded- border border-gray-200 bg-white p-6 hover:shadow-lg transition-all block">
          <h2 className="text- font-semibold text-gray-900">What is My IP Address? Find Your Public IP</h2>
          <p className="mt-2 text- text-gray-500">Understand the difference between public and private IP addresses and learn how to find your IP address instantly.</p>
          <span className="mt-4 inline-flex rounded-full bg-[#0f172a] px-4 py-1.5 text- font-medium text-white">Read Full Guide →</span>
        </a>
        <a href="/blog/wifi-signal-slow" className="rounded- border border-gray-200 bg-white p-6 hover:shadow-lg transition-all block">
          <h2 className="text- font-semibold text-gray-900">Why Your WiFi is Slow? How to Fix Slow WiFi</h2>
          <p className="mt-2 text- text-gray-500">Discover common reasons for slow WiFi and learn proven tips to improve your WiFi signal strength at home.</p>
          <span className="mt-4 inline-flex rounded-full bg-[#0f172a] px-4 py-1.5 text- font-medium text-white">Read Full Guide →</span>
        </a>
      </div>
    </div>
  );
}
