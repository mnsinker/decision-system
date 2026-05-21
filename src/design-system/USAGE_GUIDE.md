# Usage Guide

**Anti-drift reference** — how Overview and Architecture pages should use the system.

Companion: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) (token inventory) · [COMPONENT_RULES.md](./COMPONENT_RULES.md) (ownership)

---

## Core rules

1. **One `pageHero` per page** — only the top hero on Overview and Architecture.
2. **`sectionHero` is structural** — documentary, analytical; never emotional marketing scale.
3. **`narrativeHero` / `runtimeNarrative` stay below `pageHero`** — never use them as page entry.
4. **Use `explainer` for subtitles** under heroes and section headers — not `body` at hero scale.
5. **Use `moduleLabel` for eyebrows** — prefer over `sectionEyebrow` / `monoLabelAccent` in new code.
6. **`transitionBridge` only in `TransitionLine`** — connects regions; not a section title.
7. **Consume via `useTheme()`** — `theme.typography.*`, `theme.spacing.*`, `theme.colors.*`, etc.

---

## Typography by section type

| Section type | Title role | Supporting roles | Notes |
|--------------|------------|------------------|-------|
| **Page hero** | `pageHero` | `moduleLabel` + `explainer` | One per page; CTAs use button primitives |
| **Standard section** | `sectionHero` via `SectionHeader` `role="section"` | `moduleLabel` eyebrow + `explainer` subtitle | Challenges, use cases, architecture pressure header |
| **Runtime dark block** | `runtimeNarrative` via `SectionHeader` `role="runtime"` | `moduleLabel` + `explainer` | Overview lifecycle centerpiece |
| **In-panel narrative** | `narrativeHero` (+ `italic` if quote tone) | `moduleLabel` | Architecture pressure biz-case strip |
| **Business quote column** | `quote` | `moduleLabel` + `explainer` | Challenge panel left column |
| **Consequence / sub-head** | `sectionHero` | `bodySmall` | Inside challenge panel footer |
| **Card** | `cardTitle` | `body` or `explainer` | Use-case cards, lifecycle step cards |
| **Bridge** | `transitionBridge` | `narrativeBridge*` spacing | `TransitionLine` only |

### `SectionHeader` roles

```tsx
<SectionHeader role="section" ... />      // sectionHero
<SectionHeader role="narrative" ... />  // narrativeHero (light emphasis)
<SectionHeader role="runtime" dark ... /> // runtimeNarrative (dark orchestration)
```

Legacy `size="xl"` maps to `narrative` (light) or `runtime` (when `dark`) — prefer explicit `role`.

---

## Narrative rhythm (spacing)

Use narrative tokens for **intentional flow**, not ad-hoc `mt-20` / `mb-10`:

| Token | When |
|-------|------|
| `TransitionLine` + `narrativeBridgeBlock` | Between major page regions |
| `narrativeAfterBridge` | Wrapper after bridge → first header in next region |
| `narrativeSectionContent` | Main content grid after section header |
| `narrativeExplainerTop` | Gap between `pageHero` and `explainer` |

**Production pattern**

```
OverviewHero (pageHero)
  → OverviewChallenges: TransitionLine → narrativeAfterBridge → sectionHero
  → OverviewLifecycle: TransitionLine → narrativeAfterBridge → runtimeNarrative
  → OverviewUseCases: sectionHero → narrativeSectionContent → cards
```

---

## Page maps (current)

### Overview

| Section | Roles |
|---------|-------|
| `OverviewHero` | `pageHero`, `moduleLabel`, `explainer` |
| `OverviewChallenges` | `transitionBridge` → `sectionHero` |
| `OverviewLifecycle` | `transitionBridge` → `runtimeNarrative` → `cardTitle` + `explainer` |
| `OverviewUseCases` | `sectionHero` → `cardTitle` + `body` |

### Architecture

| Section | Roles |
|---------|-------|
| `ArchitectureHero` | `pageHero`, `moduleLabel`, `explainer` |
| `ArchitecturePressure` | `sectionHero` → panel `narrativeHero` (biz case) |

---

## Subtitle / body quick reference

| Copy type | Token |
|-----------|-------|
| Hero or header subtitle | `explainer` |
| Card description | `body` |
| Fine print / consequence detail | `bodySmall` |
| Dark section step description | `explainer` + `textOnDarkMuted` |

---

## Do not

| Avoid | Use instead |
|-------|-------------|
| Second `pageHero` on same page | `sectionHero` or `narrativeHero` |
| `sectionHero` for lifecycle centerpiece | `runtimeNarrative` |
| `narrativeHero` as page title | `pageHero` |
| `text-5xl` / `text-7xl` in production sections | Theme typography roles |
| `TransitionLine` as section header | `sectionHero` + bridge above |
| Local `mb-10` after every bridge | `narrativeAfterBridge` |

---

## Theme & density

- Ship production UI against **`premiumDense`** unless explicitly comparing variants.
- Use `theme.density.*` for section/card rhythm when building reusable section wrappers — do not invent `sectionGapWide` tokens.
- Variant themes change spacing cadence only — not type scale or radius language.
