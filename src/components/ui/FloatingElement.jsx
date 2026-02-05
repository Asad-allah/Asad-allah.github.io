import { motion } from "framer-motion";

const FloatingElement = ({
  children,
  className = "",
  amplitude = 10,
  duration = 4,
  delay = 0,
  rotateAmplitude = 5,
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0, amplitude, 0],
        rotate: [0, rotateAmplitude, 0, -rotateAmplitude, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// More organic floating with different phases
export const OrganicFloat = ({
  children,
  className = "",
  baseY = 0,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: baseY }}
      animate={{
        y: [baseY, baseY - 15, baseY + 5, baseY - 10, baseY],
        x: [0, 5, -3, 2, 0],
        rotate: [0, 2, -1, 1, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax layer for depth
export const ParallaxLayer = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up", // up, down, left, right
}) => {
  const getOffset = () => {
    switch (direction) {
      case "up": return { y: [0, -50 * speed] };
      case "down": return { y: [0, 50 * speed] };
      case "left": return { x: [0, -50 * speed] };
      case "right": return { x: [0, 50 * speed] };
      default: return { y: [0, -50 * speed] };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...getOffset() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-20%" }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
