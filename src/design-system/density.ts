import { spacing } from "./spacing";

/** Per-theme density rhythm — spacing references only, no visual redesign. */
export type DensityTokens = {
  sectionGap: string;
  sectionPaddingY: string;
  sectionPaddingX: string;
  cardGap: string;
  cardPadding: string;
  headerGap: string;
  containerGap: string;
};

/**
 * Base density profiles for theme composition.
 * Themes select a profile; components consume via activeTheme.density.
 */
export const densityProfiles = {
  /** Default premium-dense enterprise feel — current site baseline */
  premium: {
    sectionGap: "space-y-14",
    sectionPaddingY: spacing.sectionY,
    sectionPaddingX: spacing.sectionX,
    cardGap: spacing.blockGap,
    cardPadding: spacing.cardPadding,
    headerGap: spacing.headerBottom,
    containerGap: spacing.containerGap,
  },

  /** Slightly tighter — information-heavy panels, not terminal UI */
  compact: {
    sectionGap: "space-y-10",
    sectionPaddingY: spacing.sectionYMid,
    sectionPaddingX: spacing.sectionXComfort,
    cardGap: spacing.blockGapDense,
    cardPadding: spacing.cardPaddingDense,
    headerGap: "mb-5",
    containerGap: "gap-5",
  },

  /** Slightly more breathable — still premium dense, not Apple whitespace */
  readable: {
    sectionGap: "space-y-16",
    sectionPaddingY: spacing.sectionYDark,
    sectionPaddingX: spacing.sectionXComfort,
    cardGap: spacing.blockGapWide,
    cardPadding: spacing.cardPaddingSpacious,
    headerGap: spacing.headerBottomWide,
    containerGap: spacing.containerGapWide,
  },
} as const satisfies Record<string, DensityTokens>;

/** @deprecated Use densityProfiles or activeTheme.density instead */
export const density = densityProfiles;

export type DensityProfile = keyof typeof densityProfiles;
