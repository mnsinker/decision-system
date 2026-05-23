"use client";

import { Terminal } from "lucide-react";
import { semanticLabel, semanticVisual } from "@/design-system/semanticVisual";
import { cn } from "@/lib/cn";

export default function ChallengeVariant2({ challenge }: { challenge: any }) {
  const cards = challenge.systemCards || [];

  return (
    <div className="relative overflow-hidden bg-slate-900 p-8 text-white md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.03]" />

      <div className="relative z-10">
        <div className="mb-[18px]">
          <div className={semanticVisual.runtimeVoice.moduleLabel}>
            <Terminal size={14} className={semanticVisual.runtimeVoice.moduleIcon} />
            {challenge.systemLabel}
          </div>
        </div>

        <div className="relative h-[252px]">
          <div className="absolute top-4 left-1 z-20 w-[220px] rotate-[-4deg] rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
            <div
              className={cn(
                "mb-3",
                semanticLabel.base,
                semanticLabel.chroma.indigoSoft,
              )}
            >
              {cards[0]?.label}
            </div>

            <div className="space-y-1.5">
              <div className="rounded-xl bg-white/[0.04] px-2.5 py-1.5 text-[11px] leading-snug text-slate-300">
                {cards[0]?.items?.[0]}
              </div>

              <div className="rounded-xl bg-white/[0.04] px-2.5 py-1.5 text-[11px] leading-snug text-slate-300">
                {cards[0]?.items?.[1]}
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-8 z-30 w-[228px] rotate-[3deg] rounded-[1.8rem] border border-indigo-500/30 bg-indigo-500/[0.06] p-4 shadow-[0_0_40px_rgba(99,102,241,0.12)]">
            <div
              className={cn(
                "mb-3",
                semanticLabel.base,
                semanticLabel.chroma.indigoSoft,
              )}
            >
              {cards[1]?.label}
            </div>

            <div className="space-y-1.5">
              <div className="rounded-xl bg-white/[0.04] px-2.5 py-1.5 text-[11px] leading-snug text-slate-300">
                {cards[1]?.items?.[0]}
              </div>

              <div className="rounded-xl bg-white/[0.04] px-2.5 py-1.5 text-[11px] leading-snug text-slate-300">
                {cards[1]?.items?.[1]}
              </div>
            </div>
          </div>

          <div className="absolute top-32 left-[140px] z-40 w-[236px] rotate-[2deg] rounded-[1.8rem] border border-rose-500/20 bg-rose-500/[0.05] p-4">
            <div
              className={cn(
                "mb-3",
                semanticLabel.base,
                semanticLabel.chroma.roseMid,
              )}
            >
              {cards[2]?.label}
            </div>

            <div className="space-y-1.5">
              <div className="rounded-xl bg-white/[0.04] px-2.5 py-1.5 text-[11px] leading-snug text-slate-300">
                {cards[2]?.items?.[0]}
              </div>

              <div className="rounded-xl bg-white/[0.04] px-2.5 py-1.5 text-[11px] leading-snug text-slate-300">
                {cards[2]?.items?.[1]}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <svg className="h-full w-full">
              <line
                x1="34%"
                y1="30%"
                x2="70%"
                y2="20%"
                stroke="rgba(99,102,241,0.22)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />

              <line
                x1="58%"
                y1="38%"
                x2="50%"
                y2="74%"
                stroke="rgba(244,63,94,0.18)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
