import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import stlogo from "../assets/Red logo.webp";
import { ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScreenSize } from "../hooks/useScreenSize";
import { NAVIGATION } from "./StudentIntroPage";
import Tag from "../assets/tag.svg";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function StudentEvents() {
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const isMobile = width <= 768;

  /** States */
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("students");

  useEffect(() => {
    if (isMobile) {
      setShowButtons(true);
    }
  }, [isMobile]);

  const [isTopSliderPaused, setIsTopSliderPaused] = useState(false);
  const [isBottomSliderPaused, setIsBottomSliderPaused] = useState(false);

  const [modalImage, setModalImage] = useState(null);
  const [hoveredImageTopIndex, setHoveredImageTopIndex] = useState(null);
  const [hoveredImageBottomIndex, setHoveredImageBottomIndex] = useState(null);

  const [scaledImageTop, setScaledImageTop] = useState(null);
  const [scaledImageBottom, setScaledImageBottom] = useState(null);

  /** Refs */
  const containerRef = useRef(null);
  const mainSliderRef = useRef(null);
  const bottomSliderRef = useRef(null);
  const textContentRef = useRef(null);
  const buttonsRef = useRef(null);
  const mainSliderInnerRef = useRef(null);
  const bottomSliderInnerRef = useRef(null);
  const animationRef = useRef(null);
  const hideButtonsTimeoutRef = useRef(null);

  /** Slider Images */
  const sliderImages = [
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
  ];
  const infiniteImages = [...sliderImages, ...sliderImages, ...sliderImages];

  /** Continuous slider animations */
  useEffect(() => {
    if (mainSliderInnerRef.current && bottomSliderInnerRef.current) {
      const imageWidth = isMobile ? 220 : 280; // Account for image + spacing
      const totalSetWidth = imageWidth * sliderImages.length;

      const mainTl = gsap.timeline({ repeat: -1 }).fromTo(
        mainSliderInnerRef.current,
        { x: 0 },
        {
          x: -totalSetWidth,
          duration: sliderImages.length * 3,
          ease: "none",
        }
      );

      const bottomTl = gsap.timeline({ repeat: -1 }).fromTo(
        bottomSliderInnerRef.current,
        { x: -totalSetWidth },
        {
          x: 0,
          duration: sliderImages.length * 3,
          ease: "none",
        }
      );

      animationRef.current = { mainTl, bottomTl };

      return () => {
        mainTl.kill();
        bottomTl.kill();
      };
    }
  }, [sliderImages.length, isMobile]);

  /** Handle pause/resume */
  useEffect(() => {
    if (!animationRef.current) return;
    isTopSliderPaused
      ? animationRef.current.mainTl.pause()
      : animationRef.current.mainTl.resume();
  }, [isTopSliderPaused]);

  useEffect(() => {
    if (!animationRef.current) return;
    isBottomSliderPaused
      ? animationRef.current.bottomTl.pause()
      : animationRef.current.bottomTl.resume();
  }, [isBottomSliderPaused]);

  /** Entrance animation */
  useEffect(() => {
    if (
      containerRef.current &&
      mainSliderRef.current &&
      bottomSliderRef.current &&
      textContentRef.current &&
      buttonsRef.current
    ) {
      gsap.set(mainSliderRef.current, { x: -window.innerWidth, opacity: 0 });
      gsap.set(bottomSliderRef.current, { x: window.innerWidth, opacity: 0 });
      gsap.set(textContentRef.current, { y: 50, opacity: 0 });
      gsap.set(buttonsRef.current, { y: 50, opacity: 0 });

      gsap
        .timeline({ delay: 0.3 })
        .to(textContentRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        })
        .to(
          mainSliderRef.current,
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=0.5"
        )
        .to(
          bottomSliderRef.current,
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1"
        )
        .to(
          buttonsRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }
  }, []);

  /** Hover handlers for logo/buttons */
  const handleLogoOrButtonsMouseEnter = () => {
    if (hideButtonsTimeoutRef.current) {
      clearTimeout(hideButtonsTimeoutRef.current);
      hideButtonsTimeoutRef.current = null;
    }
    setShowButtons(true);
  };

  const handleLogoOrButtonsMouseLeave = (e) => {
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
      hideButtonsTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 300);
    }
  };

  /** Scroll to section */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  /** Mobile image scaling */
  const handleMobileImageClick = (image, index, isTopSlider = true) => {
    if (!isMobile) return;

    if (isTopSlider) {
      if (scaledImageTop === index) {
        setScaledImageTop(null);
        setIsTopSliderPaused(false);
      } else {
        setScaledImageTop(index);
        setScaledImageBottom(null);
        setIsTopSliderPaused(true);
        setIsBottomSliderPaused(false);
      }
    } else {
      if (scaledImageBottom === index) {
        setScaledImageBottom(null);
        setIsBottomSliderPaused(false);
      } else {
        setScaledImageBottom(index);
        setScaledImageTop(null);
        setIsBottomSliderPaused(true);
        setIsTopSliderPaused(false);
      }
    }
  };

  /** Close modal */
  const closeModal = () => {
    setModalImage(null);
    setHoveredImageTopIndex(null);
    setHoveredImageBottomIndex(null);
    setIsTopSliderPaused(false);
    setIsBottomSliderPaused(false);
    setScaledImageTop(null);
    setScaledImageBottom(null);
  };

  /** Handle background click for mobile scaling */
  const handleBackgroundClick = (e) => {
    if (isMobile && (scaledImageTop !== null || scaledImageBottom !== null)) {
      const clickedElement = e.target;
      const isClickOnImage =
        clickedElement.tagName === "IMG" ||
        clickedElement.closest(".relative.flex-shrink-0");

      if (!isClickOnImage) {
        setScaledImageTop(null);
        setScaledImageBottom(null);
        setIsTopSliderPaused(false);
        setIsBottomSliderPaused(false);
      }
    }
  };

  // Calculate dynamic heights based on scaled images
  const getSliderHeight = (scaledImage) => {
    if (isMobile && scaledImage !== null) {
      return "h-64 sm:h-72"; // Increased height when image is scaled
    }
    return "h-40 sm:h-48 lg:h-56"; // Default height
  };

  const handleButtonLeave = useCallback(() => {
    setHoveredButton(NAVIGATION.STUDENTS);
  }, []);
  const handleButtonHover = useCallback((buttonType) => {
    setHoveredButton(buttonType);
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

  return (
    <div
      ref={containerRef}
      id="events"
      className="min-h-screen bg-rose-100 relative px-4 "
      onClick={handleBackgroundClick}
    >
      {/* Desktop Modal */}
      {modalImage && !isMobile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ease-out opacity-100"
          style={{ backdropFilter: "blur(10px)" }}
          onClick={closeModal}
        >
          <div className="relative p-20 transition-all duration-700 transform scale-100 hover:scale-105">
            <img
              src={modalImage}
              alt="Event Preview"
              className="max-w-[80vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain transition-all duration-500"
              style={{ filter: "brightness(1.1) contrast(1.05)" }}
            />
          </div>
        </div>
      )}

      {/* Header with Logo & Buttons */}
      <div className="w-full px-0 py-4">
        <div className="text-center mb-4">
          <div
            className="logo-container group inline-block cursor-pointer relative"
            onMouseEnter={handleLogoOrButtonsMouseEnter}
            onMouseLeave={handleLogoOrButtonsMouseLeave}
          >
            <img
              src={stlogo}
              alt="Student Tribe Logo"
              className="h-12 sm:h-16 w-auto drop-shadow-lg mb-4"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div
              className={`absolute left-1/2 -translate-x-1/2 sm:w-[350px]  font-bold z-20 transition-all duration-300 flex justify-center bg-[#2d000a] rounded-full shadow-xl w-[400px] max-w-[90vw] h-[50px] mx-auto mb-10 ${
                showButtons ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{ top: "calc(100% + 8px)" }}
            >
              {renderNavigationButton(NAVIGATION.STUDENTS, "Students", "/")}
              {renderNavigationButton(NAVIGATION.BRANDS, "Brands", "/brands")}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="transition-all duration-500 ease-out"
          style={{
            transform: showButtons ? "translateY(60px)" : "translateY(0)",
            // Add dynamic spacing for scaled images
            paddingBottom:
              isMobile &&
              (scaledImageTop !== null || scaledImageBottom !== null)
                ? "120px"
                : "0px",
          }}
        >
          {/* Heading */}
          <div ref={textContentRef} className="text-center mb-3">
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
                  ST events
                </p>
                <img src={Tag} alt="" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Say Goodbye to FOMO. Step Into the Action.
            </h1>
          </div>

          {/* Top Slider - Now part of document flow */}
          <div
            ref={mainSliderRef}
            className={`relative mb-4 w-full overflow-y-visible overflow-x-hidden transition-all duration-500 ease-out ${getSliderHeight(
              scaledImageTop
            )}`}
            style={{
              // Dynamic height adjustment
              minHeight: isMobile && scaledImageTop !== null ? "300px" : "auto",
            }}
          >
            <div
              ref={mainSliderInnerRef}
              className="flex items-center overflow-visible space-x-2 w-fit h-full"
            >
              {infiniteImages.map((image, index) => {
                const actualIndex = index % sliderImages.length;
                const isScaled = isMobile && scaledImageTop === index;

                return (
                  <div
                    key={`top-${index}`}
                    className={`relative flex-shrink-0 flex justify-center transition-all duration-500 ease-out ${
                      isScaled ? "p-10" : "p-2"
                    }`}
                    style={{
                      minWidth: isMobile ? "220px" : "280px",
                      // Ensure the container expands to accommodate scaled images
                      height: isScaled ? "auto" : "fit-content",
                    }}
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setIsTopSliderPaused(true);
                        setHoveredImageTopIndex(index);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) {
                        setHoveredImageTopIndex(null);
                        setIsTopSliderPaused(false);
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      isMobile
                        ? handleMobileImageClick(image, index, true)
                        : setModalImage(image);
                    }}
                  >
                    <img
                      src={image}
                      alt={`Event ${actualIndex + 1}`}
                      className={`rounded-xl object-cover transition-all duration-500 ease-out cursor-pointer ${
                        hoveredImageTopIndex === index && !isMobile
                          ? "scale-130 brightness-110 shadow-lg z-50 w-48 h-32 sm:w-56 sm:h-36 lg:w-64 lg:h-40"
                          : "opacity-90 hover:opacity-100 hover:shadow-md z-10 w-48 h-32 sm:w-56 sm:h-36 lg:w-64 lg:h-40"
                      } ${
                        isScaled
                          ? "scale-125 z-50 opacity-100 shadow-2xl w-64 h-44 sm:w-72 sm:h-48"
                          : ""
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-4 transition-all duration-500">
            <p className="text-base text-gray-800 max-w-2xl mx-auto leading-relaxed">
              Vibrant cultural fests, insightful workshops, creative jams —
              discover experiences that are unforgettable and student-powered.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex justify-center space-x-6 mt-6 mb-4 transition-all duration-500"
          >
            <button className="bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base transition-all duration-300 hover:scale-105">
              <span>Register now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base transition-all duration-300 hover:scale-105">
              <span>Host an Event</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Slider - Now part of document flow */}
          <div
            ref={bottomSliderRef}
            className={`relative w-full overflow-y-visible overflow-x-hidden  transition-all duration-500 ease-out ${getSliderHeight(
              scaledImageBottom
            )}`}
            style={{
              // Dynamic height and margin adjustments
              minHeight:
                isMobile && scaledImageBottom !== null ? "300px" : "auto",
            }}
          >
            <div
              ref={bottomSliderInnerRef}
              className="flex items-center space-x-2 w-fit h-full"
            >
              {infiniteImages.map((image, index) => {
                const actualIndex = index % sliderImages.length;
                const isScaled = isMobile && scaledImageBottom === index;

                return (
                  <div
                    key={`bottom-${index}`}
                    className={`relative flex-shrink-0 flex justify-center transition-all duration-500 ease-out ${
                      isScaled ? "p-10" : "p-2"
                    }`}
                    style={{
                      minWidth: isMobile ? "220px" : "280px",
                      height: isScaled ? "auto" : "fit-content",
                    }}
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setIsBottomSliderPaused(true);
                        setHoveredImageBottomIndex(index);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) {
                        setHoveredImageBottomIndex(null);
                        setIsBottomSliderPaused(false);
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      isMobile
                        ? handleMobileImageClick(image, index, false)
                        : setModalImage(image);
                    }}
                  >
                    <img
                      src={image}
                      alt={`Bottom event ${actualIndex + 1}`}
                      className={`rounded-xl object-cover transition-all duration-500 ease-out cursor-pointer ${
                        hoveredImageBottomIndex === index && !isMobile
                          ? "scale-130 brightness-110 shadow-lg z-50 w-48 h-32 sm:w-56 sm:h-36 lg:w-64 lg:h-40"
                          : "opacity-90 hover:opacity-100 hover:shadow-md z-10 w-48 h-32 sm:w-56 sm:h-36 lg:w-64 lg:h-40"
                      } ${
                        isScaled
                          ? "scale-125 z-50 opacity-100 shadow-2xl w-64 h-44 sm:w-72 sm:h-48"
                          : ""
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
