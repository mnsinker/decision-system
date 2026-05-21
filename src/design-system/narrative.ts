/**
 * Narrative role system — semantic responsibility map for Overview + Architecture.
 *
 * Use via theme.typography.* and theme.spacing.narrative*; do not invent local scales.
 */
export type NarrativeRole =
  | "pageHero"
  | "sectionHero"
  | "narrativeHero"
  | "transitionBridge"
  | "explainer"
  | "runtimeNarrative"
  | "moduleLabel"
  | "quote"
  | "cardTitle";

/** SectionHeader title roles */
export type SectionNarrativeRole = "section" | "narrative" | "runtime";
