"use client";

import React, { useState } from "react";

// 模拟图标
function ShieldCheckIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-emerald-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

export default function StickyTabsDemo() {
  const [activeTab, setActiveTab] = useState("semantic");

  const tabs = [
    { id: "semantic", label: "Semantic Consistency" },
    { id: "planning", label: "Runtime Planning" },
    { id: "policy", label: "Policy Isolation" },
  ];

  return (
    <div className="mx-auto my-8 w-full max-w-4xl overflow-hidden rounded-xl border border-slate-800 bg-[#030712] text-slate-100 shadow-2xl">
      {/* 模拟浏览器/容器滚动视口 */}
      <div className="custom-scrollbar relative h-[500px] overflow-y-auto pb-12">
        {/* 1. 正常随动区域：标题区（向下滚动时会正常移出视口） */}
        <div className="p-8 pb-6">
          <div className="mb-2 font-mono text-xs tracking-widest text-indigo-400 uppercase">
            AI DECISION SYSTEM • ONTOLOGY
          </div>
          <h1 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            Architecture Layers
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            AI execution becomes unreliable when runtime structure is missing.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. 核心：只有 Tab 轨道吸顶 (Only Tab Sticky Rail) */}
        {/* ======================================================== */}
        <div className="sticky top-0 z-50 w-full">
          {/* 磨砂玻璃 Rail 挡板 */}
          <div className="flex w-full items-center justify-between border-b border-slate-800/80 bg-[#030712]/70 px-8 py-4 backdrop-blur-md">
            {/* Tabs 控制器 */}
            <div className="flex rounded-full border border-slate-800 bg-slate-900/60 p-1 shadow-inner">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-5 py-2 text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden font-mono text-xs text-slate-500 sm:block">
              ctx_status: <span className="text-emerald-400">synced</span>
            </div>
          </div>

          {/* 边缘渐变消隐层：防止滚上去的文字在 Rail 边缘生硬切断 */}
          <div className="pointer-events-none h-6 w-full bg-gradient-to-b from-[#030712] to-transparent opacity-90" />
        </div>
        {/* ======================================================== */}

        {/* 3. 滚动主体内容区 */}
        <div className="space-y-6 px-8">
          {/* 大字标语：测试从 Tab 背后穿过的视觉效果 */}
          <p className="my-4 px-2 font-serif text-2xl text-slate-300 italic">
            "Define VIP Status consistently across 5 different operational
            tools."
          </p>

          {/* 模拟卡片组件组 */}
          <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
            {/* 左侧压力卡片 */}
            <div className="space-y-4 rounded-xl border border-red-500/10 bg-red-950/5 p-6">
              <div className="font-mono text-xs tracking-wider text-red-400 uppercase">
                Runtime Pressure
              </div>
              <h3 className="text-lg font-semibold text-red-200">
                VIP means different things in different systems.
              </h3>
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4 font-mono text-xs text-slate-400">
                <div className="mb-1 text-[10px] text-slate-500">
                  CRM (2022 · v1)
                </div>
                VIP = spends &gt; $1,000
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4 font-mono text-xs text-slate-400">
                <div className="mb-1 text-[10px] text-slate-500">
                  Support Desk (2024 · v3)
                </div>
                VIP = response_time &lt; 5m
              </div>
            </div>

            {/* 右侧架构卡片 */}
            <div className="space-y-4 rounded-xl border border-emerald-500/10 bg-emerald-950/5 p-6">
              <div className="font-mono text-xs tracking-wider text-emerald-400 uppercase">
                Architecture Response
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
                <ShieldCheckIcon />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Semantic Layer
                  </h4>
                  <p className="text-xs text-slate-400">
                    Shared runtime meaning across systems.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
                <span className="text-indigo-400">unified_vip_entity</span>
                <span className="text-slate-500">
                  {" "}
                  = [spends, response_tier]
                </span>
              </div>
            </div>
          </div>

          {/* 长内容文本填充：确保足够长可以滚动 */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="space-y-3 rounded-xl border border-slate-800/60 bg-slate-900/30 p-6"
            >
              <div className="font-mono text-xs text-slate-500">
                SYSTEM_LOG_NODE_0{i}
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Core
                telemetry protocols are resolving dependencies dynamically.
                Notice how this text gracefully slides behind the sticky tabs
                rail instead of overlapping harshly with the button borders.
              </p>
              <div className="h-2 w-24 rounded-full bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
