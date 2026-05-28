"use client";

import React from "react";
import {
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowDown,
  RefreshCw,
  Sliders,
  Terminal,
  Activity,
  Gauge,
  Zap,
  ShieldAlert,
  Compass,
  Boxes,
  GitBranch,
  Orbit,
  Workflow,
  Info,
  Layers,
} from "lucide-react";

type EvolutionItem = {
  version: string;
  title: string;
  subtitle: string;

  capability: string;
  capabilityTooltip: string;
  capabilityCodeAnchor?: string;

  beforeCode: string[];
  afterCode: string[];

  beforeTooltip: string;

  beforeDiagram: React.ReactNode;
  afterDiagram: React.ReactNode;
};

const highlightCode = (line: string) => {
  return line
    .replace(
      /\b(while|for|in|class|def)\b/g,
      '<span class="text-violet-400 font-medium">$1</span>',
    )
    .replace(
      /\b(planner|validate_graph|resolve_params|run_agent|get_next_tool|get_first_tool)\b/g,
      '<span class="text-sky-400">$1</span>',
    )
    .replace(
      /\b(result|steps|graph|params|tool_results)\b/g,
      '<span class="text-slate-200">$1</span>',
    )
    .replace(/#.*/g, '<span class="text-slate-600 italic">$&</span>')
    .replace(/\/\/.*/g, '<span class="text-slate-600 italic">$&</span>');
};

export default function EvolutionPage() {
  const evolutionData: EvolutionItem[] = [
    {
      version: "V1",

      title: "Reactive Execution → Planned Orchestration",

      subtitle:
        "Execution planning was extracted from the runtime loop into a dedicated planning phase.",

      capability: "Dependency-aware execution planning",

      capabilityTooltip:
        "The system gained deterministic execution ordering before runtime execution begins.",

      beforeTooltip:
        "Dependency resolution and execution routing were happening inside the runtime loop, making execution order unstable and difficult to validate.",

      beforeCode: [
        "current_tool = get_first_tool(intent)",
        "",
        "while current_tool:",
        "    result = current_tool.run(query)",
        "    tool_results.append(result)",
        "    current_tool = get_next_tool(result)",
      ],

      afterCode: [
        "steps = planner.plan(intent, graph)",
        "",
        "for step in steps:",
        "    params = resolve_params(step)",
        "    result = step.run(**params)",
      ],

      beforeDiagram: (
        <div className="flex h-[120px] flex-col justify-end">
          <div className="mb-3 flex items-center justify-center rounded-md border border-dashed border-slate-700/70 bg-slate-950/40 py-2 text-[10px] text-slate-600 italic">
            [ no planning layer ]
          </div>

          <div className="rounded-xl border border-slate-700 bg-[#10161F] p-3">
            <div className="mb-2 flex items-center gap-2 text-[10px] tracking-[0.18em] text-slate-500 uppercase">
              <RefreshCw size={10} />
              Runtime Loop
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <div className="rounded-md border border-amber-500/20 bg-amber-500/[0.05] px-2 py-1 text-amber-300">
                resolve path
              </div>

              <span className="text-slate-700">→</span>

              <div className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-slate-300">
                execute
              </div>
            </div>
          </div>
        </div>
      ),

      afterDiagram: (
        <div className="flex h-[120px] flex-col justify-end">
          <div className="mb-2 rounded-xl border border-sky-500/20 bg-sky-500/[0.05] p-2">
            <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-sky-300">
              <Sliders size={11} />
              planner
            </div>
          </div>

          <div className="mb-2 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>

          <div className="rounded-xl border border-slate-700 bg-[#10161F] p-3">
            <div className="mb-2 flex items-center gap-2 text-[10px] tracking-[0.18em] text-slate-500 uppercase">
              <RefreshCw size={10} />
              Runtime Loop
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <div className="rounded-md border border-dashed border-slate-700 px-2 py-1 text-slate-600 italic">
                path resolved
              </div>

              <span className="text-slate-700">→</span>

              <div className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-slate-300">
                execute
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      version: "V2",

      title: "Runtime Failure → Pre-runtime Validation",

      subtitle:
        "Graph validation was moved from runtime execution into a dedicated pre-runtime verification phase.",

      capability: "Deterministic graph verification",

      capabilityTooltip:
        "Broken dependency graphs and circular references can now be detected before runtime execution starts.",

      capabilityCodeAnchor: "validate_graph",

      beforeTooltip:
        "Dependency cycles and broken graph states could only be discovered during runtime execution.",

      beforeCode: ["graph = build_graph(tools)", "", "run_agent(query)"],

      afterCode: [
        "graph = build_graph(tools)",
        "validate_graph(graph)",
        "",
        "run_agent(query)",
      ],

      beforeDiagram: (
        <div className="flex h-[120px] flex-col justify-end">
          <div className="mb-3 flex items-center justify-center rounded-md border border-dashed border-slate-700/70 bg-slate-950/40 py-2 text-[10px] text-slate-600 italic">
            [ no validation layer ]
          </div>

          <div className="rounded-xl border border-slate-700 bg-[#10161F] p-3">
            <div className="mb-2 text-[10px] tracking-[0.18em] text-slate-500 uppercase">
              Execution Lifecycle
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <div className="rounded-md border border-amber-500/20 bg-amber-500/[0.05] px-2 py-1 text-amber-300">
                runtime validation
              </div>

              <span className="text-slate-700">→</span>

              <div className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-slate-300">
                execution
              </div>
            </div>
          </div>
        </div>
      ),

      afterDiagram: (
        <div className="flex h-[120px] flex-col justify-end">
          <div className="mb-2 rounded-xl border border-sky-500/20 bg-sky-500/[0.05] p-2">
            <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-sky-300">
              <Terminal size={11} />
              validator
            </div>
          </div>

          <div className="mb-2 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>

          <div className="rounded-xl border border-slate-700 bg-[#10161F] p-3">
            <div className="mb-2 text-[10px] tracking-[0.18em] text-slate-500 uppercase">
              Execution Lifecycle
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <div className="rounded-md border border-dashed border-slate-700 px-2 py-1 text-slate-600 italic">
                graph verified
              </div>

              <span className="text-slate-700">→</span>

              <div className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-slate-300">
                execution
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      version: "V3",

      title: "Coarse Entities → Operational Primitives",

      subtitle:
        "Large mixed runtime entities were separated into operationally isolated runtime nodes.",

      capability: "Policy / scoring / routing separation",

      capabilityTooltip:
        "The system gained isolated policy, scoring, and decision layers with independently composable runtime nodes.",

      beforeTooltip:
        "A single runtime entity was responsible for eligibility, scoring, and routing simultaneously, making iteration difficult across teams.",

      beforeCode: [
        "class CampaignEngine:",
        "    def evaluate(self, user):",
        "        # eligibility + scoring + routing",
        "        pass",
      ],

      afterCode: [
        "class CampaignEligibility(Validator): pass",
        "class CampaignScore(Evaluator): pass",
        "class CouponDecision(DecisionNode): pass",
      ],

      beforeDiagram: (
        <div className="flex h-[130px] flex-col justify-end">
          <div className="mb-3 flex items-center justify-center rounded-md border border-dashed border-slate-700/70 bg-slate-950/40 py-2 text-[10px] text-slate-600 italic">
            [ mixed runtime boundary ]
          </div>

          <div className="rounded-xl border border-slate-700 bg-[#10161F] p-3">
            <div className="mb-2 text-[10px] tracking-[0.18em] text-slate-500 uppercase">
              Compute Layer
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <div className="rounded-md border border-amber-500/20 bg-amber-500/[0.05] px-2 py-1 text-amber-300">
                mixed logic
              </div>

              <span className="text-slate-700">→</span>

              <div className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-slate-300">
                opaque execution
              </div>
            </div>
          </div>
        </div>
      ),

      afterDiagram: (
        <div className="flex h-[130px] flex-col justify-end">
          <div className="mb-2 rounded-xl border border-sky-500/20 bg-sky-500/[0.05] p-2">
            <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-sky-300">
              <Activity size={11} />
              typed separation
            </div>
          </div>

          <div className="mb-2 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>

          <div className="rounded-xl border border-slate-700 bg-[#10161F] p-3">
            <div className="mb-2 text-[10px] tracking-[0.18em] text-slate-500 uppercase">
              Compute Layer
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="rounded-md border border-slate-700 bg-slate-800 py-1 text-slate-300">
                eligibility
              </div>

              <div className="rounded-md border border-slate-700 bg-slate-800 py-1 text-slate-300">
                scoring
              </div>

              <div className="rounded-md border border-slate-700 bg-slate-800 py-1 text-slate-300">
                routing
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1318] text-slate-300 antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0F1318]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-700 bg-[#151B23] p-2 text-slate-300">
              <Cpu size={15} />
            </div>

            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                Architecture Evolution
              </div>

              <div className="text-sm font-medium text-slate-100">
                AI Decision System
              </div>
            </div>
          </div>

          <div className="font-mono text-[11px] text-slate-500">
            REV // 3.4.1
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-[#161E28] to-[#0F1318]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/[0.05] px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-sky-300 uppercase">
              <Layers size={11} />
              Evolution Review
            </div>

            <h1 className="text-4xl leading-tight font-semibold tracking-tight text-white md:text-6xl">
              Runtime complexity forced the system
              <br />
              to continuously redefine
              <span className="block bg-gradient-to-r from-slate-100 to-sky-300 bg-clip-text text-transparent">
                execution boundaries.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-[15px] leading-8 text-slate-400">
              Each architectural shift emerged because the previous runtime
              model became insufficient under increasing orchestration pressure.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="mx-auto max-w-6xl border-b border-slate-800 px-6 py-20">
        <div className="mb-12">
          <div className="font-mono text-[11px] tracking-[0.2em] text-sky-300 uppercase">
            Stage 01
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">
            Runtime Responsibility Separation
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-6 bottom-6 left-[20px] hidden w-px bg-slate-700 md:block" />

          <div className="space-y-20">
            {evolutionData.map((item) => (
              <div
                key={item.version}
                className="relative gap-6 md:grid md:grid-cols-12"
              >
                {/* version */}
                <div className="hidden md:col-span-1 md:block">
                  <div className="sticky top-24 flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-[#0F1318] font-mono text-xs text-slate-200">
                    {item.version}
                  </div>
                </div>

                {/* content */}
                <div className="rounded-2xl border border-slate-700 bg-[#151B23] p-6 md:col-span-11">
                  {/* top */}
                  <div className="flex flex-col justify-between gap-5 border-b border-slate-700 pb-5 lg:flex-row">
                    <div>
                      <h3 className="text-[24px] font-semibold tracking-tight text-slate-100">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-3xl text-[14px] leading-7 text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* capability */}
                    <div className="group relative max-w-sm rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] px-4 py-3">
                      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-emerald-400 uppercase">
                        <CheckCircle2 size={11} />
                        New Capability
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[13px] text-slate-100">
                        {item.capability}

                        {!item.capabilityCodeAnchor && (
                          <div className="relative">
                            <div className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-300">
                              <Info size={10} />
                            </div>

                            <div className="pointer-events-none absolute top-0 right-6 z-30 w-64 rounded-xl border border-slate-700 bg-[#1C2430] p-3 text-[11px] leading-5 text-slate-300 opacity-0 shadow-2xl transition-opacity duration-150 group-hover:opacity-100">
                              {item.capabilityTooltip}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* before after */}
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {/* BEFORE */}
                    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#0C1015]">
                      <div className="flex items-center justify-between border-b border-slate-700 bg-[#10161F] px-4 py-3">
                        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-slate-400 uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                          Before
                        </div>

                        <div className="text-[10px] text-slate-600 uppercase">
                          Coupled Runtime
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="pb-4">{item.beforeDiagram}</div>

                        <div className="mt-4 min-h-[150px] rounded-xl border border-slate-800 bg-black/10 p-3 font-mono text-[12px] leading-6">
                          {item.beforeCode.map((line, idx) => {
                            const isAnchor =
                              line.includes("while") ||
                              line.includes("run_agent") ||
                              line.includes("CampaignEngine");

                            return (
                              <div
                                key={idx}
                                className="group relative flex items-center justify-between rounded px-1 py-0.5 hover:bg-slate-800/30"
                              >
                                <div
                                  className="whitespace-pre text-slate-400"
                                  dangerouslySetInnerHTML={{
                                    __html: highlightCode(line) || "&nbsp;",
                                  }}
                                />

                                {isAnchor && (
                                  <div className="relative ml-2">
                                    <div className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-red-500/20 bg-red-500/[0.08] text-[10px] text-red-400">
                                      !
                                    </div>

                                    <div className="pointer-events-none absolute top-0 right-6 z-30 w-64 rounded-xl border border-slate-700 bg-[#1C2430] p-3 text-[11px] leading-5 text-slate-300 opacity-0 shadow-2xl transition-opacity duration-150 group-hover:opacity-100">
                                      <div className="mb-2 flex items-center gap-1 font-mono text-[10px] text-red-400 uppercase">
                                        <AlertTriangle size={11} />
                                        Runtime Pressure
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

                    {/* AFTER */}
                    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#131A22]">
                      <div className="flex items-center justify-between border-b border-slate-700 bg-[#17202B] px-4 py-3">
                        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-sky-300 uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                          After
                        </div>

                        <div className="text-[10px] text-slate-600 uppercase">
                          Structured Runtime
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="pb-4">{item.afterDiagram}</div>

                        <div className="mt-4 min-h-[150px] rounded-xl border border-slate-700 bg-black/10 p-3 font-mono text-[12px] leading-6">
                          {item.afterCode.map((line, idx) => {
                            const showsCapabilityTooltip =
                              item.capabilityCodeAnchor &&
                              line.includes(item.capabilityCodeAnchor);

                            return (
                              <div
                                key={idx}
                                className="group relative flex items-center justify-between rounded px-1 py-0.5 hover:bg-slate-800/30"
                              >
                                <div
                                  className="whitespace-pre text-slate-300"
                                  dangerouslySetInnerHTML={{
                                    __html: highlightCode(line) || "&nbsp;",
                                  }}
                                />

                                {showsCapabilityTooltip && (
                                  <div className="relative ml-2">
                                    <div className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-300">
                                      <Info size={10} />
                                    </div>

                                    <div className="pointer-events-none absolute top-0 right-6 z-30 w-64 rounded-xl border border-slate-700 bg-[#1C2430] p-3 text-[11px] leading-5 text-slate-300 opacity-0 shadow-2xl transition-opacity duration-150 group-hover:opacity-100">
                                      {item.capabilityTooltip}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="mx-auto max-w-6xl border-b border-slate-800 px-6 py-20">
        <div className="mb-12">
          <div className="font-mono text-[11px] tracking-[0.2em] text-sky-300 uppercase">
            Stage 02
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">
            Current Scope & Limitations
          </h2>

          <p className="mt-3 max-w-3xl text-[15px] leading-8 text-slate-500">
            The current architecture is intentionally optimized for
            deterministic orchestration and explainable runtime behavior, but
            several scaling boundaries still remain.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Graph Scale",
              icon: Boxes,
              desc: "Large dependency graphs still introduce cold-start planning overhead during graph initialization.",
            },

            {
              title: "Dynamic Graph Mutation",
              icon: GitBranch,
              desc: "Hot-swapping runtime topology during execution still requires controlled graph synchronization.",
            },

            {
              title: "Distributed Synchronization",
              icon: Orbit,
              desc: "Cross-region execution graphs still depend on expensive coordination mechanisms.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-700 bg-[#151B23] p-5"
            >
              <div className="mb-4 flex items-center gap-2 text-amber-300">
                <item.icon size={15} />
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase">
                  {item.title}
                </div>
              </div>

              <p className="text-[14px] leading-7 text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
          <div className="font-mono text-[11px] tracking-[0.2em] text-sky-300 uppercase">
            Stage 03
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">
            Future Roadmap
          </h2>

          <p className="mt-3 max-w-3xl text-[15px] leading-8 text-slate-500">
            The next phase focuses on distributed orchestration, adaptive graph
            execution, and runtime self-optimization.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              title: "Distributed Planning",
              icon: Workflow,
              desc: "Split centralized planning into independently orchestrated execution subgraphs.",
            },

            {
              title: "Execution Sandbox",
              icon: ShieldAlert,
              desc: "Introduce isolated runtime sandboxes for execution safety and workload separation.",
            },

            {
              title: "Shadow Graph Reloading",
              icon: Compass,
              desc: "Enable topology replacement without requiring execution cluster restarts.",
            },

            {
              title: "Adaptive Topology",
              icon: Zap,
              desc: "Allow runtime telemetry to continuously optimize graph execution paths.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-700 bg-[#151B23] p-5 transition-all duration-200 hover:border-sky-500/30"
            >
              <div className="mb-4 flex items-center gap-2 text-sky-300">
                <item.icon size={15} />
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase">
                  {item.title}
                </div>
              </div>

              <p className="text-[14px] leading-7 text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-[#0F1318] py-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 font-mono text-[11px] text-slate-600">
          <div className="flex items-center gap-2">
            <Gauge size={12} />
            Runtime Evolution Archive
          </div>

          <div>2026</div>
        </div>
      </footer>
    </div>
  );
}
