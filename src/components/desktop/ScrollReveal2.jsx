import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSt2ScrollAnimations } from "../../hooks/useSt2ScrollAnimations";
import { SCROLL_HEIGHT } from "../../constants/st2Constants";
import St2GalleryGrid from "./St2GalleryGrid";
import stlogo from "../../assets/Red logo.webp";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "../../Student/StudentIntroPage";

/**
 * Navigation button configuration
 */


/**
 * St2 ScrollReveal Component
 * Manages the 3-stage scroll-based animation for the image gallery
 */
const ScrollReveal2 = ({ images }) => {
  // Refs
  const containerRef = useRef(null);
  const logoContainerRef = useRef(null);
  const hideButtonsTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // State
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("students");
  const [mounted, setMounted] = useState(false);

  // Custom hook for scroll animations
  const { imageAnimations, textAnimations, isReady } = useSt2ScrollAnimations(
    containerRef,
    images
  );

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Event handlers
  const handleMouseEnter = () => {
    if (hideButtonsTimeoutRef.current) {
      clearTimeout(hideButtonsTimeoutRef.current);
      hideButtonsTimeoutRef.current = null;
    }
    setShowButtons(true);
  };

  const handleMouseLeave = (e) => {
    const { relatedTarget, currentTarget } = e;
    
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      hideButtonsTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 300);
    }
  };

  const handleButtonHover = (buttonId) => {
    setHoveredButton(buttonId);
  };

  const handleButtonLeave = () => {
    setHoveredButton("students");
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getButtonStyles = (buttonId) => {
    const isHovered = hoveredButton === buttonId;
    const baseStyles = "flex-1 py-2 lg:py-3 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm lg:text-base px-3 lg:px-6 hover:scale-105";
    
    return isHovered
      ? `${baseStyles} bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white`
      : `${baseStyles} bg-transparent text-gray-300 hover:text-white`;
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (hideButtonsTimeoutRef.current) {
        clearTimeout(hideButtonsTimeoutRef.current);
      }
    };
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

  // Always render the structure to prevent hydration mismatch
  return (
    <div
      ref={containerRef}
      className="lg:pt-[30px] pb-[50px] h-[180vh] lg:h-[235vh] bg-white lg:pb-[100px] relative flex flex-col items-center w-full"
    >
      <div className="sticky top-10 md:top-[0%] lg:-top-[20px] h-screen flex flex-col items-center lg:justify-start px-4 overflow-visible w-[90%] max-w-[1500px]">
        
        {/* Main Content Container */}
        <div className="w-full h-[80%] lg:h-[90%] lg:mt-5 flex flex-col items-center relative overflow-visible">
          
          {/* Header Section */}
          <div className="max-h-[90px] z-20 flex flex-col items-center w-full px-4">
            <div className="mb-6 md:mb-8 text-center">
              
              {/* Logo and Navigation Container */}
              <div
                ref={logoContainerRef}
                className="logo-container group cursor-pointer relative flex flex-col items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                
                {/* Logo */}
                <img
                  src={stlogo}
                  alt="Student Tribe Logo"
                  className="h-12 sm:h-16 w-auto drop-shadow-lg mb-2 -z-10"
                />
                
                {/* Navigation Buttons */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 sm:w-[350px]  font-bold z-20 transition-all duration-300 flex justify-center bg-[#2d000a] rounded-full shadow-xl w-[400px] max-w-[90vw] h-[50px] mx-auto mb-10 ${
                    mounted && showButtons ? "opacity-100 cursor-pointer" : "opacity-0"
                  }`}
                  style={{ top: "75px" }}
                >
                   {renderNavigationButton(NAVIGATION.STUDENTS, "Students", "/")}
          {renderNavigationButton(NAVIGATION.BRANDS, "Brands", "/brands")}
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Grid - Always render but conditionally show content */}
          <div style={{ 
            opacity: mounted && isReady ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}>
            {mounted && (
              <St2GalleryGrid
                images={images}
                imageAnimations={imageAnimations}
                textAnimations={textAnimations}
                showButtons={showButtons}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollReveal2;