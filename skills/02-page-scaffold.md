# Page Scaffold Skill

## Variables

PAGE_FILE=src/app/evolution/page.tsx
SECTION_DIR=src/app/evolution/_sections
REFERENCE_PAGE=src/app/architecture/page.tsx

ROOT_ELEMENT=main
ROOT_CLASSES="min-h-screen"

SURFACE_TOKEN=theme.colors.surfacePageSubtle
TEXT_TOKEN=theme.colors.textStrong

---

## Source Of Truth

1. Read section render order from:  `skills/01-create-sections.txt`
2. Use REFERENCE_PAGE as:
   - layout topology reference
   - theme integration reference
   - section composition reference
   - import organization reference
3. Do NOT copy page-specific content or behaviors.

---
## Restrictions
1. Allowed files:
   - modify `PAGE_FILE` only
2. Do NOT:
   - modify section files
   - add content
   - add animation
   - add sticky behavior
   - add density tuning
   - add interaction logic

---

## Preconditions

- if a listed section file exists but is empty, then add only: `export default function Component() { return null }`
- do not add markup, content, styling, or behavior to placeholder sections

---

## Requirements

- add `"use client"`
- import `Navbar`, `Footer`, `useTheme`, and `cn`
- use `@/` aliases
- import sections from `SECTION_DIR`
- replace placeholder page content
- render:
  1. `Navbar`
  2. sections in topology order
  3. `Footer`
- apply:
  - `ROOT_ELEMENT`
  - `ROOT_CLASSES`
  - `SURFACE_TOKEN`
  - `TEXT_TOKEN`


---

## Verification

1. Run:
```bash
npm run lint -- {PAGE_FILE}
```

2. Ensure:
   - no lint errors
   - imports resolve correctly
   - page renders without placeholder content