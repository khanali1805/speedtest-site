export default function Post() {
  return (
    <div className="mx-auto max-w- px-6 py-8">
      <h1 className="text- font-bold">What is My IP Address?</h1>
      <p className="mt-3 text- text-gray-500">Learn about IP addresses - Public vs Private IP Explained</p>
      <div className="prose mt-6 text- leading-6 text-gray-700">
        <p>Your IP address is your unique identity on the internet. It is like your home address for the online world.</p>
        <h2 className="mt-6 text- font-semibold text-gray-900">Types of IP</h2>
        <p className="mt-2"><strong>Public IP:</strong> Assigned by your ISP (PTCL, Nayatel). Visible on the internet. Check it on SpeedCheck.online</p>
        <p><strong>Private IP:</strong> Your router assigns it to your phone/laptop (e.g., 192.168.1.1)</p>
        <p><strong>IPv4 vs IPv6:</strong> IPv4 is old (e.g., 39.45.67.89), IPv6 is new and longer.</p>
        <h2 className="mt-6 text- font-semibold text-gray-900">How to Find Your IP in Pakistan?</h2>
        <p className="mt-2">Just open speedcheck.online/what-is-my-ip - Your public IP, location, and ISP will be shown instantly.</p>
      </div>
      <a href="/blog" className="mt-8 inline-block text- text-blue-600">← Back to Blog</a>
    </div>
  );
}
