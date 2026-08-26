"use client";

import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import { evolutionRoadmapContent } from "@/content/evolution/evolutionRoadmap";

export default function EvolutionRoadmap() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = evolutionRoadmapContent[locale];

  return (
    <section
      data-locale={locale}
      className={cn(
        "bg-[#0e121a] font-sans text-[#a5b5c5] antialiased selection:bg-indigo-500/30 selection:text-white",
        theme.spacing.sectionXComfort,
        theme.spacing.sectionYMid,
      )}
    >
      <div className={cn("mx-auto", theme.spacing.container)}>
        <div className="mb-10">
          <div
            className={cn(theme.typography.sectionEyebrow, "text-indigo-400")}
          >
            {content.sectionLabel}
          </div>
          <h3 className={cn(theme.typography.cardTitle, "mt-1 text-slate-200")}>
            {content.title}
          </h3>
        </div>

        <div className="relative grid grid-cols-1 gap-6 font-mono text-[11px] md:grid-cols-4">
          {content.phases.map((phase) => (
            <div
              key={phase.phase}
              className="space-y-2 border-l-2 border-slate-800 p-4 transition-colors hover:border-indigo-500"
            >
              <div className="font-bold tracking-wider text-slate-400 uppercase">
                {phase.phase} {"//"} {phase.title}
              </div>
              <p className="font-sans leading-relaxed font-light text-slate-500">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
