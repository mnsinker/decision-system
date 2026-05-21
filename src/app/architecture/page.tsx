"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

import ArchitectureHero from "./_sections/ArchitectureHero";
import ArchitecturePressure from "./_sections/ArchitecturePressure";

export default function ArchitecturePage() {
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

      <ArchitectureHero />

      <ArchitecturePressure />

      <Footer />
    </main>
  );
}
