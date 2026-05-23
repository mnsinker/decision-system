"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/** Interaction semantics — when / why the control responds */

export type SelectedPillMetrics = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export const selectedPillInitialMetrics: SelectedPillMetrics = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

export const segmentedTabsBehavior = {
  /** Tab rail pins below the header while the parent section scrolls */
  sticky: {
    sectionTrack: "sticky top-16 z-20",
  },
  /** Runtime selected-pill measurement lifecycle */
  selectedPill: {
    hiddenUntilMeasured: 0,
    visibleWhenMeasured: 1,
  },
  /** Autoplay cadence default (ms) */
  autoPlay: {
    defaultInterval: 3000,
  },
} as const;

type TabIdentity = { id: string };

export function useSelectedPill(activeTab: string, tabs: TabIdentity[]) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const [metrics, setMetrics] =
    useState<SelectedPillMetrics>(selectedPillInitialMetrics);
  const [isMeasured, setIsMeasured] = useState(false);

  const syncSelectedPill = useCallback(() => {
    const activeButton = tabRefs.current.get(activeTab);
    if (!activeButton) return;

    setMetrics({
      width: activeButton.offsetWidth,
      height: activeButton.offsetHeight,
      x: activeButton.offsetLeft,
      y: activeButton.offsetTop,
    });
    setIsMeasured(true);
  }, [activeTab]);

  useLayoutEffect(() => {
    syncSelectedPill();
  }, [syncSelectedPill, tabs]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(syncSelectedPill);
    observer.observe(track);
    window.addEventListener("resize", syncSelectedPill);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncSelectedPill);
    };
  }, [syncSelectedPill]);

  const registerTabRef =
    (tabId: string) => (node: HTMLButtonElement | null) => {
      if (node) tabRefs.current.set(tabId, node);
      else tabRefs.current.delete(tabId);
    };

  const selectedPillStyle: CSSProperties = {
    width: metrics.width,
    height: metrics.height,
    transform: `translate3d(${metrics.x}px, ${metrics.y}px, 0)`,
    opacity: isMeasured
      ? segmentedTabsBehavior.selectedPill.visibleWhenMeasured
      : segmentedTabsBehavior.selectedPill.hiddenUntilMeasured,
  };

  return {
    trackRef,
    registerTabRef,
    selectedPillStyle,
    isMeasured,
  };
}

export function useSegmentedTabsAutoPlay({
  tabs,
  activeTab,
  onChange,
  autoPlay = false,
  interval = segmentedTabsBehavior.autoPlay.defaultInterval,
}: {
  tabs: TabIdentity[];
  activeTab: string;
  onChange: (id: string) => void;
  autoPlay?: boolean;
  interval?: number;
}) {
  useEffect(() => {
    if (!autoPlay) return;

    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % tabs.length;
      onChange(tabs[nextIndex].id);
    }, interval);

    return () => clearTimeout(timer);
  }, [activeTab, autoPlay, interval, onChange, tabs]);
}
