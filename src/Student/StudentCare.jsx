import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import banner from "../assets/StCare/banner.svg";
import stlogo from "../assets/Red logo.webp";
import stcarebg from "../assets/stcarebg.webp";
import MobileCarePage from "./MobileCarePage";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const StudentCare = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("students");
  const [isMobile, setIsMobile] = useState(false);
  const hideButtonsTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightContentRef = useRef(null);
  const rightImage1Ref = useRef(null);
  const rightImage2Ref = useRef(null);
  const buttonRef = useRef(null);
  const bottomButtonRef = useRef(null);
  const bottomTextRef = useRef(null);
  const overwhelmedParaRef = useRef(null);

  useEffect(() => {
    // Check if screen is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const runAnimation = () => {
      const tl = gsap.timeline();

      // Set initial states - hide everything
      gsap.set(
        [
          leftImageRef.current,
          rightContentRef.current,
          rightImage1Ref.current,
          rightImage2Ref.current,
          buttonRef.current,
          bottomButtonRef.current,
          bottomTextRef.current,
          overwhelmedParaRef.current,
        ],
        {
          opacity: 0,
        }
      );

      // Set headings to start from center of screen with absolute positioning
      gsap.set([headingRef.current, subheadingRef.current], {
        opacity: 1, // Make them visible initially
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        textAlign: "LEFT",
        width: "100vw",
        maxWidth: "none",
      });

      // Set other elements initial positions (but keep them hidden)
      gsap.set(leftImageRef.current, { x: -400 });
      gsap.set(rightContentRef.current, { x: 400 });
      gsap.set(rightImage1Ref.current, { scale: 0 });
      gsap.set(rightImage2Ref.current, { x: 300 });
      gsap.set(buttonRef.current, { y: -500 });
      gsap.set(bottomButtonRef.current, { y: -500 });
      gsap.set(bottomTextRef.current, { y: -500 });
      gsap.set(overwhelmedParaRef.current, { y: -500 });

      // Animation sequence (faster)
      tl
        // First, animate headings from center to their final position
        .to([headingRef.current, subheadingRef.current], {
          position: "relative",
          top: "auto",
          left: "auto",
          transform: "none",
          zIndex: "auto",
          width: "auto",
          maxWidth: "none",
          duration: 0.9,
          ease: "power2.out",
        })
        // Then animate all other elements (shorter durations)
        .to(
          leftImageRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "+=0.15" // Start shortly after headings finish
        )
        .to(
          rightContentRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6" // Start at same time as left image
        )
        .to(
          rightImage1Ref.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.6" // Start at same time as left image
        )
        .to(
          rightImage2Ref.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6" // Start at same time as left image
        )
        .to(
          [
            buttonRef.current,
            bottomButtonRef.current,
            bottomTextRef.current,
            overwhelmedParaRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05,
          },
          "+=0.15" // Start shortly after other animations
        );
    };

    if (containerRef.current) {
      // Set initial states first
      gsap.set(
        [
          leftImageRef.current,
          rightContentRef.current,
          rightImage1Ref.current,
          rightImage2Ref.current,
          buttonRef.current,
          bottomButtonRef.current,
          bottomTextRef.current,
          overwhelmedParaRef.current,
        ],
        {
          opacity: 0,
        }
      );

      // Set headings to center of screen initially
      gsap.set([headingRef.current, subheadingRef.current], {
        opacity: 1,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        textAlign: "center",
        width: "100vw",
        maxWidth: "none",
      });

      gsap.set(leftImageRef.current, { x: -400 });
      gsap.set(rightContentRef.current, { x: 400 });
      gsap.set(rightImage1Ref.current, { scale: 0 });
      gsap.set(rightImage2Ref.current, { x: 300 });
      gsap.set(buttonRef.current, { y: -500 });
      gsap.set(bottomButtonRef.current, { y: -500 });
      gsap.set(bottomTextRef.current, { y: -500 });
      gsap.set(overwhelmedParaRef.current, { y: -500 });

      // Create scroll trigger for care section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        onEnter: () => {
          console.log("STCare animation triggered!"); // Debug log
          runAnimation();
        },
      });

      // Listen for manual animation triggers
      const handleAnimationTrigger = (event) => {
        if (event.detail?.sectionName === "care") {
          console.log("STCare manual trigger!"); // Debug log
          runAnimation();
        }
      };

      window.addEventListener(
        "triggerSectionAnimation",
        handleAnimationTrigger
      );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        window.removeEventListener(
          "triggerSectionAnimation",
          handleAnimationTrigger
        );
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  // Hover handlers for logo/buttons
  const handleLogoOrButtonsMouseEnter = () => {
    // Clear any pending hide timeout
    if (hideButtonsTimeoutRef.current) {
      clearTimeout(hideButtonsTimeoutRef.current);
      hideButtonsTimeoutRef.current = null;
    }
    setShowButtons(true);
  };

  const handleLogoOrButtonsMouseLeave = (e) => {
    // Check if the mouse is leaving to go to a related element within the same container
    const relatedTarget = e.relatedTarget;
    const currentTarget = e.currentTarget;

    // If there's no related target (mouse left the window) or the related target
    // is not within our logo container, hide the buttons with a delay
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      // Add a small delay before hiding to allow smooth movement to buttons
      hideButtonsTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 300); // 300ms delay
    }
  };

  // Button hover handlers
  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
  };

  const handleButtonLeave = () => {
    setHoveredButton("students");
  };

  useEffect(() => {
  if (!buttonRef.current) return;

  const el = buttonRef.current;

  const handleEnter = () => {
    gsap.to(el, { scale: 1.05, duration: 0.2, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  el.addEventListener("mouseenter", handleEnter);
  el.addEventListener("mouseleave", handleLeave);

  return () => {
    el.removeEventListener("mouseenter", handleEnter);
    el.removeEventListener("mouseleave", handleLeave);
  };
}, []);


  // Render mobile version for small screens
  if (isMobile) {
    return <MobileCarePage />;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${stcarebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      id="care"
    >
      {/* Banner image top-right */}
      {/* <img
        src={banner}
        alt="ST Care Banner"
        className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-12 w-[20px] md:w-[30px] lg:w-[56px] h-auto select-none pointer-events-none"
        style={{ minWidth: "20px" }}
        loading="eager"
      /> */}
      {/* Background design elements */}
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

      {/* Main content container */}
      <div className="relative z-10 px-8 py-12 max-w-6xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-12">
          {/* ST logo */}
          <div
            className="logo-container group inline-block cursor-pointer relative mb-8"
            onMouseEnter={handleLogoOrButtonsMouseEnter}
            onMouseLeave={handleLogoOrButtonsMouseLeave}
          >
            {/* Replace manual logo with image logo */}
            <img
              src={stlogo}
              alt="Student Tribe Logo"
              className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
            />
            {/* Buttons appear below logo on hover */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 sm:w-[350px]  font-bold z-20 transition-all duration-300 flex justify-center bg-[#2d000a] rounded-full shadow-xl w-[400px] max-w-[90vw] h-[50px] mx-auto ${
                showButtons
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{
                top: "calc(100% + 8px)",
              }}
            >
              <button
                className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
                  hoveredButton === "students"
                    ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => navigate("/")}
                onMouseEnter={() => handleButtonHover("students")}
                onMouseLeave={handleButtonLeave}
              >
                Students
              </button>
              <button
                className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
                  hoveredButton === "brands"
                    ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => navigate("/brands")}
                onMouseEnter={() => handleButtonHover("brands")}
                onMouseLeave={handleButtonLeave}
              >
                Brands
              </button>
            </div>
          </div>
        </div>

        {/* Main Content with shifting */}
        <div
          className="transition-transform duration-500"
          style={{
            transform: showButtons ? "translateY(80px)" : "translateY(0)",
          }}
        >
          {/* Main content section - Two main flex sections */}
          <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
            {/* Left side - Assembly image */}
            <div className="flex-1 text-left ">
              <h1
                ref={headingRef}
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-800 mb-4"
              >
                Feeling Stuck?
              </h1>
              <h2
                ref={subheadingRef}
                className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-center text-gray-700 mb-6"
              >
                You're Not Alone — We're Here.
              </h2>
              <div
                ref={leftImageRef}
                className="relative overflow-hidden shadow-2xl opacity-0"
              >
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop"
                  alt="Assembly gathering"
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>

            {/* Right side - Text and images */}
            <div ref={rightContentRef} className="flex-1 opacity-0">
              {/* Text content */}
              <div className="mb-8">
                <div className="text-gray-700 space-y-4 mb-6 text-2xl text-bold text-left">
                  <p ref={overwhelmedParaRef} className="opacity-0">
                    Overwhelmed? Anxious? Confused? You're safe here. We provide
                    supportive conversations, judgment-free care, and guidance
                    to help you build emotional strength.
                  </p>

                  <div className="flex items-center gap-3 mt-6">
                    <span className="text-xl font-medium text-gray-800">
                      Because mental health matters.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side divided into two columns for images */}
              <div className="flex gap-6">
                {/* Left column in right section */}
                <div className="flex-1">
                  {/* Community image 1 */}
                  <div
                    ref={rightImage1Ref}
                    className="relative rounded-2xl overflow-hidden shadow-2xl mb-6 opacity-0"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop"
                      alt="Community gathering"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <button
                    ref={buttonRef}
                    className="lg:flex hidden bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white px-4 py-3 sm:px-2 sm:py-4 rounded-full font-bold items-center gap-0 hover:bg-red-700  text-sm sm:text-base shadow-xl w-full justify-center opacity-0 min-h-[30px] transition-all duration-300 group hover:scale-105"
                    style={{ boxShadow: "0 4px 24px rgba(184,0,31,0.15)" }}
                  >
                    <span className="text-center transition-all duration-300  flex-1">
                      Feel Heard. Find Strength.
                    </span>
                    <svg
                      width="18"
                      height="18"
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

                {/* Right column in right section */}
                <div className="flex-1">
                  {/* Community image 2 */}
                  <div
                    ref={rightImage2Ref}
                    className="relative rounded-2xl overflow-hidden shadow-2xl opacity-0"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
                      alt="Support group"
                      className="w-full h-68 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          {/* Call to action button below left image */}
          <button
            ref={bottomButtonRef}
            className="flex lg:hidden bg-red-800 text-white px-4 py-3 sm:px-8 sm:py-4 rounded-full font-bold items-center gap-2 hover:bg-red-700 transition-all duration-300 text-sm sm:text-base shadow-xl w-full justify-center opacity-0 min-h-[50px] "
            style={{ boxShadow: "0 4px 24px rgba(184,0,31,0.15)" }}
          >
            <span className="text-center flex-1">
              Feel Heard. Find Strength.
            </span>
            <svg
              width="18"
              height="18"
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

        {/* Bottom curved element */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 200"
            className="w-full h-32"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 C400,0 800,0 1200,200 L1200,200 L0,200 Z"
              fill="rgba(200,200,200,0.1)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StudentCare;
