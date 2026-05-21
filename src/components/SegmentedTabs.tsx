"use client";

import { useEffect } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
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
  const { theme } = useTheme();

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
    <div
      className={cn(
        "inline-flex border",
        theme.radius.pill,
        theme.colors.borderPrimary,
        theme.colors.surfaceTabTrack,
        theme.spacing.tabShellPadding,
        theme.shadows.control,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            theme.radius.pill,
            theme.spacing.tabItemPadding,
            theme.typography.tabLabel,
            "transition-all duration-300",
            activeTab === tab.id
              ? cn(
                  theme.colors.surfaceTabActive,
                  theme.shadows.controlActive,
                )
              : cn(
                  theme.colors.textTabInactive,
                  theme.colors.textTabInactiveHover,
                ),
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
