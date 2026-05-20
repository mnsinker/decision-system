"use client";
import React from "react";
import { useLanguage } from "@/lib/LanguageProvider";
import SectionHeader from "@/components/SectionHeader";
import { overviewUseCasesContent } from "@/content/overview/overviewUsecases";
import {
  ArrowRight,
  SearchCode,
  GitBranch,
  LucideShoppingBag,
  Terminal,
  Activity,
} from "lucide-react";

export default function OverviewUseCases() {
  const { locale } = useLanguage();
  const content = overviewUseCasesContent[locale];
  const useCases = content.cards;
  const icons = [
    <SearchCode size={20} className="text-indigo-600" />,
    <GitBranch size={20} className="text-indigo-600" />,
    <LucideShoppingBag size={20} className="text-indigo-600" />,
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-28 text-slate-900">
      {/* subtle grid */}

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* header */}

        <SectionHeader
          eyebrow={content.sectionLabel}
          title={`${content.title.line1}\n${content.title.line2}`}
          highlight={content.title.line2}
          highlightClassName="
              bg-gradient-to-r
              from-indigo-500
              via-violet-500
              to-blue-500
              bg-clip-text
              text-transparent
              "
          size="xl"
        />

        {/* cards */}

        <div className="mt-22 grid gap-8 lg:grid-cols-3">
          {useCases.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-[2.5rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200"
            >
              {/* top white surface */}

              <div className="p-7 pb-6">
                {/* top row */}

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-slate-400">
                    {item.label}
                  </span>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2 text-indigo-600">
                    {icons[idx]}
                  </div>
                </div>

                {/* title */}

                <h3 className="mt-10 text-4xl font-bold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                {/* desc */}

                <p className="mt-4 text-base leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>

              {/* runtime strip */}

              <div className="mx-2 mt-auto mb-2 overflow-hidden rounded-[2rem] bg-[#0F172A] p-7">
                {/* runtime top */}

                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                    <Activity size={12} className="text-indigo-400" />
                    Runtime_Trace
                  </div>

                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </div>

                {/* steps */}

                <div className="space-y-3">
                  {item.steps.map((step, stepIdx) => (
                    <div
                      key={stepIdx}
                      className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.06]"
                    >
                      {/* node */}

                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 font-mono text-[10px] font-bold text-indigo-400">
                        {(stepIdx + 1).toString().padStart(2, "0")}
                      </div>

                      {/* text */}

                      <div className="text-[13px] font-medium text-slate-300">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>

                {/* footer */}

                <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-4 font-mono text-[10px] text-slate-600">
                  <Terminal size={10} />

                  <span>&gt; decision_flow --executed</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}

        <div className="mt-1 flex flex-col items-center">
          <div className="mb-12 h-18 w-px bg-gradient-to-b from-slate-200 to-transparent" />

          <button className="group flex items-center gap-3 rounded-2xl bg-slate-900 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] hover:bg-indigo-600 active:scale-95">
            Explore in Architecture
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <div className="mt-8 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-indigo-500" />

            <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
              Formalized Logic & Auditability
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
