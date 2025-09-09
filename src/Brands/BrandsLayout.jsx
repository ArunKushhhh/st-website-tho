import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BrandsBottomNavbar from '../components/BrandsBottomNavbar';
import Home from './Home';
import OurOfferings from './OurOfferings';
import Testimonials from './Testimonials';
import Clients from './Clients';
import stlogo from '../assets/Whitelogo.png';

function BrandsLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const location = useLocation();
  const isBrandsHome = location.pathname === '/brands';
  const centerElementsRef = useRef(null);
  const [hoveredButton, setHoveredButton] = useState('brands');
  const navigate = useNavigate();

  // Refs for each section
  const homeRef = useRef(null);
  const offeringsRef = useRef(null);
  const clientsRef = useRef(null);
  const testimonialsRef = useRef(null);

  const navItems = [
    { id: 'Home', label: 'Home' },
    { id: 'Our Offerings', label: 'Our Offerings' },
    { id: 'Clients', label: 'Clients' },
    { id: 'Testimonials', label: 'Testimonials' }
  ];

  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
  };
  
  const handleButtonLeave = () => {
    setHoveredButton('brands');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const refs = {
      'Home': homeRef,
      'Our Offerings': offeringsRef,
      'Clients': clientsRef,
      'Testimonials': testimonialsRef
    };
    
    const targetRef = refs[sectionId];
    if (targetRef && targetRef.current) {
        targetRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          setActiveSection(sectionId);
          console.log('Active section set to:', sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = [homeRef, offeringsRef, clientsRef, testimonialsRef];

    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <>
      <style>{`
        img, svg {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          pointer-events: auto;
        }
      `}</style>

      {/* Mobile Header */}
      <div className="lg:hidden absolute top-32 sm:top-16 left-0 right-0 z-30">
        <div className="flex relative justify-center">
          <div className="flex flex-col items-center pb-4 gap-6">
            <motion.div
              className="flex flex-col items-center"
              initial={{ scale: 2, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <img
                src={stlogo}
                alt="Student Tribe Logo"
                className="h-12 sm:h-16 mx-auto sm:mb-3 drop-shadow-lg"
              />
            </motion.div>
            
            <motion.div
              className="flex justify-center bg-[#2d000a] rounded-full shadow-xl w-[400px] max-w-[90vw] h-[50px] mx-auto"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button
                className={`flex-1 font-medium transition-all duration-300 rounded-full text-xl ${
                  hoveredButton === 'students'
                    ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => handleButtonHover('students')}
              >
                Students
              </button>
              <button
                className={`flex-1 font-medium rounded-full text-xl transition-all duration-300 ${
                  hoveredButton === 'brands'
                    ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => handleButtonHover('brands')}
              >
                Brands
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      

      {/* Desktop Centered Logo and Buttons - Immediate Animation */}
      <div
        ref={centerElementsRef}
        className="hidden lg:block absolute top-0 left-0 right-0 z-50"
      >
        <div className="flex justify-center">
          <div className="flex flex-col items-center pointer-events-auto">
            <motion.div
              className="rounded-full p-6"
              initial={{ scale: 2, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={stlogo}
                alt="Student Tribe Logo"
                className="h-12 sm:h-16 mx-auto mb-6 drop-shadow-lg"
              />
            </motion.div>
            
            <motion.div
              className="bg-[#2d000a] rounded-full shadow-xl w-[400px] max-w-[90vw] h-[50px] flex"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button
                className={`flex-1 text-lg font-bold rounded-full transition-all ${
                  hoveredButton === 'students'
                    ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white cursor-pointer'
                    : 'text-gray-300 hover:text-white'
                }`}
                onMouseEnter={() => handleButtonHover('students')}
                onMouseLeave={handleButtonLeave}
                onClick={() => navigate("/")}
              >
                Students
              </button>
              <button
                className={`flex-1 text-lg font-bold rounded-full transition-all ${
                  hoveredButton === 'brands'
                    ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white cursor-pointer'
                    : 'text-gray-300 hover:text-white'
                }`}
                onMouseEnter={() => handleButtonHover('brands')}
                onMouseLeave={handleButtonLeave}
              >
                Brands
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`min-h-screen w-full overflow-x-hidden relative transition-colors duration-500 flex flex-col ${
          isBrandsHome ? 'bg-[#720713]' : 'bg-gradient-to-br from-[#b8001f] to-[#7a0015]'
        }`}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        <div className="flex flex-col">
          <div ref={homeRef} data-section="Home" className="w-full min-h-screen">
            <Home />
          </div>
          <div ref={offeringsRef} data-section="Our Offerings" className="w-full min-h-screen">
            <OurOfferings />
          </div>
          <div ref={clientsRef} data-section="Clients" className="w-full min-h-screen">
            <Clients />
          </div>
          <div ref={testimonialsRef} data-section="Testimonials" className="w-full min-h-screen">
            <Testimonials />
          </div>
        </div>
        <BrandsBottomNavbar 
          activeSection={activeSection} 
          onSectionClick={scrollToSection}
        />
      </div>
    </>
  );
}

export default BrandsLayout;