"use client";

import { ArrowDown, Activity, MessageSquare } from "lucide-react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { semanticVisual } from "@/design-system/semanticVisual";
import { cn } from "@/lib/cn";

import ChallengeVariant1 from "./ChallengeVariant1";
import ChallengeVariant2 from "./ChallengeVariant2";
import ChallengeVariant3 from "./ChallengeVariant3";

export default function ChallengePanel({
  challenge,
  interpretationLabel = "System impact",
}: {
  challenge: any;
  interpretationLabel?: string;
}) {
  const { theme } = useTheme();
  const business = semanticVisual.businessVoice;
  const outcome = semanticVisual.outcomeVoice;
  const interpretationLines: string[] = challenge.interpretationPoints ?? [];

  return (
    <div className="relative">
      <div
        className={cn(
          "overflow-hidden border",
          theme.radius.shell,
          theme.colors.borderPrimary,
          theme.colors.surfacePrimary,
          theme.shadows.shell,
        )}
      >
        <div className="grid lg:grid-cols-[1fr_1.2fr]">
          <div
            className={cn(
              business.zone,
              "py-7 pr-7 pl-10 md:py-8 md:pr-8 md:pl-11 lg:pr-9 lg:pl-12",
            )}
          >
            <div className={business.cornerBloom} aria-hidden />
            <div className="relative max-w-[18rem] space-y-3.5">
              <div className={business.moduleLabel}>
                <MessageSquare size={14} className={business.moduleIcon} />
                {challenge.businessLabel}
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
                  {challenge.businessQuote}
                </span>
              </blockquote>

              <div className="space-y-2">
                <div className={business.scanLabel}>{interpretationLabel}</div>

                <ul className={business.scanList}>
                  {interpretationLines.map((line: string) => (
                    <li key={line} className={business.scanLine}>
                      <span className={business.scanMarker} aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {challenge.variant === "variant1" && (
            <ChallengeVariant1 challenge={challenge} />
          )}

          {challenge.variant === "variant2" && (
            <ChallengeVariant2 challenge={challenge} />
          )}

          {challenge.variant === "variant3" && (
            <ChallengeVariant3 challenge={challenge} />
          )}
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute top-2 left-1/2 z-30 hidden -translate-x-1/2 -translate-y-[40%] lg:block">
            <div className="flex flex-col items-center">
              <div className={outcome.connectorNode}>
                <ArrowDown
                  size={13}
                  className="text-rose-300"
                  fill="currentColor"
                />
              </div>
            </div>
          </div>

          <div className={cn(outcome.zone, "overflow-visible p-6 md:py-7")}>
            <div className={outcome.atmosphere} aria-hidden />
            <div className={outcome.atmosphereEdge} aria-hidden />

            <div className="relative z-10 mx-auto max-w-4xl lg:pt-2">
              <div className="grid items-start gap-5 md:grid-cols-[180px_1fr]">
                <div>
                  <div className={outcome.moduleLabel}>
                    <Activity size={12} className={outcome.moduleIcon} />

                    {challenge.consequenceLabel}
                  </div>
                </div>

                <div className="min-h-[3.25rem] space-y-3 lg:mt-2">
                  <h4
                    className={cn(
                      theme.typography.cardTitle,
                      theme.colors.textPrimary,
                    )}
                  >
                    {challenge.consequenceTitleBeg}{" "}
                    <span className="relative inline-block">
                      <span className={outcome.outcomeHighlight}>
                        {challenge.consequenceHighlight}
                      </span>

                      <span className={outcome.outcomeHighlightRule} />
                    </span>{" "}
                    {challenge.consequenceTitleEnd}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
