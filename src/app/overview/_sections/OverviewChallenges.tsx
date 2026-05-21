"use client";

import { useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import SectionHeader from "@/components/SectionHeader";
import TransitionLine from "@/components/TransitionLine";
import SegmentedTabs from "@/components/SegmentedTabs";

import ChallengePanel from "../challenges/ChallengePanel";
import { overviewChallengesContent } from "@/content/overview/overviewChallenges";
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
        "scroll-mt-20 py-6",
      )}
    >
      <TransitionLine text={content.transition} />

      <div className={cn("mx-auto", theme.spacing.container)}>
        <div className="mt-5">
          <SectionHeader
            eyebrow={content.sectionLabel}
            title={`${content.title.line1}\n${content.title.line2}`}
            role="section"
          />
        </div>

        {/* tabs */}

        <div className="mt-5">
          <SegmentedTabs
            tabs={content.tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* panel */}

        <div className="mt-7">
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
