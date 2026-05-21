/**
 * Narrative typography roles — premiumDense semantic hierarchy.
 *
 * pageHero > runtimeNarrative ≈ narrativeHero > sectionHero > quote > cardTitle
 * transitionBridge · explainer · moduleLabel support rhythm, not dominance.
 */

const pageHero =
  "text-[42px] md:text-[46px] leading-[0.94] tracking-[-0.065em] font-[620] text-[#0B1020]";

const sectionHero =
  "text-[25px] md:text-[27px] leading-[1.04] tracking-[-0.045em] font-[620] text-[#0B1020]";

const narrativeHero =
  "text-[30px] md:text-[32px] leading-[1.02] tracking-[-0.05em] font-[620] text-[#0B1020]";

const runtimeNarrative =
  "text-[30px] md:text-[32px] leading-[1.03] tracking-[-0.048em] font-[620]";

export const typography = {
  /** 1 — Page entry statement (Overview + Architecture heroes only) */
  pageHero,

  /** 2 — Structural section title; analytical, never emotional */
  sectionHero,

  /** 3 — In-section emotional / runtime emphasis (light surfaces) */
  narrativeHero,

  /** 4 — Inter-section bridge label */
  transitionBridge:
    "font-mono text-[11px] font-semibold tracking-[0.2em] uppercase",

  /** 5 — Supporting explanatory copy under heroes / headers */
  explainer: "text-[15px] leading-[1.65] text-slate-500",

  /** 6 — Dark-section orchestration headline */
  runtimeNarrative,

  /** 7 — Eyebrow, runtime, and module chrome labels */
  moduleLabel:
    "font-mono text-[10px] uppercase tracking-[0.18em] font-bold text-indigo-500",

  /** Business-case pull quote */
  quote:
    "text-[23px] leading-[1.08] font-[620] tracking-[-0.04em] italic text-[#0B1020]",

  /** Card / module structured title */
  cardTitle:
    "text-[20px] leading-tight tracking-[-0.03em] font-[620] text-slate-900",

  /** Primary body copy */
  body: "text-[14px] leading-6 text-slate-500",

  /** Secondary / supporting body copy */
  bodySmall: "text-[13px] leading-6 text-slate-500",

  /** Section subtitle under headers */
  sectionSubtitle: "text-base leading-7 text-slate-500",

  /** Mono eyebrow / section label */
  monoLabel:
    "font-mono text-[10px] uppercase tracking-[0.18em] font-bold",

  /** @deprecated Use moduleLabel */
  monoLabelAccent:
    "font-mono text-[10px] uppercase tracking-[0.18em] font-bold text-indigo-500",

  /** Mono label — muted */
  monoLabelMuted:
    "font-mono text-[10px] uppercase tracking-[0.18em] font-bold text-slate-400",

  /** Nav and UI chrome */
  navBrand: "text-sm font-bold tracking-tight text-slate-900",
  navLink: "text-sm font-medium text-slate-600",
  navMeta: "text-[10px] font-medium tracking-widest text-slate-500 uppercase",

  /** Button label */
  button: "text-base font-bold",
  buttonCompact: "text-[13px] font-semibold",

  /** Dark section body */
  bodyDark: "leading-relaxed text-slate-400",
  sectionTitleDark: "font-bold tracking-tight text-white",

  /** Section header eyebrow */
  sectionEyebrow:
    "font-mono text-[11px] font-bold tracking-[0.3em] uppercase",

  /** Standalone section label */
  sectionLabel:
    "font-mono text-[10px] font-bold tracking-[0.3em] uppercase",

  /** Segmented tab label */
  tabLabel: "text-[13px] font-semibold",

  /** Footer copy */
  footerText: "text-sm text-slate-500",

  // —— Legacy aliases (do not use in new code) ——

  /** @deprecated Use pageHero */
  hero: pageHero,

  /** @deprecated Use pageHero */
  heroDisplay: pageHero,

  /** @deprecated Use sectionHero */
  sectionTitle: sectionHero,

  /** @deprecated Use sectionHero */
  sectionTitleMd: sectionHero,

  /** @deprecated Use sectionHero */
  sectionTitleResponsive: sectionHero,

  /** @deprecated Use narrativeHero */
  sectionTitleXl: narrativeHero,

  /** @deprecated Tokens carry weight; avoid stacking bold */
  titleWeight: "tracking-tight",

  /** @deprecated Use sectionSubtitle */
  subtitle: "text-base leading-7 text-slate-500",
} as const;
