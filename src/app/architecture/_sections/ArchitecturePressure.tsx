"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageProvider";

import SectionHeader from "@/components/SectionHeader";
import SegmentedTabs from "@/components/SegmentedTabs";
import PressureLeftCard from "../pressure/PressureLeftCard";
import PressureRightCard from "../pressure/PressureRightCard";
import PressureLeftVisual1 from "../pressure/PressureLeftVisual1";
import PressureLeftVisual2 from "../pressure/PressureLeftVisual2";
import PressureRightVisual1 from "../pressure/PressureRightVisual1";
import PressureRightVisual2 from "../pressure/PressureRightVisual2";
import PressureRightVisual3 from "../pressure/PressureRightVisual3";
import { architecturePressureContent } from "@/content/architecture/architecturePressure";
import PressureLeftVisual3 from "@/app/architecture/pressure/PressureLeftVisual3";

export default function ArchitecturePressure() {
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

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.sectionTitle}
          label={content.label}
        />

        <div className="mt-6">
          <SegmentedTabs
            tabs={content.tabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as "tab1" | "tab2" | "tab3")}
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_40px_100px_-30px_rgba(15,23,42,0.14)]">
          {/* business case */}

          <div className="border-b border-slate-100 bg-slate-50 px-8 py-7">
            <div className="mb-2 font-mono text-[10px] font-bold tracking-[0.3em] text-indigo-500 uppercase">
              {content.label}
            </div>

            <h3 className="max-w-5xl text-3xl leading-[1.08] font-black italic">
              {current.bizCase}
            </h3>
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
