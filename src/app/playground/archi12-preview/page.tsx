"use client";

import React, { useMemo, useState } from "react";

type DetailLevel = 1 | 2 | 3;
type UseCase = "refund" | "marketing" | "workflow";

export default function RuntimeArchitectureFlow() {
  const [detailLevel, setDetailLevel] = useState<DetailLevel>(2);
  const [useCase, setUseCase] = useState<UseCase>("refund");

  const showRuntime = detailLevel >= 2;
  const showFoundation = detailLevel >= 3;

  const cases = useMemo(() => {
    return {
      refund: {
        label: "Refund Evaluation",
        tag: "CURRENT IMPLEMENTATION",
        query: `"订单123 是否可以退款吗？"`,
        semanticOutput: `{
  intent: "check_refund",
  args: {
    order_id: "123"
  }
}`,
        planningOutput: `[
  get_order,
  check_refund
]`,
        parameterOutput: `{
  order: OrderSummaryDTO(
    order_id="123",
    user_id="u1",
    days=3,
    shipped=true,
    custom=false,
    amount=1000.0
  )
}`,
        toolOutput: `RefundDecisionDTO(
  allowed=false,
  reason="product is already shipped",
  policy_rule="refund.block.shipped_order"
)`,
        response: `根据查询结果，订单123因商品已发货，无法进行退款。`,
        layers: ["Planning Layer", "Policy Layer"],
        semanticRelations: [
          "Order ──▶ RefundEligibility",
          "Order ──▶ ShippingState",
        ],
        entityMap: [
          { entity: "Order", tool: "get_order" },
          { entity: "RefundEligibility", tool: "check_refund" },
        ],
      },

      marketing: {
        label: "AI Marketing Decision",
        tag: "EXTENSION PATTERN",
        query: `"哪些用户应该发 retention coupon？"`,
        semanticOutput: `{
  intent: "coupon_recommendation",
  target: "retention_users"
}`,
        planningOutput: `[
  get_user_profile,
  check_coupon_policy,
  campaign_action
]`,
        parameterOutput: `{
  user_profile,
  campaign_context
}`,
        toolOutput: `CouponDecisionDTO(
  eligible=true,
  campaign_group="retention_A"
)`,
        response: `部分用户满足 retention coupon 条件。`,
        layers: ["Semantic Layer", "Policy Layer"],
        semanticRelations: [
          "User ──▶ CouponEligibility",
          "User ──▶ CampaignContext",
        ],
        entityMap: [
          { entity: "User", tool: "get_user_profile" },
          { entity: "CouponEligibility", tool: "check_coupon_policy" },
          { entity: "CampaignAction", tool: "campaign_action" },
        ],
      },

      workflow: {
        label: "Workflow Automation",
        tag: "EXTENSION PATTERN",
        query: `"高风险退款需要人工审批"`,

        semanticOutput: `{
  intent: "approval_workflow",
  risk_level: "high"
}`,
        planningOutput: `[
  evaluate_risk,
  approval_gate,
  notify_reviewer
]`,
        parameterOutput: `{
  risk_result,
  approval_context
}`,
        toolOutput: `ApprovalDecisionDTO(
  route="manual_review"
)`,
        response: `该请求已进入人工审批流程。`,
        layers: ["Execution Layer", "Policy Layer"],
        semanticRelations: [
          "RefundRequest ──▶ RiskLevel",
          "RiskLevel ──▶ ApprovalRequirement",
        ],
        entityMap: [
          { entity: "RiskLevel", tool: "evaluate_risk" },
          { entity: "ApprovalRequirement", tool: "approval_gate" },
          { entity: "ReviewerNotification", tool: "notify_reviewer" },
        ],
      },
    };
  }, []);

  const current = cases[useCase];

  const layers = [
    {
      title: "Input",
      subtitle: "Operational Request",
      active: false,
    },
    {
      title: "Semantic Layer",
      subtitle: "Operational Meaning",
      active: current.layers.includes("Semantic Layer"),
    },
    {
      title: "Planning Layer",
      subtitle: "Dependency Resolution",
      active: current.layers.includes("Planning Layer"),
    },
    {
      title: "Execution Layer",
      subtitle: "Runtime Orchestration",
      active: current.layers.includes("Execution Layer"),
    },
    {
      title: "Response Layer",
      subtitle: "Human Response",
      active: false,
    },
  ];

  return (
    <section className="min-h-screen overflow-hidden bg-[#05070B] px-8 py-16 text-white">
      <div className="mx-auto max-w-[1580px]">
        {/* HEADER */}
        <div className="mb-12 flex items-start justify-between gap-10">
          <div>
            <div className="mb-3 font-mono text-[10px] tracking-[0.24em] text-blue-400 uppercase">
              SECTION 04 // RUNTIME EXECUTION
            </div>

            <h1 className="mb-4 text-4xl font-semibold tracking-tight">
              Runtime Execution Flow
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-[#8791A5]">
              A query is transformed into structured intent, planned execution,
              tool results, and finally a human-readable answer.
            </p>
          </div>

          {/* DETAIL SLIDER */}
          <div className="w-[320px]">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
              <span>Layers</span>
              <span>Runtime</span>
              <span>Foundation</span>
            </div>

            <div className="relative">
              <div className="h-[2px] rounded-full bg-[#1A2230]" />

              <div
                className={`absolute top-0 left-0 h-[2px] rounded-full bg-blue-500 transition-all duration-500 ${
                  detailLevel === 1
                    ? "w-0"
                    : detailLevel === 2
                      ? "w-1/2"
                      : "w-full"
                }`}
              />

              <div className="absolute inset-0 flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <button
                    key={step}
                    onClick={() => setDetailLevel(step as DetailLevel)}
                    className={`-mt-[6px] h-4 w-4 rounded-full border transition-all duration-300 ${
                      detailLevel >= step
                        ? "border-blue-400 bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.4)]"
                        : "border-[#2A3445] bg-[#0D1218]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* USE CASE SELECTOR */}
        {detailLevel >= 2 && (
          <div className="mb-12 flex gap-3">
            {Object.entries(cases).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setUseCase(key as UseCase)}
                className={`min-w-[300px] rounded-2xl border px-5 py-3 text-left transition-all duration-300 ${
                  useCase === key
                    ? "border-blue-500/30 bg-blue-500/10 shadow-[0_0_25px_rgba(59,130,246,0.12)]"
                    : "border-[#1A2230] bg-[#0C1016] hover:border-[#2A3445]"
                }`}
              >
                <div className="mb-1 text-sm font-semibold">{value.label}</div>

                <div className="font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
                  {value.tag}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* MAIN GRID */}
        <div
          className={`grid transition-all duration-700 ${
            detailLevel === 1
              ? "grid-cols-1"
              : detailLevel === 2
                ? "grid-cols-[200px_1fr] gap-10"
                : "grid-cols-[200px_1fr_330px] gap-10"
          }`}
        >
          {/* LAYERS ONLY MODE */}
          <div
            className={`${
              detailLevel === 1
                ? "mx-auto max-w-[360px] space-y-5 pt-4"
                : "space-y-10 pt-[112px]"
            }`}
          >
            {layers.map((layer) => (
              <LayerCard
                key={layer.title}
                title={layer.title}
                subtitle={layer.subtitle}
                active={layer.active}
                centered={detailLevel === 1}
              />
            ))}
          </div>

          {/* CENTER — RUNTIME FLOW */}
          {showRuntime && (
            <div className="relative transition-all duration-700">
              <SectionLabel>Runtime Flow</SectionLabel>

              <div className="absolute top-[88px] bottom-[64px] left-[28px] w-px bg-gradient-to-b from-blue-500/40 via-violet-500/20 to-transparent" />

              {/* USER REQUEST */}
              <StageCard title="User Request" accent="blue">
                <SimpleBox>
                  <div className="font-mono text-sm text-white">
                    {current.query}
                  </div>
                </SimpleBox>
              </StageCard>

              {/* SEMANTIC */}
              <StageCard
                title="Semantic Resolution"
                accent="blue"
                showConnector={showFoundation}
              >
                <RuntimeBlock title="Intent Parsing">
                  <RuntimeIO
                    input="User Query"
                    output={current.semanticOutput}
                  />
                </RuntimeBlock>
              </StageCard>

              {/* PLANNING */}
              <StageCard
                title="Plan Construction"
                accent="violet"
                showConnector={showFoundation}
              >
                <RuntimeBlock title="plan_tools()">
                  <RuntimeIO
                    input="runtime_intent"
                    output={current.planningOutput}
                  />
                </RuntimeBlock>
              </StageCard>

              {/* EXECUTION */}
              <StageCard title="Execution Orchestration" accent="emerald">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#1A2230] bg-[#0C1118] px-3 py-1.5">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="font-mono text-[10px] tracking-[0.18em] text-emerald-300 uppercase">
                      for step in steps:
                    </span>
                  </div>

                  <RuntimeBlock title="Runtime Parameter Resolution">
                    <RuntimeIO
                      input={`tool_results[]
runtime_context`}
                      output={current.parameterOutput}
                    />
                  </RuntimeBlock>

                  <RuntimeBlock title="Tool Execution">
                    <RuntimeIO
                      input="resolved_params"
                      output={current.toolOutput}
                    />

                    <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-[0_0_26px_rgba(16,185,129,0.08)]">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="text-sm font-semibold text-emerald-300">
                          policy.evaluate()
                        </div>

                        <div className="font-mono text-[10px] tracking-[0.18em] text-emerald-400 uppercase">
                          isolated policy logic
                        </div>
                      </div>

                      <div className="rounded-xl border border-emerald-500/20 bg-[#07110D] p-3">
                        <div className="font-mono text-sm leading-relaxed text-white">
                          {`check_refund
└─ policy.evaluate()
   └─ RefundDecisionDTO`}
                        </div>
                      </div>
                    </div>
                  </RuntimeBlock>

                  <RuntimeBlock title="Result Collection">
                    <div className="text-sm text-[#B7C0D4]">
                      append tool results
                    </div>
                  </RuntimeBlock>
                </div>
              </StageCard>

              {/* RESPONSE */}
              <StageCard title="Response Synthesis" accent="amber">
                <RuntimeBlock title="Final LLM Response">
                  <div className="mb-5 space-y-2 text-sm text-[#B7C0D4]">
                    <div>• read tool results</div>
                    <div>• write answer for user</div>
                  </div>

                  <RuntimeIO input="tool_results" output={current.response} />
                </RuntimeBlock>
              </StageCard>
            </div>
          )}

          {/* RIGHT — FOUNDATION */}
          {showFoundation && (
            <div className="space-y-7 pt-[112px] transition-all duration-700">
              <SectionLabel>Semantic & Dependency Foundations</SectionLabel>

              <SubstrateCard>
                <div className="mb-5">
                  <div className="mb-2 text-xl font-semibold text-white">
                    Semantic Entity System
                  </div>

                  <div className="font-mono text-[10px] tracking-[0.18em] text-blue-400 uppercase">
                    ontology layer
                  </div>
                </div>

                <div className="space-y-3 font-mono text-sm text-blue-300">
                  {current.semanticRelations.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </SubstrateCard>

              <SubstrateCard>
                <div className="mb-5">
                  <div className="mb-2 text-xl font-semibold text-white">
                    entity_to_tool map
                  </div>

                  <div className="font-mono text-[10px] tracking-[0.18em] text-violet-400 uppercase">
                    runtime execution bridge
                  </div>
                </div>

                <div className="space-y-3 font-mono text-sm">
                  {current.entityMap.map((item, idx) => (
                    <MappingRow
                      key={idx}
                      entity={item.entity}
                      tool={item.tool}
                    />
                  ))}
                </div>
              </SubstrateCard>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ===================================================== */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 font-mono text-[11px] tracking-[0.22em] text-[#647089] uppercase">
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
      className={`rounded-2xl border p-4 transition-all duration-300 ${
        centered ? "text-center" : ""
      } ${
        active
          ? "border-blue-500/30 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
          : "border-[#1A2230] bg-[#0D1117]"
      }`}
    >
      <div className="mb-1 text-sm font-semibold text-white">{title}</div>

      <div className="font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
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
    emerald: "border-emerald-500/20",
    amber: "border-amber-500/20",
  };

  return (
    <div
      className={`relative mb-8 rounded-3xl border bg-[#0B0F15] p-5 ${accentMap[accent]}`}
    >
      <div className="absolute top-9 -left-[38px] flex h-4 w-4 items-center justify-center rounded-full border border-[#223046] bg-[#091018]">
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </div>

      {showConnector && (
        <div className="absolute top-14 right-[-60px] w-[60px] border-t border-dashed border-[#3C4B64]" />
      )}

      <h2 className="mb-5 text-xl font-semibold tracking-tight">{title}</h2>

      {children}
    </div>
  );
}

function RuntimeBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#1A2230] bg-[#090D13] p-4">
      <div className="mb-4 font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
        {title}
      </div>

      {children}
    </div>
  );
}

function RuntimeIO({ input, output }: { input: string; output: string }) {
  return (
    <div className="grid grid-cols-[1fr_36px_1fr] items-center gap-3">
      <IOCard label="Input" content={input} />

      <div className="flex items-center justify-center">
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#3D547A] to-transparent">
          <div className="absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
        </div>
      </div>

      <IOCard label="Output" content={output} blue />
    </div>
  );
}

function IOCard({
  label,
  content,
  blue,
}: {
  label: string;
  content: string;
  blue?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        blue
          ? "border-blue-500/20 bg-blue-500/[0.04]"
          : "border-[#1A2230] bg-[#0D1218]"
      }`}
    >
      <div className="mb-2 font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
        {label}
      </div>

      <pre
        className={`overflow-x-auto text-[13px] leading-relaxed whitespace-pre-wrap ${
          blue ? "text-blue-300" : "text-[#CBD3E1]"
        }`}
      >
        {content}
      </pre>
    </div>
  );
}

function SubstrateCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-[#1A2230] bg-[#0D1117] p-5">
      {children}
    </div>
  );
}

function MappingRow({ entity, tool }: { entity: string; tool: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-[#C7D0E0]">{entity}</div>
      <div className="text-[#647089]">→</div>
      <div className="text-violet-300">{tool}</div>
    </div>
  );
}

function SimpleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#1A2230] bg-[#0C1016] p-4">
      {children}
    </div>
  );
}
