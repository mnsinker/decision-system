"use client";

import React from "react";

import { GitBranch } from "lucide-react";

/**
 * 右侧可视化子节点组件：采用干净声明式的数据驱动
 */
function RightNetworkNode({
  name,
  isHighlighted,
}: {
  name: string;
  isHighlighted?: boolean;
}) {
  return (
    <div
      className={`flex w-[132px] items-center gap-2 rounded-xl border px-3 py-3 shadow-inner transition-all duration-500 ${
        isHighlighted
          ? "scale-[1.02] border-emerald-400/50 bg-emerald-500/[0.09] shadow-[0_0_25px_rgba(16,185,129,0.15)]"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <div
        className={`h-1.5 w-1.5 rounded-full ${
          isHighlighted
            ? "animate-pulse bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
            : "bg-emerald-400/60"
        }`}
      />
      <div
        className={`font-mono text-[11px] font-medium ${isHighlighted ? "text-emerald-300" : "text-slate-300"}`}
      >
        {name}
      </div>
    </div>
  );
}

/** Left node stack geometry (matches py-3 nodes + gap-4 + p-5) */
const PAD = 24;
const NODE_W = 132;
const GAP_COL = 40;
const NODE_H = 42;
const NODE_GAP = 16;
const START_X = PAD + NODE_W;
const PLANNER_X = START_X + GAP_COL;
const STACK_H = 5 * NODE_H + 4 * NODE_GAP;
const PLANNER_Y = PAD + STACK_H / 2;

function nodeAnchorY(index: number) {
  return PAD + NODE_H / 2 + index * (NODE_H + NODE_GAP);
}

function buildFlowPath(y: number) {
  return `M ${START_X},${y} C ${START_X + 18},${y} ${PLANNER_X - 8},${PLANNER_Y} ${PLANNER_X},${PLANNER_Y}`;
}

export default function PressureRightVisual2() {
  const nodes = [
    { name: "Order", highlight: false },
    { name: "Shipping", highlight: true },
    { name: "History", highlight: false },
    { name: "TaxProfile", highlight: false },
    { name: "Contract", highlight: false },
  ];

  return (
    <div className="relative mx-auto w-max max-w-full">
      <div className="relative grid min-h-[300px] grid-cols-[132px_150px_86px] items-start gap-x-10 gap-y-0 rounded-3xl border border-white/10 bg-black/50 px-6 py-5">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="emeraldFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(52,211,153,0)" />
              <stop offset="55%" stopColor="rgba(52,211,153,0.65)" />
              <stop offset="100%" stopColor="rgba(16,185,129,1)" />
            </linearGradient>
          </defs>

          {nodes.map((_, i) => {
            const y = nodeAnchorY(i);
            if (Math.abs(y - PLANNER_Y) < 8) return null;
            return (
              <path
                key={i}
                d={buildFlowPath(y)}
                stroke="url(#emeraldFlow)"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="12 14"
                opacity="0.95"
                style={{
                  animation: "dashMove 3s linear infinite",
                }}
              />
            );
          })}
        </svg>

        <svg
          className="pointer-events-none absolute inset-0 z-[12] h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="emeraldFlowHistory"
              gradientUnits="userSpaceOnUse"
              x1={START_X}
              y1={0}
              x2={PLANNER_X}
              y2={0}
            >
              <stop offset="0%" stopColor="rgba(52,211,153,0)" />
              <stop offset="55%" stopColor="rgba(52,211,153,0.65)" />
              <stop offset="100%" stopColor="rgba(16,185,129,1)" />
            </linearGradient>
          </defs>
          <line
            x1={START_X}
            y1={nodeAnchorY(2)}
            x2={PLANNER_X}
            y2={nodeAnchorY(2)}
            stroke="url(#emeraldFlowHistory)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="12 14"
            opacity="0.95"
            style={{
              animation: "dashMove 3s linear infinite",
            }}
          />
        </svg>

        <div className="relative z-10 flex flex-col gap-4">
          {nodes.map((node) => (
            <RightNetworkNode
              key={node.name}
              name={node.name}
              isHighlighted={node.highlight}
            />
          ))}
        </div>

        <div className="relative z-10 self-center">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[140px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-emerald-500/[0.12] blur-3xl" />

          <div className="relative flex min-h-[112px] w-[150px] flex-col items-center justify-center rounded-2xl border-2 border-emerald-400 bg-gradient-to-b from-[#0a2e29] via-[#051c19] to-[#010c0a] px-4 py-6 shadow-[0_0_40px_rgba(52,211,153,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <GitBranch
              size={18}
              className="mb-3 animate-[spin_16s_linear_infinite] text-emerald-400/70 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]"
            />

            <div className="text-center select-none">
              <div className="mb-1 font-mono text-[8px] font-black tracking-[0.25em] text-emerald-400/60 uppercase">
                Dependency Planner
              </div>

              <div className="font-mono text-sm font-black tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                resolve_deps()
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-full h-[24px] w-16 -translate-y-1/2">
            <svg
              className="h-full w-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="12"
                x2="64"
                y2="12"
                stroke="rgba(16,185,129,0.15)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="12"
                x2="64"
                y2="12"
                stroke="#54d399"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 8"
                opacity="0.95"
                style={{
                  animation: "pipeFlow 1.7s linear infinite",
                  filter: "drop-shadow(0 0 4px rgba(52,211,153,0.8))",
                }}
              />
            </svg>
          </div>
        </div>

        <div className="relative z-20 flex h-[64px] w-[86px] self-center items-center justify-center rounded-2xl border border-emerald-500/25 bg-[#061614] px-3 shadow-[0_0_18px_rgba(52,211,153,0.08)]">
          <div className="text-center font-mono text-xs leading-tight font-semibold tracking-tight text-emerald-300/70">
            Refund
            <br />
            Eligibility
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes dashMove {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -26; }
        }
        @keyframes pipeFlow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -14;
          }
        }
      `,
        }}
      />
    </div>
  );
}
