import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/StBeast/banner.svg";
import stlogo from "../assets/Whitelogo.webp";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sticker1 from "../assets/StBeast/sticker1.png";
import sticker2 from "../assets/StBeast/sticker2.png";
import Tag from "../assets/tag.svg";

gsap.registerPlugin(ScrollTrigger);

// Constants for 3D carousel
const CAROUSEL_CONFIG = {
  radius: 800,
  rotationSpeed: 1,
  autoRotateInterval: 100,
  pauseDuration: 3000,
  dragSensitivity: 0.5,
};

// Constants for 2D marquee
const MARQUEE_CONFIG = {
  animationDuration: 4000,
  cardWidth: 300,
  centerCardHeight: 350,
  sideCardHeight: 300,
  cardGap: 20,
};

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    title: "Oversized Hoodie",
    description: "Ultimate comfort meets street style. Perfect for those late-night study sessions or casual hangouts with friends.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    title: "Vintage Tee",
    description: "Classic vibes with a modern twist. This vintage-inspired tee brings retro coolness to your everyday wardrobe.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    title: "Royal Blue Sweatshirt",
    description: "Bold royal blue with premium puff print detailing. Unisex oversized fit that makes a statement wherever you go.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop",
    title: "Casual Shirt",
    description: "Premium cotton casual wear that transitions from classroom to coffee shop. Effortlessly stylish and comfortable.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=500&fit=crop",
    title: "Crop Top",
    description: "Trendy crop top perfect for layering or wearing solo. Designed for confidence and comfort in equal measure.",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    title: "Beast Mode Hoodie",
    description: "Channel your inner beast with this bold hoodie. Premium fabric meets aggressive design for the ultimate power look.",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    title: "Rebel Tee",
    description: "Break the rules with style. This rebel-inspired tee features edgy graphics and superior comfort for fearless individuals.",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    title: "Thunder Sweatshirt",
    description: "Strike like thunder in this electric design. Bold colors and premium materials create the perfect storm of style and comfort.",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop",
    title: "Alpha Shirt",
    description: "Lead the pack with this alpha-inspired shirt. Designed for leaders who aren't afraid to stand out from the crowd.",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=500&fit=crop",
    title: "Fierce Crop Top",
    description: "Unleash your fierce side with this statement crop top. Bold design meets feminine power in this must-have piece.",
  },
];

// Custom hook for auto rotation (3D carousel)
const useAutoRotation = (shouldRotate, callback, interval = CAROUSEL_CONFIG.autoRotateInterval) => {
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (shouldRotate) {
      intervalRef.current = setInterval(callback, interval);
    }
  }, [callback, interval, shouldRotate]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (shouldRotate) {
      start();
    } else {
      stop();
    }
    return stop;
  }, [shouldRotate, start, stop]);

  return { start, stop };
};

// 3D Carousel Card Component
const CarouselCard = ({ product, index, rotation, hoveredIndex, activeIndex, onHover, onLeave, onClick }) => {
  const angleStep = (2 * Math.PI) / SAMPLE_PRODUCTS.length;
  const angle = index * angleStep;
  const x = Math.sin(angle) * CAROUSEL_CONFIG.radius;
  const z = Math.cos(angle) * CAROUSEL_CONFIG.radius;
  const rotateY = angle * (180 / Math.PI);

  const normalizedAngle = (((rotateY - rotation) % 360) + 360) % 360;
  const isVisible = normalizedAngle >= 0 && normalizedAngle <= 360;
  const isHovered = hoveredIndex === index || activeIndex === index;

  return (
    <div
      className="absolute"
      style={{
        width: "450px",
        height: isHovered ? "600px" : "380px",
        left: "50%",
        top: "50%",
        transform: `
          translateX(-50%) 
          translateY(-50%) 
          translateX(${x}px) 
          translateZ(${z}px) 
          rotateY(${rotateY}deg)
        `,
        transformStyle: "preserve-3d",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s, transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
        zIndex: isHovered ? 1000 : 1,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      onClick={() => onClick(index)}
    >
      <div
        className="w-full h-full rounded-lg overflow-hidden bg-gray-800"
        style={{
          boxShadow: isHovered
            ? "0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 35px 35px -5px rgba(0, 0, 0, 0.5)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          transition: "box-shadow 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover select-none"
          draggable="false"
          style={{
            userSelect: "none",
            backfaceVisibility: "hidden",
            transition: "transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(4px)",
                transform: "scaleX(-1)",
                zIndex: 1001,
              }}
            >
              <div className="text-center px-6 py-4 max-w-sm" style={{ transform: "scaleX(-1)" }}>
                <h3 className="text-2xl md:text-4xl font-bold mb-3 text-white">{product.title}</h3>
                <p className="text-lg md:text-3xl text-white leading-relaxed">{product.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="absolute top-full left-0 w-full h-24 mt-4"
        style={{
          transform: "rotateX(0deg)",
          transformOrigin: "top",
          opacity: 0.3,
          maskImage: "linear-gradient(to bottom, white 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, white 0%, transparent 100%)",
        }}
      >
        <img src={product.image} alt="" className="w-full h-full object-cover" style={{ filter: "blur(3px)" }} />
      </div>
    </div>
  );
};

// 3D Curved Carousel Component
const CurvedCarousel = ({ products = SAMPLE_PRODUCTS }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, rotation: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const handleAutoRotate = useCallback(() => {
    setRotation((prev) => prev + CAROUSEL_CONFIG.rotationSpeed);
    if (activeIndex !== null) {
      setActiveIndex(null);
    }
  }, [activeIndex]);

  const shouldAutoRotate = !isDragging && !isCarouselHovered && hoveredIndex === null;
  const { start: startAutoRotation, stop: stopAutoRotation } = useAutoRotation(shouldAutoRotate, handleAutoRotate);

  const handleDragStart = useCallback((clientX) => {
    stopAutoRotation();
    setIsDragging(true);
    setDragStart({ x: clientX, rotation });
  }, [rotation, stopAutoRotation]);

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStart.x;
    const newRotation = dragStart.rotation + deltaX * CAROUSEL_CONFIG.dragSensitivity;
    setRotation(newRotation);
    if (activeIndex !== null) {
      setActiveIndex(null);
    }
  }, [isDragging, dragStart, activeIndex]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = (e) => handleDragStart(e.clientX);
  const handleMouseMove = (e) => {
    e.preventDefault();
    handleDragMove(e.clientX);
  };

  const handleTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => {
    e.preventDefault();
    handleDragMove(e.touches[0].clientX);
  };

  const handleCarouselEnter = () => setIsCarouselHovered(true);
  const handleCarouselLeave = () => {
    setIsCarouselHovered(false);
    setIsDragging(false);
  };

  const handleCardHover = useCallback((index) => setHoveredIndex(index), []);
  const handleCardLeave = useCallback(() => setHoveredIndex(null), []);
  const handleCardClick = useCallback((index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  if (!products?.length) {
    return (
      <div className="relative w-full h-[500px] flex items-center justify-center">
        <div className="text-white text-lg">Loading carousel...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing" id="beast-carousel">
      <div
        className="relative"
        style={{
          width: "1000px",
          height: "400px",
          perspective: "800px",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.1s linear",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleCarouselLeave}
          onMouseEnter={handleCarouselEnter}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          {products.map((product, index) => (
            <CarouselCard
              key={product.id}
              product={product}
              index={index}
              rotation={rotation}
              hoveredIndex={hoveredIndex}
              activeIndex={activeIndex}
              onHover={handleCardHover}
              onLeave={handleCardLeave}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 2D Marquee Card Component
const MarqueeCard = ({ product, position, hoveredIndex, onHover, onLeave }) => {
  const isCenter = position === "center";
  const isHovered = hoveredIndex === product.id;

  const getCardHeight = () => {
    if (isCenter) return MARQUEE_CONFIG.centerCardHeight;
    return MARQUEE_CONFIG.sideCardHeight;
  };

  const getZIndex = () => {
    if (isCenter) return 100;
    return 50;
  };

  return (
    <motion.div
      className="flex-shrink-0 cursor-pointer relative"
      style={{
        width: `${MARQUEE_CONFIG.cardWidth}px`,
        height: `${getCardHeight()}px`,
        zIndex: getZIndex(),
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={onLeave}
    >
      <div
        className="w-full h-full rounded-lg overflow-hidden bg-gray-800 relative"
        style={{
          boxShadow: isCenter
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.6)"
            : "0 15px 30px -12px rgba(0, 0, 0, 0.4)",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover select-none transition-transform duration-300"
          draggable="false"
          style={{
            userSelect: "none",
            transform: "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <AnimatePresence>
          {isHovered && isCenter && (
            <motion.div
              initial={{ opacity: 1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 1, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(4px)",
                zIndex: 1000,
              }}
            >
              <div className="text-center py-4 max-w-sm">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{product.title}</h3>
                <p className="text-base md:text-lg text-white leading-relaxed">{product.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// 2D Marquee Carousel Component
const MarqueeCarousel = ({ products = SAMPLE_PRODUCTS }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const intervalRef = useRef(null);

  const startMarquee = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % products.length;
        setAnimationKey((key) => key + 1);
        return next;
      });
    }, MARQUEE_CONFIG.animationDuration);
  }, [products.length]);

  const stopMarquee = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startMarquee();
    } else {
      stopMarquee();
    }
    return stopMarquee;
  }, [isPaused, startMarquee, stopMarquee]);

  const getVisibleCards = () => {
    const leftIndex = (currentIndex - 1 + products.length) % products.length;
    const centerIndex = currentIndex;
    const rightIndex = (currentIndex + 1) % products.length;

    return [
      { ...products[leftIndex], position: "left", key: `left-${animationKey}` },
      { ...products[centerIndex], position: "center", key: `center-${animationKey}` },
      { ...products[rightIndex], position: "right", key: `right-${animationKey}` },
    ];
  };

  const handleCardHover = useCallback((cardId) => {
    setHoveredIndex(cardId);
    setIsPaused(true);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredIndex(null);
    setIsPaused(false);
  }, []);

  const handleCarouselHover = () => setIsPaused(true);
  const handleCarouselLeave = () => {
    setIsPaused(false);
    setHoveredIndex(null);
  };

  if (!products?.length) {
    return (
      <div className="relative w-full h-[450px] flex items-center justify-center">
        <div className="text-white text-lg">Loading marquee carousel...</div>
      </div>
    );
  }

  const visibleCards = getVisibleCards();

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-7xl">
        <motion.div
          key={animationKey}
          className="flex items-center justify-center py-8 relative"
          style={{
            height: `${MARQUEE_CONFIG.centerCardHeight}px`,
          }}
          onMouseEnter={handleCarouselHover}
          onMouseLeave={handleCarouselLeave}
          initial={{ x: 100, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            type: "tween",
          }}
        >
          <div className="flex items-end justify-center" style={{ gap: `${MARQUEE_CONFIG.cardGap}px` }}>
            <motion.div
              style={{
                marginLeft: `-${MARQUEE_CONFIG.cardWidth / 5}px`,
                zIndex: 50,
              }}
              initial={{ x: 50, scale: 1.1, opacity: 1 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <MarqueeCard
                product={visibleCards[0]}
                position="left"
                hoveredIndex={hoveredIndex}
                onHover={handleCardHover}
                onLeave={handleCardLeave}
              />
            </motion.div>

            <motion.div
              style={{ zIndex: 50 }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <MarqueeCard
                product={visibleCards[1]}
                position="center"
                hoveredIndex={hoveredIndex}
                onHover={handleCardHover}
                onLeave={handleCardLeave}
              />
            </motion.div>

            <motion.div
              style={{
                marginRight: `-${MARQUEE_CONFIG.cardWidth / 5}px`,
                zIndex: 50,
              }}
              initial={{ x: 100, opacity: 0.5 }}
              animate={{ x: 0, opacity: 0.7 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <MarqueeCard
                product={visibleCards[2]}
                position="right"
                hoveredIndex={hoveredIndex}
                onHover={handleCardHover}
                onLeave={handleCardLeave}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Navigation Component
const NavigationHeader = ({ showButtons, onLogoHover, onLogoLeave, onButtonClick, hoveredButton, onButtonHover }) => (
  <div className="relative z-10 pt-4 mb-4 md:pt-6 lg:pt-8 pb-2 md:pb-3 lg:pb-4">
    <div className="text-center">
      <div
        className="logo-container group inline-block cursor-pointer relative"
        onMouseEnter={onLogoHover}
        onMouseLeave={onLogoLeave}
      >
        <img src={stlogo} alt="Student Tribe Logo" className="h-12 sm:h-16 w-auto drop-shadow-lg mb-4" />

        <div
          className={`absolute left-1/2 -translate-x-1/2 sm:w-[350px] font-bold z-20 transition-all duration-300 flex justify-center bg-[#2d000a] rounded-full shadow-xl w-[400px] max-w-[90vw] h-[50px] mx-auto ${
            showButtons ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{ top: "calc(100% + 8px)" }}
          onMouseEnter={onLogoHover}
          onMouseLeave={onLogoLeave}
        >
          {["students", "brands"].map((button) => (
            <button
              key={button}
              className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm md:text-lg hover:scale-105 ${
                hoveredButton === button
                  ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                  : "bg-transparent text-gray-300 hover:text-white"
              }`}
              onClick={() => onButtonClick(button === "students" ? "main-section" : "brands-section")}
              onMouseEnter={() => onButtonHover(button)}
              onMouseLeave={() => onButtonHover("students")}
            >
              {button.charAt(0).toUpperCase() + button.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Content sections
const ContentSection = ({ title, children, className = "" }) => (
  <div className={`text-center text-white ${className}`}>
    <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-2 text-white px-4">{title}</h1>
    {children}
  </div>
);

const AppStoreButtons = () => (
  <div className="flex flex-row gap-3 md:gap-3 justify-center items-center px-4">
    {[
      {
        name: "Google Play",
        icon: (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
              fill="#01875f"
            />
            <path
              d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z"
              fill="#ffcc02"
            />
            <path d="M15.39,12L6.05,2.66L16.81,8.88L15.39,12Z" fill="#ff6f00" />
            <path d="M6.05,21.34L16.81,15.12L15.39,12L6.05,21.34Z" fill="#c23321" />
            <path
              d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5Z"
              fill="#01875f"
            />
          </svg>
        ),
      },
      {
        name: "App Store",
        icon: (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="appStoreGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e96fc" />
                <stop offset="100%" stopColor="#0052d4" />
              </linearGradient>
            </defs>
            <rect width="24" height="24" rx="5" ry="5" fill="url(#appStoreGradient)" />
            <path
              d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"
              fill="white"
            />
          </svg>
        ),
      },
    ].map((store) => (
      <a
        key={store.name}
        href="#"
        className="group flex items-center bg-red-950 hover:bg-gray-800 transition-all duration-300 rounded-lg px-3 py-3 md:px-5 md:py-2.5 hover:scale-105 transform w-[160px] h-[60px] md:w-auto md:h-auto"
      >
        <div className="flex items-center w-full justify-center">
          <div className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 flex-shrink-0">
            {store.icon}
          </div>
          <div className="text-left flex-1">
            <div className="text-xs md:text-xs text-gray-300 uppercase tracking-wide">
              {store.name === "Google Play" ? "Get it on" : "Download on"}
            </div>
            <div className="text-sm md:text-lg font-semibold text-white whitespace-nowrap">
              {store.name}
            </div>
          </div>
        </div>
      </a>
    ))}
  </div>
);

// Hook to detect screen size
const useScreenSize = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // sm breakpoint is 640px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isSmallScreen;
};

// Main Component
const StudentBeast = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("students");
  const [showFinalContent, setShowFinalContent] = useState(false);
  const isSmallScreen = useScreenSize();
  const isMobile = window.innerWidth < 768;

  const hideButtonsTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  const initialContentRef = useRef(null);
  const finalContentRef = useRef(null);

  useEffect(() => {
    if (isMobile) {
      setShowButtons(true);
    }
  }, [isMobile]);

  // Scroll to section utility
  const scrollToSection = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  // Button hover handlers
  const handleLogoHover = () => {
    if (hideButtonsTimeoutRef.current) {
      clearTimeout(hideButtonsTimeoutRef.current);
      hideButtonsTimeoutRef.current = null;
    }
    setShowButtons(true);
  };

  const handleLogoLeave = (e) => {
    const relatedTarget = e.relatedTarget;
    const currentTarget = e.currentTarget;

    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      hideButtonsTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 300);
    }
  };

  // Header + Carousel Animations
  useEffect(() => {
    const elements = {
      container: containerRef.current,
      header: headerRef.current,
      carousel: carouselRef.current,
    };

    if (!Object.values(elements).every(Boolean)) return;

    const tl = gsap.timeline();

    if (isMobile) {
      gsap.set(elements.header, { y: 0, opacity: 1 });
      gsap.set(elements.carousel, { scale: 1, opacity: 1 });
      return;
    }

    gsap.set(elements.header, { y: -50, opacity: 0 });
    gsap.set(elements.carousel, { scale: 0.96, opacity: 0 });

    const initialTrigger = ScrollTrigger.create({
      trigger: elements.container,
      start: "top 95%",
      once: true,
      onEnter: () => {
        tl.to(elements.header, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }).to(
          elements.carousel,
          { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
          0.4
        );
      },
    });

    return () => {
      initialTrigger?.kill();
      tl.kill();
    };
  }, [isMobile]);

  // Continuous Initial <-> Final Text Swap
  useEffect(() => {
    const elements = {
      initial: initialContentRef.current,
      final: finalContentRef.current,
      container: containerRef.current,
    };

    if (!elements.initial || !elements.final || !elements.container) return;

    gsap.set(elements.initial, { opacity: 1, y: 0, visibility: "visible" });
    gsap.set(elements.final, { opacity: 0, y: 50, visibility: "hidden" });

    let tl;

    const trigger = ScrollTrigger.create({
      trigger: elements.container,
      start: "top 70%",
      once: true,
      onEnter: () => {
        tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

        tl.to(elements.initial, { opacity: 1, y: 0, duration: 0.5 })
          .to(
            elements.initial,
            { opacity: 0, y: -30, duration: 0.6, ease: "power2.inOut" },
            "+=2.5"
          )
          .set(elements.initial, { visibility: "hidden" })
          .set(elements.final, { visibility: "visible" })
          .to(elements.final, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          })
          .to(
            elements.final,
            { opacity: 0, y: -30, duration: 0.6, ease: "power2.inOut" },
            "+=2.5"
          )
          .set(elements.final, { visibility: "hidden" })
          .set(elements.initial, { visibility: "visible" })
          .to(elements.initial, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
      },
    });

    return () => {
      trigger?.kill();
      tl?.kill();
    };
  }, []);

  const gradientBg = (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -1,
        background:
          "radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)",
      }}
    />
  );

  return (
    <div ref={containerRef} className=" min-h-[95vh] relative overflow-hidden " id="beast">
      {gradientBg}

      {/* Background Stickers */}
      <div className="absolute inset-0 ">
        <div
          className="absolute top-2 left-30 z-0 hidden md:block"
          style={{ transform: "rotate(6deg)" }}
        >
          <img
            src={sticker1}
            alt="Sticker"
            className="w-auto h-auto max-w-[250px] max-h-[180px] lg:max-w-[380px] lg:max-h-[260px] drop-shadow-lg"
          />
        </div>
        <div
          className="absolute bottom-8 right-20 hidden md:block"
          style={{ transform: "rotate(13deg)" }}
        >
          <img
            src={sticker2}
            alt="Sticker 2"
            className="w-auto h-auto max-w-[250px] max-h-[180px] lg:max-w-[250px] lg:max-h-[140px] drop-shadow-lg"
          />
        </div>
      </div>

      {/* Header */}
      <div ref={headerRef}>
        <NavigationHeader
          showButtons={showButtons}
          onLogoHover={handleLogoHover}
          onLogoLeave={handleLogoLeave}
          onButtonClick={scrollToSection}
          hoveredButton={hoveredButton}
          onButtonHover={setHoveredButton}
        />
        <div className="w-[90%] mx-auto sm:hidden flex flex-col gap-0 items-center mt-16">
          <div
            className="w-full h-0.5"
            style={{
              background: "radial-gradient(circle, #b8001f 100%, #7a0015 0%, #7a0015 0%)",
            }}
          />
          <div className="relative uppercase font-bold text-white">
            <p className="absolute left-1/2 -translate-x-1/2 inline-block text-[13px] top-1/2 -translate-y-1/2">
              ST beast
            </p>
            <img src={Tag} alt="" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="transition-transform duration-500"
        style={{
          transform: showButtons ? "translateY(80px)" : "translateY(0)",
        }}
      >
        {/* Initial Content */}
        <div ref={initialContentRef} className="absolute left-0 right-0">
          <ContentSection title="Beast Mode - Wear What Roars" className="" />
        </div>

        {/* Final Content */}
        <div ref={finalContentRef}>
          <ContentSection title="Download Our App Now!" className="mb-6">
            <AppStoreButtons />
          </ContentSection>
        </div>

        {/* Responsive Carousel - 2D Marquee for small screens, 3D for larger screens */}
        <div
          ref={carouselRef}
          className={`relative flex items-center justify-center px-4 md:px-4 ${
            isSmallScreen ? "mt-24" : "mt-2"
          }`}
        >
          {isSmallScreen ? (
            <MarqueeCarousel products={SAMPLE_PRODUCTS} />
          ) : (
            <CurvedCarousel products={SAMPLE_PRODUCTS} />
          )}
        </div>

        {/* Bottom Text Sections */}
        <div className="text-center px-4 md:px-6 pb-8 md:pb-12 mt-8 sm:mt-12">
          <p className="text-white text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-medium max-w-4xl mx-auto">
            From oversized fits that scream confidence to punchlines that rep your vibe — this drop is all about you.
          </p>
        </div>
      </div>

      {/* Mobile Stickers */}
      <div className="flex my-14 justify-between md:hidden ml-8">
        <div className=" " style={{ transform: "rotate(-45deg)" }}>
          <img
            src={sticker2}
            alt="Sticker 2"
            className="w-auto h-auto max-w-[160px] max-h-[120px] drop-shadow-lg opacity-90"
          />
        </div>
        <div className=" " style={{ transform: "rotate(-13deg)" }}>
          <img
            src={sticker1}
            alt="Sticker"
            className="w-auto h-auto max-w-[200px] max-h-[160px] drop-shadow-lg opacity-90"
          />
        </div>
        <div className="h-32"></div>
      </div>
    </div>
  );
};

export default StudentBeast;