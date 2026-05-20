/**
 * Semantic shadow tokens — restrained, subtle premium depth.
 * Role-based naming; no raw palette references.
 */
export const shadows = {
  /** Primary outer shell elevation */
  shell: "shadow-[0_25px_70px_-40px_rgba(15,23,42,0.14)]",

  /** Large feature panel (architecture pressure modules) */
  panel: "shadow-[0_40px_100px_-30px_rgba(15,23,42,0.14)]",

  /** Standard card elevation */
  card: "shadow-[0_20px_40px_-35px_rgba(15,23,42,0.12)]",

  /** Soft challenge / overview container */
  container: "shadow-[0_32px_80px_-20px_rgba(15,23,42,0.08)]",

  /** Critical-state card elevation */
  cardCritical: "shadow-[0_20px_40px_-35px_rgba(244,63,94,0.18)]",

  /** Accent-state card elevation */
  cardAccent: "shadow-[0_30px_80px_-30px_rgba(99,102,241,0.18)]",

  /** Success-state glow accent */
  glow: "shadow-[0_0_40px_rgba(16,185,129,0.10)]",

  /** Accent-state glow */
  glowAccent: "shadow-[0_0_40px_rgba(99,102,241,0.12)]",

  /** Critical-state glow */
  glowCritical: "shadow-[0_0_20px_rgba(244,63,94,0.30)]",

  /** Inline controls and tabs */
  control: "shadow-[0_2px_8px_rgba(15,23,42,0.04)]",

  /** Active control elevation */
  controlActive: "shadow-[0_4px_12px_rgba(15,23,42,0.12)]",

  /** Utility shadows */
  sm: "shadow-sm",

  /** Nav logo mark */
  nav: "shadow-md shadow-indigo-200",

  /** Primary button hover elevation */
  buttonPrimaryHover: "hover:shadow-xl hover:shadow-slate-200",

  /** Compact button hover elevation */
  buttonCompactHover: "hover:shadow-lg",

  /** Segmented tab track inset */
  tabTrackInset: "shadow-inner",
} as const;
