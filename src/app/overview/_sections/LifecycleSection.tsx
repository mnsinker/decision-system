"use client";

import TransitionLine from "@/components/TransitionLine";

import { lifecycleContent } from "@/content/overview/lifecycle";

export default function LifecycleSection() {

  const content = lifecycleContent.en;

  return (

    <section className="relative overflow-hidden bg-[#071133] px-6 py-32 text-white">

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
        <TransitionLine
          text={content.transition}
          dark
        />

        {/* narrative */}
        <div className="mx-auto max-w-4xl text-center">

          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {content.sectionLabel}
          </div>

          <h2 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">

            {content.title.line1}

            <br />

            {content.title.line2}

          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-slate-400">
            {content.subtitle}
          </p>

        </div>

        {/* lifecycle rail */}
        <div className="relative mt-20">

          {/* center line */}
          <div className="absolute left-0 top-7 h-px w-full bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent" />

          <div className="relative grid gap-8 md:grid-cols-4">

            {content.steps.map((step) => (

              <div
                key={step.num}
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
  );
}