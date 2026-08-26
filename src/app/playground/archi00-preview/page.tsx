export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative isolate overflow-hidden px-6 py-20 md:px-8 md:py-28">
        {/* Background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_45%_at_50%_8%,rgba(99,102,241,0.10),transparent_72%)]"
          aria-hidden
        />

        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-indigo-700">
              Interactive Demo
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              See the AI Decision System
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                {" "}
                in action
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Watch the walkthrough to understand how natural-language
              requests become structured, policy-aware business decisions —
              then open the live demo and try the workflow yourself.
            </p>
          </div>

          {/* Video */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-200/70">
            <div className="aspect-video">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/demo/decision-system-poster.jpg"
              >
                <source
                  src="/demo/decision-system-demo.mp4"
                  type="video/mp4"
                />

                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/demo/decision-system-demo.mp4"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
            >
              Watch Demo
            </a>

            <a
              href="https://YOUR-STREAMLIT-APP.streamlit.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Try Hands-on Demo ↗
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            The hands-on demo opens in a separate Streamlit application.
          </p>
        </div>
      </section>
    </main>
  );
}