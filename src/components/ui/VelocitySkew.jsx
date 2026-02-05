import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Container that skews based on scroll velocity
const VelocitySkew = ({
  children,
  className = "",
  maxSkew = 3,
  springConfig = { stiffness: 100, damping: 30 },
}) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  // Track scroll velocity
  const scrollVelocity = useSpring(
    useTransform(scrollY, (value) => {
      // This will be updated by a parent component or context
      return 0;
    }),
    springConfig
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        skewY: useTransform(scrollVelocity, (v) => Math.max(-maxSkew, Math.min(maxSkew, v))),
      }}
    >
      {children}
    </motion.div>
  );
};

// Text that stretches on scroll
export const StretchText = ({
  children,
  className = "",
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scaleY,
        opacity,
        transformOrigin: "center",
      }}
    >
      {children}
    </motion.div>
  );
};

// Horizontal scroll container that moves on vertical scroll
export const HorizontalScroll = ({
  children,
  className = "",
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
};

// Parallax section with multiple layers
export const ParallaxSection = ({
  children,
  className = "",
  speed = 0.5,
  direction = "vertical",
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          y: direction === "vertical" ? y : 0,
          x: direction === "horizontal" ? x : 0,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default VelocitySkew;
