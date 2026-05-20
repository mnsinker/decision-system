"use client";

import React, { useState } from "react";
import {
  GitBranch,
  Layers,
  Boxes,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Fingerprint,
  Cpu,
  CornerDownRight,
  AlertTriangle,
} from "lucide-react";

// =========================================================================
// STRICT TYPE DEFINITIONS TO ELIMINATE TS7053 / TS2339 INDEX ERRORS
// =========================================================================

interface VulnerabilityProfile {
  title: string;
  description: string;
  mechanics: string;
}

interface SolutionProfile {
  title: string;
  subtitle: string;
  shiftTitle: string;
  shiftMsg: string;
}

interface ArchitectureModule {
  tagline: string;
  bizCase: string;
  vulnerability: VulnerabilityProfile;
  solution: SolutionProfile;
  rootCauseTitle: string;
  rootCauseMsg: string;
}

type TabKey = "context" | "topology" | "policy";

interface CoreArchitectureData {
  eyebrow: string;
  sectionTitle: string;
  label: string;
  tabs: { id: TabKey; label: string }[];
  modules: Record<TabKey, ArchitectureModule>;
}

const coreArchitectureData: CoreArchitectureData = {
  eyebrow: "Runtime Architecture Framework",
  sectionTitle: "Deterministic Execution Under Parallel Load",
  label: "Isolation Spec",
  tabs: [
    { id: "context", label: "Context Isolation" },
    { id: "topology", label: "Procedural Topology" },
    { id: "policy", label: "Policy Sandboxing" },
  ],
  modules: {
    context: {
      tagline: "Absolute State Encapsulation",
      bizCase:
        "Eliminate unpredictable multi-tenant state crossovers by mapping individual execution steps into isolated immutable memory fields.",
      vulnerability: {
        title: "Ambient Boundary Drift",
        description:
          "Concurrent model steps share implicit execution context pointers, creating unverified state overlaps during complex parallel orchestration phases.",
        mechanics:
          "A single global thread parameter pool handles state mutation instructions downstream without rigid validation boundaries.",
      },
      solution: {
        title: "Isolated Context Memory",
        subtitle:
          "Cryptographic context encapsulation via immutable state tokens",
        shiftTitle: "Cryptographic Containment",
        shiftMsg:
          "Secures runtime variables inside static execution scopes, ensuring mathematical separation between multi-tenant pipelines.",
      },
      rootCauseTitle: "Ambient Memory Coupling",
      rootCauseMsg:
        "Concurrent execution paths share dynamic environment pointers, introducing state race vectors under heavily multi-tenant orchestration steps.",
    },
    topology: {
      tagline: "Explicit Graph Engineering",
      bizCase:
        "Convert untraceable procedural code tracks into structured directed acyclic graphs for absolute deterministic testing.",
      vulnerability: {
        title: "Implicit Dependency Chains",
        description:
          "Orchestration paths pass variable weights implicitly across nested functions, creating unverified execution routes.",
        mechanics:
          "Tax evaluation, content filtering, and policy modules call internal context states directly, masking true execution lineages.",
      },
      solution: {
        title: "Declarative Topologies",
        subtitle:
          "Dynamic graph sorting compiled ahead of execution path triggers",
        shiftTitle: "Explicit DAG Resolution",
        shiftMsg:
          "Compiles all procedural references into dedicated dependency graphs, providing definitive audit lines prior to state execution.",
      },
      rootCauseTitle: "Procedural Chain Coupling",
      rootCauseMsg:
        "Downstream evaluation components fetch parameter context variables directly from unverified upstream pipelines without structural boundary verification.",
    },
    policy: {
      tagline: "Dynamic Logic Sandboxing",
      bizCase:
        "Decouple hyper-volatile business logic variations completely from baseline orchestration parameters.",
      vulnerability: {
        title: "Runtime Logic Pollution",
        description:
          "Frequent updates to parameters and user rules alter foundational code execution paths, expanding the system regression surface.",
        mechanics:
          "Dynamic adjustments are directly applied onto active orchestrator blocks, breaking core deterministic assumptions.",
      },
      solution: {
        title: "Decoupled Specification Layer",
        subtitle:
          "Layered schema sandboxing isolating operational parameters from the engine",
        shiftTitle: "Strong Interface Contracts",
        shiftMsg:
          "Ingests volatile variations exclusively through typed interface models, preserving the mathematical stability of the main execution core.",
      },
      rootCauseTitle: "Runtime Engine Pollution",
      rootCauseMsg:
        "Frequent operational rule adjustments are written directly into core state blocks, forcing continuous system regression tests across stable pipelines.",
    },
  },
};

// =========================================================================
// STRUCTURAL GRAPHICS & ABSTRACT SCHEMATICS (Fixed HTML/Unterminated Strings)
// =========================================================================

function ContextVisual() {
  return (
    <div className="mx-auto w-full max-w-sm space-y-3 py-4">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.01] p-4 shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Fingerprint size={16} className="text-emerald-400" />
          <div className="space-y-0.5">
            <span className="text-xs font-semibold tracking-tight text-white">
              tenant_session_secure
            </span>
            <span className="block font-mono text-[10px] text-slate-500">
              Scope::Encapsulated
            </span>
          </div>
        </div>
        <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400/90">
          Locked
        </span>
      </div>

      <div className="flex justify-center py-1">
        <div className="h-6 w-px bg-gradient-to-b from-emerald-500/30 to-transparent" />
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/5 bg-white/[0.01] p-4 text-xs font-medium text-slate-400">
        <div className="space-y-1">
          <span className="block font-mono text-[10px] text-slate-500 uppercase">
            Memory Allocation
          </span>
          <span className="text-slate-200">Isolated Frame</span>
        </div>
        <div className="space-y-1 border-l border-white/5 pl-4">
          <span className="block font-mono text-[10px] text-slate-500 uppercase">
            Cross Leak Probability
          </span>
          <span className="text-emerald-400">{"< 0.00001%"}</span>
        </div>
      </div>
    </div>
  );
}

function TopologyVisual() {
  return (
    <div className="mx-auto flex min-h-[160px] w-full max-w-md flex-col items-center justify-center p-4">
      <div className="relative flex w-full items-center justify-between gap-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-xs text-slate-400">
          Input Context
        </div>

        <div className="z-10 flex w-[140px] flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-[#071311] px-4 py-4 text-center shadow-lg">
          <GitBranch size={16} className="mb-1 text-emerald-400" />
          <span className="block text-[10px] font-semibold text-slate-400">
            DAG Compiler
          </span>
          <span className="mt-0.5 font-mono text-xs font-bold text-white">
            resolve_tree()
          </span>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-xs text-slate-400">
          Verified Safe Path
        </div>

        <div className="absolute inset-x-0 top-1/2 -z-0 h-px -translate-y-1/2 bg-gradient-to-r from-white/0 via-emerald-500/20 to-white/0" />
      </div>
    </div>
  );
}

function PolicyVisual() {
  return (
    <div className="mx-auto w-full max-w-sm space-y-2 py-2">
      {[
        {
          step: "1. Abstract Rule Mapping Specification",
          status: "Sandboxed",
          active: true,
        },
        {
          step: "2. Concrete Interface Serialization Model",
          status: "DTO Verified",
          active: false,
        },
        {
          step: "3. Pure Orchestration Execution Substrate",
          status: "Immutable Core",
          active: false,
        },
      ].map((layer, i) => (
        <div
          key={i}
          className={`flex items-center justify-between rounded-lg border p-3 transition-all ${
            layer.active
              ? "border-emerald-500/30 bg-emerald-500/[0.03] text-white"
              : "border-white/5 bg-white/[0.01] text-slate-400"
          }`}
        >
          <span className="text-xs font-semibold tracking-tight">
            {layer.step}
          </span>
          <span
            className={`font-mono text-[10px] font-medium ${layer.active ? "text-emerald-400" : "text-slate-500"}`}
          >
            {layer.status}
          </span>
        </div>
      ))}
    </div>
  );
}

// =========================================================================
// ENVIRONMENT CORE LAYOUT FRAMEWORKS
// =========================================================================

function PremiumNavbar() {
  return (
    <nav className="border-b border-slate-200/60 bg-white px-6 py-3.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-900 text-white">
              <Cpu size={11} />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900">
              Axiom <span className="font-normal text-slate-400">Core</span>
            </span>
          </div>
          <div className="hidden h-4 w-px bg-slate-200 sm:block" />
          <div className="hidden items-center gap-5 text-xs font-medium text-slate-500 sm:flex">
            <span className="cursor-pointer font-semibold text-slate-950">
              Systems Architecture
            </span>
            <span className="cursor-pointer transition-colors hover:text-slate-950">
              Infrastructure Spec
            </span>
            <span className="cursor-pointer transition-colors hover:text-slate-950">
              Documentation
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <span>Enterprise Core Edition</span>
        </div>
      </div>
    </nav>
  );
}

function PremiumFooter() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-white px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs font-medium text-slate-400 sm:flex-row">
        <span>
          &copy; 2026 Axiom Infrastructure Inc. Architectural standards
          formalized.
        </span>
        <span className="font-mono text-slate-300">
          Specifications v4.11 // Stable
        </span>
      </div>
    </footer>
  );
}

// =========================================================================
// ENTRYPOINT CONTROLLER
// =========================================================================

export default function ArchitectureDensitySystem() {
  const [activeTab, setActiveTab] = useState<TabKey>("context");
  const current = coreArchitectureData.modules[activeTab];

  const CurrentVisual = () => {
    if (activeTab === "context") return <ContextVisual />;
    if (activeTab === "topology") return <TopologyVisual />;
    return <PolicyVisual />;
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      <PremiumNavbar />

      {/* RESTRAINED HERO / PRESENTATION HEADER */}
      <header className="border-b border-slate-200/60 bg-white px-6 py-10">
        <div className="mx-auto max-w-4xl space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/40 bg-slate-100 px-3 py-0.5 font-mono text-[11px] font-semibold tracking-wider text-slate-600 uppercase">
            Runtime Substrate Deep-Dive
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            The Enterprise AI Runtime Architecture
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed font-medium text-slate-500">
            A look into the safety boundaries, declarative compilation graphs,
            and policy isolation models guiding robust high-density processing
            lines.
          </p>
        </div>
      </header>

      {/* CORE WORKSPACE SECTION */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="space-y-6">
          {/* Controls & Section Headers */}
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-0.5">
              <span className="block font-mono text-xs font-bold tracking-wider text-indigo-600 uppercase">
                {coreArchitectureData.eyebrow}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                {coreArchitectureData.sectionTitle}
              </h2>
            </div>

            {/* Segmented Control Pill Shell (Fixed State Iterators & Handlers) */}
            <div className="shrink-0">
              <div className="inline-flex rounded-lg border border-slate-200/60 bg-slate-100 p-1 shadow-2xs">
                {coreArchitectureData.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-md px-4 py-1.5 text-xs font-semibold tracking-tight transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN COMPARISON WORKSPACE BLOCK (Sober Architectural Presentation) */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            {/* Focus Statement Header */}
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <span className="block font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Target Objective Overview
              </span>
              <p className="mt-0.5 text-base font-semibold tracking-tight text-slate-800">
                {current.bizCase}
              </p>
            </div>

            {/* Split Symmetrical Comparison Canvas */}
            <div className="grid items-stretch lg:grid-cols-2">
              {/* LEFT COLUMN: CRITICAL SYSTEM PRESSURE VULNERABILITY */}
              <div className="flex flex-col justify-between border-b border-slate-100 bg-white p-6 lg:border-r lg:border-b-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Ambient Risk Analysis
                    </span>
                    <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                      Legacy Structural Fault
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="flex items-center gap-1.5 text-base font-bold tracking-tight text-slate-950">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                      {current.vulnerability.title}
                    </h3>
                    <p className="text-xs leading-relaxed font-medium text-slate-500">
                      {current.vulnerability.description}
                    </p>
                  </div>

                  {/* Flow Trace Box */}
                  <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/40 p-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                      <span>Observed Failure Chain</span>
                    </div>
                    <p className="border-l border-slate-200 pl-2 font-mono text-xs leading-normal font-medium text-slate-600">
                      {current.vulnerability.mechanics}
                    </p>
                  </div>
                </div>

                {/* Footnote context block */}
                <div className="mt-6 flex items-start gap-2.5 border-t border-slate-100 pt-4 text-xs leading-normal font-medium text-slate-400">
                  <AlertTriangle
                    size={14}
                    className="mt-0.5 shrink-0 text-amber-500"
                  />
                  <p>
                    <strong className="font-semibold text-slate-700">
                      {current.rootCauseTitle}:
                    </strong>{" "}
                    {current.rootCauseMsg}
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN: RESTRAINED ARCHITECTURAL SOLUTION SURFACE */}
              <div className="relative flex flex-col justify-between bg-[#090F10] p-6 text-white">
                {/* Micro Ambient Depth Glows */}
                <div className="pointer-events-none absolute -top-10 -right-10 h-[250px] w-[250px] rounded-full bg-emerald-500/[0.03] blur-[80px]" />
                <div className="pointer-events-none absolute bottom-0 left-10 h-[180px] w-[180px] rounded-full bg-indigo-500/[0.02] blur-[80px]" />

                <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                  {/* Hardened Header Specification */}
                  <div className="space-y-3">
                    <span className="block font-mono text-xs font-bold tracking-wider text-emerald-400/90 uppercase">
                      Hardened Paradigm Strategy
                    </span>

                    <div className="space-y-1 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Layers size={13} className="text-emerald-400" />
                        <h4 className="text-sm font-bold tracking-tight text-white">
                          {current.solution.title}
                        </h4>
                      </div>
                      <p className="text-xs leading-normal font-medium text-slate-400">
                        {current.solution.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Deep Luxury Abstract Schema Presentation Stage */}
                  <div className="flex flex-1 flex-col justify-center py-2">
                    <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 shadow-inner">
                      <CurrentVisual />
                    </div>
                  </div>

                  {/* Core Architecture Shift Definition */}
                  {current.solution.shiftTitle && (
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                      <div className="flex items-start gap-2.5">
                        <GitBranch
                          size={13}
                          className="mt-0.5 shrink-0 text-emerald-400"
                        />
                        <div className="space-y-0.5">
                          <h5 className="font-mono text-xs font-bold tracking-wide text-emerald-300 uppercase">
                            {current.solution.shiftTitle}
                          </h5>
                          <p className="text-xs leading-normal font-medium text-slate-300">
                            {current.solution.shiftMsg}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESTRAINED HIGH-END VERIFICATION CASES */}
        <section className="mt-16 border-t border-slate-200 pt-10">
          <div className="mb-6 space-y-0.5">
            <span className="block font-mono text-xs font-bold tracking-wider text-indigo-600 uppercase">
              Verification Metrics
            </span>
            <h3 className="text-lg font-bold tracking-tight text-slate-950">
              Formal Operational Deployment Maps
            </h3>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Trace Route Graphs",
                desc: "Compiles nested procedural tracks directly into verified structural node vectors before any code executes.",
                marks: [
                  "Map dynamic variables",
                  "Track historical lineage",
                  "Confirm absolute trace data",
                ],
              },
              {
                title: "Isolated Runtime States",
                desc: "Encapsulates distinct request actions inside cryptographic transactional tokens to eliminate ambient memory bleeding.",
                marks: [
                  "Establish clear scopes",
                  "Isolate context vectors",
                  "Prevent structural drift",
                ],
              },
              {
                title: "Sandboxed Policy Specs",
                desc: "Forwards hot-swappable enterprise parameters through specialized data interfaces, leaving core architecture completely clean.",
                marks: [
                  "Verify parameter schema",
                  "Isolate dynamic extensions",
                  "Enforce static safety rules",
                ],
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:border-slate-300/80"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      Framework Spec // 0{idx + 1}
                    </span>
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                      Active Contract
                    </span>
                  </div>
                  <h4 className="text-sm font-bold tracking-tight text-slate-950">
                    {card.title}
                  </h4>
                  <p className="text-xs leading-relaxed font-medium text-slate-500">
                    {card.desc}
                  </p>
                </div>

                {/* Clean Blueprint Subtrace Lines */}
                <div className="mt-5 space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
                  <span className="block font-mono text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                    Operational Verification Steps
                  </span>
                  <div className="space-y-1">
                    {card.marks.map((mark, mIdx) => (
                      <div
                        key={mIdx}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-700"
                      >
                        <CornerDownRight size={11} className="text-slate-300" />
                        <span>{mark}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Unified Action System */}
          <div className="mt-12 flex flex-col items-center justify-center gap-2">
            <button className="group inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-4 py-2 font-mono text-xs font-bold tracking-wider text-white uppercase shadow-xs transition-all hover:bg-indigo-600 active:scale-98">
              Initialize Simulator Suite
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
            <p className="text-[11px] font-medium text-slate-400">
              Architecture fully verified across production multi-tenant
              validation profiles.
            </p>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
