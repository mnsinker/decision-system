/**
 * Semantic visual roles — shared chroma + editorial grammar.
 * Pair with theme.typography for type scale; do not invent one-off panel colors.
 */

import { typography } from "./typography";
import { spacing } from "./spacing";

/** Canonical zone-label geometry — chroma only may vary per voice */
export const semanticLabel = {
  base: "font-mono text-[10px] font-bold uppercase tracking-[0.18em]",
  row: "flex items-center gap-2",
  inline: "inline-flex items-center gap-2",
  chroma: {
    indigo: "text-indigo-500",
    indigoSoft: "text-indigo-400",
    rose: "text-rose-600",
    roseMid: "text-rose-500",
    emerald: "text-emerald-400",
    emeraldMid: "text-emerald-500",
  },
  icon: {
    indigo: "text-indigo-400",
    rose: "text-rose-500",
  },
} as const;

const L = semanticLabel;

/**
 * Canonical semantic hierarchy — typography + spacing SSOT.
 * Levels: pageHero (1) > sectionHero (2) > narrativeStatement | runtimeLabel (3) > editorialQuote (4) > systemAnnotation (5)
 */
export const semanticHierarchy = {
  /** Level 1 — sole page entry headline */
  pageHero: {
    typography: typography.pageHero,
    spacing: {
      eyebrow: spacing.eyebrowMargin,
      subtitle: spacing.subtitleMargin,
      explainerTop: spacing.narrativeExplainerTop,
    },
    usage: "Page entry statement. Overview + Architecture heroes only.",
  },

  /** Level 2 — structural section title; analytical, never emotional */
  sectionHero: {
    typography: typography.sectionHero,
    eyebrowTypography: typography.moduleLabel,
    localeTypography: {
      zh: "leading-[1.18] tracking-[-0.02em]",
    },
    spacing: {
      eyebrow: spacing.eyebrowMargin,
      subtitle: spacing.subtitleMargin,
      afterBridge: "mt-3",
      container: "max-w-3xl",
    },
    usage:
      "Standard section headers — e.g. Challenges, Use Cases, Architecture pressure.",
  },

  /** Level 3 — in-section emotional emphasis on light surfaces */
  narrativeStatement: {
    typography: typography.narrativeHero,
    eyebrowTypography: typography.moduleLabel,
    localeTypography: {
      zh: "leading-[1.18] tracking-[-0.02em]",
    },
    spacing: {
      eyebrow: spacing.eyebrowMargin,
      subtitle: spacing.subtitleMargin,
      container: "max-w-3xl",
    },
    usage: "In-section narrative emphasis below pageHero, above panel content.",
  },

  /** Level 4 — business pull quote; below sectionHero, not headline scale */
  editorialQuote: {
    typography: {
      mark: "pointer-events-none absolute left-1 top-1.5 z-0 font-serif text-[76px] font-light leading-none text-slate-300 opacity-[0.16] select-none",
      body: "relative z-10 min-w-0 font-serif text-[30px] font-medium italic leading-[1.22] tracking-[-0.03em] text-slate-700/90",
    },
    spacing: {
      zone: "relative mt-2 py-4 pr-2",
      composition: "relative",
    },
    usage: "Business Request / Business Case quote composition.",
  },

  /** Level 3 — dark-section orchestration headline */
  runtimeLabel: {
    typography: typography.runtimeNarrative,
    eyebrowTypography: typography.moduleLabel,
    localeTypography: {
      zh: "leading-[1.18] tracking-[-0.02em]",
    },
    spacing: {
      eyebrow: spacing.eyebrowMargin,
      subtitle: spacing.subtitleMargin,
      container: "max-w-3xl",
    },
    usage: "Runtime / lifecycle centerpiece headers on dark surfaces.",
  },

  /** Level 5 — supporting copy under heroes and headers */
  systemAnnotation: {
    typography: typography.explainer,
    spacing: {
      marginTop: spacing.subtitleMargin,
      maxWidth: "max-w-2xl",
    },
    usage: "Explainer subtitles and supporting analytical copy.",
  },
} as const;

export type SemanticHierarchyRole = keyof typeof semanticHierarchy;

const editorialQuote = semanticHierarchy.editorialQuote;

export const semanticVisual = {
  /** Business request, quotes, operational perspective (light surfaces) */
  businessVoice: {
    zone: "relative flex flex-col justify-center border-r border-slate-200/80 bg-white",
    cornerBloom:
      "pointer-events-none absolute top-0 left-0 h-20 w-20 rounded-full bg-indigo-200/[0.06] blur-2xl",
    moduleLabel: `${L.row} ${L.base} ${L.chroma.indigo}`,
    moduleIcon: L.icon.indigo,
    editorialQuote: {
      zone: editorialQuote.spacing.zone,
      composition: editorialQuote.spacing.composition,
      mark: editorialQuote.typography.mark,
      body: editorialQuote.typography.body,
    },
    scanLabel: `${L.base} ${L.chroma.indigo}`,
    scanList: "space-y-1.5",
    scanLine: "flex gap-2 text-[13px] leading-snug text-slate-600",
    scanMarker: "mt-[5px] h-1 w-1 shrink-0 rounded-full bg-slate-400/70",
  },

  /** System Reality headers and runtime chrome (dark surfaces) */
  runtimeVoice: {
    moduleLabel: `${L.row} ${L.base} ${L.chroma.indigoSoft}`,
    moduleIcon: L.icon.indigo,
  },

  /** Consequence, escalation, collision — local red zone (no indigo chrome) */
  outcomeVoice: {
    zone: "relative overflow-hidden border-t border-rose-200/70 bg-gradient-to-b from-rose-50/55 via-rose-50/20 to-[#FFFCFC]",
    atmosphere:
      "pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-rose-400/[0.14] blur-[100px]",
    atmosphereEdge:
      "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent",
    moduleLabel: `${L.inline} ${L.base} ${L.chroma.rose}`,
    moduleIcon: L.icon.rose,
    connectorLine: "h-6 w-px bg-gradient-to-b from-rose-200/90 to-transparent",
    connectorNode:
      "rounded-full bg-rose-950 p-2 text-white shadow-[0_8px_22px_-6px_rgba(190,18,60,0.32)] ring-[3px] ring-rose-50",
    outcomeHighlight: "relative z-10 text-rose-700",
    outcomeHighlightRule:
      "absolute bottom-1 left-0 h-2 w-full bg-rose-100 -z-0",
  },

  /** Architecture pressure left-rail zone labels */
  pressureVoice: {
    rose: `${L.row} ${L.base} ${L.chroma.roseMid}`,
    emerald: `${L.row} ${L.base} ${L.chroma.emerald}`,
    emeraldInset: `${L.base} ${L.chroma.emerald}`,
  },
} as const;

export type SemanticVisualRole = keyof typeof semanticVisual;

/** SectionHeader title role → canonical hierarchy role */
export const sectionHeaderHierarchy: Record<
  "section" | "narrative" | "runtime",
  keyof typeof semanticHierarchy
> = {
  section: "sectionHero",
  narrative: "narrativeStatement",
  runtime: "runtimeLabel",
};
