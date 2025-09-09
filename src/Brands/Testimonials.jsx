import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import stlogo from "../assets/Whitelogo.png"; // Add this import
import { AnimatedTestimonials } from "../components/animated-testimonials";
import { useNavigate } from "react-router-dom";

const testimonialsData = [
  {
    id: 1,
    name: "Murali Kishora",
    designation: "Brand Manager, D2C Apparel Brand",
    quote:
      "Working with Student Tribe felt like having a finger on cultural trends. They knew exactly how to spark conversations that matter.",
    src:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Vikram Malhothra",
    designation: "Product Manager, EdTech App",
    quote:
      "Our app downloads surged during the activation week. They drive not just attention, but action.",
    src:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Divya Sharma",
    designation: "Artist",
    quote:
      "The innovative approach and deep understanding of our target market helped us achieve remarkable results.",
    src:
      "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    designation: "Brand Manager, FMCG",
    quote:
      "Student Tribe's approach to campus marketing is revolutionary. They delivered results beyond our expectations.",
    src:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Anita Verma",
    designation: "HR Director, IT Company",
    quote:
      "The quality of engagement and the authentic connections they facilitated were remarkable.",
    src:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredButton, setHoveredButton] = useState("brands");
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hover logo handlers
  const handleLogoOrButtonsMouseEnter = () => {
    setShowButtons(true);
  };

  const handleLogoOrButtonsMouseLeave = () => {
    setShowButtons(false);
    setHoveredButton("brands"); // Reset to default
  };

  // Scroll to section functions
  const scrollToSection = (section) => {
    if (section === "main-section") {
      console.log("Navigate to students section");
    } else if (section === "brands-section") {
      console.log("Navigate to brands section");
    }
  };

  // Button hover handlers
  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
  };

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnimationDirection("next");

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationDirection("");
      }, 100);
    }, 350);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnimationDirection("prev");

    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? testimonialsData.length - 1 : prev - 1
      );
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationDirection("");
      }, 100);
    }, 350);
  };



 

  return (
    <div className="min-h-screen bg-[#720713] text-white relative overflow-hidden">
      {/* Logo Section - Now in normal flow */}
      <div className="pt-6 pb-4">
        <div
          className="flex flex-col items-center pt-6"
          onMouseEnter={handleLogoOrButtonsMouseEnter}
          onMouseLeave={handleLogoOrButtonsMouseLeave}
        >
          <img
            src={stlogo}
            alt="Student Tribe Logo"
            className="h-12 sm:h-16 w-auto drop-shadow-lg mb-4"
          />

          <div
            className={`w-[400px] h-[50px] md:w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold transition-all duration-300 overflow-hidden ${
              showButtons
                ? "opacity-100 max-h-[60px] mb-4"
                : "opacity-0 max-h-0 mb-0"
            }`}
          >
            <button
              className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm md:text-lg hover:scale-105 ${
                hoveredButton === "students"
                  ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                  : "bg-transparent text-gray-300 hover:text-white"
              }`}
              onClick={() => navigate("/")}
              onMouseEnter={() => setHoveredButton("students")}
              onMouseLeave={() => setHoveredButton("brands")}
            >
              Students
            </button>
            <button
              className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm md:text-lg hover:scale-105 ${
                hoveredButton === "brands"
                  ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                  : "bg-transparent text-gray-300 hover:text-white"
              }`}
              onClick={() => scrollToSection("brands-section")}
              onMouseEnter={() => setHoveredButton("brands")}
              onMouseLeave={() => setHoveredButton("brands")}
            >
              Brands
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      {/* Mobile Layout – 65% center | 15% sides */}
      <div className="lg:hidden">
        <div className="mt-8 mb-8">
          <h1 className="text-3xl font-bold text-white text-left px-6">
            TESTIMONIALS
          </h1>
        </div>

        <div className="mb-8 px-6">
          <p className="text-lg font-medium text-white mb-2">
            Here's what our partners have to say about working with Student
            Tribe.
          </p>
          <p className="text-base font-light text-white/90">
            Real stories, Real impact.
          </p>
        </div>

        {/* Carousel */}
        <div className="mb-6">
          <div className="flex items-start justify-center gap-[2.5%] overflow-hidden">
            {/* LEFT IMAGE ONLY */}
            <div className="w-[15%] shrink-0 mt-4">
              <div className="h-44 rounded-md overflow-hidden opacity-60 blur-[2px]">
                <img
                  src={
                    testimonialsData[
                      (currentIndex - 1 + testimonialsData.length) %
                        testimonialsData.length
                    ].src
                  }
                  alt="previous"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* CENTER FULL CARD */}
            <div className="w-[65%] shrink-0">
              <div className="rounded-lg overflow-hidden bg-transparent text-white">
                {/* Image */}
                <div className="w-full h-60 relative overflow-hidden">
                  <img
                    src={testimonialsData[currentIndex].src}
                    alt={testimonialsData[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text */}
                <div className="pt-4 text-left h-[45%] overflow-hidden">                   
  <h3 className="text-lg font-bold mb-1 truncate">                     
    {testimonialsData[currentIndex].name}                   
  </h3>                   
  <p className="text-sm font-medium mb-2 sm:mb-3 text-white/80 truncate">                     
    {testimonialsData[currentIndex].designation}                   
  </p>                   
  <p className="text-sm leading-relaxed font-medium line-clamp-3">                     
    "{testimonialsData[currentIndex].quote}"                   
  </p>                 
</div>
              </div>
            </div>

            {/* RIGHT IMAGE ONLY */}
            <div className="w-[15%] shrink-0 mt-4">
              <div className="h-44 rounded-md overflow-hidden opacity-60 blur-[2px]">
                <img
                  src={
                    testimonialsData[
                      (currentIndex + 1) % testimonialsData.length
                    ].src
                  }
                  alt="next"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 pb-8">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 text-[#b8001f]" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 text-[#b8001f]" />
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden realtive lg:block">
        {/* Header Section */}
        <div className="container mx-auto px-4 md:px-6 max-w-7xl pt-8 md:pt-16 pb-4 md:pb-8 space-y-16">
          <h1 className="text-3xl absolute top-8 left-12  md:text-4xl lg:text-5xl font-bold tracking-wide">
            TESTIMONIALS
          </h1>
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg md:text-xl lg:text-2xl font-medium mb-2">
              Here's what our partners have to say about working with Student
              Tribe.
            </p>
            <p className="text-base md:text-lg lg:text-xl font-light opacity-90">
              Real stories, Real impact.
            </p>
          </div>
        </div>

        <AnimatedTestimonials testimonials={testimonialsData} />
      </div>
    </div>
  );
};

export default Testimonials;
