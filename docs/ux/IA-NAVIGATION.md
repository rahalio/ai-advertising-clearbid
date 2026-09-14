# Clearbid — Information Architecture & Navigation

Single webapp: `platform/webapp` with **role-gated nav** (Advertiser | Publisher | Operator). Implemented in [`AppShell.tsx`](../../platform/webapp/src/app/AppShell.tsx); routes in [`AppRoutes.tsx`](../../platform/webapp/src/app/AppRoutes.tsx).

## Global chrome

```
Clearbid
Settlement exchange
────────────────────
[ role-filtered nav ]
────────────────────
Console role ▾
session / sign out
```

Role switcher is for demo/sandbox and multi-hat operators; production tenancy should bind default role from identity claims.

## Nav by role

| Route | Feature view | Advertiser | Publisher | Operator |
| --- | --- | --- | --- | --- |
| `/campaigns` | `features/campaigns/views/CampaignsView` | yes | — | yes |
| `/bidding` | `features/bidding/views/BiddingView` | yes | — | yes |
| `/reporting` | `features/reporting/views/ReportingView` | yes | yes | yes |
| `/inventory` | `features/inventory/views/InventoryView` | — | yes | yes |
| `/conversions` | `features/conversions/views/ConversionsView` | yes | yes | yes |
| `/settlement` | `features/settlement/views/SettlementView` | yes | yes | yes |
| `/disputes` | `features/disputes/views/DisputesView` | yes | yes | yes |
| `/identity` | `features/identity/views/IdentityView` | — | — | yes |
| `/login` | `app/LoginPage` | shared | shared | shared |

## Default landing

| Role | Default route |
| --- | --- |
| Advertiser | `/campaigns` (home KPI strip lives above list; later `/` Overview can wrap reporting) |
| Publisher | `/inventory` |
| Operator | `/disputes` (exceptions-first) |

## Mental model (shallow tree)

**Advertiser:** Overview KPIs → Campaigns → Bidding/Forecast → Verified Performance (Reporting) → Conversions ledger → Settlement → Disputes

**Publisher:** Yield home (Reporting) → Inventory → Quarantine (Inventory filter) → Conversions ledger → Settlement/Payouts → Disputes

**Operator:** Exceptions (Disputes) → Inventory quarantine → Settlement exceptions → Ledger integrity (Conversions) → Identity / credit

## Column / data visibility rules

- Publishers never see advertiser revenue-per-customer.
- Advertisers never see raw publisher user-level data.
- Both see shared conversion record ids, IVT rulings, dispute state, settleable amounts.
- Operator sees integrity proofs + credit ratings; privileged actions log to audit rail.

## API domain alignment

| Nav area | OpenAPI domain | Webapp services |
| --- | --- | --- |
| Campaigns | `campaigns` | `services/domains/campaigns` |
| Bidding / forecast | `bidding` | `services/domains/bidding` |
| Inventory / quarantine | `inventory` | `services/domains/inventory` |
| Ledger | `conversions` | `services/domains/conversions` |
| Statements / payouts | `settlement` | `services/domains/settlement` |
| Disputes | `disputes` | `services/domains/disputes` |
| CPA vs incumbent | `reporting` | `services/domains/reporting` |
| Users / API keys / auth | `identity` | `services/domains/identity` |

Handwritten shared infra: `services/shared/infrastructure` (apiClient, React Query tenant hooks, org/role state).
