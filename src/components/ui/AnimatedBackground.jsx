import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Floating orbs using divs instead of SVG for better performance */}
      <motion.div
        className="absolute top-[20%] left-[20%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(243, 244, 246, 0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[60%] right-[10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(253, 224, 71, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(209, 213, 219, 0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
