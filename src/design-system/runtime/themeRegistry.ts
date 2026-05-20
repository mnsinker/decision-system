import type { ThemeRegistry, ThemeName } from "./types";
import { premiumDense } from "../themes/premiumDense";
import { compactDashboard } from "../themes/compactDashboard";
import { readableMarketing } from "../themes/readableMarketing";

/**
 * Single registry for all theme definitions.
 * Import themes only here — not in components or pages.
 */
export const themeRegistry = {
  premiumDense,
  compactDashboard,
  readableMarketing,
} as const satisfies ThemeRegistry;

export const defaultThemeName: ThemeName = "premiumDense";

export const availableThemes = Object.keys(themeRegistry) as ThemeName[];

export function isThemeName(value: string): value is ThemeName {
  return (availableThemes as string[]).includes(value);
}
