"use client";

import React from "react";

export default function ArchitectureHeroV3() {
  /**
   * =========================================================
   * GLOBAL CONTROLS
   * =========================================================
   */
  // 1) 整体调节右侧 visual 的位置 / 大小
  const visualPositionClass =
    "translate-x-[0px] translate-y-[20px] scale-[0.8]";

  // 2) 调节 layer 之间的垂直间距 (深度 Z 轴)
  // 提示：可以尝试 64 到 120 之间的数值
  const layerGap = 130;

  // 3) 调节 layer 之间的平面位移 (Y 轴)
  // 为了让 4 层展开时不重叠过深，我们让每一层在平面上也向下挪动一点
  const layerTopOffset = 70;

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden border-b border-slate-200 bg-[#FBFDFF] px-8 pt-20 pb-16">
      {/* 1. 环境底纹 (Atmospheric Background) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-50/50 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-50/50 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT CONTENT */}
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-indigo-100 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-md">
            <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-indigo-600 uppercase">
              System Architecture
            </span>
          </div>

          <h1 className="text-7xl leading-[0.9] font-black tracking-tighter text-slate-950 md:text-7xl">
            From operational pressure <br />
            <span className="bg-gradient-to-r from-indigo-500 via-emerald-500 to-rose-500 bg-clip-text text-transparent">
              to reusable architecture.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed font-light text-slate-500">
            Separate semantic meaning, planning, and decision logic so workflows
            can evolve without becoming fragile or opaque.
          </p>
        </div>

        {/* RIGHT VISUAL: Compact 4-Layer 3D Structure */}
        <div
          className={`relative flex items-center justify-center pt-8 lg:pt-0 ${visualPositionClass}`}
        >
          <div className="relative h-[550px] w-full max-w-[450px] [perspective:1500px]">
            {/* 3D 容器 */}
            <div
              className="relative h-full w-full [transform:rotateX(55deg)_rotateZ(-35deg)] [transform-style:preserve-3d]"
              style={
                {
                  "--gap": `${layerGap}px`,
                  "--offset": `${layerTopOffset}px`,
                } as React.CSSProperties
              }
            >
              {/* --- LAYER 1: Semantic (Indigo) --- */}
              <div
                className="absolute top-0 left-0 h-44 w-full animate-[float_6s_infinite_ease-in-out]"
                style={{ "--z": "0px", "--i": 0 } as React.CSSProperties}
              >
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-indigo-100/50 to-indigo-200/50 shadow-[20px_20px_50px_rgba(99,102,241,0.1)] backdrop-blur-xl">
                  <div className="absolute top-10 left-10 h-3 w-3 animate-pulse rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                </div>
                {/* 侧边标注内嵌到层级容器中，确保随动 */}
                <div className="absolute top-10 -right-4 translate-x-full font-mono text-[10px] font-bold tracking-widest text-indigo-500 uppercase">
                  Semantic
                </div>
              </div>

              {/* --- LAYER 2: Planning (Emerald) --- */}
              <div
                className="absolute left-0 h-44 w-full animate-[float_6s_infinite_ease-in-out_1s]"
                style={
                  {
                    top: "var(--offset)",
                    "--z": "calc(var(--gap) * -1)",
                    "--i": 1,
                  } as React.CSSProperties
                }
              >
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-emerald-100/50 to-emerald-200/50 shadow-[20px_20px_50px_rgba(52,211,153,0.1)] backdrop-blur-xl">
                  <div className="absolute inset-0 [background-image:radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
                  <div className="absolute top-10 left-10 h-3 w-3 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
                <div className="absolute top-10 -right-4 translate-x-full font-mono text-[10px] font-bold tracking-widest text-emerald-500 uppercase">
                  Planning
                </div>
              </div>

              {/* --- LAYER 3: Decision (Rose) --- */}
              <div
                className="absolute left-0 h-44 w-full animate-[float_6s_infinite_ease-in-out_2s]"
                style={
                  {
                    top: "calc(var(--offset) * 2)",
                    "--z": "calc(var(--gap) * -2)",
                    "--i": 2,
                  } as React.CSSProperties
                }
              >
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-rose-100/50 to-rose-200/50 shadow-[20px_20px_50px_rgba(244,63,94,0.1)] backdrop-blur-xl">
                  <div className="absolute top-10 left-10 h-3 w-3 animate-pulse rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                </div>
                <div className="absolute top-10 -right-4 translate-x-full font-mono text-[10px] font-bold tracking-widest text-rose-500 uppercase">
                  Decision
                </div>
              </div>

              {/* --- LAYER 4: Execution (Amber) --- */}
              <div
                className="absolute left-0 h-44 w-full animate-[float_6s_infinite_ease-in-out_3s]"
                style={
                  {
                    top: "calc(var(--offset) * 3)",
                    "--z": "calc(var(--gap) * -3)",
                    "--i": 3,
                  } as React.CSSProperties
                }
              >
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-amber-100/50 to-amber-200/50 shadow-[20px_20px_50px_rgba(245,158,11,0.1)] backdrop-blur-xl">
                  <div className="absolute top-10 left-10 h-3 w-3 animate-pulse rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                </div>
                <div className="absolute top-10 -right-4 translate-x-full font-mono text-[10px] font-bold tracking-widest text-amber-500 uppercase">
                  Execution
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateZ(var(--z));
          }
          50% {
            transform: translateY(-12px) translateZ(var(--z));
          }
        }
      `}</style>
    </section>
  );
}
