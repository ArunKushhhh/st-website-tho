import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import stlogo from "../assets/Red logo.webp";
import stcarebg from "../assets/stcarebg.webp";
import Tag from "../assets/tag.svg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Constants
const NAVIGATION_BUTTONS = {
  STUDENTS: "students",
  BRANDS: "brands",
};

const ANIMATION_CONFIG = {
  SLIDE_DISTANCE: 300,
  ZOOM_SCALE: 1.3,
  HIDE_DELAY: 300,
  DURATIONS: {
    PAUSE: 1,
    HEADING_TRANSITION: 1.5,
    ELEMENT_SLIDE: 1,
  },
};

const MobileCarePage = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(
    NAVIGATION_BUTTONS.STUDENTS
  );
  const hideButtonsTimeoutRef = useRef(null);
  const isMobile = window.innerWidth < 768;

  const refs = {
    container: useRef(null),
    heading: useRef(null),
    subheading: useRef(null),
    leftImage: useRef(null),
    rightImage1: useRef(null),
    rightImage2: useRef(null),
    button: useRef(null),
    overwhelmedPara: useRef(null),
    quote: useRef(null),
  };

  useEffect(() => {
    if (isMobile) {
      setShowButtons(true);
    }
  }, [isMobile]);

  const setupInitialStates = () => {
    const animatableElements = [
      refs.leftImage.current,
      refs.rightImage1.current,
      refs.rightImage2.current,
      refs.button.current,
      refs.overwhelmedPara.current,
      refs.quote.current,
    ];

    if (isMobile) {
      // For mobile → just make everything visible instantly
      gsap.set(animatableElements, { opacity: 1, x: 0 });
      gsap.set([refs.heading.current, refs.subheading.current], {
        opacity: 1,
        position: "relative",
        top: "auto",
        left: "auto",
        transform: "scale(1)",
        zIndex: "auto",
        width: "100%",
        maxWidth: "none",
        textAlign: "center",
        display: "block",
      });
      return;
    }

    // Desktop → prepare for animation
    gsap.set(animatableElements, { opacity: 0 });

    gsap.set([refs.heading.current, refs.subheading.current], {
      opacity: 0,
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) scale(${ANIMATION_CONFIG.ZOOM_SCALE})`,
      zIndex: 1000,
      textAlign: "center",
      width: "100vw",
      maxWidth: "none",
    });

    gsap.set(
      [
        refs.leftImage.current,
        refs.overwhelmedPara.current,
        refs.quote.current,
      ],
      { x: -ANIMATION_CONFIG.SLIDE_DISTANCE }
    );
    gsap.set(
      [refs.rightImage1.current, refs.rightImage2.current, refs.button.current],
      { x: ANIMATION_CONFIG.SLIDE_DISTANCE }
    );
  };

  const runAnimation = () => {
    if (isMobile) return; // ❌ skip animations on mobile

    const tl = gsap.timeline();
    const { DURATIONS } = ANIMATION_CONFIG;

    tl.to({}, { duration: DURATIONS.PAUSE })
      .to([refs.heading.current, refs.subheading.current], {
        opacity: 1,
        position: "relative",
        top: "auto",
        left: "auto",
        transform: "scale(1)",
        zIndex: "auto",
        width: "100%",
        maxWidth: "none",
        textAlign: "center",
        display: "block",
        duration: DURATIONS.HEADING_TRANSITION,
        ease: "power2.out",
      })
      .to(
        refs.leftImage.current,
        {
          opacity: 1,
          x: 0,
          duration: DURATIONS.ELEMENT_SLIDE,
          ease: "power3.out",
        },
        "+=0.2"
      )
      .to(
        refs.overwhelmedPara.current,
        {
          opacity: 1,
          x: 0,
          duration: DURATIONS.ELEMENT_SLIDE,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .to(
        refs.quote.current,
        {
          opacity: 1,
          x: 0,
          duration: DURATIONS.ELEMENT_SLIDE,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        refs.rightImage1.current,
        {
          opacity: 1,
          x: 0,
          duration: DURATIONS.ELEMENT_SLIDE,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        refs.rightImage2.current,
        {
          opacity: 1,
          x: 0,
          duration: DURATIONS.ELEMENT_SLIDE,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .to(
        refs.button.current,
        {
          opacity: 1,
          x: 0,
          duration: DURATIONS.ELEMENT_SLIDE,
          ease: "power3.out",
        },
        "-=0.6"
      );
  };

  useEffect(() => {
    if (!refs.container.current) return;

    setupInitialStates();

    if (isMobile) return; // ❌ no scroll triggers on mobile

    ScrollTrigger.create({
      trigger: refs.container.current,
      start: "top 85%",
      onEnter: () => {
        runAnimation();
      },
    });

    const handleAnimationTrigger = (event) => {
      if (event.detail?.sectionName === "care") {
        runAnimation();
      }
    };

    window.addEventListener("triggerSectionAnimation", handleAnimationTrigger);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener(
        "triggerSectionAnimation",
        handleAnimationTrigger
      );
    };
  }, []);

  const renderNavigationButton = (type, label, route) => (
    <button
      className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
        hoveredButton === type
          ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
          : "bg-transparent text-gray-300 hover:text-white"
      }`}
      onClick={() => navigate(route)}
      onMouseEnter={() => setHoveredButton(type)}
      onMouseLeave={() => setHoveredButton(NAVIGATION_BUTTONS.STUDENTS)}
    >
      {label}
    </button>
  );

  const renderImage = (ref, src, alt, className = "") => (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg shadow-lg opacity-0 ${className}`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );

  return (
    <div
      ref={refs.container}
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${stcarebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      id="care"
    >
      {/* Background Design Elements */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full opacity-10"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0,0 C300,200 600,100 1200,300 L1200,800 L0,800 Z"
            fill="rgba(200,200,200,0.2)"
          />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="logo-container group inline-block cursor-pointer relative mb-6">
            <img
              src={stlogo}
              alt="Student Tribe Logo"
              className="h-12 sm:h-16 w-auto drop-shadow-lg mb-4"
            />

            {/* Navigation Buttons */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-[400px] h-[50px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-xl font-bold z-20 transition-all duration-300 ${
                showButtons
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{ top: "calc(100% + 8px)" }}
            >
              {renderNavigationButton(
                NAVIGATION_BUTTONS.STUDENTS,
                "Students",
                "/"
              )}
              {renderNavigationButton(
                NAVIGATION_BUTTONS.BRANDS,
                "Brands",
                "/brands"
              )}
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-auto sm:hidden flex flex-col gap-0 items-center mt-12">
          <div
            className="w-full h-0.5"
            style={{
              background:
                "radial-gradient(circle, #b8001f 100%, #7a0015 0%, #7a0015 0%)",
            }}
          />
          <div className="relative w-40 uppercase font-bold text-white">
            <p className="absolute left-1/2 -ml-1 -translate-x-1/2 inline-block text-[13px] top-1/2 -translate-y-1/2">
              ST Support
            </p>
            <img src={Tag} alt="" />
          </div>
        </div>

        {/* Main Content */}
        <div className="transition-transform duration-500 translate-y-26">
          <div className="text-center mb-4">
            <h1
              ref={refs.heading}
              className="text-2xl font-extrabold text-gray-800 mb-2 text-center"
            >
              Feeling Stuck?
            </h1>
            <h2
              ref={refs.subheading}
              className="text-xl font-bold text-gray-800 mb-4 text-center"
            >
              You're Not Alone, We're Here.
            </h2>
          </div>

          <div className="mb-4">
            <p
              ref={refs.overwhelmedPara}
              className="text-gray-700 text-base text-center opacity-0 px-2"
            >
              Overwhelmed? Anxious? Confused? You're safe here. We provide
              supportive conversations, judgment-free care, and guidance to help
              you build emotional strength.
            </p>
          </div>

          <div className="text-center mb-4">
            <span
              ref={refs.quote}
              className="text-base font-medium text-gray-800 italic opacity-0"
            >
              "Because mental health matters."
            </span>
          </div>

          <div className="flex gap-2 mb-3">
            <div className="w-1/2 h-36">
              {renderImage(
                refs.leftImage,
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
                "Assembly gathering",
                "h-full"
              )}
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <div className="flex gap-2 flex-1">
                {renderImage(
                  refs.rightImage1,
                  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=140&fit=crop",
                  "Community gathering",
                  "flex-1"
                )}
                {renderImage(
                  refs.rightImage2,
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=140&fit=crop",
                  "Support group",
                  "flex-1"
                )}
              </div>
              <button
                ref={refs.button}
                className="bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white px-4 py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-300 text-xs shadow-xl opacity-0 whitespace-nowrap"
                style={{ boxShadow: "0 4px 24px rgba(184,0,31,0.15)" }}
              >
                <span className="text-center leading-tight">
                  Feel Hard. Find Strength.
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCarePage;
