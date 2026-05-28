# Playground Copy Skill

## Variables

FROM=
TO=
REFERENCE=src/app/architecture/_sections/ArchitecturePressure.tsx

---

## Restrictions

Allowed:
- modify `{TO}` only

Do NOT:
- modify `{FROM}- 
- refactor architecture
- apply theme tokens
- apply spacing tokens
- apply typography hooks
- apply locale extraction
- redesign layout
- perform density tuning

---

## Requirements

- copy runtime JSX structure from `{FROM}`
- preserve import conventions from `{REFERENCE}`
- preserve interaction behavior
- preserve runtime flow
- preserve component hierarchy
- remove playground-only wrappers if present

---

## Temporary Allowances

The following are allowed temporarily during migration:
* hardcoded spacing
* hardcoded colors
* hardcoded typography
* inline visual styles
* local constants

These will be normalized in later stages.

---

## Verification
1. ensure file compile successfully
2. Run:
```bash
npm run lint -- {TO}
```