"use client";

import React from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import type { SectionNarrativeRole } from "@/design-system/narrative";
import {
  sectionHeaderHierarchy,
  semanticHierarchy,
} from "@/design-system/semanticVisual";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  label?: string;

  highlight?: string;
  highlightClassName?: string;

  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  /** Semantic narrativeRole — overrides legacy size when set */
  narrativeRole?: SectionNarrativeRole;
  /** @deprecated Prefer narrativeRole; xl→narrative/runtime, lg/md→section */
  size?: "md" | "lg" | "xl";
};

function resolveNarrativeRole(
  narrativeRole: SectionNarrativeRole | undefined,
  size: Props["size"],
  dark: boolean,
): SectionNarrativeRole {
  if (narrativeRole) return narrativeRole;
  if (size === "xl") return dark ? "runtime" : "narrative";
  return "section";
}

export default function SectionHeader({
  eyebrow,
  title,

  highlight,
  highlightClassName,

  subtitle,
  align = "left",
  dark = false,
  narrativeRole,
  size = "lg",
}: Props) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const resolvedNarrativeRole = resolveNarrativeRole(narrativeRole, size, dark);
  const hierarchyKey = sectionHeaderHierarchy[resolvedNarrativeRole];
  const hierarchy = semanticHierarchy[hierarchyKey] as
    | typeof semanticHierarchy.sectionHero
    | typeof semanticHierarchy.narrativeStatement
    | typeof semanticHierarchy.runtimeLabel;
  const annotation = semanticHierarchy.systemAnnotation;

  const localeTitleAdjust =
    locale === "zh" ? hierarchy.localeTypography.zh : undefined;

  const titleClass = cn(
    hierarchy.typography,
    localeTitleAdjust,
    resolvedNarrativeRole === "section" &&
      (dark ? theme.colors.textOnDark : theme.colors.textPrimary),
    resolvedNarrativeRole !== "section" &&
      (dark ? "text-white" : theme.colors.textPrimary),
    resolvedNarrativeRole === "runtime" && dark && "text-white",
  );

  const containerClass = cn(
    hierarchy.spacing.container,
    align === "center" && "mx-auto text-center",
  );

  return (
    <div className={containerClass}>
      {eyebrow && (
        <div
          className={cn(
            hierarchy.spacing.eyebrow,
            hierarchy.eyebrowTypography,
            dark ? theme.colors.textAccentSoft : undefined,
          )}
        >
          {eyebrow}
        </div>
      )}

      <h2 className={titleClass}>
        {title.split("\n").map((line, index) => {
          const isHighlight = highlight && line.includes(highlight);

          const renderedLine = isHighlight ? line.replace(highlight, "") : line;

          return (
            <React.Fragment key={line}>
              {index > 0 && <br />}

              {renderedLine}

              {isHighlight && (
                <span
                  className={
                    highlightClassName || theme.colors.textHighlightGradient
                  }
                >
                  {highlight}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </h2>

      {subtitle && (
        <p
          className={cn(
            annotation.spacing.marginTop,
            annotation.spacing.maxWidth,
            annotation.typography,
            dark ? theme.colors.textOnDarkMuted : theme.colors.textMuted,
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
