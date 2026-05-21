"use client";

import { Terminal, GitBranch, ArrowRight } from "lucide-react";
import { semanticVisual } from "@/design-system/semanticVisual";

export default function ChallengeVariant3({ challenge }: { challenge: any }) {
  const nodes = challenge.systemQuestions || [];

  return (
    <div className="relative overflow-hidden bg-slate-900 p-8 text-white md:p-10">
      {/* grid */}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.03]" />

      <div className="relative z-10">
        {/* header */}

        <div className="mb-5">
          <div className={semanticVisual.runtimeVoice.moduleLabel}>
            <Terminal size={14} className={semanticVisual.runtimeVoice.moduleIcon} />

            {challenge.systemLabel}
          </div>
        </div>

        {/* runtime flow */}
        <div className="relative h-[260px]">
          {/* note 1 */}
          <div className="absolute top-6 right-20">
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 shrink-0 rounded-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]" />

              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-3 text-sm text-slate-300">
                {nodes[0]}
              </div>
            </div>
          </div>

          {/* node 2 */}

          <div className="absolute top-[96px] left-2">
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 rounded-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]" />

              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                {nodes[1]}
              </div>
            </div>
          </div>

          {/* node 3 */}

          <div className="absolute top-[140px] left-[210px]">
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 rounded-full bg-indigo-500" />

              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                {nodes[2]}
              </div>
            </div>
          </div>

          {/* lower outcome */}

          {/* note 4 */}

          <div className="absolute right-12 bottom-1">
            <div className="flex items-center gap-4">
              <div className="h-5 w-5 animate-pulse rounded-full bg-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.8)]" />

              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.06] px-4 py-3 text-sm text-slate-300">
                {nodes[3]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
