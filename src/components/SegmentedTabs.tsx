"use client";

import { useEffect } from "react";
import { systemControlChrome } from "@/design-system/controlChrome";
import { cn } from "@/lib/cn";

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
    <div className={systemControlChrome.track}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={
              isActive
                ? systemControlChrome.itemActive
                : systemControlChrome.itemInactive
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
