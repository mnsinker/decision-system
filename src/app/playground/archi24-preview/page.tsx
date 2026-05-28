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
  Zap,
  Gauge,
  Boxes,
  Compass,
  CornerDownRight,
  ShieldAlert,
  Combine,
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

// 精准高级的语法高亮：聚焦核心变化
const highlightCode = (line: string) => {
  return line
    .replace(
      /\b(while|for|in|def|class)\b/g,
      '<span class="text-slate-400 font-semibold">$1</span>',
    )
    .replace(
      /\b(planner|validate_graph|run_agent|get_first_tool|get_next_tool|resolve_params)\b/g,
      '<span class="text-indigo-400 font-medium">$1</span>',
    )
    .replace(/#.*/g, '<span class="text-slate-600 italic">$&</span>')
    .replace(/\/\/.*/g, '<span class="text-slate-600 italic">$&</span>');
};

export default function SystemEvolutionPortfolio() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

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
          <div className="mb-3 flex h-10 items-center justify-center rounded border border-dashed border-slate-800/40 bg-slate-950/20 text-[10px] text-slate-600 italic">
            [ 空置的编译 / 规划域 ]
          </div>
          <div className="rounded border border-slate-800/80 bg-slate-900/30 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              <RefreshCw size={10} className="text-slate-500" /> Runtime Loop
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300">
                动态解析路径
              </span>
              <span className="text-slate-700">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-500">
                物理执行
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-1.5 flex w-full items-center justify-center gap-1.5 rounded border border-indigo-500/50 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-300 shadow-md shadow-indigo-950/50 transition-all group-hover:border-indigo-400">
            <Sliders size={11} className="text-indigo-400" /> 1. PLANNER (AOT
            规划抽离)
          </div>
          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>
          <div className="rounded border border-slate-800 bg-slate-900/30 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              <RefreshCw size={10} className="text-slate-500" /> Runtime Loop
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-dashed border-slate-800 px-2 py-0.5 text-slate-600 italic">
                [ 已静态化 ]
              </span>
              <span className="text-slate-700">→</span>
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
          <div className="mb-3 flex h-10 items-center justify-center rounded border border-dashed border-slate-800/60 bg-slate-950/20 text-[10px] text-slate-600 italic">
            [ 缺失静态拦截层 ]
          </div>
          <div className="rounded border border-slate-800 bg-slate-900/30 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Pipeline Lifecycle
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-400">
                动态校验路径
              </span>
              <span className="text-slate-700">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-500">
                计算执行
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-1.5 flex w-full items-center justify-center gap-1.5 rounded border border-indigo-500/50 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-300 shadow-md shadow-indigo-950/50">
            <Terminal size={11} className="text-indigo-400" /> 1. VALIDATOR (AOT
            静态拦截)
          </div>
          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>
          <div className="rounded border border-slate-800 bg-slate-900/30 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Pipeline Lifecycle
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-dashed border-slate-800 px-2 py-0.5 text-slate-600 italic">
                [ 100% 安全 ]
              </span>
              <span className="text-slate-700">→</span>
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
        <div className="flex h-[130px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-3 flex h-10 items-center justify-center rounded border border-dashed border-slate-800/60 bg-slate-950/20 text-[10px] text-slate-600 italic">
            [ 混杂黑盒边界 ]
          </div>
          <div className="rounded border border-slate-800 bg-slate-900/30 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Compute Layer
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-400">
                交织混合逻辑
              </span>
              <span className="text-slate-700">→</span>
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-500">
                不透明执行
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex h-[130px] w-full flex-col justify-end font-mono text-[11px]">
          <div className="mb-1.5 flex w-full items-center justify-center gap-1.5 rounded border border-indigo-500/50 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-400 shadow-md shadow-indigo-950/50">
            <Activity size={11} className="text-indigo-400" /> 1. TYPED
            SEPARATION (算子解耦)
          </div>
          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>
          <div className="rounded border border-slate-800 bg-slate-900/30 p-2">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Compute Layer
            </div>
            <div className="grid grid-cols-3 gap-2 py-0.5 text-center font-mono text-[9px] text-slate-400">
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
    <div className="min-h-screen bg-[#05070a] font-sans text-[#b4c3d1] antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* SECTION 0: HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-[#05070a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-2 text-indigo-400/90 shadow-inner">
              <Cpu size={16} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500"></span>
                Runtime Capabilities Matrix
              </div>
              <h1 className="mt-0.5 text-xs font-bold tracking-tight text-slate-200">
                AI决策引擎系统架构技术演进白皮书
              </h1>
            </div>
          </div>
          <div className="rounded border border-slate-800/80 bg-slate-900/60 px-3 py-1.5 font-mono text-[10px] text-slate-400">
            METRIC LOG:{" "}
            <span className="font-semibold text-indigo-400">
              CORE_ENGINE_POSTMORTEM
            </span>
          </div>
        </div>
      </header>

      {/* SECTION 0: HERO (全局生产叙事与虚构监控背书) */}
      <section className="relative overflow-hidden border-b border-slate-900 bg-gradient-to-b from-[#0e121a] via-[#05070a] to-[#05070a]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-transparent" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-6 py-16 lg:grid-cols-12 lg:py-24">
          <div className="relative z-10 lg:col-span-8">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded border border-indigo-500/20 bg-indigo-500/5 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-indigo-400 uppercase">
              <Layers size={11} /> ARCHITECTURE EVOLUTION
            </div>
            <h2 className="text-3xl leading-[1.15] font-semibold tracking-tight text-white md:text-5xl">
              将高并发运行期复杂度转化为 <br />
              <span className="bg-gradient-to-r from-slate-200 via-indigo-300 to-indigo-400 bg-clip-text font-bold text-transparent">
                AOT 静态分层控制机制
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed font-light text-slate-400">
              每一代关键架构的迭代，都源于先前运行时模型在生产环境高压下暴露的计算瓶颈。本白皮书通过真实的
              <span className="font-normal text-slate-200">
                「空间对齐与状态抽离演示」
              </span>
              ，直观呈现如何将重负载决策机制完全外置，转化为确定、可推导、非阻塞的原子级子系统。
            </p>
          </div>

          {/* 侧边内敛的微缩生产指标面板：打造大厂工业风 */}
          <div className="space-y-3 rounded-xl border border-slate-900 bg-slate-950/60 p-4 font-mono text-[11px] text-slate-400 shadow-2xl lg:col-span-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 font-bold text-slate-500">
              <span>[ ENGINE_LIVE_METRICS ]</span>
              <span className="rounded bg-emerald-500/10 px-1.5 text-[9px] text-emerald-500">
                ACTIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="block text-slate-600">CONCURRENCY_CAP</span>
                <span className="text-xs font-bold text-slate-200">
                  52,400 / s
                </span>
              </div>
              <div>
                <span className="block text-slate-600">COMPUTE_WASTE</span>
                <span className="text-xs font-bold text-emerald-400">
                  -82.4%
                </span>
              </div>
              <div>
                <span className="block text-slate-600">SLOT_STATUS</span>
                <span className="text-xs font-semibold text-slate-200">
                  COMPRESSED
                </span>
              </div>
              <div>
                <span className="block text-slate-600">AOT_PASSED_RATE</span>
                <span className="text-xs font-bold text-indigo-400">100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: BEFORE VS AFTER (状态提取核心对比网络) */}
      <section className="mx-auto max-w-6xl border-b border-slate-900 px-6 py-16">
        <div className="mb-10">
          <div className="font-mono text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            STAGE 01
          </div>
          <h3 className="mt-1 text-lg font-medium text-slate-200">
            运行时职责拆解与空间隔离对齐
          </h3>
        </div>

        <div className="relative">
          {/* 纵向演进连贯时间轴导轨线 */}
          <div className="absolute top-4 bottom-4 left-[21px] hidden w-px bg-slate-800/80 md:block" />

          <div className="space-y-16">
            {evolutionData.map((item) => (
              <div
                key={item.version}
                className="relative gap-6 md:grid md:grid-cols-12"
              >
                {/* 纵向圆圈标记 */}
                <div className="relative hidden md:col-span-1 md:block">
                  <div className="sticky top-24 flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-[#05070a] font-mono text-xs font-bold tracking-tight text-slate-300 shadow-xl group-hover:border-indigo-500/40">
                    {item.version}
                  </div>
                </div>

                {/* 卡片核心区 */}
                <div className="group rounded-xl border border-slate-900 bg-gradient-to-b from-[#0f131a] to-[#0a0d14] p-5 shadow-2xl md:col-span-11 lg:p-6">
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-900 pb-4 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="text-base font-medium tracking-tight text-slate-200 transition-colors group-hover:text-white">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 font-sans text-xs font-light text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="max-w-sm shrink-0 rounded border border-emerald-500/10 bg-emerald-500/[0.01] px-3 py-1.5 sm:text-right">
                      <div className="flex items-center gap-1 font-mono text-[9px] font-semibold tracking-wider text-emerald-400/80 uppercase sm:justify-end">
                        <Zap size={10} /> 演进技术红利
                      </div>
                      <div className="mt-0.5 font-sans text-xs font-light text-slate-300">
                        {item.capability}
                      </div>
                    </div>
                  </div>

                  {/* 融合黑板区域网格 */}
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {/* BEFORE 复合黑板 */}
                    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-900 bg-[#05070a]">
                      <div className="flex items-center justify-between border-b border-slate-900 bg-slate-950/80 px-4 py-2">
                        <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />{" "}
                          BEFORE
                        </span>
                        <span className="font-mono text-[9px] font-bold tracking-widest text-slate-600 uppercase">
                          In-Loop Coupled
                        </span>
                      </div>

                      <div className="flex flex-col gap-5 p-4">
                        <div className="border-b border-slate-900/60 pb-4">
                          {item.beforeDiagram}
                        </div>

                        <div className="min-h-[155px] overflow-y-auto rounded border border-slate-900/40 bg-slate-950/40 p-3 font-mono text-xs leading-relaxed">
                          {item.beforeCode.map((line, idx) => {
                            const isProblemAnchor =
                              line.includes("while") ||
                              line.includes("run_agent") ||
                              line.includes("class CampaignEngine");
                            return (
                              <div
                                key={idx}
                                className="group/line relative flex items-center justify-between rounded px-1 py-0.5 hover:bg-slate-900/50"
                              >
                                <div
                                  className="whitespace-pre text-slate-400"
                                  dangerouslySetInnerHTML={{
                                    __html: highlightCode(line) || "&nbsp;",
                                  }}
                                />
                                {isProblemAnchor && (
                                  <div className="relative z-30 ml-2 shrink-0">
                                    <div className="flex h-4 w-4 cursor-help items-center justify-center rounded border border-red-500/30 bg-red-500/10 text-[10px] font-bold text-red-400 shadow-sm transition-all group-hover/line:bg-red-500 group-hover/line:text-white">
                                      !
                                    </div>
                                    <div className="pointer-events-none absolute top-0 right-6 w-64 rounded border border-slate-800 bg-[#12161c] p-3 font-sans text-xs leading-relaxed font-normal text-slate-300 opacity-0 shadow-xl transition-opacity duration-150 group-hover/line:opacity-100">
                                      <div className="mb-1 flex items-center gap-1 font-mono text-[10px] font-bold text-red-400 uppercase">
                                        <AlertTriangle size={11} />{" "}
                                        阻断点异常拓扑分析
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
                    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-900 bg-[#05070a]">
                      <div className="flex items-center justify-between border-b border-slate-900 bg-slate-950/80 px-4 py-2">
                        <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-indigo-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />{" "}
                          AFTER
                        </span>
                        <span className="font-mono text-[9px] font-bold tracking-widest text-slate-600 uppercase">
                          AOT Decoupled Layer
                        </span>
                      </div>

                      <div className="flex flex-col gap-5 p-4">
                        <div className="border-b border-slate-900/60 pb-4">
                          {item.afterDiagram}
                        </div>

                        <div className="min-h-[155px] overflow-y-auto rounded border border-slate-900/40 bg-slate-950/40 p-3 font-mono text-xs leading-relaxed text-slate-400">
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

      {/* SECTION 2: CURRENT SCOPE / LIMITATIONS (严谨的压力边界客观测试) */}
      <section className="mx-auto max-w-6xl border-b border-slate-900 px-6 py-16">
        <div className="mb-10">
          <div className="font-mono text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            STAGE 02
          </div>
          <h3 className="mt-1 text-lg font-medium text-slate-200">
            系统压力边界与当下局限性报告
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 font-mono text-xs md:grid-cols-3">
          <div className="space-y-2 rounded-xl border border-slate-900 bg-gradient-to-b from-[#0f131a] to-transparent p-4">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <ShieldAlert size={14} /> 01 / 高维矩阵冷启动阻流
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-400">
              在超 10,000 维异构节点输入时，AOT Planner 静态分析 DAG
              拓扑需要引入约 14ms
              的冷启动开销，极端场景下会导致首包延迟轻微抖动。
            </p>
          </div>

          <div className="space-y-2 rounded-xl border border-slate-900 bg-gradient-to-b from-[#0f131a] to-transparent p-4">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <ShieldAlert size={14} /> 02 / 动态热更新图锁竞争
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-400">
              V3 架构下若在图执行中动态无损替换节点，Validator
              锁机制会产生高频互斥。当前只能通过对变更支路进行双缓冲影子图切换来平滑过渡。
            </p>
          </div>

          <div className="space-y-2 rounded-xl border border-slate-900 bg-gradient-to-b from-[#0f131a] to-transparent p-4">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <ShieldAlert size={14} /> 03 / 跨边缘网络图同步损耗
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-400">
              多集群分布式协同执行时，图状态机在边缘网络间的状态同步依然依赖高昂的
              Raft 协议开销，尚未做到全无状态网格对等扩散。
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: ROADMAP (面向未来的架构无损扩散) */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <div className="font-mono text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            STAGE 03
          </div>
          <h3 className="mt-1 text-lg font-medium text-slate-200">
            下一代演进：V4 弹性网格分布式设想
          </h3>
        </div>

        <div className="relative grid grid-cols-1 gap-6 font-mono text-[11px] md:grid-cols-4">
          <div className="space-y-2 border-l-2 border-slate-800 p-4 transition-colors hover:border-indigo-500">
            <div className="font-bold tracking-wider text-slate-400 uppercase">
              Phase I // 图分片自治
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-500">
              将集中式 AOT Planner
              打散为独立节点子图自治，允许在大规模网格中实现自适应局部规划，彻底消除单点主控节点的性能瓶颈。
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-slate-800 p-4 transition-colors hover:border-indigo-500">
            <div className="font-bold tracking-wider text-slate-400 uppercase">
              Phase II // 边缘沙箱隔离
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-500">
              引入 WebAssembly
              运行时级别的节点级沙箱，保证在边缘设备、甚至弱网环境中，复杂的算子和路由算法也能保持微秒级的物理隔离和响应。
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-slate-800 p-4 transition-colors hover:border-indigo-500">
            <div className="font-bold tracking-wider text-slate-400 uppercase">
              Phase III // 影子网络热加载
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-500">
              开发动态多副本影子路由技术，在不需要物理重启执行集群的条件下，完成任意核心拓扑的大版本无缝热平滑更替。
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-slate-800 p-4 transition-colors hover:border-indigo-500">
            <div className="font-bold tracking-wider text-slate-400 uppercase">
              Phase IV // 拓扑自主回溯
            </div>
            <p className="font-sans leading-relaxed font-light text-slate-500">
              结合运行时遥测数据，依靠机器学习监督器自主重塑拓扑关联，做到根据历史流量与数据延迟全自动重构执行图的最优路径网络。
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-[#05070a] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 font-mono text-[11px] text-slate-600 sm:flex-row">
          <div className="flex items-center gap-2">
            <Gauge size={12} /> System Design Blueprint Archive // Node Topology
            Document
          </div>
          <div className="tracking-wider">
            INTERNAL INFRASTRUCTURE PARADIGM © 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
