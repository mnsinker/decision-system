export default function LifecyclePreview() {
  const steps = [
    {
      num: "01",
      title: "Interpret",
      desc: "Extract structured intent from runtime requests.",
    },
    {
      num: "02",
      title: "Plan",
      desc: "Resolve dependencies dynamically across systems.",
    },
    {
      num: "03",
      title: "Decide",
      desc: "Evaluate policies and runtime conditions.",
    },
    {
      num: "04",
      title: "Execute",
      desc: "Run traceable operational actions.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#071133] text-white">

      <section className="relative overflow-hidden px-6 py-32">

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative mx-auto max-w-7xl">

          {/* trace line */}
          <div className="mb-24 flex flex-col items-center">

            <div className="h-16 w-px bg-gradient-to-b from-transparent via-indigo-400/40 to-transparent" />

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300 backdrop-blur-sm">
              HOW THE SYSTEM HANDLES THESE PROBLEMS.
            </div>

          </div>

          {/* top narrative */}
          <div className="mx-auto max-w-4xl text-center">

            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              EXECUTION LIFECYCLE
            </div>

            <h2 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Structured execution,
              <br />
              not static workflows.
            </h2>

            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-slate-400">
              Instead of hardcoding operational paths,
              the system interprets requests, resolves dependencies,
              evaluates runtime conditions, and executes traceable actions dynamically.
            </p>

          </div>

          {/* horizontal lifecycle */}
          <div className="relative mt-28">

            {/* center line */}
            <div className="absolute left-0 top-7 h-px w-full bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent" />

            <div className="relative grid gap-8 md:grid-cols-4">

              {steps.map((step, idx) => (

                <div
                  key={idx}
                  className="group relative"
                >

                  {/* node */}
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0B183D] text-sm font-bold text-indigo-300 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">

                    {step.num}

                  </div>

                  {/* card */}
                  <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-indigo-300/20 group-hover:bg-white/[0.05]">

                    <div className="text-2xl font-bold text-white">
                      {step.title}
                    </div>

                    <p className="mt-4 leading-relaxed text-slate-400">
                      {step.desc}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}