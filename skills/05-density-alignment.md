# Density Alignment Skill

## Variables

TARGETS=
REFERENCE=src/app/architecture/\_sections/ArchitectureLayers.tsx

---

## Reference

Use `{REFERENCE}` as density reference for:

- spacing rhythm
- typography scale
- padding conventions
- section breathing room
- card density
- vertical rhythm
- content hierarchy
- gap usage

---

## Objective

Align the overall visual density of `{TARGETS}` with `{REFERENCE}`.

This includes:

- spacing rhythm
- typography scale
- typography weight
- padding density
- card breathing room
- section breathing room
- visual hierarchy rhythm
- overall UI compactness vs openness

Goal:

- make the page feel systemically consistent with existing architecture pages
- preserve the existing narrative composition and visual identity
- normalize density conventions only

---

## Scope

Normalize:

- section spacing
- container spacing
- card padding
- internal gaps
- typography scale
- typography weight
- label density
- radius scale
- visual breathing room

Apply:

- existing spacing tokens
- existing typography tokens
- existing radius tokens

Radius normalization applies to rectangular containers, panels, cards, controls,
badges, diagrams, code surfaces, and comparison surfaces when they use local
`rounded*` classes that differ from `{REFERENCE}`. Preserve circular/pill shapes
only when the shape itself communicates state, identity, or affordance.

Preserve:

- existing layout
- existing interactions
- existing animations
- existing content
- existing visual composition
- existing storytelling visuals
- existing gradients/glows/spotlights
- existing section backgrounds
- existing render hierarchy

---

## Boundaries

Modify `{TARGETS}` only.

Do NOT:

- redesign sections
- rewrite layout structure
- change narrative order
- rewrite content
- redesign visuals
- redesign panels
- change section backgrounds
- normalize cinematic visuals
- modify diagrams except for density/radius class alignment
- modify code blocks except for density/radius class alignment
- modify timeline visuals
- modify comparison visuals except for density/radius class alignment
- modify local accent treatments except for density/radius class alignment

If unsure whether something is:

- density-related
- or visual-storytelling-related
  change it to align with the overall visual density of `{REFERENCE}`.

---

## Workflow

1. Read `{REFERENCE}` once
2. Read all `{TARGETS}`
3. Compare density patterns only
4. Normalize spacing and typography rhythm
5. Preserve existing visual identity
6. Avoid structural rewrites
7. Run lint once
8. Report remaining density inconsistencies

---

## Verification

```bash
 npm run lint -- {TARGETS}
```

---

## Output

Applied:

- xxx
- xxx

Preserved:

- xxx
- xxx

Validation:

- lint passed
- not run
