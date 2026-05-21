/**
 * Semantic visual roles — shared chroma + editorial grammar.
 * Pair with theme.typography for type scale; do not invent one-off panel colors.
 */
export const semanticVisual = {
  /** Business Request, business quotes, analytical interpretation (light surfaces) */
  businessVoice: {
    zone: "flex flex-col justify-center border-r border-indigo-100/60 bg-gradient-to-b from-indigo-50/35 via-white to-white",
    moduleLabel:
      "flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-indigo-500",
    moduleIcon: "text-indigo-400",
    quote:
      "border-l-2 border-indigo-300/70 py-0.5 pl-4 text-[18px] font-medium italic leading-[1.5] tracking-[-0.01em] text-indigo-950/85",
    scanLabel:
      "font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-400",
    scanList: "space-y-1.5",
    scanLine: "flex gap-2 text-[13px] leading-snug text-slate-600",
    scanMarker: "mt-[5px] h-1 w-1 shrink-0 rounded-full bg-indigo-400/80",
  },

  /** System Reality headers and runtime chrome (dark surfaces) */
  runtimeVoice: {
    moduleLabel:
      "flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-indigo-400",
    moduleIcon: "text-indigo-400",
  },

  /** Consequence / business-case outcome band (light muted surfaces) */
  businessCase: {
    moduleLabel:
      "inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-600",
    moduleIcon: "text-indigo-500",
    scanList: "mt-3 space-y-1.5",
    scanLine: "flex gap-2 text-[13px] leading-snug text-slate-600",
    scanMarker: "mt-[5px] h-1 w-1 shrink-0 rounded-full bg-indigo-400/70",
    outcomeHighlight: "relative z-10 text-rose-700",
    outcomeHighlightRule: "absolute bottom-1 left-0 h-2 w-full bg-rose-100 -z-0",
  },
} as const;

export type SemanticVisualRole = keyof typeof semanticVisual;
