# WEBAPP-SPEC — Operator Console

**Role:** Exchange operator (compliance, fraud analyst, revenue assurance, platform admin)  
**Shell route filter:** all domains including `/identity`  
**Design:** [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) · **IA:** [`IA-NAVIGATION.md`](IA-NAVIGATION.md)

## Primary journeys

1. **Clear exceptions** — disputes nearing deadline → adjudicate with dual evidence → append resolution (never mutate original).
2. **Prove neutrality** — export ledger integrity proof for period; show operator cannot rewrite settled rows (BR-12).
3. **Govern credit** — set advertiser credit rating → gate deferred payment → publishers see risk flag only.
4. **Contain IVT** — review quarantine queue; confirm thresholds; investigate placement patterns.
5. **Tenant hygiene** — users, API keys, enable/disable via identity.

## Screen inventory

| Screen | Route / host view | Purpose | Key components | Empty / error |
| --- | --- | --- | --- | --- |
| Ops home | `/disputes` landing + KPI strip | Exceptions first | Disputes nearing deadline, quarantine count, settlement exceptions | Calm empty: “Queue clear” |
| Adjudication workspace | `/disputes` → `DisputesView` detail | Time-boxed ruling | Dual panes, `Countdown`, resolution codes, settlement impact preview | Block resolve if evidence incomplete |
| Ledger integrity | `/conversions` → `ConversionsView` (ops mode) | Neutrality proof | Append-only browser, hash/export proofs, no edit affordance on settled | Export failure surfaced |
| Inventory quarantine | `/inventory` | Cap bad supply | Same quarantine queue as publisher + force-hold | — |
| Settlement exceptions | `/settlement` | Clearing issues | Holds, deferred mismatches, take-rate audit | — |
| Advertiser credit | settlement/identity adjacent panel | Deferred terms | Rating, eligibility, holds; publishers see flag only | — |
| Campaign oversight | `/campaigns` | Policy review | Brand-safety violations that block settlement | — |
| Bidding / model audit | `/bidding` | Explainability sampling | Spot-check P(action) explanations | — |
| Reporting integrity | `/reporting` | Benchmark honesty | Ensure CPA-vs-incumbent uses shared conversion definition | — |
| Identity | `/identity` → `IdentityView` | Users & API keys | List/create/disable users; API keys; session auth | Demo seeds documented |
| Operator audit rail | shell-level drawer (handwritten) | Privileged actions | Chronological who/when/what — separate from conversion facts | — |

## Data fields (OpenAPI-aligned)

- **Dispute:** full evidence both sides + operatorResolution + resolvedAt
- **ConversionRecord:** integrityHash, previousHash, attestedBy, ivtRuling, immutable after settle
- **AdvertiserRating:** rating, deferredEligible, holdReason
- **InventorySlot:** quarantine metadata, forceHold
- **Identity:** User, ApiKey, AuthSession (`/v0/auth/*`)
- **SettlementStatement:** operatorAdjustments (append-only credits), takeRate

## UX rules unique to operator

- **No silent edit** of settled conversions — only append dispute_resolved / exclusion events.
- Dual panes always show the same ledger facts; annotations are side-specific.
- Credit score internals stay operator-only; publishers get a boolean/flag.
- Audit rail is Linear-like chronology, not a mutable admin form.
- Demo login seeds: `admin@demo.local` (see ddd-identity); API key fallback `ddd_demo_local_dev_key`.

## Build mapping

- All feature folders as needed; operator-only chrome in `platform/webapp/src/app/`
- `features/identity/views/IdentityView.tsx` for users/keys
- `features/disputes` as default landing when role=operator
- Handwritten `OperatorAuditRail` under `src/app/` or `src/features/_shared/` (shared is preserved by webapp cleaner for `services/shared` only — keep app-level)

## Non-goals (MVP UI)

- Full creative studio
- Real-time bid stream debugger as home
- Multi-exchange waterfall configuration
- External IdP / SSO (identity blueprint stubs only)
