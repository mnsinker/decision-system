import { spacing } from "./spacing";
import { radius } from "./radius";
import { colors } from "./colors";
import { shadows } from "./shadows";
import { typography } from "./typography";

/**
 * System control chrome.
 * - `track` + `item*` — SegmentedTabs selection (quiet, in-track)
 * - `nav*` — editorial navigation CTA (standalone; not tab geometry)
 */
export const systemControlChrome = {
  track: [
    "inline-flex flex-wrap items-center gap-0.5 border bg-white",
    radius.pill,
    colors.borderPrimary,
    spacing.tabShellPadding,
    shadows.control,
  ].join(" "),

  /** Tab selection — no navigation motion */
  itemActive: [
    radius.pill,
    spacing.tabItemPadding,
    typography.tabLabel,
    colors.surfaceTabActive,
    shadows.controlActive,
    "transition-[color,box-shadow] duration-200",
  ].join(" "),

  itemInactive: [
    radius.pill,
    spacing.tabItemPadding,
    typography.tabLabel,
    colors.textTabInactive,
    colors.textTabInactiveHover,
    "transition-[color,box-shadow] duration-200",
  ].join(" "),

  /** Editorial navigation CTA — directional; cousin to tabs, not a tab item */
  navPrimary: [
    "inline-flex items-center gap-2.5",
    "h-[54px] px-7",
    radius.button,
    "text-[15px] font-semibold text-white",
    colors.surfaceTabActive,
    shadows.controlActive,
    "shadow-[0_4px_14px_-2px_rgba(15,23,42,0.2)]",
    "transition-[box-shadow] duration-200",
    "hover:shadow-[0_8px_22px_-4px_rgba(15,23,42,0.28)]",
  ].join(" "),

  /** Quiet outlined navigation CTA — sibling to navPrimary, not text/link/tab */
  navSecondary: [
    "inline-flex items-center",
    "h-[54px] px-7",
    radius.button,
    "text-[15px] font-semibold text-slate-700",
    "border bg-white",
    colors.borderPrimary,
    shadows.sm,
    "transition-[color,background-color] duration-200",
    "hover:bg-slate-50 hover:text-slate-900",
  ].join(" "),
} as const;
