"use client";

type EvolutionItem = {
  version: string;
  title: string;

  capability: string;

  pressure: string;

  beforeDiagram: string[];
  afterDiagram: string[];

  beforeCode: string;
  afterCode: string;
};

const evolutionData: EvolutionItem[] = [
  {
    version: "V1",

    title: "Reactive Execution → Planned Orchestration",

    capability:
      "The system became dependency-aware and capable of deterministic execution planning.",

    pressure:
      "while-loop execution could not resolve dependency ordering or runtime parameter flow across tools.",

    beforeDiagram: ["intent", "while loop", "guess next tool", "execute"],

    afterDiagram: ["intent", "planner", "execution_steps", "execute"],

    beforeCode: `current_tool = get_first_tool(intent)

while current_tool:
    result = current_tool.run(
        query=query,
        tool_results=tool_results
    )

    tool_results.append(result)

    current_tool = get_next_tool(result)`,

    afterCode: `target_entities = INTENT_TO_NODES[intent]

steps = planner.plan(
    target_entities,
    graph
)

for step in steps:
    params = resolve_params(
        step,
        tool_results
    )

    result = step.run(**params)

    tool_results.append(result)`,
  },

  {
    version: "V2",

    title: "Runtime Failure → Pre-runtime Validation",

    capability: "The system gained deterministic pre-runtime verification.",

    pressure:
      "dependency cycles and broken graph states could only be discovered during runtime execution.",

    beforeDiagram: ["build graph", "run agent", "runtime failure"],

    afterDiagram: ["build graph", "validate graph", "run agent"],

    beforeCode: `graph = build_graph(tools)

run_agent(query)`,

    afterCode: `graph = build_graph(tools)

validate_graph(graph)

run_agent(query)`,
  },

  {
    version: "V3",

    title: "Coarse Entities → Runtime Operational Nodes",

    capability:
      "The runtime model became expressive enough for policy / scoring / decision separation.",

    pressure:
      "high-level entities were too coarse to express runtime decision boundaries.",

    beforeDiagram: ["User", "Coupon", "Campaign"],

    afterDiagram: ["Eligibility", "Scoring", "Decision"],

    beforeCode: `User
Coupon
Campaign`,

    afterCode: `CampaignEligibility
CampaignScore
CouponDecision`,
  },
];

function Diagram({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {nodes.map((node, idx) => (
        <div key={node} className="flex items-center gap-3">
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-zinc-300">
            {node}
          </div>

          {idx !== nodes.length - 1 && <div className="text-zinc-600">→</div>}
        </div>
      ))}
    </div>
  );
}

function HighlightedCode({ code }: { code: string }) {
  const lines = code.split("\n");

  return (
    <pre className="overflow-x-auto text-[13px] leading-7">
      <code>
        {lines.map((line, idx) => {
          const highlighted = line
            .replace(
              /\b(while|for|in)\b/g,
              `<span class="text-purple-400">$1</span>`,
            )
            .replace(
              /\b(planner|validate_graph|resolve_params|run_agent)\b/g,
              `<span class="text-cyan-400">$1</span>`,
            )
            .replace(
              /\b(result|params|steps|graph|tool_results|intent)\b/g,
              `<span class="text-zinc-100">$1</span>`,
            );

          return (
            <div
              key={idx}
              className="text-zinc-500"
              dangerouslySetInnerHTML={{
                __html: highlighted || " ",
              }}
            />
          );
        })}
      </code>
    </pre>
  );
}

export default function EvolutionPage() {
  return (
    <main className="min-h-screen bg-[#07090D] text-zinc-100">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 md:px-10">
          <div className="max-w-4xl">
            <div className="mb-5 font-mono text-[11px] tracking-[0.24em] text-zinc-500 uppercase">
              SECTION 04 // EVOLUTION
            </div>

            <h1 className="text-[54px] leading-[0.92] font-semibold tracking-[-0.05em] text-white md:text-[78px]">
              Architecture
              <br />
              Evolution
            </h1>

            <p className="mt-8 max-w-3xl text-[17px] leading-8 text-zinc-400">
              The system evolved by redefining runtime responsibilities under
              increasing execution complexity.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute top-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />
      </section>

      {/* CONTENT */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          {/* timeline */}
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[22px] w-px bg-zinc-800" />

            <div className="space-y-28">
              {evolutionData.map((item) => (
                <div key={item.version} className="relative">
                  {/* node */}
                  <div className="absolute top-1 left-0 z-10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-[#0B0E13]">
                      <span className="font-mono text-[11px] text-zinc-300">
                        {item.version}
                      </span>
                    </div>
                  </div>

                  {/* content */}
                  <div className="pl-20">
                    {/* title */}
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div className="max-w-4xl">
                        <div className="flex items-center gap-3">
                          <h2 className="text-[34px] leading-tight font-semibold tracking-[-0.04em] text-white md:text-[48px]">
                            {item.title}
                          </h2>

                          {/* info */}
                          <div className="group relative">
                            <div className="flex h-5 w-5 cursor-default items-center justify-center rounded-full border border-zinc-700 text-[11px] text-zinc-500">
                              i
                            </div>

                            <div className="pointer-events-none absolute top-0 left-8 w-[320px] rounded-xl border border-white/10 bg-[#0B0E13] p-4 text-[12px] leading-6 text-zinc-400 opacity-0 shadow-2xl transition-opacity duration-200 group-hover:opacity-100">
                              {item.pressure}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* capability */}
                      <div className="max-w-sm rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.04] px-5 py-4">
                        <div className="mb-2 font-mono text-[10px] tracking-[0.18em] text-emerald-400 uppercase">
                          New Capability
                        </div>

                        <p className="text-[14px] leading-6 text-zinc-200">
                          {item.capability}
                        </p>
                      </div>
                    </div>

                    {/* before after */}
                    <div className="mt-10 grid gap-6 lg:grid-cols-2">
                      {/* before */}
                      <div className="overflow-hidden rounded-3xl border border-red-500/10 bg-[#0B0E13]">
                        {/* header */}
                        <div className="border-b border-white/5 px-6 py-4">
                          <div className="font-mono text-[11px] tracking-[0.2em] text-red-400 uppercase">
                            BEFORE
                          </div>
                        </div>

                        {/* diagram */}
                        <div className="border-b border-white/5 px-6 py-5">
                          <Diagram nodes={item.beforeDiagram} />
                        </div>

                        {/* code */}
                        <div className="p-6">
                          <HighlightedCode code={item.beforeCode} />
                        </div>
                      </div>

                      {/* after */}
                      <div className="overflow-hidden rounded-3xl border border-emerald-500/10 bg-[#0B0E13]">
                        {/* header */}
                        <div className="border-b border-white/5 px-6 py-4">
                          <div className="font-mono text-[11px] tracking-[0.2em] text-emerald-400 uppercase">
                            AFTER
                          </div>
                        </div>

                        {/* diagram */}
                        <div className="border-b border-white/5 px-6 py-5">
                          <Diagram nodes={item.afterDiagram} />
                        </div>

                        {/* code */}
                        <div className="p-6">
                          <HighlightedCode code={item.afterCode} />
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
    </main>
  );
}
