import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Assets
import stlogo from "../assets/Whitelogo.webp";
import robot from "../assets/BrandsSection/image 269.svg";
import iphone from "../assets/BrandsSection/iPhone.svg";
import quizImg2 from "../assets/stApp/image 271.svg";
import quizImg3 from "../assets/stApp/image 272.svg";
import quizImg4 from "../assets/stApp/image 274.svg";
import gigsImg from "../assets/stApp/image 273.svg";
import gigsImg2 from "../assets/stApp/image 2712.svg";
import Tag from "../assets/tag.svg";

// Constants
const NAVIGATION = {
  STUDENTS: "students",
  BRANDS: "brands",
};

const ANIMATION_CONFIG = {
  AUTO_SLIDE_INTERVALS: {
    QUIZ: 2000,
    GIGS: 2500,
  },
  DURATIONS: {
    SLIDE: 500,
    CARD_SCALE: 0.8,
    PHONE_SLIDE: 1.2,
    CONTENT_SLIDE: 1.0,
    MOBILE_CARD: 0.8,
  },
  MOBILE_ANIMATIONS: {
    OFFSET: 50,
    STAGGER: 0.2,
  },
};

const BREAKPOINTS = {
  MOBILE: 1024,
};

// Optimized CardSlider Component
const CardSlider = React.memo(
  ({
    cards,
    className = "",
    autoSlideInterval = 3000,
    layout = "image-title-text",
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    const containerRef = React.useRef(null);
    const autoSlideRef = React.useRef(null);

    // Memoized handlers
    const nextSlide = useCallback(() => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, [isAnimating, cards.length]);

    const prevSlide = useCallback(() => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, [isAnimating, cards.length]);

    // Auto-slide effect
    useEffect(() => {
      if (cards.length <= 1) return;

      const startAutoSlide = () => {
        autoSlideRef.current = setInterval(() => {
          if (!isDragging && !isAnimating) {
            setCurrentIndex((prev) => (prev + 1) % cards.length);
          }
        }, autoSlideInterval);
      };

      startAutoSlide();
      return () => {
        if (autoSlideRef.current) {
          clearInterval(autoSlideRef.current);
        }
      };
    }, [isDragging, isAnimating, cards.length, autoSlideInterval]);

    // Animation state reset
    useEffect(() => {
      if (isAnimating) {
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
      }
    }, [isAnimating]);

    // Drag handlers
    const handleDragStart = useCallback(
      (clientX) => {
        if (isAnimating) return;
        setIsDragging(true);
        setDragStart(clientX);
        setDragOffset(0);
      },
      [isAnimating]
    );

    const handleDragMove = useCallback(
      (clientX) => {
        if (!isDragging || !containerRef.current) return;
        const diff = clientX - dragStart;
        const containerWidth = containerRef.current.offsetWidth;
        const offset = Math.max(
          -100,
          Math.min(100, (diff / containerWidth) * 100)
        );
        setDragOffset(offset);
      },
      [isDragging, dragStart]
    );

    const handleDragEnd = useCallback(() => {
      if (!isDragging) return;
      setIsDragging(false);
      const threshold = 20;

      if (dragOffset < -threshold) {
        nextSlide();
      } else if (dragOffset > threshold) {
        prevSlide();
      }
      setDragOffset(0);
    }, [isDragging, dragOffset, nextSlide, prevSlide]);

    const getCardTransform = useCallback(
      (index) => {
        if (isDragging && index === currentIndex) {
          return `translateX(${dragOffset}%)`;
        }
        if (index === currentIndex) return "translateX(0%)";
        return index > currentIndex ? "translateX(100%)" : "translateX(-100%)";
      },
      [isDragging, currentIndex, dragOffset]
    );

    // Mouse events
    const onMouseDown = useCallback(
      (e) => handleDragStart(e.clientX),
      [handleDragStart]
    );
    const onMouseMove = useCallback(
      (e) => handleDragMove(e.clientX),
      [handleDragMove]
    );

    // Touch events
    const onTouchStart = useCallback(
      (e) => {
        e.preventDefault();
        handleDragStart(e.touches[0].clientX);
      },
      [handleDragStart]
    );

    const onTouchMove = useCallback(
      (e) => {
        e.preventDefault();
        handleDragMove(e.touches[0].clientX);
      },
      [handleDragMove]
    );

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden cursor-grab active:cursor-grabbing select-none ${className}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleDragEnd}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-transform duration-500 ease-out"
            style={{
              transform: getCardTransform(index),
              zIndex: index === currentIndex ? 2 : 1,
            }}
          >
            {typeof card === "string" ? (
              <img
                src={card}
                alt={`Slide ${index}`}
                className="w-[90%] h-[90%] object-cover rounded-xl"
                loading="lazy"
              />
            ) : (
              <div className="flex flex-col h-full w-full p-2">
                {/* Image Container - Adjusted height based on layout */}
                <div
                  className={`w-full ${
                    layout === "image-text"
                      ? "flex-[2]"
                      : layout === "image-title-text"
                      ? "h-[60%]" // Changed from h-[90%] to h-[60%]
                      : "flex-1"
                  }`}
                >
                  <img
                    src={card.image}
                    alt={card.title || `Slide ${index}`}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>

                {/* Title - Only for image-title-text layout */}
                {layout === "image-title-text" && card.title && (
                  <div className="py-1">
                    <h3 className="text-white text-center font-extrabold text-sm sm:text-sm lg:text-base px-1">
                      {card.title}
                    </h3>
                  </div>
                )}

                {/* Description - Visible for both layouts */}
                {card.description && (
                  <div
                    className={`px-1 flex-1 flex flex-col justify-center ${
                      layout === "image-text" ? "items-center" : ""
                    }`}
                  >
                    <p className="text-white text-center text-sm sm:text-sm leading-relaxed line-clamp-3 mt-1">
                      {card.description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);

CardSlider.displayName = "CardSlider";

// Main Component
export default function StudentApp() {
  const navigate = useNavigate();

  // State
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(NAVIGATION.STUDENTS);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < BREAKPOINTS.MOBILE
  );

  useEffect(() => {
    if (isMobile) {
      setShowButtons(true);
    }
  }, [isMobile]);

  // Refs
  const hideButtonsTimeoutRef = React.useRef(null);

  // Memoized card data
  const cardData = useMemo(
    () => ({
      quiz: [
        {
          image: quizImg2,
          description:
            "Be part of active student communities across India. Learn new skills, laugh out loud, connect with peers, share your journey & level up.2) Challenge yourself with fun daily quizzes, sharpen your mind, learn new things, and win exciting rewards that make every answer worth it!  3)A vibrant student network across India where you can learn from diverse peers, discover opportunities & unlock your true potential.",
        },
        {
          image: quizImg3,
          description: "Compete with friends and climb weekly leaderboards.",
        },
        {
          image: quizImg4,
          description: "Keep your streaks alive and unlock rewards.",
        },
      ],
      gigs: [
        {
          image: gigsImg,
          title: "Gigs & Star Connects",
          description:
            "Chill gigs, fun open mics, and star connects – vibe, showcase your talent, and learn directly from the pros who inspire.",
        },
        {
          image: quizImg4,
          title: "Gigs & Star Connects",
          description: "Show your vibe on stage—music, stand-up, poetry.",
        },
        {
          image: gigsImg2,
          title: "Gigs & Star Connects",
          description: "Learn directly from mentors and industry creators.",
        },
      ],
    }),
    []
  );

  // Memoized styles
  const cardStyle = useMemo(
    () => ({
      borderRadius: "16px",
      border: "2px solid rgba(255,255,255,0.34)",
      boxShadow:
        "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
      background: "rgba(44,27,27,0.92)",
    }),
    []
  );

  const backgroundStyle = useMemo(
    () => ({
      background:
        "radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)",
    }),
    []
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_CONFIG.MOBILE_ANIMATIONS.STAGGER,
        delayChildren: 0.1,
      },
    },
  };

  // Mobile animation variants
  const mobileCardVariants = {
    leftSlide: {
      hidden: {
        x: -ANIMATION_CONFIG.MOBILE_ANIMATIONS.OFFSET,
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: ANIMATION_CONFIG.DURATIONS.MOBILE_CARD,
          ease: [0.25, 0.46, 0.45, 0.94], // power3.out equivalent
        },
      },
    },
    rightSlide: {
      hidden: {
        x: ANIMATION_CONFIG.MOBILE_ANIMATIONS.OFFSET,
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: ANIMATION_CONFIG.DURATIONS.MOBILE_CARD,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
  };

  const phoneVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_CONFIG.DURATIONS.PHONE_SLIDE,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Desktop animation variants
  const desktopContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const desktopCardVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  const desktopBackgroundVariants = {
    hidden: {
      scale: 0,
      transformOrigin: "center center",
    },
    visible: {
      scale: 1,
      transition: {
        duration: ANIMATION_CONFIG.DURATIONS.CARD_SCALE,
        ease: [0.68, -0.55, 0.265, 1.55], // back.out(1.7) equivalent
      },
    },
  };

  const desktopPhoneVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_CONFIG.DURATIONS.PHONE_SLIDE,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
      },
    },
  };

  const desktopContentVariants = {
    topLeft: {
      hidden: { x: -200, y: -100, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: ANIMATION_CONFIG.DURATIONS.CONTENT_SLIDE,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.3,
        },
      },
    },
    topRight: {
      hidden: { x: 200, y: -100, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: ANIMATION_CONFIG.DURATIONS.CONTENT_SLIDE,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.4,
        },
      },
    },
    bottomLeft: {
      hidden: { x: -200, y: 100, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: ANIMATION_CONFIG.DURATIONS.CONTENT_SLIDE,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.5,
        },
      },
    },
    bottomRight: {
      hidden: { x: 200, y: 100, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: ANIMATION_CONFIG.DURATIONS.CONTENT_SLIDE,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.6,
        },
      },
    },
  };

  // Event handlers
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

  const handleMouseEnter = useCallback(() => {
    if (hideButtonsTimeoutRef.current) {
      clearTimeout(hideButtonsTimeoutRef.current);
      hideButtonsTimeoutRef.current = null;
    }
    setShowButtons(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hideButtonsTimeoutRef.current = setTimeout(() => {
      setShowButtons(false);
    }, 300);
  }, []);

  // Effects
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      if (hideButtonsTimeoutRef.current) {
        clearTimeout(hideButtonsTimeoutRef.current);
      }
    };
  }, []);

  // Render helpers
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

  const renderMobileCard = useCallback(
    (title, content, className = "", variants) => (
      <motion.div
        className={`bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl border-2 border-white/40 shadow-lg ${className}`}
        style={cardStyle}
        variants={variants}
      >
        {title && (
          <h3 className="text-white font-extrabold mb-2 text-center text-base sm:text-sm">
            {title}
          </h3>
        )}
        {content}
      </motion.div>
    ),
    [cardStyle]
  );

  return (
    <div
      id="app"
      className="min-h-screen w-full overflow-hidden relative"
      style={backgroundStyle}
    >
      {/* Header */}
      <header className="relative z-20 pt-8 md:pt-16 text-center">
        <div
          className="logo-container group inline-block cursor-pointer relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={stlogo}
            alt="Student Tribe Logo"
            className="h-12 sm:h-16 w-auto drop-shadow-lg mb-4"
            loading="eager"
          />

          {/* Navigation Buttons */}
          <nav
            className={`absolute left-1/2 -translate-x-1/2 sm:w-[350px]  font-bold z-20 transition-all duration-300 flex justify-center bg-[#2d000a] rounded-full shadow-xl w-[400px] max-w-[90vw] h-[50px] mx-auto mb-10 ${
              showButtons
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{ top: "calc(100% + 8px)" }}
          >
            {renderNavigationButton(NAVIGATION.STUDENTS, "Students", "/")}
            {renderNavigationButton(NAVIGATION.BRANDS, "Brands", "/brands")}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="relative z-20 px-4 sm:px-6 md:px-8 transition-transform duration-500 pb-6"
        style={{
          transform: showButtons ? "translateY(60px)" : "translateY(0)",
        }}
      >
        {/* Title */}
        <section className="text-center mb-8 mt-4 md:mb-12">
          <div className="w-[90%] mx-auto sm:hidden flex flex-col gap-0 items-center mb-4">
            <div
              className="w-full h-0.5"
              style={{
                background:
                  "radial-gradient(circle, #b8001f 100%, #7a0015 0%, #7a0015 0%)",
              }}
            />
            <div className="relative uppercase font-bold text-white">
              <p className="absolute left-1/2 -translate-x-1/2 inline-block text-[13px] top-1/2 -translate-y-1/2">
                ST APP
              </p>
              <img src={Tag} alt="" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-tight px-4">
            Where Fun Meets Learning and New
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Connections
          </h1>
        </section>

        {/* Mobile Layout */}
        {isMobile && (
          <motion.section
            className="max-w-sm sm:max-w-md mx-auto mb-8 space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
              margin: "-20% 0px -20% 0px",
            }}
          >
            {/* Top Full Width Card - Communities & Daily Quizzes */}
            <div className="w-full">
              {renderMobileCard(
                "Communities & Daily Quizzes",
                <div className="w-full h-full sm:h-[280px] flex items-center justify-center overflow-hidden rounded-xl">
                  <CardSlider
                    cards={cardData.quiz}
                    className="w-full h-full"
                    autoSlideInterval={
                      ANIMATION_CONFIG.AUTO_SLIDE_INTERVALS.QUIZ
                    }
                    layout="image-text"
                  />
                </div>,
                "h-[350px] sm:h-[360px] p-3 sm:p-4 flex flex-col",
                mobileCardVariants.leftSlide
              )}
            </div>

            {/* Middle Row - Two Smaller Cards Side by Side */}
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-1">
                {renderMobileCard(
                  "Your Dost AI",
                  <div className="flex justify-between items-end">
                    <img
                      src={robot}
                      alt="Your Dost AI"
                      className="w-18 sm:w-12 h-16 sm:h-12 object-contain flex-shrink-0 -ml-4"
                      loading="lazy"
                    />
                    <p className="text-white/90 text-xs sm:text-[10px] leading-tight text-center">
                      Your <span className="font-bold">AI buddy</span> for
                      everything from silly questions to serious career advice
                    </p>
                  </div>,
                  "h-[130px] sm:h-[150px] p-2 sm:p-3 flex flex-col",
                  mobileCardVariants.leftSlide
                )}
              </div>

              <div className="flex-1">
                {renderMobileCard(
                  "ST PRO Membership",
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-white/90 text-xs sm:text-[10px] text-center leading-tight">
                      Exclusive opportunities & priority invites for just{" "}
                      <span className="font-extrabold">₹299/month</span>
                    </p>
                  </div>,
                  "h-[130px] sm:h-[150px] p-2 sm:p-3 flex flex-col",
                  mobileCardVariants.rightSlide
                )}
              </div>
            </div>

            {/* Bottom Full Width Card - Gigs & Star Connects */}
            <div className="w-full">
              {renderMobileCard(
                "Gigs & Star Connects",
                <div className="w-full h-[280px] sm:h-[320px] flex items-center justify-center overflow-hidden rounded-xl">
                  <CardSlider
                    cards={cardData.gigs}
                    className="w-full h-full"
                    autoSlideInterval={
                      ANIMATION_CONFIG.AUTO_SLIDE_INTERVALS.GIGS
                    }
                    layout="image-title-text"
                  />
                </div>,
                "h-[300px] sm:h-[420px] p-3 sm:p-4 flex flex-col",
                mobileCardVariants.leftSlide
              )}
            </div>
          </motion.section>
        )}

        {/* Mobile Phone Mockup */}
        {isMobile && (
          <section className="mb-12 md:mb-16">
            <div className="flex justify-center">
              <motion.img
                src={iphone}
                alt="iPhone Mockup"
                className="w-[280px] sm:w-[360px] md:w-[400px] h-auto drop-shadow-2xl"
                loading="lazy"
                variants={phoneVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.3,
                  margin: "-20% 0px -20% 0px",
                }}
              />
            </div>
          </section>
        )}

        {/* Desktop Layout */}
        {!isMobile && (
          <motion.section
            className="max-w-7xl mx-auto mb-16"
            variants={desktopContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
              margin: "-20% 0px -20% 0px",
            }}
          >
            <div className="grid grid-cols-3 gap-6 xl:gap-8">
              {/* Column 1 */}
              <div className="flex flex-col gap-6 xl:gap-8 max-w-[400px]">
                <motion.div variants={desktopCardVariants}>
                  <motion.div
                    className="bg-[#2C1B1B]/80 backdrop-blur-lg h-[450px] xl:h-[500px] rounded-2xl p-4 xl:p-6 flex flex-col border-2 border-white/40 shadow-lg"
                    style={cardStyle}
                    variants={desktopBackgroundVariants}
                  >
                    <motion.div variants={desktopContentVariants.topLeft}>
                      <h3 className="text-white text-xl xl:text-2xl font-extrabold mb-3 xl:mb-4 text-center">
                        Communities & Daily Quizzes
                      </h3>
                      <CardSlider
                        cards={cardData.quiz}
                        className="w-full h-[400px] rounded-2xl"
                        autoSlideInterval={
                          ANIMATION_CONFIG.AUTO_SLIDE_INTERVALS.QUIZ
                        }
                        layout="image-text"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div variants={desktopCardVariants}>
                  <motion.div
                    className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl px-4 xl:px-6 flex flex-col border-2 border-white/40 shadow-lg"
                    style={cardStyle}
                    variants={desktopBackgroundVariants}
                  >
                    <motion.div
                      variants={desktopContentVariants.bottomLeft}
                      className="flex flex-row relative gap-4 xl:gap-6"
                    >
                      <img
                        src={robot}
                        alt="Your Dost AI"
                        className="w-32 xl:w-40 h-32 xl:h-40 object-contain mt-auto flex-shrink-0"
                        loading="lazy"
                      />
                      <div className="flex flex-col py-4 xl-py-6 justify-center">
                        <h3 className="text-white text-xl xl:text-2xl font-extrabold mb-3 xl:mb-4">
                          Your Dost AI
                        </h3>
                        <p className="text-white/90 text-base xl:text-lg leading-relaxed">
                          Your <span className="font-bold">AI buddy</span> for
                          everything – from silly questions to serious career
                          advice, smarter than your group chat
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Column 2 - Phone Mockup */}
              <div className="flex flex-col justify-center">
                <motion.div variants={desktopPhoneVariants}>
                  <img
                    src={iphone}
                    alt="iPhone Mockup"
                    className="w-[420px] h-auto drop-shadow-2xl z-10 mx-auto"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-6 xl:gap-8">
                <motion.div variants={desktopCardVariants}>
                  <motion.div
                    className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 xl:p-6 flex flex-col border-2 border-white/40 shadow-lg items-center justify-center"
                    style={cardStyle}
                    variants={desktopBackgroundVariants}
                  >
                    <motion.div variants={desktopContentVariants.topRight}>
                      <h3 className="text-white text-xl xl:text-2xl font-extrabold mb-4 xl:mb-6 text-center">
                        ST PRO Membership
                      </h3>
                      <p className="text-white/90 text-base xl:text-lg text-center leading-relaxed mb-2">
                        Exclusive opportunities, career events, expert sessions
                        <br />& priority invites – all for just{" "}
                        <span className="font-extrabold">₹299/month</span>.
                        <br />
                        Totally worth it, 1000% yes!
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div variants={desktopCardVariants}>
                  <motion.div
                    className="bg-[#2C1B1B]/80 backdrop-blur-lg h-[500px] xl:h-[550px] rounded-2xl p-4 xl:p-6 flex flex-col border-2 border-white/40 shadow-lg"
                    style={cardStyle}
                    variants={desktopBackgroundVariants}
                  >
                    <motion.div variants={desktopContentVariants.bottomRight}>
                      <h3 className="text-white text-xl xl:text-2xl font-extrabold mb-4 xl:mb-6 text-center">
                        Gigs & Star Connects
                      </h3>
                      <CardSlider
                        cards={cardData.gigs}
                        className="w-full h-[350px] xl:h-[400px] rounded-2xl"
                        autoSlideInterval={
                          ANIMATION_CONFIG.AUTO_SLIDE_INTERVALS.GIGS
                        }
                        layout="image-title-text"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
