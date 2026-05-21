# Design System Enforcement

**Status:** Active · **Baseline theme:** `premiumDense`  
**Companions:** [GOVERNANCE.md](./GOVERNANCE.md) · [COMPONENT_ARCHITECTURE.md](./COMPONENT_ARCHITECTURE.md)  
**Scope:** Guardrails, enforcement levels, escape hatches, migration PR rules, future lint ideas.  
**Not in scope:** Heavy CI, codemods, AST tooling, or visual changes.

---

## 1. Enforcement Level Hierarchy

Rules are tiered by how they are enforced today and how they should be enforced tomorrow.

### Hard enforcement

**Intent:** Prevent architectural breakage and shell drift. Block or fail review if violated.

| Rule | Rationale | Today |
|------|-----------|--------|
| No direct theme file imports in components | Bypasses runtime; breaks switching | Review + grep |
| No `themes/premiumDense` (or sibling) imports in `src/components/**` | Component-level theme selection forbidden | Review + grep |
| No hardcoded **shell** backgrounds on non-FX files | e.g. `bg-[#F8FAFC]`, `bg-white` on sections | Review |
| No hardcoded **shell** radius on non-FX files | e.g. `rounded-[2.5rem]` on section panels | Review |
| No hardcoded **shell** shadows on non-FX files | e.g. `shadow-[0_40px_100px_...]` on outer panels | Review |
| Primitives / Shell / Composed must use `useTheme()` for system visuals | Single runtime consumption path | Review (migration in progress) |
| FX must not own section padding or outer shell | Composition ownership (COMPONENT_ARCHITECTURE §2) | Review |
| No new semantic tokens in component PRs | Tokens live in `design-system/*` only | Review |

**Future hard (documented, not implemented):** see §5 — optional ESLint `no-restricted-imports` for theme paths.

---

### Soft enforcement

**Intent:** Guide consistency; warn in PR but do not block if justified.

| Rule | Rationale | Today |
|------|-----------|--------|
| Prefer semantic surface roles over `bg-slate-*` for structural bands | Surface normalization (GOVERNANCE §3.1) | Review |
| Spacing rhythm via `theme.spacing.*` / `theme.density` | Avoid one-off `py-14` on composed sections | Review |
| Typography via `theme.typography.*` for system copy | Avoid duplicate `text-[11px]` eyebrow stacks | Review |
| One shell-padding owner per tree branch | Prevent nested inflation | Review |
| Deprecate before delete (`surfacePageCool` → `surfacePageTinted`) | Safe migration | Review |
| `cn()` for class composition | Predictable merges | Convention |

**Future soft:** ESLint warnings (non-blocking) for common shell patterns outside FX paths.

---

### Review-only

**Intent:** Human judgment; cannot be automated without harming quality.

| Rule | Rationale |
|------|-----------|
| Narrative visual quality | Metaphor, diagram clarity, art direction |
| Motion taste | Stagger, float timing, hover lift |
| Cinematic balance | Dark section contrast, glow restraint |
| Information density | Not Bloomberg, not Apple whitespace |
| FX craftsmanship | Node layout, 3D angle, gradient subtlety |
| Copy hierarchy inside narrative blocks | Italic quotes, highlight spans |
| Playground / preview pages | Experimental; not production baseline |

---

### Enforcement summary table

| Level | Blocks merge? | Automation target |
|-------|---------------|-------------------|
| **Hard** | Yes (required) | Future: lint errors on imports + shell regex in non-FX paths |
| **Soft** | No (strong preference) | Future: lint warnings |
| **Review-only** | Human only | Never fully automated |

---

## 2. Allowed Raw Tailwind Zones

**Design-token absolutism is forbidden.** Raw utilities are valid in defined zones.

### Always allowed (any layer)

Structural layout and behavior — never replace with color/spacing tokens:

| Category | Examples |
|----------|----------|
| Flex / grid | `flex`, `grid`, `items-center`, `justify-between`, `lg:grid-cols-2` |
| Positioning | `relative`, `absolute`, `sticky`, `inset-0`, `z-10` |
| Sizing constraints | `max-w-3xl`, `h-10`, `w-full`, `min-h-screen` |
| Overflow | `overflow-hidden`, `truncate` |
| Transitions (behavior) | `transition`, `transition-all`, `duration-300` |
| Transform mechanics | `translate-x-full`, `scale-[0.7]`, `[perspective:1500px]` |
| Pointer / group | `group`, `pointer-events-none` |
| Responsive structure | `md:flex`, `hidden`, `lg:pt-0` |

### Allowed in Visual FX layer only

Art-directed implementation — see path patterns in §5:

| Category | Examples |
|----------|----------|
| Arbitrary colors on nodes | `bg-indigo-500`, `text-rose-400`, `from-emerald-100/50` |
| Glow / blur | `blur-[120px]`, `shadow-[0_0_40px_rgba(...)]` |
| Diagram radius | `rounded-[2rem]`, `rounded-3xl` on nodes |
| Animation | `@keyframes`, `animate-[float_6s_...]`, `style jsx` |
| Gradient meshes | `bg-[radial-gradient(...)]` inside diagrams |
| Grid overlays | `bg-[linear-gradient(to_right,#000_1px,...)]` |

### Allowed in Composed / Narrative with caution

| Category | When |
|----------|------|
| Decorative section atmosphere | Hero radial wash **inside** Composed — prefer documenting as FX-adjacent; migrate to token only if reused ≥3× |
| `max-w-[1200px]` | Content measure, not shell — OK as layout |
| `mt-8` between copy blocks | Narrative rhythm — soft: prefer `theme.spacing` when token exists |

### Never allowed (outside FX)

| Category | Examples | Use instead |
|----------|----------|-------------|
| Shell background | `bg-white`, `bg-[#F8FAFC]`, `bg-slate-50` on sections | `theme.colors.surface*` |
| Shell radius | `rounded-[2.5rem]` on panel wrapper | `theme.radius.panelLg` |
| Shell shadow | `shadow-[0_40px_100px_...]` on panel wrapper | `theme.shadows.panel` |
| Shell border color | `border-slate-200` on panel wrapper | `theme.colors.borderPrimary` |
| Direct theme import | `from "@/design-system/themes/premiumDense"` | `useTheme()` |

### Path-based zone map (convention)

| Zone | Glob (approximate) |
|------|---------------------|
| **FX** | `src/app/**/pressure/**`, `src/app/**/challenges/ChallengeVariant*.tsx`, `src/app/playground/**` |
| **Primitive** | `src/components/**` (except `layout/` = Shell) |
| **Layout Shell** | `src/components/layout/**`, `src/app/**/page.tsx` |
| **Composed** | `src/app/**/_sections/**` |
| **Token definitions** | `src/design-system/**` — raw values allowed |

---

## 3. Token Escape Hatch Policy

Bypassing tokens is **allowed in narrow cases** — never for system shell language.

### Allowed escapes

| Case | Layer | Conditions |
|------|-------|------------|
| **One-off FX** | Visual FX | No outer section wrapper; no shared shell |
| **Narrative metaphor** | FX or narrative illustration slot | Contained inside Composed slot; PR notes art direction |
| **Cinematic overlay** | FX or hero atmosphere div | Does not set page canvas or panel shell |
| **Experimental visualization** | `playground/**` only | Not imported into production pages without review |
| **Third-party primitives** | `components/ui/*` | shadcn/Radix — isolate; do not spread raw patterns outward |
| **Static fallback** | `theme.ts` `activeTheme` | Unmigrated modules only; no new usages |

### Forbidden escapes

| Case | Why |
|------|-----|
| “Just this once” panel `bg-white rounded-[2.5rem]` on Composed | Redefines shell language |
| New page canvas hex because “close enough” | Use `surfacePageSubtle` or propose token via GOVERNANCE |
| FX component adding `px-6 py-14` section padding | Ownership violation |
| Token in component PR “for convenience” | Token inflation |

### Escape hatch PR requirements

When using an escape hatch, PR description must include:

1. **Layer** (FX / playground / etc.)
2. **Why tokens are wrong** for this element (1–2 sentences)
3. **Confirmation** shell ownership stays in parent Composed/Shell
4. **Screenshot** if visual/narrative (review-only tier)

---

## 4. Migration Enforcement

Future PRs that touch styling must follow [COMPONENT_ARCHITECTURE.md §6](./COMPONENT_ARCHITECTURE.md#6-future-refactor-strategy).

### Required PR properties

| Expectation | Enforcement |
|-------------|-------------|
| **Shell first, visuals second** | Hard for Composed PRs; FX files untouched in shell-only PRs |
| **One ownership concern per PR** | Soft — reviewer checks double padding / double radius |
| **Deprecate before delete** | Hard for token renames |
| **Preserve `premiumDense` baseline** | Hard — no theme value edits without design approval |
| **`ThemeProvider` + `premiumDense` in dev** | Hard for runtime consumers |
| **Classify layer in PR** | Soft — Primitive / Composed / Shell / FX |
| **No token + FX shell in same PR** | Soft — reduces review blast radius |

### PR template (copy into description)

```markdown
## Design system
- [ ] Layer: Primitive | Composed | Narrative | Layout Shell | Visual FX
- [ ] Ownership: (list concerns: page bg, section inset, shell radius, …)
- [ ] Shell-first / FX-preserved: (yes/no — explain)
- [ ] `useTheme()` used (no new `activeTheme` / theme file imports)
- [ ] No new tokens (or link governance approval)
- [ ] premiumDense visual parity checked
```

### Grep checks (manual, pre-review)

Run from repo root — **zero new violations** in migrated paths:

```bash
# Hard: direct theme imports in components
rg "from [\"']@/design-system/themes" src/components src/app --glob '!**/pressure/**'

# Hard: activeTheme in newly migrated files (goal: useTheme only)
rg "activeTheme" src/components src/app/architecture/_sections

# Soft: shell bg in composed/shell (investigate each hit)
rg "bg-\\[#|bg-slate-|bg-white" src/app/architecture/_sections src/app/architecture/page.tsx
```

---

## 5. Proposed Lightweight Lint Strategy

**Not implemented in this milestone.** Documented for incremental adoption — no AST plugins, no custom Tailwind parser.

### Phase A — zero-config (recommended first)

| Check | Mechanism | Level |
|-------|-----------|--------|
| Block theme path imports | ESLint `no-restricted-imports` patterns | Hard |
| Block `premiumDense` direct import | same | Hard |
| Discourage `activeTheme` in `src/components` | `no-restricted-imports` or grep in CI script | Hard |

Example patterns to restrict (future `eslint.config.mjs` comment block):

```js
// ENFORCEMENT: design-system — see src/design-system/ENFORCEMENT.md
// paths: @/design-system/themes/*, @/design-system/themes/premiumDense
// optional: activeTheme from @/design-system/theme in src/components/**
```

### Phase B — path-scoped regex (simple CI script, optional)

Single `scripts/check-design-system.sh` (future) — **not added now**:

- Fail if `rounded-\[` or `shadow-\[` in `src/app/**/_sections/**` and `src/app/**/page.tsx`
- Ignore if path matches `pressure/`, `playground/`, `ChallengeVariant`
- Fail if `bg-[#` in same paths

Keep script &lt; 40 lines; no dependencies.

### Phase C — not planned (avoid)

- Custom Tailwind class extractor
- Codemods for token migration
- Stylelint with 200 rules
- Per-class theme validator AST

### FX path allowlist (for Phase B)

```
src/app/**/pressure/**
src/app/**/challenges/ChallengeVariant*
src/app/playground/**
```

### Helper utility (optional, minimal)

If a check script is added later, centralize allowlist:

```ts
// src/design-system/enforcement/paths.ts (future)
export const FX_PATH_SEGMENTS = ["/pressure/", "/playground/", "ChallengeVariant"];
```

**This milestone does not add the script or helper** — documented only.

---

## 6. What We Explicitly Do Not Enforce

Avoid overengineering and false positives:

- Every `text-slate-*` inside FX diagrams
- All `gap-*` in grid layouts
- `rounded-full` on avatars/dots in primitives (may use `theme.radius.pill`)
- Narrative italic quote styling
- Playground experiments
- `hover-card` shadcn internals
- Locale-specific typography helpers in `lib/typography.ts`

---

## 7. Reviewer Quick Reference

| If you see… | Action |
|-------------|--------|
| `import { premiumDense }` in component | **Request change** — use `useTheme()` |
| `bg-[#F8FAFC]` on `page.tsx` | **Request** `surfacePageSubtle` |
| `rounded-[2.5rem]` on `ArchitecturePressure` shell | **Request** `theme.radius.panelLg` |
| `shadow-[...]` on pressure diagram node | **Allow** if under `pressure/` |
| `px-4 pt-10` on hero section + token panel inside | **Check** single padding owner |
| New token in component file | **Reject** — governance PR |
| Playground-only weird colors | **Allow** with review-only note |

---

## 8. Relationship to Other Docs

| Document | Enforcement role |
|----------|------------------|
| **GOVERNANCE.md** | What tokens/themes mean; surface rules |
| **COMPONENT_ARCHITECTURE.md** | Who owns padding, radius, FX boundary |
| **ENFORCEMENT.md** (this file) | How rules are enforced; lint roadmap |
| **runtime/** | `useTheme()` required path for hard rules |

---

## Appendix: Enforcement maturity model

| Stage | State |
|-------|--------|
| **0 — Docs** | GOVERNANCE + COMPONENT_ARCHITECTURE + ENFORCEMENT (current) |
| **1 — Manual grep** | PR template + reviewer checklist |
| **2 — ESLint imports** | Restricted theme paths |
| **3 — Shell regex script** | Path-scoped CI optional |
| **4 — Never** | Full Tailwind semantic linter |

**Change authority:** Moving a rule from soft → hard requires team agreement and tooling to avoid false positives.
