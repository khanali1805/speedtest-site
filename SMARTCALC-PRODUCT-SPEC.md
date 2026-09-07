# SMARTCALC PRODUCT SPECIFICATION

## Homepage

Headline:
Calculate it. Check it. Understand it.

Primary tools:
- Electricity Bill
- Gas Bill
- Water Bill
- Everyday Calculators

## Electricity

Methods:
- Enter units manually
- Upload current bill
- Upload current bill plus meter image
- Upload previous and current bills
- Full previous/current bill plus meter comparison

## Full Comparison

User can upload:
- Previous bill
- Current bill
- Previous meter image
- Current meter image

The system extracts values, lets the user review them and then calculates.

## Result

Show:
- Previous month
- Current month
- Units difference
- Bill difference
- Percentage changes
- Bill versus meter verification
- Confidence/review state

## History

Show 3, 6 and 12 month trends.

## Privacy

Process uploaded images temporarily whenever possible.
Do not permanently retain images unless a later feature specifically requires it.

## Ads

Ads are controlled by a separate config and component.
Ads can be disabled without changing calculator logic.

## Wi-Fi Quality Analyzer

Primary question:
Mere ghar ke kis area mein Wi-Fi weak hai?

User flow:
1. Open Wi-Fi Analyzer.
2. Press Start Walk Test.
3. Allow location access.
4. Move around the house.
5. SmartCalc records position samples and connection-performance measurements.
6. The live view follows the user.
7. Quality points are shown as Strong, Fair or Weak.
8. The result identifies areas where measured internet performance dropped.

The extracted result must clearly say that browser measurements are a proxy for Wi-Fi quality, not raw Wi-Fi RSSI.

MVP metrics:
- Position
- Accuracy
- Latency
- Effective connection type when available
- Download test Mbps
- Quality score

Future native/local-agent mode may add true Wi-Fi RSSI and access-point information.

## FINAL IMAGE-FIRST UTILITY FLOW

The utility analyzer does not begin with a generic manual utility form.

### First screen
- Current bill image upload
- Current meter image upload

### Then
- OCR / image analysis
- Extracted field review
- User correction
- Live calculation
- Bill vs meter verification

### Optional comparison
- Previous bill image
- Previous meter image
- Previous vs current units
- Previous vs current bill amount
- Percentage changes
- Verification state

### Product language
Primary utility CTA:
"Upload bill + meter"

The website shows the result directly. CSV is optional export only and is not required to use the product.

## WIFI WALK TEST - HIGH LEVEL FINAL

The Wi-Fi analyzer is an image-free, sensor-assisted web tool.

Flow:
1. Start 8-second baseline.
2. Measure Internet estimate and latency.
3. Stop automatically.
4. Enter walk mode.
5. Follow the abstract locator direction.
6. Use motion/steps on supported mobile devices.
7. Use directional controls on desktop.
8. Sample the connection at visited map points.
9. Color the current locator Strong / Fair / Weak.
10. Show animated radio-wave effects.
11. Show approximate distance from the router anchor.

Live geolocation is intentionally excluded.

The UI must make a clear distinction between measured network performance and the visual home-map model.

## HIGH LEVEL ALL-IN-ONE FINAL DECISION

Utility tools use an image-first workflow rather than a generic manual-entry workflow.

Required first step:
- Current bill image
- Current meter image

Optional comparison:
- Previous bill image
- Previous meter image

Mobile upload behavior:
- Camera capture
- Gallery selection

Desktop upload behavior:
- Normal file picker

OCR behavior:
- Show detected values.
- Let the user edit detected values.
- Never silently treat OCR as correct.

Wi-Fi analyzer:
- 8-second baseline
- Automatic stop
- Internet throughput and latency measurement
- Walk mode after baseline
- Top-view home coverage model
- Head-only direction marker
- Phone motion/orientation support when available
- Desktop movement controls
- Animated Strong/Fair/Weak radio-wave markers
- Real measurements remain separate from mapped-model visualization
- Live geolocation is removed

Primary Wi-Fi product question:
Which area of my home has weak Wi-Fi?
