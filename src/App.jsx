import { useState, useEffect } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";

// Enhanced UI Components
import EnhancedCursor from "@/components/ui/EnhancedCursor";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ParticleField from "@/components/ui/ParticleField";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GrainOverlay from "@/components/ui/GrainOverlay";
import StickyNav from "@/components/ui/StickyNav";

// Section Components
import Hero from "@/components/Hero";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Education from "@/components/Education";
import SkillsMatrix from "@/components/SkillsMatrix";
import ProjectsPinned from "@/components/ProjectsPinned";
import BusinessAnalysis from "@/components/BusinessAnalysis";
import Contact from "@/components/Contact";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Motion.div
            key="loader"
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: "-100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <div className="text-center">
              <Motion.div
                className="text-4xl md:text-6xl font-black text-white font-mono tracking-tighter mb-8"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5 }}
              >
                {"INITIALIZING".split("").map((char, i) => (
                  <Motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {char}
                  </Motion.span>
                ))}
              </Motion.div>

              <Motion.div
                className="w-48 h-1 bg-gray-800 mx-auto overflow-hidden rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Motion.div
                  className="h-full bg-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </Motion.div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      <div>
        {/* Enhanced Cursor */}
        <EnhancedCursor />

        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Background Effects */}
        <AnimatedBackground />
        <ParticleField
          particleCount={30}
          color="rgba(0, 0, 0, 0.08)"
          speed={0.3}
        />
        <GrainOverlay />

        {/* Navigation */}
        <StickyNav />

        {/* Main Content */}
        <main className="min-h-screen bg-transparent text-gray-900 antialiased selection:bg-yellow-300 selection:text-black relative">
          <div className="relative z-10">
            <Hero />
            <ExperienceTimeline />
            <Education />
            <SkillsMatrix />
            <ProjectsPinned />
            <BusinessAnalysis />
            <Contact />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
