import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ArchitectureHero from "./_sections/ArchitectureHero";
import ArchitecturePressure from "./_sections/ArchitecturePressure";

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navbar />

      <ArchitectureHero />

      <ArchitecturePressure />

      <Footer />
    </main>
  );
}
