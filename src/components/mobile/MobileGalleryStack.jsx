import React from "react";
import { motion } from "framer-motion";
import { MobileCard } from "./MobileCard";

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

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations by 0.2s
        delayChildren: 0.1, // Start after 0.1s
      }
    }
  };

  // Animation variants for cards coming from left
  const slideFromLeftVariants = {
    hidden: {
      x: -50,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] // Similar to power3.out
      }
    }
  };

  // Animation variants for cards coming from right
  const slideFromRightVariants = {
    hidden: {
      x: 50,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] // Similar to power3.out
      }
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: false, // Allow animation to trigger multiple times
        amount: 0.3, // Trigger when 30% of the element is in view
        margin: "-15% 0px -15% 0px" // Similar to start: "top 85%" and end: "bottom 15%"
      }}
    >
      {/* Job Openings Section - Top */}
      <motion.div
        className="w-full mb-4"
        style={{ minHeight: dimensions.cardHeight }}
        variants={slideFromLeftVariants}
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
      </motion.div>

      {/* Volunteer Work Section - Middle */}
      <motion.div
        className="w-full mb-4"
        style={{ minHeight: dimensions.cardHeight }}
        variants={slideFromRightVariants}
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
      </motion.div>

      {/* Internships Section - Bottom */}
      <motion.div
        className="w-full"
        style={{ minHeight: dimensions.cardHeight }}
        variants={slideFromLeftVariants}
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
      </motion.div>
    </motion.div>
  );
};