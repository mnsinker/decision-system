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
  interpretationLabel = "System interpretation",
}: {
  challenge: any;
  interpretationLabel?: string;
}) {
  const { theme } = useTheme();
  const business = semanticVisual.businessVoice;
  const businessCase = semanticVisual.businessCase;
  const interpretationLines: string[] =
    challenge.interpretationPoints ?? [];

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
          <div className={cn(business.zone, "p-8 md:p-10 lg:pr-10")}>
            <div className="max-w-[15.5rem] space-y-5">
              <div className={business.moduleLabel}>
                <MessageSquare size={14} className={business.moduleIcon} />
                {challenge.businessLabel}
              </div>

              <blockquote className={business.quote}>
                “{challenge.businessQuote}”
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

        <div
          className={cn(
            "relative overflow-hidden border-t p-6 md:p-8",
            theme.colors.borderMuted,
            theme.colors.surfaceMuted,
          )}
        >
          <div
            className="
              absolute -bottom-20 -left-20
              h-64 w-64
              rounded-full
              bg-rose-500/5
              blur-[80px]
              pointer-events-none
            "
          />

          <div
            className="
              absolute left-1/2 top-0
              hidden
              -translate-x-1/2
              -translate-y-1/2
              lg:block
            "
          >
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-slate-200" />

              <div
                className="
                  rounded-full
                  bg-slate-900
                  p-2.5
                  text-white
                  shadow-xl
                  ring-4 ring-white
                "
              >
                <ArrowDown
                  size={14}
                  className="text-rose-400"
                  fill="currentColor"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <div
              className="
                grid items-start gap-8
                md:grid-cols-[200px_1fr]
              "
            >
              <div>
                <div className={businessCase.moduleLabel}>
                  <Activity size={12} className={businessCase.moduleIcon} />

                  {challenge.consequenceLabel}
                </div>
              </div>

              <div className="space-y-4">
                <h4
                  className={cn(
                    theme.typography.cardTitle,
                    theme.colors.textPrimary,
                  )}
                >
                  {challenge.consequenceTitleBeg}{" "}
                  <span className="relative inline-block">
                    <span className={businessCase.outcomeHighlight}>
                      {challenge.consequenceHighlight}
                    </span>

                    <span className={businessCase.outcomeHighlightRule} />
                  </span>{" "}
                  {challenge.consequenceTitleEnd}
                </h4>

                <p className={theme.typography.bodySmall}>
                  {challenge.consequenceDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
