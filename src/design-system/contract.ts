import type { spacing } from "./spacing";
import type { typography } from "./typography";
import type { radius } from "./radius";
import type { shadows } from "./shadows";
import type { colors } from "./colors";
import type { DensityTokens } from "./density";

/** Spacing keys locked to baseline; values allow per-theme rhythm overrides. */
export type ThemeSpacing = {
  [K in keyof typeof spacing]: string;
};
export type ThemeTypography = typeof typography;
export type ThemeRadius = typeof radius;
export type ThemeShadows = typeof shadows;
export type ThemeColors = typeof colors;

/** Strongly typed multi-theme contract — composes all semantic token layers. */
export type Theme = {
  name: string;
  description: string;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  radius: ThemeRadius;
  shadows: ThemeShadows;
  colors: ThemeColors;
  density: DensityTokens;
};

export type ThemeName = "premiumDense" | "compactDashboard" | "readableMarketing";
