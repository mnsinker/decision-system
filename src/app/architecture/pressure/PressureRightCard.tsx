"use client";

import { Layers, GitBranch } from "lucide-react";
import { semanticVisual } from "@/design-system/semanticVisual";
import { cn } from "@/lib/cn";

type Props = {
  sectionLabel: string;

  layerTitle: string;

  layerSubtitle: string;

  architectureShiftTitle?: string;

  architectureShiftMsg?: string;

  visual: React.ReactNode;
};

export default function PressureRightCard({
  sectionLabel,
  layerTitle,
  layerSubtitle,
  architectureShiftTitle,
  architectureShiftMsg,
  visual,
}: Props) {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#0c2a26] via-[#051614] to-[#020a09] p-7 text-white">
      {/* ambient */}

      <div className="pointer-events-none absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.14] blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 left-10 h-[320px] w-[320px] rounded-full bg-indigo-500/[0.06] blur-[120px]" />

      {/* ✅ CHANGE #1:
          恢复 playground 的 stage composition
      */}
      {/* 去掉多余的中间包裹 div，让 z-10 成为直属的纵向 Flex 列控制轴 */}
      {/* 1. 外层也必须 h-full */}
      {/* 1. 移除那个全包住内容的死 div，将 z-10 直接转换成与左侧拉伸比例对称的满高 Flex 弹性主轴 */}
      <div className="relative z-10 flex h-full min-h-[600px] flex-col justify-between">
        {/* TOP STAGE CONTAINER */}
        <div className="w-full shrink-0">
          {/* label */}
          <div className={cn("mb-6", semanticVisual.pressureVoice.emerald)}>
            {sectionLabel}
          </div>

          {/* signal */}
          <div className="relative mb-5 overflow-hidden rounded-[1.2rem] border border-emerald-500/20 bg-gradient-to-r from-emerald-500/[0.08] to-transparent px-4 py-3">
            <div className="absolute top-0 -left-10 h-full w-32 rounded-full bg-emerald-400/10 blur-2xl" />
            <div className="relative z-10 flex items-center gap-3">
              <Layers size={18} className="animate-pulse text-emerald-400" />
              <h3 className="text-2xl font-black tracking-tight text-white">
                {layerTitle}
              </h3>
            </div>
            <p className="relative z-10 mt-1.5 pl-6 font-mono text-[11px] leading-5 tracking-wide text-emerald-400/70">
              {layerSubtitle}
            </p>
          </div>
        </div>

        {/* 2. 让核心 3D 舞台与下方原理卡片组合成下半部统一的纵向生长区，把最小高度微调到 520px 防止溢出 */}
        <div className="mt-auto flex min-h-[520px] w-full flex-1 flex-col justify-between">
          {/* shell */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
            <div className="absolute top-0 right-0 h-[280px] w-[280px] rounded-full bg-emerald-500/10 blur-[100px]" />
            <div className="relative z-10 w-full">{visual}</div>
          </div>

          {/* architecture principle */}
          {architectureShiftTitle && architectureShiftMsg && (
            <div className="rounded-1xl mt-5 shrink-0 border border-emerald-500/10 bg-white/[0.03] p-3 backdrop-blur-xl">
              <div className="grid grid-cols-[20px_1fr] gap-3">
                <GitBranch size={16} className="mt-0.5 text-emerald-400" />
                <div>
                  <div
                    className={`mb-1 ${semanticVisual.pressureVoice.emeraldInset}`}
                  >
                    {architectureShiftTitle}
                  </div>
                  <p className="text-[11px] leading-5 font-medium text-slate-300">
                    {architectureShiftMsg}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
