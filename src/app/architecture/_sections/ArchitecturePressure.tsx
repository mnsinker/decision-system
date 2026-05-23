"use client";

import { useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

import SectionHeader from "@/components/SectionHeader";
import SegmentedTabs, {
  segmentedTabsBehavior,
} from "@/components/SegmentedTabs";
import PressureLeftCard from "../pressure/PressureLeftCard";
import PressureRightCard from "../pressure/PressureRightCard";
import PressureLeftVisual1 from "../pressure/PressureLeftVisual1";
import PressureLeftVisual2 from "../pressure/PressureLeftVisual2";
import PressureRightVisual1 from "../pressure/PressureRightVisual1";
import PressureRightVisual2 from "../pressure/PressureRightVisual2";
import PressureRightVisual3 from "../pressure/PressureRightVisual3";
import { architecturePressureContent } from "@/content/architecture/architecturePressure";
import { semanticVisual } from "@/design-system/semanticVisual";
import PressureLeftVisual3 from "@/app/architecture/pressure/PressureLeftVisual3";

export default function ArchitecturePressure() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = architecturePressureContent[locale];
  const leftVisuals = {
    tab1: PressureLeftVisual1,
    tab2: PressureLeftVisual2,
    tab3: PressureLeftVisual3,
  };
  const rightVisuals = {
    tab1: PressureRightVisual1,
    tab2: PressureRightVisual2,
    tab3: PressureRightVisual3,
  };

  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");
  const LeftVisual = leftVisuals[activeTab];
  const RightVisual = rightVisuals[activeTab];
  const current = content.modules[activeTab as keyof typeof content.modules];
  const business = semanticVisual.businessVoice;

  return (
    <section
      id="architecture-pressure"
      className={cn(theme.spacing.sectionXComfort, "scroll-mt-20 py-8")}
    >
      <div className={cn("mx-auto", theme.spacing.container)}>
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.sectionTitle}
          label={content.label}
          narrativeRole="section"
        />

        <div
          className={cn(
            segmentedTabsBehavior.sticky.sectionTrack,
            "mt-3 flex justify-start"
          )}
        >
          <SegmentedTabs
            tabs={content.tabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as "tab1" | "tab2" | "tab3")}
            sticky={true}
          />
        </div>

        <div
          className={cn(
            "overflow-hidden border",
            "mt-4",
            theme.radius.shell,
            theme.colors.borderPrimary,
            theme.colors.surfacePrimary,
            theme.shadows.shell,
          )}
        >
          {/* business case */}

          <div
            className={cn(
              "border-b px-7 py-4",
              theme.colors.borderMuted,
              theme.colors.surfaceMuted,
            )}
          >
            <div className={cn(theme.spacing.eyebrowBottom, business.moduleLabel)}>
              {content.label}
            </div>

            <blockquote
              className={cn(
                business.editorialQuote.zone,
                business.editorialQuote.composition,
              )}
            >
              <span className={business.editorialQuote.mark} aria-hidden>
                &ldquo;
              </span>
              <span className={business.editorialQuote.body}>
                {current.bizCase}
              </span>
            </blockquote>
          </div>

          {/* split */}

          <div className="grid items-stretch lg:grid-cols-2">
            {/* left */}
            <PressureLeftCard
              label={current.leftCard.label}
              description={current.leftCard.pressure}
              visual={<LeftVisual content={current.leftCard} />}
            />

            {/* right */}
            <PressureRightCard
              sectionLabel={current.rightCard.label}
              layerTitle={current.rightCard.layerTitle}
              layerSubtitle={current.rightCard.layerSubtitle}
              architectureShiftTitle={current.rightCard.architectureShiftTitle}
              architectureShiftMsg={current.rightCard.architectureShiftMsg}
              visual={<RightVisual />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
