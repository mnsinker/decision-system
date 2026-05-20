"use client";

import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ThemeContextValue, ThemeName } from "./types";
import { defaultThemeName, isThemeName } from "./themeRegistry";
import { resolveTheme } from "./resolveTheme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export type ThemeProviderProps = {
  children: ReactNode;
  /** Initial theme; defaults to registry default (`premiumDense`). */
  initialTheme?: ThemeName;
};

export function ThemeProvider({
  children,
  initialTheme = defaultThemeName,
}: ThemeProviderProps) {
  const [themeName, setThemeNameState] = useState<ThemeName>(initialTheme);

  const setTheme = useCallback((name: ThemeName) => {
    if (!isThemeName(name)) {
      throw new Error(
        `[ThemeProvider] Invalid theme "${name}". Use a registered ThemeName.`,
      );
    }
    setThemeNameState(name);
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    const resolvedTheme = resolveTheme(themeName);
    return {
      themeName,
      theme: resolvedTheme,
      setTheme,
    };
  }, [themeName, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext };
