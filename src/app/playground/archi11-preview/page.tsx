"use client";

import React from "react";
import {
  Database,
  GitBranch,
  ShieldCheck,
  Cpu,
  Workflow,
  Zap,
  Box,
  Circle,
  Triangle,
} from "lucide-react";

export default function ArchitectureHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#F2F4F7] px-8 pt-32 pb-24">
      {/* --- 背景层：几何图案与点阵 --- */}
      <div className="absolute inset-0 [background-image:radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.4]" />

      {/* 装饰性几何图形 - 散落在背景中 */}
      <div className="absolute top-20 left-[10%] rotate-12 text-slate-900 opacity-[0.05]">
        <Triangle size={120} />
      </div>
      <div className="absolute bottom-10 left-[40%] text-slate-900 opacity-[0.03]">
        <Circle size={200} strokeWidth={1} />
      </div>
      <div className="absolute top-40 right-[15%] -rotate-12 text-slate-900 opacity-[0.05]">
        <Box size={160} />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_450px]">
          {/* --- Left Content: 秩序感叙事 --- */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-indigo-500" />
              <span className="font-mono text-xs font-bold tracking-[0.4em] text-indigo-500 uppercase">
                Architecture Blueprint
              </span>
            </div>

            <h1 className="text-7xl leading-[0.9] font-black tracking-tighter text-slate-900">
              From pressure to <br />
              <span className="text-slate-400">reusable architecture.</span>
            </h1>

            <p className="mt-10 max-w-2xl text-2xl leading-relaxed font-light text-slate-500/90">
              A system that separates{" "}
              <span className="font-semibold text-slate-900 underline decoration-indigo-200 underline-offset-8">
                Semantic Meaning
              </span>
              ,
              <span className="font-semibold text-slate-900 underline decoration-emerald-200 underline-offset-8">
                {" "}
                Planning
              </span>
              , and
              <span className="font-semibold text-slate-900 underline decoration-amber-200 underline-offset-8">
                {" "}
                Policy
              </span>
              .
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <div className="group flex cursor-default items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 shadow-sm transition-colors hover:border-indigo-300">
                <Cpu
                  size={16}
                  className="text-indigo-500 group-hover:animate-pulse"
                />
                <span className="font-mono text-[10px] font-bold tracking-widest text-slate-600 uppercase">
                  Runtime Orchestration
                </span>
              </div>
              <div className="group flex cursor-default items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 shadow-sm transition-colors hover:border-emerald-300">
                <ShieldCheck
                  size={16}
                  className="text-emerald-500 group-hover:animate-pulse"
                />
                <span className="font-mono text-[10px] font-bold tracking-widest text-slate-600 uppercase">
                  Policy Isolation
                </span>
              </div>
            </div>
          </div>

          {/* --- Right Illustration: 活力与不稳定的闪烁感 --- */}
          <div className="relative hidden lg:block">
            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-[3.5rem] border border-slate-200 bg-white/60 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.08)] backdrop-blur-md">
              {/* 背景装饰环 - 缓慢旋转 */}
              <div className="absolute inset-0 flex animate-[spin_20s_linear_infinite] items-center justify-center opacity-10">
                <div className="h-[350px] w-[350px] rounded-full border-[0.5px] border-slate-900" />
                <div className="absolute h-[250px] w-[250px] rounded-full border-[0.5px] border-dashed border-slate-900" />
              </div>

              {/* 核心层级预览 - 错位排列 */}
              <div className="relative z-10 space-y-5">
                {/* 每一层带有微弱的不对称闪烁 */}
                <div className="flex translate-x-6 animate-[flicker_3s_infinite_0s] items-center gap-4 rounded-2xl bg-slate-900 px-7 py-5 text-white shadow-xl">
                  <Database size={22} className="text-indigo-400" />
                  <span className="font-mono text-xs font-bold tracking-widest uppercase">
                    Semantic Layer
                  </span>
                </div>
                <div className="flex -translate-x-6 animate-[flicker_4s_infinite_1s] items-center gap-4 rounded-2xl bg-slate-900 px-7 py-5 text-white shadow-xl">
                  <GitBranch size={22} className="text-emerald-400" />
                  <span className="font-mono text-xs font-bold tracking-widest uppercase">
                    Planning Layer
                  </span>
                </div>
                <div className="flex translate-x-6 animate-[flicker_5s_infinite_0.5s] items-center gap-4 rounded-2xl bg-slate-900 px-7 py-5 text-white shadow-xl">
                  <ShieldCheck size={22} className="text-amber-400" />
                  <span className="font-mono text-xs font-bold tracking-widest uppercase">
                    Decision Layer
                  </span>
                </div>
                <div className="flex -translate-x-6 items-center gap-4 rounded-2xl border-2 border-slate-900 bg-white px-7 py-5 text-slate-900 shadow-xl">
                  <Zap size={22} className="animate-pulse text-rose-500" />
                  <span className="font-mono text-xs font-bold tracking-widest uppercase">
                    Execution Layer
                  </span>
                </div>
              </div>

              {/* 悬浮状态图标 - 仅闪烁不位移 */}
              <div className="absolute top-12 right-12 animate-[flicker_2s_infinite] text-indigo-500">
                <Cpu size={32} strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-12 left-12 animate-[flicker_6s_infinite_2s] text-slate-400 opacity-20">
                <Workflow size={54} strokeWidth={1} />
              </div>

              {/* 装饰性光晕 */}
              <div className="absolute -right-10 -bottom-10 h-32 w-32 animate-pulse rounded-full bg-indigo-500/10 blur-[50px]" />
            </div>
          </div>
        </div>
      </div>

      {/* --- CSS Animations --- */}
      <style jsx>{`
        @keyframes flicker {
          0%,
          100% {
            opacity: 1;
          }
          45% {
            opacity: 0.85;
          }
          50% {
            opacity: 0.4;
          }
          55% {
            opacity: 0.9;
          }
          80% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
