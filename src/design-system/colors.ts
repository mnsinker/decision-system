/**
 * Semantic color roles — no raw palette naming (rose, emerald, indigo).
 * Values preserve the current restrained slate / indigo / emerald / rose feel exactly.
 */
export const colors = {
  // ── Surfaces ──────────────────────────────────────────────────────────────

  /** Default page canvas */
  surfacePage: "bg-[#F6F7FA]",

  /** Cool-tinted page canvas (architecture hero) */
  surfacePageCool: "bg-[#FBFDFF]",

  /** Primary elevated surface (cards, panels) */
  surfacePrimary: "bg-white",

  /** Secondary surface layer */
  surfaceSecondary: "bg-[#FCFCFD]",

  /** Muted surface (panel headers, soft backgrounds) */
  surfaceMuted: "bg-[#FAFBFD]",

  /** Inset / nested surface (code blocks, footnotes) */
  surfaceInset: "bg-[#FAFBFC]",

  /** Critical / pressure-state surface tint */
  surfaceCritical: "bg-rose-50/40",

  /** Critical surface — solid variant */
  surfaceCriticalSolid: "bg-rose-50",

  /** Accent surface tint */
  surfaceAccent: "bg-indigo-50/50",

  /** Accent surface — solid variant */
  surfaceAccentSolid: "bg-indigo-50",

  /** Success / resolved-state surface tint */
  surfaceSuccess: "bg-emerald-500/[0.05]",

  /** Cinematic dark section */
  surfaceDark: "bg-[#071133]",

  /** Dark nested panel */
  surfaceDarkPanel: "bg-[#0F172A]",

  /** Dark elevated node / card */
  surfaceDarkElevated: "bg-[#0B183D]",

  /** Cinematic dark gradient panel */
  surfaceDarkGradient:
    "bg-gradient-to-br from-[#071011] via-[#04100E] to-[#020807]",

  /** Navbar frosted surface */
  surfaceNav: "border-b border-slate-200/60 bg-white/70 backdrop-blur-xl",

  /** Navbar logo mark */
  surfaceLogo:
    "bg-gradient-to-br from-indigo-600 to-violet-600 text-white",

  /** Segmented control track */
  surfaceTabTrack: "bg-slate-100",

  /** Segmented control active pill */
  surfaceTabActive: "bg-slate-900 text-white",

  // ── Text ──────────────────────────────────────────────────────────────────

  /** Primary body / headline ink */
  textPrimary: "text-[#0B1020]",

  /** Secondary emphasis text */
  textSecondary: "text-slate-900",

  /** Strong emphasis text */
  textStrong: "text-slate-950",

  /** Muted supporting copy */
  textMuted: "text-slate-500",

  /** Subtle / de-emphasized copy */
  textSubtle: "text-slate-400",

  /** Text on dark surfaces */
  textOnDark: "text-white",

  /** Muted text on dark surfaces */
  textOnDarkMuted: "text-slate-400",

  /** Accent label / eyebrow text */
  textAccent: "text-indigo-500",

  /** Accent text on dark surfaces */
  textAccentSoft: "text-indigo-300",

  /** Section title highlight gradient */
  textHighlightGradient:
    "bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent",

  /** Accent text — stronger variant */
  textAccentStrong: "text-indigo-600",

  /** Critical / pressure-state text */
  textCritical: "text-rose-500",

  /** Critical text — stronger variant */
  textCriticalStrong: "text-rose-700",

  /** Success / resolved-state text */
  textSuccess: "text-emerald-500",

  /** Success text — brighter on dark panels */
  textSuccessBright: "text-emerald-400",

  /** Gradient accent text (headline highlights) */
  textAccentGradient:
    "bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent",

  // ── Borders ───────────────────────────────────────────────────────────────

  /** Default structural border */
  borderPrimary: "border-slate-200",

  /** Subtle interior divider */
  borderMuted: "border-slate-100",

  /** Border on dark surfaces */
  borderOnDark: "border-white/10",

  /** Accent-tinted border */
  borderAccent: "border-indigo-100",

  /** Success-state border */
  borderSuccess: "border-emerald-500/20",

  /** Critical-state border */
  borderCritical: "border-rose-100",

  // ── Interactive ───────────────────────────────────────────────────────────

  /** Primary action (filled button) */
  interactivePrimary: "bg-slate-900 text-white hover:bg-slate-800",

  /** Secondary action (outline button) */
  interactiveSecondary:
    "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",

  /** Active tab / toggle state */
  interactiveActive: "bg-slate-900 text-white",

  /** Inactive tab label */
  textTabInactive: "text-slate-600",

  /** Inactive tab hover */
  textTabInactiveHover: "hover:text-slate-900",

  /** Nav link hover */
  textNavLinkHover: "hover:text-indigo-600",

  /** Footer link hover */
  textFooterLinkHover: "hover:text-slate-900",
} as const;
