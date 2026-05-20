"use client";

import React, { useState } from "react";
import {
  Cpu,
  GitBranch,
  Layers,
  ArrowRight,
  CornerDownRight,
} from "lucide-react";

type TabKey = "context" | "topology" | "policy";

const tabs = [
  { id: "context", label: "Context Isolation" },
  { id: "topology", label: "Procedural Topology" },
  { id: "policy", label: "Policy Sandboxing" },
] as const;

export default function ArchitecturePremiumFeel() {
  const [activeTab, setActiveTab] = useState<TabKey>("topology");

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-950 antialiased">
      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0B1020] text-white">
                <Cpu size={12} />
              </div>

              <span className="text-[15px] font-semibold tracking-tight text-slate-900">
                Axiom
                <span className="ml-1 font-normal text-slate-400">Runtime</span>
              </span>
            </div>

            <div className="hidden items-center gap-6 md:flex">
              <span className="text-[14px] font-semibold text-slate-900">
                Architecture
              </span>

              <span className="text-[14px] text-slate-500 transition-colors hover:text-slate-900">
                Infrastructure
              </span>

              <span className="text-[14px] text-slate-500 transition-colors hover:text-slate-900">
                Runtime Spec
              </span>
            </div>
          </div>

          <div className="hidden text-[13px] text-slate-400 md:flex">
            Enterprise Runtime Edition
          </div>
        </div>
      </nav>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <header className="px-8 pt-10 pb-7">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-3 font-mono text-[11px] font-bold tracking-[0.22em] text-indigo-500 uppercase">
              Runtime Isolation Protocol
            </div>

            {/* ↓ adjusted smaller + calmer */}
            <h1 className="max-w-4xl text-[30px] leading-[1.03] font-[640] tracking-[-0.04em] text-[#0B1020]">
              Different pressures activate
              <br />
              different runtime layers.
            </h1>
          </div>
        </div>
      </header>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="px-8 pb-20">
        <div className="mx-auto max-w-7xl">
          {/* ============================================= */}
          {/* TOP CONTROL BAR */}
          {/* ============================================= */}

          <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-2 font-mono text-[11px] font-bold tracking-[0.2em] text-indigo-500 uppercase">
                Runtime Architecture Framework
              </div>

              {/* ↓ smaller */}
              <h2 className="text-[25px] leading-[1.06] font-[640] tracking-[-0.035em] text-[#0B1020]">
                Deterministic execution
                <br />
                under parallel load.
              </h2>
            </div>

            {/* ================================================= */}
            {/* KEEP YOUR PREMIUM TABS */}
            {/* ================================================= */}

            <div className="inline-flex rounded-[28px] border border-slate-200 bg-[#EEF1F5] p-[6px] shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-[22px] px-7 py-3 text-[14px] font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-[#0B1020] text-white shadow-[0_4px_14px_rgba(15,23,42,0.12)]"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ============================================= */}
          {/* MAIN PANEL */}
          {/* ============================================= */}

          <div className="mt-8 overflow-hidden rounded-[38px] border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.10)]">
            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="border-b border-slate-100 bg-[#FBFCFD] px-10 py-7">
              <div className="mb-3 font-mono text-[11px] font-bold tracking-[0.2em] text-indigo-500 uppercase">
                Runtime Impression Profile
              </div>

              {/* ↓ more premium / less aggressive */}
              <h3 className="max-w-5xl text-[28px] leading-[1.06] font-[620] tracking-[-0.035em] text-[#0B1020] italic">
                Hidden execution graphs generate untestable code paths and
                untraceable runtime behavior.
              </h3>
            </div>

            {/* ================================================= */}
            {/* SPLIT */}
            {/* ================================================= */}

            <div className="grid lg:grid-cols-2">
              {/* ========================================= */}
              {/* LEFT */}
              {/* ========================================= */}

              <div className="border-r border-slate-100 bg-[#FCFCFD] px-7 py-7">
                <div className="mb-5 flex items-center justify-between">
                  <div className="font-mono text-[11px] font-bold tracking-[0.2em] text-rose-500 uppercase">
                    Procedural Leakage
                  </div>

                  {/* softer badge */}
                  <div className="rounded-full border border-rose-100 bg-rose-50/70 px-3 py-1 text-[10px] font-medium text-rose-500">
                    Hidden Dependency Chain
                  </div>
                </div>

                {/* ================================================= */}
                {/* BOX */}
                {/* ================================================= */}

                <div className="rounded-[30px] border border-rose-100 bg-white px-6 py-6 shadow-[0_20px_40px_-30px_rgba(244,63,94,0.18)]">
                  <div className="flex items-start gap-3">
                    <div className="mt-[9px] h-1.5 w-1.5 rounded-full bg-rose-400" />

                    <p className="max-w-xl text-[15px] leading-7 font-medium text-rose-700">
                      Dependency graphs silently emerge through runtime
                      parameter propagation.
                    </p>
                  </div>

                  {/* ========================================= */}
                  {/* CODE PANEL */}
                  {/* ========================================= */}

                  <div className="mt-6 overflow-hidden rounded-[26px] border border-slate-200 bg-[#FAFBFC]">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                      <div className="rounded-full bg-rose-50 px-3 py-1 text-[10px] font-bold tracking-wide text-rose-500 uppercase">
                        Procedural Flow
                      </div>

                      <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
                        <button className="rounded-full bg-[#0B1020] px-3 py-1 text-[11px] font-semibold text-white">
                          Code
                        </button>

                        <button className="px-3 py-1 text-[11px] font-semibold text-slate-400">
                          Graph
                        </button>
                      </div>
                    </div>

                    {/* CODE */}
                    <div className="space-y-3 px-6 py-5 font-mono text-[14px] leading-7">
                      <div>
                        <span className="font-semibold text-blue-600">def</span>{" "}
                        <span className="font-semibold text-slate-800">
                          refund_flow
                        </span>
                        <span className="text-slate-400">(order):</span>
                      </div>

                      <div className="pl-6 text-slate-500">
                        <span className="font-semibold text-blue-600">
                          shipping
                        </span>{" "}
                        = get_shipping(order.id)
                      </div>

                      <div className="pl-6">
                        <span className="font-semibold text-blue-600">tax</span>{" "}
                        = get_tax_profile(
                        <span className="rounded bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-700">
                          shipping.zone
                        </span>
                        )
                      </div>

                      <div className="pl-6 text-slate-500">
                        <span className="font-semibold text-blue-600">
                          eligibility
                        </span>{" "}
                        = check_refund(...)
                      </div>

                      <div className="border-t border-slate-100 pt-3 text-slate-500">
                        <span className="font-semibold text-blue-600">
                          return
                        </span>{" "}
                        create_refund(eligibility)
                      </div>
                    </div>
                  </div>

                  {/* ========================================= */}
                  {/* FOOTNOTE */}
                  {/* ========================================= */}

                  <div className="mt-5 rounded-[24px] border border-slate-200 bg-[#FAFBFC] px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-[6px] h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]" />

                      <div>
                        <div className="mb-1 font-mono text-[10px] font-bold tracking-[0.18em] text-amber-600 uppercase">
                          Implicit Coupling
                        </div>

                        <p className="text-[14px] leading-6 text-slate-500">
                          Eligibility evaluation silently depends on shipping
                          runtime context through parameter propagation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================= */}
              {/* RIGHT */}
              {/* ========================================= */}

              <div className="relative overflow-hidden bg-[#071011] px-7 py-7 text-white">
                {/* ambient */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-[360px] w-[360px] rounded-full bg-emerald-500/[0.06] blur-[130px]" />

                <div className="pointer-events-none absolute bottom-0 left-0 h-[220px] w-[220px] rounded-full bg-indigo-500/[0.03] blur-[100px]" />

                <div className="relative z-10">
                  <div className="mb-5 font-mono text-[11px] font-bold tracking-[0.2em] text-emerald-400 uppercase">
                    Declarative Planned Runtime
                  </div>

                  {/* ========================================= */}
                  {/* TITLE */}
                  {/* ========================================= */}

                  <div className="rounded-[30px] border border-emerald-500/10 bg-white/[0.02] px-7 py-6 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <Layers size={18} className="text-emerald-400" />

                      {/* GEMINI FEEL */}
                      <h3 className="text-[21px] leading-none font-[630] tracking-[-0.03em] text-white">
                        DAG Orchestration
                      </h3>
                    </div>

                    <p className="mt-3 text-[14px] leading-6 text-emerald-300/70">
                      Dynamic dependency resolution through centralized topology
                      planning.
                    </p>
                  </div>

                  {/* ========================================= */}
                  {/* VISUAL */}
                  {/* ========================================= */}

                  <div className="mt-6 rounded-[30px] border border-white/5 bg-white/[0.02] px-6 py-8">
                    <div className="grid grid-cols-[140px_1fr_120px] items-center gap-6">
                      {/* LEFT */}
                      <div className="space-y-3">
                        {["Order", "Shipping", "History", "TaxProfile"].map(
                          (item, idx) => (
                            <div
                              key={item}
                              className={`rounded-[22px] border px-4 py-3 text-[14px] font-medium ${
                                idx === 1
                                  ? "border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-300"
                                  : "border-white/5 bg-white/[0.02] text-slate-400"
                              }`}
                            >
                              {item}
                            </div>
                          ),
                        )}
                      </div>

                      {/* CENTER */}
                      <div className="flex items-center justify-center">
                        <div className="relative flex h-[162px] w-[162px] flex-col items-center justify-center rounded-[34px] border border-emerald-400/35 bg-gradient-to-b from-[#0B1F1C] to-[#071011] shadow-[0_0_50px_rgba(16,185,129,0.12)]">
                          <GitBranch
                            size={18}
                            className="mb-3 text-emerald-400"
                          />

                          <div className="text-center">
                            <div className="mb-2 font-mono text-[10px] font-bold tracking-[0.2em] text-emerald-400/70 uppercase">
                              Dependency Planner
                            </div>

                            <div className="font-mono text-[16px] font-semibold text-white">
                              resolve_deps()
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center justify-center">
                        <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/[0.05] px-5 py-5 text-center">
                          <div className="text-[15px] leading-tight font-[620] text-white">
                            Refund
                            <br />
                            Eligibility
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ========================================= */}
                  {/* FOOTNOTE */}
                  {/* ========================================= */}

                  <div className="mt-6 rounded-[24px] border border-white/6 bg-white/[0.03] px-5 py-4">
                    <div className="flex items-start gap-3">
                      <GitBranch
                        size={14}
                        className="mt-0.5 text-emerald-400"
                      />

                      <div>
                        <div className="mb-1 font-mono text-[10px] font-bold tracking-[0.18em] text-emerald-400 uppercase">
                          Explicit DAG Resolution
                        </div>

                        <p className="text-[14px] leading-6 text-slate-300">
                          Procedural references are compiled into deterministic
                          execution graphs before runtime begins.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================= */}
          {/* LOWER GRID */}
          {/* ============================================= */}

          <section className="mt-14">
            <div className="mb-7">
              <div className="mb-2 font-mono text-[11px] font-bold tracking-[0.2em] text-indigo-500 uppercase">
                Verification Maps
              </div>

              <h3 className="text-[22px] leading-tight font-[640] tracking-[-0.03em] text-[#0B1020]">
                Formalized operational structures.
              </h3>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Trace Route Graphs",
                  desc: "Compiles nested procedural execution tracks into explicit graph structures.",
                },

                {
                  title: "Isolated Runtime States",
                  desc: "Encapsulates multi-tenant execution flows inside deterministic boundaries.",
                },

                {
                  title: "Sandboxed Policy Specs",
                  desc: "Routes volatile business rules through isolated interface layers.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.12)]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="font-mono text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                      Framework Spec
                    </div>

                    <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
                      Active
                    </div>
                  </div>

                  <h4 className="text-[17px] leading-tight font-[630] tracking-[-0.03em] text-[#0B1020]">
                    {card.title}
                  </h4>

                  <p className="mt-3 text-[14px] leading-7 text-slate-500">
                    {card.desc}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                    {[
                      "Validate structural dependencies",
                      "Resolve runtime lineage",
                      "Guarantee deterministic output",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-[13px] text-slate-600"
                      >
                        <CornerDownRight size={12} className="text-slate-300" />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-11 flex flex-col items-center">
              <button className="group inline-flex items-center gap-2 rounded-[20px] bg-[#0B1020] px-5 py-3 text-[12px] font-bold tracking-[0.14em] text-white uppercase transition-all hover:bg-indigo-600">
                Initialize Runtime Simulator
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>

              <div className="mt-4 text-[12px] text-slate-400">
                Runtime architecture validated under orchestration stress
                profiles.
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
