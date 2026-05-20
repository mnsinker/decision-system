"use client";

export default function Page() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#F5F7FF] px-8 pt-24 pb-18">
      {/* soft gradient */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_58%)]" />

      {/* subtle grid */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
        {/* LEFT */}

        <div>
          {/* eyebrow */}

          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-indigo-200 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />

            <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-indigo-600 uppercase">
              System Architecture
            </span>
          </div>

          {/* title */}

          <h1 className="max-w-4xl text-5xl leading-[1] font-black tracking-tight text-slate-950 md:text-6xl">
            From operational pressure
            <br />
            to reusable execution architecture.
          </h1>

          {/* subtitle */}

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            Separate semantic meaning, planning, decision logic, and execution
            so workflows can evolve without becoming hardcoded or unstable.
          </p>
        </div>

        {/* RIGHT VISUAL */}

        <div className="relative">
          {/* outer frame */}

          <div className="relative rounded-[2.5rem] border border-indigo-100 bg-white/70 p-8 shadow-[0_30px_80px_-30px_rgba(99,102,241,0.18)] backdrop-blur-xl">
            {/* connector lines */}

            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              {/* top left -> top right */}

              <line
                x1="34%"
                y1="30%"
                x2="66%"
                y2="30%"
                stroke="rgba(99,102,241,0.18)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />

              {/* top left -> bottom left */}

              <line
                x1="34%"
                y1="34%"
                x2="34%"
                y2="70%"
                stroke="rgba(99,102,241,0.18)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />

              {/* top right -> bottom right */}

              <line
                x1="66%"
                y1="34%"
                x2="66%"
                y2="70%"
                stroke="rgba(99,102,241,0.18)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />

              {/* bottom left -> bottom right */}

              <line
                x1="38%"
                y1="74%"
                x2="62%"
                y2="74%"
                stroke="rgba(99,102,241,0.18)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
            </svg>

            {/* 2x2 stable layout */}

            <div className="grid grid-cols-2 gap-6">
              {/* semantic */}

              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6">
                <div className="mb-4 inline-flex rounded-full bg-indigo-50 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.24em] text-indigo-600 uppercase">
                  Semantic
                </div>

                <div className="space-y-2">
                  <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    Entity Relations
                  </div>

                  <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    Shared Meaning
                  </div>
                </div>
              </div>

              {/* planning */}

              <div className="rounded-[1.8rem] border border-indigo-200 bg-indigo-500/[0.05] p-6">
                <div className="mb-4 inline-flex rounded-full bg-indigo-500/10 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.24em] text-indigo-600 uppercase">
                  Planning
                </div>

                <div className="space-y-2">
                  <div className="rounded-xl bg-white/80 px-3 py-2 text-sm text-slate-700">
                    Dependency Graph
                  </div>

                  <div className="rounded-xl bg-white/80 px-3 py-2 text-sm text-slate-700">
                    Runtime Planning
                  </div>
                </div>
              </div>

              {/* decision */}

              <div className="rounded-[1.8rem] border border-emerald-200 bg-emerald-500/[0.05] p-6">
                <div className="mb-4 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.24em] text-emerald-600 uppercase">
                  Decision
                </div>

                <div className="space-y-2">
                  <div className="rounded-xl bg-white/80 px-3 py-2 text-sm text-slate-700">
                    Policy Evaluation
                  </div>

                  <div className="rounded-xl bg-white/80 px-3 py-2 text-sm text-slate-700">
                    Structured Output
                  </div>
                </div>
              </div>

              {/* execution */}

              <div className="rounded-[1.8rem] border border-rose-200 bg-rose-500/[0.05] p-6">
                <div className="mb-4 inline-flex rounded-full bg-rose-500/10 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.24em] text-rose-500 uppercase">
                  Execution
                </div>

                <div className="space-y-2">
                  <div className="rounded-xl bg-white/80 px-3 py-2 text-sm text-slate-700">
                    Tool Runtime
                  </div>

                  <div className="rounded-xl bg-white/80 px-3 py-2 text-sm text-slate-700">
                    Audit Trace
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
