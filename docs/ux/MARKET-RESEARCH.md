# Clearbid — Market UX Research

Synthesized from demand-side, supply-side, and settlement/trust research (refs: The Trade Desk, DV360, Meta Ads Manager, Google Ads, Google Ad Manager, PubMatic, Magnite, Prebid, Impact, Partnerize, Adjust, AppsFlyer, Stripe Dashboard, Linear). Grounded in [`PRODUCT.md`](../../PRODUCT.md).

Raw briefs: [`_research-demand.md`](_research-demand.md), [`_research-supply.md`](_research-supply.md), [`_research-settlement.md`](_research-settlement.md).

## Product spirit (UX thesis)

Clearbid is a **settlement-grade clearing house**, not an insights deck or a classic RTB console. Every money number must end at an append-only attestation both sides can read. Hero KPIs are **verified CPA**, **settleable spend**, **eRPM vs incumbent**, and **disclosed take-rate** — never CTR, vanity fill, or opaque “AI optimized.”

## Cross-cutting patterns to adopt

| Pattern | Source family | Clearbid use |
| --- | --- | --- |
| Goal-first campaign create | Meta / Google Ads | Action → max CPA → budget → forecast gate → launch |
| Shallow left nav + campaign switcher | Meta / Google | Avoid DV360 line-item sprawl for mid-market DR |
| Explainable recommendations | TTD Koa-style | Segment drivers + P(action) reasons, never black box |
| Remnant-first inventory | SSP / Prebid | Property → Slot; Clearbid as demand route, not SoR |
| Auto quarantine + itemised IVT | Protect360 / Adjust | Pre-settlement exclusions both sides see |
| Action lifecycle ledger | Impact / Partnerize | Dual-readable conversion rows + lock states |
| Statement as money story | Stripe | Actions → IVT → disputes → take-rate → net |
| Chronological case audit | Linear | Disputes & operator actions; no silent edits |

## Patterns to avoid

- CPM / eCPM as primary bid UI or home KPI
- Opaque Smart Bidding without max CPA
- Affiliate “offer wall” aesthetics (signals untrusted CPA networks)
- Post-pay clawbacks as the fraud model
- Mutable dashboard truth without drill-to-ledger
- Operator ability to quietly rewrite settled conversions
- Full GAM inventory OS or DV360 IO complexity at MVP

## Role-specific takeaways

### Advertiser (demand)

- Home = verified performance rollup, not inventory.
- Create spine: Action → Max CPA → Budget → Targeting → Brand safety → **Action Forecast gate** → Creative → Disclose take-rate → Launch.
- Elevate Settlement & Ledger to first-class nav (not buried under Billing).
- Every performance view shows CPA vs incumbent (BR-3).

### Publisher (supply)

- Hero: predicted eRPM vs incumbent, settled $, quarantine count.
- Quarantine queue with reason, threshold, cool-down release.
- Category blocks are settlement-blocking with audit on ledger (BR-11).
- Payout calendar + min threshold + deferred-advertiser risk flag (BR-9).

### Operator (exchange)

- Ops home: disputes nearing deadline, quarantines, settlement exceptions.
- Ledger integrity proofs + adjudication dual-pane.
- Credit ratings gate deferred terms; operator audit rail separate from conversion facts.

## Scaffold mapping

Research informs specs that build on CodeGen output under `platform/webapp`:

| Domain feature | Generated view | Spec surface |
| --- | --- | --- |
| `features/campaigns` | `CampaignsView` | Advertiser campaigns |
| `features/bidding` | `BiddingView` | Forecast / explain |
| `features/inventory` | `InventoryView` | Publisher inventory |
| `features/conversions` | `ConversionsView` | Shared ledger |
| `features/settlement` | `SettlementView` | Statements / payouts |
| `features/disputes` | `DisputesView` | Time-boxed adjudication |
| `features/reporting` | `ReportingView` | CPA vs incumbent |
| `features/identity` | `IdentityView` | Operator users / keys |

See [`IA-NAVIGATION.md`](IA-NAVIGATION.md) and role WEBAPP-SPEC files for screen-level detail.
