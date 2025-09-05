import React, { useState } from "react";
import stlogo from "../assets/Red logo.png";
import { nav } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

// Example client logos (replace with actual imports/assets as needed)
const clients = [
  {
    name: "Max Fashions",
    img: "https://play-lh.googleusercontent.com/Xf_OnMAahxsjkdJ7Z7mFOyRNzHkv8DGxFt6d2cyetjp0Y56nl6XTUKjSp62HTs_IXbkV",
  },
  {
    name: "Newton School",
    img: "https://images.indianexpress.com/2022/12/NewtonSchool_LEAD.jpg",
  },
  {
    name: "Sony Music",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Sony_Music_Entertainment_Logo_2023.svg/1200px-Sony_Music_Entertainment_Logo_2023.svg.png",
  },
  {
    name: "Swiggy",
    img: "https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png",
  },
  {
    name: "TAO Digital",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLKYOOtgIcdkSdkl9MOgO-yeOe-Ufi89dDRQ&s",
  },
  {
    name: "SBI",
    img: "https://logos-world.net/wp-content/uploads/2023/02/SBI-Logo.png",
  },
  {
    name: "Abhibus",
    img: "https://hospitalitylexis.media/wp-content/uploads/2024/08/AbhiBus.png",
  },
  {
    name: "Duolingo",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrkdQ723qnf4GERCJEaf_PSyK-Jh_jB6B_w&s",
  },
];

const Clients = () => {
  const [hoveredButton, setHoveredButton] = useState("brands");
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  const handleLogoOrButtonsMouseEnter = () => setShowButtons(true);
  const handleLogoOrButtonsMouseLeave = () => {
    setShowButtons(false);
    setHoveredButton("brands");
  };

  const scrollToSection = (section) => {
    if (section === "main-section") {
      console.log("Navigate to students section");
    } else if (section === "brands-section") {
      console.log("Navigate to brands section");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#f8d7dd] to-[#e7bfc7] relative">
      {/* Top logo + toggle (shared) */}
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

      {/* Content area (shared text, responsive type) */}
      <div className="flex flex-col sm:flex-row justify-between pt-[clamp(25px,1.5vh,55px)]  w-full h-full ">
        <div className="px-6 lg:px-24 pb-8 lg:py-12 max-w-[1200px] ">
          <h1 className="sm:absolute left-24 top-6 text-[#b8001f] text-xl sm:text-4xl font-bold mb-4  text-left ">
            CLIENTS
          </h1>

          {/* Heading switches copy between mobile/desktop without duplicating layout */}
          <h2
            className="text-[#3a2327] font-bold leading-tight mb-2 sm:mb-6 text-left  text-[clamp(20px,calc(20px+(36-20)*(100vh-600px)/(900-600)),36px)] sm:text-4xl lg:text-7xl"
            style={{ letterSpacing: "-1px", lineHeight: "1.1" }}
          >
            <span className="hidden lg:inline">
              We turn Client<br />Goals&nbsp; into Success<br />Stories
            </span>
            <span className="lg:hidden">
              We don’t just promote your brand, We build it.
            </span>
          </h2>

          <p className="text-[#3a2327] text-[clamp(12px,calc(14px+(18-14)*(100vh-600px)/(900-600)),18px)]  sm:text-base lg:text-2xl mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 text-left">
            At Student Tribe, we turn your goals into youth-driven campaigns
            that connect, inspire, and deliver results. From concept to
            execution, every project becomes a measurable success story.
          </p>

          <div className="flex justify-center lg:justify-start">
            <button className="bg-[#b8001f] text-white font-semibold rounded-full  px-6 py-3 sm:px-8 sm:py-4 shadow-xl flex items-center gap-2 text-sm sm:text-base lg:text-lg hover:bg-[#a0001a] transition-all">
              Be Our Client <span className="ml-1">→</span>
            </button>
          </div>
        </div>

        {/* Logos — mobile (horizontal marquees) */}
        <div className="lg:hidden  pb-10 ">
          <div className="w-full mb-4">
            <div className="relative w-full overflow-hidden">
              <div
                className="marquee-row flex gap-4"
                style={{
                  animation: "marquee-left 20s linear infinite",
                  width: "calc(200% + 1rem)",
                }}
              >
                {[...clients.slice(0, 4), ...clients.slice(0, 4)].map(
                  (client, idx) => (
                    <div
                      key={client.name + idx}
                      className="bg-white rounded-lg shadow-lg p-3 flex items-center justify-center min-w-[120px] h-[120px]"
                    >
                      <img
                        src={client.img}
                        alt={client.name}
                        className="max-h-[80px] max-w-[100px] object-contain"
                        draggable="false"
                        style={{ userSelect: "none" }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="relative w-full overflow-hidden">
              <div
                className="marquee-row flex gap-4"
                style={{
                  animation: "marquee-right 20s linear infinite",
                  width: "calc(200% + 1rem)",
                }}
              >
                {[...clients.slice(4, 8), ...clients.slice(4, 8)].map(
                  (client, idx) => (
                    <div
                      key={client.name + idx}
                      className="bg-white rounded-lg shadow-lg p-3 flex items-center justify-center min-w-[120px] h-[120px]"
                    >
                      <img
                        src={client.img}
                        alt={client.name}
                        className="max-h-[80px] max-w-[100px] object-contain"
                        draggable="false"
                        style={{ userSelect: "none" }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Logos — desktop (two vertical columns, fixed to right) */}
        <div className="hidden lg:flex absolute top-0 right-20 w-[420px] h-full gap-x-6 pointer-events-none">
          {/* Left column: bottom → top */}
          <div className="relative h-full w-[180px] overflow-hidden">
            <div
              className="marquee-col absolute left-0 top-0 w-full"
              style={{
                animation: "marquee-up 16s linear infinite",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              {(() => {
                const logos = clients.filter((_, idx) => idx % 2 === 0);
                return [...logos, ...logos].map((client, idx) => (
                  <div
                    key={client.name + idx}
                    className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-center w-[180px] h-[180px]"
                  >
                    <img
                      src={client.img}
                      alt={client.name}
                      className="max-h-[110px] max-w-[140px] object-contain"
                      draggable="false"
                      style={{ userSelect: "none" }}
                    />
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Right column: top → bottom */}
          <div className="relative h-full w-[180px] overflow-hidden">
            <div
              className="marquee-col absolute left-0 top-0 w-full"
              style={{
                animation: "marquee-down 16s linear infinite",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              {(() => {
                const logos = clients.filter((_, idx) => idx % 2 === 1);
                return [...logos, ...logos].map((client, idx) => (
                  <div
                    key={client.name + idx}
                    className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-center w-[180px] h-[180px]"
                  >
                    <img
                      src={client.img}
                      alt={client.name}
                      className="max-h-[110px] max-w-[140px] object-contain"
                      draggable="false"
                      style={{ userSelect: "none" }}
                    />
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .marquee-col { will-change: transform; }
        .marquee-row { will-change: transform; }

        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Clients;
