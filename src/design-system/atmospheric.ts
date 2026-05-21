/**
 * Local atmospheric composition — radial haze, edge fades, ambient glow.
 * Never full-section tint fills; pair with neutral page surfaces.
 */
export const atmospheric = {
  /** Soft top radial on light sections — low opacity, short reach */
  sectionTopHaze:
    "pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(226,232,240,0.14),transparent)]",

  /** Corner accent bloom — use sparingly, one per section max */
  sectionCornerBloom:
    "pointer-events-none absolute -right-12 top-20 h-40 w-40 rounded-full bg-slate-300/10 blur-[80px]",

  /** Transition bridge — tight local mist behind chip only */
  bridgeClusterMist:
    "pointer-events-none absolute top-[58%] left-1/2 h-11 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300/20 blur-xl",

  /** Dark-section bridge mist */
  bridgeClusterMistDark:
    "pointer-events-none absolute top-[58%] left-1/2 h-11 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/14 blur-xl",
} as const;
