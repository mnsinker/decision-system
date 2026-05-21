/**
 * Semantic visual roles — shared chroma + editorial grammar.
 * Pair with theme.typography for type scale; do not invent one-off panel colors.
 */

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

export const semanticVisual = {
  /** Business request, quotes, operational perspective (light surfaces) */
  businessVoice: {
    zone: "relative flex flex-col justify-center border-r border-slate-200/80 bg-white",
    cornerBloom:
      "pointer-events-none absolute top-0 left-0 h-20 w-20 rounded-full bg-indigo-200/[0.06] blur-2xl",
    moduleLabel: `${L.row} ${L.base} ${L.chroma.indigo}`,
    moduleIcon: L.icon.indigo,
    editorialQuote: {
      zone: "relative mt-1 border-l-2 border-indigo-200/60 bg-indigo-50/25 py-3.5 pl-6 pr-1",
      mark: "pointer-events-none absolute top-1 left-1.5 font-serif text-[3rem] leading-none text-indigo-300/50 select-none",
      body: "relative z-10 text-[16px] font-medium italic leading-[1.55] tracking-[-0.01em] text-slate-700/90",
    },
    scanLabel: `${L.base} text-indigo-400`,
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
      "rounded-full bg-rose-950 p-2.5 text-white shadow-[0_8px_22px_-6px_rgba(190,18,60,0.32)] ring-4 ring-rose-50",
    outcomeHighlight: "relative z-10 text-rose-700",
    outcomeHighlightRule: "absolute bottom-1 left-0 h-2 w-full bg-rose-100 -z-0",
  },

  /** Architecture pressure left-rail zone labels */
  pressureVoice: {
    rose: `${L.row} ${L.base} ${L.chroma.roseMid}`,
    emerald: `${L.row} ${L.base} ${L.chroma.emerald}`,
    emeraldInset: `${L.base} ${L.chroma.emerald}`,
  },
} as const;

export type SemanticVisualRole = keyof typeof semanticVisual;
