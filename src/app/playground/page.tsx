export default function OverviewPreviewV3() {
  const tabs = [
    'Planning',
    'Policy Coordination',
    'Operational Change',
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden">

      {/* subtle grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.18]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      {/* HERO */}
      <section className="px-6 pt-28 pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center rounded-full border border-indigo-100 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 shadow-sm">
              Operational Decision Engine
            </div>

            <h1 className="mt-10 text-5xl font-bold leading-[1.02] tracking-tight text-slate-900 md:text-7xl">
              Complex operations
              <br />
              need adaptive
              <br />
              <span className="text-indigo-600">
                execution.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
              A structured system for business operations where
              decisions depend on changing policies, approvals,
              and runtime conditions.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">

              <button className="rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-800">
                Launch Demo
              </button>

              <button className="rounded-2xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-50">
                Explore Architecture
              </button>

            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* glow */}
            <div className="absolute inset-0 rounded-[3rem] bg-indigo-100/30 blur-3xl" />

            {/* workspace card */}
            <div className="relative overflow-hidden rounded-[2.8rem] border border-slate-200 bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl">

              {/* header */}
              <div className="flex items-center justify-between">

                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Workspace Projection
                  </div>

                  <div className="mt-2 text-xl font-bold text-slate-900">
                    Customer Operations
                  </div>
                </div>

                <div className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Live
                </div>
              </div>

              {/* cards */}
              <div className="mt-10 space-y-4">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Refund Request
                      </div>

                      <div className="mt-2 text-sm text-slate-500">
                        VIP customer requested refund after shipment.
                      </div>
                    </div>

                    <div className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-600">
                      Approval
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Campaign Coordination
                      </div>

                      <div className="mt-2 text-sm text-slate-500">
                        Coupon recovery policy updated.
                      </div>
                    </div>

                    <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Workflow Review
                      </div>

                      <div className="mt-2 text-sm text-slate-500">
                        Shipping and finance systems already connected.
                      </div>
                    </div>

                    <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Synced
                    </div>
                  </div>
                </div>
              </div>

              {/* atmosphere */}
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-indigo-100/40 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* TRACE LINE */}
      <div className="flex flex-col items-center py-8">

        <div className="h-20 w-px bg-gradient-to-b from-transparent via-indigo-200 to-transparent" />

        <div className="rounded-full border border-indigo-100 bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 shadow-sm">
          Where do these operational problems come from?
        </div>

        <div className="h-20 w-px bg-gradient-to-b from-transparent via-indigo-200 to-transparent" />

      </div>

      {/* CHALLENGES */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-4xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Operational Challenges
            </div>

            <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-slate-900 md:text-6xl">
              Business logic becomes harder
              <br />
              as systems grow together.
            </h2>
          </div>

          {/* segmented tabs */}
          <div className="mt-12 inline-flex rounded-full bg-slate-100 p-2 shadow-inner">

            {tabs.map((tab, idx) => (
              <button
                key={idx}
                className={`rounded-full px-8 py-4 text-sm font-semibold transition ${
                  idx === 0
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* challenge card */}
          <div className="mt-10 overflow-hidden rounded-[2.8rem] border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">

              {/* business side */}
              <div className="border-b border-slate-100 bg-slate-50 p-10 lg:border-b-0 lg:border-r">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                    B
                  </div>

                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Business Request
                  </div>
                </div>

                <p className="mt-10 text-3xl font-bold leading-tight text-slate-900">
                  “We just need
                  one extra
                  refund rule.”
                </p>

                <p className="mt-10 max-w-md leading-relaxed text-slate-600">
                  Operational changes often appear simple,
                  but already depend on multiple connected systems underneath.
                </p>
              </div>

              {/* engineering side */}
              <div className="p-10">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    E
                  </div>

                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    System Reality
                  </div>
                </div>

                <div className="mt-10 space-y-4">

                  {[
                    'Which VIP definition should apply?',
                    'Does shipping affect eligibility?',
                    'Should coupon recovery run too?',
                    'Which approval path should execute?',
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50 px-6 py-5">

                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-500">
                    Operational Result
                  </div>

                  <p className="mt-3 leading-relaxed text-slate-700">
                    A small operational change now affects multiple systems and execution paths.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACE LINE */}
      <div className="flex flex-col items-center py-8">

        <div className="h-20 w-px bg-gradient-to-b from-transparent via-indigo-200 to-transparent" />

        <div className="rounded-full border border-indigo-100 bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 shadow-sm">
          How the system handles these problems.
        </div>

        <div className="h-20 w-px bg-gradient-to-b from-transparent via-indigo-200 to-transparent" />

      </div>

      {/* LIFECYCLE */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-[2.8rem] bg-slate-900 px-8 py-16 text-white md:px-14">

          <div className="max-w-2xl">

            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-400">
              Execution Lifecycle
            </div>

            <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl">
              Structured execution,
              <br />
              not static workflows.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-4">

            {[
              {
                title: 'Interpret',
                desc: 'Understand the operational request and extract structured intent.',
              },
              {
                title: 'Plan',
                desc: 'Resolve dependencies and prepare execution dynamically.',
              },
              {
                title: 'Decide',
                desc: 'Evaluate policies, approvals, and runtime constraints.',
              },
              {
                title: 'Execute',
                desc: 'Run traceable actions with auditable operational results.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
              >

                <div className="text-sm font-semibold text-indigo-400">
                  0{idx + 1}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="px-6 py-16 pb-28">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Use Cases
            </div>

            <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-slate-900 md:text-5xl">
              One structure,
              <br />
              support multiple use cases.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {[
              'Order Assistant',
              'AI Marketing',
              'Workflow Automation',
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Use Case 0{idx + 1}
                </div>

                <h3 className="mt-10 text-3xl font-bold text-slate-900">
                  {item}
                </h3>

                <p className="mt-4 leading-relaxed text-slate-600">
                  Reusable planning, policy evaluation,
                  and execution coordination.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">

            <button className="rounded-2xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-50">
              Explore how they work in Architecture
            </button>

          </div>
        </div>
      </section>
    </div>
  );
}
