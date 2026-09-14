# Clearbid Advertiser Console — UX Research Brief

**Grounding:** Clearbid settles only on mutually verified conversions; bids on explainable P(action); discloses take-rate; reports verified CPA vs incumbent. References: The Trade Desk (TTD), DV360, Meta Ads Manager, Google Ads.

---

## 1. Navigation IA that works for performance marketers

| Pattern | Who | Why it works |
|---|---|---|
| **Goal → Campaign → Ad set → Ad** | Meta, Google Ads | Maps to buyer mental model: outcome first, then spend container, then delivery unit |
| **Flat left nav + persistent campaign switcher** | Meta, Google Ads | Daily ops = scan status → open one campaign → fix; not deep trees |
| **Object-centric (Advertiser → Campaign → Ad group → Creative)** | TTD, DV360 | Needed for multi-seat / multi-brand; overkill for mid-market DR |
| **Home = performance rollup, not inventory** | Meta, Google | Buyers land on CPA / spend / delivery health |
| **Separate “Billing / Finance” from “Campaigns”** | All mature stacks | Ops vs reconciliation personas; Clearbid must elevate Settlement |

**Clearbid IA (adopt Meta/Google shallow tree + TTD “why” depth):**  
`Overview` · `Campaigns` · `Actions & Tags` · `Forecast` · `Verified Performance` · `Settlement` · `Brand Safety` · `Settings`

Avoid DV360-style Inventory/Deals/Line-item sprawl as primary nav for this wedge.

---

## 2. Campaign create / CPA goal / budget UX

**Adopt**

- **Goal-first create** (Meta/Google): pick target action → max CPA → budget → targeting → creative. Impression/click only as “learning phase” fallback (PRODUCT BR-2).
- **Budget as daily + lifetime + pacing toggle** (Google/Meta): simple; show “expected verified actions at max CPA.”
- **Conversion definition as first-class object** (Google conversions / Meta Pixel events): name, event type (reg / form / callback / purchase), attribution window, incumbent CPA benchmark input (BR-3).
- **Inline pre-flight checklist** before go-live: tag firing, consent basis, brand-safety rules, credit eligibility for deferred settlement (BR-8, BR-9, BR-11).

**Avoid**

- CPM/eCPM as primary bid UI (TTD/DV360 default posture).
- Opaque “Maximize conversions” with no max CPA (Google Smart Bidding without controls).
- Multi-step wizards that hide take-rate until invoice (violates BR-6).

**Clearbid create spine:** Action → Max CPA → Budget → Audience/geo/device → Brand safety → **Action Forecast gate** → Creative → Disclose take-rate → Launch.

---

## 3. Forecast / explainability patterns

| Pattern | Source | Clearbid mapping |
|---|---|---|
| Reach / conversion estimate before spend | Meta, Google Ads | `Action Forecast`: forecast actions, forecast CPA, confidence band |
| Bid landscape / auction insights | Google Ads | Optional; secondary to P(action) × value |
| Optimization “insights” / segment lift | Meta Advantage+, Google | **Segment drivers**: top segments/placements by verified actions + avg P(action) |
| Koa / AI recommendations | TTD | Explainable recommendations only — “raise max CPA 8% on segment X because…” with drivers |
| Transparent bidding story | PRODUCT BR-7 | Per campaign: P(action), expected value/placement, why bid/no-bid aggregates |

**Must-show widgets:** forecasted actions @ max CPA; CPA vs incumbent delta; top positive/negative segment drivers; IVT exclusion rate preview; disclosed platform take-rate line.

**Avoid:** black-box “AI optimized”; CTR as primary forecast metric; forecasts that don’t update when max CPA/budget change.

---

## 4. Adopt vs avoid for Clearbid

| Adopt | Avoid |
|---|---|
| Meta/Google goal-first create + shallow nav | DV360 line-item / IO complexity as default |
| Meta Ads Manager table + bulk edit | Impression share / viewability as hero KPIs |
| Google conversion setup + status health | Paying on clicks then “optimizing to CPA” offline |
| TTD-style explainable recommendations | Hidden fees / blended clearing price |
| Settlement & ledger as first-class product surfaces | Affiliate-style opaque “network reported” conversions |
| CPA vs incumbent benchmark on every performance view (BR-3) | Vanity dashboards (reach, frequency) as default home |

**Differentiation rule:** every money screen answers: *verified actions · verified CPA · take-rate · vs incumbent · settleable vs excluded/disputed*.

---

## 5. Clearbid Advertiser screens & key widgets

1. **Overview (Home)** — Verified CPA (w/ incumbent delta); spend → settleable; pending attestations; IVT excluded $; open disputes; take-rate chip.
2. **Campaigns** — Status table: delivery, verified actions, verified CPA, forecast CPA, pacing, learning/CPA mode.
3. **Campaign Builder** — Action selector; max CPA; budget/pacing; targeting; brand safety; take-rate disclosure; launch gate.
4. **Action & Tag Health** — Conversion definitions; tag fire status; attribution window; incumbent CPA benchmark field.
5. **Action Forecast** — Forecasted actions & CPA; sensitivity vs max CPA/budget; segment opportunity list; confidence.
6. **Campaign Detail → Bidding Explain** — Avg P(action); EV/placement; top bid/no-bid reasons; segment driver bars.
7. **Verified Performance** — Funnel: impressions → attributed → verified → settled; CPA vs benchmark chart; placement/segment breakdown.
8. **Conversion Ledger (Advertiser view)** — Dual-verified records; proofs; excluded (IVT); disputed; export.
9. **Settlement** — Statements; settleable vs excluded/disputed $; take-rate line item; credit/deferred terms status; audit export (BR-10).
10. **Disputes** — Time-box countdown; ledger evidence; resolution status.
11. **Brand Safety & Blocks** — Category allow/block; settlement-blocking violations.
12. **Settings** — Seats/users; API keys; billing/credit rating; consent/CMP linkage.

**Primary widgets (reuse):** KPI strip (verified CPA, Δ incumbent, settleable spend, take-rate); Forecast dial; Segment drivers; Settlement status pill (settleable / excluded / disputed); Ledger proof link.

---

*~750 words. Product canon: PRODUCT.md BR-1–12; APIs: campaigns, bidding `/action-forecast`, reporting CPA-vs-benchmark, settlement, conversions ledger.*