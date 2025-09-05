import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import stlogo from "../assets/Whitelogo.webp";


export const NAVIGATION = {
  STUDENTS: "students",
  BRANDS: "brands",
};
// Scenery background images
const randomPhotos = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1464822759844-d150baec0494?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1433477155337-9aea4e790195?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1441260038675-7329ab4cc264?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506142445379-d9bd755d76a2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1520637836862-4d197d17c99a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?auto=format&fit=crop&w=400&q=80",
];

// Shuffle helper
function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

// Generate random positions
function generateImagePositions(count) {
  return Array.from({ length: count }, () => ({
    top: `${Math.random() * 80 + 5}%`, // spread between 5% and 85%
    left: `${Math.random() * 80 + 5}%`, // spread between 5% and 85%
  }));
}

// Floating image style
function getFloatingImageStyle(index, positions) {
  const position = positions[index];
  const size = 60 + (index % 4) * 15; // 60, 75, 90, 105 px

  return {
    position: "absolute",
    ...position,
    width: `${size}px`,
    height: `${size}px`,
    opacity: 0,
    borderRadius: "8px",
    objectFit: "cover",
    pointerEvents: "none",
    zIndex: 1,
    transform: "translate(-50%, -50%)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    filter: "blur(0.5px)",
  };
}

export default function IntroPage() {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState("students");
  const [loadedImages, setLoadedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [positions, setPositions] = useState([]);
  const backgroundImagesRef = useRef([]);

  const [yOffset, setYOffset] = useState(() => {
    if (typeof window === "undefined") return -85;
    const h = window.innerHeight;
    // Use fixed -85 for tall screens, otherwise use ~12% of viewport height so it scales on short screens
    return h > 700 ? -85 : -Math.round(h * 0.08);
  });

  useEffect(() => {
    const update = () => {
      const h = window.innerHeight;
      const offset = h > 700 ? -85 : -Math.round(h * 0.08);
      setYOffset(offset);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  // Pick random images + scatter positions
  useEffect(() => {
    const updateImageSet = () => {
      const count = window.innerWidth < 768 ? 8 : 16;
      const shuffled = shuffleArray(randomPhotos);
      setSelectedImages(shuffled.slice(0, count));
      setPositions(generateImagePositions(count));
    };

    updateImageSet(); // run on mount
    window.addEventListener("resize", updateImageSet);
    return () => window.removeEventListener("resize", updateImageSet);
  }, []);

  // Prefetch chosen images
  useEffect(() => {
    setLoadedImages([]); // reset when selection changes
    selectedImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => [...prev, src]);
      };
    });
  }, [selectedImages]);

  // Animate floating images
  // Animate floating images
useEffect(() => {
  if (window.innerWidth < 768) {
    // For mobile: just make them visible without animation
    loadedImages.forEach((src, index) => {
      const image = backgroundImagesRef.current[index];
      if (image) {
        gsap.set(image, { opacity: 0.12 }); // static faint visibility
      }
    });
    return;
  }

  // Desktop: full animations
  loadedImages.forEach((src, index) => {
    const image = backgroundImagesRef.current[index];
    if (!image) return;

    gsap.to(image, { opacity: 0.12, duration: 1.2, ease: "power2.out" });

    const startY = Math.random() * 50 + 20;
    const endY = startY - Math.random() * 30 - 20;
    const startX = Math.random() * 20 - 10;
    const endX = startX + (Math.random() * 20 - 10);

    gsap.set(image, {
      y: startY,
      x: startX,
      scale: 0.8 + Math.random() * 0.4,
    });

    gsap.to(image, {
      y: endY,
      x: endX,
      opacity: 0.15 + Math.random() * 0.05,
      scale: 0.6 + Math.random() * 0.3,
      duration: 3 + Math.random() * 2,
      ease: "none",
      repeat: -1,
      yoyo: true,
      delay: index * 0.1 + Math.random() * 2,
    });

    gsap.to(image, {
      rotation: Math.random() * 10 - 5,
      duration: 4 + Math.random() * 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 2,
    });
  });
}, [loadedImages]);
  const handleButtonHover = useCallback((buttonType) => {
    setHoveredButton(buttonType);
  }, []);

  const handleButtonLeave = useCallback(() => {
    setHoveredButton(NAVIGATION.STUDENTS);
  }, []);

  const handleNavigation = useCallback(
    (route) => {
      navigate(route);
    
    },
    [navigate]
  );

const renderNavigationButton = useCallback(
    (buttonType, label, route) => (
          <button
            onClick={() => navigate(route)}
            onMouseEnter={() => setHoveredButton(buttonType)}
            className={`flex-1 text-lg font-bold rounded-full transition-all ${
              hoveredButton === buttonType
                ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {label}
          </button>
    ),
    [hoveredButton, handleNavigation, handleButtonHover, handleButtonLeave]
  );


  const primaryText = `Be a part of India's largest and fastest growing student community.`;
  const secondaryText = `From classrooms to career moves. We're the tribe that's with you all the way.`;

  return (
    <div
      id="main-section"
      className="relative w-full min-h-screen flex items-center justify-center p-8 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="mainscreen-gradient-bg absolute" />

      {/* Floating Images */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {selectedImages.map((src, i) => (
          <img
            key={i}
            ref={(el) => (backgroundImagesRef.current[i] = el)}
            src={loadedImages.includes(src) ? src : undefined}
            alt="floating scenery"
            style={getFloatingImageStyle(i, positions)}
            className="select-none"
          />
        ))}
      </div>

      {/* Content Layer */}
      <motion.div
        className="z-40 text-center px-4 max-w-4xl"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo */}
        <motion.div
        
          initial={{ scale: 2, y: 100 }}
          animate={{ scale: 1, y: yOffset }}
          transition={{ duration: 1 }}
        >
          <img
            src={stlogo}
            alt="logo"
            className="h-12 sm:h-16 mx-auto mb-6 drop-shadow-lg"
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex justify-center bg-[#2d000a] rounded-full shadow-xl w-[400px] max-w-[90vw] h-[50px] mx-auto mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: yOffset }}
          transition={{ duration: 0.8 }}
        >
           {renderNavigationButton(NAVIGATION.STUDENTS, "Students", "/")}
          {renderNavigationButton(NAVIGATION.BRANDS, "Brands", "/brands")}
        </motion.div>

        {/* Primary Text */}
        <motion.h1
          className="text-white font-extrabold leading-tight text-4xl sm:text-5xl md:text-6xl drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -30 }}
        >
          {primaryText.split(" ").map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Secondary Text */}
        <motion.p
          className="text-white text-base sm:text-xl mt-10 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -30 }}
        >
          {secondaryText.split(" ").map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.04 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>
    </div>
  );
}
