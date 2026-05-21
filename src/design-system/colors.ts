/**
 * Semantic color roles — no raw palette naming (rose, emerald, indigo).
 * Values preserve the current restrained slate / indigo / emerald / rose feel exactly.
 *
 * Surface hierarchy (see DESIGN_SYSTEM.md):
 *   Tier 0 — page canvas
 *   Tier 1 — structural elevation (primary → inset)
 *   Tier 2 — semantic state (accent, critical, success)
 *   Tier 3 — cinematic dark stack
 *   Chrome — nav, tabs, brand mark (specialized; not page hierarchy)
 */
export const colors = {
  // ── Surfaces · Tier 0 — Page canvas ───────────────────────────────────────

  /** Default application page background */
  surfacePage: "bg-[#F6F7FA]",

  /** Neutral subtle page canvas (e.g. slate-50 wash) */
  surfacePageSubtle: "bg-[#F8FAFC]",

  /** Cool-tinted page or hero-section canvas */
  surfacePageTinted: "bg-[#FBFDFF]",

  /**
   * @deprecated Use `surfacePageTinted`. Alias retained for unmigrated consumers.
   */
  surfacePageCool: "bg-[#FBFDFF]",

  // ── Surfaces · Tier 1 — Structural elevation ──────────────────────────────

  /** Top-level elevated surface — cards, panels, shells */
  surfacePrimary: "bg-white",

  /** Secondary structural layer — split columns, side bands */
  surfaceSecondary: "bg-[#FCFCFD]",

  /** Muted band — panel headers, soft horizontal strips */
  surfaceMuted: "bg-[#FAFBFD]",

  /** Inset well — nested blocks, code panels, footnotes */
  surfaceInset: "bg-[#FAFBFC]",

  // ── Surfaces · Tier 2 — Semantic state ────────────────────────────────────

  /** Accent-state surface tint */
  surfaceAccent: "bg-indigo-50/50",

  /** Accent-state surface — opaque */
  surfaceAccentSolid: "bg-indigo-50",

  /** Critical / pressure-state surface tint */
  surfaceCritical: "bg-rose-50/40",

  /** Critical-state surface — opaque */
  surfaceCriticalSolid: "bg-rose-50",

  /** Success / resolved-state surface tint */
  surfaceSuccess: "bg-emerald-500/[0.05]",

  // ── Surfaces · Tier 3 — Cinematic dark ────────────────────────────────────

  /** Full-bleed dark section */
  surfaceDark: "bg-[#071133]",

  /** Dark nested panel */
  surfaceDarkPanel: "bg-[#0F172A]",

  /** Dark elevated node */
  surfaceDarkElevated: "bg-[#0B183D]",

  /**
   * Dark gradient panel — intentional exception; not a flat surface role.
   * Use only for cinematic right-rail / pressure visuals.
   */
  surfaceDarkGradient:
    "bg-gradient-to-br from-[#071011] via-[#04100E] to-[#020807]",

  // ── Surfaces · Chrome (specialized) ───────────────────────────────────────

  /** Sticky navigation bar — includes border + frosted fill */
  surfaceNav: "border-b border-slate-200/60 bg-white/70 backdrop-blur-xl",

  /**
   * Brand logo mark — intentional gradient exception; not a layout surface.
   */
  surfaceLogo:
    "bg-gradient-to-br from-indigo-600 to-violet-600 text-white",

  /** Segmented control track */
  surfaceTabTrack: "bg-slate-100",

  /** Segmented control active pill fill */
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
    "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-white hover:text-slate-900 hover:shadow-md",

  /**
   * Active toggle / tab selection fill.
   * Shares fill with `interactivePrimary` but names selection chrome, not CTA buttons.
   */
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
