import { useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, animate } from "framer-motion";
import { FileText, FileJson, Workflow, GitMerge, FileSpreadsheet, Database, Download, Eye, ArrowUpRight } from "lucide-react";

// ... (documents array remains same) ...
const documents = [
    {
        title: "Prodaio SRS & Plan",
        type: "Software Requirements",
        description: "Comprehensive software requirements specification for Prodaio, detailing functional scope, user stories, and system architecture.",
        tags: ["SRS", "Planning", "Prodaio"],
        icon: <FileText size={20} />,
        file: "/documents/Prodaio_SRS.pdf"
    },
    {
        title: "Wafa Telecom E-Care FRS",
        type: "Functional Spec",
        description: "Functional requirement specification for the Wafa Telecom E-Care Portal (Web & Mobile), defining user journeys and API integrations.",
        tags: ["FRS", "Telecom", "Portal"],
        icon: <Workflow size={20} />,
        file: "/documents/Wafa_ECare_FRS.pdf"
    },
    {
        title: "New SIM Architecture (HLD)",
        type: "High-Level Design",
        description: "Restructured High-Level Design (HLD) showing the architectural overhaul for the new SIM management system.",
        tags: ["Architecture", "HLD", "System Design"],
        icon: <Database size={20} />,
        file: "/documents/Wafa_SIM_HLD_V3.pdf"
    },
    {
        title: "DIVPOS Technical Docs",
        type: "Technical Documentation",
        description: "Technical reference and user manual for the DIVPOS system, covering installation, configuration, and troubleshooting.",
        tags: ["Manual", "POS", "Retail"],
        icon: <FileJson size={20} />,
        file: "/documents/Cogent_DIVPOS_Docs.pdf"
    },
    {
        title: "Strategic Market Analysis",
        type: "Business Strategy",
        description: "In-depth market positioning analysis identifying key growth opportunities and competitive landscape.",
        tags: ["Strategy", "Marketing", "Analysis"],
        icon: <GitMerge size={20} />,
        file: "/documents/Marketing_Analysis.pdf"
    },
    {
        title: "Prodaio Business Proposal",
        type: "Business Proposal",
        description: "Strategic business proposal outlining the value proposition, revenue model, and go-to-market strategy for Prodaio.",
        tags: ["Proposal", "Startup", "Business"],
        icon: <FileSpreadsheet size={20} />,
        file: "/documents/Prodaio_Proposal.pdf"
    }
];

// (Deleted duplicate component)

/**
 * PORTAL BACKGROUND 
 * (Same as Contact Pinned 'Structured Void' for seamless transition)
 */
// ... (imports)

const BusinessAnalysis = () => {
    // Scroll Logic for Portal
    const containerRef = useRef(null);
    const [isLocked, setIsLocked] = useState(false);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    // "GRAVITY WELL" - Unstoppable Momentum Scroll
    // Once crossing 0.75, the user is pulled to the destination.
    // DELAYED to give 75% of section for reading documents.
    // Direction at crossing determines target.
    const lockAndAnimateTo = (target) => {
        setIsLocked(true);
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        
        const targetEl = target === 'contact' 
            ? document.getElementById('contact')
            : containerRef.current;
        
        if (!targetEl) {
            setIsLocked(false);
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            return;
        }
        
        const targetY = targetEl.getBoundingClientRect().top + window.scrollY;
        
        animate(window.scrollY, targetY, {
            type: "tween",
            duration: 2.5, // SLOW and smooth
            ease: "easeInOut",
            onUpdate: (v) => window.scrollTo(0, v),
            onComplete: () => {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                setIsLocked(false);
            }
        });
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isLocked) return;
        
        const previous = scrollYProgress.getPrevious();
        if (previous === undefined) return;
        
        // Crossing 0.75 DOWNWARD -> Go to Contact (75% reading zone)
        if (previous < 0.75 && latest >= 0.75) {
            lockAndAnimateTo('contact');
        }
        // Crossing 0.75 UPWARD -> Go back to Analysis top
        if (previous > 0.75 && latest <= 0.75) {
            lockAndAnimateTo('analysis-top');
        }
    });

    // "INSTANT SNAP" PHYSICS (Non-Linear)
    // Scale: Slow start -> EXPLOSIVE finish (Exponential)
    const scale = useTransform(scrollYProgress, [0.85, 0.95, 1], [1, 5, 300]);
    
    // Inverse Scale: Inner content shrinks to match
    const inverseScale = useTransform(scrollYProgress, [0.85, 0.95, 1], [1, 0.2, 0.003]);
    
    // Opacity: Appears when glide begins
    const opacity = useTransform(scrollYProgress, [0.85, 0.90], [0, 1]);
    
    // Label: Disappears instantly
    const labelOpacity = useTransform(scrollYProgress, [0.85, 0.88], [1, 0]);

    // "DAY TO NIGHT" TWILIGHT GRADIENT (Organic & Bidirectional)
    // Shifted MUCH EARLIER to eliminate "White Void".
    // 0.30 (End of content) -> 0.50 (Grey) -> 0.70 (Blue Hour) -> 0.90 (Void)
    const backgroundColor = useTransform(
        scrollYProgress, 
        [0.30, 0.50, 0.70, 0.90], 
        ["#FAFAFA", "#E5E7EB", "#1e1b4b", "#050505"] // White -> Grey -> Midnight Blue -> Total Black
    );
    
    // Text needs to flip to white SOONER so it's readable against the Blue/Black sky.
    const textColor = useTransform(scrollYProgress, [0.60, 0.75], ["#111827", "#ffffff"]);

    return (
        <motion.section 
            id="analysis" 
            ref={containerRef} 
            style={{ backgroundColor, color: textColor }}
            className="relative w-full border-t border-gray-100 pb-[150vh]" // EXTENDED RUNWAY (Physical Space)
        >
            {/* ATMOSPHERE: Falling Stars (Decoupled from Portal) */}
            {/* Reveal stars earlier (0.40) to fill the empty space with life */ }
            <motion.div style={{ opacity: useTransform(scrollYProgress, [0.40, 0.60], [0, 1]) }} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                 <PortalBackground />
            </motion.div>

            {/* Subtle Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

            {/* 
                HYPER-WARP WRAPPER
                Content recedes rapidly as the portal opens.
                Updated to ensure READABILITY before the jump.
            */}
            <motion.div 
                style={{ 
                    scale: useTransform(scrollYProgress, [0.85, 1], [1, 0.8]), // Subtle shrink at end
                    opacity: useTransform(scrollYProgress, [0.70, 0.90], [1, 0]), // Fade out earlier
                    // VISUAL DEPRIVATION: Color drains out (Grayscale) as soon as we enter the void.
                    filter: useTransform(scrollYProgress, [0.40, 0.70, 0.90], ["grayscale(0%) blur(0px)", "grayscale(100%) blur(0px)", "grayscale(100%) blur(10px)"]),
                }}
                className="container max-w-7xl mx-auto relative z-10 py-32 px-6 md:px-12"
            >
                {/* HEADLINE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 pb-8"
                >
                    <div>
                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-4 block">
                            04 / The Blueprint
                        </span>
                        <h2 className="text-2xl md:text-6xl font-bold text-gray-900 mt-4 tracking-tight uppercase">
                            System Analysis <br /> <span className="text-gray-300 font-serif italic lowercase">& Documentation</span>
                        </h2>
                    </div>
                </motion.div>

                {/* PRO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc, index) => (
                        <DocumentCard key={index} doc={doc} index={index} />
                    ))}
                </div>
            </motion.div>

             {/* 
                THE SINGULARITY PORTAL (TRUE WINDOW + WARP SPEED)
                Absolute Positioned at Bottom = NO WHITESPACE GAP.
                It overlays the content perfectly.
            */}
            <div className="absolute bottom-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-50 overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                     
                     {/* SHOCKWAVE RING (Pulses out) */}
                     <motion.div 
                        style={{ scale: useTransform(scrollYProgress, [0.96, 1], [0.5, 3]), opacity: useTransform(scrollYProgress, [0.96, 1], [1, 0]) }}
                        className="absolute w-[200px] h-[200px] border border-white/20 rounded-full z-10"
                     />

                     <motion.div 
                        style={{ scale, opacity }}
                        className="relative w-[20px] h-[20px] md:w-[40px] md:h-[40px] bg-[#050505] rounded-full overflow-hidden flex items-center justify-center box-border border-[0.5px] border-white/10"
                     >
                        {/* THE VOID INSIDE (Counter-Scaled) */}
                        <motion.div 
                            style={{ scale: inverseScale }}
                            className="absolute w-[100vw] h-[100vh] flex items-center justify-center"
                        >
                            {/* STARS MOVED TO OUTER ATMOSPHERE. Portal is now just the window. */}
                        </motion.div>
                     </motion.div>
                     
                     {/* Label that fades out */}
                     <motion.span 
                        style={{ opacity: labelOpacity }}
                        className="mt-8 text-[10px] font-mono font-bold tracking-[0.3em] text-[#050505] uppercase bg-white/50 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200/50"
                     >
                        Enter The Void
                     </motion.span>
                </div>
            </div>

        </motion.section>
    );
};

const DocumentCard = ({ doc, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="group relative bg-white p-6 md:p-8 hover:bg-gray-50 transition-all duration-500 cursor-pointer border border-gray-100 hover:border-gray-300 overflow-hidden"
            onClick={() => window.open(doc.file, "_blank")}
        >
            {/* Hover Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-gray-50 rounded-full text-gray-400 group-hover:text-black group-hover:bg-white border border-transparent group-hover:border-gray-200 transition-all duration-300">
                    {doc.icon}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={20} className="text-gray-400" />
                </div>
            </div>

            <div className="mb-6">
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                    {doc.type}
                </span>
                <h3 className="text-2xl font-serif text-gray-900 italic leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {doc.title}
                </h3>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 border-l-2 border-gray-100 pl-4">
                {doc.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {doc.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-400 border border-gray-100 px-2 py-1 rounded-full group-hover:border-gray-300 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

// Updated Portal Background with "PURE MOTION" (Noise Removed)
const PortalBackground = () => {
    // 1. Client-Side Stars (Generated once on mount)
    // Fixed: Moved to useState initializer to avoid useEffect/setState render cycle
    const [stars] = useState(() => {
        return [...Array(60)].map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,     // Thicker dots
            height: `${Math.random() * 8 + 4}px`,    // RAIN DROPLETS (Short)
            duration: Math.random() * 2 + 3,         // VERY SLOW (Majestic)
            delay: Math.random() * 2,
        }));
    });

    // 2. Camera Shake (Subtle vibration)
    const shake = {
        x: [0, -2, 2, -1, 1, 0],
        y: [0, 2, -2, 1, -1, 0],
        transition: { duration: 0.2, repeat: Infinity }
    };

    return (
        <motion.div 
            className="w-full h-full bg-[#050505] relative overflow-hidden"
            animate={shake}
        >
             {/* CHROMATIC ABERRATION REMOVED: User requested removal of red/blue glow */}

             {/* NOISE REMOVED: No Static Grid or Spotlight here. Just speed lines. */}
            
            {/* 3. Falling Stars (Slow & Majestic) */}
            <div className="absolute inset-0 w-full h-full z-10">
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute bg-white rounded-full"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.width,
                            height: star.height,
                            opacity: 0.8,
                            boxShadow: "0 0 10px white" // Glow
                        }}
                        animate={{
                            scaleY: [1, 1.5, 1],
                            opacity: [0, 1, 0],
                            y: [-100, 800] // FALLING DOWN (Slow)
                        }}
                        transition={{
                            duration: star.duration * 3, // SLOWER
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default BusinessAnalysis;
