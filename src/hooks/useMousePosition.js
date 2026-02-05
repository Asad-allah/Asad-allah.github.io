import { useState, useEffect, useRef } from "react";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      
      // Normalize to -1 to 1 range
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      setNormalizedPosition({ x: normalizedX, y: normalizedY });
    };

    const updatePosition = () => {
      setMousePosition((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.1,
        y: prev.y + (targetPos.current.y - prev.y) * 0.1,
      }));
      rafId.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { mousePosition, normalizedPosition };
};

export default useMousePosition;
