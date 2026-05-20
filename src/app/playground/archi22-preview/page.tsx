"use client";

import React, { useState } from "react";

// TypeScript types for perfect compilation and strict static typing
interface IconProps {
  className?: string;
}

interface LayerDetails {
  responsibility: string;
  pressure: string;
  current: string;
  future: string;
}

interface CoreLayer {
  id: string;
  title: string;
  responsibility: string;
  details: LayerDetails;
  associations: string[]; // Linked system IDs
}

interface StabilitySystem {
  id: string;
  title: string;
  narrative: string;
  items: string[];
}

interface HighlightMapping {
  strongSystems: string[];
  weakSystems: string[];
  highlightedItems: string[];
}

// Pure SVG Chevron to keep the file fully self-contained without external icon dependencies
const ChevronIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function Page() {
  const [viewMode, setViewMode] = useState<"core" | "expanded">("expanded");
  const [activeLayer, setActiveLayer] = useState<string>("planning");

  const coreLayers: CoreLayer[] = [
    {
      id: "semantic",
      title: "Semantic Layer",
      responsibility: "Unify operational meaning across runtime systems.",
      details: {
        responsibility: "Unify operational meaning across runtime systems.",
        pressure:
          "Business semantics fragment as systems evolve independently.",
        current:
          "Ontology nodes, entity mapping, and semantic runtime contracts.",
        future: "Retrieval-aware semantic resolution.",
      },
      associations: ["contract", "validation"],
    },
    {
      id: "planning",
      title: "Planning Layer",
      responsibility: "Resolve runtime dependencies and execution paths.",
      details: {
        responsibility: "Resolve execution dependencies dynamically.",
        pressure:
          "Operational workflows become difficult to hardcode as dependency graphs grow.",
        current:
          "DFS-based dependency planning using requires/provides relations.",
        future: "Conditional routing and adaptive execution graphs.",
      },
      associations: ["registry", "validation", "contract"],
    },
    {
      id: "policy",
      title: "Policy Layer",
      responsibility: "Evaluate business rules before execution continues.",
      details: {
        responsibility: "Evaluate business rules before execution continues.",
        pressure: "Business rules evolve faster than execution infrastructure.",
        current: "Policy isolation through structured PolicyResult DTOs.",
        future: "Context-aware runtime policy evaluation.",
      },
      associations: ["contract", "validation", "observability"],
    },
    {
      id: "execution",
      title: "Execution Layer",
      responsibility: "Orchestrate tools, services, and runtime actions.",
      details: {
        responsibility: "Orchestrate tools, services, and runtime actions.",
        pressure:
          "Execution becomes difficult to trace across distributed runtime systems.",
        current: "Structured tool execution with audit trace emission.",
        future: "Adaptive operational execution orchestration.",
      },
      associations: ["observability", "registry"],
    },
  ];

  const stabilitySystems: StabilitySystem[] = [
    {
      id: "contract",
      title: "Contract System",
      narrative:
        "This system defines structured runtime boundaries between layers.",
      items: [
        "Structured DTO Contracts",
        "Tool Interface Schemas",
        "Runtime Boundary Definitions",
        "Structured LLM Outputs",
      ],
    },
    {
      id: "validation",
      title: "Validation System",
      narrative:
        "This system constrains unstable runtime behavior before execution continues.",
      items: [
        "Syntax Validation",
        "Structure Validation",
        "Dependency Validation",
        "Runtime Parameter Checks",
      ],
    },
    {
      id: "registry",
      title: "Tool Registry",
      narrative:
        "This system supports runtime orchestration and dependency-aware execution planning.",
      items: [
        "Structured Tool Discovery",
        "Execution Capability Mapping",
        "Runtime Tool Routing",
        "Requires / Provides Resolution",
      ],
    },
    {
      id: "observability",
      title: "Observability System",
      narrative:
        "This system makes runtime execution traceable and debuggable.",
      items: [
        "Execution Trace Timeline",
        "Runtime Decision Path",
        "Tool Execution Logs",
        "Runtime State Visibility",
      ],
    },
  ];

  const highlightsMap: Record<string, HighlightMapping> = {
    semantic: {
      strongSystems: ["contract"],
      weakSystems: ["validation"],
      highlightedItems: [
        "Structured DTO Contracts",
        "Runtime Boundary Definitions",
        "Structure Validation",
      ],
    },
    planning: {
      strongSystems: ["registry", "validation"],
      weakSystems: ["contract"],
      highlightedItems: [
        "Execution Capability Mapping",
        "Requires / Provides Resolution",
        "Dependency Validation",
        "Runtime Parameter Checks",
        "Tool Interface Schemas",
      ],
    },
    policy: {
      strongSystems: ["contract", "validation"],
      weakSystems: ["observability"],
      highlightedItems: [
        "Structured DTO Contracts",
        "Structured LLM Outputs",
        "Structure Validation",
        "Runtime Parameter Checks",
        "Runtime Decision Path",
      ],
    },
    execution: {
      strongSystems: ["observability"],
      weakSystems: ["registry"],
      highlightedItems: [
        "Execution Trace Timeline",
        "Tool Execution Logs",
        "Runtime State Visibility",
        "Runtime Tool Routing",
      ],
    },
  };

  const activeHighlights = highlightsMap[activeLayer] || {
    strongSystems: [],
    weakSystems: [],
    highlightedItems: [],
  };

  const activeLayerData =
    coreLayers.find((l) => l.id === activeLayer) || coreLayers[1];

  return (
    <section className="w-full overflow-hidden bg-[#090A0C] px-6 py-24 font-sans text-[#E4E6EB] selection:bg-blue-500/30 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 border-b border-[#1F242C] pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 font-mono text-xs font-semibold tracking-[0.2em] text-blue-500 uppercase">
              SECTION 03 // INFRASTRUCTURE
            </div>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Runtime Architecture
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-[#8C96A5]">
              AI execution becomes unreliable when runtime structure is missing.
            </p>
          </div>

          {/* Runtime View Toggle Component */}
          <div className="flex items-center self-start lg:self-auto">
            <div className="flex space-x-1 rounded-lg border border-[#222832] bg-[#13161C] p-1 shadow-inner">
              <button
                onClick={() => setViewMode("core")}
                className={`rounded-md px-4 py-2 font-mono text-xs tracking-wide transition-all duration-200 ${
                  viewMode === "core"
                    ? "bg-[#1F242C] font-semibold text-white shadow-sm"
                    : "text-[#626E7F] hover:text-[#A3AFBF]"
                }`}
              >
                [ Core Runtime ]
              </button>
              <button
                onClick={() => setViewMode("expanded")}
                className={`rounded-md px-4 py-2 font-mono text-xs tracking-wide transition-all duration-200 ${
                  viewMode === "expanded"
                    ? "border border-blue-500/30 bg-blue-950/40 font-semibold text-blue-400 shadow-sm"
                    : "text-[#626E7F] hover:text-[#A3AFBF]"
                }`}
              >
                [ Expanded Runtime View ]
              </button>
            </div>
          </div>
        </div>

        {/* Dual-Column Interactive Map */}
        <div className="relative grid min-h-[520px] grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* LEFT SIDE: CORE RUNTIME SPINE (5 Columns) */}
          <div className="relative z-10 space-y-4 lg:col-span-5">
            <div className="mb-4 flex items-center font-mono text-[10px] tracking-[0.15em] text-[#626E7F] uppercase">
              <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"></span>
              Core Runtime Spine
            </div>

            {coreLayers.map((layer, index) => {
              const isActive = activeLayer === layer.id;
              const isAssociated = viewMode === "expanded" && isActive;

              return (
                <div key={layer.id} className="relative">
                  {/* Layer Block Card */}
                  <div
                    onClick={() => setActiveLayer(layer.id)}
                    className={`group relative w-full cursor-pointer rounded-xl border p-5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-blue-500/50 bg-[#121620] shadow-[0_0_25px_rgba(59,130,246,0.06)]"
                        : "border-[#1F242C] bg-[#0D1015] hover:border-[#313946] hover:bg-[#11141A]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`font-mono text-xs ${isActive ? "text-blue-400" : "text-[#4A5565]"}`}
                          >
                            0{index + 1}
                          </span>
                          <h3
                            className={`text-base font-medium tracking-tight transition-colors ${isActive ? "text-white" : "text-[#D1D5DB] group-hover:text-white"}`}
                          >
                            {layer.title}
                          </h3>
                        </div>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed font-normal text-[#8C96A5]">
                          {layer.responsibility}
                        </p>
                      </div>
                      <div
                        className={`mt-0.5 transition-transform duration-300 ${isActive ? "rotate-90 text-blue-400" : "text-[#4A5565] group-hover:text-[#8C96A5]"}`}
                      >
                        <ChevronIcon className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Left Active indicator bar */}
                    <div
                      className={`absolute top-1/4 bottom-1/4 left-0 w-[2px] rounded-r transition-all duration-300 ${
                        isActive
                          ? "scale-100 bg-blue-500"
                          : "scale-0 bg-transparent"
                      }`}
                    />
                  </div>

                  {/* Flow Arrow Connector between blocks */}
                  {index < coreLayers.length - 1 && (
                    <div className="my-0.5 flex h-4 items-center justify-center">
                      <div className="h-full w-[1px] bg-gradient-to-b from-[#1F242C] to-[#1F242C]" />
                      <svg
                        className="absolute h-2 w-2 text-[#2E3746]"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <path d="M4 7L0 3h8L4 7z" />
                      </svg>
                    </div>
                  )}

                  {/* Dynamic Runtime Connection Links */}
                  {isAssociated && (
                    <div className="pointer-events-none absolute top-1/2 left-full z-0 hidden h-[2px] w-[calc(140%+3rem)] lg:block">
                      <div className="relative h-full w-full border-t border-dashed border-blue-500/20">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent blur-sm" />
                        <div className="absolute top-[-1px] right-0 h-1.5 w-1.5 rounded-full bg-blue-500/60" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CENTER DIVISION SPACE */}
          <div className="hidden h-full min-h-[380px] items-center justify-center lg:col-span-1 lg:flex">
            <div className="relative h-3/4 w-[1px] bg-gradient-to-b from-[#1F242C] via-[#313946] to-transparent">
              {viewMode === "expanded" && (
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 rounded border border-blue-500/20 bg-[#13161C] px-2 py-0.5 font-mono text-[9px] tracking-wider whitespace-nowrap text-blue-400/80 uppercase shadow-md">
                  Boundaries Active
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: RUNTIME STABILITY SYSTEMS */}
          <div className="relative space-y-4 transition-all duration-500 lg:col-span-6">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.15em] text-[#626E7F] uppercase">
              <span>Runtime Stability Systems</span>
              {viewMode === "core" && (
                <span className="text-[9px] text-[#4A5565] lowercase italic">
                  (Toggle Expanded View to show connections)
                </span>
              )}
            </div>

            <div
              className={`grid grid-cols-1 gap-4 transition-all duration-300 sm:grid-cols-2 ${
                viewMode === "core"
                  ? "pointer-events-none opacity-20 mix-blend-luminosity select-none"
                  : "opacity-100"
              }`}
            >
              {stabilitySystems.map((system) => {
                const isStrong = activeHighlights.strongSystems.includes(
                  system.id,
                );
                const isWeak = activeHighlights.weakSystems.includes(system.id);
                const isLinked = isStrong || isWeak;

                return (
                  <div
                    key={system.id}
                    className={`relative rounded-xl border bg-[#0D1015] p-5 transition-all duration-300 ${
                      isLinked
                        ? isStrong
                          ? "border-emerald-500/45 bg-[#0e1412] shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                          : "border-[#2D333D] shadow-sm"
                        : "border-[#1F242C] opacity-40"
                    }`}
                  >
                    <div className="mb-3 flex flex-col">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm font-semibold tracking-tight transition-colors ${
                            isLinked
                              ? isStrong
                                ? "text-emerald-400"
                                : "text-emerald-500/70"
                              : "text-[#A3AFBF]"
                          }`}
                        >
                          {system.title}
                        </h4>
                        {isLinked && (
                          <span
                            className={`rounded px-1.5 py-0.5 font-mono text-[8px] uppercase ${
                              isStrong
                                ? "border border-emerald-500/20 bg-emerald-950/50 text-emerald-400"
                                : "bg-[#181C24] text-[#626E7F]"
                            }`}
                          >
                            {isStrong ? "Active" : "Linked"}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 line-clamp-2 text-[10px] text-[#626E7F]">
                        {system.narrative}
                      </p>
                    </div>

                    <ul className="mt-3 space-y-2 border-t border-[#1C2027] pt-3">
                      {system.items.map((item, i) => {
                        const isBulletHighlighted =
                          isLinked &&
                          activeHighlights.highlightedItems.includes(item);
                        return (
                          <li
                            key={i}
                            className="flex items-center space-x-2 text-xs"
                          >
                            <span
                              className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                                isBulletHighlighted
                                  ? "scale-125 bg-emerald-400 shadow-[0_0_4px_#34d399]"
                                  : "bg-[#2E3541]"
                              }`}
                            />
                            <span
                              className={`font-mono text-[11px] transition-colors duration-300 ${
                                isBulletHighlighted
                                  ? "font-medium text-[#E4E6EB]"
                                  : "text-[#626E7F]"
                              }`}
                            >
                              {item}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SYNCHRONIZED LAYER DETAIL TABS */}
        <div className="relative mt-16 overflow-hidden rounded-xl border border-[#1F242C] bg-[#0D1015] shadow-2xl">
          {/* Top Banner Accent */}
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-500/40 via-emerald-500/20 to-transparent" />

          {/* Header and Integrated Tab Controls */}
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#1F242C] bg-[#0A0D11] px-6 py-4 md:flex-row md:items-center">
            <span className="flex items-center font-mono text-xs tracking-widest text-[#626E7F] uppercase">
              <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"></span>
              Synchronized Controller Spec
            </span>

            {/* Tab Selectors Segmented Box */}
            <div className="flex w-full scrollbar-none overflow-x-auto rounded-lg border border-[#1F242C] bg-[#121620] p-0.5 whitespace-nowrap md:w-auto">
              {coreLayers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs transition-all ${
                    activeLayer === layer.id
                      ? "border border-blue-500/25 bg-blue-950/60 font-semibold text-blue-400"
                      : "text-[#626E7F] hover:text-[#A3AFBF]"
                  }`}
                >
                  {layer.title}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Structured Spec Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <div className="space-y-2">
                <div className="border-b border-[#1C2027] pb-1.5 font-mono text-[10px] tracking-wider text-[#626E7F] uppercase">
                  1. Runtime Responsibility
                </div>
                <p className="text-xs leading-relaxed text-[#D1D5DB]">
                  {activeLayerData.details.responsibility}
                </p>
              </div>

              <div className="space-y-2">
                <div className="border-b border-[#1C2027] pb-1.5 font-mono text-[10px] tracking-wider text-amber-500/70 uppercase">
                  2. Runtime Pressure
                </div>
                <p className="text-xs leading-relaxed text-[#8C96A5]">
                  {activeLayerData.details.pressure}
                </p>
              </div>

              <div className="space-y-2">
                <div className="border-b border-[#1C2027] pb-1.5 font-mono text-[10px] tracking-wider text-blue-400/80 uppercase">
                  3. Current Implementation
                </div>
                <div className="flex min-h-[56px] items-center rounded-lg border border-[#1F2532] bg-[#13171F] p-3 font-mono text-[11px] leading-normal text-[#A3AFBF]">
                  {activeLayerData.details.current}
                </div>
              </div>

              <div className="space-y-2">
                <div className="border-b border-[#1C2027] pb-1.5 font-mono text-[10px] tracking-wider text-emerald-500/70 uppercase">
                  4. Future Extensions
                </div>
                <div className="flex min-h-[56px] items-center rounded-lg border border-[#251F32] bg-[#15131C] p-3 font-mono text-[11px] leading-normal text-[#A3AFBF]">
                  {activeLayerData.details.future}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Deep-Dive Insights Footer */}
        <div className="mt-12 grid grid-cols-1 gap-6 px-2 font-mono text-xs text-[#626E7F] md:grid-cols-3">
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">[✓]</span>
            <span>
              Unconstrained conversational prompt interfaces fail standard
              corporate compliance. Structure-driven runtimes enforce logical
              integrity.
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">[✓]</span>
            <span>
              Isolated state layers guarantee 100% downstream auditability,
              transforming probabilistic models into repeatable, stable
              components.
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">[✓]</span>
            <span>
              By treating stability mechanisms as continuous validation
              boundaries rather than static post-processing stages, runtime
              latency is minimized.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
