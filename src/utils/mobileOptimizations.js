// Mobile Performance Optimizations
export const isMobile = () => window.innerWidth < 768;

export const isLowEndDevice = () => {
  // Detect low-end devices
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) return true; // No WebGL support

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    // Check for low-end GPUs
    if (renderer && renderer.toLowerCase().includes("adreno")) {
      const version = parseInt(renderer.match(/adreno (\d+)/i)?.[1] || "0");
      return version < 530; // Adreno 530 and below are considered low-end
    }
  }

  // Fallback: Check memory (rough estimate)
  return navigator.deviceMemory && navigator.deviceMemory < 4;
};

export const getOptimalImageSize = (originalWidth, originalHeight) => {
  const maxDimension = isMobile() ? 800 : 1200;
  const scale = Math.min(
    maxDimension / originalWidth,
    maxDimension / originalHeight,
    1
  );

  return {
    width: Math.floor(originalWidth * scale),
    height: Math.floor(originalHeight * scale),
  };
};

export const preloadCriticalImages = async (imageSources) => {
  const promises = imageSources.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.warn("Some images failed to preload:", error);
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
