"use client";

import React, { useMemo, useState } from "react";
import { ChevronRight, CheckCircle2, Layers3, Activity } from "lucide-react";

/**
 * LAYERS
 */

const runtimeLayers = [
  {
    id: "semantic",
    num: "01",
    title: "Semantic Layer",
    desc: "Unify operational meaning across runtime systems.",
  },
  {
    id: "planning",
    num: "02",
    title: "Planning Layer",
    desc: "Resolve runtime dependencies and execution paths.",
  },
  {
    id: "policy",
    num: "03",
    title: "Policy Layer",
    desc: "Evaluate business rules before execution continues.",
  },
  {
    id: "execution",
    num: "04",
    title: "Execution Layer",
    desc: "Orchestrate tools, services, and runtime actions.",
  },
];

/**
 * SYSTEMS
 * Each bullet declares which layer(s) it belongs to.
 */

const stabilitySystems = [
  {
    id: "contract",
    title: "Contract System",
    badge: "LINKED",

    points: [
      {
        label: "Structured DTO Contracts",
        layers: ["semantic", "policy"],
      },
      {
        label: "Tool Interface Schemas",
        layers: ["semantic", "planning"],
      },
      {
        label: "Runtime Boundary Definitions",
        layers: ["semantic"],
      },
      {
        label: "Structured LLM Outputs",
        layers: ["policy"],
      },
    ],
  },

  {
    id: "validation",
    title: "Validation System",
    badge: "ACTIVE",

    points: [
      {
        label: "Syntax Validation",
        layers: ["policy"],
      },
      {
        label: "Dependency Validation",
        layers: ["planning"],
      },
      {
        label: "Runtime Parameter Checks",
        layers: ["execution"],
      },
      {
        label: "Structure Validation",
        layers: ["semantic", "policy"],
      },
    ],
  },

  {
    id: "registry",
    title: "Tool Registry",
    badge: "ACTIVE",

    points: [
      {
        label: "Structured Tool Discovery",
        layers: ["semantic"],
      },
      {
        label: "Execution Capability Mapping",
        layers: ["planning"],
      },
      {
        label: "Runtime Tool Routing",
        layers: ["execution"],
      },
      {
        label: "Requires / Provides Resolution",
        layers: ["planning"],
      },
    ],
  },

  {
    id: "observability",
    title: "Observability",
    badge: "TRACE",

    points: [
      {
        label: "Execution Trace Timeline",
        layers: ["execution"],
      },
      {
        label: "Runtime Decision Path",
        layers: ["policy"],
      },
      {
        label: "Tool Execution Logs",
        layers: ["execution"],
      },
      {
        label: "Runtime State Visibility",
        layers: ["planning", "execution"],
      },
    ],
  },
];

export default function Page() {
  /**
   * VIEW
   */

  const [viewMode, setViewMode] = useState<"core" | "expanded">("core");

  /**
   * ACTIVE LAYER
   */

  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  /**
   * CLICK LAYER
   */

  function handleLayerClick(layerId: string) {
    setActiveLayer(layerId);
    setViewMode("expanded");
  }

  /**
   * CORE VIEW
   */

  function handleCoreView() {
    setViewMode("core");
    setActiveLayer(null);
  }

  /**
   * EXPANDED VIEW
   */

  function handleExpandedView() {
    setViewMode("expanded");
  }

  /**
   * ACTIVE LAYER DATA
   */

  const activeLayerData = useMemo(() => {
    return runtimeLayers.find((layer) => layer.id === activeLayer);
  }, [activeLayer]);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* GRID */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.045]" />

      {/* AMBIENT */}
      <div className="pointer-events-none fixed top-[-120px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />

      <section className="relative overflow-hidden px-8 py-16">
        <div className="mx-auto max-w-[1450px]">
          {/* HEADER */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 text-[11px] font-bold tracking-[0.22em] text-indigo-400 uppercase">
                Section 03 // Infrastructure
              </div>

              <h1 className="text-5xl font-semibold tracking-[-0.05em] text-white">
                Architecture Layers
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
                AI execution becomes unreliable when runtime structure is
                missing.
              </p>
            </div>

            {/* TOGGLE */}
            <div className="flex rounded-2xl border border-white/10 bg-white/[0.03] p-1">
              <button
                onClick={handleCoreView}
                className={`rounded-xl px-5 py-2 text-sm transition-all duration-300 ${
                  viewMode === "core"
                    ? "border border-indigo-400/20 bg-indigo-500/10 font-medium text-indigo-200"
                    : "text-slate-500"
                } `}
              >
                Core Runtime
              </button>

              <button
                onClick={handleExpandedView}
                className={`rounded-xl px-5 py-2 text-sm transition-all duration-300 ${
                  viewMode === "expanded"
                    ? "border border-indigo-400/20 bg-indigo-500/10 font-medium text-indigo-200"
                    : "text-slate-500"
                } `}
              >
                Expanded Runtime View
              </button>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* MAIN AREA */}
          <div
            className={`mt-16 grid items-start gap-14 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              viewMode === "core" ? "grid-cols-1" : "lg:grid-cols-[540px_1fr]"
            } `}
          >
            {/* LEFT */}
            <div
              className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                viewMode === "core" ? "mx-auto max-w-[620px]" : "translate-x-0"
              } `}
            >
              <div
                className={`mb-6 flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-indigo-400 uppercase ${
                  viewMode === "core" ? "justify-center" : ""
                } `}
              >
                <div className="h-2 w-2 rounded-full bg-indigo-400" />
                Core Runtime Spine
              </div>

              <div className="space-y-5">
                {runtimeLayers.map((layer, idx) => {
                  const active = activeLayer === layer.id;

                  return (
                    <div key={layer.id}>
                      <button
                        onClick={() => handleLayerClick(layer.id)}
                        className={`group relative w-full rounded-3xl border transition-all duration-500 ${
                          active
                            ? "border-indigo-400/40 bg-indigo-500/[0.08]"
                            : "border-white/10 bg-white/[0.025] hover:bg-white/[0.04]"
                        } `}
                      >
                        <div className="flex items-start justify-between px-6 py-5">
                          <div
                            className={
                              viewMode === "core"
                                ? "mx-auto text-center"
                                : "text-left"
                            }
                          >
                            <div
                              className={`flex items-center gap-3 ${
                                viewMode === "core" ? "justify-center" : ""
                              } `}
                            >
                              <span className="font-mono text-xs text-slate-500">
                                {layer.num}
                              </span>

                              <span className="text-2xl font-medium tracking-[-0.03em] text-white">
                                {layer.title}
                              </span>
                            </div>

                            {(viewMode === "core" || active) && (
                              <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
                                {layer.desc}
                              </p>
                            )}
                          </div>

                          {viewMode === "expanded" && (
                            <ChevronRight
                              className={`mt-1 h-5 w-5 transition ${
                                active ? "text-indigo-300" : "text-slate-600"
                              } `}
                            />
                          )}
                        </div>
                      </button>

                      {/* CONNECTOR */}
                      {idx < runtimeLayers.length - 1 && (
                        <div className="flex justify-center py-2">
                          <div className="h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT */}
            <div
              className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                viewMode === "core"
                  ? "pointer-events-none translate-x-16 opacity-0"
                  : "translate-x-0 opacity-100"
              } `}
            >
              <div className="mb-6 flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-indigo-400 uppercase">
                <Layers3 className="h-4 w-4" />
                Runtime Stability Systems
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {stabilitySystems.map((system) => {
                  return (
                    <div
                      key={system.id}
                      className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-500"
                    >
                      {/* HEADER */}
                      <div className="flex items-start justify-between">
                        <h3 className="text-2xl font-medium tracking-[-0.03em] text-white">
                          {system.title}
                        </h3>

                        <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold tracking-[0.18em] text-emerald-300 uppercase">
                          {system.badge}
                        </div>
                      </div>

                      {/* BULLETS */}
                      <div className="mt-6 space-y-3">
                        {system.points.map((point) => {
                          /**
                           * CORE VIEW
                           */

                          const isCoreView =
                            viewMode === "expanded" && !activeLayer;

                          /**
                           * ACTIVE
                           */

                          const active =
                            activeLayer && point.layers.includes(activeLayer);

                          /**
                           * INACTIVE
                           */

                          const inactive =
                            activeLayer && !point.layers.includes(activeLayer);

                          return (
                            <div
                              key={point.label}
                              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                                isCoreView ? "text-slate-400" : ""
                              } ${active ? "text-white" : ""} ${
                                inactive ? "text-slate-700" : ""
                              } `}
                            >
                              <div
                                className={`h-1.5 w-1.5 rounded-full transition-all ${
                                  isCoreView ? "bg-slate-500" : ""
                                } ${
                                  active
                                    ? "bg-emerald-400 shadow-[0_0_10px_#34d399]"
                                    : ""
                                } ${inactive ? "bg-slate-700" : ""} `}
                              />

                              <span>{point.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SNAPSHOT */}
              {activeLayerData && (
                <div className="mt-8 rounded-[28px] border border-indigo-400/15 bg-indigo-500/[0.04] p-7 transition-all duration-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-indigo-300" />

                      <div className="text-[11px] font-bold tracking-[0.22em] text-indigo-300 uppercase">
                        Runtime Snapshot
                      </div>
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400">
                      {activeLayerData.title}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <div className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                        Responsibility
                      </div>

                      <div className="mt-3 text-base leading-relaxed text-white">
                        {activeLayerData.desc}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <div className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                        Runtime State
                      </div>

                      <div className="mt-3 flex items-center gap-3 text-base text-emerald-300">
                        <CheckCircle2 className="h-5 w-5" />
                        Deterministic orchestration active
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
