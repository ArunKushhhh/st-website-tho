import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; // Add hamburger and close icons

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [splashActive, setSplashActive] = useState(true);
  const [hamburgerColor, setHamburgerColor] = useState("white"); // Default to white
  const observerRef = useRef(null);
  const sectionsObserverRef = useRef(null);

  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS!

  // Define the active button styles as a JavaScript object
  const activeButtonStyle = {
    background:
      "linear-gradient(90deg, rgba(206, 32, 47, 0.2) 0%, rgba(206, 32, 47, 0.6) 50%, rgba(206, 32, 47, 0.2) 100%)",
    backdropFilter: "blur(61.83246994018555px)",
    boxShadow:
      "0 0 15px rgba(206, 32, 47, 0.4), 0 0 30px rgba(206, 32, 47, 0.2), inset 0 0 8px rgba(206, 32, 47, 0.1)",
    border: "1px solid rgba(206, 32, 47, 0.3)",
    transform: "scale(1.05)",
  };

  // Hide navbar during splash screen animation
  useEffect(() => {
    setSplashActive(true);

    const splashTimer = setTimeout(() => {
      setSplashActive(false);
      // Auto-activate first tab for testing
      setTimeout(() => {
        // console.log("Auto-activating first section for testing..."); // REMOVED
        setActiveTab("St School");
      }, 0);
    }, 0);

    const handleSplashEnd = () => {
      setSplashActive(false);
    };

    const handleSplashFadeStart = () => {
      setTimeout(() => {
        setSplashActive(false);
      }, 0);
    };

    window.addEventListener("splashScreenEnd", handleSplashEnd);
    window.addEventListener("splashScreenFadeStart", handleSplashFadeStart);

    return () => {
      clearTimeout(splashTimer);
      window.removeEventListener("splashScreenEnd", handleSplashEnd);
      window.removeEventListener(
        "splashScreenFadeStart",
        handleSplashFadeStart
      );
    };
  }, []);

  // Hide navbar when footer is visible
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new window.IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    observerRef.current.observe(footer);
    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  const menuItems = [
    { id: "St School", name: "St. School", sectionId: "school" },
    { id: "ST App", name: "St. App", sectionId: "app" },
    {
      id: "ST Opportunities",
      name: "St. Opportunities",
      sectionId: "opportunities",
    },
    { id: "ST Events", name: "St. Events", sectionId: "events" },
    { id: "ST Beast", name: "St. Beast", sectionId: "beast" },
    { id: "ST Care", name: "St. Care", sectionId: "care" },
    { id: "Who We Are", name: "WHO WE ARE", sectionId: "about" },
  ];

  // In Header.jsx, inside the handleScroll function
const handleScroll = (sectionId, itemId) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(itemId);
    setIsOpen(false); // close menu after click (on mobile)

    // NEW CODE: Dispatch a custom event to force the animation
    if (sectionId === "beast") {
      const event = new CustomEvent("animateBeastSection");
      window.dispatchEvent(event);
    }
  } else {
    console.warn("Navigation element not found:", sectionId);
  }
};
  // Use scroll-based detection for active section highlighting
  useEffect(() => {
    // Clean up previous observer
    if (sectionsObserverRef.current) {
      sectionsObserverRef.current.disconnect();
    }

    // Simple scroll-based detection
    const handleScrollDetection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Handle very top of page
      if (scrollY < 50) {
        setActiveTab(null);
        setHamburgerColor("white"); // Default color for top
        return;
      }

      // Find the section that's currently most visible in viewport
      let activeSection = null;
      let maxVisibility = 0;
      let currentSectionColor = "white"; // Default

      menuItems.forEach((item) => {
        const element = document.getElementById(item.sectionId);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;

        // Calculate how much of the element is visible
        const visibleTop = Math.max(0, -elementTop);
        const visibleBottom = Math.max(0, elementBottom - windowHeight);
        const visibleHeight = elementHeight - visibleTop - visibleBottom;
        const visibilityRatio = Math.max(0, visibleHeight / windowHeight);

        // Also consider if the element is currently in the middle portion of the viewport
        const elementCenter = elementTop + elementHeight / 2;
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        const centerBonus =
          Math.max(0, 1 - distanceFromCenter / (windowHeight / 2)) * 0.5;

        const totalVisibility = visibilityRatio + centerBonus;

        if (totalVisibility > maxVisibility && totalVisibility > 0.2) {
          maxVisibility = totalVisibility;
          activeSection = item.id;

          // More sophisticated color detection based on section content
          // Check for actual background colors by computing styles
          const computedStyle = window.getComputedStyle(element);
          const backgroundColor = computedStyle.backgroundColor;
          const backgroundImage = computedStyle.backgroundImage;

          // Default to white lines for most sections (dark backgrounds)
          currentSectionColor = "white";

          // Check for light backgrounds - sections that typically have white/light backgrounds
          if (
            item.sectionId === "school" ||
            backgroundColor.includes("rgb(255") || // White background
            backgroundColor.includes("rgb(240") || // Light gray backgrounds
            backgroundColor.includes("rgb(248") || // Very light backgrounds
            !backgroundColor ||
            backgroundColor === "rgba(0, 0, 0, 0)" ||
            backgroundColor === "transparent"
          ) {
            // For light backgrounds or transparent (which might reveal light content), use red lines
            currentSectionColor = "red";
          }

          // Debug log to help understand what's being detected
          // console.log(
          //   `Section: ${item.sectionId}, BG: ${backgroundColor}, Color: ${currentSectionColor}`
          // );
        }
      });

      setActiveTab(activeSection);
      setHamburgerColor(currentSectionColor);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScrollDetection, { passive: true });

    // Initial check after splash screen
    if (!splashActive) {
      setTimeout(handleScrollDetection, 0);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollDetection);
    };
  }, [splashActive]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".mobile-header")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // NOW we can safely return early after all hooks have been called
  if (location.pathname !== "/") return null;

  if (footerVisible || splashActive) return null;

  return (
    <div className="fixed inset-x-0 bottom-3 flex justify-center z-50">
      {/* Desktop Menu */}
      <div
        className="hidden  md:flex items-center px-4 py-2 rounded-full shadow-xl space-x-4"
        style={{
          background: `linear-gradient(to right, #000 0%, #1a1a1a 20%, #1a1a1a 80%, #000 100%)`,
          boxShadow: "0 0 60px 20px rgba(0, 0, 0, 0.6)",
        }}
      >
        {menuItems.map(({ id, name, sectionId }) => (
          <button
            key={name}
            onClick={() => handleScroll(sectionId, id)}
            className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 whitespace-nowrap ${
              activeTab === id
                ? "text-white shadow-lg scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
            style={activeTab === id ? activeButtonStyle : {}}
          >
            {name}
            {/* Debug: Show if this button is active */}
          </button>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-6 right-6 z-50 mobile-header">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 focus:outline-none transition-all duration-300 relative z-50"
        >
          {/* Simple hamburger lines with dynamic color */}
          <div className="flex flex-col justify-center w-6 h-6 relative">
            <div
              className={`h-0.5 w-6 transition-all duration-300 transform absolute top-1/2 left-0 ${
                isOpen
                  ? "rotate-45 bg-white"
                  : hamburgerColor === "red"
                  ? "bg-red-600 -translate-y-2"
                  : "bg-white -translate-y-2"
              }`}
            ></div>
            <div
              className={`h-0.5 w-6 transition-all duration-300 absolute top-1/2 left-0 ${
                isOpen
                  ? "opacity-0"
                  : hamburgerColor === "red"
                  ? "bg-red-600"
                  : "bg-white"
              }`}
            ></div>
            <div
              className={`h-0.5 w-6 transition-all duration-300 transform absolute top-1/2 left-0 ${
                isOpen
                  ? "-rotate-45 bg-white"
                  : hamburgerColor === "red"
                  ? "bg-red-600 translate-y-2"
                  : "bg-white translate-y-2"
              }`}
            ></div>
          </div>
        </button>

        {/* Mobile Backdrop with light blur */}
        {isOpen && (
          <div
            className="fixed inset-0 z-20 transition-all duration-300 ease-out"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Bottom slide-up menu */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out transform ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <div
            className="w-full rounded-t-3xl shadow-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(139, 34, 47, 0.98) 0%, rgba(105, 25, 35, 0.98) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Menu Items */}
            <div className="p-2">
              {menuItems.map(({ id, name, sectionId }) => (
                <button
                  key={name}
                  onClick={() => handleScroll(sectionId, id)}
                  className={`w-full text-center px-6 py-4 font-semibold text-base transition-all duration-300 border-b border-white/10 last:border-b-0 ${
                    activeTab === id
                      ? "bg-white/10 text-white"
                      : "bg-transparent text-white/90 hover:bg-white/5"
                  }`}
                >
                  {name.toUpperCase()}
                </button>
              ))}

              {/* Contact Us Button */}
              <button className="w-full text-center px-6 py-4 font-semibold text-base transition-all duration-300 bg-transparent text-white/90 hover:bg-white/5">
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
