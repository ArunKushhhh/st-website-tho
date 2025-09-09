import React, { useRef, useState, useEffect, useCallback } from "react";
import { useScroll } from "framer-motion";

import { getResponsiveDimensions } from "../../helper/getResponsiveDimensions";
import { useScrollAnimations } from "../../hooks/useScrollAnimations";
import { AnimatedCard } from "./AnimatedCard";
import { SideCard } from "./Sidecard";
import { TestimonialCard } from "./TestimonialCard";
import { useScreenSize } from "../../hooks/useScreenSize";

import stlogo from "../../assets/White logo.webp";
import { NAVIGATION } from "../../Student/StudentIntroPage";
import { useNavigate } from "react-router-dom";

function ScrollReveal({
  children,
  bgImage,
  leftImage,
  rightImage,
  leftText = "Internship",
  rightText = "Volunteer",
  leftTestimonial = "Find it all here — workshops, internships, and job openings that kick-start your career. Get real-world exposure, build skills, and land roles that turn effort into pride and recognition.",
  leftTestimonialAuthor = "Sarah M.",
  rightTestimonial = "Volunteering here was incredibly rewarding. Highly recommend!",
  rightTestimonialAuthor = "John D.",
  rightTestimonialSlideshow = false,
  rightTestimonials = [],
}) {
  /** =====================
   *  Refs & State
   * ===================== */
  const ref = useRef(null);
  const logoRef = useRef(null);
  const logoContainerRef = useRef(null);
  const hideButtonsTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("students");

  /** =====================
   *  Scroll & Animations
   * ===================== */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const dimensions = getResponsiveDimensions(screenSize);
  const animations = useScrollAnimations(scrollYProgress, dimensions);

  /** =====================
   *  Handlers
   * ===================== */
  const handleLogoOrButtonsMouseEnter = () => {
    if (hideButtonsTimeoutRef.current) {
      clearTimeout(hideButtonsTimeoutRef.current);
      hideButtonsTimeoutRef.current = null;
    }
    setShowButtons(true);
  };

  const handleLogoOrButtonsMouseLeave = (e) => {
    const { relatedTarget, currentTarget } = e;
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      hideButtonsTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 300);
    }
  };

  const handleButtonHover = (buttonType) => setHoveredButton(buttonType);
  const handleButtonLeave = () => setHoveredButton("students");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  /** =====================
   *  Cleanup
   * ===================== */
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

  /** =====================
   *  Render
   * ===================== */
  return (
    <div ref={ref} className="relative w-full h-[180vh] lg:h-[235vh] mb-[100px]">
      <div className="sticky top-10 md:top-0 h-screen flex flex-col items-center justify-center px-4 overflow-visible">
        {/* Top Spacer */}
        <div className="h-[20%]" />

        <div className="w-full h-[80%] flex flex-col items-center justify-center relative overflow-visible">
          {/* Logo & Buttons */}
          <div className="absolute -top-20 lg:-top-32 left-0 right-0 z-20 flex flex-col items-center w-full px-4">
            <div className="mb-6 md:mb-8 text-center">
              <div
                ref={(el) => {
                  logoRef.current = el;
                  logoContainerRef.current = el;
                }}
                className="logo-container group cursor-pointer relative flex flex-col items-center"
                onMouseEnter={handleLogoOrButtonsMouseEnter}
                onMouseLeave={handleLogoOrButtonsMouseLeave}
              >
                {/* Logo */}
                <img
                  src={stlogo}
                  alt="Student Tribe Logo"
                  className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4 -z-10"
                />

                {/* Buttons */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 sm:w-[350px]  font-bold z-20 transition-all duration-300 flex justify-center bg-[#2d000a] rounded-full shadow-xl w-[400px] max-w-[90vw] h-[50px] mx-auto mb-10 ${
                    showButtons
                      ? "opacity-100 pointer-events-auto mb-[75px] translate-y-0"
                      : "opacity-0 -translate-y-8"
                  }`}
                  style={{ top: "75px" }}
                  onMouseEnter={handleLogoOrButtonsMouseEnter}
                  onMouseLeave={handleLogoOrButtonsMouseLeave}
                >
                   {renderNavigationButton(NAVIGATION.STUDENTS, "Students", "/")}
                            {renderNavigationButton(NAVIGATION.BRANDS, "Brands", "/brands")}
                </div>
              </div>
            </div>
          </div>

          {/* Animated Content */}
          <div
            className={`relative mt-[100px] md:-mt-[170px] lg:-mt-[70px] transition-all duration-500 border-4 ${
              showButtons && "translate-y-14"
            }`}
            style={{ width: animations.width, height: animations.height }}
          >
            <AnimatedCard
              bgImage={bgImage}
              width={animations.width}
              height={animations.height}
              textScale={animations.textScale}
              dimensions={dimensions}
              zIndex={30}
            >
              {children}
            </AnimatedCard>

            <SideCard
              image={leftImage}
              text={leftText}
              width={animations.sideWidth}
              height={animations.sideHeight}
              xOffset={animations.sideOffsetLeft}
              yOffset={animations.leftCardY}
              opacity={animations.sideOpacity}
              dimensions={dimensions}
              textScale={animations.sideTextScale}
              textY={animations.textY}
              zIndex={20}
            />

            <SideCard
              image={rightImage}
              text={rightText}
              width={animations.sideWidth}
              height={animations.sideHeight}
              xOffset={animations.sideOffsetRight}
              yOffset={animations.rightCardY}
              opacity={animations.sideOpacity}
              dimensions={dimensions}
              textScale={animations.sideTextScale}
              textY={animations.textY}
              zIndex={20}
            />

            <TestimonialCard
              text={leftTestimonial}
              author={leftTestimonialAuthor}
              width={animations.sideWidth}
              height={animations.testimonialHeight}
              xOffset={animations.sideOffsetLeft}
              yOffset={animations.leftTestimonialY}
              opacity={animations.testimonialOpacity}
              dimensions={dimensions}
              zIndex={15}
              isSlideshow={false}
            />

            <TestimonialCard
              text={rightTestimonial}
              author={rightTestimonialAuthor}
              width={animations.sideWidth}
              height={animations.testimonialHeight}
              xOffset={animations.sideOffsetRight}
              yOffset={animations.rightTestimonialY}
              opacity={animations.testimonialOpacity}
              dimensions={dimensions}
              zIndex={15}
              isSlideshow={rightTestimonialSlideshow}
              testimonials={rightTestimonials}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollReveal;
