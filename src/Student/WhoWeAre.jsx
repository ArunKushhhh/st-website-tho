import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/whoweare/banner.svg";
import stlogo from "../assets/Whitelogo.webp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../assets/whoweare/Frame 2147223304.svg";
import Tag from "../assets/tag.svg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function WhoweAre() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("students");
  const [displayNumber, setDisplayNumber] = useState("0");
  const [typewriterText1, setTypewriterText1] = useState("");
  const [typewriterText2, setTypewriterText2] = useState("");
  const [typewriterText3, setTypewriterText3] = useState("");
  const hideButtonsTimeoutRef = useRef(null);
  const isMobile = window.innerWidth < 768;
  useEffect(() => {
    if (isMobile) {
      setShowButtons(true);
    }
  }, [isMobile]);

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const tabsRef = useRef(null);
  const zeroRef = useRef(null);
  const textContentRef = useRef(null);
  const sideTextRef = useRef(null);
  const numberRef = useRef({ value: 0 });
  const typewriter1Ref = useRef(null);
  const typewriter2Ref = useRef(null);
  const typewriter3Ref = useRef(null);

  // Sample images for the zero shape
  const zeroImages = [
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop",
  ];

  // Typewriter function
  const typeWriter = (text, setter, duration = 1) => {
    return {
      duration: duration,
      onUpdate: function () {
        const progress = this.progress();
        const currentLength = Math.floor(progress * text.length);
        setter(text.substring(0, currentLength));
      },
    };
  };

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

  // GSAP Animation Timeline with ScrollTrigger
  useEffect(() => {
    const runAnimation = () => {
      // Set initial positions
      gsap.set([logoRef.current, tabsRef.current], { y: -50, opacity: 0 });
      gsap.set(zeroRef.current, { scale: 0, opacity: 0 });
      gsap.set(textContentRef.current, { y: 50, opacity: 0 });
      gsap.set(sideTextRef.current, { opacity: 0 });
      gsap.set(
        [
          typewriter1Ref.current,
          typewriter2Ref.current,
          typewriter3Ref.current,
        ],
        { opacity: 0 }
      );

      // Reset typewriter texts
      setTypewriterText1("");
      setTypewriterText2("");
      setTypewriterText3("");
      setDisplayNumber("0");
      numberRef.current.value = 0;

      const tl = gsap.timeline();

      // Animate all elements in sequence (faster timings)
      tl.to(
        [logoRef.current, tabsRef.current],
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
          stagger: 0.05,
        },
        0
      )
        .to(
          sideTextRef.current,
          {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0.2
        )
        .to(
          [
            typewriter1Ref.current,
            typewriter2Ref.current,
            typewriter3Ref.current,
          ],
          {
            opacity: 1,
            duration: 0.01,
          },
          0.5
        )
        .to(
          {},
          {
            ...typeWriter("We Tuned", setTypewriterText1, 0.7),
            ease: "none",
          },
          0.6
        )
        .to(
          zeroRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          1.3
        )
        .to(
          numberRef.current,
          {
            value: 25000,
            duration: 0.7,
            ease: "power2.out",
            onUpdate: () => {
              const currentValue = Math.floor(numberRef.current.value);
              if (currentValue >= 1000) {
                setDisplayNumber(`${Math.floor(currentValue / 1000)}k`);
              } else {
                setDisplayNumber(currentValue.toString());
              }
            },
          },
          1.5
        )
        .to(
          {},
          {
            ...typeWriter("Students,", setTypewriterText2, 0.4),
            ease: "none",
          },
          2.3
        )
        .to(
          {},
          {
            ...typeWriter("and still counting ...", setTypewriterText3, 0.7),
            ease: "none",
          },
          2.8
        )
        .to(
          textContentRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          3.5
        );
    };

    if (containerRef.current) {
      // Set initial positions
      gsap.set([logoRef.current, tabsRef.current], { y: -50, opacity: 0 });
      gsap.set(zeroRef.current, { scale: 0, opacity: 0 });
      gsap.set(textContentRef.current, { y: 50, opacity: 0 });
      gsap.set(sideTextRef.current, { opacity: 0 });
      gsap.set(
        [
          typewriter1Ref.current,
          typewriter2Ref.current,
          typewriter3Ref.current,
        ],
        { opacity: 0 }
      );

      // Typewriter function
      const typeWriter = (text, setter, duration = 1) => {
        return {
          duration: duration,
          onUpdate: function () {
            const progress = this.progress();
            const currentLength = Math.floor(progress * text.length);
            setter(text.substring(0, currentLength));
          },
        };
      };

      // Create scroll trigger for about section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: runAnimation,
      });

      // Listen for manual animation triggers
      const handleAnimationTrigger = (event) => {
        if (event.detail?.sectionName === "about") {
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
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg- relative overflow-hidden"
      id="about"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Banner image top-right */}
      {/* <img
        src={banner}
        alt="ST Beast Banner"
        className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-12 w-[20px] md:w-[30px] lg:w-[56px] h-auto select-none pointer-events-none"
        style={{ minWidth: "20px" }}
        loading="eager"
      /> */}

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 relative z-5 min-h-screen flex flex-col justify-center">
        {/* Header with Logo */}
        <div ref={logoRef} className="text-center mb-6 sm:mb-8 md:mb-12">
          <div
            className="logo-container group inline-block cursor-pointer relative"
            onMouseEnter={handleLogoOrButtonsMouseEnter}
            onMouseLeave={handleLogoOrButtonsMouseLeave}
          >
            {/* Replace manual logo with image logo */}
            <img
              src={stlogo}
              alt="Student Tribe Logo"
              className="h-12 sm:h-16 w-auto drop-shadow-lg mb-4"
            />
            {/* Buttons appear below logo on hover */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 sm:w-[350px]  font-bold z-20 transition-all duration-300 flex justify-center bg-[#2d000a] rounded-full shadow-xl w-[400px] max-w-[90vw] h-[50px] mx-auto mb-10 ${
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
                    : "bg-transparent text-gray-300 hover:text-white"
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
                    : "bg-transparent text-gray-300 hover:text-white"
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
        <div className="w-[90%] mx-auto sm:hidden flex flex-col gap-0 items-center mt-12">
          <div
            className="w-full h-0.5"
            style={{
              background:
                "radial-gradient(circle, #b8001f 100%, #7a0015 0%, #7a0015 0%)",
            }}
          />
          <div className="relative uppercase w-44 font-bold text-white">
            <p className="absolute w-full text-center -ml-2 left-1/2 -translate-x-1/2 inline-block text-[13px] top-1/2 -translate-y-1/2">
              ST network
            </p>
            <img src={Tag} alt="" />
          </div>
        </div>

        {/* Main Content Layout with shifting */}
        <div
          className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 md:space-y-10 flex-grow transition-transform duration-500"
          style={{
            transform: showButtons ? "translateY(20px)" : "translateY(0)",
          }}
        >
          {/* Typewriter Text Above Number */}
          <div
            ref={typewriter1Ref}
            className="text-white text-2xl sm:text-xl md:text-4xl lg:text-6xl font-extrabold tracking-wide"
          >
            {typewriterText1}
            <span className="animate-pulse text-red-400">|</span>
          </div>

          {/* Large Number with Images */}
          <div
            ref={zeroRef}
            className="flex justify-center my-2 sm:my-4 md:my-6"
          >
            <div className="relative">
              {/* Large Number Background */}
              <div
                className="text-[5rem] sm:text-[8rem] md:text-[18rem] lg:text-[25rem] font-black text-transparent bg-clip-text bg-center bg-contain leading-none"
                style={{
                  backgroundImage: `url(${zeroImages[0]})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {displayNumber}
              </div>

              {/* Image Grid Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-1 sm:gap-2 w-20 h-24 sm:w-32 sm:h-40 md:w-48 md:h-64">
                  {zeroImages.map((image, index) => (
                    <div key={index} className="relative"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typewriter Text Below Number */}
          <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div
                ref={typewriter2Ref}
                className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold"
              >
                {typewriterText2}
                {typewriterText2 &&
                  typewriterText2.length > 0 &&
                  !typewriterText3 && (
                    <span className="animate-pulse text-red-400">|</span>
                  )}
              </div>
              <div
                ref={typewriter3Ref}
                className="text-red-300 text-xl sm:text-xl md:text-2xl lg:text-4xl font-medium"
              >
                {typewriterText3}
                {typewriterText3 && typewriterText3.length > 0 && (
                  <span className="animate-pulse text-red-400">|</span>
                )}
              </div>
            </div>
          </div>

          {/* Text Content Below */}
          <div
            ref={textContentRef}
            className="text-white space-y-3 sm:space-y-4 md:space-y-6 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8"
          >
            <div className="text-base sm:text-base md:text-lg lg:text-xl leading-relaxed">
              We are India's largest and fastest growing student community,
              connecting <span className="text-red-300 font-bold">25,000+</span>{" "}
              students across the nation through innovative platforms and
              experiences.
            </div>
            <div className="text-sm sm:text-sm md:text-base lg:text-lg text-red-200">
              Join thousands of students who are already part of our vibrant
              ecosystem.
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-black to-transparent"></div>
      </div>
    </div>
  );
}

export default WhoweAre;
