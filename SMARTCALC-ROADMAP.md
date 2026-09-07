# SMARTCALC ROADMAP

## Product Vision

SmartCalc is an everyday calculator and utility bill analysis website.
It is not an articles website or blog.

The main purpose is to help users calculate everyday values and understand electricity, gas and water bills.

## Everyday Calculators

- Percentage
- Discount
- Age
- EMI
- Loan
- BMI
- Salary
- Savings
- Date Difference
- Time
- Unit Conversion

## Utility Bill Analyzer

### Electricity
- Manual unit calculation
- Current bill image
- Previous bill image
- Current meter image
- Previous meter image
- OCR/AI extraction
- User confirmation
- Bill versus meter verification
- Current bill calculation
- Previous versus current comparison
- Unit difference
- Bill difference
- Percentage change
- 3 month history
- 6 month history
- 12 month history

### Gas
- Manual consumption
- Bill image
- Meter image
- Previous/current comparison
- History

### Water
- Manual consumption
- Bill image
- Previous/current comparison
- History

## Flagship Electricity Experience

Best input:
Previous Bill + Current Bill + Previous Meter + Current Meter

Flow:
Upload -> Extract -> Review -> Correct if needed -> Calculate -> Verify -> Compare -> Explain

## Bill Image Analysis

Possible extracted fields:
- Provider
- Account/reference number
- Billing period
- Previous reading
- Current reading
- Units
- Tariff/slab
- Fixed charges
- Taxes
- Adjustments
- Total amount

OCR/AI output must always be reviewable by the user.

## Meter Image Analysis

Detect meter reading from image.
Show detected reading.
Allow confirmation or correction.

Previous meter reading + current meter reading = consumption.

## Bill Verification

Bill units and meter-derived units should be compared.

MATCH = values agree.
MISMATCH = user review required.

## Monthly Comparison

Show:
- Previous bill
- Current bill
- Previous units
- Current units
- Unit difference
- Bill difference
- Unit percentage change
- Bill percentage change

## History

Support:
- 3 months
- 6 months
- 12 months

Show monthly units, bill amount, averages, changes and trends.

## Tariff Architecture

Keep tariff logic separate from UI.

Input -> Provider -> Tariff -> Slabs -> Charges -> Taxes -> Result

Provider configurations must be replaceable.
Utility rates must be verified before production use because they can change.

## Privacy

Bill and meter images may contain sensitive information.

Default flow:
Upload -> Temporary processing -> OCR/AI -> User confirmation -> Calculation -> Cleanup

Basic calculator usage should not require login.

## Advertising

Ads must use a dedicated configuration and component layer.
Ads must be easy to disable.
Ads must not be mixed into calculator logic.

## Database

Primary database: PostgreSQL-compatible provider.
Secondary database: separate PostgreSQL-compatible provider.

Future support:
- Health checks
- Usage monitoring
- Synchronization verification
- Protected failover

Target protection threshold: approximately 70-80% usage.

## Development Phases

1. New project foundation
2. Shared calculator engine
3. Everyday calculators
4. Electricity manual calculator
5. Electricity bill image analysis
6. Electricity meter image analysis
7. Previous/current comparison
8. 3/6/12 month history
9. Gas
10. Water
11. Primary and secondary database
12. Security and privacy
13. Testing
14. Vercel deployment

## MVP

The first major production feature is the Electricity Bill Analyzer.

It should support:
- Manual units
- Current bill
- Previous bill
- Current meter
- Previous meter
- OCR/AI
- User confirmation
- Bill/meter verification
- Current calculation
- Previous/current comparison
- 3 month history
- Clear explanation

## Product Principle

Build one excellent experience first:
Help me understand my electricity bill.

Then expand the same architecture to Gas, Water and other calculators.

## Wi-Fi Quality Analyzer

Product question:
Mere ghar ke kis area mein Wi-Fi weak hai?

The Wi-Fi tool is designed as a live walk-test experience.

MVP capabilities:
- Request user location permission
- Track the user's moving location while the test is running
- Record timestamped location samples
- Measure latency and browser-visible connection information
- Measure a repeatable download test against SmartCalc
- Convert measured results into quality levels
- Show live position on the test surface
- Plot the collected path and quality points
- Highlight weak-performing areas
- Allow the user to stop/reset the test
- Explain that standard browsers do not expose raw Wi-Fi RSSI reliably

Important browser limitation:
A normal website cannot reliably read the device's raw Wi-Fi RSSI/signal dBm or scan nearby access points.
Therefore the website MVP uses live geolocation plus measured latency/download performance as a Wi-Fi quality proxy.

Room-level signal heatmaps with true RSSI should be a later native/mobile or local-agent feature.

Privacy:
- Location tracking starts only after explicit user action and permission.
- Test data should remain client-side by default.
- Do not persist precise home-location history unless a future feature explicitly requires it.

Future Wi-Fi phases:
- House/floor-plan calibration
- True RSSI capture through supported native/local integrations
- Multi-band/2.4 GHz/5 GHz/6 GHz analysis
- Router/access-point detection
- Exportable heatmap
- Historical Wi-Fi tests

## IMAGE-FIRST UTILITY INPUT - FINAL

This is the final product decision for utility tools.

### Electricity / Gas / Water entry
When a user selects a utility, the user goes directly to:

Current bill image upload
+
Current meter image upload

Generic manual utility input is removed from the primary utility flow because providers and countries use different bill structures.

### Shared workflow
Upload bill
? Upload meter
? OCR / image analysis
? Show extracted values
? User reviews and edits values
? Live calculation
? Bill vs meter verification
? Optional previous bill + previous meter
? Previous/current comparison
? 3/6/12 month history

### Results
All normal results must be displayed live inside the website.

CSV is not part of the normal user journey. Any future CSV feature is optional export only.

### Consistency
Electricity, Gas and Water must use the same high-level interaction pattern and shared analyzer architecture, while utility-specific parsing and tariff rules remain replaceable.

## WIFI WALK TEST - HIGH LEVEL FINAL

Live browser geolocation is NOT part of the final Wi-Fi product flow.

### Final experience
- Start a short connection baseline for approximately 8 seconds.
- Automatically stop the baseline after the analysis window.
- Use an external Internet measurement edge rather than localhost throughput.
- Show Internet estimate and latency in the result.
- Keep animated Strong / Fair / Weak radio-wave markers.
- Use a top-view home coverage interface.
- Show an abstract head locator only; no human body.
- Locator direction follows device orientation when supported.
- On supported phones, device motion is used for step-based movement.
- Desktop users can move the locator with direction controls.
- After the baseline completes, continue collecting network samples while the user walks.
- Show visited samples on the home coverage map.
- Change the locator state between Strong, Fair and Weak from measured connection quality.
- Calculate approximate distance from the router anchor using the configured home scale.
- Keep the visual map separate from any unsupported claim of direct router RSSI.

### Accuracy approach
The web version measures Internet connection quality and movement using browser capabilities. It does not claim to expose raw router RSSI or guaranteed room-level indoor position.

### Product wording
"Which area of my home has weak Wi-Fi?"

## HIGH LEVEL ALL-IN-ONE FINAL DECISION

### Utility bill input is image-first
Manual utility-entry screens are not part of the primary product flow.

For Electricity, Gas and Water:
- Open the utility tool and go directly to image upload.
- Upload current bill image.
- Upload current meter image.
- On mobile, the upload control provides camera capture and gallery selection.
- On desktop, the upload control opens the normal file picker.
- OCR/AI reads useful values where possible.
- Extracted values are always visible and editable.
- Current results update from the confirmed values.
- Previous bill and previous meter are optional comparison inputs.
- Previous/current units, bill amount, meter readings and differences are shown when data exists.
- Bill and meter values are cross-checked.

### Wi-Fi coverage analyzer
Primary user question:
Which area of my home has weak Wi-Fi?

Final flow:
- Start a short 8-second Internet baseline.
- Measure latency and browser download throughput.
- Stop the baseline automatically.
- Enter walk mode.
- Continue taking real connection measurements at visited positions.
- Show a top-view home coverage model.
- Use an abstract head-only locator rather than a human body.
- Locator direction follows phone orientation when available.
- On supported phones, device motion can move the locator.
- Desktop directional controls provide deterministic movement.
- Strong/Fair/Weak coverage points use animated radio-wave style markers.
- Locator state changes visually as measured connection quality changes.
- Approximate router distance is shown using the configured home scale.
- Live browser geolocation is excluded from the product flow.
- The product UI must distinguish measured Internet performance from the mapped home model.

### Wi-Fi measurement accuracy
The Internet value must not be measured from localhost development traffic.
The analyzer uses a no-cache application endpoint and can fall back to browser network information when necessary.
The displayed value is an Internet throughput estimate, not a router-RSSI reading.

### Design standard
Utility pages and the homepage should feel like a polished consumer product, not a low-level demo.
Use strong visual hierarchy, responsive layouts, clear states, motion, accessible controls and realistic result panels.
