"use client";

import { Terminal } from "lucide-react";
import { semanticVisual } from "@/design-system/semanticVisual";

export default function ChallengeVariant1({
  challenge,
}: {
  challenge: any;
}) {
  const realityPoints = challenge.systemQuestions || [];

  return (
    <div className="relative bg-slate-900 p-8 md:p-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] opacity-[0.03] [background-size:20px_20px]" />

      <div className="relative z-10">
        <div className="mb-[18px]">
          <div className={semanticVisual.runtimeVoice.moduleLabel}>
            <Terminal size={14} className={semanticVisual.runtimeVoice.moduleIcon} />
            {challenge.systemLabel}
          </div>
        </div>

        <div className="space-y-2">
          {realityPoints.map((point: string, i: number) => (
            <div
              key={i}
              className="group/item flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05]"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-slate-800 font-mono text-[9px] text-slate-500 transition-colors group-hover/item:text-indigo-400">
                {String(i + 1).padStart(2, "0")}
              </div>

              <p className="text-[13px] font-medium leading-[1.45] text-slate-300">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
