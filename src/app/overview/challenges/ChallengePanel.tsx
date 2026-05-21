"use client";

import { ArrowDown, Activity } from "lucide-react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

import ChallengeVariant1 from "./ChallengeVariant1";
import ChallengeVariant2 from "./ChallengeVariant2";
import ChallengeVariant3 from "./ChallengeVariant3";

export default function ChallengePanel({
  challenge,
}: {
  challenge: any;
}) {
  const { theme } = useTheme();

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
              "flex flex-col justify-start p-8 md:p-9 lg:pr-8",
              theme.colors.surfacePrimary,
            )}
          >
            <div className="max-w-[14.5rem] space-y-4">
              <div
                className={cn(
                  "flex items-center gap-2",
                  cn(theme.typography.moduleLabel, "text-slate-400"),
                )}
              >
                <span className="h-1 w-1 rounded-full bg-slate-300" />

                {challenge.businessLabel}
              </div>

              <blockquote
                className={cn(
                  "border-l border-slate-200/80 pl-3.5",
                  theme.typography.cardTitle,
                  "text-[19px] font-medium leading-[1.45] tracking-normal text-slate-600 not-italic",
                )}
              >
                “{challenge.businessQuote}”
              </blockquote>

              <div className="h-px w-8 bg-slate-100" />

              <p
                className={cn(
                  theme.typography.explainer,
                  "max-w-[15.5rem] font-medium leading-[1.65] text-slate-600",
                )}
              >
                {challenge.businessDescription}
              </p>
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
                <div
                  className="
                    inline-flex items-center gap-2
                    rounded
                    bg-rose-50
                    px-2 py-1
                    font-mono text-[10px]
                    font-bold uppercase
                    tracking-[0.3em]
                    text-rose-600
                  "
                >
                  <Activity size={12} />

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
                    <span className="relative z-10 text-rose-700">
                      {challenge.consequenceHighlight}
                    </span>

                    <span
                      className="
                        absolute bottom-1 left-0
                        h-2 w-full
                        bg-rose-100
                        -z-0
                      "
                    />
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
