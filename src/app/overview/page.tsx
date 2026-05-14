import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "./_sections/HeroSection";
import ChallengesSection from "./_sections/ChallengesSection";
import LifecycleSection from "./_sections/LifecycleSection";
import UseCasesSection from "./_sections/UseCasesSection";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">

      <Navbar />

      <HeroSection />

      <ChallengesSection />

      <LifecycleSection />

      <UseCasesSection />

      <Footer />

    </div>
  );
}