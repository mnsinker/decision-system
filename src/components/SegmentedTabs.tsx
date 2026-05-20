"use client";

import { useEffect } from "react";

type Tab = {
  id: string;
  label: string;
};

type Props = {
  tabs: Tab[];

  activeTab: string;

  onChange: (id: string) => void;

  autoPlay?: boolean;

  interval?: number;
};

export default function SegmentedTabs({
  tabs,
  activeTab,
  onChange,
  autoPlay = false,
  interval = 3000,
}: Props) {
  /**
   * =========================================================
   * AUTO PLAY
   * =========================================================
   */

  useEffect(() => {
    if (!autoPlay) return;

    const currentIndex = tabs.findIndex((t) => t.id === activeTab);

    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % tabs.length;

      onChange(tabs[nextIndex].id);
    }, interval);

    return () => clearTimeout(timer);
  }, [activeTab, autoPlay, interval, onChange, tabs]);

  return (
    <div className="inline-flex rounded-full bg-slate-100 p-1 shadow-inner">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
