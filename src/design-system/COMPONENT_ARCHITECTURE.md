# Component Composition Architecture

**Status:** Active · **Baseline theme:** `premiumDense`  
**Companion:** [GOVERNANCE.md](./GOVERNANCE.md) (tokens, surfaces, themes)  
**Scope:** Component layers, ownership, composition rules, migration order.  
**Not in scope:** Visual redesign, token changes, or component refactors in this document.

---

## 1. Component Layer Hierarchy

Components are organized in five layers. Higher layers may consume lower layers; reverse imports are forbidden.

```
Layout Shell → Composed → Narrative
                    ↑         ↑
              Primitive ──────┘
                    ↑
              Visual FX (parallel; consumed by Narrative / Composed only)
```

### Layer definitions

| Layer | Location (typical) | Responsibility |
|-------|-------------------|----------------|
| **Primitive** | `src/components/*` (shared UI) | Single-purpose, reusable controls and surfaces. Token-driven. No page context. |
| **Composed** | `src/app/*/_sections/*`, shared section wrappers | Assembles primitives into product sections (hero, pressure module, challenges). Owns section shell + rhythm. |
| **Narrative** | Section internals with story-specific structure | Content hierarchy, copy layout, tab state, business case framing. May embed FX. |
| **Layout Shell** | `src/components/layout/*`, `src/app/*/page.tsx` | App chrome, page canvas, section stacking, max-width rails. No feature semantics. |
| **Visual FX** | `src/app/**/pressure/*`, playground previews, diagram subfolders | Handcrafted visuals: 3D, graphs, glows, motion. **Not** tokenized. |

### Layer responsibilities (detail)

#### Primitive Components

**Examples:** `PrimaryButton`, `SecondaryButton`, `SegmentedTabs`, `SectionHeader`, `SectionLabel`, `TransitionLine`

**Owns:**

- Control-specific radius, padding, typography roles from theme
- Interactive states (hover, active) via semantic tokens
- Internal layout of the control (icon + label row)

**Does not own:**

- Section vertical rhythm
- Page background
- Feature copy hierarchy
- Diagram geometry or motion

**Consumes:** `useTheme()` only (via runtime). No direct theme file imports.

---

#### Composed Components

**Examples:** `ArchitectureHero`, `ArchitecturePressure`, `OverviewChallenges`, `OverviewLifecycle`

**Owns:**

- Section shell: outer padding, container width, shell border/radius/shadow
- Spacing between primitives (tabs → panel, header → content)
- Which primitives appear in the section

**Does not own:**

- Global nav/footer
- Inner DAG / 3D / topology implementation details
- New semantic tokens (proposes via governance)

**Consumes:** Primitives + `useTheme()` for shells. May embed Narrative + FX children.

---

#### Narrative Components

**Examples:** Challenge panel copy columns, pressure business-case header, lifecycle step cards (content side), tab module content orchestration

**Owns:**

- Copy hierarchy within a section (quotes, consequences, step titles)
- Tab/module state wiring
- Grid structure for story (left quote / right visual split)

**Does not own:**

- App-level shell padding (Composed parent owns)
- Glow colors, layer stack transforms, node positions (FX owns)
- Button/tab visual language (Primitive owns)

**Consumes:** Primitives for labels and controls. Passes slots to FX children.

---

#### Layout Shell Components

**Examples:** `Navbar`, `Footer`, `architecture/page.tsx` main wrapper

**Owns:**

- Page canvas surface (`surfacePage`, `surfacePageSubtle`)
- Sticky chrome, footer band
- `min-h-screen`, vertical stack of sections
- Content rail (`max-w-7xl` + horizontal inset tokens)

**Does not own:**

- Feature section interiors
- Card/panel radius inside features
- Handcrafted diagram styling

**Consumes:** Primitives for chrome controls. Renders Composed sections as children.

---

#### Visual FX Components

**Examples:** `PressureLeftVisual1–3`, `PressureRightVisual1–3`, `ArchitectureHero` 3D layer stack, `ChallengeVariant1–3` canvases

**Owns:**

- Absolute positioning, transforms, perspective
- Animation keyframes and timing
- Art-directed gradients, glows, node colors
- Diagram-specific typography (mono labels on nodes)

**Does not own:**

- Section `px` / `py` (Composed owns)
- Shared button/tab/shell tokens
- Theme surface hierarchy for outer panels

**Consumes:** Raw Tailwind and inline styles allowed **only inside this layer**. Must not import `useTheme()` for shell surfaces unless wrapping a tokenized frame explicitly approved in PR.

---

## 2. Ownership Model

**Rule:** Each visual concern has exactly one owner per composition tree branch.

| Concern | Owner | Token examples |
|---------|--------|----------------|
| **Page background** | Layout Shell | `surfacePage`, `surfacePageSubtle` |
| **Section horizontal inset** | Composed (or Layout Shell for page-only wrap) | `sectionX`, `sectionXComfort` |
| **Section vertical rhythm** | Composed | `sectionYMid`, `density.sectionGap` |
| **Container width** | Layout Shell or Composed (pick one per page; not both) | `container`, `containerCenter` |
| **Shell border / radius / shadow** | Composed | `borderPrimary`, `radius.panelLg`, `shadows.panel` |
| **Card / panel interior padding** | Composed or Narrative (one level only) | `cardPadding`, `cardPaddingComfort` |
| **Control padding / radius** | Primitive | `buttonPadding`, `radius.buttonLg` |
| **Typography scale (system)** | Primitive + SectionHeader | `typography.sectionTitle`, `typography.body` |
| **Typography (diagram nodes)** | Visual FX | Hardcoded in FX layer only |
| **Elevation (shell)** | Composed | `shadows.shell`, `shadows.panel` |
| **Elevation (glow)** | Visual FX | Local `shadow-[...]` allowed |
| **Background (structural)** | Composed / Layout Shell | `surfacePrimary`, `surfaceMuted` |
| **Background (cinematic)** | Composed section root or FX | `surfaceDark`, `surfaceDarkGradient` |
| **Motion / transition timing** | Visual FX (or Primitive for micro-interactions) | `duration-300` on tabs OK at Primitive |
| **Layout rhythm between sections** | Layout Shell | Section order only; spacing inside Composed |

### Double-ownership prevention

| Bad pattern | Why | Fix |
|-------------|-----|-----|
| Page `p-6` + Section `p-6` + Card `p-6` | Shell inflation | Page: canvas only. Section: section inset once. Card: interior once. |
| Composed applies `radius.panelLg` + inner Card also `radius.panelLg` | Double shell | Outer Composed owns shell; inner Narrative uses flat `surfaceInset` or no radius |
| FX component sets `px-6` section padding | Steals from Composed | FX is full-bleed inside slot; parent supplies padding |
| Primitive `SectionHeader` adds section `mb-12` | Rhythm belongs to Composed | Header owns internal `eyebrowMargin`; Composed owns `headerBottom` / `tabsTop` |
| Layout Shell + Composed both set `max-w-7xl px-6` | Duplicate rail | Shell sets rail once; Composed uses `container` only without repeating inset |

### Ownership flow (canonical)

```
Layout Shell     → page canvas + vertical stack
  Composed       → section inset + shell (border/radius/shadow) + primitive spacing
    Narrative    → copy grid + slots
      Visual FX  → diagram internals only (no outer padding)
```

---

## 3. Primitive vs Narrative Boundary

### System-controlled visuals (token / theme)

Apply to: Primitives, Composed shells, Layout Shell, Narrative **copy** surfaces.

- Surfaces: `surfacePrimary`, `surfaceMuted`, `surfaceDark`
- Spacing: `sectionXComfort`, `sectionYMid`, `tabsTop`
- Radius: `radius.panelLg`, `radius.buttonLg`
- Shadows: `shadows.panel`, `shadows.shell`
- Typography: `typography.sectionTitle`, `typography.body`, `typography.monoLabelAccent`
- Interactive: `interactivePrimary`, `surfaceTabActive`

**Consumption:** `const { theme } = useTheme()` + `cn()`.

### Art-directed handcrafted visuals (FX / narrative internals)

Apply to: Visual FX layer and locked diagram internals only.

- DAG nodes and edges
- 3D layer stacks (`rotateX`, `perspective`, `translateZ`)
- Cinematic glows (`blur-[120px]`, rgba glows)
- Topology graphics, pressure canvases
- Motion timing (`layerFloat` keyframes, stagger delays)
- Variant-specific accent explosions (rose/indigo/emerald node colors)

**These must NOT become semantic tokens** unless the same exact treatment appears in ≥3 unrelated features and stabilizes as a product-wide role (rare).

### Decision checklist

| Question | If yes → | If no → |
|----------|----------|---------|
| Is it reused across unrelated features? | Consider semantic token (GOVERNANCE §3) | Keep in FX |
| Is it a shell users scan for structure? | Composed + tokens | FX |
| Does it change with `premiumDense` density? | Token or density profile | FX or fixed |
| Is it illustration / metaphor / data-viz? | FX | Token |

### Boundary examples (this codebase)

| Element | Layer | Tokenized? |
|---------|-------|------------|
| `SegmentedTabs` pill track | Primitive | Yes |
| `ArchitecturePressure` outer panel | Composed | Yes |
| `PressureLeftVisual3` rose stack | Visual FX | No |
| `ArchitectureHero` floating layers | Visual FX | No (hero section shell around it: Composed) |
| `OverviewLifecycle` dark section bg | Composed | Yes (`surfaceDark`) |
| Lifecycle node hover translate | Visual FX / Narrative | No (motion) |

---

## 4. Composition Rules

### Allowed consumption matrix

| Consumer → | Primitive | Composed | Narrative | Layout Shell | Visual FX |
|------------|-----------|----------|-----------|--------------|-----------|
| **Primitive** | — | ✗ | ✗ | ✗ | ✗ |
| **Composed** | ✓ | ✗* | ✗ | ✗ | ✓ (slots) |
| **Narrative** | ✓ | ✗ | ✓ (children) | ✗ | ✓ (slots) |
| **Layout Shell** | ✓ | ✓ (sections) | ✗ | ✗ | ✗ |
| **Visual FX** | ✗** | ✗ | ✗ | ✗ | ✓ (subparts) |

\* Composed sections must not nest full Composed sections without explicit page-level layout approval.  
\** FX avoids Primitives to prevent token leakage into diagrams; exceptions require PR note.

### Component catalog (current / planned)

| Primitive | Composed | Narrative | Layout Shell | Visual FX |
|-----------|----------|-----------|--------------|-----------|
| `PrimaryButton` | `ArchitectureHero` | Challenge copy column | `Navbar` | `PressureLeftVisual*` |
| `SecondaryButton` | `ArchitecturePressure` | Pressure biz-case header | `Footer` | `PressureRightVisual*` |
| `SegmentedTabs` | `OverviewChallenges` | Tab module orchestration | `architecture/page` | `ChallengeVariant*` |
| `SectionHeader` | `OverviewLifecycle` | Lifecycle step content | | `ArchitectureHero` 3D stack |
| `SectionLabel` | | | | |
| `TransitionLine` | | | | |

### Composition patterns (required)

**Pattern A — Section with FX slot (pressure module)**

```
Composed (ArchitecturePressure)
  ├── Primitive: SectionHeader, SegmentedTabs
  ├── shell: radius.panelLg + shadows.panel + surfacePrimary
  └── Narrative split grid
        ├── Narrative/PressureLeftCard (label + copy)
        │     └── Visual FX slot
        └── Narrative/PressureRightCard
              └── Visual FX slot
```

**Pattern B — Page stack**

```
Layout Shell (page.tsx)
  ├── Primitive: Navbar
  ├── Composed: ArchitectureHero
  ├── Composed: ArchitecturePressure
  └── Primitive: Footer
```

**Pattern C — Primitive only chrome**

```
Layout Shell
  └── Primitive buttons / nav (theme tokens)
```

### Props and slots

- Composed sections expose `children` or named slots for FX (`visual={<LeftVisual />}`).
- FX components receive content props only; they do not receive theme override props unless preview tooling (future).
- Primitives accept `className` for **layout** extension, not for replacing core visual tokens.

---

## 5. Forbidden Patterns

### Structural

- **Nested shell padding inflation** — more than one of page/section/card applying the same inset class.
- **Shell + shell radius** — nested `rounded-[2.5rem]` on both outer section and inner card without semantic reason.
- **Duplicate container rails** — `mx-auto max-w-7xl px-6` at both page and section level.

### Token / theme

- **Primitives importing theme files directly** — use `useTheme()` only.
- **Page-level hardcoded shells** — `bg-[#F8FAFC]`, `rounded-[2.5rem]` on pages; use `surfacePageSubtle`, `radius.panelLg`.
- **Narrative visuals tokenized** — DO NOT add `shadowGlowTopology` for one pressure diagram.
- **Component-specific spacing semantics** — no `pressureSectionPadding` in `spacing.ts`; use `sectionYMid`.
- **Semantic duplication** — `surfacePageCool` alongside `surfacePageTinted` (see GOVERNANCE deprecation).
- **FX pulling `theme.radius.shell`** for a node card that needs art-directed `rounded-[2rem]` — splits ownership.

### Architectural

- **Composed importing from `pressure/*` for non-slot logic** — orchestration stays in Composed; FX stays isolated.
- **Layout Shell containing feature-specific copy** — belongs in Composed/Narrative.
- **Visual FX defining section headers or tabs** — belongs in Primitive/Composed.
- **New Primitive that embeds a full pressure diagram** — extract FX; Primitive stays small.

### Anti-pattern catalog

```tsx
// ✗ Page + section + card all pad
<main className="px-6 py-14">
  <section className="px-6 py-14">
    <div className="p-6">...</div>

// ✗ FX owns section shell
export function PressureVisual() {
  return <section className="px-6 rounded-[2.5rem] shadow-panel">...</section>

// ✗ Primitive with page spacing
export function PrimaryButton() {
  return <button className={cn(theme..., "mb-12")} />
```

---

## 6. Future Refactor Strategy

Migrations proceed **outside-in**, runtime-safe, with visuals locked at each step.

### Phase order

| Phase | Target | Risk |
|-------|--------|------|
| **0** | Runtime + governance (complete) | — |
| **1** | Shared Primitives + Layout Shell (`useTheme`) | Low |
| **2** | Page shell only (`surfacePage*`, section inset, container) | Low |
| **3** | Composed section shells (border, radius, shadow, section rhythm) | Medium |
| **4** | Narrative copy surfaces (typography tokens, muted bands) | Medium |
| **5** | FX isolation audit (ensure no shell tokens leak in) | Low |
| **6** | Deprecation cleanup (`surfacePageCool`, `activeTheme` static) | Low |

### Rules per phase

1. **Shell first, visuals later** — outer `section` / `main` / panel container before inner diagram lines.
2. **One owner per migration PR** — do not retokenize FX and Composed shell in the same PR unless unavoidable.
3. **Preserve handcrafted visuals** — snapshot or visual diff pressure/hero diagrams before/after; FX files should show zero token diff on glow/transform layers.
4. **Runtime-safe** — every PR must run under `<ThemeProvider initialTheme="premiumDense">`; no `localStorage` theme until explicitly designed.
5. **No new tokens during migration** — map to existing semantics; propose tokens only when GOVERNANCE allow criteria met.
6. **Hydration-neutral** — client boundaries only where `useTheme()` required; avoid theme state derived from browser APIs.

### Per-file migration checklist

- [ ] Identify layer (Primitive / Composed / Narrative / Shell / FX)
- [ ] List ownership concerns touched (padding, radius, etc.)
- [ ] Confirm no double-ownership introduced
- [ ] FX files: confirm diagram classes unchanged
- [ ] Compare `premiumDense` computed classes before/after
- [ ] Run architecture page + overview smoke check

### Suggested next migration targets (ordered)

1. `architecture/page.tsx` → `surfacePageSubtle` (Layout Shell)
2. `ArchitectureHero` → shell tokens only; leave 3D layer block untouched (Composed + FX)
3. `ArchitecturePressure` → panel header band `surfaceMuted` / `surfacePageSubtle` (Composed)
4. `Overview*` sections (Composed shells)
5. `TransitionLine` (Primitive) — optional token pass
6. `pressure/*` — audit only; no tokenization unless accidental shell duplication found

---

## 7. Relationship to GOVERNANCE.md

| Topic | GOVERNANCE.md | This document |
|-------|---------------|---------------|
| Token naming & surfaces | ✓ Primary | Cross-reference only |
| Theme / density | ✓ Primary | Consumption by layer |
| Component layers & ownership | Cross-reference | ✓ Primary |
| FX boundary | Surface §3.1 exceptions | ✓ Primary |
| PR review | Token checklist | Add layer + ownership checklist below |

### Component PR checklist (add to reviews)

- [ ] Component classified into exactly one layer
- [ ] Visual concern ownership documented in PR (one owner per concern)
- [ ] No nested shell padding introduced
- [ ] FX changes isolated from shell/token changes
- [ ] `useTheme()` used (no direct `themes/premiumDense` import)
- [ ] `premiumDense` visual parity verified for migrated shells

---

## Appendix: Current codebase map

| Path | Layer |
|------|-------|
| `src/components/PrimaryButton.tsx` | Primitive |
| `src/components/SecondaryButton.tsx` | Primitive |
| `src/components/SegmentedTabs.tsx` | Primitive |
| `src/components/SectionHeader.tsx` | Primitive |
| `src/components/SectionLabel.tsx` | Primitive |
| `src/components/TransitionLine.tsx` | Primitive |
| `src/components/layout/Navbar.tsx` | Layout Shell |
| `src/components/layout/Footer.tsx` | Layout Shell |
| `src/app/architecture/page.tsx` | Layout Shell |
| `src/app/architecture/_sections/*` | Composed |
| `src/app/architecture/pressure/*` | Visual FX |
| `src/app/overview/_sections/*` | Composed |
| `src/app/overview/challenges/*` | Visual FX (variants) |

**Change authority:** Layer reclassification or new layer types require design-system review — not ad-hoc per feature team.
