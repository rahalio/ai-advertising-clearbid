# Clearbid — Design System

Theme for the Clearbid web console (`platform/webapp`). Spirit: **settlement-grade trust** — calm, evidentiary, high-contrast data, no “AI glow.”

## Brand & personality

- **Name signal:** “Clearbid” is hero-level in shell chrome (sidebar brand + login), not an eyebrow.
- **Voice:** precise, accounting-adjacent, never hype. Prefer “verified,” “settleable,” “excluded,” “attested” over “optimized,” “boosted,” “smart.”
- **Metaphor:** clearing house / ledger, not growth dashboard.

## Color tokens (implemented in `src/styles.css`)

| Token | Role | Notes |
| --- | --- | --- |
| `--bg` / `--bg-elevated` / `--bg-panel` | Surfaces | Deep green-ink, not flat black SaaS |
| `--border` | Rules | Hairline separators for ledger density |
| `--text` / `--text-muted` | Type | High contrast for numbers; muted for meta |
| `--accent` (`#3d9b74`) | Affirmative / settled | Ledger-green for settleable / verified |
| `--warning` | Provisional / learning | Soft amber — not alarm |
| `--danger` | Excluded / disputed / quarantine | Distinct from accent |

**Status chrome**

| State | Treatment |
| --- | --- |
| Settled / verified | Accent text + solid pill |
| Provisional / pending attestation | Muted + dashed border |
| Excluded (IVT) | Danger outline; never editable |
| Disputed | Warning fill + countdown |
| Quarantined | Danger badge on inventory rows |

## Typography

| Role | Family | Use |
| --- | --- | --- |
| Display | Source Serif 4 | Brand, page H1 |
| UI | IBM Plex Sans | Nav, labels, body |
| Data | IBM Plex Mono | IDs, hashes, money, CPA, rates |

Avoid Inter / Roboto / system-only stacks for primary UI.

## Layout & density

- **Shell:** fixed sidebar (~240px) + main canvas; role switcher in sidebar footer.
- **Tables first:** list screens are dense data tables with sticky header and status column — not card grids.
- **Detail:** split view — primary facts left, evidence / history drawer right.
- **No cards in hero/home KPI strip** unless the strip itself is interactive filters.
- One job per section: one H1, one short supporting line, then the working surface.

## Motion

Use sparingly (2–3 intentional motions):

1. Sidebar active indicator slide.
2. Evidence drawer slide-in.
3. Soft fade on status pill change (settled).

No confetti, glow pulses, or skeleton shimmer theatres.

## Charts & numbers

- Every chart must drill to ledger record ids.
- Default series: verified actions, verified CPA, settleable $, IVT excluded $, vs-incumbent delta.
- Take-rate always a single disclosed line (never buried in blended CPM).
- Prefer sparklines + mono figures over ornate dashboards.

## Anti-patterns (do not ship)

- Purple-on-white / indigo gradient “AI SaaS” look
- Neon glow, glassmorphism stacks, rounded-full pill clusters
- Warm cream + terracotta broadsheet look
- Affiliate marketplace / offer-wall visuals
- Emoji status indicators

## Component inventory (build targets)

| Component | Where | Notes |
| --- | --- | --- |
| `KpiStrip` | Home / reporting | Verified CPA, Δ incumbent, settleable, take-rate |
| `StatusPill` | Tables | Settled / provisional / excluded / disputed |
| `LedgerTable` | Conversions | Append-only; row opens evidence drawer |
| `EvidenceDrawer` | Conversions / disputes | Read-only after commit |
| `ForecastDial` | Bidding | Actions @ max CPA + confidence |
| `SegmentDrivers` | Bidding / reporting | Bars for P(action) drivers |
| `QuarantineBadge` | Inventory | Reason + threshold |
| `Countdown` | Disputes | Time-box SLA |
| `TakeRateLine` | Campaign editor + statements | Always visible |

Extend generated stubs under `platform/webapp/src/features/*/components/` — do not invent a parallel component tree.
