import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import person1 from "../../assets/splashscreen/Rectangle 3463928.svg";
import person2 from "../../assets/splashscreen/Rectangle 3463931.svg";
import person3 from "../../assets/splashscreen/Rectangle 3463948.svg";
import person4 from "../../assets/splashscreen/Rectangle 3463957.svg";
import person5 from "../../assets/splashscreen/Rectangle 3463958.svg";
import person8 from "../../assets/splashscreen/Rectangle 3463964.svg";
import fist from "../../assets/splashscreen/Rectangle 3463918.svg";
import stlogo from "../../assets/Whitelogo.webp";
import { useScreenSize } from "../../hooks/useScreenSize";
import { isMobile } from "../../utils/mobileOptimizations";

const SplashSplash2 = ({ fade, onTransitionComplete }) => {
  const peopleRef = useRef([]);
  const wordsRef = useRef([]);
  const logoRef = useRef(null);
  const fistRef = useRef(null);
  const mountTimeRef = useRef(Date.now());
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({
    fist: false,
    logo: false,
  });
  const screenSize = useScreenSize();
  const isSmallScreen = screenSize.width < 768;
  const isMobileScreen = screenSize.width < 480;

  useEffect(() => {
    // Prevent scrolling when component mounts
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  // Preload critical images immediately
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = [
        // Create promises for critical images
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages((prev) => ({ ...prev, fist: true }));
            resolve(img);
          };
          img.onerror = reject;
          img.src = fist;
        }),
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages((prev) => ({ ...prev, logo: true }));
            resolve(img);
          };
          img.onerror = reject;
          img.src = stlogo;
        }),
      ];

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to preload images:", error);
        // Still set as loaded to prevent infinite loading
        setImagesLoaded(true);
      }
    };

    preloadImages();

    // Add link tags: keep truly critical images as preload, use prefetch for non-critical
    const preloadLinks = [
      { href: fist, as: "image", rel: "preload", fetchPriority: "high" },
      // Logo is used later; use prefetch to avoid "preloaded but not used" warnings
      { href: stlogo, rel: "prefetch" },
    ];

    const linkElements = preloadLinks.map(
      ({ href, as, rel, fetchPriority }) => {
        const link = document.createElement("link");
        link.rel = rel || "preload";
        // only set 'as' for preload links
        if (rel === "preload" && as) link.as = as;
        if (typeof fetchPriority !== "undefined") {
          try {
            link.setAttribute("fetchpriority", fetchPriority);
          } catch (e) {
            // ignore if not supported
          }
        }
        link.href = href;
        // prefetch for cross-origin should not set crossOrigin; keep anonymous for preload images
        if (rel === "preload") link.crossOrigin = "anonymous";
        document.head.appendChild(link);
        return link;
      }
    );

    return () => {
      // Cleanup preload links
      linkElements.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  // Add transition animation when fade is true
  useEffect(() => {
    if (fade && logoRef.current && fistRef.current && imagesLoaded) {
      // Create timeline for transition animation
      const tl = gsap.timeline({
        onComplete: () => {
          // Ensure the splash shows for at least MIN_DURATION ms
          const MIN_DURATION = 1500; // ms
          const elapsed = Date.now() - (mountTimeRef.current || Date.now());
          const remaining = Math.max(0, MIN_DURATION - elapsed);
          setTimeout(() => {
            if (onTransitionComplete) onTransitionComplete();
          }, remaining);
        },
      });

      // Fade out fist and people simultaneously
      tl.to([fistRef.current, ...peopleRef.current.filter(Boolean)], {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.inOut",
      }).to(wordsRef.current.filter(Boolean), {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.05,
      });
    }
  }, [fade, onTransitionComplete, imagesLoaded]);

  useEffect(() => {
    if (!fade && imagesLoaded) {
      // Animate people - increased from 8 to 12
      const totalPeople = 12;
      // Reduce animation intensity for mobile
      const animationScale = isMobileScreen ? 0.6 : isSmallScreen ? 0.8 : 1;

      for (let index = 0; index < totalPeople; index++) {
        const person = peopleRef.current[index];
        if (person) {
          gsap.fromTo(
            person,
            {
              y: 50 * animationScale,
              opacity: 1.0,
              scale: 1.0,
            },
            {
              y: -75 * animationScale,
              opacity: 0.85,
              scale: 0.95,
              duration: 2 + index * 0.2, // Reduced duration
              delay: index * 0.1, // Reduced delay
              ease: "power2.out",
              repeat: -1,
              repeatDelay: 1.5, // Reduced repeat delay
              yoyo: false,
            }
          );
        }
      }

      // Animate motivational words - reduce intensity
      wordsRef.current.forEach((word, index) => {
        if (word) {
          const wordData = [
            { type: "vertical", direction: 1 },
            { type: "horizontal", direction: 1 },
            { type: "horizontal", direction: -1 },
            { type: "horizontal", direction: 1 },
            { type: "vertical", direction: -1 },
            { type: "vertical", direction: 1 },
            { type: "vertical", direction: -1 },
            { type: "vertical", direction: 1 },
          ];

          const config = wordData[index];
          // Reduce movement for mobile screens
          const movementMultiplier = isMobileScreen
            ? 0.5
            : isSmallScreen
            ? 0.7
            : 1;

          if (config.type === "vertical") {
            gsap.to(word, {
              y: config.direction * 10 * movementMultiplier, // Reduced movement based on screen size
              duration: 2 + index * 0.1, // Reduced duration
              ease: "power1.inOut", // Gentler easing
              repeat: -1,
              yoyo: true,
            });
          } else {
            gsap.to(word, {
              x: config.direction * 15 * movementMultiplier, // Reduced movement based on screen size
              duration: 2.5 + index * 0.15, // Reduced duration
              ease: "power1.inOut", // Gentler easing
              repeat: -1,
              yoyo: true,
            });
          }
        }
      });
    }
  }, [fade, imagesLoaded, isMobileScreen, isSmallScreen]);

  return (
    <div
      className={`overflow-hidden height: '100vh', width: '100vw fixed inset-0 flex flex-col items-center justify-center z-20 bg-gradient-to-br from-[#b8001f] to-[#7a0015] transition-opacity duration-700 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* imagesLoaded guard removed — keep full splash visuals instead of small loader */}

      {/* Main content - only show when images are loaded */}
      <div
        className={`w-full h-full overflow-hidden ${
          imagesLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        {/* Motivational Words Scattered Around - matching Figma design exactly */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Transform - Top Left */}
          <div
            ref={(el) => (wordsRef.current[0] = el)}
            className={`absolute ${
              isMobileScreen
                ? "top-8 left-4"
                : isSmallScreen
                ? "top-12 left-8"
                : "top-16 left-40"
            }`}
            style={{
              fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
              fontWeight: "900",
              fontStyle: "normal",
              fontSize: isMobileScreen
                ? "36px"
                : isSmallScreen
                ? "48px"
                : "64px",
              lineHeight: "71%",
              letterSpacing: isMobileScreen
                ? "-3px"
                : isSmallScreen
                ? "-4px"
                : "-5.6px",
              color: "transparent",
              WebkitTextStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              textStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
            }}
          >
            transform
          </div>

          {/* Connect - Top Right */}
          <div
            ref={(el) => (wordsRef.current[1] = el)}
            className={`absolute ${
              isMobileScreen
                ? "top-16 right-4"
                : isSmallScreen
                ? "top-20 right-8"
                : "top-42 right-36"
            }`}
            style={{
              fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
              fontWeight: "900",
              fontStyle: "normal",
              fontSize: isMobileScreen
                ? "36px"
                : isSmallScreen
                ? "48px"
                : "64px",
              lineHeight: "71%",
              letterSpacing: isMobileScreen
                ? "-3px"
                : isSmallScreen
                ? "-4px"
                : "-5.6px",
              color: "transparent",
              WebkitTextStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              textStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              animationDelay: "1s",
            }}
          >
            Connect
          </div>

          {/* Trust - Middle Left */}
          <div
            ref={(el) => (wordsRef.current[2] = el)}
            className={`absolute ${
              isMobileScreen
                ? "top-1/3 left-2"
                : isSmallScreen
                ? "top-1/3 left-4"
                : "top-4/12 left-45"
            } transform -translate-y-1/2`}
            style={{
              fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
              fontWeight: "900",
              fontStyle: "normal",
              fontSize: isMobileScreen
                ? "36px"
                : isSmallScreen
                ? "48px"
                : "64px",
              lineHeight: "71%",
              letterSpacing: isMobileScreen
                ? "-3px"
                : isSmallScreen
                ? "-4px"
                : "-5.6px",
              color: "transparent",
              WebkitTextStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              textStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              animationDelay: "2s",
            }}
          >
            trust
          </div>

          {/* Create - Middle Right */}
          <div
            ref={(el) => (wordsRef.current[3] = el)}
            className={`absolute ${
              isMobileScreen
                ? "top-1/2 right-2"
                : isSmallScreen
                ? "top-1/2 right-4"
                : "top-1/2 right-12"
            } transform -translate-y-1/2`}
            style={{
              fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
              fontWeight: "900",
              fontStyle: "normal",
              fontSize: isMobileScreen
                ? "36px"
                : isSmallScreen
                ? "48px"
                : "64px",
              lineHeight: "71%",
              letterSpacing: isMobileScreen
                ? "-3px"
                : isSmallScreen
                ? "-4px"
                : "-5.6px",
              color: "transparent",
              WebkitTextStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              textStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              animationDelay: "0.5s",
            }}
          >
            create
          </div>

          {/* Dreams - Top Right Lower */}
          <div
            ref={(el) => (wordsRef.current[4] = el)}
            className={`absolute ${
              isMobileScreen
                ? "bottom-2/3 right-8"
                : isSmallScreen
                ? "bottom-1/2 right-12"
                : "bottom-2/5 right-88"
            }`}
            style={{
              fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
              fontWeight: "900",
              fontStyle: "normal",
              fontSize: isMobileScreen
                ? "36px"
                : isSmallScreen
                ? "48px"
                : "64px",
              lineHeight: "71%",
              letterSpacing: isMobileScreen
                ? "-3px"
                : isSmallScreen
                ? "-4px"
                : "-5.6px",
              color: "transparent",
              WebkitTextStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              textStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              animationDelay: "1.5s",
            }}
          >
            dreams
          </div>

          {/* Achieve - Bottom Left */}
          <div
            ref={(el) => (wordsRef.current[5] = el)}
            className={`absolute ${
              isMobileScreen
                ? "bottom-1/4 left-4"
                : isSmallScreen
                ? "bottom-1/3 left-8"
                : "bottom-1/3 left-75"
            }`}
            style={{
              fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
              fontWeight: "900",
              fontStyle: "normal",
              fontSize: isMobileScreen
                ? "36px"
                : isSmallScreen
                ? "48px"
                : "64px",
              lineHeight: "71%",
              letterSpacing: isMobileScreen
                ? "-3px"
                : isSmallScreen
                ? "-4px"
                : "-5.6px",
              color: "transparent",
              WebkitTextStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              textStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              animationDelay: "2.5s",
            }}
          >
            Achieve
          </div>

          {/* Grow - Bottom Left Lower */}
          <div
            ref={(el) => (wordsRef.current[6] = el)}
            className={`absolute ${
              isMobileScreen
                ? "bottom-12 left-2"
                : isSmallScreen
                ? "bottom-16 left-4"
                : "bottom-1/8 left-12"
            }`}
            style={{
              fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
              fontWeight: "900",
              fontStyle: "normal",
              fontSize: isMobileScreen
                ? "36px"
                : isSmallScreen
                ? "48px"
                : "64px",
              lineHeight: "71%",
              letterSpacing: isMobileScreen
                ? "-3px"
                : isSmallScreen
                ? "-4px"
                : "-5.6px",
              color: "transparent",
              WebkitTextStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              textStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              animationDelay: "3s",
            }}
          >
            grow
          </div>

          {/* Community - Bottom Right */}
          <div
            ref={(el) => (wordsRef.current[7] = el)}
            className={`absolute ${
              isMobileScreen
                ? "bottom-12 right-2"
                : isSmallScreen
                ? "bottom-16 right-4"
                : "bottom-1/8 right-8"
            }`}
            style={{
              fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
              fontWeight: "900",
              fontStyle: "normal",
              fontSize: isMobileScreen
                ? "28px"
                : isSmallScreen
                ? "40px"
                : "64px",
              lineHeight: "71%",
              letterSpacing: isMobileScreen
                ? "-2px"
                : isSmallScreen
                ? "-3px"
                : "-5.6px",
              color: "transparent",
              WebkitTextStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              textStroke: `${
                isMobileScreen ? "1.5px" : "2px"
              } rgba(255, 255, 255, 0.2)`,
              animationDelay: "0.8s",
            }}
          >
            community
          </div>
        </div>

        {/* Central Fist Logo with ST Text */}
        <div
          className={`absolute ${
            isMobileScreen ? "top-12" : isSmallScreen ? "top-8" : "top-4"
          } left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-center`}
        >
          {/* Fist Icon - Optimized loading */}
          <div
            className={`relative mb-4 z-20 flex items-center justify-center ${
              isMobileScreen && "w-96 h-96"
            }`}
          >
            <img
              ref={fistRef}
              src={fist}
              alt="Fist Icon"
              className={`md:w-[50vw] mt-8 h-full object-contain transition-opacity duration-300 ${
                loadedImages.fist ? "opacity-100" : "opacity-0"
              }`}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />

            {/* ST Text Overlay on Fist */}
            <div
              className={`absolute inset-0 ${
                isMobileScreen ? "mt-24" : isSmallScreen ? "mt-28" : "mt-28"
              } flex flex-col items-center justify-center`}
            >
              <img
                ref={logoRef}
                src={stlogo}
                alt="Student Tribe Logo"
                className={`${
                  isMobileScreen ? "h-12" : isSmallScreen ? "h-24" : "h-20"
                } md:h-24 lg:h-32 w-auto drop-shadow-lg mb-4 ${
                  isMobileScreen ? "mt-20" : isSmallScreen ? "mt-24" : "mt-24"
                } transition-opacity duration-300 ${
                  loadedImages.logo ? "opacity-100" : "opacity-0"
                }`}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Group of people entering the fist - REDUCED for performance */}
          <div
            className={`relative ${
              isMobileScreen
                ? "w-96 h-96"
                : isSmallScreen
                ? "w-112 h-112"
                : "w-112 h-112"
            } flex items-center justify-center`}
            style={{
              marginTop: isMobileScreen
                ? "-50px"
                : isSmallScreen
                ? "-50px"
                : "-50px",
            }}
          >
            {/* First row - center person */}
            <img
              ref={(el) => (peopleRef.current[0] = el)}
              src={person1}
              alt="Person 1"
              className={`absolute left-1/2 top-0 ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 1.0 }}
              loading="lazy"
            />

            {/* Second row - 4 people */}
            <img
              ref={(el) => (peopleRef.current[1] = el)}
              src={person2}
              alt="Person 2"
              className={`absolute ${
                isMobileScreen
                  ? "left-20 top-16"
                  : isSmallScreen
                  ? "left-28 top-20"
                  : "left-32 top-22"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 1.0 }}
              loading="lazy"
            />
            <img
              ref={(el) => (peopleRef.current[2] = el)}
              src={person3}
              alt="Person 3"
              className={`absolute ${
                isMobileScreen
                  ? "left-32 top-16"
                  : isSmallScreen
                  ? "left-44 top-20"
                  : "left-48 top-22"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 1.0 }}
              loading="lazy"
            />
            <img
              ref={(el) => (peopleRef.current[3] = el)}
              src={person4}
              alt="Person 4"
              className={`absolute ${
                isMobileScreen
                  ? "left-52 top-16"
                  : isSmallScreen
                  ? "left-68 top-20"
                  : "left-72 top-22"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 1.0 }}
              loading="lazy"
            />
            <img
              ref={(el) => (peopleRef.current[4] = el)}
              src={person5}
              alt="Person 5"
              className={`absolute ${
                isMobileScreen
                  ? "left-72 top-16"
                  : isSmallScreen
                  ? "left-84 top-20"
                  : "left-88 top-22"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 1.0 }}
              loading="lazy"
            />

            {/* Third row - 4 people */}
            <img
              ref={(el) => (peopleRef.current[5] = el)}
              src={person8}
              alt="Person 8"
              className={`absolute ${
                isMobileScreen
                  ? "left-16 top-32"
                  : isSmallScreen
                  ? "left-20 top-40"
                  : "left-24 top-44"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 1.0 }}
              loading="lazy"
            />
            <img
              ref={(el) => (peopleRef.current[6] = el)}
              src={person1}
              alt="Person 1"
              className={`absolute ${
                isMobileScreen
                  ? "left-32 top-32"
                  : isSmallScreen
                  ? "left-44 top-40"
                  : "left-48 top-44"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 1.0 }}
              loading="lazy"
            />
            <img
              ref={(el) => (peopleRef.current[7] = el)}
              src={person2}
              alt="Person 2"
              className={`absolute ${
                isMobileScreen
                  ? "left-52 top-32"
                  : isSmallScreen
                  ? "left-68 top-40"
                  : "left-72 top-44"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 1.0 }}
              loading="lazy"
            />
            <img
              ref={(el) => (peopleRef.current[8] = el)}
              src={person3}
              alt="Person 3"
              className={`absolute ${
                isMobileScreen
                  ? "left-76 top-32"
                  : isSmallScreen
                  ? "left-84 top-40"
                  : "left-88 top-44"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 1.0 }}
              loading="lazy"
            />

            {/* Back row - 3 people */}
            <img
              ref={(el) => (peopleRef.current[9] = el)}
              src={person4}
              alt="Person 4"
              className={`absolute ${
                isMobileScreen
                  ? "left-24 top-48"
                  : isSmallScreen
                  ? "left-32 top-60"
                  : "left-36 top-66"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 0.9 }}
              loading="lazy"
            />
            <img
              ref={(el) => (peopleRef.current[10] = el)}
              src={person5}
              alt="Person 5"
              className={`absolute ${
                isMobileScreen
                  ? "left-48 top-48"
                  : isSmallScreen
                  ? "left-56 top-60"
                  : "left-60 top-66"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 0.9 }}
              loading="lazy"
            />
            <img
              ref={(el) => (peopleRef.current[11] = el)}
              src={person8}
              alt="Person 8"
              className={`absolute ${
                isMobileScreen
                  ? "left-68 top-48"
                  : isSmallScreen
                  ? "left-80 top-60"
                  : "left-84 top-66"
              } ${
                isMobileScreen ? "h-36" : isSmallScreen ? "h-44" : "h-48"
              } w-auto object-contain z-5`}
              style={{ transform: "translate(-50%, 0)", opacity: 0.9 }}
              loading="lazy"
            />
          </div>
          {/* Close the central logo/people wrapper */}
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default SplashSplash2;
