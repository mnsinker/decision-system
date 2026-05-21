"use client";

import React from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import { overviewHeroContent } from "@/content/overview/overviewHero";
import { Activity, ArrowRight } from "lucide-react";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

export default function OverviewHero() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = overviewHeroContent[locale];

  return (
    <section className="relative pt-10 pb-8">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -z-10 h-[420px] w-full -translate-x-1/2 opacity-25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#e2e8f0_0%,transparent_50%)]" />
        <div className="absolute top-12 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-indigo-200/40 blur-[100px]" />
      </div>

      <div
        className={cn("mx-auto", theme.spacing.container, theme.spacing.sectionXComfort)}
      >
        {/* Top Badge */}
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

        {/* Heading */}
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

        {/* Subtitle */}
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

        {/* CTA */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PrimaryButton
            icon={
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            }
          >
            {content.primaryButton}
          </PrimaryButton>

          <SecondaryButton>{content.secondaryButton}</SecondaryButton>
        </div>
      </div>
    </section>
  );
}
