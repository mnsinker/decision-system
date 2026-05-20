"use client";
import React from "react";
import { sectionTitle } from "@/lib/typography";
import { useLanguage } from "@/lib/LanguageProvider";

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
  const { locale } = useLanguage();
  const titleSize =
    size === "xl"
      ? "text-5xl md:text-7xl"
      : size === "lg"
        ? "text-3xl md:text-5xl"
        : "text-3xl md:text-4xl";

  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      {eyebrow && (
        <div
          className={`mb-3 font-mono text-[11px] font-bold tracking-[0.3em] uppercase ${
            dark ? "text-indigo-300" : "text-indigo-500"
          } `}
        >
          {eyebrow}
        </div>
      )}

      <h2
        className={` ${titleSize} ${sectionTitle(locale)} font-bold tracking-tight ${
          dark ? "text-white" : "text-slate-900"
        } `}
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
                    highlightClassName ||
                    "bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent"
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
          className={`mt-4 max-w-2xl text-base leading-7 ${
            dark ? "text-slate-400" : "text-slate-500"
          } ${align === "center" ? "mx-auto" : ""} `}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
