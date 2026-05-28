"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, GitBranch, Megaphone, Receipt } from "lucide-react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import {
  architectureFlowContent,
  architectureFlowUseCases,
  type ArchitectureFlowContent,
  type ArchitectureFlowLayerId,
  type ArchitectureFlowUseCase as UseCase,
} from "@/content/architecture/architectureFlow";

type DetailLevel = 1 | 2 | 3;
type FlowContent = ArchitectureFlowContent;

const useCaseIcons = {
  refund: Receipt,
  marketing: Megaphone,
  workflow: GitBranch,
} satisfies Record<UseCase, React.ComponentType<{ className?: string }>>;

export default function ArchitectureFlow() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = architectureFlowContent[locale];
  const [detailLevel, setDetailLevel] = useState<DetailLevel>(2);
  const [useCase, setUseCase] = useState<UseCase>("refund");

  const current = content.cases[useCase];
  const highlightedLayers: ArchitectureFlowLayerId[] = current.layerHighlights;
  const showFoundation = detailLevel >= 3;

  const rows = [
    {
      layer: content.layers.input.title,
      subtitle: content.layers.input.subtitle,
      active: false,
      stage: (
        <StageCard title={content.layers.input.stageTitle} accent="blue">
          <SimpleBox>
            <div className="font-mono text-sm text-white">{current.query}</div>
          </SimpleBox>
        </StageCard>
      ),
    },
    {
      layer: content.layers.semantic.title,
      subtitle: content.layers.semantic.subtitle,
      active: highlightedLayers.includes("semantic"),
      stage: (
        <StageCard
          title={content.layers.semantic.stageTitle}
          accent="blue"
          showConnector={showFoundation}
        >
          <FlatBlock
            title={content.layers.semantic.blockTitle}
            notes={current.semanticSummary.notes}
          >
            <CompactIO
              input={current.semanticSummary.input}
              output={current.semanticSummary.output}
              labels={content.io}
            />
          </FlatBlock>
        </StageCard>
      ),
    },
    {
      layer: content.layers.planning.title,
      subtitle: content.layers.planning.subtitle,
      active: highlightedLayers.includes("planning"),
      stage: (
        <StageCard
          title={content.layers.planning.stageTitle}
          accent="violet"
          showConnector={showFoundation}
        >
          <FlatBlock
            title={content.layers.planning.blockTitle}
            notes={current.planSummary.notes}
          >
            <CompactIO
              input={current.planSummary.input}
              output={current.planSummary.output}
              labels={content.io}
            />
          </FlatBlock>
        </StageCard>
      ),
    },
    {
      layer: content.layers.execution.title,
      subtitle: content.layers.execution.subtitle,
      active: highlightedLayers.includes("execution"),
      stage: (
        <StageCard title={content.layers.execution.stageTitle} accent="emerald">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#1A2230]/70 pb-2.5">
              <div className="inline-flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] tracking-[0.18em] text-emerald-300 uppercase">
                  {content.layers.execution.loopInstruction}
                </span>
              </div>

              <div className="font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
                {content.layers.execution.loopLabel}
              </div>
            </div>

            <FlatBlock title={content.layers.execution.parameterBlockTitle}>
              <CompactIO
                input={current.parameterSummary.input}
                output={current.parameterSummary.output}
                labels={content.io}
              />
            </FlatBlock>

            <FlatBlock title={content.layers.execution.toolBlockTitle}>
              <CompactIO
                input={current.toolSummary.input}
                output={current.toolSummary.output}
                labels={content.io}
              />

              <div className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.045] p-3.5">
                <div className="text-left text-[11px] leading-relaxed text-[#8EA09B]">
                  {content.layers.execution.policyNarrative}
                </div>

                <div className="relative mt-3 rounded-lg border border-[#1A2230]/80 bg-[#07110D] p-3">
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                    <div className="rounded border border-emerald-500/20 bg-emerald-950/30 px-2 py-1 font-mono text-[9px] tracking-[0.14em] text-emerald-400 uppercase">
                      {content.layers.execution.policyBadge}
                    </div>
                    {current.toolSummary.secondaryTool?.badgeLabel && (
                      <div className="rounded border border-violet-500/20 bg-violet-950/30 px-2 py-1 font-mono text-[9px] tracking-[0.14em] text-violet-400 uppercase">
                        {current.toolSummary.secondaryTool.badgeLabel}
                      </div>
                    )}
                  </div>
                  <div className="pr-36 font-mono text-[12px] leading-relaxed text-[#BFD7D0]">
                    <span className="text-white">
                      {current.toolSummary.toolName}
                    </span>
                    <div className="pl-4 text-[#647089]">
                      └─{" "}
                      <span className="text-emerald-300">
                        {content.layers.execution.policyMethod}
                      </span>
                    </div>
                    <div className="pl-8 text-[#9CA7B8]">
                      └─ {current.toolSummary.dtoName}
                    </div>
                    {current.toolSummary.secondaryTool && (
                      <>
                        <div
                          className={
                            current.toolSummary.secondaryTool.badgeLabel
                              ? "text-violet-400"
                              : "text-white"
                          }
                        >
                          {current.toolSummary.secondaryTool.toolName}
                        </div>
                        <div className="pl-4 text-[#9CA7B8]">
                          └─ {current.toolSummary.secondaryTool.dtoName}
                        </div>
                      </>
                    )}
                    {current.toolSummary.tertiaryTool && (
                      <>
                        <div className="text-white">
                          {current.toolSummary.tertiaryTool.toolName}
                        </div>
                        <div className="pl-4 text-[#9CA7B8]">
                          └─ {current.toolSummary.tertiaryTool.dtoName}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </FlatBlock>

            <FlatBlock title={content.layers.execution.resultBlockTitle}>
              {/* Highlight changed text */}
              <div className="text-[13px] text-[#B7C0D4]">
                {content.layers.execution.resultPrefix}{" "}
                <span className="font-mono font-medium text-blue-400">
                  {content.layers.execution.resultTarget}
                </span>
              </div>
            </FlatBlock>
          </div>
        </StageCard>
      ),
    },
    {
      layer: content.layers.response.title,
      subtitle: content.layers.response.subtitle,
      active: false,
      stage: (
        <StageCard title={content.layers.response.stageTitle} accent="amber">
          <FlatBlock
            title={
              current.responseSummary.blockTitle ??
              content.layers.response.blockTitle
            }
            notes={current.responseSummary.notes}
          >
            <CompactIO
              input={current.responseSummary.input}
              output={current.responseSummary.output}
              labels={content.io}
            />

            <div className="mt-3 rounded-lg border border-l-2 border-amber-500/15 border-l-amber-500/45 bg-amber-500/[0.035] p-3.5">
              <div className="text-[13px] leading-relaxed text-amber-100">
                {current.responseSummary.finalAnswer}
              </div>
            </div>
          </FlatBlock>
        </StageCard>
      ),
    },
  ];

  return (
    <section
      className={cn(
        "relative w-full overflow-visible bg-[#030712] text-white",
        theme.spacing.sectionXComfort,
        theme.spacing.sectionY,
      )}
    >
      <div className={cn("relative mx-auto", theme.spacing.container)}>
        {/* Header */}
        <div className="mb-7 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-blue-400 uppercase">
              {content.header.eyebrow}
            </div>

            <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {content.header.title}
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-[#8791A5]">
              {content.header.description}
            </p>
          </div>

          <div className="lg:pt-10">
            <SliderControl
              value={detailLevel}
              onChange={setDetailLevel}
              content={content.slider}
            />
          </div>
        </div>

        {/* Sticky selector - Sticky enabled with higher z-index & blur background */}
        <div
          className={cn(
            "sticky top-16 z-50 mb-7 border border-[#1A2230]/80 bg-[#05070B]/90 p-1.5 shadow-[0_14px_32px_rgba(0,0,0,0.34)] backdrop-blur-xl",
            theme.radius.cardSm,
          )}
        >
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {architectureFlowUseCases.map((key) => {
              const item = content.cases[key];
              const selected = key === useCase;
              const currentStatus = item.status.id === "current";
              const Icon = useCaseIcons[key];
              return (
                <button
                  key={key}
                  onClick={() => setUseCase(key)}
                  className={cn(
                    "border p-3 text-left transition-all duration-300",
                    theme.radius.cardSm,
                    selected
                      ? currentStatus
                        ? "border-emerald-400/30 bg-emerald-500/[0.1] shadow-[0_0_22px_rgba(16,185,129,0.1)]"
                        : "border-violet-400/30 border-t-violet-400/45 bg-[#171523] shadow-[0_10px_26px_rgba(76,29,149,0.18),0_0_18px_rgba(139,92,246,0.08)]"
                      : "border-[#151C28] bg-[#0B0F15] hover:border-[#2A3445]",
                  )}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          selected
                            ? currentStatus
                              ? "text-emerald-300"
                              : "text-violet-300"
                            : "text-[#647089]",
                        )}
                        aria-hidden
                      />
                      <div
                        className={`text-sm font-semibold ${
                          selected
                            ? currentStatus
                              ? "text-white"
                              : "text-violet-50"
                            : "text-[#B9C2D0]"
                        }`}
                      >
                        {item.label}
                      </div>
                    </div>
                    <StatusBadge current={currentStatus} selected={selected}>
                      {item.status.label}
                    </StatusBadge>
                  </div>

                  <div className="truncate font-mono text-[11px] text-[#647089]">
                    {item.query}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Layers view only */}
        {detailLevel === 1 && (
          <div className="relative isolate mx-auto max-w-[500px] space-y-3 py-6">
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(59,130,246,0.16)_0%,_rgba(59,130,246,0.06)_35%,_transparent_75%)] opacity-100 blur-3xl"
              aria-hidden
            />
            {rows.map((row) => (
              <LayerCard
                key={row.layer}
                title={row.layer}
                subtitle={row.subtitle}
                active={row.active}
                centered
              />
            ))}
          </div>
        )}

        {/* Runtime / Foundation Grid View */}
        {detailLevel >= 2 && (
          <div
            className={`grid transition-all duration-700 ${
              detailLevel === 2
                ? "grid-cols-[230px_minmax(0,1fr)] gap-6"
                : "grid-cols-[230px_minmax(0,1fr)_330px] gap-6"
            }`}
          >
            <div className="contents">
              <div>
                <SectionLabel>&nbsp;</SectionLabel>
              </div>
              <div>
                <SectionLabel>{content.columns.runtime}</SectionLabel>
              </div>
              {detailLevel === 3 && (
                <div>
                  <SectionLabel>{content.columns.foundation}</SectionLabel>
                </div>
              )}

              {rows.map((row, idx) => (
                <React.Fragment key={row.layer}>
                  <div className="pb-5">
                    <LayerCard
                      title={row.layer}
                      subtitle={row.subtitle}
                      active={row.active}
                    />
                  </div>

                  <div className="pb-5">{row.stage}</div>

                  {detailLevel === 3 && idx === 0 && (
                    <div className="row-span-5 space-y-4 pb-5">
                      <FoundationCard
                        title={content.foundationCards.entities.title}
                        label={content.foundationCards.entities.label}
                      >
                        <div className="flex flex-wrap gap-2">
                          {current.foundation.entities.map((entity) => (
                            <span
                              key={entity}
                              className="rounded border border-blue-500/25 bg-blue-500/[0.07] px-2.5 py-1.5 font-mono text-[12px] text-blue-200"
                            >
                              {entity}
                            </span>
                          ))}
                        </div>
                      </FoundationCard>

                      <FoundationCard
                        title={content.foundationCards.graph.title}
                        label={content.foundationCards.graph.label}
                      >
                        <div className="mb-4 space-y-2.5 font-mono text-[12px] text-blue-300 drop-shadow-[0_0_5px_rgba(96,165,250,0.16)]">
                          {current.foundation.graphRelations.map((relation) => (
                            <div key={relation}>{relation}</div>
                          ))}
                        </div>

                        <div className="space-y-1.5 border-t border-[#161F2E] pt-3">
                          {current.foundation.graphNotes.map((note) => (
                            <div
                              key={note}
                              className="text-[11px] leading-relaxed text-[#98A5B9]"
                            >
                              • {note}
                            </div>
                          ))}
                        </div>
                      </FoundationCard>

                      <FoundationCard
                        title={content.foundationCards.mapping.title}
                        label={content.foundationCards.mapping.label}
                      >
                        <div className="space-y-2.5 font-mono text-[12px]">
                          {current.foundation.entityMap.map((row) => (
                            <MappingRow
                              key={row.entity}
                              entity={row.entity}
                              tool={row.tool}
                            />
                          ))}
                        </div>
                      </FoundationCard>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto mt-12 max-w-xl border-t border-[#1A2230]/80 pt-12 text-center">
          <p className="text-base leading-relaxed text-[#8791A5]">
            {content.cta.description}
          </p>

          <Link
            href="/evolution"
            className={cn(
              "group mt-6 inline-flex h-[54px] items-center gap-2.5 border border-blue-500/30 bg-blue-500/[0.1] px-7 text-[15px] font-semibold text-blue-100 transition-[border-color,background-color,box-shadow] duration-200 hover:border-blue-400/45 hover:bg-blue-500/[0.16] hover:shadow-[0_0_20px_rgba(59,130,246,0.14)]",
              theme.radius.button,
            )}
          >
            {content.cta.button}
            <ArrowRight
              size={16}
              className="text-blue-300 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========================= Sub-Components ========================= */

// Renamed and spacing tweaked to support lower track layout and "slider" indicator room
function SliderControl({
  value,
  onChange,
  content,
}: {
  value: DetailLevel;
  onChange: (level: DetailLevel) => void;
  content: FlowContent["slider"];
}) {
  const steps = content.steps;

  return (
    <div className="w-[320px]">
      <div className="mb-3 grid grid-cols-3 font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
        {steps.map((step) => (
          <span
            key={step.value}
            className={`${
              step.value === 1
                ? "text-left"
                : step.value === 2
                  ? "text-center"
                  : "text-right"
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>

      <div className="relative h-5">
        <div className="absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 rounded-full bg-[#1A2230]" />
        <div
          className={`absolute top-1/2 left-0 h-[2px] -translate-y-1/2 rounded-full bg-blue-500 transition-all duration-500 ${
            value === 1 ? "w-0" : value === 2 ? "w-1/2" : "w-full"
          }`}
        />
        <div
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-blue-400 bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.4)] transition-all duration-500 ${
            value === 1
              ? "left-0"
              : value === 2
                ? "left-1/2 -translate-x-1/2"
                : "right-0"
          }`}
          aria-hidden
        />

        <div
          className="absolute inset-0 flex items-center justify-between"
          aria-hidden
        >
          {steps.map((step) => (
            <span
              key={step.value}
              className="h-2 w-px rounded-full bg-[#647089]/45"
            />
          ))}
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={1}
          value={value}
          onChange={(event) =>
            onChange(Number(event.target.value) as DetailLevel)
          }
          className="absolute inset-0 h-5 w-full cursor-pointer opacity-0"
          aria-label={content.ariaLabel}
        />
      </div>
    </div>
  );
}

function StatusBadge({
  current,
  selected,
  children,
}: {
  current: boolean;
  selected: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold tracking-wide uppercase ${
        current && selected
          ? "border border-emerald-400/30 bg-emerald-500/[0.14] text-emerald-200 shadow-sm shadow-emerald-500/15"
          : current
            ? "border border-[#283142] bg-[#10151E] text-[#98A4B8]"
            : selected
              ? "border border-violet-400/30 bg-violet-500/[0.12] text-violet-200"
              : "border border-[#283142] bg-[#10151E] text-[#98A4B8]"
      }`}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3.5 font-mono text-[10px] tracking-[0.18em] text-[#647089] uppercase">
      {children}
    </div>
  );
}

function LayerCard({
  title,
  subtitle,
  active,
  centered,
}: {
  title: string;
  subtitle: string;
  active?: boolean;
  centered?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "w-full border p-3.5 transition-all duration-300",
        theme.radius.cardSm,
        centered ? "px-8 py-5 text-center" : "",
        active
          ? "border-blue-500/30 bg-blue-500/[0.085] shadow-[0_0_16px_rgba(59,130,246,0.08)]"
          : "border-[#1A2230]/90 bg-[#0D1117]",
      )}
    >
      <div className="mb-1 text-[13px] font-semibold text-white">{title}</div>
      <div className="font-mono text-[10px] tracking-[0.16em] text-[#647089] uppercase">
        {subtitle}
      </div>
    </div>
  );
}

function StageCard({
  title,
  children,
  accent,
  showConnector,
}: {
  title: string;
  children: React.ReactNode;
  accent: "blue" | "violet" | "emerald" | "amber";
  showConnector?: boolean;
}) {
  const { theme } = useTheme();
  const accentMap = {
    blue: "border-blue-500/20",
    violet: "border-violet-500/20",
    emerald: "border-emerald-500/25",
    amber: "border-amber-500/20",
  };

  return (
    <div
      className={cn(
        "relative border bg-[#0B0F15] p-4",
        theme.radius.cardSm,
        accentMap[accent],
      )}
    >
      {showConnector && (
        <div className="absolute top-14 right-[-48px] w-[48px] border-t border-dashed border-[#243147]" />
      )}

      <h2 className="mb-4 text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </div>
  );
}

function FlatBlock({
  title,
  notes,
  children,
}: {
  title: string;
  notes?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#1A2230]/70 bg-white/[0.018] p-3.5">
      <div className="mb-2 font-mono text-[10px] tracking-[0.16em] text-[#647089] uppercase">
        {title}
      </div>

      {notes && notes.length > 0 && (
        <div className="mb-3 font-mono text-[10px] tracking-[0.1em] text-[#8A95A8] uppercase">
          {notes.join("  •  ")}
        </div>
      )}

      {children}
    </div>
  );
}

function CompactIO({
  input,
  output,
  labels,
}: {
  input: string;
  output: string;
  labels: FlowContent["io"];
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_32px_minmax(0,1.15fr)] items-stretch gap-3">
      <SmallIO label={labels.input} value={input} />
      <div className="flex items-center justify-center">
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#3D547A] to-transparent">
          <div className="absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
        </div>
      </div>
      <SmallIO label={labels.output} value={output} blue />
    </div>
  );
}

function SmallIO({
  label,
  value,
  blue,
}: {
  label: string;
  value: string;
  blue?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-2.5 ${
        blue
          ? "border-blue-500/20 bg-blue-500/[0.035]"
          : "border-[#1A2230]/80 bg-[#0D1218]/70"
      }`}
    >
      <div className="mb-1.5 font-mono text-[9px] tracking-[0.16em] text-[#647089] uppercase">
        {label}
      </div>
      <div
        className={`font-mono text-[11px] leading-relaxed whitespace-pre-wrap ${
          blue ? "text-blue-300" : "text-[#CBD3E1]"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function FoundationCard({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "border border-blue-500/20 bg-[#0B0F15] p-4 shadow-[0_8px_22px_rgba(0,0,0,0.18)]",
        theme.radius.cardSm,
      )}
    >
      <div className="mb-3">
        <div className="mb-1 text-[15px] font-semibold text-white">{title}</div>
        <div className="font-mono text-[10px] tracking-[0.16em] text-[#647089] uppercase">
          {label}
        </div>
      </div>
      {children}
    </div>
  );
}

function MappingRow({ entity, tool }: { entity: string; tool: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-[#CBD3E1]">{entity}</div>
      <div className="text-[#647089]">→</div>
      <div className="text-violet-300 drop-shadow-[0_0_5px_rgba(167,139,250,0.18)]">
        {tool}
      </div>
    </div>
  );
}

function SimpleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#1A2230]/80 bg-[#0C1016] p-3.5">
      {children}
    </div>
  );
}
