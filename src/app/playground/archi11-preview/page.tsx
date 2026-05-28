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
  Info,
} from "lucide-react";

type EvolutionItem = {
  version: string;
  title: string;
  subtitle: string;

  capability: string;
  capabilityTooltip?: string;

  beforeCode: string[];
  afterCode: string[];

  beforeTooltip: string;

  beforeDiagram: React.ReactNode;
  afterDiagram: React.ReactNode;
};

const highlightCode = (line: string) => {
  return line
    .replace(
      /\b(while|for|in|def|class)\b/g,
      '<span class="text-violet-400 font-medium">$1</span>',
    )
    .replace(
      /\b(planner|validate_graph|run_agent|get_first_tool|get_next_tool|resolve_params)\b/g,
      '<span class="text-sky-400">$1</span>',
    )
    .replace(
      /\b(result|graph|steps|params|tool_results)\b/g,
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

      subtitle: "将步骤规划从高频 runtime loop 中抽离。",

      capability: "Dependency-aware execution planning",

      capabilityTooltip:
        "系统首次具备 dependency-aware orchestration capability，可在执行前提前得到完整 execution path。",

      beforeTooltip:
        "依赖解析与路径决策发生在 runtime loop 内部，导致 execution order 不稳定，且 runtime parameter flow 难以预测。",

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
          <div className="mb-3 flex items-center justify-center rounded-md border border-dashed border-slate-700 bg-slate-900/40 py-2 text-[10px] text-slate-600 italic">
            [ no planning layer ]
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-medium tracking-wider text-slate-500 uppercase">
              <RefreshCw size={10} />
              Runtime Loop
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <div className="rounded border border-amber-500/20 bg-amber-500/[0.05] px-2 py-1 text-amber-300">
                resolve path
              </div>

              <span className="text-slate-700">→</span>

              <div className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-300">
                execute
              </div>
            </div>
          </div>
        </div>
      ),

      afterDiagram: (
        <div className="flex h-[120px] flex-col justify-end">
          <div className="mb-2 rounded-lg border border-sky-500/20 bg-sky-500/[0.05] p-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-sky-300">
              <Sliders size={11} />
              planner
            </div>
          </div>

          <div className="mb-2 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-medium tracking-wider text-slate-500 uppercase">
              <RefreshCw size={10} />
              Runtime Loop
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <div className="rounded border border-dashed border-slate-700 px-2 py-1 text-slate-600 italic">
                path resolved
              </div>

              <span className="text-slate-700">→</span>

              <div className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-300">
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

      subtitle: "将 graph 健康度校验前置到 runtime 之前。",

      capability: "Deterministic graph verification",

      capabilityTooltip:
        "系统可以在 runtime execution 前提前发现 cycle / broken dependency。",

      beforeTooltip:
        "broken dependency graph 只能在 runtime execution 时才暴露，导致失败发现过晚。",

      beforeCode: ["graph = build_graph(tools)", "", "run_agent(query)"],

      afterCode: [
        "graph = build_graph(tools)",
        "validate_graph(graph)",
        "",
        "run_agent(query)",
      ],

      beforeDiagram: (
        <div className="flex h-[120px] flex-col justify-end">
          <div className="mb-3 flex items-center justify-center rounded-md border border-dashed border-slate-700 bg-slate-900/40 py-2 text-[10px] text-slate-600 italic">
            [ no validation layer ]
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
            <div className="mb-2 text-[10px] tracking-wider text-slate-500 uppercase">
              Execution Lifecycle
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <div className="rounded border border-amber-500/20 bg-amber-500/[0.05] px-2 py-1 text-amber-300">
                runtime validation
              </div>

              <span className="text-slate-700">→</span>

              <div className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-300">
                execution
              </div>
            </div>
          </div>
        </div>
      ),

      afterDiagram: (
        <div className="flex h-[120px] flex-col justify-end">
          <div className="mb-2 rounded-lg border border-sky-500/20 bg-sky-500/[0.05] p-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-sky-300">
              <Terminal size={11} />
              validator
            </div>
          </div>

          <div className="mb-2 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
            <div className="mb-2 text-[10px] tracking-wider text-slate-500 uppercase">
              Execution Lifecycle
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <div className="rounded border border-dashed border-slate-700 px-2 py-1 text-slate-600 italic">
                graph verified
              </div>

              <span className="text-slate-700">→</span>

              <div className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-300">
                execution
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1319] text-slate-300 antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0f1319]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-700 bg-slate-800/70 p-2 text-slate-400">
              <Cpu size={15} />
            </div>

            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                Architecture Runtime Evolution
              </div>

              <div className="text-sm font-medium text-slate-200">
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
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-4xl">
            <h1 className="text-3xl leading-tight font-light tracking-tight text-slate-100 md:text-5xl">
              Runtime complexity forced the system
              <br />
              to continuously redefine execution boundaries.
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500 md:text-[15px]">
              Each architectural shift emerged because the previous runtime
              model became insufficient under growing orchestration complexity.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="relative">
          {/* timeline */}
          <div className="absolute top-6 bottom-6 left-[19px] hidden w-px bg-slate-800 md:block" />

          <div className="space-y-20">
            {evolutionData.map((item) => (
              <div
                key={item.version}
                className="relative gap-6 md:grid md:grid-cols-12"
              >
                {/* version */}
                <div className="hidden md:col-span-1 md:block">
                  <div className="sticky top-24 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-[#0f1319] font-mono text-xs text-slate-300">
                    {item.version}
                  </div>
                </div>

                {/* content */}
                <div className="rounded-2xl border border-slate-800 bg-[#161b22] p-6 md:col-span-11">
                  {/* top */}
                  <div className="flex flex-col justify-between gap-5 border-b border-slate-800 pb-5 lg:flex-row lg:items-start">
                    <div className="max-w-4xl">
                      <h2 className="text-[22px] font-semibold tracking-tight text-slate-100 md:text-[28px]">
                        {item.title}
                      </h2>

                      <p className="mt-2 text-[13px] leading-6 text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* capability */}
                    <div className="group relative max-w-sm rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] px-4 py-3">
                      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-emerald-400 uppercase">
                        <CheckCircle2 size={11} />
                        New Capability
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[13px] text-slate-200">
                        {item.capability}

                        {/* NEW INFO ICON */}
                        <div className="relative">
                          <div className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] text-[10px] text-emerald-300">
                            <Info size={10} />
                          </div>

                          <div className="pointer-events-none absolute top-0 right-6 z-30 w-64 rounded-xl border border-slate-700 bg-[#1b222c] p-3 text-[11px] leading-5 text-slate-300 opacity-0 shadow-2xl transition-opacity duration-150 group-hover:opacity-100">
                            {item.capabilityTooltip}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* before after */}
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {/* before */}
                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117]">
                      <div className="flex items-center justify-between border-b border-slate-800 bg-[#161b22]/80 px-4 py-3">
                        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-slate-400 uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                          Before
                        </div>

                        <div className="text-[10px] text-slate-600 uppercase">
                          Coupled Runtime
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="border-b border-slate-800/80 pb-4">
                          {item.beforeDiagram}
                        </div>

                        <div className="mt-4 min-h-[150px] font-mono text-[12px] leading-6">
                          {item.beforeCode.map((line, idx) => {
                            const isAnchor =
                              line.includes("while") ||
                              line.includes("run_agent");

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

                                    <div className="pointer-events-none absolute top-0 right-6 z-30 w-64 rounded-xl border border-slate-700 bg-[#1b222c] p-3 text-[11px] leading-5 text-slate-300 opacity-0 shadow-2xl transition-opacity duration-150 group-hover:opacity-100">
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

                    {/* after */}
                    <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#11161d]">
                      <div className="flex items-center justify-between border-b border-slate-800 bg-[#161b22]/80 px-4 py-3">
                        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-sky-300 uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                          After
                        </div>

                        <div className="text-[10px] text-slate-600 uppercase">
                          Structured Runtime
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="border-b border-slate-800/80 pb-4">
                          {item.afterDiagram}
                        </div>

                        <div className="mt-4 min-h-[150px] font-mono text-[12px] leading-6 text-slate-400">
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
      </section>

      {/* footer */}
      <footer className="border-t border-slate-800 bg-[#0f1319] py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 font-mono text-xs text-slate-600">
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
