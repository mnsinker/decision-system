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
    <section className="relative pt-20 pb-16">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#e2e8f0_0%,transparent_50%)]" />
        <div className="absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-200/50 blur-[120px]" />
      </div>

      <div
        className={cn("mx-auto", theme.spacing.container, theme.spacing.sectionXComfort)}
      >
        {/* Top Badge */}
        <div
          className={cn(
            theme.spacing.headerBottomWide,
            "inline-flex items-center px-4 py-1.5 uppercase shadow-sm",
            theme.spacing.inlineGapTight,
            theme.radius.pill,
            theme.colors.borderAccent,
            theme.colors.surfaceAccent,
            theme.typography.tabLabel,
            theme.colors.textAccentStrong,
          )}
        >
          <Activity size={14} />
          {content.badge}
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl text-5xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-7xl">
          {content.title.normal}

          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {" "}
            {content.title.highlight}
          </span>

          {content.title.end}
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
          {content.subtitle}
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
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
