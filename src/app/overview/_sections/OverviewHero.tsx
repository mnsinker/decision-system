"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import { overviewHeroContent } from "@/content/overview/overviewHero";
import { systemControlChrome } from "@/design-system/controlChrome";
import { Activity, ArrowRight } from "lucide-react";

export default function OverviewHero() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = overviewHeroContent[locale];

  const scrollToChallenges = () => {
    document
      .getElementById("overview-challenges")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative pt-10 pb-4">
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-64 w-full max-w-4xl -translate-x-1/2 opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(226,232,240,0.2),transparent)]" />
      </div>

      <div
        className={cn("mx-auto", theme.spacing.container, theme.spacing.sectionXComfort)}
      >
        <div
          className={cn(
            theme.spacing.eyebrowBottom,
            "inline-flex items-center px-3 py-1 uppercase",
            theme.spacing.inlineGapTight,
            theme.radius.chip,
            theme.colors.borderAccent,
            theme.colors.surfaceAccent,
            theme.typography.moduleLabel,
          )}
        >
          <Activity size={12} />
          {content.badge}
        </div>

        <h1
          className={cn(
            "max-w-4xl",
            theme.typography.pageHero,
            theme.colors.textPrimary,
          )}
        >
          {content.title.normal}

          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {" "}
            {content.title.highlight}
          </span>

          {content.title.end}
        </h1>

        <p
          className={cn(
            "max-w-2xl",
            theme.spacing.narrativeExplainerTop,
            theme.typography.explainer,
            theme.colors.textMuted,
          )}
        >
          {content.subtitle}
        </p>

        <div
          className={cn(
            "mt-6 flex flex-wrap items-center",
            theme.spacing.inlineGap,
          )}
        >
          <button
            type="button"
            onClick={scrollToChallenges}
            className={cn("group", systemControlChrome.navPrimary)}
          >
            {content.primaryButton}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          <Link
            href="/architecture"
            className={systemControlChrome.navSecondary}
          >
            {content.secondaryButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
