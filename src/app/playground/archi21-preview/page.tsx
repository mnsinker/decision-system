"use client";

import React, { useState } from "react";
import {
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowDown,
  RefreshCw,
  Sliders,
  Terminal,
  Activity,
  Gauge,
} from "lucide-react";

type EvolutionItem = {
  version: string;
  title: string;
  subtitle: string;
  capability: string;
  beforeCode: string[];
  afterCode: string[];
  beforeTooltip: string;
  beforeDiagram: React.ReactNode;
  afterDiagram: React.ReactNode;
};

// 精准、内敛的语法高亮：只为增强可读性，绝不刺眼
const highlightCode = (line: string) => {
  return line
    .replace(
      /\b(while|for|in|def|class)\b/g,
      '<span class="text-slate-400 font-semibold">$1</span>',
    )
    .replace(
      /\b(planner|validate_graph|run_agent|get_first_tool|get_next_tool|resolve_params)\b/g,
      '<span class="text-indigo-400">$1</span>',
    )
    .replace(/#.*/g, '<span class="text-slate-600 italic">$&</span>')
    .replace(/\/\/.*/g, '<span class="text-slate-600 italic">$&</span>');
};

export default function EvolutionPage() {
  const evolutionData: EvolutionItem[] = [
    {
      version: "V1",
      title: "Reactive Execution → Planned Orchestration",
      subtitle: "提取步骤决策，将其剥离出高频运行时循环体。",
      capability: "依赖感知的并行执行规划",
      beforeTooltip:
        "架构痛点：线程锁与动态依赖查找在高并发执行时并发发生，阻塞了整个执行线程池，导致吞吐量无法横向扩展。",
      beforeCode: [
        "current_tool = get_first_tool(intent)",
        "while current_tool:",
        "    # 在执行循环内部动态解析路径",
        "    result = current_tool.run(query)",
        "    tool_results.append(result)",
        "    current_tool = get_next_tool(result)",
      ],
      afterCode: [
        "// 步骤拓扑在运行前已被提前安全解析",
        "steps = planner.plan(intent, graph)",
        "",
        "for step in steps:",
        "    params = resolve_params(step)",
        "    result = step.run(**params)",
      ],
      beforeDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          {/* 空间对齐占位：与右侧 AOT Planner 严格等高线对齐 */}
          <div className="mb-3 flex h-10 items-center justify-center rounded border border-dashed border-slate-800/60 text-[10px] text-slate-600 italic">
            [ 缺失编译 / 规划层 ]
          </div>

          {/* 基础 Loop 组件（与右侧结构同色、同形态，不使用红色抢夺视线） */}
          <div className="rounded border border-slate-800 bg-slate-900/50 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400">
              <RefreshCw size={10} className="text-slate-500" /> RUNTIME LOOP
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300">
                动态解析路径
              </span>
              <span className="text-slate-600">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400">
                物理执行
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          {/* 醒目突出的变动项：高亮表示被提取出来的 Planner 节点 */}
          <div className="mb-1.5 flex w-full items-center justify-center gap-1.5 rounded border border-indigo-400 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-300 shadow-md shadow-indigo-950/50">
            <Sliders size={11} className="text-indigo-400" /> 1. PLANNER (AOT
            规划抽离)
          </div>

          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>

          {/* 保持一致性的基底 Loop 组件 */}
          <div className="rounded border border-slate-800 bg-slate-900/50 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400">
              <RefreshCw size={10} className="text-slate-500" /> RUNTIME LOOP
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-dashed border-slate-800 px-2 py-0.5 text-slate-600 italic">
                [ 已静态化 ]
              </span>
              <span className="text-slate-600">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400">
                物理执行
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      version: "V2",
      title: "Runtime Failure → Pre-Runtime Validation",
      subtitle: "将拓扑健康度校验从实际的大数据流水线计算中剥离、前置。",
      capability: "确定的事前拓扑完备性保障",
      beforeTooltip:
        "架构痛点：错误的图路径或循环引用往往在流水线执行了30-40分钟后才触发崩溃，导致之前产生大量的中间污染数据与计算资源浪费。",
      beforeCode: [
        "graph = build_graph(tools)",
        "",
        "// 校验逻辑隐式混合在执行过程中",
        "run_agent(query)",
      ],
      afterCode: [
        "graph = build_graph(tools)",
        "// 执行前置拦截，静态分析无效拓扑",
        "validate_graph(graph)",
        "",
        "run_agent(query)",
      ],
      beforeDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-3 flex h-10 items-center justify-center rounded border border-dashed border-slate-800/60 text-[10px] text-slate-600 italic">
            [ 缺失静态拦截层 ]
          </div>

          <div className="rounded border border-slate-800 bg-slate-900/50 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400">
              PIPELINE LIFECYCLE
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300">
                动态校验路径
              </span>
              <span className="text-slate-600">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400">
                计算执行
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-1.5 flex w-full items-center justify-center gap-1.5 rounded border border-indigo-400 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-300 shadow-md shadow-indigo-950/50">
            <Terminal size={11} className="text-indigo-400" /> 1. VALIDATOR (AOT
            静态拦截)
          </div>

          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>

          <div className="rounded border border-slate-800 bg-slate-900/50 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400">
              PIPELINE LIFECYCLE
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-dashed border-slate-800 px-2 py-0.5 text-slate-600 italic">
                [ 100% 安全 ]
              </span>
              <span className="text-slate-600">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400">
                计算执行
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      version: "V3",
      title: "Coarse Entities → Operational Primitives",
      subtitle: "将巨型混杂的对象拆解为具备强运行期类型特征的原子算子。",
      capability: "风控校验、核心评分、策略路由的责任域彻底解耦",
      beforeTooltip:
        "架构痛点：单一的大一统实体同时承载了准入规则、模型权重转换以及决策路由逻辑，导致跨业务团队迭代代码时频繁发生冲突与线上偶发死锁。",
      beforeCode: [
        "class CampaignEngine:",
        "    def evaluate(self, user):",
        "        # 准入控制、特征工程、路由决策",
        "        # 复合逻辑纠缠在同一个黑盒实体内",
        "        pass",
      ],
      afterCode: [
        "// 运行期严格隔离并可任意自由编排的节点原语",
        "class CampaignEligibility(Validator): pass",
        "class CampaignScore(Evaluator): pass",
        "class CouponDecision(DecisionNode): pass",
      ],
      beforeDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-3 flex h-10 items-center justify-center rounded border border-dashed border-slate-800/60 text-[10px] text-slate-600 italic">
            [ 混杂黑盒边界 ]
          </div>

          <div className="rounded border border-slate-800 bg-slate-900/50 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400">
              COMPUTE LAYER
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300">
                交织混合逻辑
              </span>
              <span className="text-slate-600">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400">
                不透明执行
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-1.5 flex w-full items-center justify-center gap-1.5 rounded border border-indigo-400 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-300 shadow-md shadow-indigo-950/50">
            <Activity size={11} className="text-indigo-400" /> 1. TYPED
            SEPARATION (算子解耦)
          </div>

          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>

          <div className="rounded border border-slate-800 bg-slate-900/50 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400">
              COMPUTE LAYER
            </div>
            <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono text-[9px] text-slate-400">
              <div className="rounded border border-slate-700 bg-slate-800 py-0.5">
                准入
              </div>
              <div className="rounded border border-slate-700 bg-slate-800 py-0.5">
                评分
              </div>
              <div className="rounded border border-slate-700 bg-slate-800 py-0.5">
                决策
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#adbac7] antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* 极简、低调的高级技术文档标准 Header */}
      <header className="sticky top-0 z-40 border-b border-[#22272e] bg-[#0b0f14]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <div className="rounded border border-slate-800 bg-slate-900 p-2 text-slate-400">
              <Cpu size={16} />
            </div>
            <div>
              <div className="font-mono text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                Core Architecture Runtime Log
              </div>
              <h1 className="text-sm font-semibold text-slate-200">
                分布式决策核心引擎演进档案
              </h1>
            </div>
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            REV_ID //{" "}
            <span className="font-medium text-slate-400">3.4.1_PROD</span>
          </div>
        </div>
      </header>

      {/* 叙事区域 */}
      <section className="border-b border-[#22272e]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
          <div className="max-w-4xl">
            <h2 className="text-2xl leading-snug font-light tracking-tight text-slate-200 md:text-3xl">
              核心演进演变：将高并发运行期复杂度转化为{" "}
              <span className="font-medium text-white underline decoration-indigo-500/50 underline-offset-4">
                AOT 静态分层机制
              </span>
            </h2>
            <p className="mt-3 max-w-3xl font-mono text-xs leading-relaxed text-slate-500 md:text-sm">
              [ 架构总结 ]：通过在空间上绝对对齐 Before / After
              计算单元，一眼即可洞察计算逻辑在核心执行循环外部的重组与前置过程。
            </p>
          </div>
        </div>
      </section>

      {/* 主体演变大类 */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="relative">
          {/* 低调的左侧辅助对齐垂直虚线 */}
          <div className="bg-dashed absolute top-4 bottom-4 left-[20px] hidden w-px border-l border-slate-800 md:block" />

          <div className="space-y-16">
            {evolutionData.map((item) => (
              <div
                key={item.version}
                className="relative gap-6 md:grid md:grid-cols-12"
              >
                {/* 清晰内敛的圆形版本标志 - 采用冷灰色调，绝不突兀抢视线 */}
                <div className="relative hidden md:col-span-1 md:block">
                  <div className="sticky top-24 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-[#0b0f14] font-mono text-xs font-bold tracking-tight text-slate-300 shadow-sm">
                    {item.version}
                  </div>
                </div>

                {/* 内容核心面板 */}
                <div className="rounded-lg border border-[#22272e] bg-[#12161c] p-5 shadow-sm transition-all hover:border-slate-800 md:col-span-11">
                  {/* 元数据头部 */}
                  <div className="flex flex-col justify-between gap-4 border-b border-[#22272e] pb-4 sm:flex-row sm:items-center">
                    <div>
                      <div className="mb-2 inline-block rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-400 md:hidden">
                        {item.version} PARADIGM
                      </div>
                      <h3 className="text-base font-semibold tracking-tight text-slate-200">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* 交付能力红利指标 */}
                    <div className="max-w-sm shrink-0 rounded border border-emerald-500/10 bg-emerald-500/[0.02] px-3 py-1.5 sm:text-right">
                      <div className="flex items-center gap-1.5 font-mono text-[9px] font-semibold tracking-wider text-emerald-400/80 uppercase sm:justify-end">
                        <CheckCircle2 size={11} /> 核心交付指标
                      </div>
                      <div className="mt-0.5 font-sans text-xs font-medium text-slate-300">
                        {item.capability}
                      </div>
                    </div>
                  </div>

                  {/* 核心改动：把 Diagram 与 Code 物理融合成一块黑板（同一个 Container） */}
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {/* BEFORE 复合黑板 */}
                    <div className="flex flex-col overflow-hidden rounded border border-[#22272e] bg-[#07090c]">
                      {/* 分栏 Header */}
                      <div className="flex items-center justify-between border-b border-[#22272e] bg-[#12161c]/80 px-3 py-2">
                        <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />{" "}
                          BEFORE
                        </span>
                        <span className="font-mono text-[9px] tracking-wider text-slate-600 uppercase">
                          Coupled Path
                        </span>
                      </div>

                      {/* 黑板内部：Diagram 在上，Code 在下，高度绝对对齐 */}
                      <div className="flex flex-col gap-5 p-4">
                        {/* 结构图区 */}
                        <div className="border-b border-[#22272e]/50 pb-4">
                          {item.beforeDiagram}
                        </div>

                        {/* 伪代码区 - 固定统一高度，保证对齐线 */}
                        <div className="min-h-[150px] overflow-y-auto font-mono text-xs leading-relaxed">
                          {item.beforeCode.map((line, idx) => {
                            const isProblemAnchor =
                              line.includes("while") ||
                              line.includes("run_agent") ||
                              line.includes("class CampaignEngine");
                            return (
                              <div
                                key={idx}
                                className="group relative flex items-center justify-between rounded px-1 py-0.5 hover:bg-slate-900/40"
                              >
                                <div
                                  className="whitespace-pre text-slate-400"
                                  dangerouslySetInnerHTML={{
                                    __html: highlightCode(line) || "&nbsp;",
                                  }}
                                />
                                {isProblemAnchor && (
                                  <div className="relative z-30 ml-2 shrink-0">
                                    <div className="flex h-4 w-4 cursor-help items-center justify-center rounded border border-red-500/30 bg-red-500/10 text-[10px] font-bold text-red-400 transition-all group-hover:bg-red-500 group-hover:text-white">
                                      !
                                    </div>
                                    <div className="pointer-events-none absolute top-0 right-6 w-64 rounded border border-slate-700 bg-[#161b22] p-3 font-sans text-xs leading-relaxed font-normal text-slate-300 opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100">
                                      <div className="mb-1 flex items-center gap-1 font-mono text-[10px] font-bold text-red-400 uppercase">
                                        <AlertTriangle size={11} />{" "}
                                        运行期热点异常隐患
                                      </div>
                                      {item.beforeTooltip}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* AFTER 复合黑板 */}
                    <div className="flex flex-col overflow-hidden rounded border border-[#22272e] bg-[#07090c]">
                      {/* 分栏 Header */}
                      <div className="flex items-center justify-between border-b border-[#22272e] bg-[#12161c]/80 px-3 py-2">
                        <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-indigo-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />{" "}
                          AFTER
                        </span>
                        <span className="font-mono text-[9px] tracking-wider text-slate-600 uppercase">
                          AOT Subsystem
                        </span>
                      </div>

                      {/* 黑板内部：Diagram 在上，Code 在下，高度与左侧完全镜像对齐 */}
                      <div className="flex flex-col gap-5 p-4">
                        {/* 结构图区 */}
                        <div className="border-b border-[#22272e]/50 pb-4">
                          {item.afterDiagram}
                        </div>

                        {/* 伪代码区 - 固定统一高度，保证对齐线 */}
                        <div className="min-h-[150px] overflow-y-auto font-mono text-xs leading-relaxed text-slate-400">
                          {item.afterCode.map((line, idx) => (
                            <div
                              key={idx}
                              className="px-1 py-0.5 whitespace-pre"
                              dangerouslySetInnerHTML={{
                                __html: highlightCode(line) || "&nbsp;",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 极简底部级次 */}
      <footer className="mt-12 border-t border-[#22272e] bg-[#0b0f14] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 font-mono text-xs text-slate-600 sm:flex-row">
          <div className="flex items-center gap-1.5">
            <Gauge size={12} /> Architectural Review Log // System Engine
            Topology Map
          </div>
          <div>INTERNAL CAPABILITY LABS @ 2026</div>
        </div>
      </footer>
    </div>
  );
}
