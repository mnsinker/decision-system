"use client";

import React from "react";
import { TriangleAlert, Zap } from "lucide-react";
import PressureExplanationCard from "./PressureExplanationCard";

export default function PressureLeftVisual3({
  content,
}: {
  content?: {
    rootCauseTitle: string;
    rootCauseMsg: string;
  };
}) {
  return (
    // 套用统一的 Shared 组件高度池，设定同等最小高度 min-h-[520px]
    <div className="flex h-full min-h-[520px] flex-1 flex-col justify-between">
      {/* 视觉内容区：垂直居中，吸收多余的空白空间 */}
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <PolicyLeakingVisual />
      </div>

      {/* 说明卡片区：利用 mt-auto 强行将其压到底部对齐基准线上 */}
      <div className="mt-auto w-full pt-8">
        <PressureExplanationCard
          viewMode="code"
          label={content?.rootCauseTitle || "Runtime Contamination"}
          description={
            content?.rootCauseMsg ||
            "Small rule changes are embedded directly inside execution services. Tests must reason about the whole black-box runtime order, increasing the chance of production outages with every update."
          }
        />
      </div>
    </div>
  );
}

function PolicyLeakingVisual() {
  return (
    // 1. 最外层只负责在整个卡片区域内居中，去掉 relative
    <div className="flex h-[360px] w-full items-center justify-center overflow-visible">
      {/* 2. 核心魔法：引入一个物理尺寸定死 (w-[420px]) 且禁止收缩 (shrink-0) 的坐标系锚点容器 */}
      <div className="relative flex h-[360px] w-[420px] shrink-0 items-center justify-center">
        {/* contamination haze */}
        <div className="pointer-events-none absolute h-[300px] w-[420px] rounded-full bg-rose-300/20 blur-[70px]" />
        <div className="pointer-events-none absolute h-[180px] w-[300px] rotate-[-12deg] rounded-full bg-amber-200/20 blur-[60px]" />

        {/* core */}
        <div className="relative z-10 flex h-[220px] w-[220px] rotate-[-1.8deg] flex-col items-center justify-center rounded-[2rem] border border-rose-300 bg-white shadow-[0_15px_40px_rgba(244,63,94,0.08)]">
          {/* glow */}
          <div className="absolute inset-4 rounded-3xl bg-rose-500/8 blur-[26px]" />

          {/* ghost frames */}
          <div className="pointer-events-none absolute inset-[-10px] rotate-[0deg] rounded-[2.2rem] border-[1.5px] border-rose-200/90 bg-white/35 shadow-[0_8px_28px_rgba(244,63,94,0.06)]" />
          <div className="pointer-events-none absolute inset-[-22px] rotate-[2.5deg] rounded-[2.45rem] border-[1.5px] border-rose-200/75 bg-rose-50/10" />
          <div className="pointer-events-none absolute inset-[-34px] rotate-[-3.5deg] rounded-[2.65rem] border-[1.5px] border-rose-200/65 bg-transparent" />
          <div className="pointer-events-none absolute inset-[-46px] rotate-[4deg] rounded-[2.85rem] border border-rose-200/45 bg-transparent" />

          {/* cracks */}
          <div className="pointer-events-none absolute top-8 left-10 h-[70px] w-[2px] rotate-[-35deg] bg-rose-300/60" />
          <div className="pointer-events-none absolute top-16 right-12 h-[55px] w-[2px] rotate-[28deg] bg-rose-300/50" />
          <div className="pointer-events-none absolute bottom-10 left-20 h-[50px] w-[2px] rotate-[65deg] bg-rose-300/50" />
          <div className="pointer-events-none absolute right-20 bottom-14 h-[45px] w-[2px] rotate-[-55deg] bg-rose-200/70" />

          {/* corner marks */}
          <div className="pointer-events-none absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-slate-800/70" />
          <div className="pointer-events-none absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-slate-800/70" />
          <div className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-slate-800/70" />
          <div className="pointer-events-none absolute right-4 bottom-4 h-4 w-4 border-r-2 border-b-2 border-slate-800/70" />

          {/* contamination zone */}
          <div className="pointer-events-none absolute top-[84px] right-0 left-0 h-[60px] rounded-[1.7rem] border border-rose-300/70 bg-[rgba(255,228,230,0.52)] shadow-[0_12px_40px_rgba(244,63,94,0.06),inset_0_0_18px_rgba(244,63,94,0.06)]" />

          {/* text */}
          <div className="relative z-10 flex translate-y-[-4px] flex-col items-center text-center select-none">
            <div className="mb-[10px] font-mono text-[8px] font-bold tracking-[0.42em] text-slate-400/65 uppercase">
              Execution Core
            </div>
            <div
              className="py-1 font-mono text-[19px] font-bold tracking-tight text-slate-800 antialiased"
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              procedural_flow()
            </div>
            <div className="flex items-center justify-center gap-1 pt-[2px] font-mono text-[8px] font-semibold tracking-[0.01em] text-rose-400 italic">
              <TriangleAlert
                size={8}
                strokeWidth={3}
                className="translate-y-[-0.5px] text-rose-400"
              />
              <span>Logic Pollution detected</span>
            </div>
          </div>
        </div>

        {/* 3. 在锁死的坐标系内，重新编排 Pill 的坐标（完美匹配截图的散射感） */}
        <LeakingPolicyPill
          title="VIP Override"
          position="absolute top-[40px] left-[15px] rotate-[-22deg]"
        />

        <LeakingPolicyPill
          title="Holiday Logic"
          position="absolute top-[80px] right-[-6px] rotate-[8deg]"
        />

        <LeakingPolicyPill
          title="Region Policy"
          position="absolute bottom-[40px] left-[35px] rotate-[-22deg]"
          highlighted
        />

        <LeakingPolicyPill
          title="Coupon Recovery"
          position="absolute bottom-[50px] right-[15px] rotate-[5deg]"
          highlighted
        />
      </div>
    </div>
  );
}

function LeakingPolicyPill({
  title,
  position,
  highlighted = false,
}: {
  title: string;
  position: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-2.5 shadow-sm transition-all duration-200 select-none ${position} ${
        highlighted
          ? "z-20 border-rose-400 bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
          : "border-rose-100 bg-white opacity-90"
      }`}
    >
      <div className="flex items-center gap-1.5">
        <Zap
          size={13}
          className={`shrink-0 ${highlighted ? "text-white" : "text-rose-500"}`}
        />

        <div
          className={`font-mono text-[11px] font-black tracking-wider ${
            highlighted ? "text-white" : "text-slate-700"
          }`}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
