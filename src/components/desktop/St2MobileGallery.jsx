import React, { useRef } from "react";

import { useSt2ScrollAnimations } from "../../hooks/useSt2ScrollAnimationsMobile";
import St2GalleryGridMobile from "./St2GalleryGridMobile";
import stlogo from "../../assets/Red logo.webp";
import { useState, useEffect } from "react";

const St2MobileGallery = ({ images }) => {
  const containerRef = useRef(null);

  // custom hook for scroll animations
  const { imageAnimations, textAnimations, isReady } = useSt2ScrollAnimations(
    containerRef,
    images
  );

  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("students");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
      if (isMobile) {
        setShowButtons(true);
      }
    }, [isMobile]);
  
  // Refs for the header
  const logoRef = useRef(null);
  const logoContainerRef = useRef(null);
  const hideButtonsTimeoutRef = useRef(null);

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

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hideButtonsTimeoutRef.current) {
        clearTimeout(hideButtonsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="lg:-pt-[30px]  h-auto bg-white relative flex flex-col items-center w-full"
    >
      
      {isReady && (
        <div className="sticky top-[0%] lg:-top-[20px]  h-auto flex flex-col items-center justify-center px-4 overflow-visible w-[100%] max-w-[1600px]">
          {/* <div className="h-[20%]"></div> */}
          <div className="w-full h-[100%] mt-2 flex flex-col items-center relative overflow-visible">
            <div className=" z-20 flex flex-col items-center w-full px-4">
              <div className="mb-6 md:mb-8 text-center">
                <div
                  ref={(el) => {
                    logoRef.current = el;
                    logoContainerRef.current = el;
                  }}
                  className="logo-container group  cursor-pointer relative flex flex-col items-center"
                  onMouseEnter={handleLogoOrButtonsMouseEnter}
                  onMouseLeave={handleLogoOrButtonsMouseLeave}
                >
                  {/* Logo - now sticky */}
                  <img
                    src={stlogo}
                    alt="Student Tribe Logo"
                    className="h-12 sm:h-16 w-auto drop-shadow-lg mb-6 -z-10"
                  />
                  {/* Buttons - now sticky */}
                  <div
                    className={`w-[400px] max-w-[90vw] h-[50px] flex justify-center bg-[#2d000a] rounded-full shadow-xl font-bold z-20 transition-all duration-500 ${
                      showButtons ? "opacity-100 cursor-pointer" : "opacity-0"
                    }`}
                    style={{
                      top: "75px",
                    }}
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
                          : "bg-transparent text-gray-300 hover:text-white"
                      }`}
                      onClick={() => scrollToSection("brands-section")}
                      onMouseEnter={() => handleButtonHover("brands")}
                      onMouseLeave={handleButtonLeave}
                    >
                      Brands
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <St2GalleryGridMobile
              images={images}
              imageAnimations={imageAnimations}
              textAnimations={textAnimations}
              showButtons={showButtons}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default St2MobileGallery;
