"use client";

import { useState } from "react";

import TransitionLine from "@/components/TransitionLine";

import { challengesContent } from "@/content/overview/challenges";

import PlanningPanel from "../challenges/PlanningPanel";

export default function ChallengesSection() {

  const content = challengesContent.en;

  const [activeTab, setActiveTab] = useState("Planning");

  return (
    <section className="py-8">

      <TransitionLine
        text={content.transition}
      />

      <div className="mx-auto max-w-7xl px-6">

        {/* header */}

        <div className="max-w-4xl">

          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {content.sectionLabel}
          </div>

          <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-slate-900 md:text-6xl">

            {content.title.line1}

            <br />

            {content.title.line2}

          </h2>

        </div>

        {/* tabs */}

        <div className="mt-12 inline-flex rounded-full bg-slate-100 p-2 shadow-inner">

          {content.tabs.map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-8 py-4 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>

          ))}

        </div>

        {/* panel */}

        <div className="mt-10">

          {activeTab === "Planning" && (
            <PlanningPanel />
          )}

          {activeTab === "Policy Coordination" && (
            <div className="rounded-[2rem] border border-dashed border-slate-300 p-16 text-slate-400">
              Policy panel coming next.
            </div>
          )}

          {activeTab === "Operational Change" && (
            <div className="rounded-[2rem] border border-dashed border-slate-300 p-16 text-slate-400">
              Operational panel coming next.
            </div>
          )}

        </div>

      </div>

    </section>
  );
}