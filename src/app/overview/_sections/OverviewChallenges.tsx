"use client";

import { useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import SectionHeader from "@/components/SectionHeader";
import SegmentedTabs from "@/components/SegmentedTabs";

import ChallengePanel from "../challenges/ChallengePanel";
import { overviewChallengesContent } from "@/content/overview/overviewChallenges";
import { semanticHierarchy } from "@/design-system/semanticVisual";
export default function OverviewChallenges() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = overviewChallengesContent[locale];

  const [activeTab, setActiveTab] = useState("challenge1");

  return (
    <section
      id="overview-challenges"
      className={cn(
        theme.spacing.sectionXComfort,
        theme.colors.surfacePrimary,
        "scroll-mt-20 pt-4 pb-5",
      )}
    >
      <div className={cn("mx-auto", theme.spacing.container)}>
        <div className={semanticHierarchy.sectionHero.spacing.afterBridge}>
          <SectionHeader
            eyebrow={content.sectionLabel}
            title={`${content.title.line1}\n${content.title.line2}`}
            narrativeRole="section"
          />
        </div>

        <div className="sticky top-16 z-20 mt-3 bg-white py-1">
          <SegmentedTabs
            tabs={content.tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        <div className="mt-4">
          {activeTab === "challenge1" && (
            <ChallengePanel
              challenge={content.challenge1}
              interpretationLabel={content.interpretationLabel}
            />
          )}

          {activeTab === "challenge2" && (
            <ChallengePanel
              challenge={content.challenge2}
              interpretationLabel={content.interpretationLabel}
            />
          )}

          {activeTab === "challenge3" && (
            <ChallengePanel
              challenge={content.challenge3}
              interpretationLabel={content.interpretationLabel}
            />
          )}
        </div>
      </div>
    </section>
  );
}
