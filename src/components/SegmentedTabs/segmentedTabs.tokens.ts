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
