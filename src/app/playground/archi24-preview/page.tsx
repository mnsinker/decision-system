import React from "react";
import {
  ArrowRight,
  Terminal,
  Layers,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
              ⊹
            </div>
            <div>
              <span className="font-bold tracking-tight text-slate-900">
                AI DECISION SYSTEM
              </span>
              <p className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">
                Ontology • Planning • Execution
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#overview" className="font-semibold text-indigo-600">
              Overview
            </a>
            <a href="#demo" className="transition hover:text-slate-900">
              Demo
            </a>
            <a href="#architecture" className="transition hover:text-slate-900">
              Architecture
            </a>
            <a href="#evolution" className="transition hover:text-slate-900">
              Evolution
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium transition hover:bg-slate-50">
              中文
            </button>
            <button className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
              Launch Demo
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION (Redesigned with subtle background contrast & grid anchor) */}
      <header className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 via-slate-50/60 to-white pt-20 pb-24">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:32px_32px]" />

        {/* Soft Ambient Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* Tag Pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100/50 bg-indigo-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-indigo-700 uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
            AI Decision System
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            AI-powered system for <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              structured business decisions.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
            A reusable architecture for operational workflows, policy
            evaluation, dependency resolution, and multi-step execution.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-medium text-white shadow-md shadow-slate-950/10 transition hover:bg-slate-800 sm:w-auto">
              See operational pressure
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button className="w-full rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:w-auto">
              Architecture
            </button>
          </div>
        </div>
      </header>

      {/* SECOND SECTION: OPERATIONAL COMPLEXITY */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Divider Question */}
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="mb-4 h-8 w-px bg-gradient-to-b from-transparent to-slate-200" />
            <span className="rounded-full border border-slate-200 bg-white px-4 py-1 text-[11px] font-bold tracking-widest text-slate-500 uppercase shadow-sm">
              Where do problems come from?
            </span>
            <div className="mt-4 h-8 w-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* Left Content Column */}
            <div className="space-y-6 lg:col-span-5">
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
                Operational Complexity
              </span>
              <h2 className="text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl">
                Business logic becomes harder as operational systems fragment.
              </h2>

              {/* Filter Tabs/Pills */}
              <div className="flex flex-wrap gap-2 pt-4">
                <button className="rounded-lg bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-sm">
                  Dependency Explosion
                </button>
                <button className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100">
                  Policy Fragmentation
                </button>
                <button className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100">
                  Workflow Drift
                </button>
              </div>
            </div>

            {/* Right Interactive/Preview Column */}
            <div className="grid grid-cols-1 gap-6 lg:col-span-7">
              {/* Business Request Box */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm sm:p-8">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-wider text-indigo-600 uppercase">
                  <span className="h-2 w-2 rounded-sm bg-indigo-600" />
                  Business Request
                </div>
                <blockquote className="font-serif text-2xl font-medium tracking-tight text-slate-800 italic sm:text-3xl">
                  "We only need one extra refund condition."
                </blockquote>
              </div>

              {/* System Reality Box */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-200 shadow-xl sm:p-8">
                <div className="mb-6 flex items-center gap-2 font-mono text-xs tracking-widest text-indigo-400 uppercase">
                  <Terminal className="h-4 w-4" />
                  System Reality
                </div>

                <div className="space-y-3 font-sans">
                  <div className="flex items-center gap-4 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition hover:border-slate-700">
                    <div className="flex h-7 w-7 items-center justify-center rounded border border-indigo-800/50 bg-indigo-950 font-mono text-[10px] font-bold text-indigo-400 shadow-inner">
                      01
                    </div>
                    <p className="text-sm font-medium text-slate-300">
                      Which VIP definition should apply?
                    </p>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition hover:border-slate-700">
                    <div className="flex h-7 w-7 items-center justify-center rounded border border-emerald-800/50 bg-emerald-950 font-mono text-[10px] font-bold text-emerald-400 shadow-inner">
                      02
                    </div>
                    <p className="text-sm font-medium text-slate-300">
                      Does shipping status affect eligibility?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
