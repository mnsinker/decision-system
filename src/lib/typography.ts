import type { Locale } from "./language";

export function displayTitle(locale: Locale) {
  return locale === "zh"
    ? "leading-[1.08] tracking-[-0.04em]"
    : "leading-[0.92] tracking-tighter";
}

export function sectionTitle(locale: Locale) {
  return locale === "zh"
    ? "leading-[1.18] tracking-[-0.02em]"
    : "leading-[1.02]";
}

export function bodyText(locale: Locale) {
  return locale === "zh" ? "leading-[1.9]" : "leading-[1.7]";
}

export function eyebrowText(locale: Locale) {
  return locale === "zh" ? "tracking-[0.22em]" : "tracking-[0.45em]";
}
