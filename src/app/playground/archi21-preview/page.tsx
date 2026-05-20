"use client";

import { useMemo, useState } from "react";
import {
  Layers3,
  GitBranch,
  ShieldCheck,
  ScrollText,
  Box,
  Eye,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Route,
} from "lucide-react";

type RuntimeLayer = {
  id: string;
  title: string;
  responsibility: string;
  pressure: string;
  implementation: string;
  future: string;
};

const layers: RuntimeLayer[] = [
  {
    id: "semantic",
    title: "Semantic Layer",
    responsibility: "Unify operational meaning across runtime systems.",
    pressure:
      "Business entities drift across prompts, tools, DTOs, and services.",
    implementation:
      "Centralized semantic contracts and shared runtime entities.",
    future:
      "Ontology-driven runtime reasoning and semantic dependency resolution.",
  },
  {
    id: "planning",
    title: "Planning Layer",
    responsibility: "Resolve runtime dependencies and execution paths.",
    pressure:
      "Execution flows become impossible to hardcode as dependencies grow.",
    implementation:
      "DFS-based dependency planning using requires/provides relations.",
    future: "Conditional routing and adaptive execution graph generation.",
  },
  {
    id: "policy",
    title: "Policy Layer",
    responsibility: "Evaluate business rules before execution continues.",
    pressure: "Business rules gradually leak into orchestration services.",
    implementation:
      "Policy isolation through reusable decision evaluation layers.",
    future: "Composable runtime policy engines with adaptive risk controls.",
  },
  {
    id: "execution",
    title: "Execution Layer",
    responsibility: "Orchestrate tools, services, and runtime actions.",
    pressure:
      "Execution reliability degrades as orchestration complexity grows.",
    implementation:
      "Structured runtime execution with controlled tool invocation.",
    future:
      "Distributed execution orchestration and long-running runtime workflows.",
  },
];

const runtimeSystems = [
  {
    icon: ShieldCheck,
    title: "Contract System",
    points: [
      "DTO Contracts",
      "Tool Schemas",
      "Structured Outputs",
      "Single Source of Truth",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Validation System",
    points: [
      "Syntax Validation",
      "Structure Validation",
      "Dependency Validation",
      "Runtime Parameter Validation",
    ],
  },
  {
    icon: Eye,
    title: "Observability System",
    points: ["Audit Trace", "Runtime Timeline", "Tool Logs", "Runtime State"],
  },
  {
    icon: Box,
    title: "Tool Registry",
    points: [
      "Tool Discovery",
      "Execution Routing",
      "Runtime Orchestration",
      "Capability Resolution",
    ],
  },
];

export default function RuntimeArchitectureSection() {
  const [expanded, setExpanded] = useState(false);

  const [activeLayer, setActiveLayer] = useState<RuntimeLayer>(layers[1]);

  const detail = useMemo(() => activeLayer, [activeLayer]);

  return (
    <section className="relative overflow-hidden bg-[#071018] px-6 py-28 text-white">
      {/* ambient */}
      <div className="pointer-events-none absolute top-[-120px] left-[10%] h-[520px] w-[520px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />

      <div className="pointer-events-none absolute right-[-120px] bottom-[-120px] h-[420px] w-[420px] rounded-full bg-indigo-500/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.05] px-4 py-2 font-mono text-[11px] font-bold tracking-[0.25em] text-cyan-300 uppercase">
              <Sparkles size={12} />
              Runtime Architecture
            </div>

            <h2 className="max-w-4xl text-5xl leading-[1.02] font-black tracking-tight text-white lg:text-6xl">
              Enterprise AI requires runtime structure,
              <span className="text-cyan-300"> not pure chat interfaces.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Runtime execution must remain structured, observable, validated,
              and policy-constrained as operational complexity increases.
            </p>
          </div>

          {/* toggle */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-1">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setExpanded(false)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                  !expanded
                    ? "bg-white text-slate-900"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Core Runtime
              </button>

              <button
                onClick={() => setExpanded(true)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                  expanded
                    ? "bg-cyan-400 text-slate-900"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Expanded Runtime View
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN PANEL */}
        {/* ========================================================= */}

        <div className="relative mt-16 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] backdrop-blur-3xl">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            {/* ========================================================= */}
            {/* LEFT SIDE */}
            {/* ========================================================= */}

            <div className="relative border-b border-white/10 p-10 lg:border-r lg:border-b-0 lg:p-14">
              {/* title */}
              <div className="mb-10 flex items-center gap-3">
                <Layers3 size={18} className="text-cyan-300" />

                <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-cyan-300 uppercase">
                  Core Runtime Spine
                </div>
              </div>

              {/* runtime spine */}
              <div className="relative mx-auto flex max-w-[540px] flex-col gap-7">
                {/* vertical line */}
                <div className="pointer-events-none absolute top-10 bottom-10 left-[50%] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/0 via-cyan-400/30 to-cyan-400/0" />

                {layers.map((layer, index) => {
                  const active = activeLayer.id === layer.id;

                  return (
                    <div key={layer.id}>
                      <button
                        onClick={() => setActiveLayer(layer)}
                        className={`group relative w-full overflow-hidden rounded-3xl border p-7 text-left transition-all duration-300 ${
                          active
                            ? "border-cyan-400/40 bg-cyan-400/[0.08] shadow-[0_20px_60px_-20px_rgba(34,211,238,0.35)]"
                            : "border-white/10 bg-white/[0.03] hover:border-cyan-400/20 hover:bg-white/[0.05]"
                        }`}
                      >
                        {/* glow */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative z-10 flex items-start justify-between gap-6">
                          <div>
                            <div className="font-mono text-[10px] font-bold tracking-[0.25em] text-cyan-300 uppercase">
                              Layer {index + 1}
                            </div>

                            <div className="mt-2 text-2xl font-black tracking-tight">
                              {layer.title}
                            </div>

                            <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                              {layer.responsibility}
                            </p>
                          </div>

                          <div
                            className={`mt-2 rounded-full border p-2 transition-all ${
                              active
                                ? "border-cyan-400/40 bg-cyan-400/10"
                                : "border-white/10 bg-white/[0.03]"
                            }`}
                          >
                            <ArrowRight
                              size={16}
                              className={`transition-transform ${
                                active
                                  ? "translate-x-0.5 text-cyan-300"
                                  : "text-slate-500"
                              }`}
                            />
                          </div>
                        </div>
                      </button>

                      {index !== layers.length - 1 && (
                        <div className="flex justify-center py-3">
                          <div className="h-8 w-px border-l border-dashed border-cyan-400/20" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT SIDE */}
            {/* ========================================================= */}

            <div className="relative p-10 lg:p-14">
              {/* title */}
              <div className="mb-10 flex items-center gap-3">
                <ShieldCheck size={18} className="text-emerald-300" />

                <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-emerald-300 uppercase">
                  Runtime Stability Systems
                </div>
              </div>

              {/* subtle connection */}
              <div className="pointer-events-none absolute top-[180px] left-0 hidden h-px w-24 bg-gradient-to-r from-cyan-400/20 to-transparent lg:block" />

              <div
                className={`space-y-5 transition-all duration-500 ${
                  expanded
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-50"
                }`}
              >
                {runtimeSystems.map((system) => {
                  const Icon = system.icon;

                  return (
                    <div
                      key={system.title}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-emerald-400/20 hover:bg-white/[0.05]"
                    >
                      {/* glow */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-400/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] p-3">
                            <Icon size={18} className="text-emerald-300" />
                          </div>

                          <div>
                            <div className="text-lg font-bold">
                              {system.title}
                            </div>

                            <div className="mt-1 text-sm text-slate-400">
                              Runtime stabilization boundary
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-2">
                          {system.points.map((point) => (
                            <div
                              key={point}
                              className="rounded-xl border border-white/5 bg-black/20 px-3 py-2 text-xs font-medium text-slate-300"
                            >
                              {point}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* DETAIL PANEL */}
          {/* ========================================================= */}

          <div className="border-t border-white/10 bg-black/20 px-10 py-10 lg:px-14">
            <div className="mb-8 flex items-center gap-3">
              <Route size={18} className="text-cyan-300" />

              <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-cyan-300 uppercase">
                Layer Runtime Detail
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-4">
              <DetailCard
                title="Runtime Responsibility"
                content={detail.responsibility}
              />

              <DetailCard title="Runtime Pressure" content={detail.pressure} />

              <DetailCard
                title="Current Implementation"
                content={detail.implementation}
              />

              <DetailCard title="Future Extensions" content={detail.future} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="font-mono text-[10px] font-bold tracking-[0.22em] text-cyan-300 uppercase">
        {title}
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-300">{content}</p>
    </div>
  );
}
