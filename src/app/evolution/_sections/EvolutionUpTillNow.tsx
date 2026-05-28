"use client";

import type { ReactNode } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowDown,
  RefreshCw,
  Sliders,
  Terminal,
  Activity,
} from "lucide-react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

type EvolutionItem = {
  version: string;
  title: string;
  subtitle: string;
  capability: string;
  beforeCode: string[];
  afterCode: string[];
  beforeTooltip: string;
  beforeDiagram: ReactNode;
  afterDiagram: ReactNode;
};

// Precise syntax coloring optimizing depth against the refined background
const highlightCode = (line: string) => {
  return line
    .replace(
      /\b(while|for|in|def|class)\b/g,
      '<span class="text-slate-500 font-semibold">$1</span>',
    )
    .replace(
      /\b(planner|validate_graph|run_agent|get_first_tool|get_next_tool|resolve_params)\b/g,
      '<span class="text-indigo-400 font-medium">$1</span>',
    )
    .replace(/#.*/g, '<span class="text-slate-600 italic">$&</span>')
    .replace(/\/\/.*/g, '<span class="text-slate-600 italic">$&</span>');
};

export default function EvolutionUpTillNow() {
  const { theme } = useTheme();
  const { locale } = useLanguage();

  const evolutionData: EvolutionItem[] = [
    {
      version: "V1",
      title: "Reactive Execution → Planned Orchestration",
      subtitle:
        "Extracting runtime topology and path logic outside of the execution loop path.",
      capability: "Dependency-aware execution planning",
      beforeTooltip:
        "Architectural Bottleneck: Dynamic graph lookups and step resolutions happen concurrently under high throughput, choking worker threads and causing thread pool starvation.",
      beforeCode: [
        "current_tool = get_first_tool(intent)",
        "while current_tool:",
        "    # Dynamic resolution path bound inside execution cycle",
        "    result = current_tool.run(query)",
        "    tool_results.append(result)",
        "    current_tool = get_next_tool(result)",
      ],
      afterCode: [
        "// Graph topology maps are fully resolved BEFORE runtime lifecycle",
        "steps = planner.plan(intent, graph)",
        "",
        "for step in steps:",
        "    params = resolve_params(step)",
        "    result = step.run(**params)",
      ],
      beforeDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-3 flex h-10 items-center justify-center rounded border border-dashed border-slate-700/40 bg-slate-900/10 text-[10px] text-slate-500 italic">
            [ Missing Pre-Flight Domain ]
          </div>
          <div className="rounded border border-slate-700/80 bg-slate-900/20 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              <RefreshCw size={10} className="text-slate-500" /> Runtime Loop
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300">
                Resolve Path
              </span>
              <span className="text-slate-600">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-500">
                Execute
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-1.5 flex w-full items-center justify-center gap-1.5 rounded border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-300 shadow-md shadow-indigo-950/50">
            <Sliders size={11} className="text-indigo-400" /> 1. PLANNER (AOT
            Isolation)
          </div>
          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>
          <div className="rounded border border-slate-700 bg-slate-900/20 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              <RefreshCw size={10} className="text-slate-500" /> Runtime Loop
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-dashed border-slate-800 px-2 py-0.5 text-slate-600 italic">
                [ Static Map ]
              </span>
              <span className="text-slate-600">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400">
                Execute
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      version: "V2",
      title: "Runtime Failure → Pre-Runtime Validation",
      subtitle:
        "Isolating topology health verification away from core calculation execution.",
      capability: "Deterministic upfront structural guarantees",
      beforeTooltip:
        "Architectural Bottleneck: Cyclical logic deadlocks or configuration anomalies trigger 40 minutes deep into execution, causing corrupted transaction states and computing waste.",
      beforeCode: [
        "graph = build_graph(tools)",
        "",
        "// Structural validations are checked implicitly within here",
        "run_agent(query)",
      ],
      afterCode: [
        "graph = build_graph(tools)",
        "// Gatekeeper intercepts and reviews graph health statically",
        "validate_graph(graph)",
        "",
        "run_agent(query)",
      ],
      beforeDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-3 flex h-10 items-center justify-center rounded border border-dashed border-slate-700/40 bg-slate-900/10 text-[10px] text-slate-500 italic">
            [ Missing Evaluation Gates ]
          </div>
          <div className="rounded border border-slate-700 bg-slate-900/20 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Pipeline Lifecycle
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300">
                Validate Rules
              </span>
              <span className="text-slate-600">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-500">
                Compute Run
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-1.5 flex w-full items-center justify-center gap-1.5 rounded border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-300 shadow-md shadow-indigo-950/50">
            <Terminal size={11} className="text-indigo-400" /> 1. VALIDATOR (AOT
            Boundary Gates)
          </div>
          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>
          <div className="rounded border border-slate-700 bg-slate-900/20 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Pipeline Lifecycle
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-dashed border-slate-800 px-2 py-0.5 text-slate-600 italic">
                [ Verified Safe ]
              </span>
              <span className="text-slate-600">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400">
                Compute Run
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      version: "V3",
      title: "Coarse Entities → Operational Primitives",
      subtitle:
        "Decomposing macro objects into granular nodes explicitly typed for runtime routing.",
      capability:
        "Decoupled validation, feature scoring, and strategy branches",
      beforeTooltip:
        "Architectural Bottleneck: Monolithic black boxes combine schema constraints, deep neural feature transforms, and fallback strategies, resulting in regression collisions across teams.",
      beforeCode: [
        "class CampaignEngine:",
        "    def evaluate(self, user):",
        "        # Validation checks, structural scoring metrics, and context",
        "        # fallbacks are tightly intertwined within one module",
        "        pass",
      ],
      afterCode: [
        "// Strictly decoupled and com-posable primitives managed by runtime",
        "class CampaignEligibility(Validator): pass",
        "class CampaignScore(Evaluator): pass",
        "class CouponDecision(DecisionNode): pass",
      ],
      beforeDiagram: (
        <div className="flex h-[130px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-3 flex h-10 items-center justify-center rounded border border-dashed border-slate-700/40 bg-slate-900/10 text-[10px] text-slate-500 italic">
            [ Monolithic Processing Blob ]
          </div>
          <div className="rounded border border-slate-700 bg-slate-900/20 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Compute Layer
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300">
                Mixed Contexts
              </span>
              <span className="text-slate-600">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-500">
                Opaque Execution
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex h-[130px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-1.5 flex w-full items-center justify-center gap-1.5 rounded border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-300 shadow-md shadow-indigo-950/50">
            <Activity size={11} className="text-indigo-400" /> 1. TYPED
            SEPARATION (Primitive Slates)
          </div>
          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>
          <div className="rounded border border-slate-700 bg-slate-900/20 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Compute Layer
            </div>
            <div className="grid grid-cols-3 gap-2 py-0.5 text-center font-mono text-[9px] text-slate-400">
              <div className="rounded border border-slate-700 bg-slate-800 py-0.5">
                Validate
              </div>
              <div className="rounded border border-slate-700 bg-slate-800 py-0.5">
                Score
              </div>
              <div className="rounded border border-slate-700 bg-slate-800 py-0.5">
                Route
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

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
            STAGE 01
          </div>
          <h3
            className={cn(
              theme.typography.cardTitle,
              "mt-1 text-slate-200",
            )}
          >
            Responsibility Boundary & Phase Separation Deep Dive
          </h3>
        </div>

        <div className="relative">
          {/* Vertical Timeline Guide Wire */}
          <div className="absolute top-4 bottom-4 left-[21px] hidden w-px bg-slate-800 md:block" />

          <div className="space-y-16">
            {evolutionData.map((item) => (
              <div
                key={item.version}
                className="relative gap-6 md:grid md:grid-cols-12"
              >
                {/* Visual Timeline Circular Node Tag */}
                <div className="relative hidden md:col-span-1 md:block">
                  <div
                    className={cn(
                      "sticky top-24 flex h-11 w-11 items-center justify-center border border-slate-700 bg-[#0e121a] font-mono text-xs font-bold tracking-tight text-slate-300 shadow-xl",
                      theme.radius.pill,
                    )}
                  >
                    {item.version}
                  </div>
                </div>

                {/* Main Component Card */}
                <div
                  className={cn(
                    "group border border-slate-800/80 bg-gradient-to-b from-[#121721] to-[#0f131b] p-5 shadow-2xl md:col-span-11 lg:p-6",
                    theme.radius.cardSm,
                  )}
                >
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-4 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="text-base font-medium tracking-tight text-slate-200 transition-colors group-hover:text-white">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 font-sans text-xs font-light text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="max-w-sm shrink-0 rounded border border-emerald-500/10 bg-emerald-500/[0.01] px-3 py-1.5 sm:text-right">
                      <div className="flex items-center gap-1 font-mono text-[9px] font-semibold tracking-wider text-emerald-400/80 uppercase sm:justify-end">
                        <CheckCircle2 size={10} /> Operational Metric Added
                      </div>
                      <div className="mt-0.5 font-sans text-xs font-light text-slate-300">
                        {item.capability}
                      </div>
                    </div>
                  </div>

                  {/* Shared Matrix Blackboard Layout */}
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {/* BEFORE Matrix Block */}
                    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-800/80 bg-[#0a0d14]">
                      <div className="flex items-center justify-between border-b border-slate-800 bg-[#111520] px-4 py-2">
                        <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />{" "}
                          BEFORE
                        </span>
                        <span className="font-mono text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                          In-Loop Coupled
                        </span>
                      </div>

                      <div className="flex flex-col gap-5 p-4">
                        <div className="border-b border-slate-800/40 pb-4">
                          {item.beforeDiagram}
                        </div>

                        <div className="min-h-[155px] overflow-y-auto rounded border border-slate-800/40 bg-[#080a10] p-3 font-mono text-xs leading-relaxed">
                          {item.beforeCode.map((line, idx) => {
                            const isProblemAnchor =
                              line.includes("while") ||
                              line.includes("run_agent") ||
                              line.includes("class CampaignEngine");
                            return (
                              <div
                                key={idx}
                                className="group/line relative flex items-center justify-between rounded px-1 py-0.5 hover:bg-slate-900/30"
                              >
                                <div
                                  className="whitespace-pre text-slate-400"
                                  dangerouslySetInnerHTML={{
                                    __html: highlightCode(line) || "&nbsp;",
                                  }}
                                />
                                {isProblemAnchor && (
                                  <div className="relative z-30 ml-2 shrink-0">
                                    <div className="flex h-4 w-4 cursor-help items-center justify-center rounded border border-red-500/20 bg-red-500/10 text-[10px] font-bold text-red-400 shadow-sm transition-all group-hover/line:bg-red-500 group-hover/line:text-white">
                                      !
                                    </div>
                                    <div className="pointer-events-none absolute top-0 right-6 w-64 rounded border border-slate-700 bg-[#141924] p-3 font-sans text-xs leading-relaxed font-normal text-slate-300 opacity-0 shadow-xl transition-opacity duration-150 group-hover/line:opacity-100">
                                      <div className="mb-1.5 flex items-center gap-1 font-mono text-[10px] font-bold text-red-400 uppercase">
                                        <AlertTriangle size={11} /> Production
                                        Hot-Spot
                                      </div>
                                      {item.beforeTooltip}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* AFTER Matrix Block */}
                    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-800/80 bg-[#0a0d14]">
                      <div className="flex items-center justify-between border-b border-slate-800 bg-[#111520] px-4 py-2">
                        <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-indigo-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />{" "}
                          AFTER
                        </span>
                        <span className="font-mono text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                          AOT Decoupled Layer
                        </span>
                      </div>

                      <div className="flex flex-col gap-5 p-4">
                        <div className="border-b border-slate-800/40 pb-4">
                          {item.afterDiagram}
                        </div>

                        <div className="min-h-[155px] overflow-y-auto rounded border border-slate-800/40 bg-[#080a10] p-3 font-mono text-xs leading-relaxed text-slate-400">
                          {item.afterCode.map((line, idx) => (
                            <div
                              key={idx}
                              className="px-1 py-0.5 whitespace-pre"
                              dangerouslySetInnerHTML={{
                                __html: highlightCode(line) || "&nbsp;",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
