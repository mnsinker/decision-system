import { spacing } from "../spacing";
import type { ThemeSpacing } from "../contract";
import type { DensityTokens } from "../density";

/**
 * Merges base spacing with density-driven overrides.
 * Preserves all non-overridden keys from the locked baseline.
 */
export function createThemeSpacing(
  overrides: Partial<ThemeSpacing> = {},
): ThemeSpacing {
  return { ...spacing, ...overrides };
}

/** Derives spacing overrides from a density profile's key rhythm tokens. */
export function spacingFromDensity(density: DensityTokens): Partial<ThemeSpacing> {
  return {
    sectionX: density.sectionPaddingX,
    sectionY: density.sectionPaddingY,
    cardPadding: density.cardPadding,
    blockGap: density.cardGap,
    headerBottom: density.headerGap,
    containerGap: density.containerGap,
  };
}
