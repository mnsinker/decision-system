Read:

1. acceptance criteria: /frontend/specs/ac/segmented-tabs-sticky.md

Current Problem Statement:

Problem A — Initial Layout

- light mode initial tab position incorrect
- dark mode initial tab position incorrect

Problem B — Sticky Runtime Behavior

- light mode sticky behavior works
- light mode blur rail works
- dark mode sticky behavior missing
- dark mode blur rail missing

Goal:

Investigate why current segmented tabs implementation does not satisfy acceptance criteria.

Tasks:

## Problem A — Initial Layout Investigation

Investigate:

- layout hierarchy
- spacing system
- wrapper positioning
- margin / padding
- flex / grid alignment
- width constraints
- relative / absolute positioning

---

## Problem B — Sticky Runtime Investigation

Investigate:

- sticky wrapper
- overflow
- transform
- sticky positioning
- z-index
- backdrop-filter
- parent container styles
- theme-specific wrappers

---

General Instructions:

1. Collect factual findings only
2. Do not diagnose root cause yet
3. Do not modify code
4. Do not generate patches

Output:

Append findings to:

/frontend/specs/dumps/tabs-dump.md

Append using this structure:

# Finding N

## Related Problem

(Problem A / Problem B)

---

## File

(path)

---

## Relevant Code

(code snippet)

---

## Observation

(factual observation only)

---

## Possible Relevance

(why this may affect current behavior)