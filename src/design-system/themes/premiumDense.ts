import type { Theme } from "../contract";
import { spacing } from "../spacing";
import { typography } from "../typography";
import { radius } from "../radius";
import { shadows } from "../shadows";
import { colors } from "../colors";
import { densityProfiles } from "../density";

/**
 * Locked baseline theme — preserves current premium-dense enterprise feel exactly.
 * This is the active production visual profile.
 */
export const premiumDense: Theme = {
  name: "premiumDense",
  description:
    "Premium dense enterprise — restrained, breathable, information-rich. Current site baseline.",
  spacing,
  typography,
  radius,
  shadows,
  colors,
  density: densityProfiles.premium,
};
