# Segmented Tabs Runtime Dump

# Callsites Audit

- `src/app/overview/_sections/OverviewChallenges.tsx`
- `src/app/architecture/_sections/ArchitecturePressure.tsx`
- `src/app/architecture/_sections/ArchitectureLayers.tsx`

---

## sticky top-* usage

```txt

```

## z-index usage

```txt

```

# SegmentedTabs Component Files

## SegmentedTabs.tsx

Path: `src/components/SegmentedTabs/SegmentedTabs.tsx`

```tsx
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
      className={cn(
        "group-sticky",
        segmentedTabsBehavior.sticky.sectionTrack,
        "relative w-full",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 opacity-0 transition-opacity duration-300 group-[:has(.is-stuck)]:opacity-100",
          railClass,
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute top-full left-1/2 z-0 h-6 w-screen -translate-x-1/2 opacity-0 transition-opacity duration-300 group-[:has(.is-stuck)]:opacity-100",
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

```

## segmentedTabs.behavior.ts

Path: `src/components/SegmentedTabs/segmentedTabs.behavior.ts`

```ts
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

```

## segmentedTabs.motion.ts

Path: `src/components/SegmentedTabs/segmentedTabs.motion.ts`

```ts
/**
 * Animation physics only — transition properties, durations, easing.
 * No interaction conditions, measurement, or surface styling.
 */
export const segmentedTabsMotion = {
  editorialItem:
    "transition-[color,box-shadow,background-color,border-color] duration-200",
  runtimeLabel: "transition-colors duration-200",
  selectedPill:
    "transition-[transform,width] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform",
} as const;

```

## segmentedTabs.tokens.ts

Path: `src/components/SegmentedTabs/segmentedTabs.tokens.ts`

```ts
import { radius } from "@/design-system/radius";
import { spacing } from "@/design-system/spacing";

/**
 * Static layout geometry / topology only.
 * No colors, transitions, or interaction semantics.
 */
export const segmentedTabsTokens = {
  trackLayout: "inline-flex flex-wrap items-center",
  trackGap: "gap-0.5",
  trackRadius: radius.pill,
  trackPadding: spacing.tabShellPadding,
  trackPosition: "relative",
  itemRadius: radius.pill,
  itemPadding: spacing.tabItemPadding,
  itemStacking: "relative z-[1]",
  selectedPillStacking: "pointer-events-none absolute left-0 top-0 z-0",
} as const;

```

## segmentedTabs.variants.ts

Path: `src/components/SegmentedTabs/segmentedTabs.variants.ts`

```ts
import { colors } from "@/design-system/colors";
import { shadows } from "@/design-system/shadows";
import { typography } from "@/design-system/typography";
import { cn } from "@/lib/cn";
import { segmentedTabsTokens } from "./segmentedTabs.tokens";

/**
 * Optical surface skins only — color, border, shadow, type color.
 * No motion, measurement, or interaction semantics.
 */

export type SegmentedTabsVariant = "editorial" | "runtime";

export type EditorialSegmentedTabsSkin = {
  track: string;
  itemActive: string;
  itemInactive: string;
  stickyRail: string;
  stickyGradient: string;
};

export type RuntimeSegmentedTabsSkin = {
  track: string;
  selectedPill: string;
  item: string;
  labelActive: string;
  labelInactive: string;
  stickyRail: string;
  stickyGradient: string;
};

const trackGeometry = cn(
  segmentedTabsTokens.trackLayout,
  segmentedTabsTokens.trackGap,
  "border",
  segmentedTabsTokens.trackRadius,
  segmentedTabsTokens.trackPadding,
);

const itemGeometry = cn(
  segmentedTabsTokens.itemRadius,
  segmentedTabsTokens.itemPadding,
);

const editorial: EditorialSegmentedTabsSkin = {
  track: cn(trackGeometry, "bg-white", colors.borderPrimary, shadows.control),
  itemActive: cn(
    itemGeometry,
    typography.tabLabel,
    colors.surfaceTabActive,
    shadows.controlActive,
  ),
  itemInactive: cn(
    itemGeometry,
    typography.tabLabel,
    colors.textTabInactive,
    colors.textTabInactiveHover,
  ),
  stickyRail: "bg-white/70 backdrop-blur-md",
  stickyGradient: "bg-gradient-to-b from-white/70 to-transparent",
};

const runtime: RuntimeSegmentedTabsSkin = {
  track: cn(
    trackGeometry,
    segmentedTabsTokens.trackPosition,
    "border-white/[0.06] bg-slate-950/55",
  ),
  selectedPill: cn(
    segmentedTabsTokens.itemRadius,
    segmentedTabsTokens.selectedPillStacking,
    "border border-indigo-400/40 bg-indigo-600/28",
    "shadow-[0_1px_0_rgba(255,255,255,0.07)_inset,0_1px_2px_rgba(0,0,0,0.45)]",
  ),
  item: cn(
    itemGeometry,
    segmentedTabsTokens.itemStacking,
    "border-0 bg-transparent font-mono text-[11px] tracking-wide",
  ),
  labelActive: "font-semibold text-indigo-50",
  labelInactive: "text-slate-400 hover:text-slate-200",
  stickyRail: "bg-[#030712]/45 backdrop-blur-md",
  stickyGradient: "bg-gradient-to-b from-[#030712]/45 to-transparent",
};

export const segmentedTabsVariants = {
  editorial,
  runtime,
} as const;

export function getSegmentedTabsSkin(
  variant: "editorial",
): EditorialSegmentedTabsSkin;
export function getSegmentedTabsSkin(
  variant: "runtime",
): RuntimeSegmentedTabsSkin;
export function getSegmentedTabsSkin(
  variant: SegmentedTabsVariant = "editorial",
): EditorialSegmentedTabsSkin | RuntimeSegmentedTabsSkin {
  return segmentedTabsVariants[variant];
}

```

## index.ts

Path: `src/components/SegmentedTabs/index.ts`

```ts
export { default } from "./SegmentedTabs";
export type { SegmentedTab } from "./SegmentedTabs";
export type { SegmentedTabsVariant } from "./segmentedTabs.variants";
export {
  segmentedTabsBehavior,
  useSegmentedTabsAutoPlay,
  useSelectedPill,
} from "./segmentedTabs.behavior";
export type { SelectedPillMetrics } from "./segmentedTabs.behavior";
export { selectedPillInitialMetrics } from "./segmentedTabs.behavior";
export { segmentedTabsMotion } from "./segmentedTabs.motion";
export { segmentedTabsTokens } from "./segmentedTabs.tokens";
export {
  getSegmentedTabsSkin,
  segmentedTabsVariants,
} from "./segmentedTabs.variants";

```

# Page Callsites

## OverviewChallenges.tsx

Path: `src/app/overview/_sections/OverviewChallenges.tsx`

```tsx
"use client";

import { useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import SectionHeader from "@/components/SectionHeader";
import SegmentedTabs from "@/components/SegmentedTabs";

import ChallengePanel from "../challenges/ChallengePanel";
import { overviewChallengesContent } from "@/content/overview/overviewChallenges";
import { semanticHierarchy } from "@/design-system/semanticVisual";
export default function OverviewChallenges() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = overviewChallengesContent[locale];

  const [activeTab, setActiveTab] = useState("challenge1");

  return (
    <section
      id="overview-challenges"
      className={cn(
        theme.spacing.sectionXComfort,
        theme.colors.surfacePrimary,
        "scroll-mt-20 pt-4 pb-5",
      )}
    >
      <div className={cn("mx-auto", theme.spacing.container)}>
        <div className={semanticHierarchy.sectionHero.spacing.afterBridge}>
          <SectionHeader
            eyebrow={content.sectionLabel}
            title={`${content.title.line1}\n${content.title.line2}`}
            narrativeRole="section"
          />
        </div>

        <div className="mt-3 flex justify-start">
          <SegmentedTabs
            tabs={content.tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            sticky={true}
          />
        </div>

        <div className="mt-4">
          {activeTab === "challenge1" && (
            <ChallengePanel
              challenge={content.challenge1}
              interpretationLabel={content.interpretationLabel}
            />
          )}

          {activeTab === "challenge2" && (
            <ChallengePanel
              challenge={content.challenge2}
              interpretationLabel={content.interpretationLabel}
            />
          )}

          {activeTab === "challenge3" && (
            <ChallengePanel
              challenge={content.challenge3}
              interpretationLabel={content.interpretationLabel}
            />
          )}
        </div>
      </div>
    </section>
  );
}

```

## ArchitecturePressure.tsx

Path: `src/app/architecture/_sections/ArchitecturePressure.tsx`

```tsx
"use client";

import { useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

import SectionHeader from "@/components/SectionHeader";
import SegmentedTabs from "@/components/SegmentedTabs";
import PressureLeftCard from "../pressure/PressureLeftCard";
import PressureRightCard from "../pressure/PressureRightCard";
import PressureLeftVisual1 from "../pressure/PressureLeftVisual1";
import PressureLeftVisual2 from "../pressure/PressureLeftVisual2";
import PressureRightVisual1 from "../pressure/PressureRightVisual1";
import PressureRightVisual2 from "../pressure/PressureRightVisual2";
import PressureRightVisual3 from "../pressure/PressureRightVisual3";
import { architecturePressureContent } from "@/content/architecture/architecturePressure";
import { semanticVisual } from "@/design-system/semanticVisual";
import PressureLeftVisual3 from "@/app/architecture/pressure/PressureLeftVisual3";

export default function ArchitecturePressure() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = architecturePressureContent[locale];
  const leftVisuals = {
    tab1: PressureLeftVisual1,
    tab2: PressureLeftVisual2,
    tab3: PressureLeftVisual3,
  };
  const rightVisuals = {
    tab1: PressureRightVisual1,
    tab2: PressureRightVisual2,
    tab3: PressureRightVisual3,
  };

  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");
  const LeftVisual = leftVisuals[activeTab];
  const RightVisual = rightVisuals[activeTab];
  const current = content.modules[activeTab as keyof typeof content.modules];
  const business = semanticVisual.businessVoice;

  return (
    <section
      id="architecture-pressure"
      className={cn(theme.spacing.sectionXComfort, "scroll-mt-20 py-8")}
    >
      <div className={cn("mx-auto", theme.spacing.container)}>
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.sectionTitle}
          label={content.label}
          narrativeRole="section"
        />

        <div className="mt-3 flex justify-start">
          <SegmentedTabs
            tabs={content.tabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as "tab1" | "tab2" | "tab3")}
            sticky={true}
          />
        </div>

        <div
          className={cn(
            "overflow-hidden border",
            "mt-4",
            theme.radius.shell,
            theme.colors.borderPrimary,
            theme.colors.surfacePrimary,
            theme.shadows.shell,
          )}
        >
          {/* business case */}

          <div
            className={cn(
              "border-b px-7 py-4",
              theme.colors.borderMuted,
              theme.colors.surfaceMuted,
            )}
          >
            <div className={cn(theme.spacing.eyebrowBottom, business.moduleLabel)}>
              {content.label}
            </div>

            <blockquote
              className={cn(
                business.editorialQuote.zone,
                business.editorialQuote.composition,
              )}
            >
              <span className={business.editorialQuote.mark} aria-hidden>
                &ldquo;
              </span>
              <span className={business.editorialQuote.body}>
                {current.bizCase}
              </span>
            </blockquote>
          </div>

          {/* split */}

          <div className="grid items-stretch lg:grid-cols-2">
            {/* left */}
            <PressureLeftCard
              label={current.leftCard.label}
              description={current.leftCard.pressure}
              visual={<LeftVisual content={current.leftCard} />}
            />

            {/* right */}
            <PressureRightCard
              sectionLabel={current.rightCard.label}
              layerTitle={current.rightCard.layerTitle}
              layerSubtitle={current.rightCard.layerSubtitle}
              architectureShiftTitle={current.rightCard.architectureShiftTitle}
              architectureShiftMsg={current.rightCard.architectureShiftMsg}
              visual={<RightVisual />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

```

## ArchitectureLayers.tsx

Path: `src/app/architecture/_sections/ArchitectureLayers.tsx`

```tsx
"use client";

import React, { useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import SectionHeader from "@/components/SectionHeader";
import SegmentedTabs from "@/components/SegmentedTabs";
import { semanticVisual } from "@/design-system/semanticVisual";
import {
  architectureLayersContent,
  type LayerSemanticFlow,
  type RuntimeHighlightMapping,
  type RuntimeLayerContent,
  type RuntimeLayerId,
  type StabilitySystemContent,
} from "@/content/architecture/architectureLayers";

/** Local scene choreography — ArchitectureLayers only */
const layersScene = {
  choreography: "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
  mapMinHeight: "min-h-[520px]",
  spineConnector: "flex items-center justify-center py-2",
  boundaryRail: "relative h-3/4 w-px bg-gradient-to-b from-white/10 via-white/20 to-transparent",
  /** Capability bullet — active node uses existing glow token */
  bulletActive:
    "h-1.5 w-1.5 shrink-0 scale-125 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]",
  bulletNeutral: "h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500",
  bulletInactive: "h-1 w-1 shrink-0 rounded-full bg-slate-600",
  semanticStrip: "mt-3 border-t border-white/10 pt-3",
} as const;

const semanticStripColumns = ["input", "process", "output"] as const;

type SemanticStripColumn = (typeof semanticStripColumns)[number];

function LayerSemanticStrip({
  labels,
  flow,
  theme,
}: {
  labels: Record<SemanticStripColumn, string>;
  flow: LayerSemanticFlow;
  theme: ReturnType<typeof useTheme>["theme"];
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-0",
        layersScene.semanticStrip,
        layersScene.choreography,
      )}
    >
      {semanticStripColumns.map((column, columnIndex) => (
        <div
          key={column}
          className={cn(
            "min-w-0 px-2 first:pl-0 last:pr-0",
            columnIndex > 0 && "border-l border-white/10",
          )}
        >
          <div
            className={cn(
              theme.typography.monoLabel,
              "text-[9px] text-slate-500",
            )}
          >
            {labels[column]}
          </div>
          <ul className="mt-1.5 space-y-1">
            {flow[column].map((item) => (
              <li
                key={item}
                className="font-mono text-[10px] leading-snug text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

type ViewMode = "layer" | "full";

export default function ArchitectureLayers() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = architectureLayersContent[locale];

  const [viewMode, setViewMode] = useState<ViewMode>("layer");
  const [activeLayerId, setActiveLayerId] = useState<RuntimeLayerId | null>(null);

  const isFullView = viewMode === "full";
  const activeHighlights: RuntimeHighlightMapping | null = activeLayerId
    ? content.highlightsMap[activeLayerId]
    : null;
  const highlightedItems = activeHighlights?.highlightedItems ?? null;

  const runtimeLabel = semanticVisual.runtimeVoice;

  const handleLayerView = () => {
    setViewMode("layer");
    setActiveLayerId(null);
  };

  const handleFullView = () => {
    setViewMode("full");
  };

  const handleLayerClick = (layerId: RuntimeLayerId) => {
    if (viewMode === "layer") {
      setViewMode("full");
      setActiveLayerId(layerId);
      return;
    }
    setActiveLayerId((current) => (current === layerId ? null : layerId));
  };

  return (
    <section
      className={cn(
        "relative w-full",
        theme.colors.surfaceDark,
        theme.colors.textOnDark,
        theme.spacing.sectionXComfort,
        theme.spacing.sectionY,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
        aria-hidden
      />

      <div className={cn("relative mx-auto", theme.spacing.container)}>
        <div
          className={cn(
            "mb-12 flex flex-col justify-between gap-8 border-b pb-8 lg:flex-row lg:items-end",
            theme.colors.borderOnDark,
          )}
        >
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.sectionTitle}
            subtitle={content.subtitle}
            dark
            narrativeRole="runtime"
          />

          <div className="flex shrink-0 items-center self-start lg:self-auto">
            <SegmentedTabs
              variant="runtime"
              tabs={[
                { id: "layer", label: content.viewModes.core },
                { id: "full", label: content.viewModes.expanded },
              ]}
              activeTab={viewMode}
              onChange={(id) =>
                id === "layer" ? handleLayerView() : handleFullView()
              }
              sticky={true}
            />
          </div>
        </div>

        <div
          className={cn(
            "relative gap-12 overflow-hidden",
            layersScene.mapMinHeight,
            layersScene.choreography,
            isFullView
              ? "grid grid-cols-1 items-start lg:grid-cols-12"
              : "flex w-full justify-center items-center",
          )}
        >
          <div
            className={cn(
              "relative z-10 flex flex-col",
              layersScene.choreography,
              isFullView
                ? "lg:col-span-5"
                : "mx-auto w-full max-w-[33.333rem]",
            )}
          >
            <div
              className={cn(
                "mb-4 flex items-center",
                runtimeLabel.moduleLabel,
                !isFullView && "justify-center",
              )}
            >
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {content.spineLabel}
            </div>

            {content.coreLayers.map((layer: RuntimeLayerContent, index) => {
              const isActive = activeLayerId === layer.id;
              const showResponsibility = !isFullView || !isActive;
              const showSemanticStrip = isFullView && isActive;

              return (
                <React.Fragment key={layer.id}>
                  <button
                    type="button"
                    onClick={() => handleLayerClick(layer.id)}
                    className={cn(
                      "group relative isolate w-full cursor-pointer border p-5 text-left",
                      layersScene.choreography,
                      theme.radius.cardSm,
                      isActive
                        ? cn(
                            "border-indigo-500/50",
                            theme.colors.surfaceDarkPanel,
                            theme.shadows.glowAccent,
                          )
                        : cn(
                            theme.colors.borderOnDark,
                            theme.colors.surfaceDarkElevated,
                            "hover:border-white/20 hover:bg-white/[0.04]",
                          ),
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              theme.typography.monoLabel,
                              isActive
                                ? theme.colors.textAccentSoft
                                : "text-slate-500",
                            )}
                          >
                            0{index + 1}
                          </span>
                          <h3
                            className={cn(
                              theme.typography.cardTitle,
                              "tracking-[-0.03em]",
                              layersScene.choreography,
                              !isFullView || isActive
                                ? theme.colors.textOnDark
                                : cn(
                                    "text-slate-200",
                                    "group-hover:text-white",
                                  ),
                            )}
                          >
                            {layer.title}
                          </h3>
                        </div>
                        {showResponsibility && (
                          <p
                            className={cn(
                              "mt-2 line-clamp-2 text-xs leading-relaxed",
                              layersScene.choreography,
                              theme.colors.textOnDarkMuted,
                            )}
                          >
                            {layer.responsibility}
                          </p>
                        )}
                      </div>
                      <div
                        className={cn(
                          "mt-1 shrink-0",
                          isFullView && layersScene.choreography,
                          isFullView
                            ? isActive
                              ? cn(
                                  "rotate-90",
                                  theme.colors.textAccentSoft,
                                )
                              : "text-slate-500 group-hover:text-slate-300"
                            : "text-slate-500",
                        )}
                        aria-hidden
                      >
                        <ChevronIcon className="h-5 w-5" />
                      </div>
                    </div>

                    <div
                      className={cn(
                        "absolute top-1/4 bottom-1/4 left-0 w-[2px] rounded-r",
                        layersScene.choreography,
                        isActive
                          ? "scale-100 bg-indigo-500"
                          : "scale-0 bg-transparent",
                      )}
                    />

                    <div
                      className={cn(
                        "grid overflow-hidden",
                        layersScene.choreography,
                        showSemanticStrip
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0">
                        <LayerSemanticStrip
                          labels={content.semanticStrip}
                          flow={layer.semanticFlow}
                          theme={theme}
                        />
                      </div>
                    </div>
                  </button>

                  {index < content.coreLayers.length - 1 && (
                    <div className={layersScene.spineConnector} aria-hidden>
                      <div className="min-h-4 w-px self-stretch bg-white/10" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div
            className={cn(
              "hidden h-full min-h-[380px] items-center justify-center lg:col-span-1",
              layersScene.choreography,
              isFullView ? "lg:flex" : "hidden",
            )}
          >
            <div className={layersScene.boundaryRail} aria-hidden />
          </div>

          <div
            className={cn(
              "relative space-y-4",
              layersScene.choreography,
              isFullView
                ? "lg:col-span-6 translate-x-0 opacity-100 block"
                : "hidden pointer-events-none h-0 overflow-hidden p-0 opacity-0 translate-x-16",
            )}
          >
            <div
              className={cn(
                "mb-4 flex items-center",
                runtimeLabel.moduleLabel,
              )}
            >
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {content.systemsLabel}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.stabilitySystems.map((system: StabilitySystemContent) => (
                  <div
                    key={system.id}
                    className={cn(
                      "relative border p-5",
                      layersScene.choreography,
                      theme.radius.cardSm,
                      theme.colors.borderOnDark,
                      theme.colors.surfaceDarkElevated,
                    )}
                  >
                    <div className="mb-3 flex flex-col">
                      <h4
                        className={cn(
                          theme.typography.cardTitle,
                          "text-[18px] tracking-[-0.03em]",
                          theme.colors.textOnDark,
                        )}
                      >
                        {system.title}
                      </h4>
                      <p
                        className={cn(
                          "mt-1.5 line-clamp-2 text-[10px] leading-relaxed",
                          theme.colors.textOnDarkMuted,
                        )}
                      >
                        {system.narrative}
                      </p>
                    </div>

                    <ul
                      className={cn(
                        "mt-3 space-y-2.5 border-t pt-3",
                        theme.colors.borderOnDark,
                      )}
                    >
                      {system.items.map((item) => {
                        const isBulletHighlighted =
                          activeLayerId !== null &&
                          highlightedItems?.includes(item);
                        const isBulletDimmed =
                          activeLayerId !== null && !isBulletHighlighted;
                        const isNeutralBullets =
                          isFullView && activeLayerId === null;

                        return (
                          <li
                            key={item}
                            className="flex items-center gap-2.5"
                          >
                            <span
                              className={cn(
                                layersScene.choreography,
                                isBulletHighlighted && layersScene.bulletActive,
                                isBulletDimmed && layersScene.bulletInactive,
                                isNeutralBullets && layersScene.bulletNeutral,
                                !isBulletHighlighted &&
                                  !isBulletDimmed &&
                                  !isNeutralBullets &&
                                  layersScene.bulletNeutral,
                              )}
                            />
                            <span
                              className={cn(
                                "font-mono text-[11px] leading-snug",
                                layersScene.choreography,
                                isBulletHighlighted &&
                                  cn(
                                    "font-semibold",
                                    theme.colors.textOnDark,
                                  ),
                                isBulletDimmed && "text-slate-500",
                                isNeutralBullets && "text-slate-300",
                                !isBulletHighlighted &&
                                  !isBulletDimmed &&
                                  !isNeutralBullets &&
                                  "text-slate-300",
                              )}
                            >
                              {item}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

