import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MagneticButton = ({
  children,
  className = "",
  strength = 0.3,
  rotationStrength = 0.1,
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);

    // Add subtle rotation based on position
    rotateX.set(-(e.clientY - centerY) * rotationStrength);
    rotateY.set((e.clientX - centerX) * rotationStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block ${className}`}
      style={{
        perspective: 500,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
        
        {/* Magnetic glow effect */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-inherit"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: "radial-gradient(circle, rgba(253, 224, 71, 0.3) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Enhanced magnetic wrapper for any element
export const MagneticWrapper = ({
  children,
  className = "",
  strength = 0.2,
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
