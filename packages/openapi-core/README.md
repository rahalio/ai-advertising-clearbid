# @clearbid/openapi-core

OpenAPI 3.1 contracts for Clearbid.

| Domain | Spec |
|--------|------|
| identity | `src/identity.yaml` |
| campaigns | `src/campaigns.yaml` |
| inventory | `src/inventory.yaml` |
| bidding | `src/bidding.yaml` |
| conversions | `src/conversions.yaml` |
| settlement | `src/settlement.yaml` |
| disputes | `src/disputes.yaml` |
| reporting | `src/reporting.yaml` |

Shared fragments live in `src/common/`.

```bash
pnpm lint:domains
pnpm bundle:domains
```
