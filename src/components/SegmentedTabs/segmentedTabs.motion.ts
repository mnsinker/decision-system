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
