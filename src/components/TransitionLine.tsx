"use client";

import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  dark?: boolean;
};

export default function TransitionLine({ text, dark = false }: Props) {
  const { theme } = useTheme();

  return (
    <div className="mb-10 flex flex-col items-center">
      {/* top line */}

      <div
        className={
          dark
            ? "h-16 w-px bg-gradient-to-b from-transparent via-indigo-400/40 to-transparent"
            : "h-16 w-px bg-gradient-to-b from-transparent via-indigo-200 to-transparent"
        }
      />

      {/* pill */}

      <div
        className={cn(
          theme.radius.pill,
          theme.typography.sectionEyebrow,
          "font-semibold tracking-[0.18em]",
          theme.shadows.sm,
          dark
            ? cn(
                theme.colors.borderOnDark,
                theme.colors.textAccentSoft,
                "bg-white/5 backdrop-blur-sm",
              )
            : cn(
                theme.colors.borderAccent,
                theme.colors.surfacePrimary,
                theme.colors.textAccentStrong,
              ),
        )}
      >
        <span className="px-5 py-2">{text}</span>
      </div>

      {/* bottom line */}

      <div
        className={
          dark
            ? "h-16 w-px bg-gradient-to-b from-transparent via-indigo-400/40 to-transparent"
            : "h-16 w-px bg-gradient-to-b from-transparent via-indigo-200 to-transparent"
        }
      />
    </div>
  );
}
