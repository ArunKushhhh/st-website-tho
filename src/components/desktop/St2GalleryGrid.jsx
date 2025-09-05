import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Individual animated image component with enforced dimensions
 * Ensures consistent layout regardless of source image dimensions
 */
const AnimatedImage = ({
  src,
  alt,
  className = "",
  animations,
  height = "h-48",
  isMiddle = false,
}) => (
  <motion.div
    className={`relative w-full ${height} ${className} image-container overflow-hidden`}
    style={{
      x: animations.x,
      y: animations.y,
      rotate: animations.rotation,
      opacity: animations.opacity,
      width: "100%",
      height: "100%",
    }}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full rounded-lg shadow-lg"
      style={{
        objectFit: "cover",
        objectPosition: "center",
        width: "100%",
        height: "100%",
        display: "block",
        flexShrink: 0,
      }}
      onLoad={(e) => {
        // Force dimensions on load
        e.target.style.width = "100%";
        e.target.style.height = "100%";
        e.target.style.objectFit = "cover";
        e.target.style.objectPosition = "center";
      }}
      onError={(e) => {
        console.warn(`Failed to load image: ${src}`);
        // Fallback styling
        e.target.style.backgroundColor = "#f3f4f6";
        e.target.style.border = "2px dashed #d1d5db";
        e.target.style.width = "100%";
        e.target.style.height = "100%";
      }}
    />
  </motion.div>
);

/**
 * St2 Gallery Grid Layout Component
 * Renders the 5-column grid with proper image positioning and integrated text elements
 */
const St2GalleryGrid = ({
  images,
  imageAnimations,
  textAnimations,
  showButtons,
}) => {
  if (!imageAnimations || imageAnimations.length < 7) {
    return null; // Don't render until animations are ready
  }

  return (
    <div
      className={` relative px-8 overflow w-[100%] flex flex-col transition-all duration-500 ${
        showButtons ? "translate-y-14 border-black" : ""
      }`}
    >
      {/* Robust CSS to enforce dimensions */}
      <style>
        {`
                .gallery-container {
                    height: 384px !important;
                    min-height: 384px !important;
                    max-height: 384px !important;
                }
                .gallery-container img {
                    object-fit: cover !important;
                    object-position: center !important;
                    width: 100% !important;
                    height: 100% !important;
                    flex-shrink: 0 !important;
                }
                .image-container {
                    overflow: hidden !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                `}
      </style>
      {/* Heading and Subheading positioned above l12, m1, r12 columns */}
      <div className="grid grid-cols-5 gap-4 md:gap-6 mb-4 relative">
        {/* Empty space for columns 1 */}
        <div></div>

        {/* Heading and Subheading spanning columns 2-4 (l12, m1, r12) */}
        <div className="col-span-3 flex flex-col items-center justify-end pb-2 relative">
          <motion.h1
            style={{
              y: textAnimations.heading.y,
              opacity: textAnimations.heading.opacity,
            }}
            className="text-lg lg:text-[26px] font-bold text-black text-center mb-2 px-1 absolute -top-[20px]"
          >
            Discover career paths you never know!
          </motion.h1>

          <motion.p
            style={{
              y: textAnimations.subheading.y,
              opacity: textAnimations.subheading.opacity,
            }}
            className="text-xs lg:text-sm font-semibold text-black text-center px-1 absolute top-[30px]"
          >
            Workshops that don't bore. Webinars with no-zoom fatigue.
            <br /> Courses that actually upskill. Dive into learing with vibe
          </motion.p>
        </div>

        {/* Empty space for column 5 */}
        <div></div>
      </div>
      {/* Main grid with images - Fixed dimensions for consistency */}
      <div className="grid grid-cols-5 gap-3 w-full  !h-[65vh] max-h-[65vh]">
        {/* Column 1: Left furthermost - lt11 (70%) and lb11 (30%) with gap */}
        <div
          className="flex flex-col justify-between h-full  max-h-[65vh] "
          style={{ height: "100%" }}
        >
          <div style={{ height: "70%", minHeight: "70%", maxHeight: "70%" }}>
            <AnimatedImage
              src={images[0]} // lt11
              alt="Gallery image 1"
              animations={imageAnimations[0]}
              height="h-full" // Use full container height
            />
          </div>
          <div style={{ height: "28%", minHeight: "28%", maxHeight: "28%" }}>
            <AnimatedImage
              src={images[1]} // lb11
              alt="Gallery image 2"
              animations={imageAnimations[1]}
              height="h-full" // Use full container height
            />
          </div>
        </div>

        {/* Column 2: l12 - 80% height bottom aligned */}
        <div className="flex items-end h-full" style={{ height: "100%" }}>
          <div
            style={{
              height: "80%",
              minHeight: "80%",
              maxHeight: "80%",
              width: "100%",
            }}
          >
            <AnimatedImage
              src={images[2]} // l12
              alt="Gallery image 3"
              animations={imageAnimations[2]}
              height="h-full" // Use full container height
            />
          </div>
        </div>

        {/* Column 3: Middle - centered but slightly below center */}
        <div
          className="flex items-center justify-center h-full pt-10"
          style={{ height: "100%" }}
        >
          <div
            style={{
              height: "55%",
              minHeight: "55%",
              maxHeight: "55%",
              width: "100%",
            }}
          >
            <AnimatedImage
              src={images[3]} // m1
              alt="Gallery image 4"
              animations={imageAnimations[3]}
              height="h-full" // Use full container height
              isMiddle={true}
            />
          </div>
        </div>

        {/* Column 4: r12 - 80% height bottom aligned (symmetry with l12) */}
        <div className="flex items-end h-full" style={{ height: "100%" }}>
          <div
            style={{
              height: "80%",
              minHeight: "80%",
              maxHeight: "80%",
              width: "100%",
            }}
          >
            <AnimatedImage
              src={images[4]} // r12
              alt="Gallery image 5"
              animations={imageAnimations[4]}
              height="h-full" // Use full container height
            />
          </div>
        </div>

        {/* Column 5: Right furthermost - rt11 (70%) and rb11 (30%) with gap (symmetry with column 1) */}
        <div
          className="flex flex-col justify-between h-full max-h-[65vh]"
          style={{ height: "100%" }}
        >
          <div style={{ height: "70%", minHeight: "70%", maxHeight: "70%" }}>
            <AnimatedImage
              src={images[5]} // rt11
              alt="Gallery image 6"
              animations={imageAnimations[5]}
              height="h-full" // Use full container height
            />
          </div>
          <div style={{ height: "28%", minHeight: "28%", maxHeight: "28%" }}>
            <AnimatedImage
              src={images[6]} // rb11
              alt="Gallery image 7"
              animations={imageAnimations[6]}
              height="h-full" // Use full container height
            />
          </div>
        </div>
      </div>{" "}
      {/* Button positioned below m1 image (column 3) */}
      <div className="w-full absolute bottom-0 left-0 grid grid-cols-5 gap-4 md:gap-6 mt-4">
        {/* Empty space for columns 1-2 */}
        <div></div>
        <div></div>

        {/* Button in column 3 (below m1) */}
        <div className="flex justify-center h-full relative ">
          <motion.button
            style={{
              y: textAnimations.button.y,
              opacity: textAnimations.button.opacity,
            }}
            className="bg-gradient-to-r from-red-700 to-red-950 hover:from-red-700 hover:to-red-800 text-white px-4 py-1 md:py-3 lg:py-4 md:px-4 rounded-4xl font-semibold flex items-center justify-center gap-2  text-xs lg:text-[16px] w-full shadow-lg transition-all duration-300 hover:scale-107"
          >
            Explore Now
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 hidden lg:block" />
          </motion.button>
        </div>

        {/* Empty space for columns 4-5 */}
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default St2GalleryGrid;
