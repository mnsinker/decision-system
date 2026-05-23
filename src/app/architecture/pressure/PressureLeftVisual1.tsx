import React from "react";
import { cn } from "@/lib/cn";
import PressureExplanationCard from "./PressureExplanationCard";

type LeftCardContent = {
  rootCauseTitle: string;
  rootCauseMsg: string;
};

type SystemCardProps = {
  system: string;
  definition: string;
  version: string;
  offsetClass: string;
  rotateClass: string;
};

function SystemDefinitionCard({
  system,
  definition,
  version,
  offsetClass,
  rotateClass,
}: SystemCardProps) {
  return (
    <div className={cn("w-full", offsetClass, rotateClass)}>
      <div className="relative rounded-lg border-2 border-rose-200 bg-white px-3.5 py-2.5 shadow-[0_1px_2px_0_rgba(15,23,42,0.06)]">
        <span className="pointer-events-none absolute top-2.5 right-3 font-mono text-[9px] font-medium text-slate-400">
          {version}
        </span>

        <p className="mb-1.5 pr-12 font-mono text-[10px] font-bold tracking-wide text-slate-500 uppercase">
          {system}
        </p>

        <p className="text-[13px] font-semibold leading-snug text-slate-900">
          VIP = {definition}
        </p>
      </div>
    </div>
  );
}

export default function PressureLeftVisual1({
  content,
}: {
  content: LeftCardContent;
}) {
  return (
    <div className="flex h-full min-h-[420px] flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-3 py-6">
        <div className="flex w-full max-w-[94%] flex-col gap-4">
          <SystemDefinitionCard
            system="CRM"
            definition="spends &gt; $1,000"
            version="2022 · v1"
            offsetClass="-translate-x-1.5"
            rotateClass="-rotate-[0.7deg]"
          />

          <SystemDefinitionCard
            system="Customer Support"
            definition="priority tier"
            version="2023 · v2"
            offsetClass="translate-x-2.5"
            rotateClass="rotate-[0.55deg]"
          />

          <SystemDefinitionCard
            system="Refund Service"
            definition="manual whitelist"
            version="Legacy"
            offsetClass="-translate-x-2"
            rotateClass="-rotate-[0.35deg]"
          />
        </div>
      </div>

      <div className="shrink-0 pt-4">
        <PressureExplanationCard
          viewMode="code"
          label={content.rootCauseTitle}
          description={content.rootCauseMsg}
        />
      </div>
    </div>
  );
}
