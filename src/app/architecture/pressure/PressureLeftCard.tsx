"use client";

import React from "react";
import { semanticVisual } from "@/design-system/semanticVisual";
import { cn } from "@/lib/cn";

type Props = {
  visual: React.ReactNode;
  description: string;
  label: string;
};

export default function PressureLeftCard({
  visual,
  description,
  label,
}: Props) {
  return (
    // 1. 外层包裹注入 flex-col h-full，响应 Grid 的 items-stretch 等高拉伸
    <div className="flex h-full flex-col border-r border-slate-100 px-7 py-5">
      {/* label */}
      <div className={cn("mb-4", semanticVisual.pressureVoice.rose)}>{label}</div>

      {/* card */}
      {/* 2. 浅粉色底板转化为纵向伸缩列，为内部的 visual 提供满高度支撑 */}
      <div className="flex flex-1 flex-col justify-between rounded-[1.6rem] border border-rose-100 bg-rose-50/40 px-6 py-4">
        {/* description */}
        <div className="mt-1.5 mb-5 flex shrink-0 items-center gap-3 text-rose-400">
          <div className="h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.6)]" />
          <p className="text-sm font-medium"> {description} </p>
        </div>

        {/* visual container */}
        {/* 3. 核心改变：赋予 visual 包裹层完整的纵向自由拉伸能力，完美向下传递弹推力 */}
        <div className="flex h-full flex-1 flex-col justify-between">
          {visual}
        </div>
      </div>
    </div>
  );
}
