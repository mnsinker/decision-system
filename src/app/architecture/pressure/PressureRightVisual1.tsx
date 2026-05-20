"use client";

export default function PressureRightVisual1() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/50 shadow-inner">
      {/* header */}

      <div className="relative flex items-center justify-center border-b border-white/5 px-6 py-4">
        <div className="font-mono text-sm font-bold tracking-[0.2em] text-emerald-300">
          unified_vip_entity
        </div>

        <div className="absolute top-1/2 right-6 flex -translate-y-1/2 items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" />

          <div className="font-mono text-[9px] font-black tracking-widest text-emerald-400 uppercase">
            Synced
          </div>
        </div>
      </div>

      {/* rows */}

      <div className="space-y-5 p-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="font-mono text-xs text-slate-400">customer_tier</div>

          <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/20 px-3 py-1 font-mono text-xs font-bold text-indigo-200">
            VIP
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="font-mono text-xs text-slate-400">refund_limit</div>

          <div className="font-mono text-sm font-semibold text-white">
            $5,000
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="font-mono text-xs text-slate-400">
            support_priority
          </div>

          <div className="font-mono text-sm font-black tracking-wide text-emerald-300">
            HIGH
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="font-mono text-xs text-slate-400">campaign_group</div>

          <div className="font-mono text-sm text-slate-200">retention_A</div>
        </div>
      </div>
    </div>
  );
}
