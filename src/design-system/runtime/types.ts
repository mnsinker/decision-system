import type { Theme, ThemeName as ContractThemeName } from "../contract";

/** Canonical theme identifier — aligned with contract. */
export type ThemeName = ContractThemeName;

/** Read-only map of all registered theme definitions. */
export type ThemeRegistry = Readonly<Record<ThemeName, Theme>>;

/**
 * Fully resolved theme after registry lookup and optional override merging.
 * Today identical to Theme; future phases may attach resolved metadata.
 */
export type ResolvedTheme = Theme;

/** Partial layer overrides — extension point for inheritance / runtime injection. */
export type ThemeOverrides = {
  spacing?: Partial<Theme["spacing"]>;
  typography?: Partial<Theme["typography"]>;
  radius?: Partial<Theme["radius"]>;
  shadows?: Partial<Theme["shadows"]>;
  colors?: Partial<Theme["colors"]>;
  density?: Partial<Theme["density"]>;
  name?: string;
  description?: string;
};

export type ThemeContextValue = {
  themeName: ThemeName;
  theme: ResolvedTheme;
  setTheme: (name: ThemeName) => void;
};

export type ResolveThemeOptions = {
  overrides?: ThemeOverrides;
};
