"use client";

import React from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
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
  size?: "md" | "lg" | "xl";
};

export default function SectionHeader({
  eyebrow,
  title,

  highlight,
  highlightClassName,

  subtitle,
  align = "left",
  dark = false,
  size = "lg",
}: Props) {
  const { theme } = useTheme();
  const { locale } = useLanguage();

  const titleSize =
    size === "xl"
      ? theme.typography.sectionTitleXl
      : size === "lg"
        ? theme.typography.sectionTitleResponsive
        : theme.typography.sectionTitleMd;

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
            theme.typography.sectionEyebrow,
            dark ? theme.colors.textAccentSoft : theme.colors.textAccent,
          )}
        >
          {eyebrow}
        </div>
      )}

      <h2
        className={cn(
          titleSize,
          sectionTitle(locale),
          theme.typography.titleWeight,
          dark ? theme.colors.textOnDark : theme.colors.textSecondary,
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
            theme.typography.sectionSubtitle,
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
