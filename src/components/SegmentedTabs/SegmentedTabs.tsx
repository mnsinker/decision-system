"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  segmentedTabsBehavior,
  useSegmentedTabsAutoPlay,
  useSelectedPill,
} from "./segmentedTabs.behavior";
import { segmentedTabsMotion } from "./segmentedTabs.motion";
import {
  getSegmentedTabsSkin,
  segmentedTabsVariants,
  type SegmentedTabsVariant,
} from "./segmentedTabs.variants";

export type SegmentedTab = {
  id: string;
  label: string;
};

type Props = {
  tabs: SegmentedTab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: SegmentedTabsVariant;
  sticky?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
};

function StickyAnchor({
  children,
  variant,
}: {
  children: ReactNode;
  variant: SegmentedTabsVariant;
}) {
  const isRuntime = variant === "runtime";
  const railClass = isRuntime
    ? segmentedTabsVariants.runtime.stickyRail
    : segmentedTabsVariants.editorial.stickyRail;
  const gradientClass = isRuntime
    ? segmentedTabsVariants.runtime.stickyGradient
    : segmentedTabsVariants.editorial.stickyGradient;

  return (
    <div
      className="relative w-full"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2",
          railClass,
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute top-full left-1/2 z-0 h-6 w-screen -translate-x-1/2",
          gradientClass,
        )}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function RuntimeSegmentedTabs({
  tabs,
  activeTab,
  onChange,
  className,
}: Pick<Props, "tabs" | "activeTab" | "onChange" | "className">) {
  const skin = segmentedTabsVariants.runtime;
  const { trackRef, registerTabRef, selectedPillStyle } = useSelectedPill(
    activeTab,
    tabs,
  );

  return (
    <div ref={trackRef} className={cn(skin.track, className)} role="tablist">
      <div
        className={cn(skin.selectedPill, segmentedTabsMotion.selectedPill)}
        style={selectedPillStyle}
        aria-hidden
      />
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            ref={registerTabRef(tab.id)}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              skin.item,
              segmentedTabsMotion.runtimeLabel,
              isActive ? skin.labelActive : skin.labelInactive,
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function EditorialSegmentedTabs({
  tabs,
  activeTab,
  onChange,
  className,
}: Pick<Props, "tabs" | "activeTab" | "onChange" | "className">) {
  const skin = getSegmentedTabsSkin("editorial");

  return (
    <div className={cn(skin.track, className)} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              isActive ? skin.itemActive : skin.itemInactive,
              segmentedTabsMotion.editorialItem,
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default function SegmentedTabs({
  tabs,
  activeTab,
  onChange,
  variant = "editorial",
  sticky = false,
  autoPlay = false,
  interval = segmentedTabsBehavior.autoPlay.defaultInterval,
  className,
}: Props) {
  useSegmentedTabsAutoPlay({ tabs, activeTab, onChange, autoPlay, interval });

  const track =
    variant === "runtime" ? (
      <RuntimeSegmentedTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={onChange}
        className={className}
      />
    ) : (
      <EditorialSegmentedTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={onChange}
        className={className}
      />
    );

  if (!sticky) return track;

  return (
    <StickyAnchor variant={variant}>{track}</StickyAnchor>
  );
}
