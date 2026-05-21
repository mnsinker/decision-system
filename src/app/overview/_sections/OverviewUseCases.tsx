"use client";
import React from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import SectionHeader from "@/components/SectionHeader";
import { overviewUseCasesContent } from "@/content/overview/overviewUsecases";
import {
  ArrowRight,
  SearchCode,
  GitBranch,
  LucideShoppingBag,
  Terminal,
  Activity,
} from "lucide-react";

export default function OverviewUseCases() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = overviewUseCasesContent[locale];
  const useCases = content.cards;
  const icons = [
    <SearchCode size={20} className="text-indigo-600" />,
    <GitBranch size={20} className="text-indigo-600" />,
    <LucideShoppingBag size={20} className="text-indigo-600" />,
  ];

  return (
    <div
      className={cn(
        "min-h-screen py-16",
        theme.colors.surfacePrimary,
        theme.colors.textSecondary,
        theme.spacing.sectionXComfort,
      )}
    >
      {/* subtle grid */}

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className={cn("mx-auto", theme.spacing.container)}>
        {/* header */}

        <SectionHeader
          eyebrow={content.sectionLabel}
          title={`${content.title.line1}\n${content.title.line2}`}
          highlight={content.title.line2}
          highlightClassName="
              bg-gradient-to-r
              from-indigo-500
              via-violet-500
              to-blue-500
              bg-clip-text
              text-transparent
              "
          role="section"
        />

        {/* cards */}

        <div
          className={cn(
            "grid lg:grid-cols-3",
            theme.spacing.narrativeSectionContent,
            theme.spacing.containerGap,
          )}
        >
          {useCases.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "group flex flex-col border transition-shadow duration-200 hover:shadow-md",
                theme.radius.shell,
                theme.colors.borderPrimary,
                theme.colors.surfacePrimary,
                theme.shadows.sm,
              )}
            >
              {/* top white surface */}

              <div className={cn(theme.spacing.cardPaddingComfort, "pb-6")}>
                {/* top row */}

                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      theme.typography.moduleLabel,
                      "text-slate-400",
                    )}
                  >
                    {item.label}
                  </span>

                  <div
                    className={cn(
                      "p-2",
                      theme.radius.icon,
                      theme.colors.borderMuted,
                      theme.colors.surfaceInset,
                      theme.colors.textAccentStrong,
                    )}
                  >
                    {icons[idx]}
                  </div>
                </div>

                {/* title */}

                <h3
                  className={cn(
                    "mt-6",
                    theme.typography.cardTitle,
                    theme.colors.textPrimary,
                  )}
                >
                  {item.title}
                </h3>

                {/* desc */}

                <p className={cn("mt-3", theme.typography.body)}>
                  {item.description}
                </p>
              </div>

              {/* runtime strip */}

              <div
                className={cn(
                  "mx-2 mt-auto mb-2 overflow-hidden",
                  theme.radius.buttonLg,
                  theme.colors.surfaceDarkPanel,
                  theme.spacing.cardPaddingComfort,
                )}
              >
                {/* runtime top */}

                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                    <Activity size={12} className="text-indigo-400" />
                    Runtime_Trace
                  </div>

                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </div>

                {/* steps */}

                <div className="space-y-3">
                  {item.steps.map((step, stepIdx) => (
                    <div
                      key={stepIdx}
                      className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.06]"
                    >
                      {/* node */}

                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 font-mono text-[10px] font-bold text-indigo-400">
                        {(stepIdx + 1).toString().padStart(2, "0")}
                      </div>

                      {/* text */}

                      <div className="text-[13px] font-medium text-slate-300">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>

                {/* footer */}

                <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-4 font-mono text-[10px] text-slate-600">
                  <Terminal size={10} />

                  <span>&gt; decision_flow --executed</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}

        <div className="mt-1 flex flex-col items-center">
          <div className="mb-8 h-14 w-px bg-gradient-to-b from-slate-200 to-transparent" />

          <button
            className={cn(
              "group flex items-center transition-colors hover:bg-indigo-600",
              theme.spacing.inlineGap,
              theme.radius.buttonLg,
              theme.spacing.buttonPadding,
              theme.typography.button,
              theme.colors.interactivePrimary,
              theme.shadows.buttonPrimaryHover,
            )}
          >
            Explore in Architecture
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <div
            className={cn(
              "mt-8 flex items-center",
              theme.spacing.inlineGapTight,
            )}
          >
            <span
              className={cn(
                "h-1 w-1 rounded-full",
                theme.colors.textAccent,
              )}
            />

            <span
              className={cn(theme.typography.moduleLabel, "text-slate-400")}
            >
              Formalized Logic & Auditability
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
