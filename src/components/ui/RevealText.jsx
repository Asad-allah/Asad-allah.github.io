import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Word by word reveal
export const WordReveal = ({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  staggerDelay = 0.05,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });
  
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={{ perspective: 500 }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`mr-[0.25em] inline-block ${wordClassName}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Character by character reveal
export const CharReveal = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });
  
  const chars = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Line reveal with mask
export const LineReveal = ({
  children,
  className = "",
  delay = 0,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Blur reveal
export const BlurReveal = ({
  children,
  className = "",
  delay = 0,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(20px)" }
      }
      transition={{
        duration: 1,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default { WordReveal, CharReveal, LineReveal, BlurReveal };
