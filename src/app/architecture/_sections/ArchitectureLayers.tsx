"use client";

import React, { useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import SectionHeader from "@/components/SectionHeader";
import SegmentedTabs from "@/components/SegmentedTabs";
import { semanticVisual } from "@/design-system/semanticVisual";
import {
  architectureLayersContent,
  type LayerSemanticFlow,
  type RuntimeHighlightMapping,
  type RuntimeLayerContent,
  type RuntimeLayerId,
  type StabilitySystemContent,
} from "@/content/architecture/architectureLayers";

/** Local scene choreography — ArchitectureLayers only */
const layersScene = {
  choreography: "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
  mapMinHeight: "min-h-[520px]",
  spineConnector: "flex items-center justify-center py-2",
  boundaryRail: "relative h-3/4 w-px bg-gradient-to-b from-white/10 via-white/20 to-transparent",
  /** Capability bullet — active node uses existing glow token */
  bulletActive:
    "h-1.5 w-1.5 shrink-0 scale-125 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]",
  bulletNeutral: "h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500",
  bulletInactive: "h-1 w-1 shrink-0 rounded-full bg-slate-600",
  semanticStrip: "mt-3 border-t border-white/10 pt-3",
} as const;

const semanticStripColumns = ["input", "process", "output"] as const;

type SemanticStripColumn = (typeof semanticStripColumns)[number];

function LayerSemanticStrip({
  labels,
  flow,
  theme,
}: {
  labels: Record<SemanticStripColumn, string>;
  flow: LayerSemanticFlow;
  theme: ReturnType<typeof useTheme>["theme"];
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-0",
        layersScene.semanticStrip,
        layersScene.choreography,
      )}
    >
      {semanticStripColumns.map((column, columnIndex) => (
        <div
          key={column}
          className={cn(
            "min-w-0 px-2 first:pl-0 last:pr-0",
            columnIndex > 0 && "border-l border-white/10",
          )}
        >
          <div
            className={cn(
              theme.typography.monoLabel,
              "text-[9px] text-slate-500",
            )}
          >
            {labels[column]}
          </div>
          <ul className="mt-1.5 space-y-1">
            {flow[column].map((item) => (
              <li
                key={item}
                className="font-mono text-[10px] leading-snug text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

type ViewMode = "layer" | "full";

export default function ArchitectureLayers() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = architectureLayersContent[locale];

  const [viewMode, setViewMode] = useState<ViewMode>("layer");
  const [activeLayerId, setActiveLayerId] = useState<RuntimeLayerId | null>(null);

  const isFullView = viewMode === "full";
  const activeHighlights: RuntimeHighlightMapping | null = activeLayerId
    ? content.highlightsMap[activeLayerId]
    : null;
  const highlightedItems = activeHighlights?.highlightedItems ?? null;

  const runtimeLabel = semanticVisual.runtimeVoice;

  const handleLayerView = () => {
    setViewMode("layer");
    setActiveLayerId(null);
  };

  const handleFullView = () => {
    setViewMode("full");
  };

  const handleLayerClick = (layerId: RuntimeLayerId) => {
    if (viewMode === "layer") {
      setViewMode("full");
      setActiveLayerId(layerId);
      return;
    }
    setActiveLayerId((current) => (current === layerId ? null : layerId));
  };

  return (
    <section
      className={cn(
        "relative w-full",
        theme.colors.surfaceDark,
        theme.colors.textOnDark,
        theme.spacing.sectionXComfort,
        theme.spacing.sectionY,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
        aria-hidden
      />

      <div className={cn("relative mx-auto", theme.spacing.container)}>
        <div
          className={cn(
            "mb-12 flex flex-col justify-between gap-8 border-b pb-8 lg:flex-row lg:items-end",
            theme.colors.borderOnDark,
          )}
        >
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.sectionTitle}
            subtitle={content.subtitle}
            dark
            narrativeRole="runtime"
          />

          <div className="flex shrink-0 items-center self-start lg:self-auto">
            <SegmentedTabs
              variant="runtime"
              tabs={[
                { id: "layer", label: content.viewModes.core },
                { id: "full", label: content.viewModes.expanded },
              ]}
              activeTab={viewMode}
              onChange={(id) =>
                id === "layer" ? handleLayerView() : handleFullView()
              }
              sticky={false}
            />
          </div>
        </div>

        <div
          className={cn(
            "relative gap-12 overflow-hidden",
            layersScene.mapMinHeight,
            layersScene.choreography,
            isFullView
              ? "grid grid-cols-1 items-start lg:grid-cols-12"
              : "flex w-full justify-center items-center",
          )}
        >
          <div
            className={cn(
              "relative z-10 flex flex-col",
              layersScene.choreography,
              isFullView
                ? "lg:col-span-5"
                : "mx-auto w-full max-w-[33.333rem]",
            )}
          >
            <div
              className={cn(
                "mb-4 flex items-center",
                runtimeLabel.moduleLabel,
                !isFullView && "justify-center",
              )}
            >
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {content.spineLabel}
            </div>

            {content.coreLayers.map((layer: RuntimeLayerContent, index) => {
              const isActive = activeLayerId === layer.id;
              const showResponsibility = !isFullView || !isActive;
              const showSemanticStrip = isFullView && isActive;

              return (
                <React.Fragment key={layer.id}>
                  <button
                    type="button"
                    onClick={() => handleLayerClick(layer.id)}
                    className={cn(
                      "group relative isolate w-full cursor-pointer border p-5 text-left",
                      layersScene.choreography,
                      theme.radius.cardSm,
                      isActive
                        ? cn(
                            "border-indigo-500/50",
                            theme.colors.surfaceDarkPanel,
                            theme.shadows.glowAccent,
                          )
                        : cn(
                            theme.colors.borderOnDark,
                            theme.colors.surfaceDarkElevated,
                            "hover:border-white/20 hover:bg-white/[0.04]",
                          ),
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              theme.typography.monoLabel,
                              isActive
                                ? theme.colors.textAccentSoft
                                : "text-slate-500",
                            )}
                          >
                            0{index + 1}
                          </span>
                          <h3
                            className={cn(
                              theme.typography.cardTitle,
                              "tracking-[-0.03em]",
                              layersScene.choreography,
                              !isFullView || isActive
                                ? theme.colors.textOnDark
                                : cn(
                                    "text-slate-200",
                                    "group-hover:text-white",
                                  ),
                            )}
                          >
                            {layer.title}
                          </h3>
                        </div>
                        {showResponsibility && (
                          <p
                            className={cn(
                              "mt-2 line-clamp-2 text-xs leading-relaxed",
                              layersScene.choreography,
                              theme.colors.textOnDarkMuted,
                            )}
                          >
                            {layer.responsibility}
                          </p>
                        )}
                      </div>
                      <div
                        className={cn(
                          "mt-1 shrink-0",
                          isFullView && layersScene.choreography,
                          isFullView
                            ? isActive
                              ? cn(
                                  "rotate-90",
                                  theme.colors.textAccentSoft,
                                )
                              : "text-slate-500 group-hover:text-slate-300"
                            : "text-slate-500",
                        )}
                        aria-hidden
                      >
                        <ChevronIcon className="h-5 w-5" />
                      </div>
                    </div>

                    <div
                      className={cn(
                        "absolute top-1/4 bottom-1/4 left-0 w-[2px] rounded-r",
                        layersScene.choreography,
                        isActive
                          ? "scale-100 bg-indigo-500"
                          : "scale-0 bg-transparent",
                      )}
                    />

                    <div
                      className={cn(
                        "grid overflow-hidden",
                        layersScene.choreography,
                        showSemanticStrip
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0">
                        <LayerSemanticStrip
                          labels={content.semanticStrip}
                          flow={layer.semanticFlow}
                          theme={theme}
                        />
                      </div>
                    </div>
                  </button>

                  {index < content.coreLayers.length - 1 && (
                    <div className={layersScene.spineConnector} aria-hidden>
                      <div className="min-h-4 w-px self-stretch bg-white/10" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div
            className={cn(
              "hidden h-full min-h-[380px] items-center justify-center lg:col-span-1",
              layersScene.choreography,
              isFullView ? "lg:flex" : "hidden",
            )}
          >
            <div className={layersScene.boundaryRail} aria-hidden />
          </div>

          <div
            className={cn(
              "relative space-y-4",
              layersScene.choreography,
              isFullView
                ? "lg:col-span-6 translate-x-0 opacity-100 block"
                : "hidden pointer-events-none h-0 overflow-hidden p-0 opacity-0 translate-x-16",
            )}
          >
            <div
              className={cn(
                "mb-4 flex items-center",
                runtimeLabel.moduleLabel,
              )}
            >
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {content.systemsLabel}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.stabilitySystems.map((system: StabilitySystemContent) => (
                  <div
                    key={system.id}
                    className={cn(
                      "relative border p-5",
                      layersScene.choreography,
                      theme.radius.cardSm,
                      theme.colors.borderOnDark,
                      theme.colors.surfaceDarkElevated,
                    )}
                  >
                    <div className="mb-3 flex flex-col">
                      <h4
                        className={cn(
                          theme.typography.cardTitle,
                          "text-[18px] tracking-[-0.03em]",
                          theme.colors.textOnDark,
                        )}
                      >
                        {system.title}
                      </h4>
                      <p
                        className={cn(
                          "mt-1.5 line-clamp-2 text-[10px] leading-relaxed",
                          theme.colors.textOnDarkMuted,
                        )}
                      >
                        {system.narrative}
                      </p>
                    </div>

                    <ul
                      className={cn(
                        "mt-3 space-y-2.5 border-t pt-3",
                        theme.colors.borderOnDark,
                      )}
                    >
                      {system.items.map((item) => {
                        const isBulletHighlighted =
                          activeLayerId !== null &&
                          highlightedItems?.includes(item);
                        const isBulletDimmed =
                          activeLayerId !== null && !isBulletHighlighted;
                        const isNeutralBullets =
                          isFullView && activeLayerId === null;

                        return (
                          <li
                            key={item}
                            className="flex items-center gap-2.5"
                          >
                            <span
                              className={cn(
                                layersScene.choreography,
                                isBulletHighlighted && layersScene.bulletActive,
                                isBulletDimmed && layersScene.bulletInactive,
                                isNeutralBullets && layersScene.bulletNeutral,
                                !isBulletHighlighted &&
                                  !isBulletDimmed &&
                                  !isNeutralBullets &&
                                  layersScene.bulletNeutral,
                              )}
                            />
                            <span
                              className={cn(
                                "font-mono text-[11px] leading-snug",
                                layersScene.choreography,
                                isBulletHighlighted &&
                                  cn(
                                    "font-semibold",
                                    theme.colors.textOnDark,
                                  ),
                                isBulletDimmed && "text-slate-500",
                                isNeutralBullets && "text-slate-300",
                                !isBulletHighlighted &&
                                  !isBulletDimmed &&
                                  !isNeutralBullets &&
                                  "text-slate-300",
                              )}
                            >
                              {item}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
