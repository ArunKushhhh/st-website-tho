import { useState, useEffect } from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    let timeoutId;

    const updateScreenSize = () => {
      // Debounce resize events to prevent excessive updates
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150); // 150ms debounce
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize, { passive: true });

    return () => {
      window.removeEventListener("resize", updateScreenSize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return screenSize;
};
