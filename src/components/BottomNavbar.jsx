import React, { useState, useEffect, useRef } from "react";
import "./BottomNavbar.css";

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [splashActive, setSplashActive] = useState(true);
  const observerRef = useRef(null);
  const sectionsObserverRef = useRef(null);

  // Define the active button styles as a JavaScript object
  const activeButtonStyle = {
    background:
      "linear-gradient(90deg, rgba(206, 32, 47, 0.2) 0%, rgba(206, 32, 47, 0.6) 50%, rgba(206, 32, 47, 0.2) 100%) !important",
    backdropFilter: "blur(61.83246994018555px) !important",
    boxShadow:
      "0 0 15px rgba(206, 32, 47, 0.4), 0 0 30px rgba(206, 32, 47, 0.2), inset 0 0 8px rgba(206, 32, 47, 0.1) !important",
    border: "1px solid rgba(206, 32, 47, 0.3) !important",
    outline: "3px solid yellow !important", // Debug outline - more visible
    transform: "scale(1.05)",
  };

  // Hide navbar during splash screen animation
  useEffect(() => {
    setSplashActive(true);

    const splashTimer = setTimeout(() => {
      setSplashActive(false);
      // Auto-activate first tab for testing - much faster
      setTimeout(() => {
        console.log("Auto-activating ST School for testing...");
        setActiveTab("ST School");
      }, 500);
    }, 6700);

    const handleSplashEnd = () => {
      setSplashActive(false);
    };

    const handleSplashFadeStart = () => {
      setTimeout(() => {
        setSplashActive(false);
      }, 700);
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

  // Navigation items matching your actual page structure
  const navItems = [
    { id: "ST School", label: "St. School", sectionId: "school" },
    { id: "ST App", label: "St. App", sectionId: "app" },
    {
      id: "ST Opportunities",
      label: "St. Opportunities",
      sectionId: "opportunities",
    },
    { id: "ST Events", label: "St. Events", sectionId: "events" },
    { id: "ST Beast", label: "St. Beast", sectionId: "beast" },
    { id: "ST Care", label: "St. Care", sectionId: "care" },
    { id: "Who We Are", label: "Who We Are", sectionId: "about" },
  ];

  const scrollToSection = (sectionId) => {
    console.log("Trying to scroll to:", sectionId);
    const element = document.getElementById(sectionId);
    console.log("Found element:", element);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      console.log("Scrolled to element");
    } else {
      console.log("Element not found! Available elements with IDs:");
      const allElementsWithIds = document.querySelectorAll("[id]");
      allElementsWithIds.forEach((el) => console.log("- ", el.id));
    }
  };

  const handleTabClick = (item) => {
    console.log("Tab clicked:", item);
    setActiveTab(item.id);
    scrollToSection(item.sectionId);
    setIsOpen(false);

    // Dispatch custom event to trigger section animations (preserve existing functionality)
    const event = new CustomEvent("navbarClick", {
      detail: { sectionId: item.sectionId },
    });
    window.dispatchEvent(event);
  };

  // Use Intersection Observer for more reliable section detection
  useEffect(() => {
    // Clean up previous observer
    if (sectionsObserverRef.current) {
      sectionsObserverRef.current.disconnect();
    }

    // Simple scroll-based detection
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Handle very top of page
      if (scrollY < 50) {
        setActiveTab(null);
        return;
      }

      // Find the section that's currently most visible in viewport
      let activeSection = null;
      let maxVisibility = 0;

      navItems.forEach((item) => {
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
        }
      });

      console.log(
        "Active section detected:",
        activeSection,
        "visibility:",
        maxVisibility
      );
      setActiveTab(activeSection);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check after splash screen
    if (!splashActive) {
      setTimeout(handleScroll, 500);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [splashActive]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".mobile-navbar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  if (footerVisible || splashActive) return null;

  return (
    <>
      {/* Desktop Navbar (hidden on mobile) */}
      <div className="fixed justify-center items-center bottom-0 left-0 right-0 z-50 hidden lg:flex">
        <div
          className="max-w-7xl bg-black/90 rounded-full mx-4 mb-2 overflow-hidden shadow-2xl p-2"
          style={{ backdropFilter: "blur(61.83246994018555px)" }}
        >
          <div className="flex justify-between gap-2 items-center px-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`px-4 py-2 rounded-full text-yellow-500 text-base font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === item.id
                    ? "  shadow-lg scale-105 font-bold"
                    : "  hover:text-white hover:bg-white/10"
                }`}
                style={activeTab === item.id ? activeButtonStyle : {}}
              >
                {item.label}
                {/* Debug: Show if this button is active */}
                {activeTab === item.id && <span className="ml-1">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet Navbar (medium screens) */}
      <div className="fixed justify-center items-center bottom-0 left-0 right-0 z-50 hidden md:flex lg:hidden">
        <div
          className="max-w-4xl bg-black/90 rounded-full mx-4 mb-2 overflow-hidden shadow-2xl p-2"
          style={{ backdropFilter: "blur(61.83246994018555px)" }}
        >
          <div className="flex justify-between gap-1 items-center px-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === item.id
                    ? "text-white shadow-lg scale-105 font-bold"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                style={activeTab === item.id ? activeButtonStyle : {}}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed bottom-0 right-4 z-50 md:hidden mobile-navbar">
        {/* Mobile Menu with bottom slide-up animation */}
        <div
          className={`transition-all duration-500 ease-out transform ${
            isOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-full opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div
            className="rounded-3xl mb-2 overflow-hidden shadow-2xl border border-white/10"
            style={{
              background:
                "linear-gradient(145deg, rgba(184, 0, 31, 0.95) 0%, rgba(122, 0, 21, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 mb-2 last:mb-0 border ${
                    activeTab === item.id
                      ? "bg-white text-red-900 border-white shadow-lg"
                      : "bg-transparent text-white border-white/20 hover:bg-white/10 hover:border-white/40"
                  }`}
                >
                  {item.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          style={{
            background: "linear-gradient(135deg, #b8001f 0%, #7a0015 100%)",
            boxShadow: "0 4px 15px rgba(184, 0, 31, 0.4)",
          }}
          aria-label="Toggle navigation menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Backdrop with blur */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden transition-all duration-300 ease-out"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default BottomNavbar;
