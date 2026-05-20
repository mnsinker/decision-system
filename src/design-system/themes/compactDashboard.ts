import type { Theme } from "../contract";
import { typography } from "../typography";
import { radius } from "../radius";
import { shadows } from "../shadows";
import { colors } from "../colors";
import { densityProfiles } from "../density";
import { createThemeSpacing, spacingFromDensity } from "./createThemeSpacing";

const density = densityProfiles.compact;

/**
 * Structural variant — slightly denser rhythm only.
 * Same colors, typography, radius, and shadow softness as premiumDense.
 */
export const compactDashboard: Theme = {
  name: "compactDashboard",
  description:
    "Slightly denser information panels — still premium, not Bloomberg or terminal UI.",
  spacing: createThemeSpacing(spacingFromDensity(density)),
  typography,
  radius,
  shadows,
  colors,
  density,
};
