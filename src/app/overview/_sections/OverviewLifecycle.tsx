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
        "py-20 md:py-24",
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
        <div className="mt-6">
          <SectionHeader
            eyebrow={content.sectionLabel}
            title={`${content.title.line1}\n${content.title.line2}`}
            subtitle={content.subtitle}
            align="center"
            dark
            role="runtime"
          />
        </div>

        {/* lifecycle rail */}
        <div className="relative mt-10">
          {/* center line */}
          <div className="absolute top-7 left-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent" />

          <div
            className={cn(
              "relative grid md:grid-cols-4",
              theme.spacing.containerGapWide,
            )}
          >
            {content.steps.map((step) => (
              <div key={step.num} className="group relative">
                {/* node */}
                <div
                  className={cn(
                    "relative z-10 mx-auto flex h-14 w-14 items-center justify-center text-sm font-bold shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
                    theme.radius.buttonLg,
                    theme.colors.borderOnDark,
                    theme.colors.surfaceDarkElevated,
                    theme.colors.textAccentSoft,
                  )}
                >
                  {step.num}
                </div>

                {/* card */}
                <div
                  className={cn(
                    "mt-8 border bg-white/[0.03] backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-indigo-300/20 group-hover:bg-white/[0.05]",
                    theme.radius.buttonLg,
                    theme.colors.borderOnDark,
                    theme.spacing.cardPaddingSpacious,
                  )}
                >
                  <div
                    className={cn(
                      theme.typography.cardTitle,
                      "text-white",
                    )}
                  >
                    {step.title}
                  </div>

                  <p
                    className={cn(
                      "mt-4",
                      theme.typography.explainer,
                      theme.colors.textOnDarkMuted,
                    )}
                  >
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
