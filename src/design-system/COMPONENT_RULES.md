# Component Rules

**Who owns what** — composition boundaries for AI-assisted changes.

Companion: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) · [USAGE_GUIDE.md](./USAGE_GUIDE.md)

---

## Layer model

```
Layout Shell  →  Composed  →  Narrative
                      ↑            ↑
                 Primitive ─────────┘
                      ↑
                 Visual FX (parallel; slot-only)
```

| Layer | Location | Owns |
|-------|----------|------|
| **Layout Shell** | `layout/*`, `*/page.tsx` | Page canvas, nav/footer stack, content rail |
| **Composed** | `*/_sections/*` | Section inset, shell border/radius/shadow, primitive spacing between blocks |
| **Narrative** | Section internals, copy columns | Copy hierarchy, tab state, grid splits — not outer shell |
| **Primitive** | `src/components/*` | Control chrome: buttons, tabs, headers, `TransitionLine` |
| **Visual FX** | `pressure/*`, `ChallengeVariant*`, hero 3D stack | Diagrams, motion, glows, transforms — **not tokenized** |

Higher layers consume lower; FX does not import composed sections.

---

## Ownership matrix

| Concern | Owner | Tokens (examples) |
|---------|--------|-------------------|
| Page background | Layout Shell | `surfacePage`, `surfacePageSubtle` |
| Section horizontal inset | Composed | `sectionX`, `sectionXComfort` |
| Section vertical padding | Composed | `sectionYMid`, `sectionYDark` |
| Container width | Layout Shell **or** Composed (once per page) | `container` |
| Shell border / radius / shadow | Composed | `borderPrimary`, `radius.shell`, `shadows.shell` |
| Card interior padding | Composed or Narrative (one level) | `cardPadding*` |
| Control padding / radius | Primitive | `buttonPadding`, `radius.cardMd` (tabs) |
| System typography | Primitive + `SectionHeader` | `theme.typography.*` per [USAGE_GUIDE](./USAGE_GUIDE.md) |
| Narrative bridge rhythm | Primitive (`TransitionLine`) | `narrativeBridge*` spacing |
| Diagram typography / color | Visual FX | Local classes only |
| Glow / 3D / animation | Visual FX | Local classes, `style jsx` |

### One owner per branch

```
Layout Shell     → page canvas + vertical stack
  Composed       → section inset + shell + tabsTop / narrativeAfterBridge
    Narrative    → copy grid + FX slots
      Visual FX  → diagram internals (no section px/py)
```

**Reject:** page `p-6` + section `p-6` + card `p-6`; nested `radius.shell` on shell + card; FX setting `px-6 py-14` on outer wrapper.

---

## Section vs card

| | Section (Composed) | Card (inside section) |
|--|-------------------|------------------------|
| **Job** | Frame a product story region | Hold one module / use case / step |
| **Radius** | `shell` / `panel` | Often `shell` for feature card; interior may be flat |
| **Padding** | `sectionX*` + optional `sectionY*` | `cardPadding*` once |
| **Typography** | `sectionHero` / `runtimeNarrative` via header | `cardTitle` + `body` |
| **FX** | Embeds via slot | FX fills right column or bottom strip |

---

## Primitive responsibilities

| Component | Owns | Does not own |
|-----------|------|----------------|
| `SectionHeader` | Title role (`section` / `narrative` / `runtime`), eyebrow, explainer subtitle | Section outer padding |
| `TransitionLine` | Bridge geometry + `transitionBridge` type | Section titles |
| `SegmentedTabs` | Tab track + item optics (`radius.panel`, active `radius.card`) | Panel content |
| `PrimaryButton` / `SecondaryButton` | Interactive tokens | Section rhythm |

`className` on primitives: **layout/position only** — do not replace core visual tokens.

---

## FX boundary

**Paths (approximate):**

- `src/app/**/pressure/**`
- `src/app/**/challenges/ChallengeVariant*.tsx`
- `src/app/playground/**`
- `ArchitectureHero` 3D layer block (inside Composed hero)

**FX may use:** arbitrary colors, transforms, keyframes, diagram radius, local mono sizes.

**FX must not:** own section shell, import `useTheme()` for outer panel surfaces (unless approved frame), define tabs/headers, add section-level padding.

**Composed may:** wrap FX in tokenized shell; pass `visual={<Fx />}` slots.

---

## Allowed raw Tailwind

### Any layer (structure & behavior)

`flex`, `grid`, `relative`, `absolute`, `max-w-*`, `overflow-*`, `transition`, `group`, responsive layout, `translate` / `perspective` mechanics.

### Visual FX only

Palette on nodes, `blur-[…]`, `shadow-[…]`, `rounded-3xl` on diagrams, gradients in illustrations, `@keyframes`.

### Composed / Narrative (caution)

- Hero atmosphere gradients inside section — OK if not defining page canvas
- Prefer `theme.spacing.narrative*` over one-off `mt-20` when bridging regions

### Never outside FX (shell language)

| Forbidden | Use |
|-----------|-----|
| `bg-white` / `bg-[#F8FAFC]` on section shell | `theme.colors.surface*` |
| `rounded-[2.5rem]` on outer panel | `theme.radius.shell` |
| `shadow-[0_40px…]` on outer panel | `theme.shadows.shell` |
| `import …/themes/premiumDense` in components | `useTheme()` |

---

## Consumption pattern

```tsx
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

const { theme } = useTheme();

<section className={cn(theme.spacing.sectionXComfort, theme.spacing.sectionYMid)}>
```

---

## Codebase map

| Path | Layer |
|------|-------|
| `src/components/PrimaryButton.tsx` etc. | Primitive |
| `src/components/layout/*` | Layout Shell |
| `src/app/overview/page.tsx`, `architecture/page.tsx` | Layout Shell |
| `src/app/*/_sections/*` | Composed |
| `src/app/architecture/pressure/*` | Visual FX |
| `src/app/overview/challenges/ChallengeVariant*.tsx` | Visual FX |

---

## Change checklist (lightweight)

Before editing styled UI:

- [ ] Classified layer (Shell / Composed / Narrative / Primitive / FX)
- [ ] Typography role matches [USAGE_GUIDE](./USAGE_GUIDE.md) table
- [ ] No second shell padding owner in tree
- [ ] FX edits isolated from shell/token pass
- [ ] New visual values are tokens in `design-system/*`, not inline in components
