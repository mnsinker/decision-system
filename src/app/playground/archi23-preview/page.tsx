"use client";

import React from "react";
import {
  ArrowRight,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowDown,
  RefreshCw,
  Gauge,
} from "lucide-react";

type EvolutionItem = {
  version: string;
  title: string;
  subtitle: string;
  capability: string;
  beforeCode: string[];
  afterCode: string[];
  beforeTooltip: string;
  beforeDiagram: React.ReactNode;
  afterDiagram: React.ReactNode;
};

// Structural Syntax Highlighting Helper
const highlightCode = (line: string) => {
  return line
    .replace(
      /\b(while|for|in|def|class)\b/g,
      '<span class="text-indigo-600 font-semibold">$1</span>',
    )
    .replace(
      /\b(planner|validate_graph|run_agent|get_first_tool|get_next_tool|resolve_params)\b/g,
      '<span class="text-amber-600 font-medium">$1</span>',
    )
    .replace(/#.*/g, '<span class="text-slate-400 italic">$&</span>')
    .replace(/\/\/.*/g, '<span class="text-slate-400 italic">$&</span>');
};

export default function EvolutionPage() {
  const evolutionData: EvolutionItem[] = [
    {
      version: "V1",
      title: "Reactive Execution → Planned Orchestration",
      subtitle:
        "Extracting step determination logic outside the loop boundary.",
      capability: "Dependency-aware parallel execution planning",
      beforeTooltip:
        "Instability: Thread locks and dynamic dependency lookups happen concurrently during execution, throttling horizontal scaling.",
      beforeCode: [
        "current_tool = get_first_tool(intent)",
        "while current_tool:",
        "    # Inside execution loop",
        "    result = current_tool.run(query)",
        "    tool_results.append(result)",
        "    current_tool = get_next_tool(result)",
      ],
      afterCode: [
        "// Step structure resolved safely BEFORE runtime",
        "steps = planner.plan(intent, graph)",
        "",
        "for step in steps:",
        "    params = resolve_params(step)",
        "    result = step.run(**params)",
      ],
      beforeDiagram: (
        <div className="flex min-h-[105px] flex-col items-center justify-center rounded-md border border-red-200 bg-red-50 p-3 font-mono text-[11px]">
          <div className="w-full rounded border-2 border-dashed border-red-300 bg-white p-2 text-center">
            <div className="mb-1 flex items-center justify-center gap-1 font-bold text-red-600">
              <RefreshCw size={11} className="animate-spin text-red-400" />{" "}
              WHILE LOOP
            </div>
            <div className="flex justify-center gap-1.5 text-[10px]">
              <span className="rounded bg-slate-100 px-1 py-0.5 text-slate-700">
                1. Resolve Path
              </span>
              <span className="text-slate-400">→</span>
              <span className="rounded bg-red-600 px-1 py-0.5 font-bold text-white">
                2. Execute
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex min-h-[105px] w-full flex-col items-center justify-center rounded-md border border-indigo-100 bg-indigo-50 p-3 font-mono text-[11px]">
          <div className="w-full max-w-[160px] rounded bg-indigo-600 px-3 py-1 text-center font-bold text-white shadow-sm">
            1. PLANNER (AOT)
          </div>
          <div className="my-0.5 text-indigo-400">
            <ArrowDown size={14} />
          </div>
          <div className="w-full max-w-[160px] rounded border border-indigo-200 bg-white p-1 text-center">
            <div className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
              2. FOR LOOP RUNTIME
            </div>
            <span className="mt-0.5 inline-block rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">
              Pure Execute
            </span>
          </div>
        </div>
      ),
    },
    {
      version: "V2",
      title: "Runtime Failure → Pre-Runtime Validation",
      subtitle:
        "Isolating structural sanity validation from actual pipeline compute execution.",
      capability: "Deterministic upfront structural guarantees",
      beforeTooltip:
        "Instability: Structural pipeline faults or cyclical tracking paths trigger deep inside a 45-minute processing workflow, leaving behind corrupted states.",
      beforeCode: [
        "graph = build_graph(tools)",
        "",
        "// Validation logic is embedded implicitly within here",
        "run_agent(query)",
      ],
      afterCode: [
        "graph = build_graph(tools)",
        "// Intercepts and rejects broken pipelines immediately",
        "validate_graph(graph)",
        "",
        "run_agent(query)",
      ],
      beforeDiagram: (
        <div className="flex min-h-[105px] flex-col items-center justify-center rounded-md border border-red-200 bg-red-50 p-3 font-mono text-[11px]">
          <div className="flex w-full items-center justify-center gap-1 rounded border border-slate-200 bg-white p-2 shadow-sm">
            <span className="font-medium text-slate-700">EXECUTION</span>
            <ArrowRight size={10} className="text-slate-400" />
            <span className="flex items-center gap-0.5 rounded border border-red-300 bg-red-100 px-1.5 py-0.5 font-bold text-red-700">
              Crash <AlertTriangle size={10} />
            </span>
          </div>
          <div className="mt-1 text-center font-sans text-[10px] text-red-500 italic">
            Discovered 30 mins late
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex min-h-[105px] w-full flex-col items-center justify-center rounded-md border border-indigo-100 bg-indigo-50 p-3 font-mono text-[11px]">
          <div className="flex w-full items-center justify-center gap-1.5">
            <div className="rounded bg-indigo-600 p-1.5 text-center text-[10px] font-bold text-white shadow-sm">
              VALIDATE TOPO
            </div>
            <ArrowRight size={12} className="text-indigo-400" />
            <div className="rounded border border-indigo-200 bg-white p-1.5 text-center font-medium text-slate-700">
              SAFE RUN
            </div>
          </div>
          <div className="mt-1.5 text-center font-sans text-[10px] font-medium text-indigo-600">
            Zero mid-flight structural drops
          </div>
        </div>
      ),
    },
    {
      version: "V3",
      title: "Coarse Entities → Operational Primitives",
      subtitle:
        "Decomposing giant processing components into explicitly typed runtime nodes.",
      capability:
        "Total separation of validation, scoring, and operational logic",
      beforeTooltip:
        "Instability: A single massive entity handles rule checking, weight scoring, and routing, causing dependency entanglement across business groups.",
      beforeCode: [
        "class CampaignEngine:",
        "    def evaluate(self, user):",
        "        # Validation logic, risk metrics, and evaluation",
        "        # processing bounds live mixed in one entity",
        "        pass",
      ],
      afterCode: [
        "// Strictly segregated and composable primitive boundaries",
        "class CampaignEligibility(Validator): pass",
        "class CampaignScore(Evaluator): pass",
        "class CouponDecision(DecisionNode): pass",
      ],
      beforeDiagram: (
        <div className="flex min-h-[105px] flex-col items-center justify-center rounded-md border border-red-200 bg-red-50 p-3 font-mono text-[11px]">
          <div className="w-full rounded border-2 border-red-300 bg-white p-2 text-center">
            <div className="text-[10px] font-bold tracking-tight text-red-700 uppercase">
              Opaque Monolith
            </div>
            <div className="mt-0.5 font-sans text-[9px] text-slate-400">
              [ Rules ⊗ Score ⊗ Decisions ]
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex min-h-[105px] w-full flex-col items-center justify-center rounded-md border border-indigo-100 bg-indigo-50 p-3 font-mono text-[11px]">
          <div className="grid w-full grid-cols-3 gap-1 text-center text-[9px] font-bold">
            <div className="rounded border border-indigo-200 bg-white p-1 text-indigo-700">
              1. VALIDATE
            </div>
            <div className="rounded border border-indigo-200 bg-white p-1 text-indigo-700">
              2. SCORE
            </div>
            <div className="rounded border border-indigo-200 bg-white p-1 text-indigo-700">
              3. ROUTE
            </div>
          </div>
          <div className="mt-2 text-center font-sans text-[10px] text-indigo-600">
            Granular execution tracking
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Light Clean Minimalist Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded border border-indigo-100 bg-indigo-50 p-2 text-indigo-600">
              <Cpu size={18} />
            </div>
            <div>
              <div className="font-mono text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                Architecture Evolution Diary
              </div>
              <h1 className="text-base font-bold text-slate-900">
                Decision Execution System Design Log
              </h1>
            </div>
          </div>
          <div className="rounded border border-slate-200 bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-500">
            SYSTEM CRITICAL POSTMORTEM // 2026_LOG
          </div>
        </div>
      </header>

      {/* Modern High-Impact Introduction Narrative */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 font-mono text-xs font-semibold text-indigo-600">
              <Layers size={11} /> CORE SYSTEM TRANSFORMATION
            </div>
            <h2 className="text-3xl leading-tight font-light tracking-tight text-slate-900 md:text-4xl">
              Shifting complexity out of the{" "}
              <span className="font-semibold text-indigo-600 underline decoration-indigo-200 decoration-2 underline-offset-4">
                runtime thread lifecycle
              </span>
              .
            </h2>
            <p className="mt-4 text-sm leading-relaxed font-light text-slate-500 md:text-base">
              This review chronicles the intentional breakdown of our monolithic
              pipeline stages. Under high runtime payload pressures, we
              systematically decoupled implicit sequential loop behaviors into
              explicit, testable, and ahead-of-time structured components.
            </p>
          </div>
        </div>
      </section>

      {/* Main Structural Diff Timeline View */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="relative">
          {/* Central Structural Path Indicator Line */}
          <div className="absolute top-4 bottom-4 left-[27px] hidden w-px bg-slate-200 md:block" />

          <div className="space-y-16">
            {evolutionData.map((item) => (
              <div
                key={item.version}
                className="relative gap-6 md:grid md:grid-cols-12"
              >
                {/* Visual Timeline Tag Left Side */}
                <div className="relative hidden md:col-span-1 md:block">
                  <div className="sticky top-24 flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-white font-mono text-sm font-bold tracking-tight text-slate-800 shadow-sm">
                    {item.version}
                  </div>
                </div>

                {/* Evolution Stage Context Block Container */}
                <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm md:col-span-11 lg:p-6">
                  {/* Paradigm Briefing Meta Info */}
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
                    <div>
                      <div className="mb-1.5 inline-block rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600 md:hidden">
                        {item.version} PARADIGM
                      </div>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Architectural Capability Milestone */}
                    <div className="max-w-xs shrink-0 rounded-md border border-emerald-200 bg-emerald-50/50 px-3 py-1.5 sm:text-right">
                      <div className="flex items-center gap-1 font-mono text-[9px] font-bold tracking-wider text-emerald-700 uppercase sm:justify-end">
                        <CheckCircle2 size={11} /> Unlocked Core Benefit
                      </div>
                      <div className="mt-0.5 font-sans text-xs font-medium text-slate-700">
                        {item.capability}
                      </div>
                    </div>
                  </div>

                  {/* Visual Blueprint Split & Code Mapping */}
                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {/* BEFORE: Coupled Operational Logic Block */}
                    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/70 px-3 py-2">
                        <span className="flex items-center gap-1 font-mono text-xs font-bold text-red-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />{" "}
                          BEFORE
                        </span>
                        <span className="font-mono text-[9px] font-semibold text-slate-400 uppercase">
                          Implicit Loop Dependency
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col justify-between space-y-4 p-3">
                        {/* Instant Structural Sequence Sketch */}
                        {item.beforeDiagram}

                        {/* Code Implementation Box */}
                        <div className="rounded-md border border-slate-200 bg-white p-3">
                          <div className="space-y-1 font-mono text-xs leading-relaxed">
                            {item.beforeCode.map((line, idx) => {
                              const isProblemLine =
                                line.includes("while") ||
                                line.includes("run_agent") ||
                                line.includes("class CampaignEngine");
                              return (
                                <div
                                  key={idx}
                                  className="group relative flex items-center justify-between rounded px-1 py-0.5 hover:bg-slate-50"
                                >
                                  <div
                                    className="overflow-x-auto text-slate-600"
                                    dangerouslySetInnerHTML={{
                                      __html: highlightCode(line) || "&nbsp;",
                                    }}
                                  />
                                  {isProblemLine && (
                                    <div className="relative z-30 ml-2 shrink-0">
                                      <div className="flex h-4 w-4 cursor-help items-center justify-center rounded border border-red-300 bg-red-100 text-[10px] font-black text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                                        !
                                      </div>
                                      <div className="pointer-events-none absolute top-0 right-6 w-64 rounded border border-slate-200 bg-white p-3 font-sans text-xs leading-relaxed font-normal text-slate-600 opacity-0 shadow-xl transition-all duration-150 group-hover:opacity-100">
                                        <div className="mb-1 flex items-center gap-1 font-mono text-[10px] font-bold text-red-600 uppercase">
                                          <AlertTriangle size={11} /> Runtime
                                          Failure Trigger
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
                    </div>

                    {/* AFTER: Extracted Clean Boundary Block */}
                    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/70 px-3 py-2">
                        <span className="flex items-center gap-1 font-mono text-xs font-bold text-indigo-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />{" "}
                          AFTER
                        </span>
                        <span className="font-mono text-[9px] font-semibold text-slate-400 uppercase">
                          Extracted Isolation Boundaries
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col justify-between space-y-4 p-3">
                        {/* Instant Structural Sequence Sketch */}
                        {item.afterDiagram}

                        {/* Code Implementation Box */}
                        <div className="rounded-md border border-slate-200 bg-white p-3">
                          <div className="space-y-1 font-mono text-xs leading-relaxed text-slate-600">
                            {item.afterCode.map((line, idx) => (
                              <div
                                key={idx}
                                className="px-1 py-0.5"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Footer Core Paradigm Summary */}
      <footer className="mt-8 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row">
          <div className="max-w-lg">
            <div className="mb-2 flex items-center gap-1.5 font-mono text-xs font-bold text-indigo-600 uppercase">
              <Gauge size={13} /> Architectural Postulate
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              System health stays predictable when computing environments move
              away from live run-time heuristic discovery. Explicit separation
              of planning pipelines creates clean system footprints capable of
              enduring unpredictable production spikes.
            </p>
          </div>
          <div className="self-end text-right font-mono text-[10px] text-slate-400">
            Internal Systems Schema Portfolio // 2026.5
          </div>
        </div>
      </footer>
    </div>
  );
}
