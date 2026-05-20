/**
 * Semantic radius tokens — soft premium rounded surfaces.
 * Avoids sharp newspaper corners and angular enterprise dashboards.
 */
export const radius = {
  /** Outer shell containers (main panels, page modules) */
  shell: "rounded-[30px]",

  /** Large feature panels and split containers */
  panel: "rounded-[26px]",
  panelLg: "rounded-[2.5rem]",

  /** Inner cards, code blocks, nested surfaces */
  card: "rounded-[22px]",
  cardMd: "rounded-[20px]",
  cardSm: "rounded-[18px]",

  /** Standard component rounding (buttons, nodes, nav items) */
  button: "rounded-[16px]",
  buttonLg: "rounded-2xl",

  /** Small chips, badges, inline controls */
  chip: "rounded-xl",
  chipSm: "rounded-lg",

  /** Pills, tabs, segmented controls */
  pill: "rounded-full",

  /** Logo mark, icon containers */
  icon: "rounded-xl",
} as const;
