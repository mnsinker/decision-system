"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const { theme } = useTheme();
  const { locale, setLocale } = useLanguage();

  return (
    <nav className={cn("sticky top-0 z-50", theme.colors.surfaceNav)}>
      <div
        className={cn(
          "mx-auto flex items-center justify-between",
          theme.spacing.container,
          theme.spacing.navHeight,
          theme.spacing.sectionXComfort,
        )}
      >
        <div className={cn("flex items-center", theme.spacing.inlineGap)}>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center",
              theme.radius.icon,
              theme.colors.surfaceLogo,
              theme.shadows.nav,
            )}
          >
            <Sparkles size={20} fill="currentColor" />
          </div>

          <div>
            <div className={theme.typography.navBrand}>AI DECISION SYSTEM</div>

            <div className={theme.typography.navMeta}>
              Ontology • Planning • Execution
            </div>
          </div>
        </div>

        <div
          className={cn(
            "hidden items-center md:flex",
            theme.spacing.navLinkGap,
            theme.typography.navLink,
          )}
        >
          <a href="#" className={theme.colors.textAccentStrong}>
            {locale === "en" ? "Overview" : "概览"}
          </a>

          <a href="#" className={cn("transition", theme.colors.textNavLinkHover)}>
            {locale === "en" ? "Demo" : "演示"}
          </a>

          <a href="#" className={cn("transition", theme.colors.textNavLinkHover)}>
            {locale === "en" ? "Architecture" : "架构"}
          </a>

          <a href="#" className={cn("transition", theme.colors.textNavLinkHover)}>
            {locale === "en" ? "Evolution" : "演化"}
          </a>
        </div>

        <div className={cn("flex items-center", theme.spacing.inlineGap)}>
          <button
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
            className={cn(
              "transition",
              theme.radius.chip,
              theme.spacing.buttonPaddingLocale,
              theme.typography.buttonCompact,
              theme.colors.interactiveSecondary,
            )}
          >
            {locale === "en" ? "中文" : "EN"}
          </button>

          <button
            className={cn(
              "transition-all active:scale-95",
              theme.radius.chip,
              theme.spacing.buttonPaddingCompact,
              theme.typography.buttonCompact,
              theme.colors.interactivePrimary,
              theme.shadows.buttonCompactHover,
            )}
          >
            {locale === "en" ? "Launch Demo" : "启动 Demo"}
          </button>
        </div>
      </div>
    </nav>
  );
}
