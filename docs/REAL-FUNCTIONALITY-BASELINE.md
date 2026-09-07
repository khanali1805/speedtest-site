# SmartCalc Real Functionality Baseline

## Current implementation rules

- Internet speed values come from the Cloudflare browser speed engine.
- Walk movement comes from navigator.geolocation.watchPosition.
- The router is fixed visually at the center of the analyzer.
- Router-relative coordinates require an explicit router calibration.
- Directional quality is derived from measured latency/throughput samples.
- No synthetic RSSI, BSSID, signal bars, or fake coordinates are generated.
- The live ping route is no-store and measures an actual network round trip.
- Walk history is bounded to prevent unbounded React state growth.
- All walk controls are repeatable: analyze, calibrate, start, stop, reset.
- Location/orientation failures are shown as actionable states.

## Browser capability boundary

A normal browser does not reliably expose Wi-Fi radio RSSI/BSSID. Therefore
SmartCalc must not present Internet latency as if it were raw radio signal
strength. If true RSSI/BSSID is required later, add a native/system-level
integration rather than fabricating values in the web app.

## Validation

This phase runs TypeScript and the production build after modifications.