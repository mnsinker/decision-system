"use client";

import React from "react";
import { heroContent } from "@/content/overview/hero";
import {
  Activity,
  ArrowRight,
} from "lucide-react";


export default function HeroSection() {
  const hero = heroContent.en;
  return (
    <section className="relative pt-20 pb-16">

      {/* Background */}
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-full -translate-x-1/2 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#e2e8f0_0%,transparent_50%)]" />
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-200/50 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">

        {/* Top Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
          <Activity size={14} />
          {hero.badge}
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-7xl">
          {hero.title.normal}

          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {" "}{hero.title.highlight}
          </span>

          {hero.title.end}
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
          {hero.subtitle}
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap items-center gap-4">

          <button className="group flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-base font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200">
            {hero.primaryButton}

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 transition-all hover:bg-slate-50">
            {hero.secondaryButton}
          </button>

        </div>
      </div>
    </section>
  );
}
