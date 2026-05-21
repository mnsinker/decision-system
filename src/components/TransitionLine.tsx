"use client";

import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  dark?: boolean;
};

export default function TransitionLine({ text, dark = false }: Props) {
  const { theme } = useTheme();

  const lineTone = dark
    ? "bg-gradient-to-b from-transparent via-indigo-400/35 to-transparent"
    : "bg-gradient-to-b from-transparent via-indigo-300/70 to-transparent";

  const axisTone = dark
    ? "bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"
    : "bg-gradient-to-r from-transparent via-slate-300 to-transparent";

  return (
    <div className="mb-4 flex flex-col items-center py-3">
      <div className={cn("h-5 w-px", lineTone)} />

      <div className="flex items-center gap-2.5">
        <div className={cn("h-px w-8", axisTone)} />

        <div
          className={cn(
            theme.radius.chip,
            theme.typography.transitionBridge,
            "border px-3.5 py-1",
            dark
              ? cn(
                  theme.colors.borderOnDark,
                  theme.colors.textAccentSoft,
                  "bg-white/[0.04]",
                )
              : cn(
                  theme.colors.borderAccent,
                  theme.colors.surfacePrimary,
                  theme.colors.textAccentStrong,
                ),
          )}
        >
          {text}
        </div>

        <div className={cn("h-px w-8", axisTone)} />
      </div>

      <div className={cn("h-5 w-px", lineTone)} />
    </div>
  );
}
