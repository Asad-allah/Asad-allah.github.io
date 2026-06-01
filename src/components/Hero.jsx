import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero_opt.webp";
import heroShape from "@/assets/hero_v4.png";
import MagneticDotBackground from "./ui/MagneticDotBackground";

const Hero = () => {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 500], [0, 150]); // Text moves slower
    const yImage = useTransform(scrollY, [0, 500], [0, 50]);  // Image stays grounded
    const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Scroll indicator fade
    const metaOpacity = useTransform(scrollY, [0, 800], [1, 0]); // Fade out as we leave Hero
    const metaY = useTransform(scrollY, [0, 800], [0, -50]); // Slide up slightly

    return (
        <section className="relative min-h-[110vh] w-full flex flex-col justify-start bg-[#FAFAFA] text-primary pt-12 pb-24 px-6 md:px-12 overflow-hidden">

            {/* MAGNETIC DOTS BACKGROUND */}
            <MagneticDotBackground />

            {/* Top Metadata - NOW FIXED/STICKY */}
            <motion.div
                style={{ opacity: metaOpacity, y: metaY }} // Bind scroll transforms
                className="absolute md:fixed top-12 left-0 right-0 px-6 md:px-12 flex justify-between items-start text-sm md:text-base font-mono font-medium tracking-widest text-gray-500 uppercase z-50 pointer-events-none w-full"
            >
                <div>
                    <p>Damascus, Syria</p>
                    <p>33.5138° N, 36.2765° E</p>
                </div>
                <div className="text-right">
                    <p>AI Engineer</p>
                    <p>Business Intelligence</p>
                </div>
            </motion.div>



            {/* Massive Typography & IMAGE - CENTERED STACK w/ OVERLAP */}
            <div className="relative flex-1 flex flex-col items-center justify-center w-full mt-32 md:mt-10">

                {/* TEXT GROUP (Background Layer) */}
                <div className="flex flex-col items-center justify-center z-10 pointer-events-none mix-blend-darken relative">
                    <motion.h1
                        style={{ y: yText }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-[10vw] md:text-[6vw] font-[800] tracking-[-0.04em] leading-[0.9] text-center text-gray-900 select-none whitespace-nowrap"
                    >
                        ASSAD ALLAH
                    </motion.h1>
                    <motion.h1
                        style={{ y: yText }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
                        className="text-[11vw] md:text-[7vw] font-[800] tracking-[-0.04em] leading-[0.8] text-center uppercase mt-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300"
                    >
                        ALEBRAHIM
                    </motion.h1>
                </div>

                {/* IMAGE (Foreground Layer - Overlapping) */}
                <motion.div
                    style={{ y: yImage }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative w-[85%] md:w-[45%] max-w-[600px] z-20 -mt-[12vh] md:-mt-[18vh] overflow-visible" // Mobile: Wider image, less negative margin
                >
                    <img
                        src={heroImage}
                        alt="Assad Allah Portraits"
                        className="w-full h-auto drop-shadow-2xl grayscale-[5%] contrast-110"
                        style={{
                            // Soft Fade on Bottom AND Sides to prevent "Cut Lines"
                            maskImage: 'radial-gradient(circle at center top, black 70%, transparent 100%), linear-gradient(to bottom, black 80%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 0%, black 80%, transparent 100%)' // Cleaner oval mask
                        }}
                    />
                </motion.div>

            </div>

            {/* SCROLL REVEAL TEXT - "ABOUT ME" */}
            <div className="relative z-30 w-full max-w-5xl mx-auto mt-16 px-6 text-center">
                <ScrollRevealText
                    content="I architect the bridge between *Abstract_Intelligence* and *Tangible_Impact*. As a *Visionary_Engineer*, I design *Self-Evolving_Systems* and *Agentic_Workflows* that redefine efficiency. My code is not just logic; it is *Art*—sculpted for scalability, optimized for speed, and poised to *Transform_the_Future*."
                />
            </div>

            {/* Bottom Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="flex flex-col items-center gap-2 z-30 mt-24"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-200 to-black/50" />
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
            </motion.div>

        </section >
    );
};

export default Hero;

const ScrollRevealText = ({ content }) => {
    // Split by space to get words
    const words = content.split(" ");
    const containerRef = useRef(null);

    // Track scroll progress RELATIVE to this element
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "end 0.6"] // Start animating when top of text hits 90% of viewport height
    });

    return (
        <p ref={containerRef} className="text-[5vw] md:text-[2.2vw] font-light leading-[1.6] text-gray-400 flex flex-wrap justify-center gap-x-[0.35em] gap-y-[0.1em] font-sans">
            {words.map((word, i) => {
                // Map the 0-1 scroll progress to a specific range for each word
                // Each word animates over a small chunk of the scroll
                const step = 1 / words.length;
                const start = i * step;
                const end = start + (step * 2); // Overlap slightly for smoothness

                const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                const y = useTransform(scrollYProgress, [start, end], [20, 0]);

                // Color transition from gray to black
                const color = useTransform(scrollYProgress, [start, end], ["#9CA3AF", "#111827"]);

                const isHighlight = word.startsWith("*") && word.endsWith("*");
                const cleanWord = word.replace(/\*/g, "").replace(/_/g, " ");

                if (isHighlight) {
                    return (
                        <motion.span
                            key={i}
                            style={{ opacity, y }}
                            className="relative inline-block font-serif italic font-bold text-black px-1"
                        >
                            <span className="relative z-10">{cleanWord}</span>
                            <motion.span
                                style={{ scaleX: opacity }}
                                className="absolute inset-0 bg-yellow-300/60 -skew-x-12 -rotate-1 rounded-sm -z-0 origin-left"
                            />
                        </motion.span>
                    );
                }

                return (
                    <motion.span
                        key={i}
                        style={{ opacity, y, color }}
                        className="inline-block transition-colors duration-300"
                    >
                        {cleanWord}
                    </motion.span>
                );
            })}
        </p>
    );
};
