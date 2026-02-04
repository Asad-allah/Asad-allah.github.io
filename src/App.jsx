import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AmbientBackground from "@/components/AmbientBackground";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import StickyNav from "@/components/ui/StickyNav";
import CinematicPreloader from "@/components/ui/CinematicPreloader";
import Hero from "@/components/Hero";

import FloatingLaptopShowcase from "@/components/FloatingLaptopShowcase";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Education from "@/components/Education";
import SkillsMatrix from "@/components/SkillsMatrix";
import BusinessAnalysis from "@/components/BusinessAnalysis";
import Contact from "@/components/Contact";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <AnimatePresence>
        {loading && <CinematicPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="min-h-screen bg-[#FAFAFA] text-gray-900 antialiased overflow-clip selection:bg-yellow-300 selection:text-black relative">
          <CustomCursor />
          <StickyNav />
          <GrainOverlay />
          <AmbientBackground />

          <div className="relative z-10">
            <Hero />
            <ExperienceTimeline />
            <Education />
            <SkillsMatrix />
            <FloatingLaptopShowcase />
            <BusinessAnalysis />
            <Contact />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
