"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageProvider";
import SectionHeader from "@/components/SectionHeader";
import TransitionLine from "@/components/TransitionLine";
import SegmentedTabs from "@/components/SegmentedTabs";

import ChallengePanel from "../challenges/ChallengePanel";
import { overviewChallengesContent } from "@/content/overview/overviewChallenges";
export default function OverviewChallenges() {
  const { locale } = useLanguage();
  const content = overviewChallengesContent[locale];

  const [activeTab, setActiveTab] = useState("challenge1");

  return (
    <section className="py-8">
      <TransitionLine text={content.transition} />

      <div className="mx-auto max-w-7xl px-6">
        {/* header */}

        <SectionHeader
          eyebrow={content.sectionLabel}
          title={`${content.title.line1}\n${content.title.line2}`}
          size="lg"
        />

        {/* tabs */}

        <div className="mt-12">
          <SegmentedTabs
            tabs={content.tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* panel */}

        <div className="mt-10">
          {activeTab === "challenge1" && (
            <ChallengePanel challenge={content.challenge1} />
          )}

          {activeTab === "challenge2" && (
            <ChallengePanel challenge={content.challenge2} />
          )}

          {activeTab === "challenge3" && (
            <ChallengePanel challenge={content.challenge3} />
          )}
        </div>
      </div>
    </section>
  );
}
