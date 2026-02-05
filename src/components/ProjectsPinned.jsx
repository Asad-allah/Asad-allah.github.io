import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * PROJECT DATA
 */
const works = [
  {
    id: "01",
    name: "VocabMaster",
    cat: "AI Platform",
    desc: "Next-gen language learning with RAG & Agentic workflows. Built with Python, LangChain, and React.",
    link: "https://github.com/assadAllah630/vocab-web",
    color: "#FDE047", 
    image: "/images/vocab_showcase.png",
    year: "2024",
    tags: ["Python", "LangChain", "RAG", "React"],
    shapes: ["torus-knot", "sphere-grid", "helix"]
  },
  {
    id: "02",
    name: "Sheikh Al Jabal",
    cat: "E-Commerce",
    desc: "Enterprise Flutter application with Clean Architecture. Delivers a full-featured mobile shopping experience.",
    link: "https://github.com/mahmoodhamdi/TStore",
    color: "#3B82F6", 
    image: "/images/tstore_showcase.png",
    year: "2024",
    tags: ["Flutter", "Dart", "Clean Arch"],
    shapes: ["pyramid-cluster", "cube-outline", "ring"]
  },
  {
    id: "03",
    name: "Backup POS",
    cat: "System Utility",
    desc: "Offline-first resilience engineering for retail. Ensures business continuity during network outages.",
    link: "https://github.com/assadAllah630/Backup_POS",
    color: "#F97316", 
    image: "/images/backup_pos_showcase.png",
    year: "2023",
    tags: ["C#", "SQL Server", "WPF"],
    shapes: ["dodecahedron", "cylinder-slice", "wave"]
  }
];

/**
 * SUB-COMPONENTS & UTILS
 */

// Fix for Hook Rule Violation: Extracted Word component
const RevealWord = ({ word, i, step, range, progress }) => {
  const start = range[0] + i * step;
  const end = start + step * 2;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  
  return (
    <motion.span style={{ opacity, y }} className="relative inline-block">
      {word}
    </motion.span>
  );
};

const ScrollRevealText = ({ text, progress, range = [0, 1] }) => {
  const words = text.split(" ");
  const step = (range[1] - range[0]) / words.length;

  return (
    <p className="text-gray-900 leading-[1.4] md:leading-[1.6] mb-4 md:mb-8 text-sm md:text-xl flex flex-wrap gap-x-1.5 md:gap-x-2 font-medium">
      {words.map((word, i) => (
        <RevealWord 
          key={i} 
          word={word} 
          i={i} 
          step={step} 
          range={range} 
          progress={progress} 
        />
      ))}
    </p>
  );
};

/**
 * ABSTRACT ARTISTIC SVG SHAPES
 */
const AbstractShape = ({ type, color, className }) => {
  const stroke = color;
  
  // Reusing shapes with slight variations for uniqueness
  if (type === "torus-knot" || type === "dodecahedron") return (
    <svg viewBox="0 0 200 200" className={className}>
      <path d="M100,20 Q130,20 150,50 T180,100 T150,150 T100,180 T50,150 T20,100 T50,50 T100,20" 
            fill="none" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.8" />
      <path d="M100,30 Q120,30 140,55 T160,100 T140,145 T100,170 T60,145 T40,100 T60,55 T100,30" 
            fill="none" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
  
  if (type === "sphere-grid" || type === "cylinder-slice") return (
    <svg viewBox="0 0 200 200" className={className}>
      <circle cx="100" cy="100" r="60" fill="none" stroke={stroke} strokeWidth="0.8" strokeDasharray="4 4" />
      <ellipse cx="100" cy="100" rx="60" ry="25" fill="none" stroke={stroke} strokeWidth="1" transform="rotate(45 100 100)" />
      <ellipse cx="100" cy="100" rx="60" ry="25" fill="none" stroke={stroke} strokeWidth="1" transform="rotate(-45 100 100)" />
    </svg>
  );

  return (
    <svg viewBox="0 0 100 100" className={className}>
      <rect x="25" y="25" width="50" height="50" rx="12" stroke={stroke} strokeWidth="1.5" fill="none" transform="rotate(15 50 50)" />
      <rect x="25" y="25" width="50" height="50" rx="12" stroke={stroke} strokeWidth="1" fill="none" transform="rotate(-15 50 50)" opacity="0.6" />
    </svg>
  );
};

/**
 * FLOATING BACKGROUND: Step Back Logic
 */
const FloatingScene = ({ totalProgress }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#FAFAFA]">
      {works.map((work, i) => (
        <ProjectBackgroundSet 
           key={work.id} 
           work={work} 
           index={i} 
           totalProgress={totalProgress} 
        />
      ))}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
    </div>
  );
};

const ProjectBackgroundSet = ({ work, index, totalProgress }) => {
  const distance = useTransform(totalProgress, (v) => v - index);

  // -- "STEP BACK" LOGIC --
  // Active (0): Opacity 1, Scale 1, Blur 0
  // Step Back (-1, 1): Opacity 0.15, Scale 0.8, Blur 4px, Grayscale 100%
  // Far Away (-2, 2): Opacity 0
  
  const opacity = useTransform(distance, [-2, -1, 0, 1, 2], [0, 0.15, 0.9, 0.15, 0]);
  const scale = useTransform(distance, [-1, 0, 1], [0.75, 1, 0.75]);
  const blur = useTransform(distance, [-1, 0, 1], ["6px", "0px", "6px"]);
  const grayscale = useTransform(distance, [-0.8, 0, 0.8], ["100%", "0%", "100%"]); 

  return (
    <motion.div 
      className="absolute inset-0 will-change-transform" 
      style={{ 
        opacity, 
        scale, 
        filter: useTransform([blur, grayscale], ([b, g]) => `blur(${b}) grayscale(${g})`) 
      }}
    >
       {/* 3 Distributed Objects */}
       <FloatingObject type={work.shapes[0]} color={work.color} baseX="80%" baseY="15%" animateX={[-30, 30]} animateY={[-15, 15]} duration={8} distance={distance} />
       <FloatingObject type={work.shapes[1] || "cube"} color={work.color} baseX="10%" baseY="65%" animateX={[20, -20]} animateY={[30, -30]} duration={10} distance={distance} />
       <FloatingObject type={work.shapes[2] || "helix"} color={work.color} baseX="15%" baseY="20%" animateX={[-20, 20]} animateY={[-20, 20]} duration={9} distance={distance} />
    </motion.div>
  );
};

const FloatingObject = ({ type, color, baseX, baseY, animateX, animateY, duration, distance }) => {
  // Parallax shift based on scroll
  const yShift = useTransform(distance, [-1, 1], [150, -150]);
  
  return (
    <motion.div
      className="absolute w-40 h-40 md:w-64 md:h-64 opacity-80"
      style={{ left: baseX, top: baseY, y: yShift }}
    >
      <motion.div
        animate={{ x: animateX, y: animateY }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: duration, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <AbstractShape type={type} color={color} className="w-full h-full drop-shadow-xl" />
      </motion.div>
    </motion.div>
  )
}

/**
 * INDIVIDUAL PROJECT CARD LAYER
 */
const ProjectCardLayer = ({ work, index, totalProgress }) => {
  const layerProgress = useTransform(totalProgress, (v) => v - index);
  // Extneded range for rendering safety
  const display = useTransform(layerProgress, (v) => (v > -2 && v < 2 ? "flex" : "none"));

  // -- TUNED FOR "FLASH" SWITCHING --
  // We compress the transition phases extremly tight.
  
  // Opacity Timeline: 
  // Very fast entry/exit
  // Enter: [-0.4 -> -0.1]
  // Active Hold: [-0.1 -> 0.5]
  // Exit: [0.5 -> 0.7]
  const opacity = useTransform(layerProgress, [-0.4, -0.1, 0.5, 0.7], [0, 1, 1, 0]);
  
  // Scale
  const scale = useTransform(layerProgress, [-0.4, 0, 0.7], [0.92, 1, 0.92]);
  const y = useTransform(layerProgress, [-0.4, 0, 0.7], [100, 0, -100]); 

  // Content Intro Animations
  const contentY = useTransform(layerProgress, [-0.15, 0], [40, 0]);
  const contentOpacity = useTransform(layerProgress, [-0.15, 0], [0, 1]);

  return (
    <motion.div
      style={{ opacity, scale, y, display, zIndex: 10 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform" 
    >
      {/* Card Content */}
      <div className="pointer-events-auto w-full max-w-[92vw] h-[65vh] md:max-w-[72rem] md:h-[75vh] bg-white/95 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row border border-white/50 ring-1 ring-black/5 backface-hidden transform-gpu">
        
        {/* TOP: IMAGE (Mobile) / LEFT: IMAGE (Desktop) */}
        <div className="w-full md:w-[48%] h-[38%] md:h-full relative overflow-hidden bg-gray-50 p-2 md:p-3">
           <div className="w-full h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative shadow-sm">
             <img 
               src={work.image} 
               alt={work.name} 
               className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
              />
             <div className="absolute inset-0 border border-black/5 rounded-[1.5rem] md:rounded-[2rem] pointer-events-none" />
           </div>
        </div>

        {/* BOTTOM: CONTENT (Mobile) / RIGHT: CONTENT (Desktop) */}
        <div className="w-full md:w-[52%] h-[62%] md:h-full p-6 md:p-14 flex flex-col justify-center relative text-left">
          
          <div className="absolute top-4 right-6 text-[6rem] md:text-[10rem] font-bold text-gray-100/50 -z-10 select-none leading-none">
            {work.id}
          </div>

          <motion.div style={{ y: contentY, opacity: contentOpacity }}>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
               <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: work.color }} />
               <span className="font-mono text-[10px] md:text-sm font-bold uppercase tracking-wider text-gray-500">
                 {work.cat} — {work.year}
               </span>
            </div>

            <h3 className="text-3xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-6 tracking-tight leading-[1.05]">
              <span className="block">{work.name}</span>
            </h3>

            <div className="mb-6 md:mb-10 max-w-lg">
              {/* Text Reveal finishes @ 0.35 */}
              <ScrollRevealText text={work.desc} progress={layerProgress} range={[-0.1, 0.3]} />
            </div>

            <div className="flex flex-wrap gap-2 mb-6 md:mb-12">
              {work.tags.map(tag => (
                <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] md:text-xs font-semibold uppercase tracking-wide">
                  {tag}
                </span>
              ))}
            </div>

            <a href={work.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 md:gap-4 group cursor-pointer">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-900 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FBBF24] group-hover:text-black shadow-xl">
                <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <span className="font-bold text-xs md:text-sm uppercase tracking-widest text-gray-900 border-b border-transparent group-hover:border-black transition-colors">
                  View Case Study
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ProgressDot = ({ index, totalProgress }) => {
  const isActive = useTransform(totalProgress, (v) => Math.abs(v - index) < 0.5);
  const width = useTransform(isActive, (active) => active ? 24 : 6);
  const color = useTransform(isActive, (active) => active ? "#111827" : "#E5E7EB");
  return (
    <motion.div 
      className="h-1.5 rounded-full transition-all duration-300"
      style={{ width, backgroundColor: color }} 
    />
  );
};

/**
 * MAIN COMPONENT
 */
const ProjectsPinned = () => {
  const containerRef = useRef(null);
  const SCROLL_PER_PROJECT = 2.0; // Aggressively reduced for fast travel
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // PHYSICS: Very snappy stiffness (150) for immediate reaction
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001
  });

  const totalProgress = useTransform(smoothProgress, [0, 1], [0, works.length]);
  
  return (
    <section 
      ref={containerRef} 
      id="work"
      className="relative bg-[#FAFAFA]"
      style={{ height: `${works.length * SCROLL_PER_PROJECT * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center will-change-transform">
        
        <FloatingScene totalProgress={totalProgress} />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 pt-8 pb-4">
           <div className="flex justify-between items-start">
             <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-[0.3em]">
                03 / Selected Works
             </span>
             <div className="flex gap-2">
              {works.map((_, i) => (
                <ProgressDot key={i} index={i} totalProgress={totalProgress} />
              ))}
            </div>
           </div>
        </div>

        {/* CARDS CONTAINER */}
        <div className="relative w-full h-[85vh] flex items-center justify-center p-4 md:p-0 z-10">
          {works.map((work, index) => (
            <ProjectCardLayer
              key={work.id}
              work={work}
              index={index}
              totalProgress={totalProgress}
            />
          ))}
        </div>

        {/* Hint */}
        <motion.div 
          style={{ opacity: useTransform(totalProgress, [0, 0.5], [1, 0]) }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-40 opacity-40 mix-blend-darken"
        >
           <div className="w-px h-10 bg-gray-400 mx-auto mb-2 animate-bounce" />
           <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Scroll</span>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectsPinned;
