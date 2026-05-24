"use client";

import React, { useMemo, useState } from "react";

type DetailLevel = 1 | 2 | 3;
type UseCase = "refund" | "marketing" | "workflow";

type UseCaseData = {
  label: string;
  status: "CURRENT IMPLEMENTATION" | "EXTENSION PATTERN";
  query: string;
  layerHighlights: string[];
  semanticSummary: {
    input: string;
    output: string;
    notes: string[];
  };
  planSummary: {
    input: string;
    output: string;
    notes: string[];
  };
  parameterSummary: {
    input: string;
    output: string;
  };
  toolSummary: {
    input: string;
    output: string;
    toolName: string;
    dtoName: string;
    policyLine: string;
  };
  responseSummary: {
    input: string;
    output: string;
    notes: string[];
  };
  foundation: {
    entities: string[];
    graphRelations: string[];
    graphNotes: string[];
    entityMap: { entity: string; tool: string }[];
  };
};

export default function RuntimeFlow() {
  const [detailLevel, setDetailLevel] = useState<DetailLevel>(3);
  const [useCase, setUseCase] = useState<UseCase>("refund");

  const cases: Record<UseCase, UseCaseData> = useMemo(
    () => ({
      refund: {
        label: "Refund Evaluation",
        status: "CURRENT IMPLEMENTATION",
        query: `"订单123 是否可以退款吗？"`,
        layerHighlights: ["Planning Layer", "Execution Layer"],
        semanticSummary: {
          input: "User Query",
          output: `{\n  intent: "check_refund",\n  args: { order_id: "123" }\n}`,
          notes: ["parse intent", "extract order_id"],
        },
        planSummary: {
          input: "runtime_intent",
          output: "execution_steps [ get_order, check_refund ]",
          notes: ["map entity to tool", "build execution order"],
        },
        parameterSummary: {
          input: "tool_results + runtime_context",
          output: `OrderSummaryDTO(\n  order_id="123",\n  shipped=true\n)`,
        },
        toolSummary: {
          input: "resolved_params",
          output: "RefundDecisionDTO",
          toolName: "check_refund",
          dtoName: "RefundDecisionDTO",
          policyLine: "refund.block.shipped_order",
        },
        responseSummary: {
          input: "tool_results",
          output: "human-readable answer",
          notes: ["read tool results", "write answer for user"],
        },
        foundation: {
          entities: ["Order", "RefundEligibility", "ShippingState"],
          graphRelations: [
            "Order ──▶ RefundEligibility",
            "Order ──▶ ShippingState",
          ],
          graphNotes: [
            "pre-built from entity relations",
            "only showing the use-case slice",
            "used by planner to derive execution order",
          ],
          entityMap: [
            { entity: "Order", tool: "get_order" },
            { entity: "RefundEligibility", tool: "check_refund" },
          ],
        },
      },
      marketing: {
        label: "AI Marketing Decision",
        status: "EXTENSION PATTERN",
        query: `"Who should receive a retention coupon?"`,
        layerHighlights: ["Semantic Layer", "Planning Layer"],
        semanticSummary: {
          input: "User Query",
          output: `{\n  intent: "evaluate_coupon",\n  args: { user_id: "u99" }\n}`,
          notes: ["parse campaign intent", "resolve user segment"],
        },
        planSummary: {
          input: "runtime_intent",
          output:
            "execution_steps [ get_user_profile, check_coupon_policy, campaign_action ]",
          notes: ["map user context", "build campaign path"],
        },
        parameterSummary: {
          input: "tool_results + campaign_context",
          output: `UserProfileDTO(\n  user_id="u99",\n  segment="churn_risk"\n)`,
        },
        toolSummary: {
          input: "resolved_params",
          output: "CouponDecisionDTO",
          toolName: "check_coupon_policy",
          dtoName: "CouponDecisionDTO",
          policyLine: "marketing.retention_coupon",
        },
        responseSummary: {
          input: "tool_results",
          output: "human-readable recommendation",
          notes: ["read campaign result", "write answer for user"],
        },
        foundation: {
          entities: ["User", "CouponEligibility", "CampaignContext"],
          graphRelations: [
            "User ──▶ CouponEligibility",
            "User ──▶ CampaignContext",
          ],
          graphNotes: [
            "pre-built from entity relations",
            "only showing the extension-pattern slice",
            "maps campaign context to executable tools",
          ],
          entityMap: [
            { entity: "User", tool: "get_user_profile" },
            { entity: "CouponEligibility", tool: "check_coupon_policy" },
            { entity: "CampaignContext", tool: "campaign_action" },
          ],
        },
      },
      workflow: {
        label: "Workflow Automation",
        status: "EXTENSION PATTERN",
        query: `"High-risk refunds require manual approval."`,
        layerHighlights: ["Execution Layer", "Planning Layer"],
        semanticSummary: {
          input: "User Query",
          output: `{\n  intent: "clearance_routing",\n  args: { req_id: "404" }\n}`,
          notes: ["parse approval intent", "resolve risk signal"],
        },
        planSummary: {
          input: "runtime_intent",
          output:
            "execution_steps [ evaluate_risk, approval_gate, notify_reviewer ]",
          notes: ["map approval dependency", "build workflow path"],
        },
        parameterSummary: {
          input: "tool_results + approval_context",
          output: `RiskMetricsDTO(\n  risk_score=0.82\n)`,
        },
        toolSummary: {
          input: "resolved_params",
          output: "ApprovalDecisionDTO",
          toolName: "approval_gate",
          dtoName: "ApprovalDecisionDTO",
          policyLine: "workflow.high_risk_manual_review",
        },
        responseSummary: {
          input: "tool_results",
          output: "human-readable routing result",
          notes: ["read approval result", "write answer for user"],
        },
        foundation: {
          entities: ["Request", "RiskLevel", "ApprovalRequirement"],
          graphRelations: [
            "Request ──▶ RiskLevel",
            "RiskLevel ──▶ ApprovalRequirement",
          ],
          graphNotes: [
            "pre-built from entity relations",
            "only showing the workflow-related slice",
            "used to route approval execution",
          ],
          entityMap: [
            { entity: "RiskLevel", tool: "evaluate_risk" },
            { entity: "ApprovalRequirement", tool: "approval_gate" },
            { entity: "ReviewerNotification", tool: "notify_reviewer" },
          ],
        },
      },
    }),
    [],
  );

  const current = cases[useCase];
  const showRuntime = detailLevel >= 2;
  const showFoundation = detailLevel >= 3;

  const rows = [
    {
      layer: "Input Gate",
      subtitle: "Request Stream",
      active: false,
      stage: (
        <StageCard title="User Request Ingress" accent="blue">
          <SimpleBox>
            <div className="font-mono text-xs font-medium text-zinc-200">
              {current.query}
            </div>
          </SimpleBox>
        </StageCard>
      ),
    },
    {
      layer: "Semantic Layer",
      subtitle: "Parse Intent",
      active: current.layerHighlights.includes("Semantic Layer"),
      stage: (
        <StageCard
          title="Semantic Resolution"
          accent="blue"
          showConnector={showFoundation}
        >
          <FlatBlock
            title="Intent Parsing"
            notes={current.semanticSummary.notes}
          >
            <CompactIO
              input={current.semanticSummary.input}
              output={current.semanticSummary.output}
            />
          </FlatBlock>
        </StageCard>
      ),
    },
    {
      layer: "Planning Layer",
      subtitle: "Build Graph Plan",
      active: current.layerHighlights.includes("Planning Layer"),
      stage: (
        <StageCard
          title="Plan Construction"
          accent="violet"
          showConnector={showFoundation}
        >
          <FlatBlock title="plan_tools()" notes={current.planSummary.notes}>
            <CompactIO
              input={current.planSummary.input}
              output={current.planSummary.output}
            />
          </FlatBlock>
        </StageCard>
      ),
    },
    {
      layer: "Execution Layer",
      subtitle: "Runtime Loop",
      active: current.layerHighlights.includes("Execution Layer"),
      stage: (
        <StageCard title="Execution Orchestration" accent="emerald">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
              <div className="inline-flex items-center gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">
                  for step in steps:
                </span>
              </div>
              <div className="font-mono text-[9px] tracking-[0.15em] text-zinc-500 uppercase">
                deterministic context map loop
              </div>
            </div>

            <FlatBlock title="Runtime Parameter Resolution">
              <CompactIO
                input={current.parameterSummary.input}
                output={current.parameterSummary.output}
              />
            </FlatBlock>

            <FlatBlock title="Tool Execution Bubble">
              <CompactIO
                input={current.toolSummary.input}
                output={current.toolSummary.output}
              />

              {/* NESTED ENGINE INTERCEPTOR WITH SUBTLE EMERALD GLOW */}
              <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-950/[0.02] p-4 shadow-[inset_0_0_15px_rgba(16,185,129,0.02)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs font-bold text-emerald-400">
                      policy.evaluate()
                    </div>
                    <div className="mt-1 font-sans text-[11px] leading-normal text-zinc-400">
                      Policy logic is isolated from tools, but execution remains
                      strictly inline.
                    </div>
                  </div>

                  <div className="shrink-0 rounded border border-emerald-500/30 bg-emerald-950/40 px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-widest text-emerald-400 uppercase">
                    internal context shield
                  </div>
                </div>

                <div className="mt-3 rounded-lg border border-zinc-900 bg-black/60 p-3">
                  <div className="font-mono text-xs leading-relaxed text-zinc-400">
                    <span className="text-zinc-200">
                      {current.toolSummary.toolName}
                    </span>
                    <div className="pl-4 text-zinc-600">
                      └─{" "}
                      <span className="font-medium text-emerald-400">
                        policy.evaluate()
                      </span>
                    </div>
                    <div className="pl-8 text-zinc-500">
                      └─ {current.toolSummary.dtoName}
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 font-mono text-[10px] tracking-wide text-emerald-500/60">
                  Active Rule Node:{" "}
                  <span className="text-emerald-400/80">
                    {current.toolSummary.policyLine}
                  </span>
                </div>
              </div>
            </FlatBlock>

            <FlatBlock title="Result Collection">
              <div className="font-mono text-xs text-zinc-400">
                append tool outputs directly into{" "}
                <span className="font-medium text-blue-400">
                  tool_results[]
                </span>
              </div>
            </FlatBlock>
          </div>
        </StageCard>
      ),
    },
    {
      layer: "Response Layer",
      subtitle: "Write Answer",
      active: false,
      stage: (
        <StageCard title="Response Synthesis" accent="amber">
          <FlatBlock
            title="Final Response Generation"
            notes={current.responseSummary.notes}
          >
            <CompactIO
              input={current.responseSummary.input}
              output={current.responseSummary.output}
            />

            <div className="mt-4 rounded-xl border border-l-2 border-amber-500/15 border-l-amber-500/50 bg-amber-500/[0.015] p-3.5">
              <div className="font-mono text-xs leading-relaxed font-medium text-amber-200/90">
                {useCase === "refund"
                  ? "“根据查询结果，订单123因商品已发货，无法进行退款。”"
                  : useCase === "marketing"
                    ? "“User u99 matches retention coupon routing rules; generating allocation token.”"
                    : "“Request flagged for high-risk manual evaluation; routing to L3 manager queues.”"}
              </div>
            </div>
          </FlatBlock>
        </StageCard>
      ),
    },
  ];

  return (
    <section className="min-h-screen overflow-hidden bg-[#04060A] px-4 py-16 text-zinc-100 select-none md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER SECTION */}
        <div className="mb-12 flex flex-col gap-6 border-b border-zinc-900 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
              System Architecture Telemetry
            </div>
            <h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent text-white">
              Runtime Flow
            </h1>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-zinc-400">
              Structured operational execution built on dependency-aware runtime
              orchestration.
            </p>
          </div>

          <LevelControl value={detailLevel} onChange={setDetailLevel} />
        </div>

        {/* STICKY CONDITIONAL SELECTOR HUB */}
        <div className="sticky top-4 z-50 mb-10 rounded-xl border border-zinc-800/80 bg-[#04060A]/75 p-2 shadow-xl shadow-black/40 backdrop-blur-md">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {(Object.entries(cases) as [UseCase, UseCaseData][]).map(
              ([key, item]) => {
                const selected = key === useCase;
                return (
                  <button
                    key={key}
                    onClick={() => setUseCase(key)}
                    className={`rounded-lg border p-3.5 text-left transition-all duration-200 ${
                      selected
                        ? item.status === "CURRENT IMPLEMENTATION"
                          ? "border-blue-500/40 bg-blue-500/[0.03] shadow-[inset_0_0_12px_rgba(59,130,246,0.02)]"
                          : "border-zinc-700 bg-zinc-900"
                        : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-800"
                    }`}
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-semibold ${selected ? "text-white" : "text-zinc-400"}`}
                      >
                        {item.label}
                      </span>
                      <StatusBadge
                        current={item.status === "CURRENT IMPLEMENTATION"}
                      >
                        {item.status}
                      </StatusBadge>
                    </div>

                    <div className="truncate font-mono text-[11px] text-zinc-500">
                      {item.query}
                    </div>
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* CONTROLLER BLOCK CANVAS */}
        <div className="transition-all duration-300">
          {/* STATE 1: LAYERS CARD ONLY */}
          {detailLevel === 1 && (
            <div className="mx-auto max-w-md space-y-3.5 py-10">
              <div className="mb-4 text-center font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
                Operational Framework Boundaries
              </div>
              {rows.map((row) => (
                <LayerCard
                  key={row.layer}
                  title={row.layer}
                  subtitle={row.subtitle}
                  active={row.active}
                  centered
                />
              ))}
            </div>
          )}

          {/* STATE 2 & 3: GRID RUNTIME INFRASTRUCTURE */}
          {detailLevel >= 2 && (
            <div
              className={`relative grid transition-all duration-300 ${
                detailLevel === 2
                  ? "grid-cols-[180px_1fr] gap-x-8"
                  : "gap-x-8 lg:grid-cols-[180px_1fr_300px]"
              }`}
            >
              {/* TIMELINE CONNECTOR WIRE */}
              <div className="absolute top-6 bottom-6 left-[199px] hidden w-0.5 bg-gradient-to-b from-zinc-800 via-zinc-900 to-transparent md:block" />

              {/* UNIFIED ROW LOOP MAPPING TO GUARANTEE SYNC SCROLL & ALIGNMENT */}
              <div className="contents">
                {rows.map((row, idx) => (
                  <React.Fragment key={row.layer}>
                    {/* COL 1: FRAMEWORK LABELS */}
                    <div className="hidden self-start pt-4 pb-6 md:block">
                      <LayerCard
                        title={row.layer}
                        subtitle={row.subtitle}
                        active={row.active}
                      />
                    </div>

                    {/* COL 2: STAGE EXECUTION PANEL */}
                    <div className="pb-6">{row.stage}</div>

                    {/* COL 3: ATOMIC MEMORY REGISTRY FOUNDATION (RENDERED ONCE AS ROW-SPAN TO SYNC) */}
                    {detailLevel === 3 && idx === 0 && (
                      <div className="row-span-5 space-y-4 pb-6 lg:border-l lg:border-zinc-900 lg:pl-6">
                        <div className="mb-4 font-mono text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
                          Graph Context Foundations
                        </div>

                        <FoundationCard
                          title="Active Operational Entities"
                          label="dependency graph entities"
                        >
                          <div className="flex flex-wrap gap-1.5">
                            {current.foundation.entities.map((entity) => (
                              <span
                                key={entity}
                                className="rounded border border-zinc-800 bg-zinc-900/60 px-2 py-1 font-mono text-[11px] text-zinc-300"
                              >
                                {entity}
                              </span>
                            ))}
                          </div>
                        </FoundationCard>

                        <FoundationCard
                          title="Requires / Provides Topology"
                          label="planner constraints"
                        >
                          <div className="space-y-1.5 rounded-lg border border-zinc-900 bg-black/40 p-3 font-mono text-[11px] text-blue-400">
                            {current.foundation.graphRelations.map(
                              (relation) => (
                                <div key={relation}>{relation}</div>
                              ),
                            )}
                          </div>
                          <div className="mt-3 space-y-1 border-t border-zinc-900 pt-3">
                            {current.foundation.graphNotes.map((note) => (
                              <div
                                key={note}
                                className="text-[10px] leading-normal text-zinc-500"
                              >
                                • {note}
                              </div>
                            ))}
                          </div>
                        </FoundationCard>

                        <FoundationCard
                          title="entity_to_tool map"
                          label="runtime registry index"
                        >
                          <div className="space-y-2 rounded-lg border border-zinc-900 bg-black/40 p-3 font-mono text-[11px]">
                            {current.foundation.entityMap.map((row) => (
                              <MappingRow
                                key={row.entity}
                                entity={row.entity}
                                tool={row.tool}
                              />
                            ))}
                          </div>
                        </FoundationCard>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ========================= Atom UI Sub-components ========================= */

function LevelControl({
  value,
  onChange,
}: {
  value: DetailLevel;
  onChange: (level: DetailLevel) => void;
}) {
  const steps: { value: DetailLevel; label: string }[] = [
    { value: 1, label: "Layers" },
    { value: 2, label: "Runtime" },
    { value: 3, label: "Foundation" },
  ];

  return (
    <div className="w-[260px]">
      <div className="mb-2.5 flex items-center justify-between font-mono text-[9px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
        {steps.map((step) => (
          <span
            key={step.value}
            className={value === step.value ? "text-zinc-200" : ""}
          >
            {step.label}
          </span>
        ))}
      </div>

      <div className="relative">
        <div className="h-0.5 rounded-full bg-zinc-900" />
        <div
          className={`absolute top-0 left-0 h-0.5 rounded-full bg-zinc-400 transition-all duration-300 ${
            value === 1 ? "w-0" : value === 2 ? "w-1/2" : "w-full"
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-between">
          {steps.map((step) => (
            <button
              key={step.value}
              onClick={() => onChange(step.value)}
              className={`-mt-[5px] h-3 w-3 rounded-full border transition-all duration-200 ${
                value >= step.value
                  ? "border-white bg-zinc-200 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  : "border-zinc-800 bg-zinc-950"
              }`}
              aria-label={step.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  current,
  children,
}: {
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold tracking-wide uppercase ${
        current
          ? "bg-blue-500 text-zinc-950 shadow-sm shadow-blue-500/20"
          : "border border-zinc-800/80 bg-zinc-900/60 text-zinc-500"
      }`}
    >
      {children}
    </span>
  );
}

function LayerCard({
  title,
  subtitle,
  active,
  centered,
}: {
  title: string;
  subtitle: string;
  active?: boolean;
  centered?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-xl border p-3 transition-all duration-200 ${
        centered ? "border-zinc-800 bg-zinc-900/10 px-8 py-5 text-center" : ""
      } ${
        active
          ? "border-blue-500/30 bg-blue-500/[0.02] shadow-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`text-xs font-semibold ${active ? "text-blue-400" : "text-zinc-300"}`}
      >
        {title}
      </div>
      <div className="mt-0.5 font-mono text-[10px] tracking-[0.15em] text-zinc-500 uppercase">
        {subtitle}
      </div>
    </div>
  );
}

function StageCard({
  title,
  children,
  accent,
  showConnector,
}: {
  title: string;
  children: React.ReactNode;
  accent: "blue" | "violet" | "emerald" | "amber";
  showConnector?: boolean;
}) {
  const borderMap = {
    blue: "border-zinc-800/80",
    violet: "border-zinc-800/80",
    emerald: "border-zinc-800/80",
    amber: "border-zinc-800/80",
  };

  return (
    <div
      className={`relative rounded-2xl border bg-zinc-900/20 p-5 backdrop-blur-sm ${borderMap[accent]}`}
    >
      {showConnector && (
        <div className="absolute top-12 right-[-32px] hidden w-[32px] border-t border-dashed border-zinc-800 lg:block" />
      )}

      <h2 className="mb-4 font-mono text-sm font-semibold tracking-tight tracking-wider text-zinc-200 uppercase">
        {title}
      </h2>
      {children}
    </div>
  );
}

function FlatBlock({
  title,
  notes,
  children,
}: {
  title: string;
  notes?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3 rounded-xl border border-zinc-900 bg-zinc-950/40 p-4 last:mb-0">
      <div className="mb-2 font-mono text-[9px] font-bold tracking-[0.15em] text-zinc-500 uppercase">
        {title}
      </div>

      {notes && notes.length > 0 && (
        <div className="mb-3 inline-block rounded bg-zinc-900/30 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
          {notes.join("  •  ")}
        </div>
      )}

      {children}
    </div>
  );
}

function CompactIO({ input, output }: { input: string; output: string }) {
  return (
    <div className="grid grid-cols-[1fr_24px_1.2fr] items-stretch gap-2">
      <SmallIO label="Input Payload" value={input} />
      <div className="flex items-center justify-center">
        <div className="relative h-px w-full bg-zinc-800">
          <div className="absolute top-1/2 right-0 h-1 w-1 -translate-y-1/2 rounded-full bg-zinc-600" />
        </div>
      </div>
      <SmallIO label="Output Matrix" value={output} blue />
    </div>
  );
}

function SmallIO({
  label,
  value,
  blue,
}: {
  label: string;
  value: string;
  blue?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-2.5 ${
        blue
          ? "border-blue-900/20 bg-blue-500/[0.01]"
          : "border-zinc-900/60 bg-zinc-950/60"
      }`}
    >
      <div className="mb-1.5 font-mono text-[8px] font-bold tracking-[0.15em] text-zinc-600 uppercase">
        {label}
      </div>
      <div
        className={`font-mono text-[11px] leading-normal whitespace-pre-wrap ${
          blue ? "text-blue-400" : "text-zinc-300"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function FoundationCard({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-900 bg-zinc-950/40 p-4">
      <div className="mb-3">
        <div className="mb-0.5 text-xs font-semibold text-zinc-300">
          {title}
        </div>
        <div className="font-mono text-[9px] tracking-[0.15em] text-zinc-500 uppercase">
          {label}
        </div>
      </div>
      {children}
    </div>
  );
}

function MappingRow({ entity, tool }: { entity: string; tool: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-0.5">
      <div className="text-zinc-400">{entity}</div>
      <div className="text-zinc-700">→</div>
      <div className="font-medium text-zinc-300">{tool}</div>
    </div>
  );
}

function SimpleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-3.5">
      {children}
    </div>
  );
}
