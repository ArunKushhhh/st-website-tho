import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import footerImf from "../assets/st2/footerImf.png";

export default function Footer() {
  const location = useLocation();
  const isBrandsRoute = location.pathname === '/brands';

  // Navigation items based on route
  const getNavItems = () => {
    if (isBrandsRoute) {
      return [
        { id: "Home", label: "HOME", sectionId: "home" },
        { id: "Our Offerings", label: "OUR OFFERINGS", sectionId: "offerings" },
        { id: "Clients", label: "CLIENTS", sectionId: "clients" },
        { id: "Testimonials", label: "TESTIMONIALS", sectionId: "testimonials" },
      ];
    }
    
    return [
      { id: "St School", label: "St. School", sectionId: "school" },
      { id: "ST App", label: "St. App", sectionId: "app" },
      { id: "ST Opportunities", label: "St. Opportunities", sectionId: "opportunities" },
      { id: "ST Events", label: "St. Events", sectionId: "events" },
      { id: "ST Beast", label: "St. Beast", sectionId: "beast" },
      { id: "ST Care", label: "St. Care", sectionId: "care" },
      { id: "Who We Are", label: "WHO WE ARE", sectionId: "about" },
    ];
  };

  const navItems = getNavItems();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="w-full bg-[#efd1d6]">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8 md:py-12">
        {/* Footer navigation buttons - Hidden on mobile for brands route */}
        <div className={`${isBrandsRoute ? 'hidden sm:flex' : 'flex'} flex-wrap justify-center gap-1 sm:gap-2 mb-4 sm:mb-6 md:mb-8`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.sectionId)}
              className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold bg-[#2C1B1B] text-white hover:bg-[#b8001f] hover:text-white transition-all duration-200 shadow whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Main footer content */}
        <div
          className="rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col lg:flex-row relative overflow-hidden min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]"
          style={
            isBrandsRoute
              ? {
                  background: 'radial-gradient(circle at center center, rgb(95,23,40) 0%, rgb(82,5,27) 20%, rgb(70,6,26) 40%, rgb(50,0,11) 60%, rgb(40,1,11) 85%)'
                }
              : {
                  backgroundImage: `url(${footerImf})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }
          }
        >
          {/* Left side - Main headline and button */}
          <div className="flex-1 lg:flex-[0.4] mb-8 lg:mb-0 flex flex-col justify-start z-10">
            <h2 className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6 leading-tight">
              {isBrandsRoute ? (
                <>
                  Be the Brand<br />
                  They Can't Stop<br />
                  Talking About.
                </>
              ) : (
                <>
                  Want to join our<br />
                  community?
                </>
              )}
            </h2>
            <button className="bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 text-sm md:text-base w-fit">
              <span className="whitespace-nowrap">Contact US</span>
              <span className="ml-2">→</span>
            </button>
          </div>

          {/* Right side - Three columns layout */}
          <div className="flex-1 lg:flex-[0.6] flex flex-col sm:flex-row justify-end gap-6 sm:gap-8 md:gap-12 lg:gap-16 z-10">
            
            {/* Explore Column */}
            <div className="min-w-0 flex-shrink-0">
              <h4 className="text-white font-bold text-lg md:text-xl mb-4">
                Explore
              </h4>
              <ul className="text-white/90 space-y-2 text-sm">
                {isBrandsRoute ? (
                  <>
                    <li><Link to="/" className="hover:text-white transition-colors">HOME</Link></li>
                    <li><Link to="/offerings" className="hover:text-white transition-colors">OUR OFFERINGS</Link></li>
                    <li><Link to="/clients" className="hover:text-white transition-colors">CLIENTS</Link></li>
                    <li><Link to="/testimonials" className="hover:text-white transition-colors">TESTIMONIALS</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/" className="hover:text-white transition-colors">ST SCHOOL</Link></li>
                    <li><Link to="/app" className="hover:text-white transition-colors">ST APP</Link></li>
                    <li><Link to="/brands" className="hover:text-white transition-colors">ST EVENTS</Link></li>
                    <li><Link to="/beast" className="hover:text-white transition-colors">ST BEAST</Link></li>
                    <li><Link to="/care" className="hover:text-white transition-colors">ST CARE</Link></li>
                    <li><Link to="/about" className="hover:text-white transition-colors">WHO WE ARE</Link></li>
                  </>
                )}
              </ul>
            </div>

            {/* Socials Column */}
            <div className="min-w-0 flex-shrink-0">
              <h4 className="text-white font-bold text-lg md:text-xl mb-4">
                Socials
              </h4>
              <div className="flex flex-row  gap-4 text-white/90">
                {isBrandsRoute ? (
                  <>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="hover:text-white transition-colors text-2xl"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-white transition-colors text-2xl"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="hover:text-white transition-colors text-2xl"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="hover:text-white transition-colors"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-white transition-colors"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="hover:text-white transition-colors"
                    >
                      <Youtube className="w-6 h-6" />
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info Column */}
            <div className="min-w-0 flex-shrink-0">
              <h4 className="text-white font-bold text-lg md:text-xl mb-4">
                Contact Info
              </h4>
              <ul className="text-white/90 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  {isBrandsRoute ? (
                    <>
                      <span>✉</span>
                      <span>hello@stschool.com</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>hello@stschool.com</span>
                    </>
                  )}
                </li>
                <li className="flex items-center gap-2">
                  {isBrandsRoute ? (
                    <>
                      <span>📞</span>
                      <span>+91 9876543210</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4" />
                      <span>+91 9876543210</span>
                    </>
                  )}
                </li>
                <li className="flex items-start gap-2">
                  {isBrandsRoute ? (
                    <>
                      <span className="flex-shrink-0 mt-0.5">📍</span>
                      <span>Hyderabad, Telangana, India</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Hyderabad, Telangana, India</span>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* Large Student Tribe watermark */}
          <div className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-none select-none z-0">
            <span className="absolute -bottom-2 lg:-bottom-7 w-full text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-black text-[#640303] opacity-60 leading-none whitespace-nowrap tracking-[0.02em] sm:tracking-[0.05em] px-4">
              Student Tribe
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 sm:mt-8 text-[#2d1c1c] text-sm gap-2">
          <div className="flex gap-4 ">
            <Link
              to="/privacy"
              className="whitespace-nowrap hover:text-[#b8001f] transition-colors font-medium"
            >
              PRIVACY POLICY
            </Link>
            <Link
              to="/terms"
              className="whitespace-nowrap hover:text-[#b8001f] transition-colors font-medium"
            >
              TERMS & CONDITIONS
            </Link>
          </div>
          <div className="opacity-80 whitespace-nowrap text-center xs:text-right font-medium">
            © 2025 Student Tribe. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* FontAwesome Icons - only for brands route */}
      {isBrandsRoute && (
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      )}
    </footer>
  );
}