"use client";

"use client";

import React from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";
import {
  ArrowRight,
  SearchCode,
  GitBranch,
  Zap,
  Terminal,
  Activity,
} from "lucide-react";

export default function UseCasesVisualEvolutionV2() {
  const { theme } = useTheme();

  const useCases = [
    {
      label: "USE CASE 01",

      title: "Order Assistant",

      desc:
        "Evaluate refund eligibility, risk conditions, logistics state, and approval policies dynamically.",

      icon: <SearchCode size={20} className="text-indigo-600" />,

      steps: [
        "Interpret refund request",
        "Resolve policy conditions",
        "Approval coordination",
        "Execution logging",
      ],
    },

    {
      label: "USE CASE 02",

      title: "AI Marketing",

      icon: <GitBranch size={20} className="text-indigo-600" />,

      desc:
        "Coordinate targeting, campaign logic, coupon eligibility, and operational constraints.",

      steps: [
        "Audience segmentation",
        "Policy filtering",
        "A/B routing",
        "Campaign execution",
      ],
    },

    {
      label: "USE CASE 03",

      title: "Workflow Automation",

      icon: <Zap size={20} className="text-indigo-600" />,

      desc:
        "Resolve execution paths based on policy checks, runtime state, and audit requirements.",

      steps: [
        "Document verification",
        "Risk approval",
        "ERP coordination",
        "Audit trace",
      ],
    },
  ];

  return (

    <div
      className={cn(
        "min-h-screen py-28",
        theme.colors.surfacePrimary,
        theme.colors.textSecondary,
        theme.spacing.sectionXComfort,
      )}
    >

      {/* subtle grid */}

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025]">

        <div className="h-full w-full bg-[size:40px_40px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]" />

      </div>

      <div className={cn("mx-auto", theme.spacing.container)}>

        {/* header */}

        <div className="max-w-5xl">

          <div className="flex items-center gap-3">

            <div className="h-px w-8 bg-indigo-600" />

            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-indigo-600">

              Operational Projections

            </span>

          </div>

          <h2 className="mt-8 text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl">

            One structure.{" "}

            <span
              className="
                bg-gradient-to-r
                from-indigo-500
                via-violet-500
                to-blue-500
                bg-clip-text
                text-transparent
              "
            >
              Diverse Utility.
            </span>

          </h2>

        </div>

        {/* cards */}

        <div className="mt-22 grid gap-8 lg:grid-cols-3">

          {useCases.map((item, idx) => (

            <div
              key={idx}
              className={cn(
                "group flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200",
                theme.radius.panelLg,
                theme.colors.borderPrimary,
                theme.colors.surfacePrimary,
                theme.shadows.sm,
              )}
            >

              {/* top white surface */}

              <div className="p-7 pb-6">

                {/* top row */}

                <div className="flex items-center justify-between">

                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">

                    {item.label}

                  </span>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2 text-indigo-600">

                    {item.icon}

                  </div>

                </div>

                {/* title */}

                <h3 className="mt-10 text-4xl font-bold tracking-tight text-slate-900">

                  {item.title}

                </h3>

                {/* desc */}

                <p className="mt-4 text-base leading-relaxed text-slate-500">

                  {item.desc}

                </p>

              </div>

              {/* runtime strip */}

              <div className="mx-2 mb-2 mt-auto overflow-hidden rounded-[2rem] bg-[#0F172A] p-7">

                {/* runtime top */}

                <div className="mb-6 flex items-center justify-between">

                  <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">

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
                      className="
                        flex items-center gap-4
                        rounded-xl
                        border border-white/5
                        bg-white/[0.03]
                        px-4 py-3
                        transition-colors
                        hover:bg-white/[0.06]
                      "
                    >

                      {/* node */}

                      <div
                        className="
                          flex h-6 w-6 shrink-0 items-center justify-center
                          rounded-md
                          border border-white/10
                          bg-white/5
                          text-[10px]
                          font-mono font-bold
                          text-indigo-400
                        "
                      >

                        {(stepIdx + 1)
                          .toString()
                          .padStart(2, "0")}

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

        <div className="mt-16 flex flex-col items-center">

          <div className="mb-12 h-20 w-px bg-gradient-to-b from-slate-200 to-transparent" />

          <button
            className="
              group flex items-center gap-3
              rounded-2xl
              bg-slate-900
              px-10 py-5
              text-lg font-bold text-white
              shadow-xl shadow-slate-200
              transition-all
              hover:scale-[1.02]
              hover:bg-indigo-600
              active:scale-95
            "
          >

            Explore in Architecture

            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />

          </button>

          <div className="mt-8 flex items-center gap-2">

            <span className="h-1 w-1 rounded-full bg-indigo-500" />

            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">

              Formalized Logic & Auditability

            </span>

          </div>

        </div>

      </div>

    </div>

  );
}