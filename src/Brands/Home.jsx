import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import ourofferings1 from "../assets/BrandsSection/ourofferings1.png";
import ourofferings2 from "../assets/BrandsSection/ouroffering2.png";

function Home() {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const [hoveredButton, setHoveredButton] = useState("brands");

  // Button hover handlers
  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
  };

  const handleButtonLeave = () => {
    setHoveredButton("brands");
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // Check if we're on mobile (you can adjust this breakpoint as needed)
    const isMobile = window.innerWidth < 1024; // lg breakpoint

    if (isMobile) {
      // Mobile animations - left column enters from left, right column from right
      gsap.set(leftColumnRef.current, {
        x: "-100vw", // Start from left
      });

      gsap.set(rightColumnRef.current, {
        x: "100vw", // Start from right
      });

      // Animate columns sliding in horizontally
      tl.to(leftColumnRef.current, {
        x: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
      }).to(
        rightColumnRef.current,
        {
          x: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1.2"
      );
    } else {
      // Desktop animations - original vertical animation
      gsap.set(leftColumnRef.current, {
        y: "100vh", // Start from bottom
      });

      gsap.set(rightColumnRef.current, {
        y: "-100vh", // Start from top
      });

      // Animate entire columns sliding in vertically
      tl.to(leftColumnRef.current, {
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
      }).to(
        rightColumnRef.current,
        {
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1.2"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row relative overflow-hidden">
      {/* Left Column */}
      <div
        ref={leftColumnRef}
        className="flex w-full sm:w-[50%] relative h-[100vh]  sm:min-h-screen "
        style={{ backgroundImage: `url(${ourofferings1})` }}
      >
        {/* Left Content */}
        <div className="flex flex-col justify-center pt-36 sm:pt-0 sm:pb-0 sm:justify-center items-start p-8 lg:px-16 bg-[#3D070D] opacity-80">
          <h1 className="text-[clamp(20px,calc(20px+(36-20)*(100vh-600px)/(900-600)),36px)] sm:text-4xl xl:text-6xl font-bold text-white mb-2 md:mb-6 leading-tight drop-shadow-2xl text-left">
            We don't just promote your brand, We build it.
          </h1>
          <p className="text-[clamp(12px,calc(12px+(18-12)*(100vh-600px)/(900-600)),18px)] sm:text-base lg:text-lg xl:text-xl text-white/90 sm:mb-8 leading-relaxed drop-shadow-lg text-left">
            Whether you're targeting one neighborhood or the entire country, we
            build campaigns that grow with you — meaningfully and measurably.
          </p>
          <button className="bg-[#b8001f] hover:bg-[#9a0019] text-lg sm:text-base sm:mb-8 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl items-end self-center mt-24">
            Explore More →
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div
        ref={rightColumnRef}
        className="flex w-full sm:w-[50%] relative h-[40vh]  sm:min-h-screen"
        style={{
          backgroundImage: `url(${ourofferings2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Right Content */}
        <div className="flex flex-col sm:pt-8 justify-center items-end px-8 lg:px-16  bg-[#FFD2D7] opacity-80">
          {/* Main Content */}

          <h2 className="text-[clamp(20px,calc(20px+(36-20)*(100vh-600px)/(900-600)),36px)]  sm:text-4xl xl:text-6xl font-bold leading-tight drop-shadow-2xl text-black text-right">
            You focus on the message, We handle everything else
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
