# Clearbid Supply-Side UX Brief

**Scope:** Publisher console for remnant monetization — not a full ad server. References: Google Ad Manager (GAM), PubMatic, Magnite, Prebid.js / Prebid Admin UI patterns.

---

## 1. Inventory / slot management IA

| Pattern | Source | Clearbid fit |
|---|---|---|
| Site → ad unit → sizes / formats | GAM | Keep shallow: **Property → Slot → Format** (`display` / `video` / `in_app`) |
| Placement codes + key-values | GAM | Slot ID + property string only; no full targeting taxonomy |
| Site / app → placements → deals | PubMatic / Magnite | Map to **remnant pool** + optional deal tags later |
| Ad unit config in wrapper, not console | Prebid | Treat Clearbid as a **demand route**, not primary inventory SoR |

**Recommended IA:** `Inventory` (list) → Slot detail (status, blocks, IVT, eRPM) → Property settings (payout, category policy). Avoid GAM-depth hierarchies, floor trees, and creative preview.

---

## 2. Fill rate, yield, quarantine patterns

**Industry norms**
- **GAM / SSPs:** fill, eCPM, revenue, unfilled by unit; floors and bid density for yield.
- **PubMatic / Magnite:** bidder competition, win rate, deal vs open; quality scores and traffic shaping.
- **Prebid:** bid rate / timeout / no-bid by adapter — ops diagnostics, not settlement.

**Clearbid-specific**
- Hero metrics: **predicted eRPM vs incumbent stack**, **verified actions settled**, **IVT exclusion rate** — not impression fill alone.
- **Quarantine (auto):** when `invalidTrafficRate` breaches threshold → status `quarantined`, reason shown, bidding paused (BR-5).
- **Release gate:** human review + short cool-down; show IVT trend before re-activate.
- **Accounting UX:** every exclusion itemised on ledger/statement (not a silent credit memo).

Avoid: opaque “quality score” without actionable reason; quarantine that only emails ops with no in-product queue.

---

## 3. Category / brand-safety block UX

**Adopt from incumbents**
- IAB / GARM-style **category pickers** with search + bulk apply (PubMatic / Magnite advertiser blocks).
- Inheritance: property defaults → slot overrides (GAM-like, keep 2 levels).
- Preview: “would block X% of Clearbid demand” before save.

**Clearbid delta (BR-11)**
- Blocks are **settlement-blocking**, not only serve-time filters.
- Violation → conversion/impression path marks exclusion; both sides see reason on ledger.
- Surface **blockedAdvertiserCategories** on slot and on statement line items.

Avoid: free-text keyword walls as primary control; silent creative filtering with no audit trail.

---

## 4. Adopt vs avoid for Clearbid publishers

| Adopt | Avoid |
|---|---|
| Remnant-first onboarding (“route leftover only”) | Replacing primary ad server / full GAM parity |
| Side-by-side **Clearbid eRPM vs incumbent** | Vanity fill without payout predictability |
| Mutual **conversion ledger** + dispute SLA (BR-4) | Advertiser-reported CPA with trust-me payouts |
| Auto IVT quarantine + itemised exclusions | Post-pay clawbacks as the fraud model |
| Category blocks with settlement evidence | Complex deal/PG/PMP suites at MVP |
| Prebid-style adapter status (timeouts, no-bids) | Full bidder auction debugger as publisher home |
| Payout calendar + min threshold (BR-9) | Nested floor / package / packaging UIs |

---

## 5. Screen inventory — Publisher console

| # | Screen | Purpose | Key elements |
|---|---|---|---|
| 1 | **Home / Yield** | Decide what to route | Predicted eRPM vs incumbent; settled $; open disputes; quarantine count |
| 2 | **Inventory list** | Ops daily view | Slots by status (`active` / `quarantined` / `disabled`); IVT %; format; property |
| 3 | **Slot register** | Remnant entry | Property, format, optional sizes; default category policy |
| 4 | **Slot detail** | Diagnose one unit | Status timeline; IVT rate; blocks; eRPM trend; ledger link |
| 5 | **Quarantine queue** | Cap bad supply | Reason, threshold, release checklist, cool-down |
| 6 | **Category blocks** | Editorial safety | Property defaults + slot overrides; demand-impact estimate |
| 7 | **Ledger / statements** | Anti-shave trust | Actions attested, exclusions, disputes, payouts (dual-readable) |
| 8 | **Disputes** | Time-boxed claims | Evidence from ledger; SLA clock; default to recorded evidence |
| 9 | **Integration** | Connect stack | Tag / Prebid bidder snippet; API key; health (bid/no-bid) |
| 10 | **Payouts** | Cash predictability | Schedule, threshold, credit-policy note for deferred advertisers |

**MVP nav:** Yield · Inventory · Quarantine · Blocks · Ledger · Payouts · Setup.

---

*Design principle: Clearbid’s publisher UX should feel like a **settlement-grade remnant channel** (ledger + eRPM lift + quarantine), borrowing SSP clarity from PubMatic/Magnite and Prebid integration hygiene — without GAM’s inventory operating system.*