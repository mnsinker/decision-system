"use client";

import {
  GitBranch,
  ShieldAlert,
  FlaskConical,
  ClipboardCheck,
  Flame,
} from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type ViewMode = "code" | "graph";

function ExplanationCard({
  viewMode,
  label,
  description,
  engineeringTitle,
  consequences,
}: {
  viewMode: ViewMode;
  label?: string;
  description?: string;

  engineeringTitle?: string;

  consequences?: {
    title: string;
    msg: string;
  }[];
}) {
  const isCode = viewMode === "code";

  return (
    <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 shadow-2xs transition-all duration-200">
      {isCode ? (
        <div className="grid grid-cols-[20px_1fr] gap-2.5">
          <ShieldAlert size={16} className="mt-0.5 text-amber-500" />
          <div>
            <div className="mb-1 font-mono text-[10px] font-bold tracking-widest text-amber-600 uppercase">
              {label || "Root Cause (Procedural Coupling)"}
            </div>
            <p className="text-xs leading-relaxed font-medium text-slate-600">
              {description ||
                "Dependency graph only exists implicitly in code."}
            </p>
          </div>
        </div>
      ) : (
        <div>
          {/* title */}
          <div className="mb-5 flex items-center gap-2">
            <GitBranch size={15} className="text-amber-500" />
            <div className="font-mono text-[10px] font-bold tracking-[0.25em] text-amber-600 uppercase">
              {engineeringTitle || "Engineering Consequences"}
            </div>
          </div>

          {/* compact pills container */}
          <div className="flex gap-3">
            {/* pill 1 */}
            <HoverCard openDelay={80} closeDelay={60}>
              <HoverCardTrigger asChild>
                <div className="group cursor-pointer rounded-xl border border-slate-200 bg-white/80 px-4 py-3 transition-all hover:border-rose-200 hover:bg-white hover:shadow-sm">
                  <div className="flex items-center gap-2">
                    <FlaskConical
                      size={14}
                      className="text-rose-500 transition-transform group-hover:scale-110"
                    />
                    <div className="font-mono text-[10px] font-bold tracking-wider text-slate-700 uppercase">
                      {consequences?.[0]?.title || "Hard to Test"}
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                side="top"
                className="w-[200px] border border-slate-200 bg-white text-slate-700 shadow-xl"
              >
                <p className="text-xs leading-5 text-slate-600">
                  {consequences?.[0]?.msg ||
                    "Tests must reason about full runtime order instead of isolated dependency edges."}
                </p>
              </HoverCardContent>
            </HoverCard>

            {/* pill 2 */}
            <HoverCard openDelay={80} closeDelay={60}>
              <HoverCardTrigger asChild>
                <div className="group cursor-pointer rounded-xl border border-slate-200 bg-white/80 px-4 py-3 transition-all hover:border-rose-200 hover:bg-white hover:shadow-2xs">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck
                      size={14}
                      className="text-rose-500 transition-transform group-hover:scale-110"
                    />
                    <div className="font-mono text-[10px] font-bold tracking-wider text-slate-700 uppercase">
                      {consequences?.[1]?.title || "Hard to Audit"}
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                side="top"
                className="w-[240px] border border-slate-200 bg-white text-slate-700 shadow-xl"
              >
                <p className="text-xs leading-5 text-slate-600">
                  {consequences?.[1]?.msg ||
                    "Execution paths must be reconstructed from procedural flow instead of explicit dependency contracts."}
                </p>
              </HoverCardContent>
            </HoverCard>

            {/* pill 3 */}
            <HoverCard openDelay={80} closeDelay={60}>
              <HoverCardTrigger asChild>
                <div className="group cursor-pointer rounded-xl border border-slate-200 bg-white/80 px-4 py-3 transition-all hover:border-rose-200 hover:bg-white hover:shadow-2xs">
                  <div className="flex items-center gap-2">
                    <Flame
                      size={14}
                      className="text-rose-500 transition-transform group-hover:scale-110"
                    />
                    <div className="font-mono text-[10px] font-bold tracking-wider text-slate-700 uppercase">
                      {consequences?.[2]?.title || "High Blast Radius"}
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                side="top"
                className="w-[240px] border border-slate-200 bg-white text-slate-700 shadow-xl"
              >
                <p className="text-xs leading-5 text-slate-600">
                  {consequences?.[2]?.msg ||
                    "Small dependency changes silently rewrite downstream orchestration behavior."}
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExplanationCard;
