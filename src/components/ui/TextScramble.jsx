import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const TextScramble = ({ 
  text, 
  className = "", 
  duration = 1500,
  as: Component = "span",
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || (once && hasAnimated)) return;
    
    setHasAnimated(true);
    const originalText = text;
    const length = originalText.length;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic for smooth reveal
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const revealedCount = Math.floor(easeProgress * length);
      
      let result = "";
      for (let i = 0; i < length; i++) {
        if (originalText[i] === " ") {
          result += " ";
        } else if (i < revealedCount) {
          result += originalText[i];
        } else {
          // Random character that changes each frame
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setDisplayText(result);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(originalText);
      }
    };
    
    animate();
  }, [isInView, text, duration, once, hasAnimated]);

  return (
    <Component ref={ref} className={className}>
      {displayText}
    </Component>
  );
};

// Hover scramble effect
export const HoverScramble = ({ 
  text, 
  className = "",
  scrambleDuration = 600
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    const originalText = text;
    const length = originalText.length;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / scrambleDuration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const revealedCount = Math.floor(easeProgress * length);
      
      let result = "";
      for (let i = 0; i < length; i++) {
        if (originalText[i] === " ") {
          result += " ";
        } else if (i < revealedCount) {
          result += originalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setDisplayText(result);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(originalText);
      }
    };
    
    animate();
  }, [isHovered, text, scrambleDuration]);

  return (
    <span 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
};

export default TextScramble;
