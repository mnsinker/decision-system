import React from "react";
import PressureExplanationCard from "./PressureExplanationCard";

type LeftCardContent = {
  rootCauseTitle: string;
  rootCauseMsg: string;
};

export default function PressureLeftVisual1({
  content,
}: {
  content: LeftCardContent;
}) {
  return (
    // 转换为与右侧同等规模的 min-h 列布局，中间的空白区作为自然的弹性缓冲
    <div className="flex h-full min-h-[520px] flex-1 flex-col justify-between">
      <div className="mt-10 space-y-5">
        {/* CRM */}
        <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-mono text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase">
              CRM
            </div>
            <div className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold text-indigo-500 uppercase">
              VIP
            </div>
          </div>
          <div className="text-lg font-semibold text-slate-900">
            VIP = spends &gt; $1,000
          </div>
        </div>

        {/* support */}
        <div className="translate-x-4 rounded-2xl border border-white bg-white/80 p-5 opacity-90 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-mono text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase">
              Customer Support
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-500 uppercase">
              VIP
            </div>
          </div>
          <div className="text-lg font-semibold text-slate-900">
            VIP = priority tier
          </div>
        </div>

        {/* refund */}
        <div className="-translate-x-3 rounded-2xl border border-rose-200 bg-white p-5 shadow-[0_10px_30px_rgba(244,63,94,0.08)]">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-mono text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase">
              Refund Service
            </div>
            <div className="rounded-full bg-rose-50 px-3 py-1 text-[10px] font-bold text-rose-500 uppercase">
              VIP
            </div>
          </div>
          <div className="text-lg font-semibold text-slate-900">
            VIP = manual whitelist
          </div>
        </div>
      </div>

      {/* 强行利用 mt-auto 焊死在底部基准线上 */}
      <div className="mt-auto pt-8">
        <PressureExplanationCard
          viewMode="code"
          label={content.rootCauseTitle}
          description={content.rootCauseMsg}
        />
      </div>
    </div>
  );
}
