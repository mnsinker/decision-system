# Design System Governance

**Status:** Active · **Baseline theme:** `premiumDense`  
**Scope:** Token discipline, semantic naming, and review process.  
**Not in scope:** Visual redesign, spacing changes, or component refactors unless explicitly approved.

---

## 1. Design System Philosophy

This system exists to **systematize** a locked visual language — not to encourage per-component experimentation.

### What this system is

| Principle | Meaning |
|-----------|---------|
| **Premium dense** | Information-rich layouts with intentional compression — not cramped terminal UI. |
| **Restrained enterprise** | Calm contrast, muted accents, no loud marketing chrome. |
| **Cinematic but not flashy** | Dark sections and soft gradients for depth — not neon or cyberpunk. |
| **Compact but breathable** | Tight type and rhythm with enough air to scan — not Apple-scale whitespace. |
| **Semantic-first** | Tokens name *roles* (`surfacePrimary`, `interactivePrimary`), not raw values. |
| **Theme-driven** | Components consume `activeTheme`; themes compose tokens — they do not invent ad-hoc styles. |
| **Token-governed** | New tokens require justification; duplication and drift are rejected in review. |

### What this system is not

- **Utility-first styling chaos** — sprinkling `text-slate-500`, `rounded-2xl`, `px-6` in components.
- **Random Tailwind values** — arbitrary sizes, one-off shadows, or palette names in UI code.
- **Visual experimentation per component** — each page inventing its own radius, shadow, or density language.

**Default posture:** If a value is not in the theme, the component does not own it — either reuse an existing semantic token or open a governed token proposal.

---

## 2. Token Layering Rules

Architecture flows in one direction only:

```
primitive → semantic → theme → component
```

### Primitive layer

**Location:** Tailwind utilities, CSS variables (`globals.css`), raw class strings inside token files.

**Responsibility:** Atomic visual values — e.g. `px-10`, `text-slate-500`, `rounded-[30px]`.

**Rules:**

- Primitives live **only** in token definition files (`spacing.ts`, `colors.ts`, etc.).
- Primitives are **never** imported or referenced directly by components.
- Adding a primitive does not create a semantic contract — it is an implementation detail.

### Semantic layer

**Location:** `src/design-system/{spacing,typography,radius,shadows,colors}.ts`

**Responsibility:** Stable, reusable **roles** that describe purpose across the product.

Examples: `surfacePrimary`, `sectionX`, `cardTitle`, `shell`, `interactivePrimary`.

**Rules:**

- Names describe **what it is for**, not how big it feels (`sectionGap` ✓ · `sectionGapWide` ✗).
- One semantic token = one meaning. No synonyms for the same role.
- Semantic tokens may bundle multiple primitives (e.g. `interactivePrimary` includes bg + text + hover).

### Theme layer

**Location:** `src/design-system/themes/*`, `theme.ts`, `contract.ts`

**Responsibility:** Compose semantic layers into a **coherent profile** (`premiumDense`, `compactDashboard`, `readableMarketing`).

**Rules:**

- Themes **select and override** spacing cadence via `density` — not redefine typography/radius/shadow/palette unless launching a new brand language.
- `premiumDense` is the **production baseline**; other themes are structural variants, not redesigns.
- `activeTheme` is the single source of truth for consuming code.

### Component layer

**Location:** `src/components/**`, page sections (when migrated)

**Responsibility:** Layout structure, behavior, content — **not** visual language ownership.

**Rules:**

- Components read `const theme = activeTheme` (or receive theme via context later).
- Components use `cn()` to merge theme tokens with structural utilities only.
- Components **must not** introduce new visual primitives.

---

## 3. Semantic Token Rules

### When a new semantic token is allowed

Add a token **only if all three** are true:

1. **Reused** — The visual meaning appears in (or is planned for) **multiple** components or sections.
2. **Stable** — The role will not change every sprint (it is not a one-off experiment).
3. **Shared concept** — The name reflects a product-wide idea (e.g. `surfaceInset`), not a single screen.

### When a new semantic token is forbidden

| Anti-pattern | Example | Why |
|--------------|---------|-----|
| One-off spacing alias | `challengePanelPadding` | Belongs in component layout or existing `cardPadding`. |
| Emotional / marketing naming | `heroMarketing`, `sectionGapReadable` | Themes own density; semantics stay neutral. |
| Density-specific naming | `cardPaddingDense`, `sectionGapWide` | Use `density` profiles or a single `cardPadding` + theme override. |
| Component-specific naming | `footerPaddingY`, `navbarLogoSize` | Unless ≥3 components share the role; prefer generic `footerPadding` / `logoMark`. |
| Size adjective stacking | `buttonCompactDenseSoft` | One modifier maximum; prefer role + theme. |
| Palette naming | `rose`, `indigo`, `emerald` in token keys | Use `critical`, `accent`, `success` roles. |

### Naming convention

```
{category}{Role}{Variant?}
```

- **Category:** `surface`, `text`, `border`, `interactive`, + file-level domains for spacing/type/radius/shadow.
- **Role:** `Primary`, `Muted`, `Inset`, `OnDark`, `Critical`, `Accent`, `Success`.
- **Variant (optional):** At most one level — `Solid`, `Strong`, `Soft` — only when two stable variants of the same role exist.

**Good:** `sectionGap`, `cardPadding`, `textMuted`, `surfaceCritical`  
**Bad:** `sectionGapWide`, `cardPaddingMarketing`, `textMutedLight2`

### Duplication policy

Before adding a token:

- Search existing tokens for the **same class string**.
- If the value exists, **reuse** the token — do not create a second name for the same role.
- If the meaning differs, document why in the PR — do not silently duplicate.
- **Deprecation aliases** are allowed temporarily (`surfacePageCool` → `surfacePageTinted`) with identical values; remove after consumers migrate.

---

## 3.1 Semantic Surface Rules

Surface tokens describe **structural and state roles** — not aesthetic adjectives, temperature words, or page-specific names.

### Surface hierarchy (canonical)

| Tier | Token | Role |
|------|-------|------|
| **0 — Page canvas** | `surfacePage` | Default app background (`#F6F7FA`) |
| | `surfacePageSubtle` | Neutral subtle page wash (`#F8FAFC` / slate-50) |
| | `surfacePageTinted` | Cool-tinted page or hero-section canvas (`#FBFDFF`) |
| **1 — Elevation** | `surfacePrimary` | Cards, panels, top shells (white) |
| | `surfaceSecondary` | Split columns, secondary bands |
| | `surfaceMuted` | Panel header strips, soft horizontal bands |
| | `surfaceInset` | Nested wells, code blocks, footnotes |
| **2 — State** | `surfaceAccent` / `surfaceAccentSolid` | Accent-tinted regions |
| | `surfaceCritical` / `surfaceCriticalSolid` | Pressure / risk regions |
| | `surfaceSuccess` | Resolved / positive tint regions |
| **3 — Dark** | `surfaceDark` | Full-bleed cinematic section |
| | `surfaceDarkPanel` | Nested dark panel |
| | `surfaceDarkElevated` | Elevated node on dark |
| | `surfaceDarkGradient` | **Exception** — gradient panel only |
| **Chrome** | `surfaceNav` | Frosted navigation bar (border + fill) |
| | `surfaceTabTrack` / `surfaceTabActive` | Segmented control track / pill |
| | `surfaceLogo` | **Exception** — brand mark gradient only |

**Not surface hierarchy:** `interactivePrimary`, `interactiveSecondary`, `interactiveActive` — these are **actions and selection**, not layout canvases. `interactiveActive` may share a fill value with `surfaceTabActive`; the names must not merge.

### Resolved ambiguities

| Former confusion | Resolution |
|------------------|------------|
| `surfacePage` vs `surfacePageCool` | Different tiers: default page vs tinted canvas. `surfacePageCool` **deprecated** → `surfacePageTinted`. |
| `surfacePage` vs hardcoded `#F8FAFC` | Same role as `surfacePageSubtle` — migrate hardcoded page shells to this token. |
| `surfacePrimary` vs `surfaceMuted` vs `surfaceInset` | **Keep all** — adjacent hex values are intentional elevation steps, not duplicates. |
| `surfaceTabActive` vs `interactiveActive` | **Keep both** — chrome selection vs interactive role naming. |

### When a new surface token is allowed

Add a surface token **only if all four** are true:

1. **Hierarchy fit** — It maps to Tier 0–3 or a governed Chrome exception.
2. **Reused** — Multiple components or sections need the same structural role.
3. **Stable** — The role survives design iterations (not a one-off screen).
4. **Not expressible** — Existing tier token cannot cover the role without misleading naming.

### When a new surface token is forbidden

| Anti-pattern | Example | Use instead |
|--------------|---------|-------------|
| Temperature / mood naming | `surfacePageCool`, `surfaceWarm` | `surfacePageTinted` or theme override |
| Marketing / luxury naming | `surfacePremium`, `surfaceLuxury` | `surfacePrimary` |
| Density naming | `surfaceDense`, `surfaceReadable` | `density` profile + existing tiers |
| Shade micro-variants | `surfacePageSoft`, `surfacePageLight` | Closest tier; do not splinter hex steps |
| Component-local naming | `surfacePressureHeader` | `surfaceMuted` or `surfacePageSubtle` |
| Gradient as generic surface | `surfaceHeroGradient` | `surfaceDarkGradient` exception pattern only |
| One-off arbitrary hex | `bg-[#F8FAFC]` in components | `surfacePageSubtle` |

### Surface token budget

- **Tier 0:** at most three page canvases (`Page`, `PageSubtle`, `PageTinted`).
- **Tier 1:** four elevation steps — do not add `surfaceTertiary` without deprecating an existing step.
- **Tier 2:** state roles only (`Accent`, `Critical`, `Success`) — no new palette names.
- **Chrome:** add only for global UI chrome reused across pages.

---

## 4. Component Ownership Rules

### Required

```ts
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

const { theme } = useTheme();
```

- All **visual** styling comes from `theme.spacing`, `theme.typography`, `theme.radius`, `theme.shadows`, `theme.colors`, and when appropriate `theme.density`.
- `activeTheme` in `theme.ts` is a **static fallback** only until all consumers migrate to `useTheme()`.
- Props like `className` may extend layout or positioning — not replace core visual tokens.

### Forbidden in components

| Category | Examples |
|----------|----------|
| Raw colors | `text-slate-900`, `bg-white`, `border-indigo-100` |
| Raw spacing | `px-6`, `py-12`, `gap-8`, `mb-3` |
| Raw typography | `text-sm`, `text-[11px]`, `font-bold`, `tracking-tight` |
| Raw radius | `rounded-2xl`, `rounded-full` |
| Raw shadows | `shadow-xl`, `shadow-[0_25px_70px_...]` |
| Palette names | `rose-500`, `indigo-600`, `emerald-400` |

### Allowed in components (layout & behavior only)

- Flex/grid: `flex`, `grid`, `items-center`, `justify-between`
- Positioning: `relative`, `absolute`, `sticky`, `z-50`
- Sizing constraints: `max-w-3xl`, `h-10`, `w-full` (when no semantic token exists yet — propose token if repeated)
- Transitions: `transition`, `transition-all`, `duration-300`
- Overflow: `overflow-hidden`
- Responsive structure: `md:flex`, `lg:grid-cols-2`
- Content/state: `group`, `active:scale-95` (behavior, not visual language)

---

## 5. Theme Rules

Themes are **structural profiles**, not design playgrounds.

### Themes MAY change

- **Spacing cadence** — section padding, block gaps, card padding via `density` + spacing overrides.
- **Density rhythm** — vertical stacking (`sectionGap`), horizontal inset selection.

### Themes MAY NOT change (unless creating a new brand language)

- **Typography language** — scale, weight, tracking, font roles.
- **Radius language** — shell / panel / card / button rounding hierarchy.
- **Shadow language** — elevation and glow restraint level.
- **Palette language** — semantic color roles and their relationships.

Variant themes (`compactDashboard`, `readableMarketing`) must remain recognizably the same product — only rhythm shifts, not a new UI genre.

### Switching themes

```ts
import { activeTheme, themes } from "@/design-system/theme";

const theme = activeTheme; // production default
// const theme = themes.compactDashboard; // governed switch only
```

Theme switches require design review — not per-developer preference.

---

## 6. Density Rules

| Profile | Role |
|---------|------|
| **`premiumDense`** | **Baseline.** Production default. All governance references assume this profile. |
| **`compactDashboard`** | Slightly tighter rhythm only — not Bloomberg, not terminal, not data-grid chaos. |
| **`readableMarketing`** | Slightly more breathable — still premium dense; not Apple whitespace, not landing-page airy. |

### Density must always remain

- Restrained contrast and accent usage  
- Cinematic dark sections where appropriate  
- Compact typography (no oversized marketing type in architecture surfaces)  
- Breathable but information-dense spacing  

### Density must never drift toward

- Bloomberg / terminal dashboards  
- Apple marketing whitespace  
- Crypto / neon dashboards  
- Newspaper sharpness (tight squares, minimal radius)  

**Rule:** Density adjusts **rhythm**, not **language**. If a change requires new radius, shadows, or type scale — that is a new design language proposal, not a density tweak.

---

## 7. Review Checklist

Use this checklist on every PR that touches `src/design-system/**` or component styling.

### Before adding a token

- [ ] Is the semantic meaning **reusable** (not one component)?
- [ ] Does this token **already exist** (same class string or role)?
- [ ] Is this **primitive** (stays in token file) or **semantic** (named role)?
- [ ] Is this **component-specific**? If yes, reject or generalize the name.
- [ ] Does this create **duplication** with an existing token?
- [ ] Does the name avoid **density/marketing/emotional** words?
- [ ] Does the name use **role-based** color words (not palette names)?
- [ ] If a **surface** token: does it fit the hierarchy table (§3.1)?
- [ ] If a **surface** token: is it a Tier 0–3 or governed Chrome exception?

### Before merging component changes

- [ ] Component uses `useTheme()` (or approved static fallback during migration)?
- [ ] Only layout/behavior utilities are raw?
- [ ] `className` overrides do not replace core visual tokens?
- [ ] No new visual values smuggled in via arbitrary classes?
- [ ] Segmented controls, buttons, and headers still match `premiumDense` baseline?

### Before adding or changing a theme

- [ ] Is this a rhythm change only?
- [ ] Are typography, radius, shadows, and colors unchanged?
- [ ] Was `premiumDense` compared side-by-side?
- [ ] Does the theme name describe structure, not marketing?

### Before deprecating a token

- [ ] All usages migrated?
- [ ] Export removed from theme contract?
- [ ] GOVERNANCE.md updated if rules changed?

---

## Appendix: File ownership

| File | Owns |
|------|------|
| `spacing.ts` | Semantic spacing & rhythm primitives |
| `typography.ts` | Type scale & text roles |
| `radius.ts` | Surface rounding hierarchy |
| `shadows.ts` | Elevation & glow roles |
| `colors.ts` | Surface, text, border, interactive roles |
| `density.ts` | Rhythm profiles for theme composition |
| `themes/*.ts` | Theme assembly |
| `theme.ts` | `activeTheme` pointer |
| `contract.ts` | `Theme` type contract |
| `GOVERNANCE.md` | Rules (this document) |

**Change authority:** Token additions need explicit justification in PR description. Visual changes to baseline values need design approval — governance does not replace design sign-off for locked feel.
