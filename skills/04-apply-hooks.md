# Apply Runtime Hooks Skill

## Variables

TARGETS=
REFERENCE=src/app/architecture/_sections/ArchitectureLayers.tsx

---

## Reference

Use `{REFERENCE}` as implementation reference for:

- runtime hooks
- token usage
- shared container conventions
- import conventions

---

## Scope

Apply:

- useTheme()
- useLanguage()
- cn()
- theme spacing tokens
- theme radius tokens
- theme typography tokens
- runtime hooks

Replace:

- hardcoded spacing
- hardcoded major radius
- hardcoded typography styles

Allowed replacements:

- direct section horizontal padding → theme.spacing.sectionXComfort
- direct section vertical padding → theme.spacing.sectionY
- direct section container width → theme.spacing.container
- major card radius → theme.radius.cardSm

Preserve:

- existing layout
- existing render hierarchy
- existing interactions
- existing content
- existing animations
- existing visual composition
- existing section visuals
- local visual styling inside diagrams, metrics panels, timelines, code blocks, badges/chips, glow/accent treatments, and spotlight effects

If unsure whether a style is visual or infrastructural, preserve it.

---

## Boundaries

- modify `{TARGETS}` only

Do NOT:
- modify unrelated files
- refactor unrelated components
- rewrite component structure
- rewrite content
- extract content
- add new interactions
- apply background color changes
- apply section background changes
- redesign visuals
- tune density
- redesign panels
- change visual hierarchy
- redesign shadows
- normalize gradients/glows/spotlights

---

## Workflow

1. Read `{REFERENCE}` once
2. Read all `{TARGETS}`
3. Apply runtime hooks and allowed token replacements
4. Preserve existing section visuals
5. If hooks already exist, apply only missing integrations
6. Do not rewrite already-tokenized areas
7. Do not search the wider codebase unless imports fail or lint fails
8. Run lint once
9. Report remaining hardcoded items by category

---

## Verification

Run:

bash npm run lint -- {TARGETS} 

---

## Output

Report in this format:

Applied:
- xxx
- xxx

Preserved:
- xxx
- xxx

Validation:
- lint passed / failed / not run