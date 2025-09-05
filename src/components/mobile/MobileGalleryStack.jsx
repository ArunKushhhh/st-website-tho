import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MobileCard } from "./MobileCard";

gsap.registerPlugin(ScrollTrigger);

export const MobileGalleryStack = ({
  centerImage,
  leftImage,
  rightImage,
  centerText,
  leftText = "Internships",
  rightText = "Volunteer Work",
  jobOpeningsText = "Job Openings",
  jobOpeningsImage,
  centerChildren,
  isVisible = false,
  screenSize,
}) => {
  // Refs for animation targets
  const containerRef = useRef(null);
  const jobOpeningsRef = useRef(null);
  const volunteerWorkRef = useRef(null);
  const internshipsRef = useRef(null);

  // Add safety check for screenSize
  if (
    !screenSize ||
    typeof screenSize.width !== "number" ||
    typeof screenSize.height !== "number"
  ) {
    return null; // or return a loading state
  }

  const getDimensions = () => {
    const vw = screenSize.width;
    const vh = screenSize.height;

    // Full width cards with some padding
    return {
      cardWidth: Math.min(vw - 32, 400), // 16px padding on each side
      cardHeight: Math.min(vh * 0.25, 200), // Each card takes about 1/4 of viewport height
      gap: 16, // Gap between cards
    };
  };

  const dimensions = getDimensions();

  // GSAP Animation function
  const runGSAPAnimation = () => {
    const elements = [
      jobOpeningsRef.current,
      volunteerWorkRef.current,
      internshipsRef.current
    ].filter(Boolean);

    if (elements.length === 0) return;

    // Kill any existing animations
    gsap.killTweensOf(elements);

    // Set initial states
    gsap.set(jobOpeningsRef.current, {
      x: -50, // translate from left
      opacity: 0
    });

    gsap.set(volunteerWorkRef.current, {
      x: 50, // translate from right
      opacity: 0
    });

    gsap.set(internshipsRef.current, {
      x: -50, // translate from left
      opacity: 0
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate Job Openings (from left)
    tl.to(jobOpeningsRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    })
    // Animate Volunteer Work (from right) - stagger by 0.2s
    .to(volunteerWorkRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6") // Start 0.6s before previous animation ends
    // Animate Internships (from left) - stagger by 0.2s
    .to(internshipsRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6"); // Start 0.6s before previous animation ends
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial states
    const elements = [
      jobOpeningsRef.current,
      volunteerWorkRef.current,
      internshipsRef.current
    ].filter(Boolean);

    if (elements.length > 0) {
      gsap.set(jobOpeningsRef.current, {
        x: -50,
        opacity: 0
      });
      gsap.set(volunteerWorkRef.current, {
        x: 50,
        opacity: 0
      });
      gsap.set(internshipsRef.current, {
        x: -50,
        opacity: 0
      });
    }

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%", // Trigger when section is 85% from top of viewport
      end: "bottom 15%",
      onEnter: runGSAPAnimation,
      onEnterBack: runGSAPAnimation,
      once: false, // Allow animation to trigger multiple times
      markers: false // Set to true for debugging
    });

    // Cleanup
    return () => {
      scrollTrigger.kill();
    };
  }, [screenSize]); // Re-run when screenSize changes

  return (
    <div
      ref={containerRef}
      className="w-full max-w-md mx-auto px-4"
    >
      {/* Job Openings Section - Top */}
      <div
        ref={jobOpeningsRef}
        className="w-full mb-4"
        style={{ minHeight: dimensions.cardHeight }}
      >
        <div className="bg-black px-4 py-4 rounded-lg flex flex-col gap-1">
          <p className="text-white font-medium">JOB OPENINGS</p>
          <MobileCard
            bgImage={jobOpeningsImage || centerImage}
            width="100%"
            height={`${dimensions.cardHeight}px`}
            delay={0}
            zIndex={1}
            opacity={1}
          />
        </div>
      </div>

      {/* Volunteer Work Section - Middle */}
      <div
        ref={volunteerWorkRef}
        className="w-full mb-4"
        style={{ minHeight: dimensions.cardHeight }}
      >
        <div className="bg-black px-4 py-4 rounded-lg flex flex-col gap-1">
          <p className="text-right text-white font-medium">VOLUNTEER WORK</p>
          <MobileCard
            bgImage={rightImage}
            width="100%"
            height={`${dimensions.cardHeight}px`}
            delay={0.1}
            zIndex={1}
            opacity={1}
          />
        </div>
      </div>

      {/* Internships Section - Bottom */}
      <div
        ref={internshipsRef}
        className="w-full"
        style={{ minHeight: dimensions.cardHeight }}
      >
        <div className="bg-black px-4 py-4 rounded-lg flex flex-col gap-1">
          <p className="text-white font-medium">INTERNSHIPS</p>
          <MobileCard
            bgImage={leftImage}
            width="100%"
            height={`${dimensions.cardHeight}px`}
            delay={0.2}
            zIndex={1}
            opacity={1}
          />
        </div>
      </div>
    </div>
  );
};