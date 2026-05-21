"use client";

import React from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import type { SectionNarrativeRole } from "@/design-system/narrative";
import { sectionTitle } from "@/lib/typography";
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
  /** Semantic title role — overrides legacy size when set */
  role?: SectionNarrativeRole;
  /** @deprecated Prefer role; xl→narrative/runtime, lg/md→section */
  size?: "md" | "lg" | "xl";
};

function resolveRole(
  role: SectionNarrativeRole | undefined,
  size: Props["size"],
  dark: boolean,
): SectionNarrativeRole {
  if (role) return role;
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
  role,
  size = "lg",
}: Props) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const narrativeRole = resolveRole(role, size, dark);

  const titleClass =
    narrativeRole === "runtime"
      ? cn(theme.typography.runtimeNarrative, dark && "text-white")
      : narrativeRole === "narrative"
        ? theme.typography.narrativeHero
        : theme.typography.sectionHero;

  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      {eyebrow && (
        <div
          className={cn(
            theme.spacing.eyebrowMargin,
            theme.typography.moduleLabel,
            dark ? theme.colors.textAccentSoft : undefined,
          )}
        >
          {eyebrow}
        </div>
      )}

      <h2
        className={cn(
          titleClass,
          sectionTitle(locale),
          narrativeRole === "section" &&
            (dark ? theme.colors.textOnDark : theme.colors.textPrimary),
          narrativeRole !== "section" &&
            (dark ? "text-white" : theme.colors.textPrimary),
        )}
      >
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
            theme.spacing.subtitleMargin,
            "max-w-2xl",
            theme.typography.explainer,
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
