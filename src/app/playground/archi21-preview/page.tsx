"use client";

import React, { useState } from "react";

import {
  Layers,
  Cpu,
  ShieldCheck,
  Activity,
  Eye,
  Columns,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Terminal,
  Network,
} from "lucide-react";

// ============================================================================
// DATA MODELS & ARCHITECTURE DEFINITION
// ============================================================================

type UseCaseKey = "order_assistant" | "ai_marketing" | "workflow_automation";
type ViewMode = "focus" | "compare";

interface CapabilityContext {
  title: string;
  description: string;
  status: "active" | "bypass" | "conditional";
  metric?: string;
}

interface Capability {
  id: string;
  name: string;
  description: string;
  contexts: Record<UseCaseKey, CapabilityContext>;
}

interface Layer {
  id: string;
  title: string;
  subheader: string;
  icon: React.ComponentType<any>;
  capabilities: Capability[];
}

const ARCHITECTURE_MATRIX: Layer[] = [
  {
    id: "semantic",
    title: "Semantic Layer",
    subheader: "Operational Meaning",
    icon: Layers,
    capabilities: [
      {
        id: "intent_res",
        name: "Intent Resolution",
        description:
          "Maps unstructured inputs to deterministic operational objectives.",
        contexts: {
          order_assistant: {
            title: "Parse Transaction Intent",
            description:
              "Extracts refund tokens, SKU identifiers, and customer sentiment states.",
            status: "active",
            metric: "99.4% Det.",
          },
          ai_marketing: {
            title: "Identify Campaign Goals",
            description:
              "Isolates target demographic segments and conversion goals.",
            status: "active",
            metric: "98.1% Det.",
          },
          workflow_automation: {
            title: "Classify Process Request",
            description:
              "Decodes system event triggers and cross-departmental routing needs.",
            status: "active",
            metric: "99.8% Det.",
          },
        },
      },
      {
        id: "entity_map",
        name: "Entity Mapping",
        description:
          "Normalizes variant business terminology into a unified system schema.",
        contexts: {
          order_assistant: {
            title: "Normalize Ledger Entities",
            description:
              "Binds conversational reference directly to ERP order schemas.",
            status: "active",
          },
          ai_marketing: {
            title: "Graph Audience Traits",
            description:
              "Resolves disparate user profiles into transient execution cohorts.",
            status: "active",
          },
          workflow_automation: {
            title: "Bind System Metadata",
            description:
              "Maps unstructured ticket parameters to rigid database keys.",
            status: "active",
          },
        },
      },
    ],
  },
  {
    id: "planning",
    title: "Planning Layer",
    subheader: "Runtime Orchestration",
    icon: Cpu,
    capabilities: [
      {
        id: "dep_planning",
        name: "Dependency Planning",
        description:
          "Dynamically constructs step sequences based on state availability.",
        contexts: {
          order_assistant: {
            title: "Resolve Refund Dependencies",
            description:
              "Sequences ledger lookup, payment gateway state, and inventory checks.",
            status: "active",
            metric: "3-Step DAG",
          },
          ai_marketing: {
            title: "Resolve Campaign Paths",
            description:
              "Determines dynamic fallback variations for audience delivery channels.",
            status: "active",
            metric: "4-Step DAG",
          },
          workflow_automation: {
            title: "Sequence Approval Hierarchy",
            description:
              "Evaluates management tree depths and dynamic escalation criteria.",
            status: "active",
            metric: "Dynamic",
          },
        },
      },
      {
        id: "param_res",
        name: "Runtime Parameter Resolution",
        description:
          "Hydrates variables required for execution gates down-funnel.",
        contexts: {
          order_assistant: {
            title: "Hydrate Transaction Values",
            description:
              "Injects real-time calculations of tax, depreciation, and gate thresholds.",
            status: "active",
          },
          ai_marketing: {
            title: "Inject Segment Context",
            description:
              "Hydrates runtime parameters with live behavior metrics and content matrices.",
            status: "active",
          },
          workflow_automation: {
            title: "Evaluate SLA Thresholds",
            description:
              "Injects absolute timestamps and organizational tier constraints.",
            status: "active",
          },
        },
      },
    ],
  },
  {
    id: "policy",
    title: "Policy Layer",
    subheader: "Runtime Constraints",
    icon: ShieldCheck,
    capabilities: [
      {
        id: "policy_eval",
        name: "Policy Evaluation",
        description:
          "Evaluates deterministic compliance, security, and authorization bounds.",
        contexts: {
          order_assistant: {
            title: "Evaluate Refund Eligibility",
            description:
              "Applies absolute fiscal limits and regional consumer return compliance rules.",
            status: "active",
            metric: "0ms Hard Gate",
          },
          ai_marketing: {
            title: "Validate Frequency Capping",
            description:
              "Evaluates contact policies to ensure compliance with communication thresholds.",
            status: "conditional",
            metric: "Bypass Alert",
          },
          workflow_automation: {
            title: "Evaluate Operational Constraints",
            description:
              "Verifies SOX compliance parameters and segregation of duties rules.",
            status: "active",
            metric: "0ms Hard Gate",
          },
        },
      },
      {
        id: "eligibility_res",
        name: "Eligibility Resolution",
        description:
          "Determines contextual access right boundaries for the active scenario.",
        contexts: {
          order_assistant: {
            title: "Check Fraud Flag Status",
            description:
              "Queries internal risk intelligence layers to authorize runtime exceptions.",
            status: "active",
          },
          ai_marketing: {
            title: "Determine Coupon Eligibility",
            description:
              "Validates promotional ledger states against dynamic cart values.",
            status: "active",
          },
          workflow_automation: {
            title: "Verify Signing Authority",
            description:
              "Checks real-time spending authorization tokens against individual active sessions.",
            status: "active",
          },
        },
      },
    ],
  },
  {
    id: "execution",
    title: "Execution Layer",
    subheader: "Runtime Actions",
    icon: Activity,
    capabilities: [
      {
        id: "tool_exec",
        name: "Tool Execution",
        description:
          "Dispatches isolated mutations to external systems of record.",
        contexts: {
          order_assistant: {
            title: "Execute Payment Gateway Mutation",
            description:
              "Triggers secure, idempotent balance reverses via microservices.",
            status: "active",
            metric: "Idempotent",
          },
          ai_marketing: {
            title: "Trigger Campaign Actions",
            description:
              "Dispatches message delivery blocks to queuing systems.",
            status: "active",
            metric: "Async",
          },
          workflow_automation: {
            title: "Mutate System Ticket State",
            description:
              "Commits state changes into core enterprise resource planning tables.",
            status: "active",
            metric: "Transactional",
          },
        },
      },
      {
        id: "audit_trace",
        name: "Audit Trace",
        description:
          "Emits immutable logs containing execution context proofs.",
        contexts: {
          order_assistant: {
            title: "Emit Approval Decision Logs",
            description:
              "Writes complete reasoning paths to zero-tamper cryptographic storage layers.",
            status: "active",
          },
          ai_marketing: {
            title: "Log Distribution Metrics",
            description:
              "Pipes tracking structures directly into cold analytics storage.",
            status: "bypass",
          },
          workflow_automation: {
            title: "Track Approval History",
            description:
              "Saves full consensus lineage details for external regulatory validation.",
            status: "active",
          },
        },
      },
    ],
  },
];

const USE_CASES = [
  {
    id: "order_assistant",
    label: "Order Assistant",
    badge: "Transactional",
    desc: "Customer-facing billing modifications and microservice interactions.",
  },
  {
    id: "ai_marketing",
    label: "AI Marketing",
    badge: "Analytical",
    desc: "High-throughput dynamic segmentation and multi-channel orchestration.",
  },
  {
    id: "workflow_automation",
    label: "Workflow Automation",
    badge: "System Mutation",
    desc: "Cross-platform state alignment and governance-critical operations.",
  },
];

// ============================================================================
// MAIN REUSABLE ARCHITECTURE COMPONENT
// ============================================================================

export default function RuntimeExecutionScenarios() {
  const [viewMode, setViewMode] = useState<ViewMode>("focus");
  const [activeUseCase, setActiveUseCase] =
    useState<UseCaseKey>("order_assistant");

  return (
    <section className="relative overflow-hidden bg-[#090A0C] px-6 py-24 font-sans text-[#E2E8F0] selection:bg-emerald-500/30 selection:text-emerald-200 md:px-12">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14161a_1px,transparent_1px),linear-gradient(to_bottom,#14161a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:4rem_4rem] opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ============================================================================
            SECTION HEADER
           ============================================================================ */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#1A1D24] pb-8 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#64748B] uppercase">
                Section 04 // Execution Models
              </span>
            </div>
            <h2 className="font-mono text-3xl font-light tracking-tight text-white md:text-4xl">
              Runtime Execution Scenarios
            </h2>
            <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed font-light text-[#94A3B8] md:text-base">
              Shared runtime structure across operational workflows with
              contextual execution variation. Demonstrating absolute
              architecture preservation across heterogeneous business workloads.
            </p>
          </div>

          {/* VIEW MODE TOGGLE */}
          <div className="flex self-start rounded-lg border border-[#1A1D24] bg-[#111318] p-1 md:self-auto">
            <button
              onClick={() => setViewMode("focus")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 font-mono text-xs font-medium tracking-wider transition-all duration-300 ${
                viewMode === "focus"
                  ? "border border-emerald-500/20 bg-[#1E222B] text-emerald-400 shadow-[0_2px_10px_rgba(16,185,129,0.05)]"
                  : "text-[#64748B] hover:text-[#94A3B8]"
              }`}
            >
              <Eye size={14} />
              FOCUS VIEW
            </button>
            <button
              onClick={() => setViewMode("compare")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 font-mono text-xs font-medium tracking-wider transition-all duration-300 ${
                viewMode === "compare"
                  ? "border border-emerald-500/20 bg-[#1E222B] text-emerald-400 shadow-[0_2px_10px_rgba(16,185,129,0.05)]"
                  : "text-[#64748B] hover:text-[#94A3B8]"
              }`}
            >
              <Columns size={14} />
              COMPARE VIEW
            </button>
          </div>
        </div>

        {/* ============================================================================
            FOCUS VIEW (DEFAULT NARRATIVE ARCHITECTURE)
           ============================================================================ */}
        {viewMode === "focus" && (
          <div className="animate-fadeIn space-y-8">
            {/* USE CASE TABS */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {USE_CASES.map((uc) => {
                const isSelected = activeUseCase === uc.id;
                return (
                  <button
                    key={uc.id}
                    onClick={() => setActiveUseCase(uc.id as UseCaseKey)}
                    className={`group relative rounded-xl border p-5 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-emerald-500/30 bg-[#0E1117] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)]"
                        : "border-[#1A1D24] bg-[#0B0C0E] hover:border-[#262B36] hover:bg-[#0E1014]"
                    }`}
                  >
                    {/* Active Decorative Glow Line */}
                    {isSelected && (
                      <div className="absolute top-0 bottom-0 left-0 w-[2px] rounded-l-xl bg-emerald-500" />
                    )}
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={`font-mono text-sm font-medium tracking-wide transition-colors ${isSelected ? "text-white" : "text-[#94A3B8]"}`}
                      >
                        {uc.label}
                      </span>
                      <span
                        className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase ${
                          isSelected
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-[#1A1D24] bg-[#14161C] text-[#475569]"
                        }`}
                      >
                        {uc.badge}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed font-light text-[#64748B] transition-colors group-hover:text-[#94A3B8]">
                      {uc.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* RUNTIME CAPABILITY MATRIX (4 PERSISTENT COLUMNS) */}
            <div className="relative grid min-h-[480px] grid-cols-1 gap-4 rounded-2xl border border-[#14161A] bg-[#0B0C0E] p-4 lg:grid-cols-4">
              {/* Subtle directional connector stream layer inside the grid background */}
              <div className="pointer-events-none absolute top-[35%] right-4 left-4 hidden h-px bg-gradient-to-r from-transparent via-[#1A1D24] to-transparent lg:block" />
              <div className="pointer-events-none absolute top-[75%] right-4 left-4 hidden h-px bg-gradient-to-r from-transparent via-[#1A1D24] to-transparent lg:block" />

              {ARCHITECTURE_MATRIX.map((layer) => {
                const LayerIcon = layer.icon;
                return (
                  <div
                    key={layer.id}
                    className="group/column relative flex flex-col overflow-hidden rounded-xl border border-[#161920] bg-[#0E1014] p-4 transition-all duration-500"
                  >
                    {/* Layer Header */}
                    <div className="mb-4 border-b border-[#1A1D24] pb-4">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="rounded bg-[#161920] p-1.5 text-[#94A3B8] transition-colors group-hover/column:text-emerald-400">
                          <LayerIcon size={14} />
                        </div>
                        <h3 className="font-mono text-sm font-medium tracking-wide text-white">
                          {layer.title}
                        </h3>
                      </div>
                      <span className="font-mono text-[11px] tracking-wider text-[#475569] uppercase">
                        {layer.subheader}
                      </span>
                    </div>

                    {/* Capabilities Container Inside the Column */}
                    <div className="relative z-10 flex-1 space-y-3">
                      {layer.capabilities.map((cap) => {
                        const ctx = cap.contexts[activeUseCase];
                        const isBypass = ctx.status === "bypass";
                        const isConditional = ctx.status === "conditional";

                        return (
                          <div
                            key={cap.id}
                            className={`relative flex min-h-[145px] flex-col justify-between overflow-hidden rounded-lg border p-4 transition-all duration-500 ${
                              isBypass
                                ? "border-[#1A1D24]/40 bg-[#0E1014] opacity-40"
                                : "border-[#1C202B] bg-[#12151C] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-[#2A3142]"
                            }`}
                          >
                            {/* Execution Glow Trace effect on active items */}
                            {!isBypass && (
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/[0.02] to-transparent opacity-0 transition-opacity duration-700 group-hover/column:opacity-100" />
                            )}

                            <div>
                              {/* Static Global Capability Identifier */}
                              <div className="mb-2 flex items-center justify-between gap-2">
                                <span className="font-mono text-[11px] font-medium tracking-tight text-slate-400">
                                  {cap.name}
                                </span>
                                {ctx.metric && (
                                  <span className="rounded border border-emerald-500/10 bg-[#181C26] px-1.5 py-0.5 font-mono text-[9px] text-emerald-400/80">
                                    {ctx.metric}
                                  </span>
                                )}
                              </div>

                              {/* Dynamic Runtime Context Overlay */}
                              <h4 className="font-sans text-xs font-semibold tracking-wide text-white transition-colors duration-300">
                                {ctx.title}
                              </h4>
                              <p className="mt-1 text-[11px] leading-relaxed font-light text-[#64748B]">
                                {ctx.description}
                              </p>
                            </div>

                            {/* Operational Status / Sequence Anchors */}
                            <div className="mt-3 flex items-center justify-between border-t border-[#181C26] pt-2 font-mono text-[10px]">
                              <span className="tracking-wider text-[#475569] uppercase">
                                Spec Matrix Config
                              </span>
                              <div className="flex items-center gap-1.5">
                                {isBypass ? (
                                  <span className="flex items-center gap-1 text-amber-500/70">
                                    <AlertCircle size={10} /> BYPASS
                                  </span>
                                ) : isConditional ? (
                                  <span className="flex items-center gap-1 text-cyan-400">
                                    <Network size={10} /> CONDITIONAL
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-emerald-400">
                                    <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                                    COMMITTED
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AMBIENT EXECUTION NARRATIVE UNDERLAY */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-[#1A1D24] bg-[#0B0C0E] p-4 font-mono text-xs text-[#64748B] sm:flex-row">
              <div className="flex items-center gap-3">
                <Terminal size={14} className="text-emerald-500" />
                <span>
                  Execution Topology Status:{" "}
                  <span className="text-white">
                    Deterministic DAG Schema Enforced
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#475569]">
                <span>Same Core Engine</span>
                <ArrowRight size={12} />
                <span>Zero Recompilation Required</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================================
            COMPARE VIEW (RUNTIME MATRIX CONSISTENCY MATRIX)
           ============================================================================ */}
        {viewMode === "compare" && (
          <div className="animate-fadeIn space-y-6">
            <div className="overflow-hidden rounded-2xl border border-[#14161A] bg-[#0B0C0E]">
              {/* Header Context Descriptors */}
              <div className="border-b border-[#1A1D24] bg-[#0E1014] p-6">
                <h3 className="mb-1 font-mono text-sm tracking-wide text-white uppercase">
                  Runtime Comparison Grid
                </h3>
                <p className="font-sans text-xs font-light text-[#64748B]">
                  A side-by-side view highlighting asset reuse across scenarios.
                  Notice how the capability matrices map flawlessly onto unified
                  layers regardless of business domain metrics.
                </p>
              </div>

              {/* Grid System Layout */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#1A1D24] bg-[#0A0B0E]">
                      <th className="min-w-[200px] p-4 font-mono text-xs font-semibold tracking-wider text-[#475569] uppercase">
                        Architectural Layers & Capabilities
                      </th>
                      {USE_CASES.map((uc) => (
                        <th key={uc.id} className="min-w-[240px] p-4">
                          <div className="mb-0.5 font-mono text-xs font-medium text-white">
                            {uc.label}
                          </div>
                          <div className="font-mono text-[10px] font-normal tracking-tight text-[#64748B] uppercase">
                            {uc.badge}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#14161A]">
                    {ARCHITECTURE_MATRIX.map((layer) => (
                      <React.Fragment key={layer.id}>
                        {/* Section Divider Row representing the Layer Header */}
                        <tr className="bg-[#111319]/40">
                          <td
                            colSpan={4}
                            className="p-3 px-4 font-mono text-[11px] font-semibold tracking-widest text-emerald-400/90 uppercase"
                          >
                            {layer.title}{" "}
                            <span className="ml-2 font-normal text-[#475569]">
                              // {layer.subheader}
                            </span>
                          </td>
                        </tr>

                        {/* Capability mapping records */}
                        {layer.capabilities.map((cap) => (
                          <tr
                            key={cap.id}
                            className="transition-colors duration-200 hover:bg-[#12151C]/40"
                          >
                            <td className="border-r border-[#14161A] p-4">
                              <div className="font-mono text-xs font-semibold text-slate-200">
                                {cap.name}
                              </div>
                              <div className="mt-0.5 max-w-[220px] text-[10px] leading-relaxed font-light text-[#57657A]">
                                {cap.description}
                              </div>
                            </td>
                            {USE_CASES.map((uc) => {
                              const ctx = cap.contexts[uc.id as UseCaseKey];
                              const isBypass = ctx.status === "bypass";
                              const isConditional =
                                ctx.status === "conditional";

                              return (
                                <td key={uc.id} className="p-4 align-top">
                                  <div className="flex h-full flex-col justify-between">
                                    <div>
                                      <div className="mb-1 flex items-center gap-1.5">
                                        {isBypass ? (
                                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500/60" />
                                        ) : isConditional ? (
                                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                        ) : (
                                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                                        )}
                                        <span
                                          className={`font-mono text-[11px] font-medium ${isBypass ? "text-[#475569] line-through" : "text-slate-300"}`}
                                        >
                                          {ctx.title}
                                        </span>
                                      </div>
                                      <p className="pl-3 text-[10px] leading-normal font-light text-[#64748B]">
                                        {ctx.description}
                                      </p>
                                    </div>

                                    {ctx.metric && (
                                      <div className="mt-3 pl-3">
                                        <span className="rounded border border-[#222836] bg-[#161922] px-1.5 py-0.25 font-mono text-[9px] text-slate-400">
                                          {ctx.metric}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================================
            EMOTIONAL NARRATIVE CALLOUT / GUARANTEE
           ============================================================================ */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[#14161A] pt-12 md:grid-cols-3">
          <div>
            <h4 className="mb-2 font-mono text-xs font-bold tracking-widest text-slate-400 uppercase">
              01 // Static Schema Control
            </h4>
            <p className="font-sans text-xs leading-relaxed font-light text-[#64748B]">
              Operational inputs do not reconfigure the pipeline layout.
              Requests are parsed, planned, guarded, and committed within safe,
              unchanging structural columns.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-mono text-xs font-bold tracking-widest text-slate-400 uppercase">
              02 // Unified Engine Footprint
            </h4>
            <p className="font-sans text-xs leading-relaxed font-light text-[#64748B]">
              Eliminate architectural drift. Marketing campaigns, heavy ledger
              mutations, and standard system workflows exploit identical
              microservices runtime layers.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-mono text-xs font-bold tracking-widest text-slate-400 uppercase">
              03 // Hard Cryptographic Proof
            </h4>
            <p className="font-sans text-xs leading-relaxed font-light text-[#64748B]">
              Every step inside the matrix columns automatically feeds the
              execution tracer, compiling comprehensive logic audits for secure
              internal review.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
