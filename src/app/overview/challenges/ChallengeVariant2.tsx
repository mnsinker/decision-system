"use client";

import { Terminal } from "lucide-react";
import { semanticVisual } from "@/design-system/semanticVisual";

export default function ChallengeVariant2({ challenge }: { challenge: any }) {
  const cards = challenge.systemCards || [];

  return (
    <div className="relative overflow-hidden bg-slate-900 p-12 text-white md:p-16">
      {/* grid */}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.03]" />

      <div className="relative z-10">
        {/* header */}

        <div className="mb-10">
          <div className={semanticVisual.runtimeVoice.moduleLabel}>
            <Terminal size={14} className={semanticVisual.runtimeVoice.moduleIcon} />

            {challenge.systemLabel}
          </div>
        </div>

        {/* topology */}

        <div className="relative h-[340px]">
          {/* card 1 */}

          <div className="absolute top-6 left-1 z-20 w-[230px] rotate-[-4deg] rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
            <div className="mb-5 font-mono text-[10px] tracking-[0.2em] text-indigo-400 uppercase">
              {cards[0]?.label}
            </div>

            <div className="space-y-2">
              <div className="rounded-xl bg-white/[0.04] px-3 py-2 text-[12px] text-slate-300">
                {cards[0]?.items?.[0]}
              </div>

              <div className="rounded-xl bg-white/[0.04] px-3 py-2 text-[12px] text-slate-300">
                {cards[0]?.items?.[1]}
              </div>
            </div>
          </div>

          {/* card 2 */}

          <div className="absolute top-0 right-10 z-30 w-[240px] rotate-[3deg] rounded-[1.8rem] border border-indigo-500/30 bg-indigo-500/[0.06] p-5 shadow-[0_0_40px_rgba(99,102,241,0.12)]">
            <div className="mb-5 font-mono text-[10px] tracking-[0.2em] text-indigo-400 uppercase">
              {cards[1]?.label}
            </div>

            <div className="space-y-2">
              <div className="rounded-xl bg-white/[0.04] px-3 py-2 text-[12px] text-slate-300">
                {cards[1]?.items?.[0]}
              </div>

              <div className="rounded-xl bg-white/[0.04] px-3 py-2 text-[12px] text-slate-300">
                {cards[1]?.items?.[1]}
              </div>
            </div>
          </div>

          {/* legacy */}

          <div className="absolute top-44 left-[150px] z-40 w-[250px] rotate-[2deg] rounded-[1.8rem] border border-rose-500/20 bg-rose-500/[0.05] p-5">
            <div className="mb-5 font-mono text-[10px] tracking-[0.2em] text-rose-400 uppercase">
              {cards[2]?.label}
            </div>

            <div className="space-y-2">
              <div className="rounded-xl bg-white/[0.04] px-3 py-2 text-[12px] text-slate-300">
                {cards[2]?.items?.[0]}
              </div>

              <div className="rounded-xl bg-white/[0.04] px-3 py-2 text-[12px] text-slate-300">
                {cards[2]?.items?.[1]}
              </div>
            </div>
          </div>

          {/* lines */}

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
