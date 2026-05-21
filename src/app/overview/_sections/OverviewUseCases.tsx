"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import SectionHeader from "@/components/SectionHeader";
import TransitionLine from "@/components/TransitionLine";
import { systemControlChrome } from "@/design-system/controlChrome";
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
    <section
      className={cn(
        "border-t py-10 pb-16",
        theme.colors.borderPrimary,
        theme.colors.surfacePrimary,
        theme.colors.textSecondary,
        theme.spacing.sectionXComfort,
      )}
    >
      <div className={cn("mx-auto", theme.spacing.container)}>
        <TransitionLine text={content.transition} />

        <div className="mt-4">
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
            subtitle={content.subtitle}
            role="section"
          />
        </div>

        <div
          className={cn(
            "grid lg:grid-cols-3",
            "mt-10",
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
              <div className={cn(theme.spacing.cardPaddingComfort, "pb-6")}>
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

                <h3
                  className={cn(
                    "mt-6",
                    theme.typography.cardTitle,
                    theme.colors.textPrimary,
                  )}
                >
                  {item.title}
                </h3>

                <p className={cn("mt-3", theme.typography.body)}>
                  {item.description}
                </p>
              </div>

              <div
                className={cn(
                  "mx-2 mt-auto mb-2 overflow-hidden",
                  theme.radius.buttonLg,
                  theme.colors.surfaceDarkPanel,
                  theme.spacing.cardPaddingComfort,
                )}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                    <Activity size={12} className="text-indigo-400" />
                    {content.runtimeLabel}
                  </div>

                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </div>

                <div className="space-y-3">
                  {item.steps.map((step, stepIdx) => (
                    <div
                      key={stepIdx}
                      className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.06]"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 font-mono text-[10px] font-bold text-indigo-400">
                        {(stepIdx + 1).toString().padStart(2, "0")}
                      </div>

                      <div className="text-[13px] font-medium text-slate-300">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-4 font-mono text-[10px] text-slate-600">
                  <Terminal size={10} />
                  <span>{content.runtimeFooter}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center">
          <p
            className={cn(
              theme.typography.explainer,
              theme.colors.textMuted,
            )}
          >
            {content.ctaLead}
          </p>

          <Link
            href="/architecture"
            className={cn("group mt-6", systemControlChrome.navPrimary)}
          >
            {content.cta}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
