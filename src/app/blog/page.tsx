export default function BlogPage() {
  return (
    <div className="mx-auto max-w- px-6 py-6">
      <div className="rounded- bg-[#1e3a8a] p-8 md:p-10 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-800/50 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text- font-bold tracking-tight">SpeedCheck Blog</h1>
          <p className="mt-3 text- leading-6 text-blue-100 max-w-">Internet speed tips, IP tricks, WiFi guides for Pakistan.</p>
        </div>
      </div>
      <div className="mt-8 grid gap-4">
        <a href="/blog/ptcl-speed-test-pakistan" className="rounded- border bg-white p-6 hover:shadow-lg block">
          <h2 className="text- font-semibold">PTCL Speed Test - How to Check PTCL Speed in Pakistan</h2>
          <p className="mt-2 text- text-gray-500">PTCL ki asal speed kaise check karein?</p>
        </a>
        <a href="/blog/what-is-my-ip" className="rounded- border bg-white p-6 hover:shadow-lg block">
          <h2 className="text- font-semibold">What is My IP Address?</h2>
          <p className="mt-2 text- text-gray-500">Apna IP kaise dekhein?</p>
        </a>
        <a href="/blog/wifi-signal-slow" className="rounded- border bg-white p-6 hover:shadow-lg block">
          <h2 className="text- font-semibold">Why Your WiFi is Slow?</h2>
          <p className="mt-2 text- text-gray-500">WiFi signal kaise check karein?</p>
        </a>
      </div>
    </div>
  );
}
