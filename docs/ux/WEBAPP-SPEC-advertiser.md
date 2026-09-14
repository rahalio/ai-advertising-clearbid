# WEBAPP-SPEC — Advertiser Console

**Role:** Advertiser (performance marketer / media buyer / advertiser finance)  
**Shell route filter:** campaigns, bidding, reporting, conversions, settlement, disputes  
**Design:** [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) · **IA:** [`IA-NAVIGATION.md`](IA-NAVIGATION.md)

## Primary journeys

1. **Launch CPA campaign** — define action → max CPA → budget → forecast gate → disclose take-rate → launch.
2. **Prove channel works** — compare verified CPA vs incumbent on same conversion definition.
3. **Reconcile month** — statement = verified actions − IVT − disputes + take-rate → export.
4. **Challenge / defend conversion** — open dispute from ledger row with time-box.

## Screen inventory

| Screen | Route / host view | Purpose | Key components | Empty / error |
| --- | --- | --- | --- | --- |
| Overview strip | `/campaigns` (top of `CampaignsView`) then later dedicated home | Daily health | `KpiStrip` (verified CPA, Δ incumbent, settleable $, IVT $, open disputes, take-rate) | Empty: CTA “Create first campaign” |
| Campaign list | `/campaigns` → `features/campaigns/views/CampaignsView` | Ops table | Dense table: status, verified actions, verified CPA, forecast CPA, pacing, mode (learning/CPA) | Empty state + create |
| Campaign create / edit | modal or `/campaigns/new` inside campaigns feature | Goal-first create | Action selector, max CPA, budget/pacing, targeting, brand safety, `TakeRateLine`, launch checklist | Block launch if tag unhealthy |
| Action & tag health | campaigns feature subview / conversion defs | ConversionDefinition CRUD | Tag fire status, attribution window, incumbent CPA field | Error if tag silent > N hours |
| Action forecast | `/bidding` → `BiddingView` | Pre-commit volume/CPA | `ForecastDial`, sensitivity vs max CPA, confidence | Low-confidence warning |
| Bidding explain | `/bidding` detail | BR-7 explainability | Avg P(action), EV/placement, bid/no-bid reasons, `SegmentDrivers` | No-bid heavy: show top reasons |
| Verified performance | `/reporting` → `ReportingView` | Funnel + benchmark | Impressions → attributed → verified → settled; CPA vs incumbent chart | No settled actions yet |
| Conversion ledger | `/conversions` → `ConversionsView` | Dual-verified truth | `LedgerTable` + `EvidenceDrawer` | Filter settled / excluded / disputed |
| Settlement | `/settlement` → `SettlementView` | Statements & credit | Period statement, take-rate line, deferred terms status, audit export | No statements in period |
| Disputes | `/disputes` → `DisputesView` | Time-boxed cases | `Countdown`, dual evidence, resolution status | Empty: “No open disputes” |
| Brand safety | campaigns settings panel | Pre-serve blocks | Category allow/block; settlement-blocking flag | Preview demand impact |

## Data fields (OpenAPI-aligned)

- **Campaign:** id, name, status, budget, maxCpa, pricingMode (`cpa` \| `learning`), brandSafetyRules
- **ConversionDefinition:** actionType (`registration` \| `form` \| `callback` \| `purchase`), attributionWindow, incumbentCpaBenchmark
- **ActionForecast:** forecastActions, forecastCpa, confidence, segmentOpportunities[]
- **Reporting:** verifiedCpa, incumbentCpa, delta, settleableSpend, ivtExcludedSpend
- **ConversionRecord:** id, campaignId, attestationStatus, ivtRuling, settlementState, proofRefs
- **SettlementStatement:** period, gross, exclusions[], disputeReserves, takeRate, net
- **Dispute:** id, conversionId, reason, deadline, resolution

Use hooks/facades under `services/domains/{campaigns,bidding,reporting,conversions,settlement,disputes}/` — do not call `apiClient` from views.

## UX rules unique to advertiser

- Never show publisher raw user data.
- Learning-phase CPC/CPM is visually secondary and labeled fallback.
- Take-rate visible on create + every statement (BR-6).
- Money charts always link to ledger ids.

## Build mapping

Implement inside generated folders:

- `platform/webapp/src/features/campaigns/components/`
- `platform/webapp/src/features/bidding/components/`
- `platform/webapp/src/features/reporting/components/`
- `platform/webapp/src/features/conversions/components/`
- `platform/webapp/src/features/settlement/components/`
- `platform/webapp/src/features/disputes/components/`

Replace stub copy in `*View.tsx` files; keep filenames CodeGen produced.
