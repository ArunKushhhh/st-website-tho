import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import stlogo from "../assets/Whitelogo.png";
import { useNavigate } from "react-router-dom";

function OurOfferings() {
  // Pin the whole section
  const sectionRef = useRef(null);

  // Cards + nav refs
  const cardsRef = useRef([]);
  const leftNavRef = useRef(null);

  // UI state
  const [hoveredButton, setHoveredButton] = useState("brands");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false); // also used to nudge whole content down
  const navigate = useNavigate();

  // Hover handlers (logo/nav)
  const handleLogoOrButtonsMouseEnter = () => setShowButtons(true);
  const handleLogoOrButtonsMouseLeave = () => {
    setShowButtons(false);
    setHoveredButton("brands");
  };

  const scrollToSection = (section) => {
    // hook these up to your routing/scroll targets if needed
    if (section === "main-section") {
      console.log("Navigate to students section");
    } else if (section === "brands-section") {
      console.log("Navigate to brands section");
    }
  };

  const cardsData = [
    {
      id: "colleges",
      title: "COLLEGES",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
      alt: "College audience",
      points: [
        "Industry-led campaign partnerships",
        "Live projects & internship collaboration frameworks",
        "Creator ecosystem for promotional support",
        "Upskilling modules, bootcamps, and learning workshops and many more..",
      ],
    },
    {
      id: "corporates",
      title: "CORPORATES",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
      alt: "Corporate event",
      points: [
        "Talent acquisition and recruitment campaign support",
        "Employer branding and engagement visibility",
        "Innovation challenges and idea-think tanks",
        "Case competitions and hiring pipelines",
      ],
    },
    {
      id: "entertainment",
      title: "ENTERTAINMENT",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
      alt: "Entertainment event",
      points: [
        "Screenings, review groups, and engagement clubs",
        "Community-driven PR & fandom campaigns",
        "Fan-based content & interactive social engagement",
        "Digital premieres, watch parties, and activations",
      ],
    },
    {
      id: "brands",
      title: "BRANDS",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
      alt: "Brand event",
      points: [
        "Full-funnel marketing & engagement strategies",
        "Nano & micro influencer program management",
        "Custom content marketing â€ memes, reels, short videos",
        "Brand advocacy & ambassador programs",
      ],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial stack state for cards
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      // Show the first card by default, hide the rest
      if (index === 0) {
        gsap.set(card, {
          scale: 1,
          opacity: 1,
          y: 0,
          transformOrigin: "center center",
        });
      } else {
        gsap.set(card, {
          scale: 0.3,
          opacity: 0,
          y: index * 40,
          transformOrigin: "center center",
        });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current, // pin the whole h-screen section
        start: "top top",
        end: `+=${cardsData.length * 100}%`,
        pin: true,
        scrub: 1,
        pinSpacing: true,
        // Replace the onUpdate callback in your ScrollTrigger with this:
onUpdate: (self) => {
  const progress = self.progress;
  const totalCards = cardsData.length;
  const segmentSize = 1 / totalCards;

  const currentSegment = Math.floor(progress / segmentSize);
  const currentCardIndex = Math.min(currentSegment, totalCards - 1);

  let segmentProgress = (progress % segmentSize) / segmentSize;
  if (progress === 1) segmentProgress = 1;

  // --- reveal delay ---
  const revealDelay = 0.4;
  const inPhaseB = segmentProgress >= revealDelay;
  const tIn = inPhaseB
    ? (segmentProgress - revealDelay) / (1 - revealDelay)
    : 0;

 
  const stackOffset =  15;

  // --- nav highlight (FIXED) ---
  let navIndex;
  
  // Determine which card should be highlighted based on visibility
  if (currentCardIndex === 0) {
    // In first segment, always highlight first card
    navIndex = 0;
  } else {
    // For other segments, highlight based on which card is more prominent
    if (inPhaseB) {
      // Current card is animating in and visible, highlight it
      navIndex = currentCardIndex;
    } else {
      // Current card is still hidden, keep highlighting previous card
      navIndex = Math.max(0, currentCardIndex - 1);
    }
  }
  
  // This uses the most recent state value provided by React
setActiveCardIndex((prevIndex) => {
  // Only update state if the index has actually changed
  if (navIndex !== prevIndex) {
    return navIndex;
  }
  return prevIndex;
});

  // --- card animations ---
  cardsRef.current.forEach((card, index) => {
    if (!card) return;

    if (index < currentCardIndex) {
      // Previous cards stacked
      gsap.set(card, {
        scale: 1,
        opacity: 1,
        y: (index - currentCardIndex) * stackOffset,
      });
      return;
    }

    if (index === currentCardIndex) {
      // Special case for the first card - keep it visible without animation
      if (index === 0 && currentCardIndex === 0) {
        gsap.set(card, {
          scale: 1,
          opacity: 1,
          y: 0,
        });
        return;
      }
      
      // Normal animation for other cards
      if (!inPhaseB) {
        gsap.set(card, { scale: 0.3, opacity: 0, y: 40 });
      } else {
        const scale = 0.3 + tIn * 0.7;   // 0.3 â†' 1
        const y = (1 - tIn) * 40;        // 40 â†' 0
        gsap.set(card, { scale, opacity: 1, y });
      }
      return;
    }

    gsap.set(card, { scale: 0.3, opacity: 0, y: 40 });
  });
},
        // Remove the onStart callback since the first card is now visible by default
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl && tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update nav styles
  useEffect(() => {
    if (!leftNavRef.current) return;
    const navItems = leftNavRef.current.querySelectorAll("span.nav-item");
    navItems.forEach((item, index) => {
      item.classList.remove("text-white", "font-bold", "text-lg", "scale-110");
      item.classList.add("text-white/60", "font-medium", "text-sm");
      if (index === activeCardIndex) {
        item.classList.remove("text-white/60", "font-medium", "text-sm");
        item.classList.add("text-white", "font-bold", "text-lg", "scale-110");
      }
    });
  }, [activeCardIndex]);

  return (
    <section ref={sectionRef} className="relative w-screen h-screen ">
      <div
        className={`h-full w-full flex flex-col items-center transition-transform duration-300 
        `}
      >
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

        <div className="sm:absolute top-8 left-24">
          <h1 className="text-xl sm:text-4xl font-bold text-white mb-2">
            OUR OFFERINGS
          </h1>
        </div>

        <div className="relative flex-1 w-full">
          {/* Optional: push cards a bit lower below title/logo */}
          <div className="absolute inset-0 flex  pt-12 sm:pt-auto items-center justify-center">
            {cardsData.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="absolute p-3 sm:p-4 lg:p-8 transition-all duration-300 ease-out"
                style={{ zIndex: index }}
              >
                <div
                  className="bg-black/80 border relative border-[#5D5D5D] backdrop-blur-sm rounded-2xl
                  shadow-2xl p-4 sm:p-6 lg:p-8
                  w-[min(92vw,1100px)]"
                >
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                    {card.title}
                  </h2>

                  {/* column on mobile, row from sm up */}
                  <div className="flex flex-col  sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                    {/* image */}
                    <div className="w-full sm:basis-1/2">
                      <div className="rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={card.image}
                          alt={card.alt}
                          className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                        />
                      </div>
                    </div>

                    {/* points */}
                    <div className="w-full sm:basis-1/2 pb-8  text-white">
                      <ul className="list-disc list-inside space-y-1 sm:space-y-4 lg:space-y-6">
                        {card.points.map((point, i) => (
                          <li
                            key={i}
                            className="text-xs sm:text-base lg:text-xl leading-tight"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className="absolute bottom-4 right-4 bg-[#b8001f] hover:bg-[#9a0019]
                           p-2 lg:p-3 rounded-full transition-transform duration-300 hover:scale-110 shadow-lg"
                    >
                      <svg
                        className="w-4 h-4 lg:w-6 lg:h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rotated nav labels (optional; same stacking context) */}
        </div>
      </div>
          <div
            ref={leftNavRef}
            className=" absolute right-0 left-0 sm:left-auto sm:-right-30 bottom-5 sm:bottom-[45%]   md:rotate-90"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4 font-medium tracking-wider transition-all duration-300">
              <span className="nav-item text-white font-bold text-[clamp(8px,3vw,16px)] sm:text-base scale-110 transition-all duration-300">
                COLLEGES
              </span>
              <span className="nav-item text-white/60 font-medium text-[clamp(8px,3vw,16px)]  sm:text-base transition-all duration-300">
                CORPORATES
              </span>
              <span className="nav-item text-white/60 font-medium text-[clamp(8px,3vw,16px)] sm:text-base transition-all duration-300">
                ENTERTAINMENT
              </span>
              <span className="nav-item text-white/60 font-medium text-[clamp(8px,3vw,16px)] sm:text-base transition-all duration-300">
                BRANDS
              </span>
            </div>
          </div>
    </section>
  );
}

export default OurOfferings;