"use client";

import React from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={cn(
        "border-t",
        theme.colors.borderPrimary,
        theme.colors.surfacePrimary,
        theme.spacing.footerPaddingY,
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between",
          theme.spacing.container,
          theme.spacing.sectionXComfort,
          theme.typography.footerText,
        )}
      >
        <p>© 2026 AI Decision System</p>

        <div className={cn("flex", theme.spacing.navLinkGap)}>
          <a href="#" className={cn("transition", theme.colors.textFooterLinkHover)}>
            Contact me
          </a>

          <a href="#" className={cn("transition", theme.colors.textFooterLinkHover)}>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
