"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import TransitionLine from "@/components/TransitionLine";
import { overviewHeroContent } from "@/content/overview/overviewHero";
import { overviewChallengesContent } from "@/content/overview/overviewChallenges";
import { systemControlChrome } from "@/design-system/controlChrome";
import { Activity, ArrowDown } from "lucide-react";

/** Local scene choreography — OverviewHero only, not design-system. */
const heroScene = {
  viewport: "min-h-[calc(100svh-4rem)]",
  contentRail: "max-w-4xl",
  eyebrowGap: "mb-4",
  headlineGap: "mb-0",
  explainerGap: "mt-7 md:mt-8",
  ctaGap: "mt-9 md:mt-10",
  transitionPad: "pb-6 pt-2 -mt-3 md:pb-8 md:pt-3 md:-mt-4",
} as const;

function HeroAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-white/95 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_68%_52%_at_50%_14%,rgba(226,232,240,0.42),transparent_70%)]" />
      <div className="pointer-events-none absolute top-[10%] left-1/2 h-[min(380px,46vh)] w-[min(640px,88vw)] -translate-x-1/2 rounded-full bg-indigo-500/[0.07] blur-[96px]" />
      <div className="pointer-events-none absolute top-[22%] left-[62%] h-[200px] w-[320px] -translate-x-1/2 rounded-full bg-violet-500/[0.04] blur-[80px]" />
      <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_62%_50%_at_50%_10%,#000_58%,transparent_100%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/92 to-transparent" />
    </div>
  );
}

export default function OverviewHero() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = overviewHeroContent[locale];
  const challengesContent = overviewChallengesContent[locale];

  const scrollToChallenges = () => {
    document
      .getElementById("overview-challenges")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-white",
        heroScene.viewport,
      )}
    >
      <HeroAtmosphere />

      <div
        className={cn(
          "relative flex flex-1 flex-col justify-center",
          theme.spacing.sectionXComfort,
        )}
      >
          <div className={cn("mx-auto w-full", theme.spacing.container)}>
            <div className={cn("mx-auto w-full", heroScene.contentRail)}>
              <div
                className={cn(
                  heroScene.eyebrowGap,
                  "inline-flex items-center px-3 py-1 uppercase",
                  theme.spacing.inlineGapTight,
                  theme.radius.chip,
                  theme.colors.borderAccent,
                  theme.colors.surfaceAccent,
                  theme.typography.moduleLabel,
                )}
              >
                <Activity size={12} />
                {content.badge}
              </div>

              <h1
                className={cn(
                  heroScene.headlineGap,
                  theme.typography.pageHero,
                  theme.colors.textPrimary,
                )}
              >
                {content.title.normal}

                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {" "}
                  {content.title.highlight}
                </span>

                {content.title.end}
              </h1>

              <p
                className={cn(
                  "max-w-2xl",
                  heroScene.explainerGap,
                  theme.typography.explainer,
                  theme.colors.textMuted,
                )}
              >
                {content.subtitle}
              </p>

              <div
                className={cn(
                  heroScene.ctaGap,
                  "flex flex-wrap items-center",
                  theme.spacing.inlineGap,
                )}
              >
                <button
                  type="button"
                  onClick={scrollToChallenges}
                  className={cn("group", systemControlChrome.navPrimary)}
                >
                  {content.primaryButton}
                  <ArrowDown
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-y-0.5"
                  />
                </button>

                <Link
                  href="/architecture"
                  className={systemControlChrome.navSecondary}
                >
                  {content.secondaryButton}
                </Link>
              </div>
            </div>
          </div>
        </div>

      <div
        className={cn(
          "relative shrink-0",
          heroScene.transitionPad,
          theme.spacing.sectionXComfort,
        )}
      >
        <div className={cn("mx-auto w-full", theme.spacing.container)}>
          <TransitionLine text={challengesContent.transition} />
        </div>
      </div>
    </section>
  );
}
