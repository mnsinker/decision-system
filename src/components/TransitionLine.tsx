"use client";

import { useTheme } from "@/design-system/runtime/useTheme";
import { atmospheric } from "@/design-system/atmospheric";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  dark?: boolean;
};

/**
 * Embedded narrative bridge — vertical axis, chapter chip, local mist.
 * Not a dashboard HR divider; not a floating sticker stage.
 */
export default function TransitionLine({ text, dark = false }: Props) {
  const { theme } = useTheme();

  const lineTone = dark
    ? "bg-gradient-to-b from-transparent via-white/30 to-transparent"
    : "bg-gradient-to-b from-transparent via-slate-400/75 to-transparent";

  const axisTone = dark
    ? "bg-gradient-to-r from-transparent via-white/22 to-transparent"
    : "bg-gradient-to-r from-transparent via-slate-400/50 to-transparent";

  return (
    <div className="relative flex flex-col items-center py-2">
      <div
        className={
          dark ? atmospheric.bridgeClusterMistDark : atmospheric.bridgeClusterMist
        }
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className={cn("h-4 w-px", lineTone)} />

        <div className="flex items-center gap-2.5 py-0.5">
          <div className={cn("h-px w-9", axisTone)} />

          <div
            className={cn(
              theme.radius.chip,
              theme.typography.transitionBridge,
              "border px-3.5 py-1",
              dark
                ? "border-white/18 bg-white/[0.08] text-slate-300 shadow-sm backdrop-blur-sm"
                : "border-slate-300/80 bg-white text-slate-600 shadow-sm backdrop-blur-sm",
            )}
          >
            {text}
          </div>

          <div className={cn("h-px w-9", axisTone)} />
        </div>

        <div className={cn("h-4 w-px", lineTone)} />
      </div>
    </div>
  );
}
