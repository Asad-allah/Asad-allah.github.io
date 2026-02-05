import { useState, useEffect, useRef } from "react";

export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const [skewAmount, setSkewAmount] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const rafId = useRef(null);
  const velocityRef = useRef(0);

  useEffect(() => {
    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTime - lastTime.current;

      if (deltaTime > 0) {
        // Calculate velocity
        const rawVelocity = deltaY / deltaTime;
        // Clamp and smooth
        const targetVelocity = Math.max(-2, Math.min(2, rawVelocity * 20));
        velocityRef.current += (targetVelocity - velocityRef.current) * 0.1;
        
        setVelocity(velocityRef.current);
        
        // Calculate skew based on velocity (-5 to 5 degrees)
        const targetSkew = Math.max(-3, Math.min(3, velocityRef.current * 2));
        setSkewAmount(targetSkew);
      }

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
      rafId.current = requestAnimationFrame(updateVelocity);
    };

    rafId.current = requestAnimationFrame(updateVelocity);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { velocity, skewAmount };
};

export default useScrollVelocity;
