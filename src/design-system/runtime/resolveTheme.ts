import type { Theme } from "../contract";
import type {
  ResolvedTheme,
  ResolveThemeOptions,
  ThemeName,
  ThemeOverrides,
} from "./types";
import { themeRegistry } from "./themeRegistry";

function getBaseTheme(name: ThemeName): Theme {
  const theme = themeRegistry[name];
  if (!theme) {
    throw new Error(
      `[resolveTheme] Unknown theme "${name}". Registered: ${Object.keys(themeRegistry).join(", ")}`,
    );
  }
  return theme;
}

/**
 * Extension point: deep-merge override layers onto a base theme.
 * Phase 1 returns base unchanged — structure reserved for partial overrides.
 */
function applyThemeOverrides(
  base: Theme,
  overrides: ThemeOverrides,
): ResolvedTheme {
  void overrides;
  // Future: per-layer deep merge (spacing, colors, density, etc.)
  return base;
}

/**
 * Resolves a theme by name with optional partial overrides.
 *
 * Resolution pipeline (current → future):
 * 1. Registry lookup (base theme)
 * 2. ThemeOverrides merge (preview, admin, nested scopes)
 * 3. Runtime injection (dark mode, env) — not implemented
 */
export function resolveTheme(
  themeName: ThemeName,
  options?: ResolveThemeOptions,
): ResolvedTheme {
  const base = getBaseTheme(themeName);

  if (!options?.overrides) {
    return base;
  }

  return applyThemeOverrides(base, options.overrides);
}

/**
 * Resolves a theme from an explicit base + override pair.
 * Anticipates inheritance: derived themes extend a parent without duplicating registry entries.
 */
export function resolveThemeFromBase(
  baseName: ThemeName,
  overrides: ThemeOverrides,
): ResolvedTheme {
  return resolveTheme(baseName, { overrides });
}
