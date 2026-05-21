/**
 * Semantic typography tokens — compact, premium, restrained.
 * Sized for information-dense architecture content, not marketing hero scale.
 */
export const typography = {
  /** Page-level hero headline */
  hero: "text-[32px] leading-[0.95] tracking-[-0.06em] font-[620] text-[#0B1020]",

  /** Large marketing hero (overview pages) */
  heroDisplay: "text-5xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-7xl",

  /** Section headline */
  sectionTitle:
    "text-[25px] leading-[1.02] tracking-[-0.05em] font-[620] text-[#0B1020]",

  /** Section headline — responsive variant */
  sectionTitleResponsive: "text-3xl leading-[1.02] font-bold tracking-tight text-slate-900 md:text-5xl",

  /** Card / module headline */
  cardTitle:
    "text-[20px] leading-tight tracking-[-0.03em] font-[620] text-slate-900",

  /** Pull quote / business case emphasis */
  quote:
    "text-[25px] leading-[1.08] font-[620] tracking-[-0.04em] italic text-[#0B1020]",

  /** Primary body copy */
  body: "text-[14px] leading-6 text-slate-500",

  /** Secondary / supporting body copy */
  bodySmall: "text-[13px] leading-6 text-slate-500",

  /** Comfortable subtitle (overview hero) */
  subtitle: "text-lg leading-relaxed text-slate-600 md:text-xl",

  /** Section subtitle under headers */
  sectionSubtitle: "text-base leading-7 text-slate-500",

  /** Mono eyebrow / section label */
  monoLabel:
    "font-mono text-[10px] uppercase tracking-[0.18em] font-bold",

  /** Mono label — accent (indigo) */
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

  /** Section header — xl size */
  sectionTitleXl: "text-5xl md:text-7xl",

  /** Section header — md size */
  sectionTitleMd: "text-3xl md:text-4xl",

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

  /** Section title weight / tracking */
  titleWeight: "font-bold tracking-tight",
} as const;
