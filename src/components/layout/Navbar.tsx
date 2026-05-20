"use client";

import React from "react";

import { Sparkles } from "lucide-react";

import { useLanguage } from "@/lib/LanguageProvider";

export default function Navbar() {
  const { locale, setLocale } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200">
            <Sparkles size={20} fill="currentColor" />
          </div>

          <div>
            <div className="text-sm font-bold tracking-tight text-slate-900">
              AI DECISION SYSTEM
            </div>

            <div className="text-[10px] font-medium tracking-widest text-slate-500 uppercase">
              Ontology • Planning • Execution
            </div>
          </div>
        </div>

        {/* Navigation */}

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#" className="text-indigo-600">
            {locale === "en" ? "Overview" : "概览"}
          </a>

          <a href="#" className="transition hover:text-indigo-600">
            {locale === "en" ? "Demo" : "演示"}
          </a>

          <a href="#" className="transition hover:text-indigo-600">
            {locale === "en" ? "Architecture" : "架构"}
          </a>

          <a href="#" className="transition hover:text-indigo-600">
            {locale === "en" ? "Evolution" : "演化"}
          </a>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">
          {/* locale switch */}

          <button
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {locale === "en" ? "中文" : "EN"}
          </button>

          {/* CTA */}

          <button className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95">
            {locale === "en" ? "Launch Demo" : "启动 Demo"}
          </button>
        </div>
      </div>
    </nav>
  );
}
