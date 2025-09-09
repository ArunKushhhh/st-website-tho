import React, { useState, useEffect, useRef } from 'react';

const BrandsBottomNavbar = ({ activeSection, onSectionClick }) => {
  const [footerVisible, setFooterVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hamburgerColor, setHamburgerColor] = useState("white"); // Default to white
  const observerRef = useRef(null);

  // Debug log
  console.log('Navbar active section:', activeSection);
  
  const navItems = [
    { id: 'Home', label: 'Home' },
    { id: 'Our Offerings', label: 'Our Offerings' },
    { id: 'Clients', label: 'Clients' },
    { id: 'Testimonials', label: 'Testimonials' }
  ];

  // Hide navbar when footer is visible
  useEffect(() => {
    const footer = document.querySelector('footer');
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

  // Dynamic color detection based on current section
  useEffect(() => {
    // For brands page, we can set color based on activeSection
    // Assuming "Clients" section might have a light background
    if (activeSection === "Clients") {
      setHamburgerColor("red");
    } else {
      setHamburgerColor("white");
    }
  }, [activeSection]);

  const handleTabClick = (sectionId) => {
    console.log('Navbar clicked:', sectionId);
    onSectionClick(sectionId);
    setIsOpen(false);

    // Dispatch custom event to trigger section animations
    const event = new CustomEvent('navbarClick', { 
      detail: { sectionId: sectionId } 
    });
    window.dispatchEvent(event);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-navbar')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  if (footerVisible) return null;

  return (
    <>
      {/* Desktop Navbar (hidden on mobile) */}
      <div className="fixed justify-center items-center bottom-0 left-0 right-0 z-50 hidden lg:flex">
        <div className="max-w-4xl bg-black/90 rounded-full mx-4 mb-2 overflow-hidden shadow-2xl p-2" style={{ backdropFilter: 'blur(61.83246994018555px)' }}>
          <div className="flex justify-between gap-2 items-center px-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-300 whitespace-nowrap ${
                  activeSection === item.id
                    ? 'text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                style={activeSection === item.id ? {
                  background: 'linear-gradient(90deg, rgba(184, 0, 31, 0.2) 0%, rgba(184, 0, 31, 0.6) 50%, rgba(184, 0, 31, 0.2) 100%)',
                  backdropFilter: 'blur(61.83246994018555px)',
                  boxShadow: '0 0 20px rgba(184, 0, 31, 0.4), 0 0 40px rgba(184, 0, 31, 0.2), inset 0 0 10px rgba(184, 0, 31, 0.1)'
                } : {}}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet Navbar (medium screens) */}
      <div className="fixed justify-center items-center bottom-0 left-0 right-0 z-50 hidden md:flex lg:hidden">
        <div className="max-w-3xl bg-black/90 rounded-full mx-4 mb-2 overflow-hidden shadow-2xl p-2" style={{ backdropFilter: 'blur(61.83246994018555px)' }}>
          <div className="flex justify-between gap-1 items-center px-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeSection === item.id
                    ? 'text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                style={activeSection === item.id ? {
                  background: 'linear-gradient(90deg, rgba(184, 0, 31, 0.2) 0%, rgba(184, 0, 31, 0.6) 50%, rgba(184, 0, 31, 0.2) 100%)',
                  backdropFilter: 'blur(61.83246994018555px)',
                  boxShadow: '0 0 15px rgba(184, 0, 31, 0.4), 0 0 30px rgba(184, 0, 31, 0.2), inset 0 0 8px rgba(184, 0, 31, 0.1)'
                } : {}}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Hamburger - Fixed Top Right */}
      <div className="md:hidden fixed top-6 right-6 z-50 mobile-navbar">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 focus:outline-none transition-all duration-300 relative z-50"
        >
          {/* Three-line hamburger with dynamic color */}
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
                "linear-gradient(145deg, rgba(184, 0, 31, 0.98) 0%, rgba(150, 0, 25, 0.98) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Menu Items */}
            <div className="p-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full text-center px-6 py-4 font-semibold text-base transition-all duration-300 border-b border-white/10 last:border-b-0 ${
                    activeSection === item.id
                      ? "bg-white/10 text-white"
                      : "bg-transparent text-white/90 hover:bg-white/5"
                  }`}
                >
                  {item.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandsBottomNavbar;