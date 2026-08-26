"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const { theme } = useTheme();
  const { locale, setLocale } = useLanguage();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const navItemClass = (active: boolean) =>
    cn(
      "relative pb-1 transition after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-indigo-600 after:transition-transform",
      active
        ? theme.colors.textAccentStrong
        : cn(theme.colors.textNavLinkHover, "after:scale-x-0 hover:after:scale-x-100"),
    );

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
          <Link
            href="/overview"
            className={cn(
              "flex h-10 w-10 items-center justify-center",
              theme.radius.icon,
              theme.colors.surfaceLogo,
              theme.shadows.nav,
            )}
          >
            <Sparkles size={20} fill="currentColor" />
          </Link>

          <Link href="/overview">
            <div className={theme.typography.navBrand}>AI DECISION SYSTEM</div>

            <div className={theme.typography.navMeta}>
              Ontology • Planning • Execution
            </div>
          </Link>
        </div>

        <div
          className={cn(
            "hidden items-center md:flex",
            theme.spacing.navLinkGap,
            theme.typography.navLink,
          )}
        >
          <Link
            href="/overview"
            className={navItemClass(isActive("/overview"))}
            aria-current={isActive("/overview") ? "page" : undefined}
          >
            {locale === "en" ? "Overview" : "概览"}
          </Link>

          <Link
            href="/architecture"
            className={navItemClass(isActive("/architecture"))}
            aria-current={isActive("/architecture") ? "page" : undefined}
          >
            {locale === "en" ? "Architecture" : "架构"}
          </Link>

          <Link
            href="/evolution"
            className={navItemClass(isActive("/evolution"))}
            aria-current={isActive("/evolution") ? "page" : undefined}
          >
            {locale === "en" ? "Evolution" : "演化"}
          </Link>

          <Link
            href="/demo"
            className={navItemClass(isActive("/demo"))}
            aria-current={isActive("/demo") ? "page" : undefined}
          >
            {locale === "en" ? "Demo" : "演示"}
          </Link>
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

          <a
            href="https://rag-agent-order-assistant-pmylymnsvoae742ilijbs7.streamlit.app/"
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
          </a>
        </div>
      </div>
    </nav>
  );
}
