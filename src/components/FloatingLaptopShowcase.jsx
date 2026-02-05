import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const works = [
    {
        id: "01",
        name: "VocabMaster",
        cat: "AI Platform",
        desc: "A next-generation language learning platform powered by RAG and Agentic workflows. It personalizes curriculum in real-time based on learner progress, making mastery faster and more intuitive.",
        link: "https://github.com/assadAllah630/vocab-web",
        image: "/images/vocab_showcase.png?v=7"
    },
    {
        id: "02",
        name: "Sheikh Al Jabal Store",
        cat: "E-Commerce",
        desc: "An enterprise-grade Flutter application built with Clean Architecture. Features robust state management, scalable product catalogs, and a seamless checkout experience designed for high performance.",
        link: "https://github.com/mahmoodhamdi/TStore",
        image: "/images/tstore_showcase.png"
    },
    {
        id: "03",
        name: "Backup POS",
        cat: "System Utility",
        desc: "Offline-first retail resilience engineering. Ensures business continuity with local data synchronization, allowing transactions to proceed smoothly even during internet outages.",
        link: "https://github.com/assadAllah630/Backup_POS",
        image: "/images/backup_pos_showcase.png"
    }
];

const FloatingLaptopShowcase = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    
    // Smooth scrolling progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const index = Math.min(
                Math.floor(latest * works.length),
                works.length - 1
            );
            setActiveIndex(Math.max(0, index));
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Floating animation
    const laptopY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

    return (
        <section id="work" className="bg-[#FAFAFA] relative">
            
            {/* Scrollable Container - Drastically reduced height for faster transitions */}
            <div 
                ref={containerRef} 
                className="relative"
                style={{ height: `${(works.length + 0.5) * 40}vh` }} 
            >
                {/* Fixed Sticky Viewport */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center py-8">
                    
                    {/* Header - Now part of the sticky container (Fixes spacing issue) */}
                    <div className="container max-w-6xl mx-auto text-center mb-4 lg:mb-8 flex-none z-20">
                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-2 block">
                            03 / Impact
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900">
                            Selected Works
                        </h2>
                    </div>

                    <div className="container max-w-[90rem] mx-auto px-4 w-full flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 min-h-0">
                        
                        {/* 3D Floating Laptop - Make it BIGGER */}
                        <div className="relative w-full lg:w-[65%] perspective-[2000px] flex items-center justify-center">
                            <motion.div
                                style={{ y: laptopY }}
                                className="relative transform-preserve-3d w-full max-w-4xl" 
                            >
                                {/* Floating Animation Wrapper */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotateX: [0, 1, 0],
                                        rotateY: [-1, 1, -1]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="relative transform-preserve-3d"
                                >
                                    {/* Shadow */}
                                    <div 
                                        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-black/10 blur-3xl opacity-60 rounded-full"
                                        style={{ transform: "rotateX(90deg) translateZ(-50px)" }}
                                    />

                                    {/* Laptop Body - Light/Silver Theme */}
                                    <div 
                                        className="relative rounded-[2rem] p-[3px] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 shadow-2xl overflow-hidden transform-preserve-3d"
                                    >
                                        {/* Texture */}
                                        <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />
                                        
                                        {/* Inner Bezel */}
                                        <div className="relative bg-[#1a1a1a] rounded-[28px] p-3 md:p-4 overflow-hidden">
                                            {/* Screen Container */}
                                            <div className="relative aspect-[16/10] bg-black rounded-xl overflow-hidden border border-gray-800">
                                                
                                                {/* Screen Content - Pure Fade Transitions */}
                                                <div className="absolute inset-0 z-10 bg-black">
                                                    <AnimatePresence mode="wait">
                                                        <motion.div
                                                            key={activeIndex}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.4, ease: "linear" }} 
                                                            className="absolute inset-0 w-full h-full"
                                                        >
                                                            <div className="relative w-full h-full">
                                                                <img
                                                                    src={works[activeIndex].image}
                                                                    alt={works[activeIndex].name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                {/* Cinematic Overlay */}
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40 mix-blend-multiply" />
                                                            </div>
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </div>

                                                {/* Screen Reflection/Glare */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none z-20" />
                                                
                                                {/* Camera */}
                                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a0a0a] rounded-full z-30 ring-1 ring-gray-700/50" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Laptop Base (Keyboard Area) */}
                                    <div 
                                        className="relative -mt-2 h-4 md:h-6 mx-[3%] bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-2xl shadow-lg transform-preserve-3d"
                                        style={{ 
                                            transform: "rotateX(-70deg)", 
                                            transformOrigin: "top"
                                        }}
                                    >
                                        {/* Touchpad Indent */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-0.5 bg-gray-400/50 rounded-full" />
                                    </div>
                                    
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Project Info Panel */}
                        <div className="w-full lg:w-[30%] relative h-auto flex flex-col justify-center text-center lg:text-left z-30">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 20 }} 
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }} 
                                    className="flex flex-col items-center lg:items-start"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest border border-gray-200 px-3 py-1 rounded-full">
                                            Project 0{activeIndex + 1}
                                        </span>
                                        <span className="h-px w-8 bg-gray-300" />
                                        <span className="text-xs font-mono font-medium text-gray-500 uppercase tracking-wider">
                                            {works[activeIndex].cat}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter leading-none">
                                        {works[activeIndex].name}
                                    </h3>

                                    <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 font-light">
                                        {works[activeIndex].desc}
                                    </p>

                                    <a
                                        href={works[activeIndex].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-medium text-sm tracking-wide rounded-full hover:bg-black transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        View Project
                                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                                    </a>
                                </motion.div>
                            </AnimatePresence>

                            {/* Progress Indicators */}
                            <div className="flex justify-center lg:justify-start gap-2 mt-8">
                                {works.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            i === activeIndex 
                                                ? "w-8 bg-gray-900" 
                                                : "w-1.5 bg-gray-200"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </section>
    );
};

export default FloatingLaptopShowcase;
