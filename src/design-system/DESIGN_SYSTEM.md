# Design System

**Baseline:** `premiumDense` · **Runtime:** `useTheme()` from `@/design-system/runtime/useTheme`

Single source of truth for **what exists** in the visual system. For visual philosophy and forbidden patterns see [VISUAL_SPEC.md](./VISUAL_SPEC.md). For usage patterns see [USAGE_GUIDE.md](./USAGE_GUIDE.md). For ownership see [COMPONENT_RULES.md](./COMPONENT_RULES.md).

---

## Architecture

```
primitive values (inside token files only)
    → semantic tokens (spacing, typography, radius, shadows, colors)
    → theme profiles (premiumDense, compactDashboard, readableMarketing)
    → components via useTheme()
```

| File | Owns |
|------|------|
| `spacing.ts` | Section, card, control, narrative rhythm |
| `typography.ts` | Narrative + UI text roles |
| `radius.ts` | Surface rounding hierarchy |
| `shadows.ts` | Elevation roles |
| `colors.ts` | Surface, text, border, interactive |
| `density.ts` | Rhythm profiles (`premium`, `compact`, `readable`) |
| `themes/*.ts` | Theme assembly |
| `contract.ts` | `Theme` type |
| `theme.ts` | `activeTheme` static fallback |
| `runtime/` | `ThemeProvider`, `useTheme()`, registry |
| `narrative.ts` | TypeScript role names only (no styles) |

---

## Scale hierarchy

### Typography (dominance order)

| Role | Approx. scale | Purpose |
|------|---------------|---------|
| `pageHero` | 42–46px, weight 620 | Page entry — Overview + Architecture heroes only |
| `runtimeNarrative` | 30–32px, 620 | Dark-section orchestration headline |
| `narrativeHero` | 30–32px, 620 | In-section runtime / emotional emphasis (light) |
| `sectionHero` | 25–27px, 620 | Structural section titles — analytical |
| `quote` | 23px, italic 620 | Business-case pull quote |
| `cardTitle` | 20px, 620 | Card / module title |
| `explainer` | 15px | Supporting copy under heroes / headers |
| `body` | 14px | Default body |
| `bodySmall` | 13px | Secondary body |
| `transitionBridge` | 11px mono | Inter-section bridge label |
| `moduleLabel` | 10px mono | Eyebrows, runtime labels |
| `tabLabel` | 13px semibold | Segmented tabs |
| `button` / `buttonCompact` | UI chrome | Buttons, nav actions |

Legacy aliases (`hero`, `sectionTitle`, `sectionTitleXl`, etc.) map to the roles above — prefer canonical names in new code.

### Radius (largest → smallest)

| Token | Value | Typical use |
|-------|-------|-------------|
| `shell` | 30px | Outer panels, use-case cards |
| `panel` | 26px | Tab track (optical squircle) |
| `panelLg` | 2.5rem | Large legacy panels |
| `card` | 22px | Tab active item |
| `cardMd` | 20px | Tab inactive item |
| `cardSm` | 18px | — |
| `button` | 16px | Buttons, nodes |
| `buttonLg` | 2xl | Dark runtime strips, lifecycle cards |
| `chip` | xl | Badges, bridge chips |
| `pill` | full | Dots, avatars only — not default tabs |

### Shadows

| Token | Role |
|-------|------|
| `shell` | Primary outer shell |
| `panel` | Large feature panel |
| `card` / `container` | Card elevation |
| `control` / `controlActive` | Tabs, inline controls |
| `tabTrackInset` | Inset tab track |
| `cardCritical` / `cardAccent` / `glow*` | State emphasis |
| `sm` / `nav` / `button*Hover` | Utility / chrome |

### Surfaces (tier 0 → 3)

| Tier | Tokens |
|------|--------|
| **0 Page** | `surfacePage`, `surfacePageSubtle`, `surfacePageTinted` |
| **1 Elevation** | `surfacePrimary`, `surfaceSecondary`, `surfaceMuted`, `surfaceInset` |
| **2 State** | `surfaceAccent`, `surfaceAccentSolid`, `surfaceCritical`, `surfaceCriticalSolid`, `surfaceSuccess` |
| **3 Dark** | `surfaceDark`, `surfaceDarkPanel`, `surfaceDarkElevated`, `surfaceDarkGradient` (gradient exception) |
| **Chrome** | `surfaceNav`, `surfaceTabTrack`, `surfaceTabActive`, `surfaceLogo` (gradient exception) |

**Not surfaces:** `interactivePrimary`, `interactiveSecondary`, `interactiveActive` — actions/selection, not layout canvases.

### Text & borders

- **Text:** `textPrimary`, `textSecondary`, `textMuted`, `textOnDark`, `textAccent*`, `textCritical*`, `textSuccess*`, tab/nav variants
- **Borders:** `borderPrimary`, `borderMuted`, `borderOnDark`, `borderAccent`, `borderSuccess`, `borderCritical`

### Spacing categories

| Category | Examples |
|----------|----------|
| Section inset | `sectionX`, `sectionXComfort`, `sectionY`, `sectionYMid`, `sectionYDark` |
| Container | `container`, `containerCenter`, `containerGap`, `gridSplit` |
| Card interior | `cardPadding`, `cardPaddingDense`, `cardPaddingComfort`, `cardPaddingSpacious` |
| Block rhythm | `blockGap`, `blockGapDense`, `blockGapWide` |
| Header / tabs | `headerBottom`, `eyebrowBottom`, `tabsTop`, `panelTop`, `sectionHeaderTop` |
| Controls | `buttonPadding*`, `tabItemPadding`, `tabShellPadding` |
| **Narrative rhythm** | `narrativeBridgeBlock`, `narrativeBridgeMargin`, `narrativeBridgeLine`, `narrativeBridgeAxis`, `narrativeAfterBridge`, `narrativeSectionContent`, `narrativeExplainerTop` |

### Density profiles

Themes attach one profile via `theme.density`:

| Profile | Character |
|---------|-----------|
| `premium` | Production baseline — information-dense, breathable |
| `compact` | Tighter section/card rhythm |
| `readable` | Slightly more vertical air — still premium dense |

Density adjusts **rhythm only**, not typography scale, radius language, or palette.

---

## Theme structure

```ts
type Theme = {
  name: string;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  radius: ThemeRadius;
  shadows: ThemeShadows;
  colors: ThemeColors;
  density: DensityTokens;
};
```

| Theme | Role |
|-------|------|
| `premiumDense` | Production default |
| `compactDashboard` | Structural variant — tighter rhythm |
| `readableMarketing` | Structural variant — slightly looser rhythm |

```ts
// Client components
const { theme } = useTheme();

// Static fallback (migrate away)
import { activeTheme } from "@/design-system/theme";
```

---

## Philosophy (locked feel)

- **Premium dense** — information-rich, not terminal-cramped
- **Restrained enterprise** — muted accents, no loud marketing chrome
- **Cinematic dark sections** — depth without neon
- **Semantic-first** — tokens name roles, not raw Tailwind in product UI
