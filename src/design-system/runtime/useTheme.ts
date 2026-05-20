"use client";

import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import type { ThemeContextValue } from "./types";

export type UseThemeReturn = ThemeContextValue;

/**
 * Runtime theme hook — single consumption path for components.
 * Requires `<ThemeProvider>` ancestor once the app is wired.
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within a ThemeProvider. Wrap your app (or subtree) with <ThemeProvider>.",
    );
  }

  return context;
}
