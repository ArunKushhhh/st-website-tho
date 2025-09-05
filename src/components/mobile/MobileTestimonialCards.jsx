import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MobileTestimonialCards = ({
  leftTestimonial,
  leftTestimonialAuthor,
  leftTestimonialProfile, // New prop for left profile picture
  rightTestimonial,
  rightTestimonialAuthor,
  rightTestimonialProfile, // New prop for right profile picture
  rightTestimonialSlideshow = false,
  rightTestimonials = [],
  isVisible = false,
  screenSize,
}) => {
  // Add safety check for screenSize
  if (!screenSize || typeof screenSize.width !== "number") {
    return null;
  }

  // Get responsive dimensions for testimonial cards
  const getDimensions = () => {
    const vw = screenSize.width;

    if (vw <= 520) {
      return {
        cardWidth: Math.min(vw, 350),
        cardHeight: 160,
        gap: 16,
      };
    } else {
      return {
        cardWidth: Math.min(vw - 80, 320),
        cardHeight: 160,
        gap: 20,
      };
    }
  };

  const dimensions = getDimensions();

  return (
    <motion.div
      style={{
        opacity: isVisible ? 1 : 0,
      }}
      className="flex flex-row gap-2 w-full max-w-2xl"
    >
      {/* Left Testimonial - Static */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          height: dimensions.cardHeight,
        }}
        className="bg-gray-950 rounded-xl p-4 text-white shadow-xl w-[50%] overflow-hidden border border-gray-800"
      >
        {rightTestimonialSlideshow ? (
          <TestimonialSlideshow
            testimonials={rightTestimonials}
            rightTestimonial={rightTestimonial}
            rightTestimonialAuthor={rightTestimonialAuthor}
            rightTestimonialProfile={rightTestimonialProfile}
          />
        ) : (
          <>
            {/* Profile Section */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 flex-shrink-0">
                <img
                  src={rightTestimonialProfile || "https://via.placeholder.com/40x40/6b7280/ffffff?text=U"}
                  alt={rightTestimonialAuthor}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {rightTestimonialAuthor || "Anonymous"}
                </p>
                <p className="text-xs text-gray-400">User</p>
              </div>
            </div>
            
            {/* Testimonial Text */}
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed line-clamp-4">
              {rightTestimonial}
            </p>
          </>
        )}
      </motion.div>

      {/* Right Testimonial - Slideshow or Static */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          height: dimensions.cardHeight,
        }}
        className="bg-gray-950/95 rounded-xl p-4 text-white shadow-xl w-[50%] overflow-hidden border border-gray-800"
      >
        {rightTestimonialSlideshow ? (
          <TestimonialSlideshow
            testimonials={rightTestimonials}
            rightTestimonial={rightTestimonial}
            rightTestimonialAuthor={rightTestimonialAuthor}
            rightTestimonialProfile={rightTestimonialProfile}
          />
        ) : (
          <>
            {/* Profile Section */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 flex-shrink-0">
                <img
                  src={rightTestimonialProfile || "https://via.placeholder.com/40x40/6b7280/ffffff?text=U"}
                  alt={rightTestimonialAuthor}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {rightTestimonialAuthor || "Anonymous"}
                </p>
                <p className="text-xs text-gray-400">User</p>
              </div>
            </div>
            
            {/* Testimonial Text */}
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed line-clamp-4">
              {rightTestimonial}
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

// Slideshow component for the right testimonial card
function TestimonialSlideshow({
  testimonials,
  rightTestimonial,
  rightTestimonialAuthor,
  rightTestimonialProfile,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use provided testimonials or create default with the single testimonial
  const slideshowData =
    testimonials.length > 0
      ? testimonials
      : [
          {
            text: rightTestimonial,
            author: rightTestimonialAuthor,
            profilePic: rightTestimonialProfile,
            role: "User"
          },
        ];

  useEffect(() => {
    if (slideshowData.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slideshowData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [slideshowData.length]);

  const current = slideshowData[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col h-full"
      >
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 flex-shrink-0">
            <img
              src={current.profilePic || "https://via.placeholder.com/40x40/6b7280/ffffff?text=U"}
              alt={current.author}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {current.author || "Anonymous"}
            </p>
            <p className="text-xs text-gray-400">{current.role || "User"}</p>
          </div>
        </div>
        
        {/* Testimonial Text */}
        <p className="text-xs md:text-sm text-gray-200 leading-relaxed line-clamp-4 flex-1">
          {current.text}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}