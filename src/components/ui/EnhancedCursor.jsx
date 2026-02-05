import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const EnhancedCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower spring for the glow
  const glowSpringConfig = { damping: 30, stiffness: 100 };
  const glowXSpring = useSpring(cursorX, glowSpringConfig);
  const glowYSpring = useSpring(cursorY, glowSpringConfig);

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hoverable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hoverable")
      ) {
        setIsHovering(true);
        
        // Check for specific cursor variants
        if (target.dataset.cursor || target.closest("[data-cursor]")) {
          setCursorVariant(target.dataset.cursor || target.closest("[data-cursor]").dataset.cursor);
        }
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "#111827",
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(253, 224, 71, 0.3)",
    },
    text: {
      width: 4,
      height: 32,
      backgroundColor: "#111827",
      borderRadius: 2,
    },
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={isHovering ? "hover" : cursorVariant}
        variants={variants}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998] rounded-full border border-gray-900/30"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Ambient glow */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 pointer-events-none z-[9997] rounded-full"
        style={{
          x: glowXSpring,
          y: glowYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(253, 224, 71, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 10, height: 10, opacity: 0.5 }}
          animate={{ width: 50, height: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full rounded-full border-2 border-gray-900/30" />
        </motion.div>
      )}
    </>
  );
};

export default EnhancedCursor;
