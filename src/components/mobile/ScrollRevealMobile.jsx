import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useScreenSize } from "../../hooks/useScreenSize";
import { MobileGalleryStack } from "./MobileGalleryStack";
import stlogo from "../../assets/Whitelogo.webp";
import { MobileTestimonialCards } from "./MobileTestimonialCards";
import Tag from "../../assets/tag.svg";

function ScrollRevealMobile({
  children,
  bgImage,
  leftImage,
  rightImage,
  leftText = "Internship",
  rightText = "Volunteer",
  leftTestimonial = "Find it all here — workshops, internships, and job openings that kick-start your career.",
  leftTestimonialAuthor = "Sarah M.",
  leftTestimonialProfile, // New prop for left profile picture
  rightTestimonial = "Volunteering here was incredibly rewarding. Highly recommend!",
  rightTestimonialAuthor = "John D.",
  rightTestimonialProfile, // New prop for right profile picture
  rightTestimonialSlideshow = false,
  rightTestimonials = [],
}) {
  const ref = useRef(null);
  const screenSize = useScreenSize();
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("students");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : true
  );

  // Use manual scroll tracking instead of useScroll to avoid hydration issues
  const scrollProgress = useMotionValue(0);

  // Create transform values based on our manual scroll progress
  const galleryProgress = useTransform(scrollProgress, [0.1, 0.25], [0, 1]);
  const rotationProgress = useTransform(scrollProgress, [0.25, 0.5], [0, 1]);
  const exitProgress = useTransform(scrollProgress, [0.95, 0.98], [0, 1]);
  const exitY = useTransform(exitProgress, [0, 1], [0, -100]);

  // Logo button functionality
  const hideButtonsTimeoutRef = useRef(null);

  useEffect(() => {
    if (isMobile) {
      setShowButtons(true);
    }
  }, [isMobile]);

  // Logo hover logic
  const handleLogoOrButtonsMouseEnter = () => {
    if (hideButtonsTimeoutRef.current) {
      clearTimeout(hideButtonsTimeoutRef.current);
      hideButtonsTimeoutRef.current = null;
    }
    setShowButtons(true);
  };

  const handleLogoOrButtonsMouseLeave = (e) => {
    const relatedTarget = e.relatedTarget;
    const currentTarget = e.currentTarget;
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      hideButtonsTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 300);
    }
  };

  // Button hover handlers
  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
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

  // Manual scroll tracking to avoid hydration issues
  useEffect(() => {
    if (!isMounted || !isReady || !ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate scroll progress based on element position
      const startOffset = windowHeight; // Start when element enters viewport
      const endOffset = -elementHeight; // End when element exits viewport

      const totalDistance = startOffset - endOffset;
      const currentPosition = rect.top;
      const progress = Math.max(
        0,
        Math.min(1, (startOffset - currentPosition) / totalDistance)
      );

      scrollProgress.set(progress);
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMounted, isReady, scrollProgress]);

  // Handle mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Wait for screen size and mounting to complete
  useEffect(() => {
    if (
      isMounted &&
      screenSize &&
      typeof screenSize.width === "number" &&
      typeof screenSize.height === "number"
    ) {
      // Add delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [screenSize, isMounted]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hideButtonsTimeoutRef.current) {
        clearTimeout(hideButtonsTimeoutRef.current);
      }
    };
  }, []);

  // Show loading state until everything is ready
  if (!isMounted || !isReady) {
    return (
      <div className="relative w-full h-[100vh] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative w-full">
      <div
        className="logo-container group cursor-pointer relative flex flex-col mt-10 items-center"
        onMouseEnter={handleLogoOrButtonsMouseEnter}
        onMouseLeave={handleLogoOrButtonsMouseLeave}
      >
        {/* Logo */}
        <img
          src={stlogo}
          alt="Student Tribe Logo"
          className="h-12 sm:h-16 w-auto drop-shadow-lg mb-6"
        />

        {/* Navigation Buttons */}
        <div
          className={`w-[400px] max-w-[90vw] h-[50px] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-500 ${
            showButtons ? "opacity-100 cursor-pointer" : "opacity-0"
          }`}
          onMouseEnter={handleLogoOrButtonsMouseEnter}
          onMouseLeave={handleLogoOrButtonsMouseLeave}
        >
          <button
            className={`flex-1 py-2 md:py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
              hoveredButton === "students"
                ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => scrollToSection("main-section")}
            onMouseEnter={() => handleButtonHover("students")}
            onMouseLeave={handleButtonLeave}
          >
            Students
          </button>
          <button
            className={`flex-1 py-2 md:py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
              hoveredButton === "brands"
                ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => scrollToSection("brands-section")}
            onMouseEnter={() => handleButtonHover("brands")}
            onMouseLeave={handleButtonLeave}
          >
            Brands
          </button>
        </div>
      </div>

      <motion.div style={{ y: exitY }} className="">
        {/* Logo and Navigation Buttons */}

        <motion.div className="w-full flex flex-col gap-2 items-center text-white text-center mt-8">
          <div className="w-[90%] mx-auto sm:hidden flex flex-col gap-0 items-center mb-4">
            <div
              className="w-full h-0.5"
              style={{
                background:
                  "radial-gradient(circle, #b8001f 100%, #7a0015 0%, #7a0015 0%)",
              }}
            />
            <div className="relative uppercase font-bold text-white w-56">
              <p className="absolute left-1/2 -translate-x-1/2 inline-block text-[13px] top-1/2 -translate-y-1/2">
                ST opportunities
              </p>
              <img src={Tag} className="w-full" />
            </div>
          </div>
          <div className="text-2xl font-extrabold">Find it all here!</div>
          <p className="max-w-sm text-base">
            Discover opportunities that give you real exposure, help you grow
            new skills, and lead you toward meaningful roles where your effort
            turns into pride and recognition.{" "}
          </p>
          <div></div>
        </motion.div>

        <motion.div
          style={{ opacity: galleryProgress }}
          className="flex items-center justify-center w-full mt-8"
        >
          <MobileGalleryStack
            centerImage={bgImage}
            leftImage={leftImage}
            rightImage={rightImage}
            centerChildren={children}
            leftText={leftText}
            rightText={rightText}
            isVisible={galleryProgress}
            rotationProgress={rotationProgress}
            screenSize={screenSize}
          />
        </motion.div>

        <motion.div
          style={{ opacity: galleryProgress }}
          className="w-full mt-8 justify-center flex items-start pt-4"
        >
          <MobileTestimonialCards
            leftTestimonial={leftTestimonial}
            leftTestimonialAuthor={leftTestimonialAuthor}
            leftTestimonialProfile={leftTestimonialProfile}
            rightTestimonial={rightTestimonial}
            rightTestimonialAuthor={rightTestimonialAuthor}
            rightTestimonialProfile={rightTestimonialProfile}
            rightTestimonialSlideshow={rightTestimonialSlideshow}
            rightTestimonials={rightTestimonials}
            isVisible={galleryProgress}
            screenSize={screenSize}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ScrollRevealMobile;
