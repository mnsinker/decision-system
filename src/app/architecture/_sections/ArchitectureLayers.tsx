"use client";

import React, { useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";
import SectionHeader from "@/components/SectionHeader";
import { semanticVisual } from "@/design-system/semanticVisual";
import {
  architectureLayersContent,
  type RuntimeHighlightMapping,
  type RuntimeLayerContent,
  type RuntimeLayerId,
  type StabilitySystemContent,
} from "@/content/architecture/architectureLayers";

/** Local scene choreography — ArchitectureLayers only */
const layersScene = {
  choreography: "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
  mapMinHeight: "min-h-[520px]",
  spineCoreWidth: "max-w-xl",
  spineConnector: "my-0.5 flex h-4 items-center justify-center",
  boundaryRail: "relative h-3/4 w-px bg-gradient-to-b from-white/10 via-white/20 to-transparent",
  specAccent: "h-[2px] w-full bg-gradient-to-r from-indigo-500/40 via-emerald-500/20 to-transparent",
  /** Capability bullet — active node uses existing glow token */
  bulletActive:
    "h-1.5 w-1.5 shrink-0 scale-125 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]",
  bulletNeutral: "h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500",
  bulletInactive: "h-1 w-1 shrink-0 rounded-full bg-slate-600",
} as const;

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

type ViewMode = "core" | "expanded";

export default function ArchitectureLayers() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const content = architectureLayersContent[locale];

  const [viewMode, setViewMode] = useState<ViewMode>("core");
  const [activeLayerId, setActiveLayerId] = useState<RuntimeLayerId | null>(null);

  const isExpanded = viewMode === "expanded";
  const activeHighlights: RuntimeHighlightMapping | null = activeLayerId
    ? content.highlightsMap[activeLayerId]
    : null;
  const highlightedItems = activeHighlights?.highlightedItems ?? null;

  const activeLayerData: RuntimeLayerContent =
    content.coreLayers.find((l) => l.id === activeLayerId) ??
    content.coreLayers[0];

  const runtimeLabel = semanticVisual.runtimeVoice;

  const handleCoreView = () => {
    setViewMode("core");
    setActiveLayerId(null);
  };

  const handleExpandedView = () => {
    setViewMode("expanded");
  };

  const handleLayerClick = (layerId: RuntimeLayerId) => {
    setActiveLayerId(layerId);
    setViewMode("expanded");
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
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
            <div
              className={cn(
                "flex gap-0.5 border p-1",
                theme.radius.chip,
                theme.colors.borderOnDark,
                theme.colors.surfaceDarkPanel,
                theme.shadows.control,
                theme.shadows.tabTrackInset,
              )}
            >
              <button
                type="button"
                onClick={handleCoreView}
                className={cn(
                  theme.radius.chipSm,
                  "px-4 py-2 font-mono text-xs tracking-wide",
                  layersScene.choreography,
                  viewMode === "core"
                    ? cn(
                        theme.colors.surfaceDarkElevated,
                        theme.colors.textOnDark,
                        "font-semibold",
                        theme.shadows.sm,
                      )
                    : cn(theme.colors.textOnDarkMuted, "hover:text-slate-300"),
                )}
              >
                {content.viewModes.core}
              </button>
              <button
                type="button"
                onClick={handleExpandedView}
                className={cn(
                  theme.radius.chipSm,
                  "px-4 py-2 font-mono text-xs tracking-wide",
                  layersScene.choreography,
                  viewMode === "expanded"
                    ? cn(
                        "border border-indigo-500/30 bg-indigo-950/40 font-semibold",
                        theme.colors.textAccentSoft,
                        theme.shadows.sm,
                      )
                    : cn(theme.colors.textOnDarkMuted, "hover:text-slate-300"),
                )}
              >
                {content.viewModes.expanded}
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "relative grid items-start gap-12",
            layersScene.mapMinHeight,
            layersScene.choreography,
            isExpanded ? "lg:grid-cols-12" : "grid-cols-1",
          )}
        >
          <div
            className={cn(
              "relative z-10 space-y-4",
              layersScene.choreography,
              isExpanded
                ? "lg:col-span-5"
                : cn("mx-auto w-full", layersScene.spineCoreWidth),
            )}
          >
            <div
              className={cn(
                "mb-4 flex items-center",
                runtimeLabel.moduleLabel,
                !isExpanded && "justify-center",
              )}
            >
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {content.spineLabel}
            </div>

            {content.coreLayers.map((layer, index) => {
              const isActive = activeLayerId === layer.id;
              const showResponsibility = !isExpanded || isActive;

              return (
                <div key={layer.id} className="relative">
                  <button
                    type="button"
                    onClick={() => handleLayerClick(layer.id)}
                    className={cn(
                      "group relative w-full cursor-pointer border p-5 text-left",
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
                      <div
                        className={cn(
                          !isExpanded && "mx-auto text-center",
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            !isExpanded && "justify-center",
                          )}
                        >
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
                              !isExpanded || isActive
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
                              !isExpanded && "mx-auto max-w-md",
                            )}
                          >
                            {layer.responsibility}
                          </p>
                        )}
                      </div>
                      {isExpanded && (
                        <div
                          className={cn(
                            "mt-1 shrink-0",
                            layersScene.choreography,
                            isActive
                              ? cn(
                                  "rotate-90",
                                  theme.colors.textAccentSoft,
                                )
                              : "text-slate-500 group-hover:text-slate-300",
                          )}
                        >
                          <ChevronIcon className="h-5 w-5" />
                        </div>
                      )}
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
                  </button>

                  {index < content.coreLayers.length - 1 && (
                    <div className={layersScene.spineConnector}>
                      <div className="h-full w-px bg-white/10" />
                      <svg
                        className="absolute h-2 w-2 text-slate-600"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                        aria-hidden
                      >
                        <path d="M4 7L0 3h8L4 7z" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className={cn(
              "hidden h-full min-h-[380px] items-center justify-center lg:col-span-1 lg:flex",
              layersScene.choreography,
              !isExpanded && "lg:hidden",
            )}
          >
            <div className={layersScene.boundaryRail}>
              <div
                className={cn(
                  "absolute top-1/4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase",
                  theme.colors.borderOnDark,
                  theme.colors.surfaceDarkPanel,
                  theme.colors.textAccentSoft,
                  theme.shadows.sm,
                )}
              >
                {content.boundariesLabel}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "relative space-y-4 lg:col-span-6",
              layersScene.choreography,
              isExpanded
                ? "translate-x-0 opacity-100"
                : "pointer-events-none h-0 overflow-hidden p-0 opacity-0 translate-x-16",
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
              {content.stabilitySystems.map((system: StabilitySystemContent) => {
                const isStrong =
                  activeHighlights !== null &&
                  activeHighlights.strongSystems.includes(system.id);
                const isWeak =
                  activeHighlights !== null &&
                  activeHighlights.weakSystems.includes(system.id);
                const isSystemLinked = isStrong || isWeak;
                const hasActiveCapability = system.items.some((item) =>
                  highlightedItems?.includes(item),
                );

                return (
                  <div
                    key={system.id}
                    className={cn(
                      "relative border p-5",
                      layersScene.choreography,
                      theme.radius.cardSm,
                      theme.colors.surfaceDarkElevated,
                      isSystemLinked && hasActiveCapability
                        ? isStrong
                          ? cn(
                              theme.colors.borderSuccess,
                              theme.colors.surfaceSuccess,
                            )
                          : theme.colors.borderOnDark
                        : theme.colors.borderOnDark,
                    )}
                  >
                    <div className="mb-3 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={cn(
                            theme.typography.cardTitle,
                            "text-[18px] tracking-[-0.03em]",
                            isStrong
                              ? theme.colors.textSuccessBright
                              : isWeak
                                ? "text-slate-200"
                                : theme.colors.textOnDark,
                          )}
                        >
                          {system.title}
                        </h4>
                        {isSystemLinked && (
                          <span
                            className={cn(
                              theme.typography.monoLabel,
                              "shrink-0 rounded px-1.5 py-0.5 text-[8px]",
                              isStrong
                                ? cn(
                                    theme.colors.borderSuccess,
                                    "bg-emerald-950/50",
                                    theme.colors.textSuccessBright,
                                  )
                                : cn(
                                    theme.colors.surfaceDarkPanel,
                                    theme.colors.textOnDarkMuted,
                                  ),
                            )}
                          >
                            {isStrong ? "Active" : "Linked"}
                          </span>
                        )}
                      </div>
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
                          isExpanded && activeLayerId === null;

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
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "relative mt-14 overflow-hidden border",
            theme.radius.card,
            theme.colors.borderOnDark,
            theme.colors.surfaceDarkElevated,
            theme.shadows.panel,
          )}
        >
          <div className={layersScene.specAccent} aria-hidden />

          <div
            className={cn(
              "flex flex-col items-start justify-between gap-4 border-b px-6 py-4 md:flex-row md:items-center",
              theme.colors.borderOnDark,
              theme.colors.surfaceDarkPanel,
            )}
          >
            <span className={cn("flex items-center", runtimeLabel.moduleLabel)}>
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {content.specLabel}
            </span>

            <div
              className={cn(
                "flex w-full overflow-x-auto rounded-lg border p-0.5 whitespace-nowrap md:w-auto",
                theme.colors.borderOnDark,
                theme.colors.surfaceDarkPanel,
              )}
            >
              {content.coreLayers.map((layer) => {
                const isActive = activeLayerId === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => handleLayerClick(layer.id)}
                    className={cn(
                      theme.radius.chipSm,
                      "px-3 py-1.5 font-mono text-xs",
                      layersScene.choreography,
                      isActive
                        ? cn(
                            "border border-indigo-500/25 bg-indigo-950/60 font-semibold",
                            theme.colors.textAccentSoft,
                          )
                        : cn(
                            theme.colors.textOnDarkMuted,
                            "hover:text-slate-300",
                          ),
                    )}
                  >
                    {layer.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <div className="space-y-2">
                <div
                  className={cn(
                    "border-b pb-1.5",
                    theme.typography.monoLabel,
                    theme.colors.borderOnDark,
                    theme.colors.textOnDarkMuted,
                  )}
                >
                  {content.specFields.responsibility}
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {activeLayerData.details.responsibility}
                </p>
              </div>

              <div className="space-y-2">
                <div
                  className={cn(
                    "border-b pb-1.5",
                    theme.typography.monoLabel,
                    theme.colors.borderOnDark,
                    "text-amber-500/70",
                  )}
                >
                  {content.specFields.pressure}
                </div>
                <p
                  className={cn(
                    "text-xs leading-relaxed",
                    theme.colors.textOnDarkMuted,
                  )}
                >
                  {activeLayerData.details.pressure}
                </p>
              </div>

              <div className="space-y-2">
                <div
                  className={cn(
                    "border-b pb-1.5",
                    theme.typography.monoLabel,
                    theme.colors.borderOnDark,
                    theme.colors.textAccentSoft,
                  )}
                >
                  {content.specFields.current}
                </div>
                <div
                  className={cn(
                    "flex min-h-[56px] items-center border p-3 font-mono text-[11px] leading-normal",
                    theme.radius.chipSm,
                    theme.colors.borderOnDark,
                    theme.colors.surfaceDarkPanel,
                    theme.colors.textOnDarkMuted,
                  )}
                >
                  {activeLayerData.details.current}
                </div>
              </div>

              <div className="space-y-2">
                <div
                  className={cn(
                    "border-b pb-1.5",
                    theme.typography.monoLabel,
                    theme.colors.borderOnDark,
                    theme.colors.textSuccess,
                  )}
                >
                  {content.specFields.future}
                </div>
                <div
                  className={cn(
                    "flex min-h-[56px] items-center border p-3 font-mono text-[11px] leading-normal",
                    theme.radius.chipSm,
                    theme.colors.borderOnDark,
                    theme.colors.surfaceDarkPanel,
                    theme.colors.textOnDarkMuted,
                  )}
                >
                  {activeLayerData.details.future}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 px-2 font-mono text-xs md:grid-cols-3">
          {content.insights.map((insight) => (
            <div
              key={insight}
              className={cn(
                "flex items-start gap-2",
                theme.colors.textOnDarkMuted,
              )}
            >
              <span className={theme.colors.textAccentSoft}>[✓]</span>
              <span>{insight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
