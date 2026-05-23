# Visual Specification

**Status:** Canonical visual direction · **Theme baseline:** `premiumDense`

This document defines how the product should *look and feel*. It is not a component API, token inventory, or Tailwind reference.

| Document | Purpose |
|----------|---------|
| **VISUAL_SPEC.md** (this file) | Philosophy, archetypes, atmosphere, motion, forbidden patterns |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Token inventory and scale hierarchy |
| [USAGE_GUIDE.md](./USAGE_GUIDE.md) | Page-level typography and rhythm mapping |
| [COMPONENT_RULES.md](./COMPONENT_RULES.md) | File ownership and composition rules |

**Implementation anchors (do not duplicate styles elsewhere):**

- Controls → `controlChrome.ts` (`systemControlChrome`)
- Semantic chroma → `semanticVisual.ts`
- Local atmosphere → `atmospheric.ts`
- Section bridges → `TransitionLine.tsx`

---

## 1. Product Visual Philosophy

### What we are building

An **editorial system walkthrough**: a premium, restrained UI that explains how a decision system works—like a designed product brief or institutional report, not a SaaS dashboard or marketing site.

Core qualities:

| Quality | Meaning |
|---------|---------|
| **Editorial system UI** | Hierarchy reads as narrative structure (hero → bridge → section → panel), not widget density |
| **Directional storytelling** | The user is guided through causality: request → reality → consequence → architecture |
| **Restrained hierarchy** | One dominant scale per region; supporting copy stays quiet |
| **Local atmosphere** | Mood and focus via *localized* haze, bloom, and fades—not full-section color washes |
| **Semantic chroma isolation** | Indigo = system/business analytical chrome; rose = escalation/outcome; emerald = architecture response on dark rails |
| **Calm system surfaces** | Neutral page canvas; elevation and tint only where semantics require it |

### Explicit NOT patterns

Do **not** introduce:

- Dirty blue-gray **full-section washes** (`#e9eef6` gradients across entire regions)
- Random **atmospheric gradients** without a semantic job (transition, focus, or zone boundary)
- **Dashboard widget stacking** (metric tiles, dense KPI grids, card-in-card chrome)
- **Oversized marketing CTA blocks** (`px-8 py-4`, heavy `hover:shadow-xl`, hero conversion styling)
- **Glowing neon surfaces** (pulsing dots, `shadow-[0_0_40px…]` accent floods on light UI)
- **Glassmorphism** as a default aesthetic (frosted panels everywhere, blur-as-decoration)
- **Gradient-SaaS aesthetic** (multi-stop headline gradients on every block, violet/indigo marketing chrome)
- **Component-level aesthetic improvisation** (one-off label tracking, local palette experiments, hybrid tab/button controls)

### North star sentence

> Clean neutral canvas, semantic local color, editorial type hierarchy, capsule controls with clear intent, cinematic transitions only between major regions.

---

## 2. Control Archetypes

Two control families share **capsule geometry** (pill radius, `tabItemPadding`, `tabLabel` weight) but differ in **semantic pressure**. They must never be merged into a single component behavior.

**Source of truth:** `systemControlChrome` in `controlChrome.ts`.

---

### Segmented Tabs

**Purpose:** Selection state within a section (which challenge, which pressure module).

**Visual identity:**

- White **pill track** with light border and `shadows.control`
- **Inactive** segments: text-only, slate-600, hover to slate-900
- **Active** segment: slate-900 fill, white label, `shadows.controlActive`
- No arrow affordance, no hover lift campaign, no “go” momentum

**Reference:** Linear segmented controls (quiet selector in a track).

**Implementation:** `SegmentedTabs` → `track` + `itemActive` / `itemInactive` only.

**NOT:**

- Navigation CTA
- Primary walkthrough action
- Marketing button
- Placing the hero scroll action inside the tab track

---

### Navigation CTA

**Purpose:** Directional movement through the walkthrough (scroll to section, open architecture, continue reading).

**Visual identity:**

- **Standalone** control—sibling to tabs, not a tab item inside `track`
- Capsule height target **~44–48px** today via `tabItemPadding`; optical goal **52–56px** without reverting to marketing padding
- Dark slate fill (`surfaceTabActive` / slate-900)
- **Directional arrow** with `translate-x` on hover (navigation intent)
- Subtle lift: inset ring + controlled hover shadow—not `buttonPrimaryHover` / `shadow-xl`
- Same type role as tabs (`tabLabel`) but **stronger presence** via isolation, ring, motion, and lack of surrounding track

**Reference:** Anthropic Console primary actions, Linear “continue” controls (compact, intentional, not promotional).

**Implementation:** `navPrimary` / `navSecondary`—never `itemActive` inside `track` for walkthrough actions.

**Pairing pattern (hero):**

```
[ navPrimary — primary path + arrow ]   [ navSecondary — alternate path ]
```

**NOT:**

- Tab or selected-state mimic inside segmented track
- Marketing conversion button (`buttonPadding`, `button` bold 16px, oversized radius)
- Giant hero CTA blocks
- Bounce, glow pulse, or scale animations

---

### Archetype decision matrix

| Question | Answer |
|----------|--------|
| User choosing among parallel content views? | Segmented Tabs |
| User moving to next narrative region or route? | Navigation CTA |
| Needs arrow + forward motion? | Navigation CTA |
| Stays in white track? | Segmented Tabs only |

---

## 3. Semantic Visual Roles

**Source of truth:** `semanticVisual.ts` + `semanticLabel` geometry.

**Rule:** Zone labels share one geometry (`semanticLabel.base`: 10px mono, `tracking-[0.18em]`, bold). **Only chroma varies** per voice—never invent new label sizes or tracking per section.

---

### businessVoice

| Attribute | Definition |
|-----------|------------|
| **Purpose** | Business request, cited scenario, operational perspective |
| **Allowed chroma** | Indigo labels/icons; slate body and scan bullets |
| **Forbidden contamination** | Rose escalation surfaces, emerald architecture response, neutral-gray “consequence” bands |
| **Surfaces** | Light column: soft indigo edge wash (`from-indigo-50/35`), white falloff—not a card stack |
| **Quote grammar** | `editorialQuote`: serif mark, left rail, 16px italic body—**not** `narrativeHero` / headline scale |
| **Neighbor relationship** | Sits left of `runtimeVoice` (dark); feeds downward into `outcomeVoice` (rose zone) |

**scanLabel** (under businessVoice): Supporting analytical interpretation.

- Label: indigo-400 mono (same geometry as zone labels)
- Bullets: slate text + slate markers—**not** indigo bullet emphasis
- Rule: **semantic label ≠ body emphasis**

---

### runtimeVoice

| Attribute | Definition |
|-----------|------------|
| **Purpose** | System reality, runtime topology, dark-panel module headers |
| **Allowed chroma** | Indigo-soft labels on **dark** surfaces (`text-indigo-400`) |
| **Forbidden contamination** | Rose consequence grammar, light indigo-50 business washes on dark panels |
| **Surfaces** | `slate-900` / cinematic dark panels only |
| **Neighbor relationship** | Contrasts with `businessVoice`; precedes `outcomeVoice` escalation |

---

### outcomeVoice

| Attribute | Definition |
|-----------|------------|
| **Purpose** | Consequence, escalation, collision, systemic outcome |
| **Allowed chroma** | Rose family only: labels, bloom, border, connector node, highlight rule |
| **Forbidden contamination** | Indigo `surfaceMuted` bands, slate-900 neutral consequence footers, indigo bridge chips in this zone |
| **Surfaces** | **Local red zone**: `from-rose-50/55` gradient, rose border-top, localized bloom—never full-page rose |
| **Neighbor relationship** | Isolated band below business/runtime split; must read as **collision**, not “another business section” |

**Hard rule:** `outcomeVoice` and `businessVoice` must remain chromatically separable. Do not unify for “consistency.”

---

### pressureVoice

| Attribute | Definition |
|-----------|------------|
| **Purpose** | Architecture pressure module labels (Policy Pollution, Architecture Response) |
| **Allowed chroma** | Rose (pressure/collision rail), emerald (response rail on dark) |
| **Forbidden contamination** | Indigo business washes on pressure collision cards |
| **Surfaces** | Local rose-tinted wells (left) vs dark emerald cinematic (right)—already split by narrative |
| **Neighbor relationship** | Architecture page only; parallels overview challenge semantics |

---

### Chroma map (quick reference)

| Voice | Label chroma | Zone atmosphere |
|-------|--------------|-----------------|
| businessVoice | indigo-500 | indigo-50 local wash |
| runtimeVoice | indigo-400 on dark | dark runtime |
| outcomeVoice | rose-600 | rose-50 local zone |
| pressureVoice.rose | rose-500 | rose-50 pressure well |
| pressureVoice.emerald | emerald-400/500 | dark gradient panel |

---

## 4. Atmosphere System

**Source of truth:** `atmospheric.ts`

### Core rule

> **Atmosphere must be LOCALIZED.**  
> The default page stays clean and neutral. Atmosphere supports transitions and focus zones—it does not paint entire sections.

### Allowed treatments

| Treatment | Use when |
|-----------|----------|
| **Edge bloom** | Single corner accent (`sectionCornerBloom`)—one per section max |
| **Radial haze** | Top of section or behind bridge cluster |
| **Top fade** | Softening handoff from previous section |
| **Grid fade** | Structure at ≤2% opacity on neutral ground |
| **Local mist** | Behind `TransitionLine` chip only |

### Forbidden treatments

- Full-section tinting (blue-gray diagonal gradients, `via-[#f4f6fa]` washes)
- Dirty blue-gray overlays across content rails
- Diagonal “contamination” gradients spanning viewport width
- Full-page atmospheric washes that change readable contrast of body copy
- Decorative blur with no narrative job

### Avoid muddy atmospheric contamination

Do **not** introduce:

- Gray fog overlays on operational cards
- Low-contrast milky surfaces (`bg-slate-50/50`, washed opacity stacks)
- Smoky opacity layers that flatten ink hierarchy
- Desaturated haze on system/runtime panels

Operational and system surfaces must prioritize:

- Readability
- Semantic clarity
- Contrast hierarchy
- Clean runtime feeling

Atmosphere must stay **local**, **restrained**, and **secondary** to information clarity.

If a visual treatment reduces information readability, remove it.

**Reference:** Linear / Palantir operational surfaces—not cinematic concept art.

### Default surface

Use `surfacePage` / `surfacePageSubtle` / `surfacePrimary` for section grounds. Tint is earned by **semantic role** (business column, outcome band, dark lifecycle)—not by section index.

---

## 5. Transition Philosophy

**Component:** `TransitionLine` · **Type:** `transitionBridge`

### Goal

**Integrated atmospheric transition** between major regions—visible, editorial, embedded in mist—not a floating UI sticker.

### Bridge chrome

| Element | Requirement |
|---------|-------------|
| **Vertical axis** | Visible slate gradient line (`via-slate-300/50` light, `via-white/15` dark)—minimum 20px leg |
| **Horizontal axis** | 8px arms, same tone—must not disappear to 0% opacity |
| **Chip** | Frosted neutral: `bg-white/35 backdrop-blur-md`, `border-slate-200/45`, `text-slate-500`—not opaque white card on gray wash |
| **Cluster mist** | `bridgeClusterMist` behind chip—connects chip to section air |
| **Top fade** | `bridgeTopFade` on light sections—grounds bridge into previous whitespace |

### Contrast minimums

- Bridge label must remain readable on `surfacePageSubtle` and `surfacePrimary` (≥ WCAG contrast for 11px mono is goal; never below “barely visible”)
- Do **not** solve embedding by collapsing chip opacity below perceptual threshold
- Do **not** return to high-contrast indigo sticker chips on white pills

### Spacing rhythm

- Bridge block: `py-4` vertical breathing, `mb-4` before next header
- Pattern: `TransitionLine` → `narrativeAfterBridge` / `mt-5` → `SectionHeader`
- One bridge per major region transition—not between every card

### NOT

- Floating white sticker (`surfacePrimary` solid chip + `borderAccent` on dirty gray section)
- Opacity-collapse minimalism (invisible lines, ghost text)
- Marketing eyebrow chips duplicated above every section (bridge + redundant CTA copy)
- Extra “Continue to Architecture · …” footnotes when CTA + spacing already establish flow

### Cinematic scope

**Cinematic treatment is allowed only here:** dark lifecycle bridges (`bridgeClusterMistDark`), dark section grids, pressure visuals. Light editorial sections stay quiet.

---

## 6. Motion Language

Motion implies **navigation and state**, not delight.

### Allowed

| Motion | Where | Parameters |
|--------|-------|------------|
| Directional arrow shift | `navPrimary` | `translate-x-1`, 200ms, on group hover |
| Subtle elevation | `navPrimary` | Controlled box-shadow step—not `shadow-xl` |
| Color/box-shadow transition | Tabs, nav secondary | `duration-200`, `transition-[color,box-shadow]` |

### Forbidden

- Bounce, spring, elastic easing
- Glow pulse on controls or status dots (except constrained runtime “live” indicators inside dark panels)
- Dramatic scale (`scale-105`, `hover:scale`) on controls
- Floating drift / infinite bob on buttons
- Marketing hover (`hover:bg-indigo-600` on primary slate CTA)

### Tab vs nav motion

- **Tabs:** color/shadow only—no arrow, no translate
- **Nav CTA:** arrow + shadow lift allowed

---

## 7. Background & Surface Rules

### Default neutral surface

| Tier | Token | When |
|------|-------|------|
| Page canvas | `surfacePage` / `surfacePageSubtle` | Overview shell, use cases ground |
| Elevated content | `surfacePrimary` | Cards, challenge shell |
| Inset | `surfaceInset` | Nested wells, icon plates |

**Neutral > tinted.** If a section feels “muddy,” remove tint before adding contrast.

### Grids

- Allowed at **≤2% opacity** on neutral sections for structure
- Grids create **alignment reference**, not texture wallpaper
- No grid on top of strong color washes
- Dark sections: white grid at ~3% max

### Dark runtime surfaces

Allowed for:

- `runtimeVoice` panels (challenge right column, use-case runtime strip, lifecycle section)
- Architecture pressure right rail
- Cinematic visuals inside bounded panels

**Not allowed:** full-page dark mode on editorial overview; dark as default canvas.

### Local bloom

Acceptable:

- One corner bloom per light section
- Outcome `outcomeVoice.atmosphere` inside consequence band only
- Hero hero-level radial (very low opacity) behind page entry

Avoid:

- Stacked blooms (corner + full-width + diagonal)
- Indigo bloom bleeding into rose outcome zones

---

## 8. Reference Archetypes

Explicit borrow/reject matrix—references inform direction, not copy-paste.

### Linear

| Borrow | Reject |
|--------|--------|
| Segmented control track + quiet active fill | Dense sidebar dashboard |
| Compact capsule controls, restrained shadows | Metric card grids |
| Neutral workspace background | Purple gradient brand floods |

### Anthropic Console

| Borrow | Reject |
|--------|--------|
| Calm primary actions, serious slate fills | Consumer playful UI |
| Documentation-like hierarchy | Chat bubble aesthetic as page layout |
| Directional but modest CTAs | Oversized promotional buttons |

### Arc Browser

| Borrow | Reject |
|--------|--------|
| Local atmospheric depth at region edges | Full-window glass blur |
| Soft mist at transitions | Chromatic aberration gimmicks |
| Premium “air” between sections | OS chrome mimicry in product UI |

### Palantir (editorial / system presentation)

| Borrow | Reject |
|--------|--------|
| Analytical zone labels, mono semantics | Military/sci-fi neon HUD |
| Split panels (context vs system) | Table-heavy explorer UI |
| Consequence / escalation framing | Heat-map decoration without narrative |

---

## 9. Forbidden Patterns

Hard **DO NOT** list. Code review should block these.

### Controls

- [ ] CTA styled as segmented tab (`itemActive` inside `track` for scroll/architecture actions)
- [ ] Tabs styled as marketing buttons (large padding, `button` typography, `buttonPrimaryHover`)
- [ ] Hybrid control that changes archetype per page without spec update

### Atmosphere & surfaces

- [ ] Gray-blue full-section gradient backgrounds
- [ ] Giant empty atmospheric zones with no content anchor
- [ ] Random indigo/rose gradients “for polish”

### Structure

- [ ] Nested cards inside cards (dashboard widget nesting)
- [ ] New container chrome around editorial quotes (quote is grammar, not a card)
- [ ] Consequence band on `surfaceMuted` with slate connector (must be `outcomeVoice`)

### Transitions & hierarchy

- [ ] Invisible transition lines (opacity so low axis disappears)
- [ ] Floating sticker bridge (solid white chip, heavy indigo border, no mist)
- [ ] Redundant transition copy when spacing + CTA already establish flow
- [ ] Business quote at `narrativeHero` / `cardTitle` scale (headline collision)

### Semantics

- [ ] Random chroma drift on zone labels (different tracking/size per section)
- [ ] Indigo emphasis on interpretation bullets (markers must stay slate)
- [ ] Rose/indigo merge in consequence zones for “brand consistency”
- [ ] Over-softened hierarchy (everything `text-slate-400`, no dominant line)

### Aesthetic schools (out of product)

- [ ] Glassmorphism-as-brand (blur panels everywhere)
- [ ] Gradient-SaaS (multi-stop gradients on every title block)
- [ ] Tailwind component gallery (one-off utilities not mapped to archetype)
- [ ] Marketing landing page hero CTAs

---

## 10. Enforcement Rule

Before changing visuals—or adding new UI—every change must map to **four checkpoints**:

```
1. Archetype     → Segmented Tab OR Navigation CTA (or neither: static content)
2. Semantic role → businessVoice | runtimeVoice | outcomeVoice | pressureVoice | scanLabel
3. Atmosphere    → localized token from atmospheric.ts OR none
4. Motion        → allowed nav/tab motion OR static
```

### Workflow

1. Read this spec and identify the narrative job of the region.
2. Select archetype and semantic role **before** writing classNames.
3. Pull styles from canonical files (`controlChrome`, `semanticVisual`, `atmospheric`)—do not fork.
4. If the design requires something outside the spec, **update VISUAL_SPEC first**, then implement.

### No local improvisation

The following are not acceptable shortcuts:

- “This section feels different” → new palette
- “Quick fix” → copy-paste Tailwind from a playground preview
- “Match Figma” → hybrid tab/button without spec amendment
- “More premium” → full-section gradient or glass overlay

**Token files describe what exists. VISUAL_SPEC describes what is allowed. USAGE_GUIDE describes where it goes on each page.**

When in doubt: **neutral surface, semantic local chroma, capsule control with correct intent, embedded bridge, no marketing chrome.**

---

*Last aligned with production baseline: `premiumDense` · Overview + Architecture editorial walkthrough.*
