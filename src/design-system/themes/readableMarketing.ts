import type { Theme } from "../contract";
import { typography } from "../typography";
import { radius } from "../radius";
import { shadows } from "../shadows";
import { colors } from "../colors";
import { densityProfiles } from "../density";
import { createThemeSpacing, spacingFromDensity } from "./createThemeSpacing";

const density = densityProfiles.readable;

/**
 * Structural variant — slightly more breathable vertical rhythm.
 * Still premium dense; not Apple-whitespace marketing scale.
 */
export const readableMarketing: Theme = {
  name: "readableMarketing",
  description:
    "Slightly more breathable section rhythm — still premium dense, not marketing-whitespace.",
  spacing: createThemeSpacing(spacingFromDensity(density)),
  typography,
  radius,
  shadows,
  colors,
  density,
};
