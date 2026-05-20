import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import OverviewHero from "./_sections/OverviewHero";
import OverviewChallenges from "./_sections/OverviewChallenges";
import OverviewLifecycle from "./_sections/OverviewLifecycle";
import OverviewUseCases from "./_sections/OverviewUseCases";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <OverviewHero />

      <OverviewChallenges />

      <OverviewLifecycle />

      <OverviewUseCases />

      <Footer />
    </div>
  );
}
