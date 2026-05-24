"use client";

import React, { useMemo, useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

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

export default function ArchitectureFlow() {
  const { theme } = useTheme();
  const [detailLevel, setDetailLevel] = useState<DetailLevel>(2);
  const [useCase, setUseCase] = useState<UseCase>("refund");

  const cases: Record<UseCase, UseCaseData> = useMemo(
    () => ({
      refund: {
        label: "Refund Evaluation",
        status: "CURRENT IMPLEMENTATION",
        query: `"Can order 123 be refunded?"`,
        layerHighlights: ["Planning Layer", "Execution Layer"],
        semanticSummary: {
          input: "User Query",
          output: "runtime_intent { intent, order_id }",
          notes: ["parse intent", "extract order_id"],
        },
        planSummary: {
          input: "runtime_intent",
          output: "execution_steps [ get_order, check_refund ]",
          notes: ["map entity to tool", "build execution order"],
        },
        parameterSummary: {
          input: "tool_results + runtime_context",
          output: "resolved_params { order }",
        },
        toolSummary: {
          input: "resolved_params",
          output: "RefundDecisionDTO",
          toolName: "check_refund",
          dtoName: "RefundDecisionDTO",
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
          output: "runtime_intent { intent, target_group }",
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
          output: "resolved_params { user_profile, campaign }",
        },
        toolSummary: {
          input: "resolved_params",
          output: "CouponDecisionDTO",
          toolName: "check_coupon_policy",
          dtoName: "CouponDecisionDTO",
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
          output: "runtime_intent { intent, risk_level }",
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
          output: "resolved_params { risk_result, approval_context }",
        },
        toolSummary: {
          input: "resolved_params",
          output: "ApprovalDecisionDTO",
          toolName: "approval_gate",
          dtoName: "ApprovalDecisionDTO",
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
      layer: "Input",
      subtitle: "Request",
      active: false,
      stage: (
        <StageCard title="User Request" accent="blue">
          <SimpleBox>
            <div className="font-mono text-sm text-white">{current.query}</div>
          </SimpleBox>
        </StageCard>
      ),
    },
    {
      layer: "Semantic Layer",
      subtitle: "Meaning",
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
      subtitle: "Plan",
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
      subtitle: "Run",
      active: current.layerHighlights.includes("Execution Layer"),
      stage: (
        <StageCard title="Execution Orchestration" accent="emerald">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#1A2230]/70 pb-2.5">
              <div className="inline-flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] tracking-[0.18em] text-emerald-300 uppercase">
                  for step in steps:
                </span>
              </div>

              <div className="font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
                execution loop
              </div>
            </div>

            <FlatBlock title="Runtime Parameter Resolution">
              <CompactIO
                input={current.parameterSummary.input}
                output={current.parameterSummary.output}
              />
            </FlatBlock>

            <FlatBlock title="Tool Execution">
              <CompactIO
                input={current.toolSummary.input}
                output={current.toolSummary.output}
              />

              <div className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.045] p-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {/* Title change: text-emerald-300 -> text-white */}
                    <div className="text-[13px] font-semibold text-white">
                      policy.evaluate()
                    </div>
                  </div>
                  <div className="text-right text-[11px] leading-relaxed text-[#8EA09B]">
                    Currently policy is called inside tool execution.
                  </div>
                </div>

                <div className="relative mt-3 rounded-lg border border-[#1A2230]/80 bg-[#07110D] p-3">
                  <div className="absolute top-3 right-3 rounded border border-emerald-500/20 bg-emerald-950/30 px-2 py-1 font-mono text-[9px] tracking-[0.14em] text-emerald-400 uppercase">
                    isolated policy logic
                  </div>
                  <div className="pr-36 font-mono text-[12px] leading-relaxed text-[#BFD7D0]">
                    <span className="text-white">
                      {current.toolSummary.toolName}
                    </span>
                    <div className="pl-4 text-[#647089]">
                      └─{" "}
                      <span className="text-emerald-300">
                        policy.evaluate()
                      </span>
                    </div>
                    <div className="pl-8 text-[#9CA7B8]">
                      └─ {current.toolSummary.dtoName}
                    </div>
                  </div>
                </div>
              </div>
            </FlatBlock>

            <FlatBlock title="Result Collection">
              {/* Highlight changed text */}
              <div className="text-[13px] text-[#B7C0D4]">
                append tool outputs into{" "}
                <span className="font-mono font-medium text-blue-400">
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
      subtitle: "Answer",
      active: false,
      stage: (
        <StageCard title="Response Synthesis" accent="amber">
          <FlatBlock
            title="Final LLM Response"
            notes={current.responseSummary.notes}
          >
            <CompactIO
              input={current.responseSummary.input}
              output={current.responseSummary.output}
            />

            <div className="mt-3 rounded-lg border border-l-2 border-amber-500/15 border-l-amber-500/45 bg-amber-500/[0.035] p-3.5">
              <div className="text-[13px] leading-relaxed text-amber-100">
                “
                {useCase === "refund"
                  ? "根据查询结果，订单123因商品已发货，无法进行退款。"
                  : useCase === "marketing"
                    ? "Some users qualify for a retention coupon."
                    : "该请求已进入人工审批流程。"}
                ”
              </div>
            </div>
          </FlatBlock>
        </StageCard>
      ),
    },
  ];

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-[#05070B] text-white",
        theme.spacing.sectionXComfort,
        theme.spacing.sectionY,
      )}
    >
      <div className={cn("relative mx-auto", theme.spacing.container)}>
        {/* Header */}
        <div className="mb-7 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-blue-400 uppercase">
              SECTION 03 // RUNTIME FLOW
            </div>

            <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Runtime Flow
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-[#8791A5]">
              A query is transformed into structured intent, planned execution,
              tool results, and finally a human-readable answer.
            </p>
          </div>

          <SliderControl value={detailLevel} onChange={setDetailLevel} />
        </div>

        {/* Sticky selector - Sticky enabled with higher z-index & blur background */}
        <div className="sticky top-4 z-50 mb-7 rounded-xl border border-[#1A2230]/80 bg-[#05070B]/90 p-1.5 shadow-[0_14px_32px_rgba(0,0,0,0.34)] backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {(Object.entries(cases) as [UseCase, UseCaseData][]).map(
              ([key, item]) => {
                const selected = key === useCase;
                return (
                  <button
                    key={key}
                    onClick={() => setUseCase(key)}
                    className={`rounded-lg border p-3 text-left transition-all duration-300 ${
                      selected
                        ? item.status === "CURRENT IMPLEMENTATION"
                          ? "border-blue-500/35 bg-blue-500/10 shadow-[0_0_22px_rgba(59,130,246,0.1)]"
                          : "border-[#2A3445] bg-[#111722]"
                        : "border-[#151C28] bg-[#0B0F15] hover:border-[#2A3445]"
                    }`}
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <div
                        className={`text-sm font-semibold ${selected ? "text-white" : "text-[#B9C2D0]"}`}
                      >
                        {item.label}
                      </div>
                      <StatusBadge
                        current={item.status === "CURRENT IMPLEMENTATION"}
                      >
                        {item.status}
                      </StatusBadge>
                    </div>

                    <div className="truncate font-mono text-[11px] text-[#647089]">
                      {item.query}
                    </div>
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* Layers view only */}
        {detailLevel === 1 && (
          <div className="mx-auto max-w-[500px] space-y-3 py-6">
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

        {/* Runtime / Foundation Grid View */}
        {detailLevel >= 2 && (
          <div
            className={`grid transition-all duration-700 ${
              detailLevel === 2
                ? "grid-cols-[230px_minmax(0,1fr)] gap-6"
                : "grid-cols-[230px_minmax(0,1fr)_330px] gap-6"
            }`}
          >
            <div className="contents">
              <div>
                <SectionLabel>&nbsp;</SectionLabel>
              </div>
              <div>
                <SectionLabel>Runtime Flow</SectionLabel>
              </div>
              {detailLevel === 3 && (
                <div>
                  <SectionLabel>Semantic & Dependency Foundations</SectionLabel>
                </div>
              )}

              {rows.map((row, idx) => (
                <React.Fragment key={row.layer}>
                  <div className="pb-5">
                    <LayerCard
                      title={row.layer}
                      subtitle={row.subtitle}
                      active={row.active}
                    />
                  </div>

                  <div className="pb-5">{row.stage}</div>

                  {detailLevel === 3 && idx === 0 && (
                    <div className="row-span-5 space-y-4 pb-5">
                      <FoundationCard
                        title="Semantic Entities"
                        label="use-case slice"
                      >
                        <div className="flex flex-wrap gap-2">
                          {current.foundation.entities.map((entity) => (
                            <span
                              key={entity}
                              className="rounded border border-blue-500/15 bg-blue-500/[0.03] px-2.5 py-1.5 font-mono text-[12px] text-blue-300/90"
                            >
                              {entity}
                            </span>
                          ))}
                        </div>
                      </FoundationCard>

                      <FoundationCard
                        title="Dependency Graph"
                        label="pre-built relations"
                      >
                        <div className="mb-4 space-y-2.5 font-mono text-[12px] text-blue-300/80">
                          {current.foundation.graphRelations.map((relation) => (
                            <div key={relation}>{relation}</div>
                          ))}
                        </div>

                        <div className="space-y-1.5 border-t border-[#161F2E] pt-3">
                          {current.foundation.graphNotes.map((note) => (
                            <div
                              key={note}
                              className="text-[11px] leading-relaxed text-[#737F94]"
                            >
                              • {note}
                            </div>
                          ))}
                        </div>
                      </FoundationCard>

                      <FoundationCard
                        title="Entity_to_Tool Map"
                        label="runtime bridge"
                      >
                        <div className="space-y-2.5 font-mono text-[12px]">
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
    </section>
  );
}

/* ========================= Sub-Components ========================= */

// Renamed and spacing tweaked to support lower track layout and "slider" indicator room
function SliderControl({
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
    <div className="w-[320px]">
      <div className="mb-3 grid grid-cols-3 font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
        {steps.map((step) => (
          <span
            key={step.value}
            className={`${
              step.value === 1
                ? "text-left"
                : step.value === 2
                  ? "text-center"
                  : "text-right"
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>

      <div className="relative h-5">
        <div className="absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 rounded-full bg-[#1A2230]" />
        <div
          className={`absolute top-1/2 left-0 h-[2px] -translate-y-1/2 rounded-full bg-blue-500 transition-all duration-500 ${
            value === 1 ? "w-0" : value === 2 ? "w-1/2" : "w-full"
          }`}
        />
        <div
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-blue-400 bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.4)] transition-all duration-500 ${
            value === 1
              ? "left-0"
              : value === 2
                ? "left-1/2 -translate-x-1/2"
                : "right-0"
          }`}
          aria-hidden
        />

        <div
          className="absolute inset-0 flex items-center justify-between"
          aria-hidden
        >
          {steps.map((step) => (
            <span
              key={step.value}
              className="h-2 w-px rounded-full bg-[#647089]/45"
            />
          ))}
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={1}
          value={value}
          onChange={(event) =>
            onChange(Number(event.target.value) as DetailLevel)
          }
          className="absolute inset-0 h-5 w-full cursor-pointer opacity-0"
          aria-label="Runtime flow detail level"
        />
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
          ? "bg-blue-500 text-[#06101F] shadow-sm shadow-blue-500/20"
          : "border border-[#1A2230] bg-[#0D1218] text-[#647089]"
      }`}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3.5 font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
      {children}
    </div>
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
      className={`w-full rounded-xl border p-3.5 transition-all duration-300 ${
        centered ? "px-8 py-5 text-center" : ""
      } ${
        active
          ? "border-blue-500/30 bg-blue-500/[0.085] shadow-[0_0_16px_rgba(59,130,246,0.08)]"
          : "border-[#1A2230]/90 bg-[#0D1117]"
      }`}
    >
      <div className="mb-1 text-[13px] font-semibold text-white">{title}</div>
      <div className="font-mono text-[10px] tracking-[0.16em] text-[#647089] uppercase">
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
  const accentMap = {
    blue: "border-blue-500/20",
    violet: "border-violet-500/20",
    emerald: "border-emerald-500/25",
    amber: "border-amber-500/20",
  };

  return (
    <div
      className={`relative rounded-xl border bg-[#0B0F15] p-4 ${accentMap[accent]}`}
    >
      {showConnector && (
        <div className="absolute top-14 right-[-48px] w-[48px] border-t border-dashed border-[#243147]" />
      )}

      <h2 className="mb-4 text-lg font-semibold tracking-tight">{title}</h2>
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
    <div className="rounded-lg border border-[#1A2230]/70 bg-white/[0.018] p-3.5">
      <div className="mb-2 font-mono text-[10px] tracking-[0.16em] text-[#647089] uppercase">
        {title}
      </div>

      {notes && notes.length > 0 && (
        <div className="mb-3 font-mono text-[10px] tracking-[0.1em] text-[#8A95A8] uppercase">
          {notes.join("  •  ")}
        </div>
      )}

      {children}
    </div>
  );
}

function CompactIO({ input, output }: { input: string; output: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_32px_minmax(0,1.15fr)] items-stretch gap-3">
      <SmallIO label="Input" value={input} />
      <div className="flex items-center justify-center">
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#3D547A] to-transparent">
          <div className="absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
        </div>
      </div>
      <SmallIO label="Output" value={output} blue />
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
          ? "border-blue-500/20 bg-blue-500/[0.035]"
          : "border-[#1A2230]/80 bg-[#0D1218]/70"
      }`}
    >
      <div className="mb-1.5 font-mono text-[9px] tracking-[0.16em] text-[#647089] uppercase">
        {label}
      </div>
      <div
        className={`font-mono text-[11px] leading-relaxed whitespace-pre-wrap ${
          blue ? "text-blue-300" : "text-[#CBD3E1]"
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
    <div className="rounded-xl border border-[#141B26] bg-[#080B10] p-4 shadow-inner shadow-black/20">
      <div className="mb-3">
        <div className="mb-1 text-[13px] font-semibold text-[#E2E8F0]">
          {title}
        </div>
        <div className="font-mono text-[9px] tracking-[0.16em] text-[#4F5B73] uppercase">
          {label}
        </div>
      </div>
      {children}
    </div>
  );
}

function MappingRow({ entity, tool }: { entity: string; tool: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-[#A2AFB6]">{entity}</div>
      <div className="text-[#4F5B73]">→</div>
      <div className="text-violet-300/90">{tool}</div>
    </div>
  );
}

function SimpleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#1A2230]/80 bg-[#0C1016] p-3.5">
      {children}
    </div>
  );
}
