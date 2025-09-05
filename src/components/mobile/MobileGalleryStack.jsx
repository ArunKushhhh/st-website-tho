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

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Job Openings Section - Top */}
      <motion.div
        variants={cardVariants}
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
          ></MobileCard>
        </div>
      </motion.div>

      {/* Volunteer Work Section - Middle */}

      <motion.div
        variants={cardVariants}
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
          ></MobileCard>
        </div>
      </motion.div>

      {/* Internships Section - Bottom */}
      <motion.div
        variants={cardVariants}
        className="w-full"
        style={{ minHeight: dimensions.cardHeight }}
      >
        <div className="bg-black px-4 py-4 rounded-lg flex flex-col gap-1">
          <p className=" text-white font-medium">INTERNSHIPS</p>
        <MobileCard
          bgImage={leftImage}
          width="100%"
          height={`${dimensions.cardHeight}px`}
          delay={0.2}
          zIndex={1}
          opacity={1}
        >
        </MobileCard>
        </div>
      </motion.div>
    </motion.div>
  );
};
