"use client";

import { ShieldAlert } from "lucide-react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

export default function EvolutionConstraints() {
  const { theme } = useTheme();
  const { locale } = useLanguage();

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
            SECTION 02
          </div>
          <h3 className={cn(theme.typography.cardTitle, "mt-1 text-slate-200")}>
            Current Constraints
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 font-mono text-xs md:grid-cols-3">
          <div
            className={cn(
              "space-y-2 border border-slate-800 bg-gradient-to-b from-[#121622] to-transparent p-4",
              theme.radius.cardSm,
            )}
          >
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <ShieldAlert size={14} /> 01 / High-Dimensional Matrix Latency
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-400">
              When processing inputs scaling over 10,000 dimensions of
              heterogeneous states, the AOT Planner architecture experiences
              ~14ms of initialization lookahead overhead, causing micro-jitters
              under extreme cold starts.
            </p>
          </div>

          <div
            className={cn(
              "space-y-2 border border-slate-800 bg-gradient-to-b from-[#121622] to-transparent p-4",
              theme.radius.cardSm,
            )}
          >
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <ShieldAlert size={14} /> 02 / Hot-Swap Graph Lock Contention
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-400">
              Mutating and replacing active DAG execution paths dynamically
              inside V3 engines causes intense cache synchronization spikes.
              Isolation is achieved by routing transient updates into
              memory-mapped shadow subgraphs.
            </p>
          </div>

          <div
            className={cn(
              "space-y-2 border border-slate-800 bg-gradient-to-b from-[#121622] to-transparent p-4",
              theme.radius.cardSm,
            )}
          >
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <ShieldAlert size={14} /> 03 / Multi-Region Synchronization
              Overhead
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-400">
              Distributed edge-mesh deployments suffer from network
              serialization costs when broadcasting state configurations via
              consensus mechanics, preventing linear scaling across globally
              separated server nodes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
