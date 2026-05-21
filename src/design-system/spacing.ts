/**
 * Semantic spacing tokens for premium-dense enterprise layouts.
 * Values reflect the current architecture site density — breathable, not airy.
 */
export const spacing = {
  /** Horizontal section inset (dense enterprise rail) */
  sectionX: "px-10",
  /** Standard section inset used on overview pages */
  sectionXComfort: "px-6",

  /** Large section vertical rhythm */
  sectionY: "py-24",
  /** Mid-weight section padding */
  sectionYMid: "py-14",
  /** Cinematic dark section padding */
  sectionYDark: "py-32",

  /** Max-width content rail */
  container: "max-w-7xl",
  containerCenter: "mx-auto max-w-7xl",

  /** Grid and flex gaps between major blocks */
  containerGap: "gap-6",
  containerGapWide: "gap-8",
  gridSplit: "gap-14",

  /** Card and panel interior padding */
  cardPadding: "p-6",
  cardPaddingDense: "p-5",
  cardPaddingComfort: "p-7",
  cardPaddingSpacious: "p-8",

  /** Vertical rhythm inside content blocks */
  blockGap: "space-y-6",
  blockGapDense: "space-y-4",
  blockGapWide: "space-y-8",

  /** Horizontal gaps in toolbars, split headers, inline groups */
  panelGap: "gap-5",
  inlineGap: "gap-3",
  inlineGapWide: "gap-4",

  /** Space below section headers and eyebrow blocks */
  headerBottom: "mb-6",
  headerBottomWide: "mb-8",
  eyebrowBottom: "mb-2.5",

  /** Visual / diagram container padding */
  visualPadding: "p-6",
  visualPaddingDense: "p-5",

  /** Tab and control bar spacing */
  tabsTop: "mt-6",
  panelTop: "mt-6",
  sectionHeaderTop: "mt-12",

  /** Navbar height rhythm */
  navHeight: "h-16",
  navHeightDense: "h-[64px]",

  /** Primary / secondary button padding */
  buttonPadding: "px-8 py-4",
  buttonPaddingCompact: "px-5 py-2",
  buttonPaddingLocale: "px-4 py-2",

  /** Segmented tab item padding */
  tabItemPadding: "px-5 py-2.5",
  tabShellPadding: "p-[5px]",

  /** Footer vertical padding */
  footerPaddingY: "py-12",

  /** Section header rhythm */
  eyebrowMargin: "mb-3",
  subtitleMargin: "mt-4",

  /** Tight inline gap (icon + label) */
  inlineGapTight: "gap-2",

  /** Nav link row gap */
  navLinkGap: "gap-8",

  /** Narrative rhythm — intentional vertical flow between regions */
  narrativeBridgeBlock: "flex flex-col items-center py-5",
  narrativeBridgeMargin: "mb-6",
  narrativeBridgeLine: "h-9 w-px",
  narrativeBridgeAxis: "h-px w-10",
  narrativeBridgeInset: "gap-3",
  narrativeAfterBridge: "mt-8",
  narrativeSectionContent: "mt-12",
  narrativeExplainerTop: "mt-5",
} as const;
