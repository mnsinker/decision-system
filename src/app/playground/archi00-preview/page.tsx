"use client";

import React, { useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";
import {
  Layers,
  GitBranch,
  ShieldCheck,
  Database,
  Activity,
  ArrowDown,
  Route,
  Search,
  BarChart3,
  RefreshCw,
} from "lucide-react";

export default function ArchitecturePage() {
  const { theme } = useTheme();
  const [activePressure, setActivePressure] = useState("planning");

  const pressures = [
    {
      id: "semantic",
      label: "Semantic Consistency",
      case: "“High-risk users should require manual approval.”",
      pressure:
        "Different systems define operational meaning differently, causing inconsistent runtime behavior.",
      response:
        "The Semantic Layer creates shared operational meaning across tools, workflows, and execution.",
      layer: "Semantic Layer",
      icon: Database,
    },
    {
      id: "planning",
      label: "Runtime Planning",
      case: "“Add tax validation before enterprise refunds.”",
      pressure:
        "Execution paths are no longer fixed. Different requests require different dependency chains at runtime.",
      response:
        "The Planning Layer resolves dependencies and generates execution flow dynamically.",
      layer: "Planning Layer",
      icon: GitBranch,
    },
    {
      id: "policy",
      label: "Policy Isolation",
      case: "“VIP campaigns should follow different coupon logic.”",
      pressure:
        "Business rules leak into execution services, making workflows difficult to audit and evolve.",
      response:
        "The Decision Layer isolates policy evaluation from execution infrastructure.",
      layer: "Decision Layer",
      icon: ShieldCheck,
    },
  ];

  const current = pressures.find((p) => p.id === activePressure)!;

  const layers = [
    {
      name: "Semantic Layer",
      role: "Defines shared operational meaning.",
      examples: "Entities, nodes, relations, dependency meaning",
    },
    {
      name: "Planning Layer",
      role: "Resolves dependencies and plans execution.",
      examples: "Graph build, planner, node-to-tool mapping",
    },
    {
      name: "Decision Layer",
      role: "Evaluates business rules and produces structured decisions.",
      examples: "Policies, decision DTOs, scoring roadmap",
    },
    {
      name: "Execution Layer",
      role: "Runs tools, updates state, and records traces.",
      examples: "Tools, services, audit logs, runtime state",
    },
  ];

  const runtimeSteps = [
    "User Query",
    "Intent Parse",
    "Target Node",
    "Dependency Planning",
    "Tool Selection",
    "Param Build",
    "Tool Execution",
    "Runtime State",
    "Final Response",
  ];

  const projections = [
    {
      title: "Order Assistant",
      mapping: [
        "Dependency resolution → order / user / shipping state",
        "Policy evaluation → refund or coupon decision",
        "Execution trace → auditable order decision",
      ],
    },
    {
      title: "AI Marketing",
      mapping: [
        "User state resolution → audience targeting",
        "Policy evaluation → coupon eligibility",
        "Execution flow → campaign routing",
      ],
    },
    {
      title: "Operational Approval",
      mapping: [
        "Semantic layer → shared request meaning",
        "Decision layer → approval policy",
        "Execution layer → traceable workflow execution",
      ],
    },
  ];

  const roadmap = [
    {
      title: "Conditional Routing",
      icon: Route,
      desc: "Policies select execution paths dynamically instead of returning only true / false.",
    },
    {
      title: "Retrieval Layer",
      icon: Search,
      desc: "External policies, documents, and historical cases become runtime context.",
    },
    {
      title: "Scoring System",
      icon: BarChart3,
      desc: "Risk, value, and priority scores influence routing and decisions.",
    },
    {
      title: "Feedback Loop",
      icon: RefreshCw,
      desc: "Execution outcomes feed back into future scoring, policy, and routing decisions.",
    },
  ];

  return (
    <main
      className={cn(
        "min-h-screen",
        theme.colors.surfacePageSubtle,
        theme.colors.textStrong,
      )}
    >
      {/* HERO */}
      <section className="px-8 pt-28 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 font-mono text-xs font-bold tracking-[0.35em] text-indigo-500 uppercase">
            System Architecture
          </div>

          <h1 className="max-w-5xl text-6xl leading-[1.02] font-black tracking-tight">
            From operational pressure to reusable execution architecture.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-500">
            This system separates semantic meaning, planning, decision logic,
            and execution so business workflows can evolve without becoming
            hardcoded, fragile, or opaque.
          </p>
        </div>
      </section>

      {/* SECTION 1: PRESSURE → RESPONSE */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="mb-4 font-mono text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">
              01 / Runtime Pressure
            </div>

            <h2 className="text-4xl font-black tracking-tight">
              Different pressures activate different layers.
            </h2>
          </div>

          <div className="mb-10 inline-flex rounded-full bg-slate-100 p-2 shadow-inner">
            {pressures.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePressure(item.id)}
                className={`rounded-full px-7 py-3 text-sm font-bold transition ${
                  activePressure === item.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            className={cn(
              "overflow-hidden border",
              theme.radius.panelLg,
              theme.colors.borderPrimary,
              theme.colors.surfacePrimary,
              theme.shadows.panel,
            )}
          >
            <div
              className={cn(
                "border-b px-10 py-10 bg-slate-50",
                theme.colors.borderMuted,
              )}
            >
              <div className="mb-4 font-mono text-xs font-bold tracking-[0.3em] text-indigo-500 uppercase">
                Business Case
              </div>

              <h3 className="max-w-5xl text-4xl leading-[1.05] font-black italic">
                {current.case}
              </h3>
            </div>

            <div className="grid lg:grid-cols-2">
              <div className="border-r border-slate-100 p-10">
                <div className="mb-6 font-mono text-xs font-bold tracking-[0.3em] text-rose-500 uppercase">
                  Runtime Pressure
                </div>

                <div className="min-h-[260px] rounded-3xl border border-rose-100 bg-rose-50/50 p-8">
                  <div className="mb-6 font-mono text-sm tracking-[0.2em] text-rose-500 uppercase">
                    System starts bending
                  </div>

                  <p className="text-2xl leading-10 font-bold text-slate-900">
                    {current.pressure}
                  </p>
                </div>
              </div>

              <div className="bg-[#061614] p-10 text-white">
                <div className="mb-6 font-mono text-xs font-bold tracking-[0.3em] text-emerald-400 uppercase">
                  Architecture Response
                </div>

                <div className="min-h-[260px] rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8">
                  <current.icon className="mb-6 text-emerald-400" size={30} />

                  <div className="mb-5 inline-flex rounded-full bg-emerald-500/10 px-4 py-2 font-mono text-xs tracking-[0.25em] text-emerald-400 uppercase">
                    {current.layer}
                  </div>

                  <p className="text-2xl leading-10 font-bold text-emerald-50">
                    {current.response}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATIC ARCHITECTURE */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <div className="mb-4 font-mono text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">
              02 / Static Architecture
            </div>

            <h2 className="text-4xl font-black tracking-tight">
              The system is separated into four core layers.
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-500">
              Each layer owns a different responsibility so business logic,
              planning, and execution do not collapse into one hardcoded
              workflow.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {layers.map((layer, index) => (
              <div
                key={layer.name}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 font-mono text-white">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-black tracking-tight">
                  {layer.name}
                </h3>

                <p className="mt-5 leading-7 text-slate-600">{layer.role}</p>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs leading-6 text-slate-500">
                  {layer.examples}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: RUNTIME FLOW */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <div className="mb-4 font-mono text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">
              03 / Runtime Lifecycle
            </div>

            <h2 className="text-4xl font-black tracking-tight">
              At runtime, the system turns a request into traceable execution.
            </h2>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200 bg-slate-950 p-10 text-white">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-9">
              {runtimeSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 lg:flex-col">
                  <div className="flex min-h-[86px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center text-sm font-bold">
                    {step}
                  </div>

                  {index < runtimeSteps.length - 1 && (
                    <ArrowDown
                      className="hidden rotate-[-90deg] text-emerald-400 lg:block"
                      size={18}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: USE CASE PROJECTION */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <div className="mb-4 font-mono text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">
              04 / Operational Projection
            </div>

            <h2 className="text-4xl font-black tracking-tight">
              The same architecture projects into different business systems.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {projections.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8"
              >
                <h3 className="text-3xl font-black tracking-tight">
                  {item.title}
                </h3>

                <div className="mt-8 space-y-4">
                  {item.mapping.map((m) => (
                    <div
                      key={m}
                      className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ROADMAP */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <div className="mb-4 font-mono text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">
              05 / Roadmap Extensions
            </div>

            <h2 className="text-4xl font-black tracking-tight">
              The architecture is designed to support future runtime extensions.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {roadmap.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-7"
              >
                <item.icon className="mb-6 text-indigo-500" size={28} />

                <h3 className="text-2xl font-black tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-slate-500">
                  {item.desc}
                </p>

                <div className="mt-6 inline-flex rounded-full bg-indigo-50 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-indigo-500 uppercase">
                  Roadmap
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
