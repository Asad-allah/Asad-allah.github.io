import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero_opt.webp";
import MagneticDotBackground from "./ui/MagneticDotBackground";
import TextScramble, { HoverScramble } from "./ui/TextScramble";
import { WordReveal, LineReveal, BlurReveal } from "./ui/RevealText";
import FloatingElement, { OrganicFloat } from "./ui/FloatingElement";
import TiltCard from "./ui/TiltCard";
import { MagneticWrapper } from "./ui/MagneticButton";

const HeroEnhanced = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const yImage = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const metaOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const metaY = useTransform(scrollY, [0, 800], [0, -50]);

  // Name letters for stagger animation
  const firstName = "ASSAD";
  const lastName = "ALLAH";
  const surname = "ALEBRAHIM";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[110vh] w-full flex flex-col justify-start bg-transparent text-primary pt-12 pb-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Magnetic Dots Background */}
      <MagneticDotBackground />

      {/* Top Metadata - Fixed/Sticky with blur fade */}
      <motion.div
        style={{ opacity: metaOpacity, y: metaY }}
        className="absolute md:fixed top-12 left-0 right-0 px-6 md:px-12 flex justify-between items-start text-sm md:text-base font-mono font-medium tracking-widest text-gray-500 uppercase z-50 pointer-events-none w-full"
      >
        <div>
          <HoverScramble text="Beirut, Lebanon" className="block" />
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            33.8938° N, 35.5018° E
          </motion.p>
        </div>
        <div className="text-right">
          <HoverScramble text="AI Engineer" className="block" />
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Business Intelligence
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full mt-32 md:mt-10">
        
        {/* TEXT GROUP with 3D perspective */}
        <div className="flex flex-col items-center justify-center z-10 pointer-events-none mix-blend-darken relative" style={{ perspective: 1000 }}>
          
          {/* First Name - Letter by letter animation */}
          <motion.div 
            style={{ y: yText }}
            className="flex overflow-hidden"
          >
            {firstName.split("").map((letter, i) => (
              <motion.span
                key={`first-${i}`}
                initial={{ y: "100%", rotateX: -90 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.05,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="text-[10vw] md:text-[6vw] font-[800] tracking-[-0.04em] leading-[0.9] text-center text-gray-900 select-none inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Last Name - ASSAD ALLAH */}
          <motion.div 
            style={{ y: yText }}
            className="flex overflow-hidden"
          >
            {lastName.split("").map((letter, i) => (
              <motion.span
                key={`last-${i}`}
                initial={{ y: "100%", rotateX: -90 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.05,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="text-[11vw] md:text-[7vw] font-[800] tracking-[-0.04em] leading-[0.8] text-center uppercase text-gray-900 select-none inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Surname - with gradient and special effect */}
          <motion.div 
            style={{ y: yText }}
            className="overflow-hidden mt-2"
          >
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="text-[11vw] md:text-[7vw] font-[800] tracking-[-0.04em] leading-[0.8] text-center uppercase text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #111827 0%, #4b5563 50%, #9ca3af 100%)",
                backgroundSize: "200% 200%",
              }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "inherit",
                  backgroundSize: "200% 200%",
                }}
              >
                {surname}
              </motion.span>
            </motion.h1>
          </motion.div>
        </div>

        {/* IMAGE with 3D tilt and floating animation */}
        <motion.div
          style={{ y: yImage, scale }}
          className="relative w-[85%] md:w-[45%] max-w-[600px] z-20 -mt-[12vh] md:-mt-[18vh]"
        >
          <OrganicFloat amplitude={8} duration={6}>
            <TiltCard 
              tiltAmount={8}
              glareEnabled={true}
              scale={1.02}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="relative overflow-visible"
              >
                <img
                  src={heroImage}
                  alt="Assad Allah Portraits"
                  className="w-full h-auto drop-shadow-2xl grayscale-[5%] contrast-110"
                  style={{
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 80%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 80%, transparent 100%)",
                  }}
                />
                
                {/* Subtle glow behind image */}
                <div 
                  className="absolute inset-0 -z-10 blur-3xl opacity-30"
                  style={{
                    background: "radial-gradient(circle at center, rgba(253, 224, 71, 0.4) 0%, transparent 70%)",
                    transform: "scale(1.2)",
                  }}
                />
              </motion.div>
            </TiltCard>
          </OrganicFloat>
        </motion.div>
      </div>

      {/* SCROLL REVEAL TEXT - Enhanced with word animations */}
      <div className="relative z-30 w-full max-w-5xl mx-auto mt-16 px-6 text-center">
        <ScrollRevealTextEnhanced
          content="I architect the bridge between *Abstract_Intelligence* and *Tangible_Impact*. As a *Visionary_Engineer*, I design *Self-Evolving_Systems* and *Agentic_Workflows* that redefine efficiency. My code is not just logic; it is *Art*—sculpted for scalability, optimized for speed, and poised to *Transform_the_Future*."
        />
      </div>

      {/* Bottom Scroll Indicator - Enhanced */}
      <motion.div
        style={{ opacity }}
        className="flex flex-col items-center gap-2 z-30 mt-24"
      >
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-gray-200 to-black/50"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{ originY: 0 }}
        />
        <motion.span 
          className="text-[10px] uppercase tracking-widest text-gray-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <TextScramble text="Scroll" duration={1000} />
        </motion.span>
      </motion.div>
    </section>
  );
};

// Enhanced scroll reveal with per-word animation
const ScrollRevealTextEnhanced = ({ content }) => {
  const words = content.split(" ");
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.6"],
  });

  return (
    <p 
      ref={containerRef} 
      className="text-[5vw] md:text-[2.2vw] font-light leading-[1.6] text-gray-400 flex flex-wrap justify-center gap-x-[0.35em] gap-y-[0.1em] font-sans"
    >
      {words.map((word, i) => {
        const step = 1 / words.length;
        const start = i * step;
        const end = start + step * 1.5;

        const wordOpacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        const wordY = useTransform(scrollYProgress, [start, end], [30, 0]);
        const wordColor = useTransform(
          scrollYProgress, 
          [start, end], 
          ["#9CA3AF", "#111827"]
        );

        const isHighlight = word.startsWith("*") && word.endsWith("*");
        const cleanWord = word.replace(/\*/g, "").replace(/_/g, " ");

        if (isHighlight) {
          return (
            <motion.span
              key={i}
              style={{ opacity: wordOpacity, y: wordY }}
              className="relative inline-block font-serif italic font-bold text-black px-1"
            >
              <span className="relative z-10">{cleanWord}</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.02 }}
                className="absolute inset-0 bg-yellow-300/60 -skew-x-12 -rotate-1 rounded-sm -z-0 origin-left"
              />
            </motion.span>
          );
        }

        return (
          <motion.span
            key={i}
            style={{ 
              opacity: wordOpacity, 
              y: wordY, 
              color: wordColor,
            }}
            className="inline-block transition-colors duration-300"
          >
            {cleanWord}
          </motion.span>
        );
      })}
    </p>
  );
};

export default HeroEnhanced;
