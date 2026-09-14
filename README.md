# Clearbid

OpenAPI-first DDD monorepo for **Clearbid** — a cost-per-action advertising exchange that settles media spend against mutually verified conversions (productized from the Ubex whitepaper).

Product brief: [`PRODUCT.md`](PRODUCT.md)  
UX / webapp specs: [`docs/ux/`](docs/ux/)  
Historical root OpenAPI skeleton (archived): [`docs/openapi.root-skeleton.yaml`](docs/openapi.root-skeleton.yaml)  
Live contracts: `packages/openapi-core/src/`

## Package scope

`@clearbid/*`

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
                                                                              platform/webapp (Vite + React)
```

## Domains

| Domain | Code | Role |
|--------|------|------|
| `identity` | `idn` | API keys, users, operator auth (scaffold) |
| `campaigns` | `cmp` | Advertiser campaigns + conversion definitions |
| `inventory` | `inv` | Publisher slots + quarantine |
| `bidding` | `bid` | Bid requests + action forecasts |
| `conversions` | `cnv` | Attestation + ledger verification |
| `settlement` | `stl` | Statements + publisher payouts |
| `disputes` | `dsp` | Time-boxed dispute adjudication |
| `reporting` | `rpt` | Verified CPA vs incumbent benchmark |

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: ddd_demo_local_dev_key

pnpm codegen:webapp   # once — domain UI stubs
pnpm dev:web          # http://127.0.0.1:5173 — role-gated console
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. **Webapp** → `pnpm codegen:webapp` once; then handwrite views under `features/` (do not clean-regen over UI).
4. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
