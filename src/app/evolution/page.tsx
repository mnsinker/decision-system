"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

import EvolutionUpTillNow from "./_sections/EvolutionUpTillNow";
import EvolutionLimitations from "./_sections/EvolutionLimitations";
import EvolutionRoadmap from "./_sections/EvolutionRoadmap";
import EvolutionHero from "@/app/evolution/_sections/EvolutionHero";

export default function EvolutionPage() {
  const { theme } = useTheme();

  return (
    <main
      className={cn(
        "min-h-screen",
        theme.colors.surfacePageSubtle,
        theme.colors.textStrong,
      )}
    >
      <Navbar />

      <EvolutionHero />

      <EvolutionUpTillNow />

      <EvolutionLimitations />

      <EvolutionRoadmap />

      <Footer />
    </main>
  );
}
