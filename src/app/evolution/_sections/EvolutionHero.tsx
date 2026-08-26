"use client";

import { Layers } from "lucide-react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import { evolutionHeroContent } from "@/content/evolution/evolutionHero";

export default function EvolutionHero() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = evolutionHeroContent[locale];

  return (
    <section
      data-locale={locale}
      className="relative overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-[#131924] via-[#0e121a] to-[#0e121a] font-sans text-[#a5b5c5] antialiased selection:bg-indigo-500/30 selection:text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/15 via-transparent to-transparent" />

      <div
        className={cn(
          "mx-auto grid grid-cols-1 items-center lg:grid-cols-12",
          theme.spacing.container,
          theme.spacing.containerGapWide,
          theme.spacing.sectionXComfort,
          theme.spacing.sectionY,
        )}
      >
        <div className="relative z-10 lg:col-span-8">
          <div
            className={cn(
              "mb-6 inline-flex items-center gap-1.5 border border-indigo-500/20 bg-indigo-500/5 px-2.5 py-1 text-indigo-400",
              theme.radius.chipSm,
              theme.typography.monoLabel,
            )}
          >
            <Layers size={11} /> {content.badge}
          </div>
          <h2
            className={cn(
              theme.typography.runtimeNarrative,
              theme.colors.textOnDark,
            )}
          >
            {content.title.line1}
            {locale === "en" && <br />}{" "}
            <span className="bg-gradient-to-r from-slate-200 via-indigo-300 to-indigo-400 bg-clip-text font-bold text-transparent">
              {content.title.highlight}
            </span>
          </h2>
          <p
            className={cn(
              "mt-5 max-w-2xl font-light",
              theme.typography.bodyDark,
            )}
          >
            {content.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
