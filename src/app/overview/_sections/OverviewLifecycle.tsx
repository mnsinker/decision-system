"use client";

import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import { overviewLifecycleContent } from "@/content/overview/overviewLifecycle";
import TransitionLine from "@/components/TransitionLine";
import SectionHeader from "@/components/SectionHeader";

export default function OverviewLifecycle() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = overviewLifecycleContent[locale];

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        theme.colors.surfaceDark,
        theme.colors.textOnDark,
        theme.spacing.sectionXComfort,
        theme.spacing.sectionYDark,
      )}
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      <div className={cn("relative mx-auto", theme.spacing.container)}>
        {/* trace line */}
        <TransitionLine text={content.transition} dark />

        {/* narrative */}
        <SectionHeader
          eyebrow={content.sectionLabel}
          title={`${content.title.line1}\n${content.title.line2}`}
          subtitle={content.subtitle}
          align="center"
          dark
          size="xl"
        />

        {/* lifecycle rail */}
        <div className="relative mt-20">
          {/* center line */}
          <div className="absolute top-7 left-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent" />

          <div className="relative grid gap-8 md:grid-cols-4">
            {content.steps.map((step) => (
              <div key={step.num} className="group relative">
                {/* node */}
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0B183D] text-sm font-bold text-indigo-300 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                  {step.num}
                </div>

                {/* card */}
                <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-indigo-300/20 group-hover:bg-white/[0.05]">
                  <div className="text-2xl font-bold text-white">
                    {step.title}
                  </div>

                  <p className="mt-4 leading-relaxed text-slate-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
