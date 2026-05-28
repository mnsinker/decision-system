"use client";

import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

export default function EvolutionRoadmap() {
  const { theme } = useTheme();
  const { locale } = useLanguage();

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
            STAGE 03
          </div>
          <h3
            className={cn(
              theme.typography.cardTitle,
              "mt-1 text-slate-200",
            )}
          >
            Next Horizon: Distributed Elastic Mesh Blueprint
          </h3>
        </div>

        <div className="relative grid grid-cols-1 gap-6 font-mono text-[11px] md:grid-cols-4">
          <div className="space-y-2 border-l-2 border-slate-800 p-4 transition-colors hover:border-indigo-500">
            <div className="font-bold tracking-wider text-slate-400 uppercase">
              Phase I // Graph Sharding
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-500">
              Decentralizing the AOT Planner architecture across localized
              cluster grids, allowing decoupled partitions to resolve structural
              pipelines autonomously and omitting central coordinator
              bottlenecks.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-slate-800 p-4 transition-colors hover:border-indigo-500">
            <div className="font-bold tracking-wider text-slate-400 uppercase">
              Phase II // Wasm Sandbox runtimes
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-500">
              Porting primitive computational operational rules into WebAssembly
              contexts, facilitating isolated microsecond runtime computations
              securely on heterogeneous host infrastructures.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-slate-800 p-4 transition-colors hover:border-indigo-500">
            <div className="font-bold tracking-wider text-slate-400 uppercase">
              Phase III // Mirror Topology Sweeps
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-500">
              Architecting transactional split-stream routes to dynamically test
              shadow execution paths alongside production instances without
              adding cold overhead states to operational lanes.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-slate-800 p-4 transition-colors hover:border-indigo-500">
            <div className="font-bold tracking-wider text-slate-400 uppercase">
              Phase IV // Auto-Refactoring Topologies
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-500">
              Utilizing live orchestration tracers to autonomously monitor
              processing node networks and automatically re-link execution DAG
              steps to continuously prune infrastructure latency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
