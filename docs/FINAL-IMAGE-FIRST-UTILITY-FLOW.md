# SmartCalc - Final Image-First Utility Flow

## Decision

Electricity, Gas and Water are image-first.

Selecting a utility opens the current bill + current meter upload experience immediately.

## Why

Providers and countries use different bill layouts and billing structures. A generic manual utility form is therefore removed from the primary utility journey.

## Flow

Current Bill
+
Current Meter
↓
OCR / Image Analysis
↓
Extracted Values
↓
User Review / Correction
↓
Live Calculation
↓
Bill vs Meter Verification
↓
Optional Previous Bill + Previous Meter
↓
Previous / Current Comparison
↓
History

## Live result requirement

Normal calculations, comparison cards and verification results are displayed directly in the website UI.

CSV is not required for the workflow. It remains only a future optional export capability.

## Shared architecture

Electricity, Gas and Water share one analyzer component and calculation framework while provider-specific parsing and tariff rules remain replaceable.