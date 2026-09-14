# WEBAPP-SPEC — Publisher Console

**Role:** Publisher (monetisation manager / ad ops / publisher finance)  
**Shell route filter:** inventory, reporting, conversions, settlement, disputes  
**Design:** [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) · **IA:** [`IA-NAVIGATION.md`](IA-NAVIGATION.md)

## Primary journeys

1. **Route remnant** — register property/slot → compare predicted eRPM vs incumbent → enable Clearbid demand.
2. **Cap bad supply** — review auto-quarantine → cool-down → release or keep disabled.
3. **Protect editorial** — set category blocks (property → slot override) with demand-impact preview.
4. **Get paid / fight shaving** — ledger confirms actions; disputes time-boxed; payouts on calendar.

## Screen inventory

| Screen | Route / host view | Purpose | Key components | Empty / error |
| --- | --- | --- | --- | --- |
| Yield home | `/reporting` → `ReportingView` (publisher columns) | Decide what to route | Predicted eRPM vs incumbent, settled $, open disputes, quarantine count | No slots yet → CTA register |
| Inventory list | `/inventory` → `InventoryView` | Daily ops | Table: slot, property, format, status (`active`/`quarantined`/`disabled`), IVT %, eRPM | Empty + “Register slot” |
| Slot register | inventory create flow | Remnant entry | Property, format (`display`/`video`/`in_app`), default category policy | Validation on property |
| Slot detail | inventory detail | Diagnose unit | Status timeline, IVT trend, blocks, eRPM sparkline, ledger link | Error if integration unhealthy |
| Quarantine queue | `/inventory?status=quarantined` | Cap exposure | Reason, threshold, release checklist, cool-down | Empty: healthy supply |
| Category blocks | inventory settings | Editorial safety | Property defaults + slot overrides; demand-impact estimate | Preview before save |
| Conversion ledger | `/conversions` → `ConversionsView` | Anti-shave trust | Dual-readable rows; role-safe columns; exclusions itemised | Filter by slot |
| Disputes | `/disputes` → `DisputesView` | Time-boxed claims | Evidence from ledger; SLA clock; default to recorded evidence (BR-4) | Compose from ledger row |
| Settlement / payouts | `/settlement` → `SettlementView` | Cash predictability | Schedule, min threshold, remittance ids, deferred-advertiser risk flag | Below threshold progress |
| Integration health | inventory setup panel | Connect stack | Prebid/bidder snippet status, API key, bid/timeout/no-bid rates | Timeout spike warning |

## Data fields (OpenAPI-aligned)

- **InventorySlot:** id, propertyId, format, status, invalidTrafficRate, blockedAdvertiserCategories[], predictedErpm, incumbentErpm
- **QuarantineEvent:** slotId, reason, threshold, quarantinedAt, releaseEligibleAt
- **ConversionRecord:** id, slotId, attestationStatus, ivtRuling, settlementState (no advertiser RPC)
- **Payout:** id, amount, scheduledAt, thresholdProgress, remittanceId, advertiserTermsFlag
- **Dispute:** id, conversionId, reason, deadline, resolution
- **Reporting (publisher):** predictedErpm, incumbentErpm, settledRevenue, quarantineCount

## UX rules unique to publisher

- Never show advertiser revenue-per-customer or raw advertiser CRM fields.
- Hero metric is **eRPM vs incumbent**, not fill alone.
- Quarantine is an accounting + serving event — itemised on statements.
- Blocks are settlement-blocking (BR-11), with ledger evidence on violation.

## Build mapping

- `platform/webapp/src/features/inventory/components/` (+ quarantine filter UI)
- `platform/webapp/src/features/reporting/components/` (publisher KPI variants)
- `platform/webapp/src/features/conversions/components/`
- `platform/webapp/src/features/settlement/components/`
- `platform/webapp/src/features/disputes/components/`

Host views: `InventoryView`, `ReportingView`, `ConversionsView`, `SettlementView`, `DisputesView`.
