# Codegen guide

## Modes

| Mode | When | Action |
|------|------|--------|
| **A — New domain** | First time a domain YAML has no layers | Full multi-layer `generate --domain X` |
| **B — YAML edit** | Domain already scaffolded | Bundle → `--layers core` → handwrite platform |
| **A — Webapp (once)** | First scaffold of UI clients | `pnpm codegen:webapp` then **handwrite** shell + views |
| **B — Webapp edits** | After first webapp generate | Do **not** clean-regen webapp over handwritten UI; handwrite features/hooks deltas |

Routine OpenAPI YAML edits still regenerate **core only**. Webapp stubs are Mode A once; afterwards treat `platform/webapp/src/features/**` and handwritten `services/shared/**` as hand-maintained.

## Commands

```bash
pnpm codegen:paths
pnpm lint:openapi
pnpm bundle:openapi
pnpm codegen:core
pnpm codegen:identity   # full identity scaffold (starter)
pnpm codegen:clearbid   # product domains (backend layers)
pnpm codegen:webapp     # all domains, --layers webapp only
```

Config: `.codegen/.zero-codegen-merged.json`  
Tool: `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main`

### Webapp layer output

```
platform/webapp/src/
  services/domains/{domain}/   # contracts, api-types, service, facade, hooks
  features/{domain}/           # components/, views/{Domain}View.tsx
  services/shared/             # HANDWRITTEN — preserved across cleans
  app/                         # HANDWRITTEN shell (auth, nav, routes)
```

Enable flags: `layers.webapp.services.enabled` and `layers.webapp.features.enabled` (both `true`).

Imports use `package_scope` (`@clearbid/core`). Generators that share a domain folder must not wipe siblings — `FileGenerator` cleans only when `pipeline.clean AND should_clean()`.

## OpenAPI sample shape

- `packages/openapi-core/src/common/` — envelopes, problem, security, parameters, primitives
- `packages/openapi-core/src/identity.yaml` — live sample domain
- `.codegen/openapi-examples/` — teaching specs (not wired to Redocly)

## Shared vs product

| Shared (keep) | Product (add in consumer) |
|---------------|---------------------------|
| `_shared` dirs, middleware, messaging | Domain YAML + generated trees |
| Identity domain | Invoice / orders / … domains |
| Envelope + Problem contracts | Domain-specific schemas |
| `webapp/services/shared` + `webapp/src/app` | Domain feature views |

## UX specs

Web console IA and screen specs live under [`docs/ux/`](ux/).

## Related skills

- `ddd-platform` — architecture & anti-drift
- `ddd-codegen` — pipeline commands
- `ddd-identity` — auth blueprint
