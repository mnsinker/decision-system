"use client";

import React, { useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";
import {
  Cpu,
  Layers,
  GitBranch,
  ArrowRight,
  CornerDownRight,
} from "lucide-react";

type TabKey = "context" | "topology" | "policy";

const tabs = [
  { id: "context", label: "Context Isolation" },
  { id: "topology", label: "Procedural Topology" },
  { id: "policy", label: "Policy Sandboxing" },
] as const;

export default function RuntimeArchitectureDense() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>("topology");

  return (
    <div
      className={cn(
        "min-h-screen antialiased",
        theme.colors.surfacePage,
        theme.colors.textPrimary,
      )}
    >
      {/* ================================================= */}
      {/* NAV */}
      {/* ================================================= */}

      <nav className="border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div
          className={cn(
            "mx-auto flex items-center justify-between",
            theme.spacing.container,
            theme.spacing.navHeightDense,
            theme.spacing.sectionX,
          )}
        >
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0B1020] text-white">
                <Cpu size={12} />
              </div>

              <div className="text-[15px] font-semibold tracking-tight">
                Axiom
                <span className="ml-1 font-normal text-slate-400">Runtime</span>
              </div>
            </div>

            <div className="hidden items-center gap-7 md:flex">
              <span className="text-[14px] font-semibold text-slate-900">
                Architecture
              </span>

              <span className="text-[14px] text-slate-500">Infrastructure</span>

              <span className="text-[14px] text-slate-500">Runtime Spec</span>
            </div>
          </div>

          <div className="hidden text-[13px] text-slate-400 md:block">
            Enterprise Runtime Edition
          </div>
        </div>
      </nav>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <header className={cn(theme.spacing.sectionX, "pt-10 pb-7")}>
        <div className={cn("mx-auto", theme.spacing.container)}>
          <div className="mb-2.5 font-mono text-[10px] font-bold tracking-[0.22em] text-indigo-500 uppercase">
            Runtime Architecture Framework
          </div>

          <h1 className="max-w-4xl text-[32px] leading-[0.95] font-[620] tracking-[-0.065em] text-[#0B1020]">
            Deterministic execution
            <br />
            under parallel load.
          </h1>
        </div>
      </header>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className={cn(theme.spacing.sectionX, theme.spacing.sectionY)}>
        <div className={cn("mx-auto", theme.spacing.container)}>
          {/* ================================================= */}
          {/* CONTROL BAR */}
          {/* ================================================= */}

          <div
            className={cn(
              "flex flex-col gap-5 border-b pb-5 lg:flex-row lg:items-end lg:justify-between",
              theme.colors.borderPrimary,
              theme.spacing.panelGap,
            )}
          >
            <div className="max-w-2xl">
              <div className="mb-2 font-mono text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                Runtime Isolation Protocol
              </div>

              <p className="text-[14px] leading-6 text-slate-500">
                Structured execution boundaries eliminate hidden dependency
                drift across multi-tenant orchestration systems.
              </p>
            </div>

            {/* ================================================= */}
            {/* TABS */}
            {/* ================================================= */}

            <div className="inline-flex rounded-[22px] border border-slate-200 bg-[#ECEFF3] p-[5px] shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-[17px] px-5 py-2.5 text-[13px] font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-[#0B1020] text-white shadow-[0_4px_12px_rgba(15,23,42,0.12)]"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* MAIN CONTAINER */}
          {/* ================================================= */}

          <div
            className={cn(
              "overflow-hidden border",
              theme.spacing.panelTop,
              theme.radius.shell,
              theme.colors.borderPrimary,
              theme.colors.surfacePrimary,
              theme.shadows.shell,
            )}
          >
            {/* ================================================= */}
            {/* TOP HEADER */}
            {/* ================================================= */}

            <div
              className={cn(
                "border-b px-8 py-6",
                theme.colors.borderMuted,
                theme.colors.surfaceMuted,
              )}
            >
              <div className="mb-2 font-mono text-[10px] font-bold tracking-[0.2em] text-indigo-500 uppercase">
                Runtime Impression Profile
              </div>

              <h2 className="max-w-5xl text-[25px] leading-[1.02] font-[620] tracking-[-0.055em] text-[#0B1020] italic">
                Hidden execution graphs generate untestable runtime behavior.
              </h2>
            </div>

            {/* ================================================= */}
            {/* SPLIT */}
            {/* ================================================= */}

            <div className="grid lg:grid-cols-2">
              {/* ================================================= */}
              {/* LEFT */}
              {/* ================================================= */}

              <div className="border-r border-slate-100 bg-[#FCFCFD] px-7 py-7">
                <div className="mb-5 flex items-center justify-between">
                  <div className="font-mono text-[10px] font-bold tracking-[0.2em] text-rose-500 uppercase">
                    Procedural Leakage
                  </div>

                  <div className="rounded-full border border-rose-100 bg-rose-50/70 px-2.5 py-1 text-[9px] font-medium text-rose-500">
                    Hidden Dependency Chain
                  </div>
                </div>

                {/* ================================================= */}
                {/* RISK BOX */}
                {/* ================================================= */}

                <div className="rounded-[26px] border border-rose-100 bg-white px-6 py-6 shadow-[0_20px_40px_-35px_rgba(244,63,94,0.18)]">
                  <div className="flex items-start gap-3">
                    <div className="mt-[8px] h-1.5 w-1.5 rounded-full bg-rose-400" />

                    <p className="max-w-xl text-[14px] leading-6 font-medium text-rose-700">
                      Dependency graphs silently emerge through runtime
                      parameter propagation.
                    </p>
                  </div>

                  {/* ================================================= */}
                  {/* CODE PANEL */}
                  {/* ================================================= */}

                  <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200 bg-[#FAFBFC]">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                      <div className="rounded-full bg-rose-50 px-2.5 py-1 text-[9px] font-bold tracking-wide text-rose-500 uppercase">
                        Procedural Flow
                      </div>

                      <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
                        <button className="rounded-full bg-[#0B1020] px-2.5 py-1 text-[10px] font-semibold text-white">
                          Code
                        </button>

                        <button className="px-2.5 py-1 text-[10px] font-semibold text-slate-400">
                          Graph
                        </button>
                      </div>
                    </div>

                    {/* CODE */}
                    <div className="space-y-3 px-6 py-5 font-mono text-[13px] leading-6">
                      <div>
                        <span className="font-semibold text-blue-600">def</span>{" "}
                        <span className="font-semibold text-slate-800">
                          refund_flow
                        </span>
                        <span className="text-slate-400">(order):</span>
                      </div>

                      <div className="pl-5 text-slate-500">
                        <span className="font-semibold text-blue-600">
                          shipping
                        </span>{" "}
                        = get_shipping(order.id)
                      </div>

                      <div className="pl-5">
                        <span className="font-semibold text-blue-600">tax</span>{" "}
                        = get_tax_profile(
                        <span className="rounded bg-amber-100 px-1 py-0.5 font-semibold text-amber-700">
                          shipping.zone
                        </span>
                        )
                      </div>

                      <div className="pl-5 text-slate-500">
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

                  {/* ================================================= */}
                  {/* FOOTNOTE */}
                  {/* ================================================= */}

                  <div className="mt-6 rounded-[22px] border border-slate-200 bg-[#FAFBFC] px-6 py-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-[7px] h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]" />

                      <div>
                        <div className="mb-1.5 font-mono text-[10px] font-bold tracking-[0.18em] text-amber-600 uppercase">
                          Implicit Coupling
                        </div>

                        <p className="text-[13px] leading-6 text-slate-500">
                          Eligibility evaluation silently depends on shipping
                          runtime context through parameter propagation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================================================= */}
              {/* RIGHT */}
              {/* ================================================= */}

              <div className="relative overflow-hidden bg-gradient-to-br from-[#071011] via-[#04100E] to-[#020807] px-7 py-7 text-white">
                <div className="pointer-events-none absolute -top-20 -right-20 h-[320px] w-[320px] rounded-full bg-emerald-500/[0.05] blur-[120px]" />

                <div className="pointer-events-none absolute bottom-0 left-0 h-[220px] w-[220px] rounded-full bg-indigo-500/[0.03] blur-[100px]" />

                <div className="relative z-10">
                  <div className="mb-5 font-mono text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">
                    Declarative Planned Runtime
                  </div>

                  {/* ================================================= */}
                  {/* TITLE CARD */}
                  {/* ================================================= */}

                  <div className="rounded-[26px] border border-emerald-500/10 bg-white/[0.02] px-6 py-6 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <Layers size={16} className="text-emerald-400" />

                      <h3 className="text-[20px] leading-none font-[620] tracking-[-0.04em] text-white">
                        DAG Orchestration
                      </h3>
                    </div>

                    <p className="mt-3 text-[13px] leading-6 text-emerald-300/70">
                      Dynamic dependency resolution through centralized topology
                      planning.
                    </p>
                  </div>

                  {/* ================================================= */}
                  {/* VISUAL */}
                  {/* ================================================= */}

                  <div className="mt-6 rounded-[26px] border border-white/5 bg-white/[0.02] px-6 py-7">
                    <div className="grid grid-cols-[120px_1fr_110px] items-center gap-6">
                      <div className="space-y-3">
                        {["Order", "Shipping", "History", "TaxProfile"].map(
                          (item, idx) => (
                            <div
                              key={item}
                              className={`rounded-[18px] border px-4 py-3 text-[13px] font-medium ${
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

                      <div className="flex items-center justify-center">
                        <div className="relative flex h-[150px] w-[150px] flex-col items-center justify-center rounded-[30px] border border-emerald-400/30 bg-gradient-to-b from-[#0B1F1C] to-[#071011] shadow-[0_0_40px_rgba(16,185,129,0.10)]">
                          <GitBranch
                            size={17}
                            className="mb-3 text-emerald-400"
                          />

                          <div className="text-center">
                            <div className="mb-1.5 font-mono text-[9px] font-bold tracking-[0.18em] text-emerald-400/70 uppercase">
                              Dependency Planner
                            </div>

                            <div className="font-mono text-[14px] font-semibold text-white">
                              resolve_deps()
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="rounded-[20px] border border-emerald-500/20 bg-emerald-500/[0.05] px-4 py-4 text-center">
                          <div className="text-[14px] leading-tight font-[620] text-white">
                            Refund
                            <br />
                            Eligibility
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* FOOTNOTE */}
                  {/* ================================================= */}

                  <div className="mt-6 rounded-[22px] border border-white/6 bg-white/[0.03] px-6 py-5">
                    <div className="flex items-start gap-3">
                      <GitBranch
                        size={13}
                        className="mt-0.5 text-emerald-400"
                      />

                      <div>
                        <div className="mb-1.5 font-mono text-[9px] font-bold tracking-[0.18em] text-emerald-400 uppercase">
                          Explicit DAG Resolution
                        </div>

                        <p className="text-[13px] leading-6 text-slate-300">
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

          {/* ================================================= */}
          {/* LOWER SECTION */}
          {/* ================================================= */}

          <section className="mt-14">
            <div className="mb-6">
              <div className="mb-2 font-mono text-[10px] font-bold tracking-[0.18em] text-indigo-500 uppercase">
                Verification Maps
              </div>

              <h3 className="text-[21px] leading-tight font-[630] tracking-[-0.035em] text-[#0B1020]">
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
                  className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_20px_40px_-35px_rgba(15,23,42,0.12)]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="font-mono text-[9px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                      Framework Spec
                    </div>

                    <div className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-medium text-emerald-600">
                      Active
                    </div>
                  </div>

                  <h4 className="text-[16px] leading-tight font-[620] tracking-[-0.03em] text-[#0B1020]">
                    {card.title}
                  </h4>

                  <p className="mt-3 text-[13px] leading-6 text-slate-500">
                    {card.desc}
                  </p>

                  <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                    {[
                      "Validate structural dependencies",
                      "Resolve runtime lineage",
                      "Guarantee deterministic output",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-[12px] text-slate-600"
                      >
                        <CornerDownRight size={11} className="text-slate-300" />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col items-center">
              <button className="group inline-flex items-center gap-2 rounded-[16px] bg-[#0B1020] px-5 py-3 text-[11px] font-bold tracking-[0.14em] text-white uppercase transition-all hover:bg-indigo-600">
                Initialize Runtime Simulator
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>

              <div className="mt-3 text-[11px] text-slate-400">
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
