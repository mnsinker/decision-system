"use client";

import { ShieldAlert } from "lucide-react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import { evolutionConstraintsContent } from "@/content/evolution/evolutionConstraints";

export default function EvolutionConstraints() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = evolutionConstraintsContent[locale];

  return (
    <section
      data-locale={locale}
      className={cn(
        "border-b border-slate-800/60 bg-[#0e121a] font-sans text-[#a5b5c5] antialiased selection:bg-indigo-500/30 selection:text-white",
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

        <div className="grid grid-cols-1 gap-6 font-mono text-xs md:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "space-y-2 border border-slate-800 bg-gradient-to-b from-[#121622] to-transparent p-4",
                theme.radius.cardSm,
              )}
            >
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <ShieldAlert size={14} /> {item.id} / {item.title}
              </div>
              <p className="font-sans leading-relaxed font-light text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
