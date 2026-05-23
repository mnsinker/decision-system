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
  stickyRail: "bg-white/18 backdrop-blur-md supports-[backdrop-filter]:bg-white/12",
  stickyGradient: "bg-gradient-to-b from-white/10 to-transparent",
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
  stickyRail: "bg-[#030712]/18 backdrop-blur-md supports-[backdrop-filter]:bg-[#030712]/12",
  stickyGradient: "bg-gradient-to-b from-[#030712]/10 to-transparent",
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
