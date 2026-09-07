# SmartCalc Android real-device test

Current workstation Wi-Fi IPv4: 192.168.10.7
Gateway: 192.168.10.1

Start from the SmartCalc project:

    npm run dev -- --hostname 0.0.0.0

On an Android phone connected to the same Wi-Fi, open:

    http://192.168.10.7:3000/utilities/wifi

Test in this order:
1. Allow precise location.
2. Confirm Analyze Position returns a real accuracy value.
3. Calibrate the router reference at the actual router position.
4. Run the real Cloudflare speed test.
5. Start Walk Test and physically move.
6. Confirm the white device marker moves while the router stays centered.
7. Confirm latency samples appear.
8. Stop, inspect the measured directional report, then Reset and repeat.

If Android blocks location on local HTTP, use an HTTPS secure origin or the Android/PWA wrapper. Do not replace blocked sensors with simulated values.

Browser limitation: standard web APIs do not reliably expose Wi-Fi RSSI/BSSID. SmartCalc therefore reports measured latency/throughput and calibrated geolocation, not fake radio strength.

Ads are intentionally disabled in this phase.