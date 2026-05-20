"use client";

import React from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
};

export default function SectionLabel({
  children,
  dark = false,
  className,
}: Props) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        theme.typography.sectionLabel,
        dark ? theme.colors.textAccentSoft : theme.colors.textAccent,
        className,
      )}
    >
      {children}
    </div>
  );
}
