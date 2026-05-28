"use client";

import { Layers } from "lucide-react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

export default function EvolutionHero() {
  const { theme } = useTheme();
  const { locale } = useLanguage();

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
            <Layers size={11} /> ARCHITECTURE EVOLUTION
          </div>
          <h2
            className={cn(
              theme.typography.runtimeNarrative,
              theme.colors.textOnDark,
            )}
          >
            Transforming Core Loops into <br />
            <span className="bg-gradient-to-r from-slate-200 via-indigo-300 to-indigo-400 bg-clip-text font-bold text-transparent">
              AOT Static Phased Topologies
            </span>
          </h2>
          <p
            className={cn(
              "mt-5 max-w-2xl font-light",
              theme.typography.bodyDark,
            )}
          >
            Each critical architectural paradigm was driven directly by runtime
            survival under pressure. By leveraging clean spatial alignments,
            this log displays how execution workloads were decoupled out of
            dynamic multi-agent feedback loops and into predictable,
            non-blocking ahead-of-time (AOT) stages.
          </p>
        </div>

        <div
          className={cn(
            "space-y-3 border border-slate-800 bg-[#121722]/80 p-4 font-mono text-[11px] text-slate-400 shadow-2xl lg:col-span-4",
            theme.radius.cardSm,
          )}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-slate-500">
            <span>[ ENGINE_LIVE_METRICS ]</span>
            <span className="rounded bg-emerald-500/10 px-1.5 text-[9px] text-emerald-400">
              ACTIVE
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="block text-slate-600">CONCURRENCY_CAP</span>
              <span className="text-xs font-bold text-slate-200">
                52,400 / s
              </span>
            </div>
            <div>
              <span className="block text-slate-600">COMPUTE_WASTE</span>
              <span className="text-xs font-bold text-emerald-400">
                -82.4%
              </span>
            </div>
            <div>
              <span className="block text-slate-600">SLOT_STATUS</span>
              <span className="text-xs font-semibold text-slate-200">
                COMPRESSED
              </span>
            </div>
            <div>
              <span className="block text-slate-600">AOT_PASSED_RATE</span>
              <span className="text-xs font-bold text-indigo-400">100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
