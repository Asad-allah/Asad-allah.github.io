import { useEffect } from "react";

// Simple smooth scroll implementation without external library
export const useSmoothScroll = () => {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let isScrolling = false;
    const ease = 0.075;

    const smoothScroll = () => {
      if (!isScrolling) return;

      const diff = targetScroll - currentScroll;
      
      if (Math.abs(diff) < 0.5) {
        currentScroll = targetScroll;
        window.scrollTo(0, currentScroll);
        isScrolling = false;
        return;
      }

      currentScroll += diff * ease;
      window.scrollTo(0, currentScroll);
      requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (e) => {
      e.preventDefault();
      targetScroll += e.deltaY;
      targetScroll = Math.max(
        0,
        Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
      );

      if (!isScrolling) {
        isScrolling = true;
        smoothScroll();
      }
    };

    // Only apply to main content
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);
};

export default useSmoothScroll;
