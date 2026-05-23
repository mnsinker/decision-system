"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/LanguageProvider";
import ExplanationCard from "./PressureExplanationCard";

import {
  GitBranch,
  Code2,
  MousePointer2,
  ShieldAlert,
  FlaskConical,
  ClipboardCheck,
  Flame,
} from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type ViewMode = "code" | "graph";

function ViewToggle({
  viewMode,
  setViewMode,
  locale,
}: {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  locale: string;
}) {
  return (
    <div className="inline-flex shrink-0 rounded-full border border-slate-200 bg-slate-100/80 p-0.5 shadow-inner">
      <button
        onClick={() => setViewMode("code")}
        className={`flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase transition-all ${
          viewMode === "code"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-400 hover:text-slate-600"
        }`}
      >
        <Code2 size={11} />
        {locale === "zh" ? "代码" : "Code"}
      </button>

      <button
        onClick={() => setViewMode("graph")}
        className={`flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase transition-all ${
          viewMode === "graph"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-400 hover:text-slate-600"
        }`}
      >
        <GitBranch size={11} />
        {locale === "zh" ? "依赖图" : "Graph"}
      </button>
    </div>
  );
}

function ModePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-rose-500 uppercase">
      {icon}
      {label}
    </div>
  );
}

/**
 * =========================================================================
 * CODE VIEW: RE-DESIGNED LIGHT TECH IDE LIGHT MODE (完美的对比度平衡)
 * =========================================================================
 */
function CodeView({
  viewMode,
  setViewMode,
  locale,
}: {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  locale: string;
}) {
  const isZh = locale === "zh";

  return (
    <div className="relative mt-8 rounded-2xl border-2 border-rose-200 bg-white p-4 shadow-[0_25px_50px_rgba(244,63,94,0.06)] transition-all duration-300">
      {/* Top Controller Row */}
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
        <div>
          <ModePill
            icon={<Code2 size={11} />}
            label={locale === "zh" ? "过程式编码" : "Procedural Coding"}
          />
        </div>
        <ViewToggle
          viewMode={viewMode}
          setViewMode={setViewMode}
          locale={locale}
        />
      </div>

      {/* Editor Body */}
      <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50/70 p-4 font-mono text-[12.5px] leading-relaxed text-slate-600 antialiased select-none">
        <div className="font-bold text-purple-600">
          <span className="font-medium text-blue-600">def</span> refund_flow_v5
          <span className="text-slate-400">(</span>order
          <span className="text-slate-400">):</span>
        </div>

        <div className="pl-4 text-slate-500">
          <span className="font-semibold text-blue-600">shipping</span> =
          get_shipping(order.id)
        </div>

        <div className="pl-4 text-slate-500">
          <span className="font-semibold text-blue-600">history</span> =
          get_user_history(order.user_id)
        </div>

        {/* Interactive Row: Tax */}
        {/* Interactive Row: Tax */}

        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <div className="relative cursor-pointer rounded-md border-l-2 border-transparent py-1 pl-4 text-slate-500 transition-all duration-150 hover:border-amber-400/70 hover:bg-amber-50 hover:text-slate-800">
              <span className="font-semibold text-blue-600">tax</span> =
              get_tax_profile(order.id,{" "}
              <span className="rounded border border-amber-200/60 bg-amber-100 px-1 text-[11px] font-bold text-amber-700">
                shipping.zone
              </span>
              )
            </div>
          </HoverCardTrigger>

          <HoverCardContent
            side="bottom"
            align="start"
            sideOffset={10}
            className="w-[260px] border border-amber-200 bg-white text-slate-700 shadow-xl"
          >
            <div className="space-y-1">
              <div className="font-mono text-[10px] font-bold tracking-wider text-amber-600 uppercase">
                {isZh ? "隐藏依赖" : "Hidden Dependency"}
              </div>

              <p className="text-xs leading-5 text-slate-600">
                {isZh
                  ? "税务计算悄悄依赖了 shipping 的运行时上下文。"
                  : "Tax calculation silently depends on shipping runtime context."}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <div className="pl-4 text-slate-500">
          <span className="font-semibold text-blue-600">contract</span> =
          get_contract(order.user_id, history.level)
        </div>

        {/* Interactive Row: Eligibility */}

        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <div className="relative cursor-pointer rounded-md border-l-2 border-transparent py-1 pl-4 text-slate-500 transition-all duration-150 hover:border-amber-400/70 hover:bg-amber-50 hover:text-slate-800">
              <span className="font-semibold text-blue-600">eligibility</span> =
              check_refund_eligibility(history, tax, contract,{" "}
              <span className="rounded border border-amber-200/60 bg-amber-100 px-1 text-[11px] font-bold text-amber-700">
                shipping.zone
              </span>
              )
            </div>
          </HoverCardTrigger>

          <HoverCardContent
            side="bottom"
            align="start"
            sideOffset={10}
            className="w-[280px] border border-amber-200 bg-white text-slate-700 shadow-xl"
          >
            <div className="space-y-1">
              <div className="font-mono text-[10px] font-bold tracking-wider text-amber-600 uppercase">
                {isZh ? "隐式耦合" : "Implicit Coupling"}
              </div>

              <p className="text-xs leading-5 text-slate-600">
                {isZh
                  ? "Eligibility 通过参数传播开始依赖 shipping 运行时上下文。"
                  : "Eligibility now depends on shipping runtime context through parameter propagation."}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* Orchestration Return Bar */}
        <div className="mt-4 border-t border-slate-200 pt-3">
          <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-[11px] leading-relaxed text-slate-500 shadow-2xs">
            <span className="font-medium text-blue-600">return</span>{" "}
            create_refund(
            <span className="text-slate-600">order.id, </span>
            <span className="font-semibold text-rose-600 decoration-rose-400/60 decoration-dashed">
              eligibility
            </span>
            )
          </div>
        </div>
      </div>

      {/* Editor Footer Hint */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
        <MousePointer2 size={12} className="animate-pulse text-slate-500" />
        {locale === "zh"
          ? "悬停高亮代码以追踪隐式架构泄漏"
          : "Hover highlighted lines to trace implicit architecture leak."}
      </div>
    </div>
  );
}

/**
 * =========================================================================
 * GRAPH VIEW: CLEAN RECONSTRUCTED TOPOLOGY
 * =========================================================================
 */
function GraphView({
  viewMode,
  setViewMode,
  locale,
  content,
}: {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  locale: string;
  content?: { badges?: string[] };
}) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Top Controller Row */}
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
        <div>
          <ModePill
            icon={<GitBranch size={11} />}
            label={content?.badges?.[1] || "Implicit Dependency Graph"}
          />
        </div>
        <ViewToggle
          viewMode={viewMode}
          setViewMode={setViewMode}
          locale={locale}
        />
      </div>

      {/* Graph Visual Panel */}
      <div className="relative flex min-h-[240px] flex-col rounded-xl border border-slate-100 bg-slate-50/50 p-4">
        {/* Clean Structured Nodes */}
        <div className="-mt-2 font-mono text-[13px] leading-4.5 whitespace-pre text-slate-700">
          {`
                  Order
                  ├─ Shipping
                  │  ├─ Tax
                  │  └─ Eligibility
                  │
                  ├─ History
                  ├─ Contract
                  │
                  └─ Eligibility
                     ├─ History
                     ├─ Tax
                     ├─ Contract
                     └─ Shipping.zone
                  
                  Eligibility
                  └─ CreateRefund
`}
        </div>

        <div className="mt-6 text-center font-mono text-[10px] tracking-[0.18em] text-slate-400">
          {locale === "zh"
            ? "─ 依赖图隐式存在于代码中 ─"
            : "─ The graph only exists implicitly in code ─"}
        </div>
      </div>
    </div>
  );
}

function GraphNode({
  label,
  highlight = "none",
}: {
  label: string;
  highlight?: "none" | "blue" | "amber" | "rose" | "dark";
}) {
  const styleMap = {
    none: "border-slate-200 bg-white text-slate-600 font-medium",
    blue: "border-sky-200 bg-sky-50 text-sky-700 font-semibold",
    amber: "border-amber-200 bg-amber-50 text-amber-700 font-bold",
    rose: "border-rose-300 bg-rose-500 text-white font-black shadow-sm ring-4 ring-rose-50",
    dark: "border-slate-800 bg-slate-900 text-white font-bold shadow-md",
  };

  return (
    <div
      className={`rounded-lg border px-3 py-1.5 text-center font-mono text-[11px] shadow-2xs transition-all ${styleMap[highlight]}`}
    >
      {label}
    </div>
  );
}

export default function PressureLeftVisual2({
  content,
}: {
  content?: {
    rootCauseTitle: string;
    rootCauseMsg: string;

    badges?: string[];

    engineeringConsequencesTitle?: string;

    consequences?: {
      title: string;
      msg: string;
    }[];
  };
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("code");
  const { locale } = useLanguage();

  return (
    // 用同一个 min-h 列流规范它，代码区和图表区在上方做垂直居中，底栏沉底
    <div className="flex h-full min-h-[420px] flex-1 flex-col justify-between">
      <div className="flex flex-1 flex-col justify-center">
        {viewMode === "code" ? (
          <CodeView
            viewMode={viewMode}
            setViewMode={setViewMode}
            locale={locale}
          />
        ) : (
          <GraphView
            viewMode={viewMode}
            setViewMode={setViewMode}
            locale={locale}
            content={content}
          />
        )}
      </div>

      <div className="mt-auto pt-5">
        <ExplanationCard
          viewMode="graph"
          engineeringTitle={content?.engineeringConsequencesTitle}
          consequences={content?.consequences}
        />
      </div>
    </div>
  );
}
