# Clearbid Settlement / Attribution / Trust UX Brief

**References:** Impact, Partnerize (affiliate conversion truth); Adjust, AppsFlyer (attestation + IVT); Stripe Dashboard (finance clarity); Linear (audit aesthetics).  
**Clearbid constraints:** append-only dual-readable ledger; pre-settlement IVT; disclosed take-rate; credit ratings for deferred pay.

---

## 1. Conversion ledger / attestation UX

**Patterns to steal**
- **Impact / Partnerize:** Action queue with explicit lifecycle (`pending → approved → locked → paid`). Each row shows partner, event, amount, lock date — not vanity charts first.
- **AppsFlyer / Adjust:** Conversion = attested chain (click/impression → install/event → validation flags). Drill from KPI → raw event → validation reason. Protect360-style “blocked before bill” language.
- **Clearbid twist:** Dual-readable rows both sides see the same `ConversionRecord` id + hash; columns are role-gated (publisher never sees advertiser RPC; advertiser never sees raw publisher user data).

**UI primitives**
- Append-only table: timestamp, record id, campaign, attestation status, IVT ruling, settlement state.
- Evidence drawer: impression token, advertiser attestation, IVT ruling, operator notes — all read-only after commit.
- Status chrome: *settled* = ledger-green final; *provisional* = muted; *excluded/disputed* = distinct, never editable in place.

---

## 2. Dispute workflows & time-boxed adjudication

**Patterns**
- **Impact Action Inquiry:** Structured challenge against a locked action, with SLA and resolution codes — not email threads.
- **Partnerize:** Publisher-visible challenge status; money held in reserve until deadline.
- **Linear:** Case page = chronological activity + immutable comments; countdown on the case, not buried in email.

**Clearbid workflow**
1. Either side opens dispute from ledger row (reason taxonomy: shaving, wrong attribution, brand-safety, tag misfire).
2. Dual evidence panes (same ledger facts; side-specific annotations).
3. Clock: e.g. T+7 / T+14; auto-resolve **in favour of recorded evidence** if unanswered (BR-4).
4. Resolution appends a new ledger event (`dispute_resolved`) — never mutates the original conversion row.
5. Settlement impact preview before confirm (charge / credit / payout hold).

---

## 3. Statements, IVT exclusions, payouts

**Stripe-like finance**
- Period statement: gross verified actions → IVT exclusions (itemised) → dispute reserves → platform take-rate (single line) → net due / payable.
- Balance / payout history: expected date, threshold progress, remittance id, export CSV/PDF for ERP.
- Reconcile view: every invoice line drills to ledger ids.

**IVT (AppsFlyer Protect360 / Adjust fraud)**
- Pre-settlement only: exclusions are accounting events both counterparties see, not post-pay clawbacks.
- Reason codes + rates; auto-quarantine placements above threshold with human review queue.

**Clearbid specifics**
- Disclosed take-rate on every statement and campaign editor (BR-6).
- Payout calendar + min threshold (BR-9).
- Deferred payment gated by **advertiser credit rating**; publishers see “terms / risk flag,” not internal score math.

---

## 4. Neutrality / append-only evidence

**Trust aesthetics (Linear + Stripe + TradeMesh)**
- Settled rows look immutable (no edit affordance; “history” opens appends only).
- Operator audit rail: who viewed, who adjudicated, who changed credit — separate from conversion facts.
- Integrity affordance: record hash / period Merkle or export checksum on statements (BR-12) — prove neutrality without blockchain theatre.
- Shared finance views: same numbers, role-safe columns; never peer-secret leakage.

---

## 5. Adopt vs avoid + screen map

### Adopt
| Pattern | Source | Clearbid use |
|---|---|---|
| Lifecycle action ledger | Impact | Conversion ledger as primary nav |
| Pre-bill IVT exclusions | AppsFlyer/Adjust | Itemised, dual-visible |
| Time-boxed disputes → evidence wins | Partnerize + BR-4 | Dispute workspace |
| Statement = money story | Stripe | Actions → fees → payout |
| Chronological case audit | Linear | Dispute + ops audit |
| Disclosed single take-rate | — | Campaign + statement line |
| Credit-gated deferred pay | — | Ops credit + pub payout flags |

### Avoid
- Mutable “dashboard truth” without drill-to-evidence
- Affiliate “offer wall” aesthetics (signals untrusted CPA networks)
- Opaque bundled fees / CPM-first default KPIs
- Post-settlement clawbacks as the fraud UX
- Operator silent edits of settled conversions
- Charts that don’t reconcile to ledger ids

### Screens — Operator
1. **Ops home** — disputes nearing deadline, quarantines, settlement exceptions  
2. **Ledger integrity** — append-only browser + hash/export proofs  
3. **Adjudication queue** — dual panes, countdown, resolution codes  
4. **Advertiser credit** — rating, terms eligibility, holds  
5. **Operator audit rail** — every privileged action

### Screens — Shared finance (Advertiser + Publisher)
1. **Ledger** — dual-readable, role-gated columns  
2. **Statements** — IVT + take-rate + disputes + net  
3. **Payouts / invoices** — calendar, remittances, ERP export  
4. **Disputes** — same case object, side-specific compose  
5. **Alerts** — quarantine, credit hold, settlement-block (brand safety)

**Design thesis:** Clearbid UI is a clearing house, not an insights deck — every money number ends at an append-only attestation both sides can read.