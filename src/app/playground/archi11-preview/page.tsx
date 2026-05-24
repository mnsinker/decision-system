"use client";

import React, { useState, useMemo } from "react";

type AbstractionLevel = "layers" | "runtime" | "foundation";
type UseCaseId = "refund" | "marketing" | "workflow";

interface UseCaseData {
  id: UseCaseId;
  title: string;
  badge: string;
  isCurrent: boolean;
  query: string;
  intent: string;
  semanticOutput: string;
  planOutput: string[];
  paramOutput: string;
  toolOutput: string;
  finalResponse: string;
  dependencies: string[];
  entityMap: string[];
  policyNote: string;
  toolName: string;
  dtoName: string;
}

export default function EnterpriseRuntimeArchitecture() {
  const [level, setLevel] = useState<AbstractionLevel>("foundation");
  const [useCase, setUseCase] = useState<UseCaseId>("refund");

  const useCases: Record<UseCaseId, UseCaseData> = {
    refund: {
      id: "refund",
      title: "Refund Evaluation",
      badge: "CURRENT IMPLEMENTATION",
      isCurrent: true,
      query: "订单123 是否可以退款吗？",
      intent: "check_refund",
      semanticOutput: `{\n  intent: "check_refund",\n  args: {\n    order_id: "123"\n  }\n}`,
      planOutput: ["get_order", "check_refund"],
      paramOutput: `OrderSummaryDTO(\n  order_id="123",\n  user_id="u1",\n  days=3,\n  shipped=true,\n  custom=false,\n  amount=1000.0\n)`,
      toolName: "check_refund",
      dtoName: "RefundDecisionDTO",
      policyNote: "refund.block.shipped_order",
      toolOutput: `RefundDecisionDTO(\n  allowed=false,\n  reason="product is already shipped",\n  policy_rule="refund.block.shipped_order"\n)`,
      finalResponse: "根据查询结果，订单123因商品已发货，无法进行退款。",
      dependencies: ["Order ──▶ RefundEligibility", "Order ──▶ ShippingState"],
      entityMap: ["Order → get_order", "RefundEligibility → check_refund"],
    },
    marketing: {
      id: "marketing",
      title: "AI Marketing Decision",
      badge: "EXTENSION PATTERN",
      isCurrent: false,
      query: "Can we issue a loyalty coupon to user u99?",
      intent: "evaluate_coupon_push",
      semanticOutput: `{\n  intent: "evaluate_coupon_push",\n  args: {\n    user_id: "u99"\n  }\n}`,
      planOutput: [
        "get_user_profile",
        "check_coupon_policy",
        "campaign_action",
      ],
      paramOutput: `UserProfileDTO(\n  user_id="u99",\n  segment="churn_risk",\n  lifetime_value=450.0,\n  last_active_days=14\n)`,
      toolName: "check_coupon_policy",
      dtoName: "CouponAllocationDTO",
      policyNote: "marketing.grant.high_churn_risk",
      toolOutput: `CouponAllocationDTO(\n  eligible=true,\n  coupon_code="SAVE20",\n  policy_rule="marketing.grant.high_churn_risk"\n)`,
      finalResponse:
        "User u99 is flagged for churn risk. Standard policy allows allocation of a SAVE20 tactical coupon.",
      dependencies: ["User ──▶ CouponEligibility", "User ──▶ CampaignContext"],
      entityMap: [
        "User → get_user_profile",
        "CouponEligibility → check_coupon_policy",
        "CampaignContext → campaign_action",
      ],
    },
    workflow: {
      id: "workflow",
      title: "Workflow Automation",
      badge: "EXTENSION PATTERN",
      isCurrent: false,
      query: "Route operational clearance for request req-404.",
      intent: "clearance_routing",
      semanticOutput: `{\n  intent: "clearance_routing",\n  args: {\n    request_id: "req-404"\n  }\n}`,
      planOutput: ["evaluate_risk", "approval_gate", "notify_reviewer"],
      paramOutput: `RiskMetricsDTO(\n  request_id="req-404",\n  risk_score=0.82,\n  requires_override=true\n)`,
      toolName: "approval_gate",
      dtoName: "RoutingManifestDTO",
      policyNote: "workflow.route.high_risk_escalation",
      toolOutput: `RoutingManifestDTO(\n  action="escalate",\n  target_tier="L3_manager",\n  policy_rule="workflow.route.high_risk_escalation"\n)`,
      finalResponse:
        "Request req-404 returned a high risk score. Under current protocols, this requires manual L3 manager override.",
      dependencies: [
        "Request ──▶ RiskLevel",
        "RiskLevel ──▶ ApprovalRequirement",
      ],
      entityMap: [
        "RiskLevel → evaluate_risk",
        "ApprovalRequirement → approval_gate",
        "ReviewerNotification → notify_reviewer",
      ],
    },
  };

  const activeData = useMemo(() => useCases[useCase], [useCase]);

  return (
    <section className="min-h-screen bg-[#07090D] px-4 py-16 font-sans text-zinc-100 antialiased selection:bg-zinc-800 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* TOP HEADER */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-zinc-900 pb-8 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
              Runtime Execution Flow
            </h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">
              Structured operational execution built on dependency-aware runtime
              orchestration.
            </p>
          </div>

          {/* VIEW SLIDER CONTROLLER */}
          <div className="flex self-start rounded-lg border border-zinc-800 bg-zinc-900/40 p-1 backdrop-blur-sm md:self-auto">
            {(["layers", "runtime", "foundation"] as AbstractionLevel[]).map(
              (lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`rounded-md px-4 py-1.5 font-mono text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                    level === lvl
                      ? "border border-zinc-700/50 bg-zinc-800 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {lvl}
                </button>
              ),
            )}
          </div>
        </div>

        {/* STICKY USE CASE SELECTOR LAYER */}
        <div className="sticky top-6 z-40 mb-12 rounded-xl border border-zinc-800/80 bg-[#07090D]/80 p-2 shadow-lg backdrop-blur-md">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {(Object.values(useCases) as UseCaseData[]).map((uc) => {
              const isSelected = useCase === uc.id;
              return (
                <button
                  key={uc.id}
                  onClick={() => setUseCase(uc.id)}
                  className={`flex flex-col items-start justify-between rounded-lg border p-3.5 text-left transition-all duration-200 ${
                    isSelected
                      ? uc.isCurrent
                        ? "border-blue-500/50 bg-blue-500/[0.04] shadow-[0_0_15px_rgba(59,130,246,0.05)]"
                        : "border-zinc-700 bg-zinc-800/40"
                      : "border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 hover:bg-zinc-900/30"
                  }`}
                >
                  <div className="mb-2 flex w-full items-center justify-between gap-2">
                    <span
                      className={`text-xs font-semibold ${isSelected ? "text-zinc-100" : "text-zinc-400"}`}
                    >
                      {uc.title}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold tracking-wide uppercase transition-all ${
                        uc.isCurrent
                          ? isSelected
                            ? "bg-blue-500 text-zinc-950 shadow-sm shadow-blue-500/20"
                            : "border border-blue-900/50 bg-blue-950/60 text-blue-400"
                          : "border border-zinc-800 bg-zinc-900 text-zinc-500"
                      }`}
                    >
                      {uc.badge}
                    </span>
                  </div>
                  <span className="w-full truncate font-mono text-[11px] text-zinc-500">
                    "{uc.query}"
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LAYOUT CANVAS SWITCHER */}
        <div className="transition-all duration-300">
          {/* LEVEL 1: LAYERS ONLY MODE */}
          {level === "layers" && (
            <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4 py-12">
              <div className="mb-4 w-full text-center font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                Active Architecture Pipeline
              </div>
              <StaticLayerCard
                title="Semantic Layer"
                desc="Extract intent parameters and parse target operational values from natural language entry point."
              />
              <StaticLayerCard
                title="Planning Layer"
                desc="Map extracted target entities to registry tool configurations using dependency graph matching."
              />
              <StaticLayerCard
                title="Execution Layer"
                desc="Propagate resolved context schemas and run tools with isolated execution policy blocks."
              />
              <StaticLayerCard
                title="Response Layer"
                desc="Read current tool transaction records and write the direct operational answer back to the user."
              />
            </div>
          )}

          {/* LEVEL 2 & 3: RUNTIME & FOUNDATION GRID */}
          {(level === "runtime" || level === "foundation") && (
            <div
              className={`grid grid-cols-1 ${level === "foundation" ? "lg:grid-cols-[180px_1fr_320px]" : "md:grid-cols-[180px_1fr]"} relative gap-8`}
            >
              {/* LEFT COLUMN: ANCHOR LAYERS */}
              <div className="hidden space-y-0 md:block">
                <div className="flex h-[120px] items-center">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-300">
                      Semantic Layer
                    </h4>
                    <span className="mt-0.5 block font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      Parse Intent
                    </span>
                  </div>
                </div>
                <div className="flex h-[48px] items-center justify-center">
                  <div className="h-full w-[1px] bg-zinc-900" />
                </div>
                <div className="flex h-[135px] items-center">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-300">
                      Planning Layer
                    </h4>
                    <span className="mt-0.5 block font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      Build Execution Plan
                    </span>
                  </div>
                </div>
                <div className="flex h-[48px] items-center justify-center">
                  <div className="h-full w-[1px] bg-zinc-900" />
                </div>
                <div className="flex h-[390px] items-center">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-300">
                      Execution Layer
                    </h4>
                    <span className="mt-0.5 block font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      Run Tool Pipeline
                    </span>
                  </div>
                </div>
                <div className="flex h-[48px] items-center justify-center">
                  <div className="h-full w-[1px] bg-zinc-900" />
                </div>
                <div className="flex h-[140px] items-center">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-300">
                      Response Layer
                    </h4>
                    <span className="mt-0.5 block font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      Write Final Output
                    </span>
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: LIVE RUNTIME GRAPH FLOW */}
              <div className="space-y-4">
                {/* FLOW NODE: USER REQUEST INGRESS */}
                <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4">
                  <div className="mb-1.5 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                    User Request Ingress
                  </div>
                  <div className="font-mono text-xs font-medium text-zinc-300">
                    "{activeData.query}"
                  </div>
                </div>

                <div className="flex h-6 items-center justify-center md:justify-start md:pl-8">
                  <div className="h-full w-[1px] bg-zinc-800" />
                </div>

                {/* FLOW NODE: SEMANTIC PARSING */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 p-5">
                  <div className="mb-3 flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="font-mono text-[10px] font-medium tracking-widest text-zinc-400 uppercase">
                      Semantic Resolution
                    </span>
                    <span className="font-mono text-[9px] text-zinc-600">
                      INPUT - RAW STRING
                    </span>
                  </div>
                  <div className="space-y-1 font-mono text-xs text-zinc-400">
                    <div>
                      • identify operational intent{" "}
                      <span className="text-zinc-600">
                        [{activeData.intent}]
                      </span>
                    </div>
                    <div>• extract runtime entities</div>
                    <div>• resolve operational context</div>
                  </div>
                </div>

                <div className="flex h-6 items-center justify-center md:justify-start md:pl-8">
                  <div className="h-full w-[1px] bg-zinc-800" />
                </div>

                {/* FLOW NODE: PLAN CONSTRUCTION */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 p-5">
                  <div className="mb-3 flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="font-mono text-[10px] font-medium tracking-widest text-zinc-400 uppercase">
                      plan_tools()
                    </span>
                    <span className="font-mono text-[9px] text-zinc-600">
                      TOPOLOGY GENERATOR
                    </span>
                  </div>
                  <div className="mb-3 font-mono text-xs text-zinc-400">
                    map entity to tool definitions using structural relationship
                    tracking
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                    {activeData.planOutput.map((step, idx) => (
                      <React.Fragment key={step}>
                        {idx > 0 && <span className="text-zinc-700">→</span>}
                        <span
                          className={`rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 ${idx === activeData.planOutput.length - 1 ? "border-blue-900/30 text-blue-400" : "text-zinc-400"}`}
                        >
                          {step}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex h-6 items-center justify-center md:justify-start md:pl-8">
                  <div className="h-full w-[1px] bg-zinc-800" />
                </div>

                {/* FLOW NODE: ORCHESTRATION ENGINE LOOP */}
                <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/10 p-5">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                      <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                        for step in steps:
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-zinc-600">
                      DYNAMIC EXECUTION PIPELINE
                    </span>
                  </div>

                  {/* SUB-BLOCK: PARAM RESOLUTION */}
                  <div className="rounded-lg border border-zinc-900 bg-black/40 p-3">
                    <div className="mb-1.5 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      Runtime Parameter Resolution
                    </div>
                    <div className="space-y-0.5 font-mono text-xs text-zinc-400">
                      <div>• fill_args_from_context()</div>
                      <div>• dependency-derived params</div>
                      <li>• regex fallback extraction</li>
                    </div>
                  </div>

                  {/* SUB-BLOCK: TOOL RUNTIME WITH ISOLATION INTELLIGENCE */}
                  <div className="space-y-3 rounded-lg border border-zinc-900 bg-black/40 p-3">
                    <div>
                      <div className="mb-1 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                        Tool Invocation Entrypoint
                      </div>
                      <div className="font-mono text-xs font-semibold text-blue-400">
                        tool.run(**resolved_params)
                      </div>
                    </div>

                    {/* INTERACTION ELEMENT: NESTED EXPLICIT POLICY MONITOR */}
                    <div className="relative rounded-lg border border-emerald-500/20 bg-emerald-950/[0.02] p-4 shadow-[inset_0_0_15px_rgba(16,185,129,0.01)]">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-emerald-400">
                          policy.evaluate()
                        </span>
                        <span className="rounded border border-emerald-500/20 bg-emerald-950/40 px-1.5 py-0.5 font-mono text-[8px] tracking-wide text-emerald-400 uppercase">
                          isolated policy logic
                        </span>
                      </div>

                      <p className="mb-3 font-sans text-[11px] leading-normal text-zinc-500">
                        Policy logic is isolated from core functions, but policy
                        execution is currently still inside tool execution.
                      </p>

                      <div className="rounded border border-zinc-900 bg-zinc-950/80 p-2.5 font-mono text-xs leading-tight text-zinc-400">
                        {activeData.toolName}
                        <div className="pl-3 text-zinc-600">
                          └─{" "}
                          <span className="font-medium text-emerald-400">
                            policy.evaluate()
                          </span>
                          <div className="pl-3 text-zinc-500">
                            └─ {activeData.dtoName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUB-BLOCK: VARIABLE CAPTURE */}
                  <div className="rounded-lg border border-zinc-900 bg-black/40 p-3">
                    <div className="mb-1 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      Result Collection
                    </div>
                    <div className="font-mono text-xs text-zinc-400">
                      append tool results to{" "}
                      <span className="text-blue-400">tool_results[]</span>{" "}
                      context array
                    </div>
                  </div>
                </div>

                <div className="flex h-6 items-center justify-center md:justify-start md:pl-8">
                  <div className="h-full w-[1px] bg-zinc-800" />
                </div>

                {/* FLOW NODE: OUTPUT TERMINATOR */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 p-5">
                  <div className="mb-3 flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="font-mono text-[10px] font-medium tracking-widest text-amber-500/90 uppercase">
                      Response Synthesis
                    </span>
                    <span className="font-mono text-[9px] text-zinc-600">
                      TERMINAL OUT
                    </span>
                  </div>
                  <div className="mb-3 space-y-1 font-mono text-xs text-zinc-400">
                    <div>• read tool results</div>
                    <div>• write answer for user</div>
                  </div>
                  <div className="rounded-lg border border-l-2 border-amber-500/10 border-l-amber-500/40 bg-amber-500/[0.01] p-3">
                    <p className="font-mono text-xs leading-relaxed font-medium text-amber-200/90">
                      "{activeData.finalResponse}"
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: STRUCTURAL SCHEMAS & DEPENDENCY REPOSITORIES */}
              {level === "foundation" && (
                <div className="space-y-4 lg:border-l lg:border-zinc-900 lg:pl-6">
                  <div className="mb-2 font-mono text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                    Semantic & Dependency Foundations
                  </div>

                  {/* DATA OBJECT: STRUCTURAL GRAPH MAPS */}
                  <div className="space-y-3 rounded-xl border border-zinc-900 bg-zinc-950 p-4">
                    <div>
                      <div className="mb-1.5 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                        Topological Schemas
                      </div>
                      <div className="space-y-1 rounded border border-zinc-900 bg-zinc-900/30 p-2 font-mono text-[11px] text-zinc-300">
                        {activeData.dependencies.map((dep, i) => (
                          <div key={i}>{dep}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-1.5 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                        entity_to_tool map
                      </div>
                      <div className="space-y-1 rounded border border-zinc-900 bg-zinc-900/30 p-2 font-mono text-[11px] text-zinc-400">
                        {activeData.entityMap.map((m, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <span className="text-zinc-600">•</span> {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* DATA OBJECT: INGEST RESOLUTION LOG */}
                  <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4">
                    <div className="mb-1.5 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      Resolved Intent Arguments
                    </div>
                    <pre className="overflow-x-auto rounded border border-zinc-900/60 bg-zinc-900/20 p-2.5 font-mono text-[11px] leading-normal text-blue-400">
                      {activeData.semanticOutput}
                    </pre>
                  </div>

                  {/* DATA OBJECT: RUNTIME PARAM STRUCT */}
                  <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4">
                    <div className="mb-1.5 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      Resolved Tool Context Input
                    </div>
                    <pre className="overflow-x-auto rounded border border-zinc-900/60 bg-zinc-900/20 p-2.5 font-mono text-[11px] leading-normal text-zinc-400">
                      {activeData.paramOutput}
                    </pre>
                  </div>

                  {/* DATA OBJECT: TRANS-ACTION SCHEMA RECORD */}
                  <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4">
                    <div className="mb-1.5 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      Interacted Tool Output Payload
                    </div>
                    <pre className="overflow-x-auto rounded border border-zinc-900/60 bg-zinc-900/20 p-2.5 font-mono text-[11px] leading-normal text-emerald-400/90">
                      {activeData.toolOutput}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* SUBCOMPONENT: COMPACT STATIC LAYER DESCRIPTOR CARD FOR LAYER VIEW MODE */
function StaticLayerCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900/10 p-5 shadow-sm transition-all">
      <h3 className="mb-1 text-sm font-semibold text-zinc-200">{title}</h3>
      <p className="font-mono text-xs leading-relaxed text-zinc-400">{desc}</p>
    </div>
  );
}
