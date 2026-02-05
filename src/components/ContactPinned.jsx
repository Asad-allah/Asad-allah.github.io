import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowUpRight, Smartphone, Calendar, Linkedin, Mail } from "lucide-react";
import Magnetic from "./ui/Magnetic";

/**
 * ANIMATED BACKGROUND (Deep Space Fog)
 */
/**
 * STRUCTURED VOID BACKGROUND (High-End Grid)
 * Replaces murky gradients with sharp architectural precision.
 */
const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#050505]">
            {/* 1. Architectural Grid (Static Base) */}
            <div 
                className="absolute inset-0 opacity-[0.2]"
                style={{
                    backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                    backgroundSize: '4rem 4rem',
                    maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
                }} 
            />

            {/* 2. Drifting Spotlight (The "Alive" Element) */}
            <Motion.div 
               animate={{ 
                 x: ["-20%", "20%", "-20%"],
                 y: ["-20%", "20%", "-20%"],
                 scale: [1, 1.2, 1],
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40 blur-3xl z-10" 
            />

            {/* 3. Subtle Noise (Texture) */}
            <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA3MDAgNzAwIiB3aWR0aD0iNzAwIiBoZWlnaHQ9IjcAwIiBvcGFjaXR5PSIxIj48ZGVmcz48ZmlsdGVyIGlkPSJmIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjcAwIiBmaWxsPSIjMDAwMDAwIi8+PHJlY3Qgd2lkdGg9IjcAwIiBoZWlnaHQ9IjcAwIiBmaWxsPSIjZmZmZmZmIiBmaWx0ZXI9InVybCgjZikiIG9wYWNpdHk9IjAuMjUiLz48L3N2Zz4=')]" />
        </div>
    );
};

/**
 * ABSTRACT SHAPES (Static Wireframes - High End)
 */
const AbstractShape = ({ type, className, color }) => {
  const stroke = color || "rgba(255,255,255,0.2)"; 
  
  if (type === "signal") return (
    <svg viewBox="0 0 200 200" className={className}>
      <circle cx="100" cy="100" r="40" fill="none" stroke={stroke} strokeWidth="0.5" />
      <circle cx="100" cy="100" r="80" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
      <path d="M100,20 Q140,20 180,100 T100,180 T20,100 T100,20" fill="none" stroke={stroke} strokeWidth="1" />
      <circle cx="100" cy="100" r="10" fill={color || "white"} opacity="0.1" />
    </svg>
  );

  if (type === "blueprint") return (
    <svg viewBox="0 0 200 200" className={className}>
      <rect x="45" y="45" width="110" height="110" stroke={stroke} strokeWidth="0.8" fill="none" />
      <line x1="45" y1="45" x2="155" y2="155" stroke={stroke} strokeWidth="0.5" />
      <line x1="155" y1="45" x2="45" y2="155" stroke={stroke} strokeWidth="0.5" />
      <rect x="85" y="85" width="30" height="30" fill={color || "white"} opacity="0.05" stroke="none" />
    </svg>
  );

  if (type === "orbit") return (
    <svg viewBox="0 0 200 200" className={className}>
      <ellipse cx="100" cy="100" rx="80" ry="25" stroke={stroke} strokeWidth="0.6" transform="rotate(30 100 100)" />
      <ellipse cx="100" cy="100" rx="80" ry="25" stroke={stroke} strokeWidth="0.6" transform="rotate(-30 100 100)" />
      <circle cx="100" cy="100" r="8" fill={color || "white"} opacity="0.2" />
      <circle cx="140" cy="100" r="4" fill={color || "white"} opacity="0.2" />
    </svg>
  );

  if (type === "source") return (
    <svg viewBox="0 0 200 200" className={className}>
      <rect x="30" y="60" width="140" height="80" rx="4" fill="none" stroke={stroke} strokeWidth="0.8" />
      <path d="M30,60 L100,110 L170,60" fill="none" stroke={stroke} strokeWidth="0.8" />
      <line x1="50" y1="120" x2="90" y2="120" stroke={stroke} strokeWidth="0.5" />
      <line x1="110" y1="120" x2="150" y2="120" stroke={stroke} strokeWidth="0.5" />
    </svg>
  );

  return null;
};

/**
 * CONTACT DATA
 */
const contactOptions = [
  {
    id: "01",
    title: "Call",
    value: "+961 76 876 530",
    subtitle: "Direct Line",
    desc: "A dedicated encrypted line for immediate communication.",
    action: "WhatsApp",
    link: "https://wa.me/96176876530",
    shape: "signal",
    hoverColor: "#67E8F9", // Cyan-300
    icon: <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-white stroke-[1.5]" />
  },
  {
    id: "02",
    title: "Plan",
    value: "Book Strategy",
    subtitle: "Calendly",
    desc: "Thirty minutes to deconstruct your vision.",
    action: "Schedule",
    link: "https://calendly.com/",
    shape: "blueprint",
    hoverColor: "#C4B5FD", // Violet-300
    icon: <Calendar className="w-8 h-8 md:w-10 md:h-10 text-white stroke-[1.5]" />
  },
  {
    id: "03",
    title: "Link",
    value: "Assad Allah",
    subtitle: "LinkedIn",
    desc: "Follow the code, the insights, and the evolution.",
    action: "Connect",
    link: "https://linkedin.com/in/assad-allah-alebrahim",
    shape: "orbit",
    hoverColor: "#93C5FD", // Blue-300
    icon: <Linkedin className="w-8 h-8 md:w-10 md:h-10 text-white stroke-[1.5]" />
  },
  {
    id: "04",
    title: "Mail",
    value: "hello@example.com",
    subtitle: "Inquiries",
    desc: "Formal requests and detailed collaborations.",
    action: "Send Email",
    link: "mailto:hello@example.com",
    shape: "source",
    hoverColor: "#FCD34D", // Amber-300
    icon: <Mail className="w-8 h-8 md:w-10 md:h-10 text-white stroke-[1.5]" />
  }
];

// HELPER FOR THE 4 SHAPES
const FloatingShape = ({ type, color, position, hovered, delay }) => {
    // "Squad Reveal" Effect
    // Start: HIDDEN BEHIND (Deep Z, Small Scale, Blurry)
    // End: PROTECTING/FLANKING (Front Z, Normal Scale, Clear)
    const getCoordinates = () => {
        const d = 190; // "WITHOUT COVER CARD" - Much wider radius
        switch(position) {
            case 'top-left': return { x: -d, y: -d, r: -45 };
            case 'top-right': return { x: d, y: -d, r: 45 };
            case 'bottom-right': return { x: d, y: d, r: 135 };
            case 'bottom-left': return { x: -d, y: d, r: -135 };
            default: return { x: 0, y: 0, r: 0 };
        }
    };

    const target = getCoordinates();

    return (
        <Motion.div
            className={`absolute w-32 h-32 md:w-56 md:h-56`} 
            initial={{ 
                opacity: 0, 
                scale: 0.1, 
                x: 0, 
                y: 0, 
                z: -1200, // Deep behind
                rotate: 0, 
                filter: "blur(40px)" 
            }}
            animate={hovered ? { 
                opacity: 1, 
                scale: 1, 
                x: target.x, 
                y: target.y,
                z: 150, // "IN FRONT OF ALL" (Card is 80, this is 150)
                rotate: target.r,
                filter: "blur(0px)" 
            } : { 
                opacity: 0, 
                scale: 0.1, 
                x: 0, 
                y: 0, 
                z: -1200, 
                rotate: 0,
                filter: "blur(40px)"
            }}
            transition={{
                type: "spring",
                stiffness: 250, // "NOT SLOW" - Snappy
                damping: 25,
                mass: 0.8, // Lighter/Faster
                delay: delay * 0.5 // Faster staggering
            }}
            style={{
                top: '50%',
                left: '50%',
                marginLeft: '-7rem', 
                marginTop: '-7rem',
                zIndex: -1, // Keep behind card
                transformStyle: "preserve-3d"
            }}
        >
             {/* Inner Float Loop */}
             <Motion.div
                animate={hovered ? {
                    scale: [1, 1.05, 1],
                    y: [0, -15, 0],
                    rotateZ: [0, 5, -5, 0]
                } : {}}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-full h-full p-2"
             >
                <AbstractShape type={type} className="w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]" color={color} />
             </Motion.div>
        </Motion.div>
    );
};

/**
 * STATIC CARD COMPONENT (Dark Theme)
 */
const InteractiveCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-[350px] md:h-[400px] perspective-[2000px] z-0" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ overflow: 'visible' }} // CRITICAL: Allow shapes to flank outside bounds
    >
      {/* 
        3D SHAPES LAYER - SQUAD HIDING BEHIND
      */}
      <div 
        className="absolute inset-0 z-[-10] flex items-center justify-center pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }} // CRITICAL: Propagate 3D space to children
      >
          <FloatingShape type={item.shape} color={item.hoverColor} position="top-left" hovered={isHovered} delay={0} />
          <FloatingShape type={item.shape} color={item.hoverColor} position="top-right" hovered={isHovered} delay={0.1} />
          <FloatingShape type={item.shape} color={item.hoverColor} position="bottom-right" hovered={isHovered} delay={0.2} />
          <FloatingShape type={item.shape} color={item.hoverColor} position="bottom-left" hovered={isHovered} delay={0.3} />
      </div>

      {/* CARD CONTENT - COMES CLOSER */}
      <div 
        className={`
            relative z-10 w-full h-full bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-10 
            flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-500 ease-out fill-mode-forwards
            ${isHovered ? 'border-white/30 shadow-[0_30px_80px_rgba(0,0,0,0.6)]' : ''}
        `}
        style={{
            transform: isHovered ? 'translateZ(80px) scale(1.05)' : 'translateZ(0) scale(1)', 
            transformStyle: 'preserve-3d'
        }}
      >
         
        {/* Top: Icon & Label */}
        <div className="relative z-10 flex justify-between items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white group-hover:border-white transition-colors duration-500">
                <div className="w-6 h-6 text-white group-hover:text-black transition-colors duration-500">
                    <item.icon.type {...item.icon.props} className="w-6 h-6" /> 
                </div>
            </div>
            <div className="text-right">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#52525B] group-hover:text-white/70 transition-colors duration-500">
                    {item.subtitle}
                </span>
            </div>
        </div>

        {/* Center: Main Value */}
        <div className="relative z-10 select-text">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight tracking-tight selection:bg-yellow-500 selection:text-black">
                {item.value}
            </h3>
            <p className="text-[#A1A1AA] text-sm font-medium selection:bg-yellow-500 selection:text-black group-hover:text-white/80 transition-colors duration-500">
                {item.desc}
            </p>
        </div>

        {/* Bottom: Action (ANIMATED CTA) */}
        <div className="relative z-10">
            <Magnetic>
                 <a 
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300"
                    style={{ color: "white" }} 
                 >
                    {/* Pulsing Text */}
                    <Motion.span 
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="border-b-2 border-transparent group-hover:border-current transition-all" 
                        style={{ borderColor: 'transparent' }}
                    >
                        {item.action}
                    </Motion.span>

                    {/* Beckoning Arrow */}
                    <Motion.div
                        animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowUpRight className="w-4 h-4 text-white" />
                    </Motion.div>
                 </a>
            </Magnetic>
        </div>
      </div>
    </div>
  );
};

/**
 * MAIN COMPONENT
 */
const ContactPinned = () => {
    return (
      <section id="contact" className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-center pt-0 pb-24 md:pb-32 px-4 md:px-12 selection:bg-yellow-500 selection:text-black overflow-hidden relative z-20">
         
         {/* Structured Void Background */}
         <AnimatedBackground />

         {/* Content Wrapper */}
         <div className="relative z-10 pt-10">

         {/* Introduction */}
         <Motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="container mx-auto max-w-6xl mb-20 md:mb-24 relative z-10 text-center md:text-left"
         >
            <span 
              className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 shadow-sm font-mono text-xs font-bold text-[#71717A] uppercase tracking-widest mb-8"
            >
              • Contact
            </span>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-end justify-between">
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                   Let's Build <br/>
                   <span className="text-[#52525B]">The Future.</span>
                </h2>

                <p className="text-[#A1A1AA] text-lg md:text-xl font-medium leading-relaxed max-w-md md:text-right">
                    Ready to turn complexity into clarity? 
                    Select a channel below and let's start the conversation.
                </p>
            </div>
         </Motion.div>

        {/* 2x2 GRID LAYOUT */}
         <Motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 relative z-10 px-4 md:px-8 mb-32"
         > 
            {/* Added gap to make room for floating shapes */}
            {contactOptions.map((item) => (
                <InteractiveCard key={item.id} item={item} />
            ))}
         </Motion.div>

          {/* 
            QUICK MESSAGE FORM 
          */}
          <Motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="container mx-auto max-w-2xl relative z-10 px-4 mt-24 md:mt-32"
          >
             <div className="relative p-[1px] rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-12 text-center md:text-left shadow-2xl">
                   
                   <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                       <div>
                           <h3 className="text-2xl font-bold text-white mb-2">Quick Signal</h3>
                           <p className="text-[#A1A1AA] text-sm">Encrypted direct line. No context switching needed.</p>
                       </div>
                       <div className="hidden md:block">
                            <span className="flex items-center gap-2 text-xs font-mono text-green-400">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                ONLINE
                            </span>
                       </div>
                   </div>

                   <form 
                      onSubmit={(e) => {
                          e.preventDefault();
                          const btn = e.target.querySelector('button');
                          const originalText = btn.innerHTML;
                          
                          // Simulate Sending
                          btn.innerHTML = `<span class="animate-pulse">Transmitting...</span>`;
                          btn.disabled = true;
                          
                          setTimeout(() => {
                              // Simulate Success
                              btn.innerHTML = `<span class="text-black">Signal Received</span>`;
                              btn.style.backgroundColor = '#4ade80'; // Green-400
                              btn.style.borderColor = '#4ade80';
                              
                              e.target.reset();
                              
                              setTimeout(() => {
                                  // Reset
                                  btn.innerHTML = originalText;
                                  btn.style.backgroundColor = '';
                                  btn.style.borderColor = '';
                                  btn.disabled = false;
                              }, 3000);
                          }, 1500);
                      }}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative group/input">
                              <input required type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-mono text-sm" />
                          </div>
                          <div className="relative group/input">
                              <input required type="email" placeholder="Email / Contact" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-mono text-sm" />
                          </div>
                      </div>
                      
                      <div className="relative group/input">
                          <textarea required rows="3" placeholder="Initialize protocol..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-mono text-sm resize-none"></textarea>
                      </div>

                      <div className="flex justify-end mt-2">
                          <button type="submit" className="px-8 py-3 bg-white border border-white text-black font-bold rounded-xl hover:bg-transparent hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 group/btn">
                              <span>Execute</span>
                              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </button>
                      </div>
                   </form>
                </div>
             </div>
          </Motion.div>

         </div>
      </section>
    );
};

export default ContactPinned;
