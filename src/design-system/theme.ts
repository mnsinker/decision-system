import { resolveTheme } from "./runtime/resolveTheme";
import {
  themeRegistry,
  defaultThemeName,
  availableThemes,
} from "./runtime/themeRegistry";

/**
 * Static fallback for modules not yet wrapped in ThemeProvider.
 * Prefer useTheme() in client components after provider is mounted.
 */
export const activeTheme = resolveTheme(defaultThemeName);

export {
  themeRegistry as themes,
  defaultThemeName as defaultTheme,
  availableThemes,
};
