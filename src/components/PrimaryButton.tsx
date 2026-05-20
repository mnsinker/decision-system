"use client";

import React from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
};

export default function PrimaryButton({
  children,
  onClick,
  icon,
  className = "",
}: Props) {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center transition-all",
        theme.spacing.inlineGapTight,
        theme.radius.buttonLg,
        theme.spacing.buttonPadding,
        theme.typography.button,
        theme.colors.interactivePrimary,
        theme.shadows.buttonPrimaryHover,
        className,
      )}
    >
      {children}

      {icon}
    </button>
  );
}
