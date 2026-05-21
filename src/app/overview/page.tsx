"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

import OverviewHero from "./_sections/OverviewHero";
import OverviewChallenges from "./_sections/OverviewChallenges";
import OverviewLifecycle from "./_sections/OverviewLifecycle";
import OverviewUseCases from "./_sections/OverviewUseCases";

export default function OverviewPage() {
  const { theme } = useTheme();

  return (
    <div
      className={cn("min-h-screen", theme.colors.surfacePageSubtle, theme.colors.textSecondary)}
    >
      <Navbar />

      <OverviewHero />

      <OverviewChallenges />

      <OverviewLifecycle />

      <OverviewUseCases />

      <Footer />
    </div>
  );
}
